// import { motion } from "framer-motion-3d";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "../components/Three/Scene";
import styled from "styled-components";
import { motion, useAnimationControls } from "framer-motion";

const textMotion = {
  rest: {
    color: "grey",
    x: 0,
    transition: {
      duration: 2,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    color: "blue",
    x: 30,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const slashMotion = {
  rest: { opacity: 0, ease: "easeOut", duration: 0.2, type: "tween" },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeIn",
    },
  },
};

const HoverTest = () => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();

  function startDrag(event) {
    controls.start(event, { snapToCursor: true });

    controls.start(event);
  }
  useEffect(() => {
    controls.set({ left: `${0}px` });
    controls.start({ left: `50%` });
  }, []);
  window.addEventListener("keydown", (e) => {
    console.log(e, "keydown");
    switch (e.code) {
      case "ArrowUp":
        console.log("ArrowUp", "keydown");
        break;
      case "ArrowLeft":
        console.log("ArrowLeft", "keydown");
        break;
      default:
        return;
    }
  });
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        border: "1px solid red",
      }}
    >
      {/* <Container initial="rest" whileHover="hover" animate="rest">
        <SlashContainer variants={slashMotion}>
          <svg width="1em" height="1em" viewBox="0 0 27 50">
            <path
              fill="#154FFF"
              d="M21.177 0L0 50h5.818L26.995 0z"
              fillRule="evenodd"
            />
          </svg>
        </SlashContainer>
        <motion.div variants={textMotion}>Hover me!</motion.div>
      </Container> */}
      <motion.button
        whileHover={{ scale: 2 }}
        // onHoverStart={() => setIsHovered(true)}
        // onHoverEnd={() => setIsHovered(true)}
      >
        <div>c</div>

        {/* <Scene isHovered={isHovered} /> */}
      </motion.button>
      <motion.div
        style={{ display: "flex", position: "absolute" }}
        animate={controls}
        transition={{
          delay: 0,
          duration: 5,
          // repeat: Infinity,
          // repeatDelay: 0,
          ease: "linear",
        }}
      >
        V
      </motion.div>
    </div>
  );
};
export default HoverTest;

const Container = styled(motion.div)`
  position: relative;
  max-width: 200px;
  cursor: pointer;
`;

const SlashContainer = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 0;
  opacity: 0;

  transform: translateY(-50%);

  svg {
    width: auto;
    height: 50px;
    object-fit: scale-down;
  }
`;
