import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

/**
 * Custom hook for handling category list animations
 * @param {Array} filteredCategories - Array of filtered categories to animate
 * @param {Object} currentLevel - Current navigation level for triggering re-animations
 * @returns {Object} Animation refs and control functions
 */
export const useCategoryAnimations = (filteredCategories, currentLevel) => {
  const listRef = useRef(null);
  const categoryItemsRef = useRef([]);

  // GSAP animation for category items when they render
  useGSAP(() => {
    if (filteredCategories.length > 0) {
      // Animate list container
      gsap.fromTo(
        listRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );

      // Animate each category item with stagger
      gsap.fromTo(
        categoryItemsRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08, // 80ms delay between each item
          ease: "back.out(1.2)",
          overwrite: true,
        }
      );
    }
  }, [filteredCategories, currentLevel]);

  // Clear refs when categories change to prevent stale references
  useEffect(() => {
    categoryItemsRef.current = categoryItemsRef.current.slice(
      0,
      filteredCategories.length
    );
  }, [filteredCategories]);

  /**
   * Animate item click with scale and background color change
   * @param {Object} item - The clicked category item
   * @param {Function} onComplete - Callback to execute after animation
   * @returns {Promise} Promise that resolves when animation completes
   */
  const animateItemClick = (item, onComplete) => {
    return new Promise((resolve) => {
      const clickedIndex = filteredCategories.findIndex(
        (cat) => cat.id === item.id
      );

      if (clickedIndex !== -1 && categoryItemsRef.current[clickedIndex]) {
        gsap.to(categoryItemsRef.current[clickedIndex], {
          scale: 0.95,
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          duration: 0.2,
          onComplete: () => {
            if (onComplete) onComplete();
            resolve();
          },
        });
      } else {
        // If no animation element found, just execute callback immediately
        if (onComplete) onComplete();
        resolve();
      }
    });
  };

  /**
   * Animate list fade out (used for back navigation)
   * @param {Function} onComplete - Callback to execute after animation
   * @returns {Promise} Promise that resolves when animation completes
   */
  const animateListFadeOut = (onComplete) => {
    return new Promise((resolve) => {
      gsap.to(listRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (onComplete) onComplete();
          resolve();
        },
      });
    });
  };

  /**
   * Animate search results change
   * @param {Array} newCategories - New categories to animate
   */
  const animateSearchChange = (newCategories) => {
    if (newCategories.length > 0) {
      gsap.to(categoryItemsRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.03,
        ease: "power2.out",
      });
    }
  };

  /**
   * Reset all animations to initial state
   */
  const resetAnimations = () => {
    gsap.set(listRef.current, { opacity: 1, y: 0 });
    gsap.set(categoryItemsRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      backgroundColor: "transparent",
    });
  };

  return {
    // Refs to be used in JSX
    listRef,
    categoryItemsRef,

    // Animation control functions
    animateItemClick,
    animateListFadeOut,
    animateSearchChange,
    resetAnimations,
  };
};
