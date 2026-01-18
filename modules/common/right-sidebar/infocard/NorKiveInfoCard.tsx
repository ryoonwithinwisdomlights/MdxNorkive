import { BLOG } from "@/blog.config";
import Image from "next/image";

const NorKiveInfoCard = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-col items-center gap-1  ">
        <div
          className="flex flex-row 
  justify-center  items-center
  text-xs text-neutral-800 text-center
  font-extralight dark:text-neutral-200  "
        >
          "Browsing all your archives <br />
          written and recored in Notion."
        </div>
        <Image
          src="/images/norkive_black.jpg"
          className="dark:border ml-2 dark:border-neutral-300"
          width={180}
          height={220}
          alt={BLOG.AUTHOR}
          priority={false}
          loading="lazy"
          quality={75}
        />
      </div>
      <div
        className="
flex flex-col items-center justify-center break-words overflow "
      >
        <div className="  dark:text-neutral-300 flex flex-col  ">
          <div className="flex flex-row justify-center items-center gap-2 ">
            <div
              className="text-xs underline text-end flex flex-col 
     justify-end-safe text-neutral-600 dark:text-neutral-300 "
            >
              <span className="">Archive</span>
              <span className="">Recorded</span>
              <span className="">In notion</span>
            </div>
            <div
              className="text-6xl font-semibold
     text-black dark:text-white flex flex-row hover:underline 
 decoration-black justify-center dark:decoration-neutral-100 "
            >
              Norkive.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NorKiveInfoCard;
