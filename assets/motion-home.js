/* Motion for JavaScript: smooth, progressive enhancement for the home page. */
import { animate, inView, scroll } from "https://cdn.jsdelivr.net/npm/motion@13.2.0/+esm";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const copy = document.querySelector("[data-motion-copy]");
const product = document.querySelector("[data-motion-hero]");
const hero = document.querySelector(".hero");

if (!reduceMotion) {
  if (copy) {
    animate(copy, { opacity: [0, 1], y: [22, 0] }, {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    });
  }

  if (product) {
    animate(product, { opacity: [0, 1], scale: [0.94, 1], rotate: [-2, 0] }, {
      duration: 1.05,
      delay: 0.08,
      ease: [0.22, 1, 0.36, 1],
    });

    if (hero) {
      const parallax = animate(product, { y: [0, 82], rotate: [0, 4] }, { ease: "linear" });
      scroll(parallax, { target: hero, offset: ["start start", "end start"] });
    }
  }

  inView("#film .video-slot", (element) => {
    animate(element, { opacity: [0, 1], y: [26, 0] }, {
      duration: 0.64,
      ease: [0.22, 1, 0.36, 1],
    });
  }, { amount: 0.2 });
}
