"use client";
import { useSpring, animated } from "react-spring";
import { useGesture } from "@use-gesture/react";
import Image from "next/image";
import styles from "./title.module.css";
import { BsGithub, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { Comfortaa } from "@next/font/google";

const comfortaa = Comfortaa({ subsets: ["latin"] });

const linkClasses =
  "col-start-2 flex flex-row items-center hover:scale-105 hover:drop-shadow-sm-strong my-1 p-1";
const labelClasses =
  "ml-3 text-body-gray800 opacity-80 font-thin text-lg font-display";

const links = [
  {
    href: "https://x.com/tommyyzhao",
    label: "Twitter",
    icon: <BsTwitterX className="text-xl text-twitter-x-black" />,
  },
  {
    href: "https://www.linkedin.com/in/thomas-y-zhao/",
    label: "LinkedIn",
    icon: <BsLinkedin className="text-xl text-linkedin-blue" />,
  },
  {
    href: "https://github.com/tommyyzhao",
    label: "Github",
    icon: <BsGithub className="text-xl text-github-black" />,
  },
  {
    href: "https://calendly.com/tomzhao/chat",
    label: "Calendly",
    icon: (
      <Image src="/calendly.png" alt="Calendly logo" height={20} width={20} />
    ),
  },
];

const TitleCard = function () {
  const [{ scale }, api] = useSpring(() => ({ scale: 1 }));

  const bind = useGesture({
    onMove: () =>
      api({ scale: 1.05, config: { friction: 4, tension: 89, mass: 0.35 } }),
    onHover: ({ hovering }) => !hovering && api({ scale: 1 }),
  });

  return (
    <div
      className={`flex flex-col justify-center rounded-lg items-center w-max backdrop-blur-xl px-4 py-6 ${styles.title_background}`}
      style={{ fontFamily: comfortaa }}
    >
      <div className="flex flex-col justify-between items-center">
        {/* Name & picture */}
        <div className="flex flex-row justify-evenly items-start">
          <div className="flex flex-col justify-start items-start mr-4">
            <h1
              className={`text-2xl mb-4 mt-[1px] font-display ${styles.title_name}`}
            >
              Thomas Zhao
            </h1>
          </div>
          <animated.div
            {...bind()}
            style={{ scale }}
            className="will-change-transform"
          >
            <div className={styles.title_pic + " ml-6"}>
              <Image
                src="/tommy.png"
                alt="profile image"
                height={96}
                width={96}
                className="p-[1px]"
              />
            </div>
          </animated.div>
        </div>

        {/* Socials */}
        <div className="grid grid-cols-3 justify-evenly items-center mt-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={linkClasses}
            >
              {link.icon}
              <h1 className={labelClasses} style={{ fontFamily: comfortaa }}>
                {link.label}
              </h1>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TitleCard;
