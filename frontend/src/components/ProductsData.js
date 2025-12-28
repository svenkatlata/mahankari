const images = import.meta.glob("../assets/products/*/*/*.{png,jpg,jpeg,svg}", {
  eager: true,
});

const subcodes = [
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A–Z
  ...Array.from({ length: 26 }, (_, i) => `Z${String.fromCharCode(65 + i)}`), // ZA–ZZ
];

const ChennurSilkSareeSpecs = {
  Occasion: "Chennur Silk",
  Fabric: "Hand Block Print",
  Colour: "Kalamkari Dyeing",
  Length: "Rust Red with Gold Border",
  Design: "Hand Block Print",
  "Wash & Care": "Kalamkari Dyeing",
  Origin: "Rust Red with Gold Border",
};

function generateItems(
  code,
  productName,
  category,
  fabric,
  stock,
  mrp,
  price,
  productSpecs
) {
  return stock.map((item) => ({
    id: `${code}-${item.subcode}`,
    product: productName,
    category: category,
    fabric: fabric,
    colour: item.colour,
    quantity: item.qty,
    mrp: mrp,
    price: price,
    images: Object.keys(images)
      .filter((path) => path.includes(`${code}/${item.subcode}/`))
      .map((path) => images[path]),
    isSoldOut: item.qty + 2 === 0,
    excerpt: "Some Short description",
    disclaimer:
      "* Since our sarees are hand-painted and handcrafted, minor irregularities such as slight misprints or variations in design are natural and add to the product's unique charm.",
    description:
      "This premium Chennur silk saree showcases traditional Indian craftsmanship through vibrant Kalamkari dyeing and hand block prints. Perfect for festive occasions, weddings, and celebrations. Comes with a matching blouse piece.",
    productSpecs: productSpecs,
  }));
}

const stock25 = [
  { subcode: "A", colour: "Black", qty: 2 },
  { subcode: "B", colour: "White", qty: 1 },
  { subcode: "C", colour: "Pink", qty: 2 },
  { subcode: "D", colour: "Red", qty: 1 },
  { subcode: "E", colour: "Navy", qty: 1 },
  { subcode: "F", colour: "Green", qty: 1 },
];
const item25 = generateItems(
  "25SC6",
  "Rainbow Saree",
  "Bengal Soft Cotton Sarees",
  "Bengal Soft Cotton",
  stock25,
  "950",
  "750",
  ChennurSilkSareeSpecs
);

const stock26 = [
  { subcode: "A", colour: "Yellow", qty: 1 },
  { subcode: "B", colour: "Pink", qty: 1 },
  { subcode: "C", colour: "Red", qty: 1 },
  { subcode: "D", colour: "Sky Blue", qty: 1 },
  { subcode: "E", colour: "Blue", qty: 1 },
  { subcode: "F", colour: "Navy", qty: 1 },
  { subcode: "G", colour: "Light Green", qty: 1 },
  { subcode: "H", colour: "Bottle Green", qty: 1 },
];
const item26 = generateItems(
  "26SC8",
  "Hand-Painted Sunflower Print Trendy Saree",
  "Bengal Soft Cotton Sarees",
  "Bengal Soft Cotton",
  stock26,
  "1,150",
  "950",
  ChennurSilkSareeSpecs
);

