import React, { useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MainBanner = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const vignetteRef = useRef(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    const imageElement = imageRef.current;
    const contentElement = contentRef.current;
    const vignetteElement = vignetteRef.current;

    if (!heroElement || !imageElement || !contentElement || !vignetteElement)
      return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        imageElement,
        { scale: 1.12, y: 20 },
        {
          scale: 1,
          y: 0,
          duration: 1.35,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        contentElement,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.2,
          ease: "power3.out",
        },
      );

      gsap.to(imageElement, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: heroElement,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(vignetteElement, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: heroElement,
          start: "top top",
          end: "70% top",
          scrub: true,
        },
      });
    }, heroElement);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full h-[100vh] overflow-hidden bg-slate-950 border-0 ring-0 outline-none isolate"
    >
      <div
        ref={imageRef}
        className="absolute inset-x-0 top-0 -bottom-12 overflow-hidden pointer-events-none scale-[1.08] md:scale-[1.1]"
      >
        <img
          src={assets.main_banner_bg}
          alt="Fresh vegetables banner"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-top"
        />
        <img
          src={assets.main_banner_bg_sm}
          alt="Fresh vegetables banner"
          className="absolute inset-0 w-full h-full object-cover object-top md:hidden"
        />
      </div>

      <div
        ref={vignetteRef}
        className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/25 to-transparent opacity-90"
      />

      <div
        ref={contentRef}
        className="relative z-10 flex h-full min-h-[100vh] flex-col justify-end md:justify-center px-6 md:px-16 lg:px-24 xl:px-32 pb-8 md:pb-0 pt-24 md:pt-0"
      >
        <div className="max-w-xl text-white">
          <p className="mb-4 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.28em] backdrop-blur-sm">
            Fresh Choices
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold max-w-lg leading-[1.05] tracking-tight">
            Love the freshness, live the savings
          </h1>
          <p className="mt-4 max-w-md text-sm sm:text-base text-white/80">
            Carefully sourced freshness, delivered through a refined and
            effortless shopping experience
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6 font-medium">
            <Link
              to={"/products"}
              className="group flex items-center gap-2 px-6 md:px-8 py-3 bg-primary hover:bg-primary-dull transition rounded-full text-white cursor-pointer text-sm"
            >
              Shop Now
              <img
                className="md:hidden transition group-focus:translate-x-1"
                src={assets.white_arrow_icon}
                alt="arrow"
              />
            </Link>

            <Link
              to={"/products"}
              className="group inline-flex items-center gap-2 px-6 md:px-8 py-3 rounded-full border border-white/20 bg-white/10 text-sm text-white/90 backdrop-blur-sm transition hover:bg-white/15"
            >
              Explore deals
              <img
                className="transition group-hover:translate-x-1 brightness-0 invert"
                src={assets.black_arrow_icon}
                alt="arrow"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
