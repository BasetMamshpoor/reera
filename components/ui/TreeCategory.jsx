"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronRight, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const TreeCategory = ({
  category,
  level = 0,
  selectedCategory,
  onCategorySelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const isSelected = selectedCategory === category.id;

  const handleClick = () => {
    if (hasChildren) {
      if (!isExpanded) {
        setIsExpanded(true);
      }

      onCategorySelect(category.id);
    } else {
      onCategorySelect(category.id);
    }
  };

  const handleChildSelect = (childId) => {
    onCategorySelect(childId);
  };

  // Auto-expand parent when a child is selected
  React.useEffect(() => {
    if (hasChildren && isSelected) {
      setIsExpanded(true);
    }
  }, [hasChildren, isSelected]);

  return (
    <div className="select-none">
      {/* Category Item */}
      <div
        className={cn(
          "flex items-center gap-2 py-2  rounded-lg transition-colors cursor-pointer",
          level > 0 && "",
          isSelected
            ? "bg-Primary-50 border border-Primary-200"
            : "hover:bg-Gray-50"
        )}
        onClick={handleClick}
      >
        {/* Expand/Collapse Button */}
        {hasChildren && (
          <div className="w-4 h-4 flex items-center justify-center text-Gray-950">
            {isExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </div>
        )}

        {/* Placeholder for categories without children */}
        {!hasChildren && <div className="w-4 h-4" />}

        {/* Folder Icon */}
        <div className={cn("text-Gray-950", isSelected && "text-Primary-500")}>
          {hasChildren ? (
            isExpanded ? (
              <FolderOpen className="w-4 h-4" />
            ) : (
              <Folder className="w-4 h-4" />
            )
          ) : (
            <div
              className={cn(
                "w-1 h-1 rounded-full",
                isSelected ? "bg-Primary-500" : "text-Gray-950"
              )}
            />
          )}
        </div>

        {/* Label */}
        <span
          className={cn(
            "flex-1 text-sm font-normal",
            isSelected ? "text-Primary-700 font-medium" : "text-Gray-950"
          )}
        >
          {category.label}
        </span>
      </div>

      {hasChildren && isExpanded && (
        <div className="border-l-2 border-Gray-200 ml-6">
          {category.children.map((child) => (
            <TreeCategory
              key={child.id}
              category={child}
              level={level + 1}
              selectedCategory={selectedCategory}
              onCategorySelect={handleChildSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeCategory;