const stock27 = [
  { subcode: "A", colour: "Lavender", qty: 1 },
  { subcode: "B", colour: "Magenta", qty: 1 },
  { subcode: "C", colour: "Peach", qty: 1 },
  { subcode: "D", colour: "Golden", qty: 1 },
  { subcode: "E", colour: "Orange", qty: 1 },
  { subcode: "F", colour: "Marigold", qty: 1 },
  { subcode: "G", colour: "Teal", qty: 1 },
  { subcode: "H", colour: "Rose", qty: 1 },
  { subcode: "I", colour: "Peach", qty: 1 },
  { subcode: "J", colour: "Orange", qty: 1 },
  { subcode: "K", colour: "Golden", qty: 1 },
  { subcode: "L", colour: "Marigold", qty: 1 },
  { subcode: "M", colour: "Teal", qty: 1 },
  { subcode: "N", colour: "Tangerine", qty: 1 },
  { subcode: "O", colour: "Grey", qty: 1 },
  { subcode: "P", colour: "Green", qty: 1 },
  { subcode: "Q", colour: "Coral", qty: 1 },
  { subcode: "R", colour: "Cream", qty: 1 },
  { subcode: "S", colour: "Sea Green", qty: 1 },
  { subcode: "T", colour: "Pink", qty: 1 },
  { subcode: "U", colour: "Coral", qty: 1 },
  { subcode: "V", colour: "Green", qty: 1 },
  { subcode: "W", colour: "Grey", qty: 1 },
  { subcode: "X", colour: "Sky Blue", qty: 1 },
  { subcode: "Y", colour: "Cucumber", qty: 1 },
  { subcode: "Z", colour: "Blush", qty: 1 },
  { subcode: "ZA", colour: "Coral", qty: 1 },
  { subcode: "ZB", colour: "Blush", qty: 1 },
  { subcode: "ZC", colour: "Blush", qty: 1 },
  { subcode: "ZD", colour: "Yellow", qty: 1 },
  { subcode: "ZE", colour: "Cream", qty: 1 },
  { subcode: "ZF", colour: "Cream", qty: 1 },
  { subcode: "ZG", colour: "Yellow", qty: 1 },
  { subcode: "ZH", colour: "Grey", qty: 1 },
  { subcode: "ZI", colour: "Cream", qty: 1 },
];

const item27 = generateItems(
  "27KD35",
  "Kota Doriya Embroidery Saree",
  "Kota Doriya Sarees",
  "Kota Doriya",
  stock27,
  "1,300",
  "1,100",
  ChennurSilkSareeSpecs
);

const stock28 = [
  { subcode: "A", colour: "Teal", qty: 1 },
  { subcode: "B", colour: "Blue", qty: 1 },
  { subcode: "C", colour: "Blue", qty: 1 },
  { subcode: "D", colour: "Navy", qty: 1 },
  { subcode: "E", colour: "Navy", qty: 1 },
  { subcode: "F", colour: "Pink", qty: 1 },
  { subcode: "G", colour: "Pink", qty: 1 },
  { subcode: "H", colour: "Grey", qty: 1 },
  { subcode: "I", colour: "Grey", qty: 1 },
  { subcode: "J", colour: "Tangerine", qty: 1 },
  { subcode: "K", colour: "Tangerine", qty: 1 },
];

const item28 = generateItems(
  "28MC11",
  "Office Chic Saree",
  "Malai Cotton Sarees",
  "MulMul Cotton",
  stock28,
  "1,200",
  "1,000",
  ChennurSilkSareeSpecs
);

const stock29 = [
  { subcode: "A", colour: "Multicolour", qty: 1 },
  { subcode: "B", colour: "Multicolour", qty: 1 },
  { subcode: "C", colour: "Multicolour", qty: 1 },
  { subcode: "D", colour: "Multicolour", qty: 1 },
  { subcode: "E", colour: "Multicolour", qty: 1 },
  { subcode: "F", colour: "Multicolour", qty: 1 },
  { subcode: "G", colour: "Multicolour", qty: 1 },
  { subcode: "H", colour: "Multicolour", qty: 1 },
  { subcode: "I", colour: "Multicolour", qty: 1 },
  { subcode: "J", colour: "Multicolour", qty: 1 },
  { subcode: "K", colour: "Multicolour", qty: 1 },
  { subcode: "L", colour: "Multicolour", qty: 1 },
  { subcode: "M", colour: "Multicolour", qty: 1 },
  { subcode: "N", colour: "Multicolour", qty: 1 },
  { subcode: "O", colour: "Multicolour", qty: 1 },
  { subcode: "P", colour: "Multicolour", qty: 1 },
  { subcode: "Q", colour: "Multicolour", qty: 1 },
  { subcode: "R", colour: "Multicolour", qty: 1 },
];
const item29 = generateItems(
  "29HC20",
  "Kalamkari Cotton Saree",
  "Handloom Cotton Sarees",
  "120 Count Pure Cotton",
  stock29,
  "1,050",
  "850",
  ChennurSilkSareeSpecs
);

