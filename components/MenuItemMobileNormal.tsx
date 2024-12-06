"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NormalMenu = (props) => {
  const pathname = usePathname();
  const { link } = props;

  if (!link || !link.show) {
    return null;
  }

  const selected = pathname === link.to;

  return (
    <Link
      key={`${link.to}`}
      title={link.to}
      href={link.to}
      className={
        "py-0.5 duration-500 justify-between text-neutral-500 dark:text-neutral-300 hover:text-black hover:underline cursor-pointer flex flex-nowrap items-center " +
        (selected ? "text-black" : " ")
      }
    >
      <div className="my-auto items-center justify-center flex ">
        <div className={"hover:text-black"}>{link.name}</div>
      </div>
      {link.slot}
    </Link>
  );
};
