import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import "./ScrollTimeline.css";

const DEFAULT_EVENTS = [
  {
    year: "March 2025 - Present",
    title: "Junior Software Engineer",
    subtitle: "Dotlines Bangladesh",
    description:
      "As a Junior Software Engineer, I specialize in building responsive and user-friendly web applications using React.js, HTML, CSS, and Tailwind. I translate Figma designs into pixel-perfect interfaces while ensuring performance optimization and cross-device compatibility. By implementing reusable components and integrating APIs seamlessly, I help deliver efficient and scalable front-end solutions. My work contributes to faster delivery cycles and improved user experience across projects.",
  },
  {
    year: "February 2021  - October 2024",
    title: "BSc in Computer Science and Engineering",
    subtitle: "Canadian University of Bangladesh",
    description: "With an outstanding CGPA of 3.68, I profoundly excelled over four years, gaining extensive knowledge, honing my problem-solving skills, and building a strong foundation in both theoretical and practical aspects of my field.",
  },
  {
    year: "January 2018 - January 2020",
    title: "Data Entry Specialist & Transcribing",
    subtitle: "Fiver & Upwrok",
    description: "Assisted in data transcribing and data entry, ensuring accuracy and consistency across business records. Supported the team by organizing, cleaning, and maintaining datasets, enabling smoother reporting and analysis.",
  },
  {
    year: "January 2019 - January 2020",
    title: "Advanced Levels",
    subtitle: "Edexcel Board of British Council",
    description: "",
  },
  {
    year: "January 2018",
    title: "Ordinary Level",
    subtitle: "Edexcel Board of British Council",
    description: "",
  },
];

const ScrollTimeline = ({
  events = DEFAULT_EVENTS,
  title = "A Short Timeline",
  animationOrder = "sequential",
  cardAlignment = "alternating",
  progressIndicator = true,
  cardVariant = "default",
  cardEffect = "none",
  parallaxIntensity = 0.2,
  revealAnimation = "fade",
}) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const timelineRefs = useRef([]);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ✅ FIX: Use useTransform here (top level, not inside map)
  const parallaxY = useTransform(
    smoothProgress,
    [0, 1],
    [parallaxIntensity * 100, -parallaxIntensity * 100]
  );

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const newIndex = Math.floor(v * events.length);
      if (
        newIndex !== activeIndex &&
        newIndex >= 0 &&
        newIndex < events.length
      ) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, events.length, activeIndex]);

  const getCardVariants = (index) => {
    const baseDelay =
      animationOrder === "simultaneous"
        ? 0
        : animationOrder === "staggered"
        ? index * 0.2
        : index * 0.3;

    const initialStates = {
      fade: { opacity: 0, y: 20 },
      slide: {
        x:
          cardAlignment === "left"
            ? -100
            : cardAlignment === "right"
            ? 100
            : index % 2 === 0
            ? -100
            : 100,
        opacity: 0,
      },
      scale: { scale: 0.8, opacity: 0 },
      flip: { rotateY: 90, opacity: 0 },
      none: { opacity: 1 },
    };

    return {
      initial: initialStates[revealAnimation],
      whileInView: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateY: 0,
        transition: {
          duration: 0.7,
          delay: baseDelay,
          ease: [0.25, 0.1, 0.25, 1.0],
        },
      },
      viewport: { once: false, margin: "-100px" },
    };
  };

  return (
    <div ref={scrollRef} className="timeline-container">
      <div className="timeline-header">
        <h2>{title}</h2>
      </div>

      <div className="timeline-wrapper">
        <div className="timeline-line"></div>

        {progressIndicator && (
          <>
            <motion.div
              className="timeline-progress"
              style={{ height: progressHeight }}
            />
            <motion.div
              className="timeline-comet"
              style={{ top: progressHeight }}
            >
              <motion.div
                className="timeline-comet-core"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </>
        )}

        <div className="timeline-events">
          {events.map((event, index) => (
            <div
              key={event.id || index}
              ref={(el) => (timelineRefs.current[index] = el)}
              className={`timeline-event ${
                cardAlignment === "alternating"
                  ? index % 2 === 0
                    ? "align-left"
                    : "align-right"
                  : cardAlignment === "left"
                  ? "align-left"
                  : "align-right"
              }`}
            >
              <div className="timeline-dot">
                <motion.div
                  className={`timeline-dot-core ${
                    index <= activeIndex ? "active" : ""
                  }`}
                  animate={
                    index <= activeIndex
                      ? {
                          scale: [1, 1.3, 1],
                          boxShadow: [
                            "0 0 0px rgba(99,102,241,0)",
                            "0 0 12px rgba(99,102,241,0.6)",
                            "0 0 0px rgba(99,102,241,0)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <motion.div
                className={`timeline-card variant-${cardVariant} effect-${cardEffect}`}
                variants={getCardVariants(index)}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: false, margin: "-100px" }}
                // ✅ apply global parallaxY to all cards
                style={parallaxIntensity > 0 ? { y: parallaxY } : undefined}
              >
                <div className="timeline-card-content">
                  <div className="timeline-date">
                    {event.icon || <span className="timeline-date-icon">📅</span>}
                    <span>{event.year}</span>
                  </div>
                  <h3>{event.title}</h3>
                  {event.subtitle && (
                    <p className="subtitle">{event.subtitle}</p>
                  )}
                  <p className="description">{event.description}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollTimeline;
