import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import InjectedOptionMenu from "@/modules/blog/InjectedOptionMenu";
import React from "react";

type Props = {
  introTrue?: boolean;
  introType: string;
  currentRecordType: string;
  allOptions: any[];
  handleRecordTypeChange: (option: string) => void;
};

const IntroSectionWithMenuOption = ({
  introTrue = true,
  introType = "",
  currentRecordType = "",
  allOptions = [],
  handleRecordTypeChange = () => {},
}: Props) => {
  const { locale } = useGeneralSiteSettings();
  const introText = introTrue
    ? locale.INTRO[introType]
    : {
        TITLE: "",
        DESC: "",
      };
  return (
    <div className="flex flex-row justify-between items-end">
      <div className="">
        {introTrue && (
          <div className="text-start mb-6 flex flex-col gap-2">
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
          <div className="w-52 text-right relative flex flex-col justify-end items-end mb-6  ">
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
