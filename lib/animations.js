import { gsap } from "gsap";

export const animationConfigs = {
  listFadeIn: {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
  },
  categoryItemsStagger: {
    from: { opacity: 0, y: 30, scale: 0.9 },
    to: {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      stagger: 0.08,
      ease: "back.out(1.2)",
      overwrite: true,
    },
  },
  itemClick: {
    scale: 0.95,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    duration: 0.2,
  },
  backNavigation: {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: "power2.in",
  },
  searchAnimation: {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.3,
    stagger: 0.03,
    ease: "power2.out",
  },
};

export function animateListContainer(listRef) {
  return gsap.fromTo(
    listRef.current,
    animationConfigs.listFadeIn.from,
    animationConfigs.listFadeIn.to
  );
}

export function animateCategoryItems(categoryItemsRef) {
  return gsap.fromTo(
    categoryItemsRef.current,
    animationConfigs.categoryItemsStagger.from,
    animationConfigs.categoryItemsStagger.to
  );
}

export function animateItemClick(element, onComplete) {
  return gsap.to(element, {
    ...animationConfigs.itemClick,
    onComplete,
  });
}

export function animateBackNavigation(listRef, onComplete) {
  return gsap.to(listRef.current, {
    ...animationConfigs.backNavigation,
    onComplete,
  });
}

export function animateSearchResults(categoryItemsRef) {
  return gsap.to(categoryItemsRef.current, animationConfigs.searchAnimation);
}
