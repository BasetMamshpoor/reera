import { useState, useEffect } from "react";

/**
 * Custom hook for handling category navigation logic
 * @param {Object} categoriesData - Categories data from API
 * @param {Function} clearSearch - Function to clear search when navigating
 * @param {Function} animateListFadeOut - Animation function for navigation transitions
 * @returns {Object} Navigation state and handlers
 */
export const useCategoryNavigation = (
  categoriesData,
  clearSearch,
  animateListFadeOut
) => {
  const [path, setPath] = useState([{ title: "دسته‌بندی‌ها", children: [] }]);

  // Initialize path when categories data loads
  useEffect(() => {
    if (categoriesData?.data?.categories) {
      setPath([
        { title: "دسته‌بندی‌ها", children: categoriesData.data.categories },
      ]);
    }
  }, [categoriesData]);

  const currentLevel = path[path.length - 1];

  /**
   * Navigate to a child category
   * @param {Object} item - Category item to navigate to
   */
  const navigateToCategory = (item) => {
    if (item.children && item.children.length) {
      setPath((prev) => [...prev, item]);
      clearSearch();
    }
  };

  /**
   * Navigate back one level with animation
   * @returns {Promise} Promise that resolves when navigation completes
   */
  const navigateBack = async () => {
    if (path.length > 1) {
      const navigationLogic = () => {
        setPath((prev) => prev.slice(0, -1));
        clearSearch();
      };

      await animateListFadeOut(navigationLogic);
    }
  };

  /**
   * Navigate to specific breadcrumb level with animation
   * @param {number} targetIndex - Index in the path to navigate to
   * @returns {Promise} Promise that resolves when navigation completes
   */
  const navigateToBreadcrumb = async (targetIndex) => {
    const navigationLogic = () => {
      setPath((prev) => prev.slice(0, targetIndex + 2));
      clearSearch();
    };

    await animateListFadeOut(navigationLogic);
  };

  /**
   * Check if we can navigate back
   */
  const canNavigateBack = path.length > 1;

  /**
   * Get breadcrumb items for rendering
   */
  const breadcrumbItems = path.slice(1);

  return {
    path,
    setPath,
    currentLevel,
    navigateToCategory,
    navigateBack,
    navigateToBreadcrumb,
    canNavigateBack,
    breadcrumbItems,
  };
};
