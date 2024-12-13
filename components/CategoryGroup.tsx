import CategoryItem from "./CategoryItem";
import { TagIcon } from "lucide-react";

const CategoryGroup = ({ currentCategory, categoryOptions }) => {
  if (!categoryOptions) {
    return <></>;
  }
  return (
    <div id="category-list" className="pt-4">
      <div className="mb-2">
        <TagIcon className="mr-2" />
        Classification
      </div>
      <div className="flex flex-wrap">
        {categoryOptions?.map((category) => {
          const selected = currentCategory === category.name;
          return (
            <CategoryItem
              key={category.name}
              selected={selected}
              category={category.name}
              categoryCount={category.count}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGroup;
