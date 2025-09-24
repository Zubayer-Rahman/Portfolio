import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import "./ScrollTimeline.css";

const DEFAULT_EVENTS = [
  {
    year: "2023",
    title: "Major Achievement",
    subtitle: "Organization Name",
    description:
      "Description of the achievement or milestone reached during this time period.",
  },
  {
    year: "2022",
    title: "Important Milestone",
    subtitle: "Organization Name",
    description: "Details about this significant milestone and its impact.",
  },
  {
    year: "2021",
    title: "Key Event",
    subtitle: "Organization Name",
    description: "Information about this key event in the timeline.",
  },
  {
    year: "2020",
    title: "Key Event",
    subtitle: "Organization Name",
    description: "Information about this key event in the timeline.",
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
