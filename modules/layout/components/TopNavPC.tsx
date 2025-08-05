import HeaderSearch from "@/modules/common/components/HeaderSearch";
import LogoBar from "@/modules/common/ui/LogoBar";
import { MenuItemDrop } from "@/modules/layout/components/menu/MenuItemDrop";
import SettingButton from "@/modules/common/components/shared/SettingButton";
import { useMenu } from "@/lib/context/MenuProvider";

const TopNavPC = () => {
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

export default TopNavPC;
