import React, { useEffect, useRef } from "react";
import { features } from "../assets/assets";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BottomBanner = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll(".feature-item");

    elements.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          delay: index * 0.03,
        }
      );
    });
  }, []);

  return (
    <div className="mt-20 px-4 md:px-12 lg:px-20">

      {/* HEADER (smaller) */}
      <div className="text-center mb-10">
        <h1 className="text-xl md:text-3xl font-semibold text-gray-800">
          Why We Are the Best?
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Built for speed, trust, and seamless shopping
        </p>
      </div>

      {/* FEATURES */}
      <div ref={containerRef} className="space-y-10 relative">

        {/* center line */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gray-200"></div>

        {features.map((feature, index) => (
          <div
            key={index}
            className={`feature-item flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >

            {/* ICON (smaller) */}
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center z-10">
              <img src={feature.icon} alt={feature.title} className="w-5 h-5" />
            </div>

            {/* TEXT (smaller) */}
            <div className="max-w-md text-center md:text-left">
              <h3 className="text-base md:text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-500 mt-1 text-xs md:text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomBanner;