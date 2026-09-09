import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { AboutStoryMoment } from "../../data/aboutData";

type Props = { moment: AboutStoryMoment; index: number };

export function StoryMoment({ moment, index }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 ? 80 : -80, 0, index % 2 ? -35 : 35]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [55, 0, -55]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 ? 4 : -4, 0, index % 2 ? -2 : 2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.82, 1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0, 1, 1, 0.25]);

  return (
    <article ref={ref} className={`about-moment about-moment-${index + 1} about-tone-${moment.tone}`}>
      <motion.div className="about-moment-visual" style={{ x, y, rotate, scale, opacity }}>
        <img src={moment.image} alt="" loading="lazy" />
        <span className="about-moment-stamp">{moment.number} / GHARANA</span>
      </motion.div>
      <motion.div className="about-moment-copy" style={{ opacity, y }}>
        <p className="kicker">{moment.eyebrow}</p>
        <h2>{moment.title}</h2>
        <p>{moment.copy}</p>
      </motion.div>
      <span className="about-moment-dot" aria-hidden="true" />
    </article>
  );
}
