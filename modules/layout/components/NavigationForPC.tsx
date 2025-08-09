import { useNav } from "@/lib/context/NavInfoProvider";
import { MenuItemDrop } from "@/modules/common/menu/MenuItemDrop";
import LogoBar from "@/modules/shared/LogoBar";
import SettingButton from "@/modules/shared/SettingButton";
import { LargeSearchToggle } from "./layout/search-toggle";

const NavigationForPC = () => {
  const { menuList } = useNav({ from: "TopNavBar" });
  const links = menuList;

  return (
    <div className="hidden md:flex flex-row justify-center w-full h-16 shadow bg-white dark:bg-neutral-900  dark:border-b-2 dark:border-neutral-800">
      <div className=" w-full px-6 flex flex-row justify-between items-center h-16 ">
        <LogoBar />
        {/* <HeaderSearch /> */}
        <LargeSearchToggle hideIfDisabled className="hidden md:flex  w-[40%]" />
        <div
          id="top-nav-pc"
          className="hidden md:flex md:flex-row justify-center py-2  dark:bg-neutral-900"
        >
          {links &&
            links?.map((link, index) => (
              <MenuItemDrop key={index} link={link} />
            ))}

          <SettingButton />
        </div>
      </div>
    </div>
  );
};

export default NavigationForPC;
