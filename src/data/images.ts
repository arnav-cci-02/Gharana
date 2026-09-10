export const images = {
  logo: "/Gharana Logo.png",
  hero: {
    main: "/assets/hero-section/hero-bg.png",
    fallback: "/assets/hero-section/hero-bg.png",
  },
  products: {
    classic: "/assets/products/classic/CLASSIC-MAKHANA-PACK-FRONT.png",
    classicBack: "/assets/products/classic/CLASSIC-MAKHANA-PACK-BACK.png",
    periPeri: "/assets/products/peri-peri/PERI-PERI-MAKHANA-PACK-FRONT.png",
    periPeriBack: "/assets/products/peri-peri/PERI-PERI-MAKHANA-PACK-BACK.png",
    cheese: "/assets/products/cheese/CHEESE-MAKHANA-PACK-FRONT.png",
    cheeseBack: "/assets/products/cheese/CHEESE-MAKHANA-PACK-BACK.png",
    salted: "/assets/products/salted/SALTED-MAKHANA-PACK-FRONT.png",
    saltedBack: "/assets/products/salted/SALTED-MAKHANA-PACK-BACK.png",
    chocolate: "/assets/products/chocolate/CHOCOLATE-MAKHANA-PACK-FRONT.png",
    chocolateBack: "/assets/products/chocolate/CHOCOLATE-MAKHANA-PACK-BACK.png",
    giftPack: "/assets/products/gift-pack/gift-pack.png",
  },
  fallback: "/assets/hero-section/hero-bg.png",
} as const;

export function imageOrFallback(src: string | undefined) {
  return src || images.fallback;
}
