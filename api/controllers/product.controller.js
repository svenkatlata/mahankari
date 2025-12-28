import Product from "../models/product.model.js";
import Discount from "../models/discount.model.js";
import { uploadImage } from "../config/cloudinary.js";
import { calculateDiscountedPrice } from "../utils/discount.js";
import fs from "fs";

// Create a new product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      sku,
      brand,
      price,
      discount,
      category,
      stock,
      specifications,
      variants,
    } = req.body;
    const images = req.files || [];

    if (!name || !sku || !price || stock === undefined) {
      return res.status(400).json({
        message: "Name, SKU, Price, and Stock are required fields",
        success: false,
      });
    }

    if (isNaN(price) || price < 0) {
      return res.status(400).json({
        message: "Price must be a non-negative number",
        success: false,
      });
    }

    if (isNaN(stock) || stock < 0) {
      return res.status(400).json({
        message: "Stock must be a non-negative number",
        success: false,
      });
    }

    if (variants && !Array.isArray(variants)) {
      return res.status(400).json({
        message: "Variants must be an array",
        success: false,
      });
    }

    if (specifications && typeof specifications !== "object") {
      return res.status(400).json({
        message: "Specifications must be an object",
        success: false,
      });
    }

    let discountedPrice = price;
    if (discount) {
      const productDiscount = await Discount.findById(discount);
      if (!productDiscount) {
        return res.status(400).json({
          message: "Invalid discount ID",
          success: false,
        });
      }
      // Get Discounted Price
      discountedPrice = calculateDiscountedPrice(price, productDiscount);
    }

    // Upload images and get their URLs and public IDs
    let uploadedImages = [];
    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const result = await uploadImage(file.path, "uploads");
        if (!result.success) {
          return res.status(500).json({
            message: result.message,
            success: false,
          });
        }
        uploadedImages.push({
          secureUrl: result.secureUrl,
          publicId: result.publicId,
          isDefault: i === 0,
        });
        // Delete local file
        fs.unlinkSync(file.path);
      }
    }

    const newProduct = new Product({
      name,
      description,
      sku,
      brand,
      price,
      discount,
      discountedPrice,
      category,
      stock,
      specifications,
      variants: Array.isArray(variants) ? variants : [],
      images: uploadedImages,
    });
    const savedProduct = await newProduct.save();
    return res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

// get Product by ID
export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId)
      .populate("category")
      .populate("discount");
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Product fetched successfully",
      product,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("discount");
    return res.status(200).json({
      message: "Products fetched successfully",
      products,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const {
      name,
      description,
      sku,
      brand,
      price,
      discount,
      category,
      stock,
      specifications,
      variants,
      removeImages,
    } = req.body;

    const images = req.files || [];

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    // Basic validations (only if fields are provided)
    if (price !== undefined && (isNaN(price) || price < 0)) {
      return res.status(400).json({
        message: "Price must be a non-negative number",
        success: false,
      });
    }

    if (stock !== undefined && (isNaN(stock) || stock < 0)) {
      return res.status(400).json({
        message: "Stock must be a non-negative number",
        success: false,
      });
    }

    if (variants && !Array.isArray(variants)) {
      return res.status(400).json({
        message: "Variants must be an array",
        success: false,
      });
    }

    if (specifications && typeof specifications !== "object") {
      return res.status(400).json({
        message: "Specifications must be an object",
        success: false,
      });
    }

    // Discount validation + recalculation
    let discountedPrice = product.discountedPrice;
    if (discount) {
      const productDiscount = await Discount.findById(discount);
      if (!productDiscount) {
        return res.status(400).json({
          message: "Invalid discount ID",
          success: false,
        });
      }
      // Get Discounted Price
      discountedPrice = calculateDiscountedPrice(price, productDiscount);
    }

    // Remove images if specified
    if (removeImages) {
      const imagesToRemove = Array.isArray(removeImages)
        ? removeImages
        : [removeImages];

      for (const publicId of imagesToRemove) {
        // delete from Cloudinary
        await deleteImage(publicId);

        // remove from product.images array
        product.images = product.images.filter(
          (img) => img.publicId !== publicId
        );
      }

      // Ensure at least one default image if images still exist
      if (product.images.length > 0) {
        product.images.forEach((img, index) => {
          img.isDefault = index === 0;
        });
      }
    }

    // Upload new images (append)
    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const result = await uploadImage(file.path, "uploads");

        if (!result.success) {
          return res.status(500).json({
            message: result.message,
            success: false,
          });
        }

        product.images.push({
          secureUrl: result.secureUrl,
          publicId: result.publicId,
          isDefault: product.images.length === 0 && i === 0,
        });

        fs.unlinkSync(file.path);
      }
    }

    // Apply updates
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (sku !== undefined) product.sku = sku;
    if (brand !== undefined) product.brand = brand;
    if (price !== undefined) product.price = price;
    if (discount !== undefined) product.discount = discount;
    if (category !== undefined) product.category = category;
    if (stock !== undefined) product.stock = stock;
    if (specifications !== undefined) product.specifications = specifications;
    if (variants !== undefined)
      product.variants = Array.isArray(variants) ? variants : [];

    product.discountedPrice = discountedPrice;

    const updatedProduct = await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Product deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};
