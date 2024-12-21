import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  path: string | null;
}

export const Breadcrumb = ({ path }: BreadcrumbProps) => {
  const segments = path ? String(path).split("/").filter(Boolean) : [];
  
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6 animate-fade-in">
      <Link
        to="/"
        className="flex items-center hover:text-gray-900 transition-colors"
      >
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>
      {segments.map((segment, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <Link
            to={`/${segments.slice(0, index + 1).join("/")}`}
            className="hover:text-gray-900 transition-colors"
          >
            {segment}
          </Link>
        </div>
      ))}
    </div>
  );
};