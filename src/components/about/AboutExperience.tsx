import { Pause, Play, Volume2, VolumeX, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { products } from "../../data";
import { aboutStory } from "../../data/aboutData";
import { StoryMoment } from "./StoryMoment";

type Props = { navigate: (to: string) => void };

export function AboutExperience({ navigate }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [hasFilm, setHasFilm] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const heroBlur = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0px)", "blur(2px)"],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onCanPlay = () => setHasFilm(true);
    video.addEventListener("canplay", onCanPlay);
    return () => video.removeEventListener("canplay", onCanPlay);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div className="about-experience">
      <motion.section
        ref={heroRef}
        className="about-film"
        style={{ scale: heroScale, filter: heroBlur }}
      >
        <div className="about-film-fallback" />
        <video
          ref={videoRef}
          className={hasFilm ? "has-film" : ""}
          src="/assets/about/video/gharana-brand-film.mp4"
          poster="/assets/hero-section/hero-bg.png"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setHasFilm(false)}
        />
        <div className="about-film-shade" />
        <div className="about-film-title">
          <p className="kicker">Enter the Gharana universe</p>
          <h1>
            Made for
            <br />
            <em>the table.</em>
          </h1>
        </div>
        <div className="about-film-controls">
          <button
            onClick={togglePlay}
            aria-label={playing ? "Pause brand film" : "Play brand film"}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute brand film" : "Mute brand film"}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
        {/* <span className="about-film-caption">A modern Indian crunch / 01</span> */}
      </motion.section>

      <section className="about-intro-space">
        <div className="about-intro-orbit orbit-one" />
        <div className="about-intro-orbit orbit-two" />
        <p className="kicker">The story behind Gharana</p>
        <h2>
          A crunch
          <br />
          <em>with roots.</em>
        </h2>
        <p className="about-intro-copy">
          Makhana has always belonged to the table. We are giving that familiar
          ingredient a bolder, more expressive way to show up.
        </p>
        <span className="about-scroll-note">
          Scroll to travel through the story ↓
        </span>
      </section>

      <section className="about-story-canvas">
        <div className="about-canvas-grain" />
        {aboutStory.map((moment, index) => (
          <StoryMoment key={moment.number} moment={moment} index={index} />
        ))}
      </section>

      <section className="about-universe">
        <div className="about-universe-heading">
          <p className="kicker">The collection in motion</p>
          <h2>
            The Gharana
            <br />
            <em>universe.</em>
          </h2>
          <p>A whole world of crunch, passing slowly through the frame.</p>
        </div>
        <div className="about-product-marquee">
          <div className="about-product-track">
            {[...products, ...products].map((product, index) => (
              <button
                key={`${product.id}-${index}`}
                className={`about-product-float about-product-float-${index % 5}`}
                onClick={() => navigate(`/product/${product.slug}`)}
              >
                <span>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                  />
                </span>
                <b>{product.name}</b>
                <small>View product →</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="about-promise">
        <p className="kicker">What we stand for</p>
        <h2>
          Good things,
          <br />
          <em>carefully made.</em>
        </h2>
        <div className="about-promise-list">
          <div>
            <b>01</b>
            <h3>Rooted in India</h3>
            <p>A familiar ingredient, treated with respect and curiosity.</p>
          </div>
          <div>
            <b>02</b>
            <h3>Made to share</h3>
            <p>
              Snacking is better when there is always enough to pass around.
            </p>
          </div>
          <div>
            <b>03</b>
            <h3>Ready for now</h3>
            <p>
              Traditional at heart, expressive enough for every modern ritual.
            </p>
          </div>
        </div>
      </section>

      <section className="about-finale">
        <div className="about-finale-pack finale-pack-one">
          <img src={products[0].images[0]} alt="" />
        </div>
        <div className="about-finale-pack finale-pack-two">
          <img src={products[1].images[0]} alt="" />
        </div>
        <p className="kicker">The table is waiting</p>
        <h2>
          Tradition,
          <br />
          <em>with a new crunch.</em>
        </h2>
        <button
          className="button button-light"
          onClick={() => navigate("/shop")}
        >
          Explore the range <ArrowRight size={16} />
        </button>
      </section>
    </div>
  );
}
