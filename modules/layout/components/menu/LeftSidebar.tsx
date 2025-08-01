import { useMenu } from "@/lib/context/MenuProvider";
import { LefitSidebarItemDrop } from "./LefitSidebarItemDrop";
import Footer from "../Footer";

const LeftSidebar = () => {
  //   const [collapsed, setCollapsed] = useState(false);
  const { menuData } = useMenu({ from: "LeftSidebar" });
  console.log(menuData);
  return (
    <aside
      id="nd-sidebar"
      className="hidden md:fixed xl:block left-0 items-end top-0   bottom-0 z-20
   bg-neutral-50 dark:bg-neutral-800 text-sm border-e  md:w-[18%] mt-16 "
      //   data-collapsed={collapsed}
    >
      <div
        id="nd-sidebar-content"
        className="overflow-hidden w-full h-full relative  py-6 flex flex-col gap-2 "
      >
        {menuData?.map((data, index) => (
          <LefitSidebarItemDrop key={index} menuData={data} />
        ))}
      </div>
      <Footer />
    </aside>
  );
};

export default LeftSidebar;
