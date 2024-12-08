import CategoryList from "@/components/records/CategoryList";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faTh);

export default async function Page() {
  return <CategoryList />;
}
