import { useNav } from "@/lib/context/NavInfoProvider";
import { MenuItemDrop } from "@/modules/common/top-header/MenuItemDrop";
import LogoBar from "@/modules/common/top-header/LogoBar";
import SettingButton from "@/modules/common/top-header/SettingButton";
import { LargeSearchToggle } from "@/modules/layout/components/search-toggle";

const NavigationForPC = () => {
  const { menuList } = useNav({ from: "TopNavBar" });
  const links = menuList;

  return (
    <div className="hidden md:flex flex-row justify-center w-full h-16 shadow bg-white dark:bg-neutral-900  dark:border-b-2 dark:border-neutral-800">
      <div className=" w-full px-6 flex flex-row justify-between items-center h-16 ">
        <LogoBar />
        {/* <HeaderSearch /> */}
        <LargeSearchToggle
          hideIfDisabled
          className="hidden md:flex w-[40%]
          hover:text-neutral-800 dark:hover:text-neutral-200
           bg-linear-to-br from-white to-neutral-200/50
              dark:from-neutral-900 dark:to-neutral-700/50"
        />
        <div
          id="top-nav-pc"
          className="hidden md:flex md:flex-row justify-center py-2  dark:bg-neutral-900"
        >
          {links &&
            links?.map((link, index) => (
              <MenuItemDrop key={index} menuData={link} />
            ))}

          <SettingButton />
        </div>
      </div>
    </div>
  );
};

export default NavigationForPC;
