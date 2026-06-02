"use client";

import React, { useEffect, useState } from "react";

import FluidAnimation from "react-fluid-animation";

const STARTING_SPLAT_RADIUS = 0.04;
const MOUSE_SPLAT_RADIUS = 0.004;
const D_D_MOUSEDOWN = 0.999;
const D_D0 = 0.998;
const D_D1 = 0.9995;
const D_D2 = 0.99995;
const D_D3 = 1;
const TIMEOUT0 = 200;
const TIMEOUT1 = 800;
const TIMEOUT2 = 3200;
const TIMEOUT3 = 16000;

const defaultConfig = {
  textureDownsample: 1,
  densityDissipation: D_D0,
  velocityDissipation: 0.99,
  pressureDissipation: 0.8,
  pressureIterations: 25,
  curl: 30,
  splatRadius: STARTING_SPLAT_RADIUS,
};

function getCanvasDimensions() {
  const canvas = document.getElementById("canvas-container");
  if (canvas) {
    const rect = canvas.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
    };
  } else
    return {
      width: 1000,
      height: 1000,
    };
}

function getSplatAmount() {
  const { width, height } = getCanvasDimensions();
  const canvasArea = width * height;
  const splatArea = 150 * 150;
  const splatAmount = Math.floor(canvasArea / splatArea) + 4;
  // console.log(
  //   `${Math.floor(canvasArea / 100)}/${Math.floor(
  //     splatArea / 100
  //   )}=${splatAmount}`
  // );
  return splatAmount;
}

function setDissipationTimeouts(timeoutStack, setConfig, config) {
  timeoutStack.push(
    setTimeout(() => {
      setConfig({
        ...config,
        splatRadius: MOUSE_SPLAT_RADIUS,
        densityDissipation: D_D1,
      });
      // console.log(`timeout 1: ${D_D1}`);
      timeoutStack.shift();
    }, TIMEOUT1)
  );
  timeoutStack.push(
    setTimeout(() => {
      setConfig({
        ...config,
        splatRadius: MOUSE_SPLAT_RADIUS,
        densityDissipation: D_D2,
      });
      // console.log(`timeout 2: ${D_D2}`);
      timeoutStack.shift();
    }, TIMEOUT2)
  );
  timeoutStack.push(
    setTimeout(() => {
      setConfig({
        ...config,
        splatRadius: MOUSE_SPLAT_RADIUS,
        densityDissipation: D_D3,
      });
      // console.log(`timeout 3: ${D_D3}`);
      timeoutStack.shift();
    }, TIMEOUT3)
  );
}

export default function Background() {
  const [config, setConfig] = useState(defaultConfig);
  let _animation = {};
  const [splatAmt, setSplatAmt] = useState(100);
  let timeoutStack = [];

  const _animationRef = (ref) => {
    _animation = ref;

    ref.addRandomSplats(getSplatAmount());
    setConfig({
      ...config,
      splatRadius: MOUSE_SPLAT_RADIUS,
    });
    setDissipationTimeouts(timeoutStack, setConfig, config);
  };

  useEffect(() => {
    function handleResplat() {
      _animation.addRandomSplats(getSplatAmount());
      timeoutStack.push(
        setTimeout(() => {
          setConfig({
            ...config,
            splatRadius: MOUSE_SPLAT_RADIUS,
            densityDissipation: 0.999,
          });
          timeoutStack.shift();
        }, TIMEOUT0)
      );
    }

    function handleResize() {
      setConfig({
        ...config,
        splatRadius: STARTING_SPLAT_RADIUS,
        densityDissipation: D_D0,
      });
      for (const timeout of timeoutStack) {
        clearTimeout(timeout);
      }
      while (timeoutStack.length > 0) {
        timeoutStack.shift();
      }
      setDissipationTimeouts(timeoutStack, setConfig, config);
    }

    function handleMouseDown(e) {
      setConfig({
        ...config,
        splatRadius: MOUSE_SPLAT_RADIUS,
        densityDissipation: D_D_MOUSEDOWN,
      });
    }

    function handleMouseUp(e) {
      setConfig({
        ...config,
        splatRadius: MOUSE_SPLAT_RADIUS,
        densityDissipation: D_D3,
      });
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleResplat);

    // add event listener for mouse down on canvas element
    const canvas = document.getElementById("canvas-container");
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("resize", handleResplat);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      id="canvas-container"
      className="absolute max-h-[200vh] h-[135%] w-full"
    >
      <FluidAnimation config={config} animationRef={_animationRef} />
    </div>
  );
}
