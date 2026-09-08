export type Product = {
  id: number
  name: string
  slug: string
  category: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  weight: string
  badge: string
  featured: boolean
  images: string[]
  variants: string[]
  ingredients: string[]
  nutritionalInfo: string[]
  benefits: string[]
}

export const siteImages = {
  logo: '/assets/logo/gharana-logo.svg',
  hero: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
  heroAlt: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
  storyFarm: 'https://images.unsplash.com/photo-1464226184884-fa520f1f7a83?auto=format&fit=crop&w=1200&q=80',
  gifting: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
  global: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80',
  table: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
}

export const categoryCards = [
  { name: 'Classic Roasted', description: 'Slow roasted, naturally crisp and nutty.', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80' },
  { name: 'Flavoured Makhana', description: 'Bold, vibrant notes for modern snacking.', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80' },
  { name: 'Gift Packs', description: 'Curated gifting with a premium finish.', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80' },
  { name: 'Trail Mix', description: 'A nourishing blend for active routines.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80' },
  { name: 'Raw Makhana', description: 'Minimal processing, maximum versatility.', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' },
  { name: 'Makhana Flour', description: 'Functional, clean ingredient innovation.', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80' },
]

export const products: Product[] = [
  {
    id: 1,
    name: 'Classic Roasted Makhana',
    slug: 'classic-roasted-makhana',
    category: 'Classic Roasted',
    description:
      'Lightly roasted foxnuts with a buttery finish and a clean, nutty crunch that brings a premium everyday ritual to the table.',
    shortDescription: 'Naturally crisp, gently roasted and ready for every moment.',
    price: 249,
    originalPrice: 299,
    weight: '100 g',
    badge: 'Best Seller',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
    ],
    variants: ['Classic', 'Smoky', 'Salted'],
    ingredients: ['Makhana', 'Cold-pressed edible oil', 'Sea salt'],
    nutritionalInfo: ['High in protein', 'Low in saturated fat', 'Gluten free'],
    benefits: ['Light and crunchy', 'Digestive-friendly snack', 'Ideal for mindful snacking'],
  },
  {
    id: 2,
    name: 'Peri Peri Makhana',
    slug: 'peri-peri-makhana',
    category: 'Flavoured Makhana',
    description:
      'A vibrant, spiced roast shaped for those who enjoy a little heat with a clean finish and elevated snacking experience.',
    shortDescription: 'Crisp makhana with a fiery peri peri finish.',
    price: 279,
    weight: '80 g',
    badge: 'Spicy Pick',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    ],
    variants: ['100 g', '200 g'],
    ingredients: ['Makhana', 'Peri peri seasoning', 'Sunflower oil'],
    nutritionalInfo: ['Rich in fibre', 'Natural protein', 'No maida'],
    benefits: ['High flavour impact', 'Healthy crunch', 'Perfect for evening bites'],
  },
  {
    id: 3,
    name: 'Masala Makhana',
    slug: 'masala-makhana',
    category: 'Flavoured Makhana',
    description:
      'A warm, spiced blend inspired by Indian pantry aromas, balanced for a full-bodied savoury profile and crisp finish.',
    shortDescription: 'A bold masala crunch with gentle heat.',
    price: 289,
    weight: '100 g',
    badge: 'Flavour Note',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    ],
    variants: ['Classic Masala', 'Extra spicy'],
    ingredients: ['Makhana', 'Indian masala blend', 'Rock salt'],
    nutritionalInfo: ['Naturally gluten free', 'Protein-rich', 'Balanced seasoning'],
    benefits: ['Premium pantry snack', 'Good for social snacking', 'Clean taste profile'],
  },
  {
    id: 4,
    name: 'Premium Gift Box',
    slug: 'premium-gift-box',
    category: 'Gift Packs',
    description:
      'A beautifully curated celebratory box that turns makhana into a thoughtful gifting ritual for festive and corporate moments.',
    shortDescription: 'Premium makhana gift sets designed for meaningful occasions.',
    price: 799,
    weight: '4 packs',
    badge: 'Gift Ready',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80',
    ],
    variants: ['Festive', 'Corporate', 'Custom'],
    ingredients: ['Assorted makhana flavours', 'Luxury gift packaging'],
    nutritionalInfo: ['Gift-worthy assortment', 'Premium presentation'],
    benefits: ['Elegant gifting', 'Ready to send', 'Celebration-ready'],
  },
  {
    id: 5,
    name: 'Raw Makhana',
    slug: 'raw-makhana',
    category: 'Raw Makhana',
    description:
      'Whole foxnuts in their natural form, suited for slow roasting, soaking, curries and everyday kitchen versatility.',
    shortDescription: 'Whole, clean and versatile for daily home use.',
    price: 229,
    weight: '250 g',
    badge: 'Kitchen Essential',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    ],
    variants: ['250 g', '500 g'],
    ingredients: ['Raw makhana'],
    nutritionalInfo: ['Naturally wholesome', 'Flexible ingredient', 'No additives'],
    benefits: ['Cooking versatility', 'Minimal processing', 'Daily essentials'],
  },
  {
    id: 6,
    name: 'Makhana Flour',
    slug: 'makhana-flour',
    category: 'Makhana Flour',
    description:
      'A clean, nutritious flour alternative that brings gentle texture and versatility into modern cooking and wellness routines.',
    shortDescription: 'Functional flour for conscious, modern kitchens.',
    price: 399,
    weight: '250 g',
    badge: 'New',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
    ],
    variants: ['250 g', '500 g'],
    ingredients: ['Ground makhana'],
    nutritionalInfo: ['Gluten free', 'Light and versatile', 'Baked-good friendly'],
    benefits: ['Better ingredient choice', 'Clean label', 'Functional use'],
  },
]

export const benefitMarquee = [
  'PREMIUM MAKHANA',
  'INDIAN ORIGIN',
  'CAREFULLY ROASTED',
  'HEALTHY SNACKING',
  'MADE FOR THE WORLD',
  'QUALITY FIRST',
]

export const storyStages = [
  {
    step: 'START',
    title: 'Digital Business Passport',
    text: 'Building the operational backbone that helps great products get clarity, trust and momentum.',
  },
  {
    step: 'BUILD',
    title: 'Brand Studio',
    text: 'Designing the identity, packaging and storytelling that gives Indian products a premium global voice.',
  },
  {
    step: 'OPERATE',
    title: 'AI Assistant + Logistics Intelligence',
    text: 'Turning scattered operations into a connected system built for better decision making and scale.',
  },
  {
    step: 'GROW',
    title: 'Marketing + Finance Readiness',
    text: 'Creating the structure needed to support visibility, trust and sustainable growth.',
  },
  {
    step: 'EXPORT',
    title: 'Export Readiness + Global Connections',
    text: 'Preparing Indian excellence for a global future with stronger systems, standards and story.',
  },
]

export const testimonials = [
  {
    quote: 'A premium, deeply rooted food brand story that feels modern without losing its Indian soul.',
    author: 'Retail Buyer',
    title: 'Design Partner',
  },
  {
    quote: 'The product story, packaging, and experience all feel considered from farm to shelf to digital.',
    author: 'Wellness Curator',
    title: 'Brand Consultant',
  },
  {
    quote: 'Gharana brings together heritage, clarity and a thoughtful digital presence that feels export-ready.',
    author: 'Hospitality Lead',
    title: 'Growth Advisor',
  },
]

export const socialTiles = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
]
