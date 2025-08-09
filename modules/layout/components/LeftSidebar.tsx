import { useNav } from "@/lib/context/NavInfoProvider";
import Footer from "./Footer";
import { LefitSidebarItemDrop } from "./LefitSidebarItemDrop";

const LeftSidebar = () => {
  const { menuList } = useNav({ from: "LeftSidebar" });
  console.log(menuList);
  return (
    <aside
      id="nd-sidebar"
      className="hidden md:w-[20%] h-screen md:fixed xl:block left-0 items-end top-0 bottom-0 z-20
   bg-neutral-50 dark:bg-neutral-800 text-sm border-e m-0  pt-18 "
      //   data-collapsed={collapsed}
    >
      <div
        id="nd-sidebar-content"
        className="  overflow-hidden w-full h-[calc(100vh-150px)] relative  py-6 flex flex-col gap-2 "
      >
        {menuList?.map((data, index) => (
          <LefitSidebarItemDrop key={index} menuData={data} />
        ))}
      </div>
      <Footer />
    </aside>
  );
};

export default LeftSidebar;
