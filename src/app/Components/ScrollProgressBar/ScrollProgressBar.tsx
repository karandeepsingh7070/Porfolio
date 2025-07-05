'use client';

import { motion, useScroll } from "framer-motion";
import React from "react";

const ScrollProgressBar = () => {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            className="scroll-progress-bar"
            style={{
                scaleX: scrollYProgress,
                transformOrigin: "0%",
            }}
        />
    );
};

export default ScrollProgressBar;
