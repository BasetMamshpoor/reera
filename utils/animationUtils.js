// utils/animationUtils.js
import { gsap } from "gsap";

// Category panel animations
export const animateCategoryPanelIn = (panelRef, setIsAnimating) => {
  if (panelRef.current) {
    setIsAnimating(true);
    gsap.set(panelRef.current, { display: "flex" });
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: -10, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
        onComplete: () => setIsAnimating(false),
      }
    );
  }
};

export const animateCategoryPanelOut = (panelRef, setIsAnimating) => {
  return new Promise((resolve) => {
    if (panelRef.current) {
      setIsAnimating(true);
      gsap.to(panelRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.98,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (panelRef.current) {
            gsap.set(panelRef.current, { display: "none" });
          }
          setIsAnimating(false);
          resolve();
        },
      });
    } else {
      resolve();
    }
  });
};

// Location panel animations
export const animateLocationPanelIn = (panelRef, setIsAnimating) => {
  if (panelRef.current) {
    setIsAnimating(true);
    gsap.set(panelRef.current, { display: "block" });
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: -10, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
        onComplete: () => setIsAnimating(false),
      }
    );
  }
};

export const animateLocationPanelOut = (panelRef, setIsAnimating) => {
  return new Promise((resolve) => {
    if (panelRef.current) {
      setIsAnimating(true);
      gsap.to(panelRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.98,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (panelRef.current) {
            gsap.set(panelRef.current, { display: "none" });
          }
          setIsAnimating(false);
          resolve();
        },
      });
    } else {
      resolve();
    }
  });
};

// Subcategory panel animation
export const animateSubcategoryPanelIn = (panelRef) => {
  if (panelRef.current) {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" }
    );
  }
};
