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
      className="md:fixed md:start-0 flex flex-col items-end top-0 bottom-0 z-20
   bg-neutral-50 dark:bg-neutral-800 text-sm border-e max-md:hidden md:w-[286px] "
      //   data-collapsed={collapsed}
    >
      <div
        id="nd-sidebar-content"
        className="overflow-hidden w-full h-full relative pt-20 py-6 flex flex-col gap-2 "
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
