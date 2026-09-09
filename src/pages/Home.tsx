import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import {
  benefitMarquee,
  products,
  siteImages,
  socialTiles,
  storyStages,
  testimonials,
} from "../data";
type Props = {
  navigate: (to: string) => void;
  onAdd: (product: (typeof products)[number]) => void;
};
export function Home({ navigate, onAdd }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const rangeProducts = products;
  const activeProduct = rangeProducts[activeIndex];
  const previousProduct =
    rangeProducts[
      (activeIndex - 1 + rangeProducts.length) % rangeProducts.length
    ];
  const nextProduct = rangeProducts[(activeIndex + 1) % rangeProducts.length];
  const selectProduct = (index: number) =>
    setActiveIndex((index + rangeProducts.length) % rangeProducts.length);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") selectProduct(activeIndex - 1);
      if (event.key === "ArrowRight") selectProduct(activeIndex + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  return (
    <div className="home">
      <section className="hero" id="home-hero">
        <img src={siteImages.hero} alt="A vibrant table of Indian food" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="kicker">01 / Gharana presents</p>
          <h1>
            The good
            <br />
            <i>kind</i> of
            <br />
            crunch.
          </h1>
          <p className="hero-sub">
            Premium Indian makhana, roasted with care and made for the moments
            that bring us together.
          </p>
          <div className="hero-actions">
            <button
              className="button button-light"
              onClick={() => navigate("/shop")}
            >
              Shop the range <ArrowRight size={17} />
            </button>
            <button className="play-button" onClick={() => navigate("/about")}>
              <Play size={14} fill="currentColor" /> Our story
            </button>
          </div>
        </div>
        <span className="hero-note">Rooted in India / made for now</span>
      </section>
      <div className="marquee">
        {[...benefitMarquee, ...benefitMarquee].map((item, i) => (
          <span key={i}>
            {item} <b>✳</b>
          </span>
        ))}
      </div>
      <section className="intro scene">
        <div>
          <p className="kicker">02 / A new Indian classic</p>
          <h2>
            Small puff.
            <br />
            <em>Big feeling.</em>
          </h2>
        </div>
        <div className="intro-copy">
          <p>
            Born from an ingredient with deep Indian roots, Gharana brings a
            little more theatre to everyday snacking.
          </p>
          <button className="text-button" onClick={() => navigate("/about")}>
            Meet Gharana <ArrowRight size={16} />
          </button>
        </div>
      </section>
      <section
        className="range range-showcase scene"
        aria-labelledby="range-title"
      >
        <div className="range-heading">
          <p className="kicker">03 / The collection</p>
          <h2 id="range-title">
            Our <em>range.</em>
          </h2>
          <p>Roasted, seasoned and made for passing around.</p>
        </div>
        <div className="range-stage">
          <button
            className="range-arrow range-arrow-left"
            aria-label="Previous product"
            onClick={() => selectProduct(activeIndex - 1)}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            className="range-side range-side-left"
            onClick={() => selectProduct(activeIndex - 1)}
            aria-label={`View ${previousProduct.name}`}
          >
            <img src={previousProduct.images[0]} alt="" loading="lazy" />
          </button>
          <div className="range-active" aria-live="polite">
            <img
              key={activeProduct.id}
              src={activeProduct.images[0]}
              alt={activeProduct.name}
            />
          </div>
          <button
            className="range-side range-side-right"
            onClick={() => selectProduct(activeIndex + 1)}
            aria-label={`View ${nextProduct.name}`}
          >
            <img src={nextProduct.images[0]} alt="" loading="lazy" />
          </button>
          <button
            className="range-arrow range-arrow-right"
            aria-label="Next product"
            onClick={() => selectProduct(activeIndex + 1)}
          >
            <ArrowRight size={20} />
          </button>
        </div>
        <div className="range-details">
          <span className="range-counter">
            0{activeIndex + 1} / 0{rangeProducts.length}
          </span>
          <h3 key={`title-${activeProduct.id}`}>{activeProduct.name}</h3>
          <p key={`description-${activeProduct.id}`}>
            {activeProduct.shortDescription}
          </p>
          <button
            className="button button-light"
            onClick={() => navigate(`/product/${activeProduct.id}`)}
          >
            Explore product <ArrowRight size={16} />
          </button>
          <button className="range-add" onClick={() => onAdd(activeProduct)}>
            Add to bag +
          </button>
        </div>
        <div
          className="range-thumbnails"
          role="tablist"
          aria-label="Choose a product"
        >
          {rangeProducts.map((product, index) => (
            <button
              key={product.id}
              className={index === activeIndex ? "active" : ""}
              onClick={() => selectProduct(index)}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Show ${product.name}`}
            >
              <img src={product.images[0]} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </section>
      <section className="statement">
        <div className="statement-image">
          <img src={siteImages.storyFarm} alt="Indian harvest landscape" />
        </div>
        <div>
          <p className="kicker">04 / Our point of view</p>
          <h2>
            Good food
            <br />
            should feel
            <br />
            <em>like home.</em>
          </h2>
          <p>
            We are building a modern pantry of thoughtful, flavour-forward
            makhana. Familiar at heart. Unexpected by design.
          </p>
          <button
            className="button button-dark"
            onClick={() => navigate("/about")}
          >
            Read our story <ArrowRight size={16} />
          </button>
        </div>
      </section>
      <section className="photo-story scene">
        <div className="photo-story-copy">
          <div className="section-top">
            <div>
              <p className="kicker">05 / From our table</p>
              <h2>
                Pass it
                <br />
                <em>around.</em>
              </h2>
              <p className="photo-story-lede">
                Good crunch is better when the moment is shared.
              </p>
            </div>
          </div>
          <div className="photo-doodle-strip" aria-hidden="true">
            <span className="makhana-doodle doodle-gold" />
            <span className="makhana-doodle doodle-orange" />
            <span className="makhana-doodle doodle-lime" />
            <span className="doodle-spark">✦</span>
            <span className="doodle-note">crunch, pass, repeat</span>
            <span className="makhana-doodle doodle-cocoa" />
            <span className="doodle-spark doodle-spark-small">✦</span>
          </div>
        </div>
        <div className="photo-grid">
          {socialTiles.slice(0, 4).map((tile, i) => (
            <figure key={tile} className={`photo-tile photo-${i + 1}`}>
              <img src={tile} alt="Gharana food moment" loading="lazy" />
              <figcaption>
                <span>Gharana / 0{i + 1}</span>
                <b>{["Open the bag", "Pass the bowl", "Stay for one more", "Made to share"][i]}</b>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="journey scene">
        <p className="kicker">06 / The journey</p>
        <h2>
          From a great
          <br />
          <em>ingredient</em> to a<br />
          great Indian brand.
        </h2>
        <div className="journey-list">
          {storyStages.slice(0, 4).map((stage, i) => (
            <div key={stage.step}>
              <span>0{i + 1}</span>
              <div>
                <b>{stage.step}</b>
                <h3>{stage.title}</h3>
              </div>
              <p>{stage.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="voices scene">
        <div className="voice">
          <blockquote>{testimonials[0].quote}</blockquote>
          <p>
            {testimonials[0].author} / {testimonials[0].title}
          </p>
        </div>
      </section>
      <section className="newsletter scene">
        <h2>
          Good things
          <br />
          <em>are coming.</em>
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Your email address"
            aria-label="Email address"
            required
          />
          <button className="button button-light">
            Subscribe <ArrowRight size={16} />
          </button>
        </form>
      </section>
    </div>
  );
}
