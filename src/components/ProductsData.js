const saree26 = [
  {
    id: '26SC8/A',
    product: 'Sunflower Saree',
    category: 'Bengal Soft Cotton Sarees',
    fabric: 'Malai Cotton',
    colour: 'Red',
    mrp: 1150,
    price: 950,
    images: import.meta.glob(
      '../assets/products/26SC8/A/*.{png,jpg,jpeg,svg}',
      { eager: true }
    ),
    description: `description`,
    soldout: false,
  },
  {
    id: '26SC8/B',
    product: 'Sunflower Saree',
    category: 'Bengal Soft Cotton Sarees',
    fabric: 'Malai Cotton',
    colour: 'Red',
    mrp: 1150,
    price: 950,
    images: import.meta.glob(
      '../assets/products/26SC8/B/*.{png,jpg,jpeg,svg}',
      { eager: true }
    ),
    description: `description`,
    soldout: false,
  },
  {
    id: '26SC8/C',
    product: 'Sunflower Saree',
    category: 'Bengal Soft Cotton Sarees',
    fabric: 'Malai Cotton',
    colour: 'Red',
    mrp: 1150,
    price: 950,
    images: import.meta.glob(
      '../assets/products/26SC8/C/*.{png,jpg,jpeg,svg}',
      { eager: true }
    ),
    description: `description`,
    soldout: false,
  },
  {
    id: '26SC8/D',
    product: 'Sunflower Saree',
    category: 'Bengal Soft Cotton Sarees',
    fabric: 'Malai Cotton',
    colour: 'Red',
    mrp: 1150,
    price: 950,
    images: import.meta.glob(
      '../assets/products/26SC8/D/*.{png,jpg,jpeg,svg}',
      { eager: true }
    ),
    description: `description`,
    soldout: false,
  },
  {
    id: '26SC8/E',
    product: 'Sunflower Saree',
    category: 'Bengal Soft Cotton Sarees',
    fabric: 'Malai Cotton',
    colour: 'Red',
    mrp: 1150,
    price: 950,
    images: import.meta.glob(
      '../assets/products/26SC8/E/*.{png,jpg,jpeg,svg}',
      { eager: true }
    ),
    description: `description`,
    soldout: false,
  },
  {
    id: '26SC8/F',
    product: 'Sunflower Saree',
    category: 'Bengal Soft Cotton Sarees',
    fabric: 'Malai Cotton',
    colour: 'Red',
    mrp: 1150,
    price: 950,
    images: import.meta.glob(
      '../assets/products/26SC8/F/*.{png,jpg,jpeg,svg}',
      { eager: true }
    ),
    description: `description`,
    soldout: false,
  },
  {
    id: '26SC8/G',
    product: 'Sunflower Saree',
    category: 'Bengal Soft Cotton Sarees',
    fabric: 'Malai Cotton',
    colour: 'Red',
    mrp: 1150,
    price: 950,
    images: import.meta.glob(
      '../assets/products/26SC8/G/*.{png,jpg,jpeg,svg}',
      { eager: true }
    ),
    description: `description`,
    soldout: false,
  },
  {
    id: '26SC8/H',
    product: 'Sunflower Saree',
    category: 'Bengal Soft Cotton Sarees',
    fabric: 'Malai Cotton',
    colour: 'Red',
    mrp: 1150,
    price: 950,
    images: import.meta.glob(
      '../assets/products/26SC8/H/*.{png,jpg,jpeg,svg}',
      { eager: true }
    ),
    description: `description`,
    soldout: false,
  },
];

const saree25 = [
  {
    id: '25SC8/A',
    product: 'Rainbow Saree',
    category: 'Bengal Soft Cotton Sarees',
    fabric: 'Malai Cotton',
    colour: 'Red',
    mrp: 950,
    price: 750,
    images: import.meta.glob(
      '../assets/products/25SC8/A/*.{png,jpg,jpeg,svg}',
      { eager: true }
    ),
    description: `description`,
    soldout: false,
  },
  
];

const products = [ {saree26: { ...saree26 }, saree25: { ...saree25 }}];

export { products };
