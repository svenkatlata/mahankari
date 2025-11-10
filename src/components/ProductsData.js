const images = import.meta.glob('../assets/products/*/*/*.{png,jpg,jpeg,svg}', {
  eager: true,
});

const subcodes = [
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A–Z
  ...Array.from({ length: 26 }, (_, i) => `Z${String.fromCharCode(65 + i)}`), // ZA–ZZ
];

const ChennurSilkSareeSpecs = {
      Occasion: 'Chennur Silk',
      Fabric: 'Hand Block Print',
      Colour: 'Kalamkari Dyeing',
      Length: 'Rust Red with Gold Border',
      Design: 'Hand Block Print',
      'Wash & Care': 'Kalamkari Dyeing',
      Origin: 'Rust Red with Gold Border',
    };

function generateItems(code, productName, category, fabric, stock, mrp, price, productSpecs) {
  const colours = stock.map((item) => item.colour);
  const quantity = stock.map((item) => item.qty);
  const count = colours.length;
  return subcodes.slice(0, count).map((subcode, idx) => ({
    id: `${code}-${subcode}`,
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
    excerpt: 'Some Short description',
    disclaimer:
      "* Since our sarees are hand-painted and handcrafted, minor irregularities such as slight misprints or variations in design are natural and add to the product's unique charm.",
    description: 'This premium Chennur silk saree showcases traditional Indian craftsmanship through vibrant Kalamkari dyeing and hand block prints. Perfect for festive occasions, weddings, and celebrations. Comes with a matching blouse piece.',
    productSpecs: productSpecs,
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
  'Bengal Soft Cotton',
  stock25,
  '950',
  '750',
  ChennurSilkSareeSpecs,
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
  'Hand-Painted Sunflower Print Trendy Saree',
  'Bengal Soft Cotton Sarees',
  'Bengal Soft Cotton',
  stock26,
  '1,150',
  '950',
  ChennurSilkSareeSpecs,
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
  '1,300',
  '1,100',
  ChennurSilkSareeSpecs,
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
  '1,200',
  '1,000',
  ChennurSilkSareeSpecs,
);

const stock29 = [
  { colour: 'Multicolour', qty: 1 },
  { colour: 'Multicolour', qty: 1 },
  { colour: 'Multicolour', qty: 1 },
  { colour: 'Multicolour', qty: 1 },
  { colour: 'Multicolour', qty: 1 },
  { colour: 'Multicolour', qty: 1 },
  { colour: 'Multicolour', qty: 1 },
  { colour: 'Multicolour', qty: 1 },
  { colour: 'Multicolour', qty: 1 },
  { colour: 'Multicolour', qty: 1 },
  { colour: 'Multicolour', qty: 1 },
  { colour: 'Multicolour', qty: 1 },
  { colour: 'Multicolour', qty: 1 },
  { colour: 'Multicolour', qty: 1 },
  { colour: 'Multicolour', qty: 1 },
  { colour: 'Multicolour', qty: 1 },
  { colour: 'Multicolour', qty: 1 },
  { colour: 'Multicolour', qty: 1 },
];
const item29 = generateItems(
  '29HC20',
  'Kalamkari Cotton Saree',
  'Handloom Cotton Sarees',
  '120 Count Pure Cotton',
  stock29,
  '1,050',
  '850',
  ChennurSilkSareeSpecs,
);

const stock30 = [
  { colour: 'Red', qty: 2 },
  { colour: 'Black', qty: 2 },
  { colour: 'Blue', qty: 2 },
  { colour: 'Chocolate', qty: 2 },
  { colour: 'Black', qty: 1 },
  { colour: 'Black', qty: 1 },
  { colour: 'Red', qty: 1 },
  { colour: 'Red', qty: 1 },
  { colour: 'Red', qty: 1 },
  { colour: 'Yellow', qty: 1 },
];
const item30 = generateItems(
  '30NB10',
  'Nizam Border Kalamkari Saree',
  'Chennur Silk Sarees',
  'Chennur Silk',
  stock30,
  '2,400',
  '2,200',
  ChennurSilkSareeSpecs,
);

const stock31 = [
  { colour: 'Red', qty: 1 },
  { colour: 'Green', qty: 1 },
  { colour: 'Teal', qty: 1 },
  { colour: 'Black', qty: 1 },
  { colour: 'Purple', qty: 1 },
  { colour: 'Yellow', qty: 1 },
];
const item31 = generateItems(
  '31PK6',
  'Pen Kalamkari Dupatta',
  'Pen Kalamkari Lehengas',
  'Chennur Silk',
  stock31,
  '2,250',
  '2,050',
  ChennurSilkSareeSpecs,
);

const stock32 = [
  { colour: 'Violet', qty: 1 },
  { colour: 'Teal', qty: 1 },
];
const item32 = generateItems(
  '32GS2',
  'Hand Block Printed Crochet Dress Material',
  'Unstiched Dress Material',
  'Georgette',
  stock32,
  '1,950',
  '1,750',
  ChennurSilkSareeSpecs,
);

const stock33 = [
  { colour: 'Tangerine', qty: 1 },
  { colour: 'Maroon', qty: 1 },
  { colour: 'Blue', qty: 1 },
];
const item33 = generateItems(
  '33GS3',
  'Hand Block Printed Dress Material',
  'Unstiched Dress Material',
  'Georgette',
  stock33,
  '1,650',
  '1,450',
  ChennurSilkSareeSpecs,
);

const stock34 = [
  { colour: 'Orange', qty: 1 },
  { colour: 'Teal', qty: 1 },
  { colour: 'Mustard', qty: 1 },
  { colour: 'Coffee', qty: 1 },
  { colour: 'Red', qty: 1 },
];
const item34 = generateItems(
  '34KS5',
  'Hand Block Printed Dress Material',
  'Unstiched Dress Material',
  'Kota Cotton',
  stock34,
  '1,650',
  '1,450',
  ChennurSilkSareeSpecs,
);

const products = [
  ...item25,
  ...item26,
  ...item27,
  ...item28,
  ...item29,
  ...item30,
  ...item31,
  ...item32,
  ...item33,
  ...item34,
];

const trending = [...item26];
const newArrivals = [...item31];
const exclusive = [...item32, ...item33, ...item34];

const chennurSilkSarees = [...item30];
const kotaDoriyaSarees = [...item27];
const malaiCottonSarees = [...item28];
const handloomCottonSarees = [...item29];
const bengalSoftCottonSarees = [...item25, ...item26];

export {
  products,
  trending,
  newArrivals,
  exclusive,
  chennurSilkSarees,
  kotaDoriyaSarees,
  malaiCottonSarees,
  handloomCottonSarees,
  bengalSoftCottonSarees,
};
