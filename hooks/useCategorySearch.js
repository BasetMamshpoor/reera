import { useState, useMemo } from "react";

/**
 * Custom hook for handling category search functionality
 * @param {Array} categories - Array of categories to search through
 * @returns {Object} Search state and handlers
 */
export const useCategorySearch = (categories = []) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter categories based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;

    return categories.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add any submit logic here if needed in the future
  };

  // Clear search query
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Search statistics
  const searchStats = {
    hasQuery: Boolean(searchQuery.trim()),
    resultCount: filteredCategories.length,
    totalCount: categories.length,
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredCategories,
    handleSearchChange,
    handleSearchSubmit,
    clearSearch,
    searchStats,
  };
};
