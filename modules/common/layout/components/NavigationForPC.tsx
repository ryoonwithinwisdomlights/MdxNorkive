import LogoBar from "@/modules/shared/LogoBar";
import { MenuItemDrop } from "@/modules/common/menu/MenuItemDrop";
import SettingButton from "@/modules/shared/SettingButton";
import { useMenu } from "@/lib/context/MenuProvider";
import HeaderSearch from "@/modules/shared/HeaderSearch";

const NavigationForPC = () => {
  const { menuData } = useMenu({ from: "TopNavBar" });
  const links = menuData;

  return (
    <div className="hidden md:flex flex-row justify-center w-full h-16 shadow bg-white dark:bg-neutral-900  dark:border-b-2 dark:border-neutral-800">
      <div className="xl:w-[60%] w-full px-6 flex flex-row justify-between items-center h-16 ">
        <LogoBar />
        <HeaderSearch />
        {/* <SettingButton /> */}
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
