import { gsap } from "gsap";

export const animateCategoryList = (listRef) => {
  if (!listRef.current) return;
  gsap.fromTo(
    listRef.current,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
  );
};

export const animateCategoryItems = (itemsRef) => {
  if (!itemsRef.current.length) return;
  gsap.fromTo(
    itemsRef.current,
    { opacity: 0, y: 30, scale: 0.9 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      stagger: 0.08,
      ease: "back.out(1.2)",
      overwrite: true,
    }
  );
};

export const animateClickEffect = (el, onComplete) => {
  gsap.to(el, {
    scale: 0.95,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    duration: 0.2,
    onComplete,
  });
};
