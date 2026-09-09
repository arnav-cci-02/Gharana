import { images } from "./data/images";

export type Product = {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  weight: string;
  badge: string;
  featured: boolean;
  images: string[];
  variants: string[];
  ingredients: string[];
  nutritionalInfo: string[];
  benefits: string[];
  theme: {
    background: string;
    foreground: string;
    accent: string;
  };
};

export const siteImages = {
  hero: images.hero.main,
  heroAlt: images.hero.main,
  storyFarm: images.hero.main,
  gifting: images.products.giftPack,
  global: images.products.giftPack,
  table: images.products.classic,
};

export const categoryCards = [
  {
    name: "Classic Roasted",
    description: "Slow roasted, naturally crisp and nutty.",
    image: images.products.classic,
  },
  {
    name: "Flavoured Makhana",
    description: "Bold, vibrant notes for modern snacking.",
    image: images.products.periPeri,
  },
  {
    name: "Gift Packs",
    description: "Curated gifting with a premium finish.",
    image: images.products.giftPack,
  },
  {
    name: "Cheese Makhana",
    description: "A rich, savoury crunch for sharing.",
    image: images.products.cheese,
  },
  {
    name: "Salted Makhana",
    description: "Clean seasoning and an easy everyday crunch.",
    image: images.products.salted,
  },
  {
    name: "Chocolate Makhana",
    description: "A deep cocoa finish with a crisp bite.",
    image: images.products.chocolate,
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Roasted Makhana",
    slug: "classic-roasted-makhana",
    category: "Classic Roasted",
    description:
      "Lightly roasted foxnuts with a buttery finish and a clean, nutty crunch that brings a premium everyday ritual to the table.",
    shortDescription:
      "Naturally crisp, gently roasted and ready for every moment.",
    price: 249,
    originalPrice: 299,
    weight: "100 g",
    badge: "Best Seller",
    featured: true,
    images: [images.products.classic],
    variants: ["Classic", "Smoky", "Salted"],
    ingredients: ["Makhana", "Cold-pressed edible oil", "Sea salt"],
    nutritionalInfo: ["High in protein", "Low in saturated fat", "Gluten free"],
    benefits: [
      "Light and crunchy",
      "Digestive-friendly snack",
      "Ideal for mindful snacking",
    ],
    theme: { background: "#d8c29e", foreground: "#17110c", accent: "#e86d3f" },
  },
  {
    id: 2,
    name: "Peri Peri Makhana",
    slug: "peri-peri-makhana",
    category: "Flavoured Makhana",
    description:
      "A vibrant, spiced roast shaped for those who enjoy a little heat with a clean finish and elevated snacking experience.",
    shortDescription: "Crisp makhana with a fiery peri peri finish.",
    price: 279,
    weight: "80 g",
    badge: "Spicy Pick",
    featured: true,
    images: [images.products.periPeri],
    variants: ["100 g", "200 g"],
    ingredients: ["Makhana", "Peri peri seasoning", "Sunflower oil"],
    nutritionalInfo: ["Rich in fibre", "Natural protein", "No maida"],
    benefits: [
      "High flavour impact",
      "Healthy crunch",
      "Perfect for evening bites",
    ],
    theme: { background: "#d9572b", foreground: "#fff5e8", accent: "#d6ed67" },
  },
  {
    id: 3,
    name: "Cheese Makhana",
    slug: "cheese-makhana",
    category: "Cheese Makhana",
    description:
      "A rich, savoury roast with a cheesy finish and a crisp, satisfying bite.",
    shortDescription: "A creamy cheese finish over a light, crisp crunch.",
    price: 289,
    weight: "100 g",
    badge: "Flavour Note",
    featured: false,
    images: [images.products.cheese],
    variants: ["100 g"],
    ingredients: ["Makhana", "Cheese seasoning", "Sunflower oil"],
    nutritionalInfo: [
      "Naturally gluten free",
      "Protein-rich",
      "Balanced seasoning",
    ],
    benefits: [
      "Premium pantry snack",
      "Good for social snacking",
      "Clean taste profile",
    ],
    theme: { background: "#e0b52d", foreground: "#17110c", accent: "#fff3a6" },
  },
  {
    id: 4,
    name: "Premium Gift Box",
    slug: "premium-gift-box",
    category: "Gift Packs",
    description:
      "A beautifully curated celebratory box that turns makhana into a thoughtful gifting ritual for festive and corporate moments.",
    shortDescription:
      "Premium makhana gift sets designed for meaningful occasions.",
    price: 799,
    weight: "4 packs",
    badge: "Gift Ready",
    featured: true,
    images: [images.products.giftPack],
    variants: ["Festive", "Corporate", "Custom"],
    ingredients: ["Assorted makhana flavours", "Luxury gift packaging"],
    nutritionalInfo: ["Gift-worthy assortment", "Premium presentation"],
    benefits: ["Elegant gifting", "Ready to send", "Celebration-ready"],
    theme: { background: "#d3aa4a", foreground: "#17110c", accent: "#fff0bd" },
  },
  {
    id: 5,
    name: "Salted Makhana",
    slug: "salted-makhana",
    category: "Salted Makhana",
    description:
      "Lightly seasoned makhana with a clean salt finish and an easy everyday crunch.",
    shortDescription: "Clean seasoning and a satisfying everyday crunch.",
    price: 229,
    weight: "250 g",
    badge: "Kitchen Essential",
    featured: false,
    images: [images.products.salted],
    variants: ["250 g", "500 g"],
    ingredients: ["Makhana", "Sea salt", "Cold-pressed edible oil"],
    nutritionalInfo: [
      "Naturally wholesome",
      "Flexible ingredient",
      "No additives",
    ],
    benefits: ["Light and crunchy", "Clean taste profile", "Everyday snacking"],
    theme: { background: "#d8ddd2", foreground: "#171b17", accent: "#9baea0" },
  },
  {
    id: 6,
    name: "Chocolate Coated Makhana",
    slug: "chocolate-coated-makhana",
    category: "Chocolate Coated Makhana",
    description:
      "Crisp makhana finished with a deep cocoa coating for a naturally indulgent bite.",
    shortDescription: "A deep cocoa finish with a crisp makhana bite.",
    price: 399,
    weight: "100 g",
    badge: "New",
    featured: false,
    images: [images.products.chocolate],
    variants: ["100 g"],
    ingredients: ["Makhana", "Cocoa", "Cane sugar"],
    nutritionalInfo: [
      "Gluten free",
      "Light and versatile",
      "Baked-good friendly",
    ],
    benefits: ["Crisp texture", "Rich cocoa finish", "Made for treat moments"],
    theme: { background: "#4a261d", foreground: "#fff2e4", accent: "#d99a78" },
  },
];

