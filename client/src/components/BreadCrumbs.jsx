import { ChevronRight } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const BreadCrumbs = ({ className }) => {
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  let breadCrumbsPath = "";

  return (
    <div
      className={`hidden sm:flex items-center border-2 border-primary w-fit px-6 py-1 rounded-lg ${className}`}
    >
      {paths.map((path, index) => {
        if (path === "")
          return (
            <NavLink
              to="/"
              key={index}
              className="text-neutral-500 h-7 px-2 rounded hover:bg-neutral-200"
            >
              Home
            </NavLink>
          );

        breadCrumbsPath += `/${path}`;

        return index === paths.length - 1 ? (
          <div key={index} className="capitalize flex items-center">
            <ChevronRight size={20} strokeWidth={1.5} className="mx-2" />
            <span className="h-7 px-2 rounded">{path}</span>
          </div>
        ) : (
          <div key={index} className="flex items-center">
            <ChevronRight size={20} strokeWidth={1.5} className="mx-2" />
            <NavLink
              to={breadCrumbsPath}
              className="capitalize text-neutral-500  hover:bg-neutral-200 h-7 px-2 rounded"
            >
              {path}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
