import { useInView, motion } from "motion/react";
import { useRef } from "react";

const SlideIn = ({ children, side = "left", delay = 0, ...props }) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
  });

  const initialX = side === "left" ? -200 : 200;

  return (
    <motion.div
      {...props}
      ref={ref}
      initial={{ x: initialX, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