export const benefitMarquee = [
  "PREMIUM MAKHANA",
  "INDIAN ORIGIN",
  "CAREFULLY ROASTED",
  "HEALTHY SNACKING",
  "MADE FOR THE WORLD",
  "QUALITY FIRST",
];

export const storyStages = [
  {
    step: "START",
    title: "Digital Business Passport",
    text: "Building the operational backbone that helps great products get clarity, trust and momentum.",
  },
  {
    step: "BUILD",
    title: "Brand Studio",
    text: "Designing the identity, packaging and storytelling that gives Indian products a premium global voice.",
  },
  {
    step: "OPERATE",
    title: "AI Assistant + Logistics Intelligence",
    text: "Turning scattered operations into a connected system built for better decision making and scale.",
  },
  {
    step: "GROW",
    title: "Marketing + Finance Readiness",
    text: "Creating the structure needed to support visibility, trust and sustainable growth.",
  },
  {
    step: "EXPORT",
    title: "Export Readiness + Global Connections",
    text: "Preparing Indian excellence for a global future with stronger systems, standards and story.",
  },
];

export const testimonials = [
  {
    quote:
      "A premium, deeply rooted food brand story that feels modern without losing its Indian soul.",
    author: "Retail Buyer",
    title: "Design Partner",
  },
  {
    quote:
      "The product story, packaging, and experience all feel considered from farm to shelf to digital.",
    author: "Wellness Curator",
    title: "Brand Consultant",
  },
  {
    quote:
      "Gharana brings together heritage, clarity and a thoughtful digital presence that feels export-ready.",
    author: "Hospitality Lead",
    title: "Growth Advisor",
  },
];

export const socialTiles = [
  images.products.classic,
  images.products.periPeri,
  images.products.cheese,
  images.products.giftPack,
  images.products.salted,
  images.products.chocolate,
];