const stock30 = [
  { subcode: "A", colour: "Red", qty: 2 },
  { subcode: "B", colour: "Black", qty: 2 },
  { subcode: "C", colour: "Blue", qty: 2 },
  { subcode: "D", colour: "Chocolate", qty: 2 },
  { subcode: "E", colour: "Black", qty: 1 },
  { subcode: "F", colour: "Black", qty: 1 },
  { subcode: "G", colour: "Red", qty: 1 },
  { subcode: "H", colour: "Red", qty: 1 },
  { subcode: "I", colour: "Red", qty: 1 },
  { subcode: "J", colour: "Yellow", qty: 1 },
];
const item30 = generateItems(
  "30NB10",
  "Nizam Border Kalamkari Saree",
  "Chennur Silk Sarees",
  "Chennur Silk",
  stock30,
  "2,400",
  "2,200",
  ChennurSilkSareeSpecs
);

const stock31 = [
  { subcode: "A", colour: "Red", qty: 1 },
  { subcode: "B", colour: "Green", qty: 1 },
  { subcode: "C", colour: "Teal", qty: 1 },
  { subcode: "D", colour: "Black", qty: 1 },
  { subcode: "E", colour: "Purple", qty: 1 },
  { subcode: "F", colour: "Yellow", qty: 1 },
];
const item31 = generateItems(
  "31PK6",
  "Pen Kalamkari Dupatta",
  "Pen Kalamkari Lehengas",
  "Chennur Silk",
  stock31,
  "2,250",
  "2,050",
  ChennurSilkSareeSpecs
);

const stock32 = [
  { subcode: "A", colour: "Violet", qty: 1 },
  { subcode: "B", colour: "Teal", qty: 1 },
];
const item32 = generateItems(
  "32GS2",
  "Hand Block Printed Crochet Dress Material",
  "Unstiched Dress Material",
  "Georgette",
  stock32,
  "1,950",
  "1,750",
  ChennurSilkSareeSpecs
);

const stock33 = [
  { subcode: "A", colour: "Tangerine", qty: 1 },
  { subcode: "B", colour: "Maroon", qty: 1 },
  { subcode: "C", colour: "Blue", qty: 1 },
];
const item33 = generateItems(
  "33GS3",
  "Hand Block Printed Dress Material",
  "Unstiched Dress Material",
  "Georgette",
  stock33,
  "1,650",
  "1,450",
  ChennurSilkSareeSpecs
);

const stock34 = [
  { subcode: "A", colour: "Orange", qty: 1 },
  { subcode: "B", colour: "Teal", qty: 1 },
  { subcode: "C", colour: "Mustard", qty: 1 },
  { subcode: "D", colour: "Coffee", qty: 1 },
  { subcode: "E", colour: "Red", qty: 1 },
];

const item34 = generateItems(
  "34KS5",
  "Hand Block Printed Dress Material",
  "Unstiched Dress Material",
  "Kota Cotton",
  stock34,
  "1,650",
  "1,450",
  ChennurSilkSareeSpecs
);

const allProducts = [
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
const sarees = [
  ...item25,
  ...item26,
  ...item27,
  ...item28,
  ...item29,
  ...item30,
];
const dresses = [
  ...item32,
  ...item33,
  ...item34,
];
const dupattas = [...item31];

const bestSelling = [...item30];
const trending = [...item26];
const newArrivals = [...item31];
const exclusive = [...item32, ...item33, ...item34];

const chennurSilkSarees = [...item30];
const kotaDoriyaSarees = [...item27];
const malaiCottonSarees = [...item28];
const handloomCottonSarees = [...item29];
const bengalSoftCottonSarees = [...item25, ...item26];

export {
  sarees,
  dresses,
  dupattas,
  allProducts,
  bestSelling,
  trending,
  newArrivals,
  exclusive,
  chennurSilkSarees,
  kotaDoriyaSarees,
  malaiCottonSarees,
  handloomCottonSarees,
  bengalSoftCottonSarees,
};
