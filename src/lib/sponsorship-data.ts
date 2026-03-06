
export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number; // in UGX
  category: string;
  imageId: string;
  description: string;
  longDescription: string;
  sizes: string[];
  colors: { name: string, hex: string }[];
  rating: number;
  reviews: number;
};

const products: Product[] = [
  {
    id: "prod-1",
    slug: "kulture-foundation-tee",
    name: "Kulture Foundation Tee",
    price: 50000,
    category: "Apparel",
    imageId: "shop-shirt",
    description: "Show your support with our classic logo t-shirt, made from 100% organic cotton.",
    longDescription: "Our signature tee is more than just apparel; it's a statement of support. Made from soft, breathable 100% organic cotton, it's designed for comfort and durability. Featuring the Kulture Foundation logo prominently on the chest, it's a perfect way to show your alignment with our cause. All proceeds directly fund our community programs.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" }
    ],
    rating: 4.8,
    reviews: 112
  },
  {
    id: "prod-5",
    slug: "kulture-foundation-hoodie",
    name: "Kulture Foundation Hoodie",
    price: 95000,
    category: "Apparel",
    imageId: "shop-hoodie",
    description: "Stay warm and show your support with our comfortable and stylish branded hoodie.",
    longDescription: "Stay warm and inspired with our premium fleece-lined hoodie. It features a minimalist embroidered Kulture Foundation logo, a double-lined hood, and a spacious front pocket. This hoodie is perfect for cooler evenings and serves as a cozy reminder of the community you're helping to build.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Charcoal", hex: "#36454F" },
      { name: "Forest Green", hex: "#228B22" }
    ],
    rating: 4.9,
    reviews: 98
  },
  {
    id: "prod-2",
    slug: "artisan-woven-basket",
    name: "Artisan-Woven Basket",
    price: 85000,
    category: "Handcrafts",
    imageId: "shop-basket",
    description: "A beautiful, hand-woven decorative basket made by our partner artisans in the Mpigi district.",
    longDescription: "Each basket is a unique work of art, hand-woven by women in a cooperative we partner with in Mpigi. Using traditional techniques passed down through generations, they create intricate patterns with dyed raffia and palm leaves. Perfect as a decorative centerpiece or for stylish storage, your purchase directly empowers these talented artisans and their families.",
    sizes: ["One Size"],
    colors: [],
    rating: 4.7,
    reviews: 74
  },
  {
    id: "prod-6",
    slug: "kitengi-tote-bag",
    name: "Kitengi Tote Bag",
    price: 45000,
    category: "Apparel",
    imageId: "shop-tote",
    description: "A vibrant and durable tote bag made from traditional Kitengi fabric. Perfect for daily use.",
    longDescription: "Carry a piece of Ugandan vibrancy with you everywhere. Our tote bags are crafted from authentic, locally-sourced Kitengi fabric, known for its bold patterns and durability. Each bag is fully lined and features a reinforced base, making it perfect for groceries, books, or a day at the beach. No two bags are exactly alike!",
    sizes: ["One Size"],
    colors: [],
    rating: 4.6,
    reviews: 88
  },
  {
    id: "prod-3",
    slug: "handmade-beaded-necklace",
    name: "Handmade Beaded Necklace",
    price: 40000,
    category: "Jewelry",
    imageId: "shop-beads",
    description: "A vibrant, handcrafted beaded necklace showcasing traditional Ugandan patterns and colors.",
    longDescription: "This stunning necklace is handcrafted by artisans using a mix of glass beads and recycled paper beads. The intricate patterns are inspired by traditional Ugandan motifs, making each piece a wearable work of art. It's a versatile accessory that adds a pop of color and culture to any outfit.",
    sizes: ["One Size"],
    colors: [],
    rating: 4.9,
    reviews: 153
  },
  {
    id: "prod-7",
    slug: "woven-wall-hanging",
    name: "Woven Wall Hanging",
    price: 120000,
    category: "Handcrafts",
    imageId: "shop-wall-hanging",
    description: "An intricate, hand-woven wall hanging that brings a piece of Ugandan artistry into your home.",
    longDescription: "Transform your space with this beautiful, hand-woven wall hanging. Made from natural fibers like sisal and banana leaf, it features a modern design inspired by traditional Ugandan symbols. This piece not only adds texture and warmth to your home but also provides a sustainable income for the weaver who created it.",
    sizes: ["One Size"],
    colors: [],
    rating: 4.8,
    reviews: 42
  },
  {
    id: "prod-4",
    slug: "kulture-foundation-mug",
    name: "Kulture Foundation Mug",
    price: 30000,
    category: "Merchandise",
    imageId: "shop-mug",
    description: "Start your day with a reminder of your support for Ugandan culture. Ceramic 11oz mug.",
    longDescription: "Enjoy your favorite beverage in our classic ceramic mug. It features the Kulture Foundation logo and our tagline: 'Real stories. Real people. Real change.' It's dishwasher and microwave safe, making it a durable and meaningful addition to your daily routine.",
    sizes: ["One Size"],
    colors: [],
    rating: 4.5,
    reviews: 67
  },
  {
    id: "prod-8",
    slug: "multi-strand-paper-bead-bracelet",
    name: "Multi-strand Paper Bead Bracelet",
    price: 25000,
    category: "Jewelry",
    imageId: "shop-bracelet",
    description: "A colorful bracelet crafted from recycled paper beads, showcasing sustainable art.",
    longDescription: "This eco-friendly bracelet is a testament to Ugandan ingenuity. Each bead is hand-rolled from recycled paper, varnished for durability, and strung together to create a vibrant, multi-strand accessory. It's lightweight, comfortable, and a beautiful example of sustainable fashion that empowers its maker.",
    sizes: ["One Size"],
    colors: [],
    rating: 4.7,
    reviews: 91
  }
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}
 
