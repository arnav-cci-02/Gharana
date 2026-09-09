import { images } from "./images";

export type AboutStoryMoment = {
  number: string;
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  tone: string;
};

export const aboutStory: AboutStoryMoment[] = [
  {
    number: "01",
    eyebrow: "ROOTED IN TRADITION",
    title: "An old ingredient. A fresh point of view.",
    copy: "Makhana carries a deep Indian food memory. Gharana brings that familiar crunch into a more expressive everyday ritual.",
    image: images.products.classic,
    tone: "gold",
  },
  {
    number: "02",
    eyebrow: "FROM HARVEST TO CRUNCH",
    title: "Care turns a puff into a feeling.",
    copy: "We keep the ingredient at the centre, then build the roast, texture and finish around the moment it is meant to become.",
    image: images.products.salted,
    tone: "salt",
  },
  {
    number: "03",
    eyebrow: "FLAVOUR ENTERS THE STORY",
    title: "The pantry gets a little louder.",
    copy: "Peri peri, cheese, cocoa and classic roast give every kind of snacker a way into the Gharana table.",
    image: images.products.periPeri,
    tone: "peri",
  },
  {
    number: "04",
    eyebrow: "MADE FOR TODAY",
    title: "Tradition, with a new crunch.",
    copy: "A modern Indian snack should be easy to reach for, good to pass around and impossible to forget.",
    image: images.products.chocolate,
    tone: "cocoa",
  },
  {
    number: "05",
    eyebrow: "THE TABLE GETS BIGGER",
    title: "There is room for everyone.",
    copy: "From a quiet desk snack to a full table, Gharana is made for the rituals that bring people closer.",
    image: images.products.giftPack,
    tone: "gift",
  },
] as const;
