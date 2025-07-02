import HeaderSearch from "@/modules/common/components/HeaderSearch";
import LogoBar from "@/modules/common/ui/LogoBar";
import { MenuItemDrop } from "@/modules/layout/components/menu/MenuItemDrop";
import SettingButton from "@/modules/common/components/shared/SettingButton";

const TopNavPC = ({ links }) => {
  return (
    <div className="hidden md:flex w-full h-16 shadow bg-white dark:bg-neutral-800 px-7 items-between">
      <LogoBar />
      <HeaderSearch />
      <div
        id="top-nav-pc"
        className="hidden md:flex md:flex-row justify-center py-2 bg-white dark:bg-neutral-800"
      >
        {links &&
          links?.map((link, index) => <MenuItemDrop key={index} link={link} />)}
        {/* <DarkModeButton className="flex flex-col justify-center items-center " /> */}
        <SettingButton />
      </div>
    </div>
  );
};

export default TopNavPC;
