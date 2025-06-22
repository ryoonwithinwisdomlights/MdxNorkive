"use client";
import { parseIcon } from "@/lib/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const MenuItemPCNormal = (props) => {
  const { link } = props;

  const pathname = usePathname();
  const selected = pathname === link.to;
  if (!link || !link.show) {
    return null;
  }
  const icon = parseIcon(link.icon);
  return (
    <Link
      key={`${link.id}-${link.to}`}
      title={link.to}
      href={link.to}
      className={
        "px-2 duration-300 text-sm justify-between dark:text-neutral-300 cursor-pointer flex flex-nowrap items-center " +
        (selected
          ? "bg-neutral-600 text-white hover:text-white"
          : "hover:text-neutral-600")
      }
    >
      <div className="items-center justify-center flex ">
        {icon && <FontAwesomeIcon icon={icon} />}
        <div className="ml-2 whitespace-nowrap">{link.name}</div>
      </div>
      {link.slot}
    </Link>
  );
};
