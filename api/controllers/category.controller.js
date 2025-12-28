import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import { uploadImage, deleteImage } from "../config/cloudinary.js";
import fs from "fs";

export const addCategory = async (req, res) => {
  try {
    const { categoryName, description, parentCategory } = req.body;
    const products = req.body.products
      ? Array.isArray(req.body.products)
        ? req.body.products
        : [req.body.products]
      : [];

    if (!categoryName) {
      return res.status(400).json({ error: "Category name is required" });
    }

    if (parentCategory) {
      const parentCatExists = await Category.findById(parentCategory);
      if (!parentCatExists) {
        return res.status(400).json({ error: "Parent category not found" });
      }
    }

    if (products.length > 0) {
      for (let productId of products) {
        const productExists = await Product.findById(productId);
        if (!productExists) {
          return res
            .status(400)
            .json({ error: `Invalid product ID: ${productId}` });
        }
      }
    }

    // Handle image uploads
    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      // Upload each file to Cloudinary
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
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

        console.log("Uploaded:", file.filename);
      }
    }

    const newCategory = new Category({
      name: categoryName,
      description: description || "",
      parentCategory: parentCategory || null,
      products: products || [],
      images: uploadedImages || [],
    });

    const savedCategory = await newCategory.save();
    return res.status(201).json({
      message: "Category created successfully",
      category: savedCategory,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId)
      .populate("products", "name price images.0")
      .populate("parentCategory", "name images.0");

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Category found",
      category,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { categoryName, description, parentCategory, removeImages } =
      req.body;

    // Normalize products input
    const products = req.body.products
      ? Array.isArray(req.body.products)
        ? req.body.products
        : [req.body.products]
      : [];

    // Validate category ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Validate categoryName (optional)
    if (categoryName !== undefined && !categoryName.trim()) {
      return res.status(400).json({ error: "Category name cannot be empty" });
    }

    // Validate parent category if updating
    if (parentCategory) {
      const parentCatExists = await Category.findById(parentCategory);
      if (!parentCatExists) {
        return res.status(400).json({ error: "Parent category not found" });
      }
      if (categoryId === parentCategory) {
        return res
          .status(400)
          .json({ error: "Category cannot be its own parent" });
      }
    }

    // Validate products if provided
    if (products.length > 0) {
      for (let productId of products) {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
          return res.status(400).json({
            error: `Invalid product ID format: ${productId}`,
          });
        }
        const productExists = await Product.findById(productId);
        if (!productExists) {
          return res.status(400).json({
            error: `Invalid product ID: ${productId}`,
          });
        }
      }
    }

    // Remove images if requested
    if (removeImages && removeImages.length > 0) {
      for (let publicId of removeImages) {
        // Delete Cloudinary image
        await deleteImage(publicId);

        // Remove image from category array
        category.images = category.images.filter(
          (img) => img.publicId !== publicId
        );
      }
    }

    // Handle NEW image uploads
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const result = await uploadImage(file.path, "uploads");

        if (!result.success) {
          return res.status(500).json({
            message: result.message,
            success: false,
          });
        }

        category.images.push({
          secureUrl: result.secureUrl,
          publicId: result.publicId,
          isDefault: false,
        });

        fs.unlinkSync(file.path);
      }
    }

    // Update category fields
    if (categoryName !== undefined) category.name = categoryName;
    if (description !== undefined) category.description = description;
    if (parentCategory !== undefined) category.parentCategory = parentCategory;
    if (products.length > 0) category.products = products;

    const updatedCategory = await category.save();

    return res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    // Check if category has children
    const children = await Category.find({ parentCategory: categoryId });
    if (children.length > 0) {
      return res.status(400).json({
        message: "Cannot delete category with subcategories",
        success: false,
      });
    }

    // Delete images from Cloudinary
    if (category.images && category.images.length > 0) {
      for (let img of category.images) {
        await deleteImage(img.publicId);
      }
    }

    // Delete category
    await Category.findByIdAndDelete(categoryId);

    return res.status(200).json({
      message: "Category deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({})
      .populate("products", "name price images.0")
      .populate("parentCategory", "name images.0")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Categories fetched successfully",
      categories,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error.toString(),
      success: false,
    });
  }
};
