import { library } from "@fortawesome/fontawesome-svg-core";
import { faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoryItem from "./CategoryItem";

library.add(faTh);

const CategoryGroup = ({ currentCategory, categoryOptions }) => {
  if (!categoryOptions) {
    return <></>;
  }
  return (
    <div id="category-list" className="pt-4">
      <div className="mb-2">
        <FontAwesomeIcon className="mr-2" icon={faTh} />
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
