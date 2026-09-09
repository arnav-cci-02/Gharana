export const images = {
  logo: "/Gharana Logo.png",
  hero: {
    main: "/assets/hero-section/hero-bg.png",
    fallback: "/assets/hero-section/hero-bg.png",
  },
  products: {
    classic: "/assets/products-img/Classic-makhana.png",
    periPeri: "/assets/products-img/peri-peri-makhana.png",
    cheese: "/assets/products-img/Cheese-makhana.png",
    salted: "/assets/products-img/salted-mkhana.png",
    chocolate: "/assets/products-img/chocolate-makhana.png",
    giftPack: "/assets/products-img/makhana-giftpack.png",
  },
  fallback: "/assets/hero-section/hero-bg.png",
} as const;

export function imageOrFallback(src: string | undefined) {
  return src || images.fallback;
}
