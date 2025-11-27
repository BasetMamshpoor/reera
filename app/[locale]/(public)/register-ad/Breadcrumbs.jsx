// Breadcrumbs.jsx
import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import ArrowLeft from "@/assets/icons/arrow-left.svg";

export default function Breadcrumbs({ path, onClickBack }) {
  return (
    <Breadcrumb className="lg:block hidden py-4 text-right cursor-pointer">
      <BreadcrumbList>
        {path.slice(1).map((item, index) => (
          <React.Fragment key={item.id ?? index}>
            <BreadcrumbItem>
              {index === path.length - 2 ? (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onClickBack(index);
                  }}
                >
                  {item.title}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < path.length - 2 && <ArrowLeft className="fill-Gray-500" />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
