import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { IntroSectionWithMenuOptionProps } from "@/types/components/pageutils";
import { lazy } from "react";

const InjectedOptionMenu = lazy(
  () => import("@/modules/page/components/InjectedOptionMenu")
);

const IntroSectionWithMenuOption = ({
  introTrue = true,
  introType,
  currentRecordType = "",
  allOptions = [],
  handleRecordTypeChange = () => {},
}: IntroSectionWithMenuOptionProps) => {
  const { locale } = useGeneralSiteSettings();
  const introText =
    introTrue && introType
      ? locale.INTRO[introType]
      : {
          TITLE: "",
          DESC: "",
        };
  return (
    <div className="flex flex-col md:flex-row justify-between items-end gap-4">
      <div className="">
        {introTrue && (
          <div className="text-start flex flex-col gap-2">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white  ">
              {introText.TITLE}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              {introText.DESC}
            </p>
          </div>
        )}
      </div>
      <div>
        {allOptions.length > 0 && (
          <div className="w-52 text-right relative flex flex-col justify-end items-end">
            <InjectedOptionMenu
              currentRecordType={currentRecordType}
              allOptions={allOptions}
              handleRecordTypeChange={handleRecordTypeChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroSectionWithMenuOption;
