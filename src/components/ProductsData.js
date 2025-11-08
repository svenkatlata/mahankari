const images = import.meta.glob('../assets/products/*/*/*.{png,jpg,jpeg,svg}', {
  eager: true,
});

const subcodes = [
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A–Z
  ...Array.from({ length: 26 }, (_, i) => `Z${String.fromCharCode(65 + i)}`), // ZA–ZZ
];

function generateItems(code, productName, category, fabric, stock, mrp, price) {
  const colours = stock.map(item => item.colour);
  const quantity = stock.map(item => item.qty);
  const count = colours.length;
  return subcodes.slice(0, count).map((subcode, idx) => ({
    id: `${code}/${subcode}`,
    product: productName,
    category: category,
    fabric: fabric,
    colour: colours[idx],
    quantity: quantity[idx],
    mrp: mrp,
    price: price,
    images: Object.keys(images)
      .filter((path) => path.includes(`${code}/${subcode}/`))
      .map((path) => images[path]),
    soldout: false,
  }));
}

const stock25 = [
  { colour: 'Black', qty: 2 },
  { colour: 'White', qty: 1 },
  { colour: 'Pink', qty: 2 },
  { colour: 'Red', qty: 1 },
  { colour: 'Navy', qty: 1 },
  { colour: 'Green', qty: 1 },
];
const item25 = generateItems(
  '25SC6',
  'Rainbow Saree',
  'Bengal Soft Cotton Sarees',
  'Malai Cotton',
  stock25,
  950,
  750
);

const stock26 = [
  { colour: 'Yellow', qty: 1 },
  { colour: 'Pink', qty: 1 },
  { colour: 'Red', qty: 1 },
  { colour: 'Sky Blue', qty: 1 },
  { colour: 'Blue', qty: 1 },
  { colour: 'Navy', qty: 1 },
  { colour: 'Light Green', qty: 1 },
  { colour: 'Bottle Green', qty: 1 },
];
const item26 = generateItems(
  '26SC8',
  'Sunflower Saree',
  'Bengal Soft Cotton Sarees',
  'Malai Cotton',
  stock26,
  1150,
  950
);

const stock27 = [
  { colour: 'Lavender', qty: 1 },
  { colour: 'Magenta', qty: 1 },
  { colour: 'Peach', qty: 1 },
  { colour: 'Golden', qty: 1 },
  { colour: 'Orange', qty: 1 },
  { colour: 'Marigold', qty: 1 },
  { colour: 'Teal', qty: 1 },
  { colour: 'Rose', qty: 1 },
  { colour: 'Peach', qty: 1 },
  { colour: 'Orange', qty: 1 },
  { colour: 'Golden', qty: 1 },
  { colour: 'Marigold', qty: 1 },
  { colour: 'Teal', qty: 1 },
  { colour: 'Tangerine', qty: 1 },
  { colour: 'Grey', qty: 1 },
  { colour: 'Green', qty: 1 },
  { colour: 'Coral', qty: 1 },
  { colour: 'Cream', qty: 1 },
  { colour: 'Sea Green', qty: 1 },
  { colour: 'Pink', qty: 1 },
  { colour: 'Coral', qty: 1 },
  { colour: 'Green', qty: 1 },
  { colour: 'Grey', qty: 1 },
  { colour: 'Sky Blue', qty: 1 },
  { colour: 'Cucumber', qty: 1 },
  { colour: 'Blush', qty: 1 },
  { colour: 'Coral', qty: 1 },
  { colour: 'Blush', qty: 1 },
  { colour: 'Blush', qty: 1 },
  { colour: 'Yellow', qty: 1 },
  { colour: 'Cream', qty: 1 },
  { colour: 'Cream', qty: 1 },
  { colour: 'Yellow', qty: 1 },
  { colour: 'Grey', qty: 1 },
  { colour: 'Cream', qty: 1 },
];

const item27 = generateItems(
  '27SC35',
  'Kota Doriya Embroidery Saree',
  'Kota Doriya Sarees',
  'Kota Doriya',
  stock27,
  1300,
  1100
);

const stock28 = [
  { colour: 'Teal', qty: 1 },
  { colour: 'Blue', qty: 1 },
  { colour: 'Blue', qty: 1 },
  { colour: 'Navy', qty: 1 },
  { colour: 'Navy', qty: 1 },
  { colour: 'Pink', qty: 1 },
  { colour: 'Pink', qty: 1 },
  { colour: 'Grey', qty: 1 },
  { colour: 'Grey', qty: 1 },
  { colour: 'Tangerine', qty: 1 },
  { colour: 'Tangerine', qty: 1 },
];
const item28 = generateItems(
  '28MC11',
  'Office Chic Saree',
  'Malai Cotton Sarees',
  'MulMul Cotton',
  stock28,
  1200,
  1000
);



const products = [
  { item25: { ...item25 }, item26: { ...item26 }, item27: { ...item27 }, item28: { ...item28 } },
];

const newArrivals = [
  {...item26}
];

export { products, newArrivals };
