"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { LockedSection } from "@/types";
import { LockedPageProps } from "@/types/components/pageutils";
import { KeyRoundIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

/**
 * Record verification component
 * @param {password, validPassword} props
 * @param password correct password
 * @param validPassword(bool) Callback function, verify that the correct callback input parameter is true
 * @returns
 */
const LockedPage = ({ validPassword }: LockedPageProps) => {
  const { locale } = useGeneralSiteSettings();
  const LOCKED = locale.LOCKED as LockedSection;
  const [tempPassword, setTempPassword] = useState<string>("");
  const submitPassword = () => {
    if (!validPassword(tempPassword)) {
      const tips = document.getElementById("tips");
      if (tips) {
        tips.innerHTML = "";
        tips.innerHTML = `<div class='pt-4 font-semibold text-red-500  dark:text-red-500 animate__shakeX animate__animated'>${LOCKED.PASSWORD_ERROR}</div>`;
      }
    }
  };

  const passwordInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // Select the password input box and focus it
    if (passwordInputRef.current) {
      passwordInputRef?.current.focus();
    }
  }, []);

  return (
    <div
      id="container"
      className="w-full h-full  flex flex-col justify-center items-center p-24 "
    >
      <div className="w-full flex flex-col justify-center items-start ">
        <div className="flex flex-col justify-center  w-full">
          {/** pc */}
          <div className="hidden md:flex w-full flex-row items-center justify-center">
            <div className=" flex flex-col items-start text-neutral-700 dark:text-neutral-200">
              <div className="font-semibold text-lg p-0 mr-4 ">
                {LOCKED.PASSWORD_SUBMIT}
              </div>

              <p className="text-sm">{LOCKED.ARCHIVE_LOCK_TIPS}</p>
            </div>
            <div className="flex ">
              <input
                name="passwordCheck1"
                id="password"
                type="password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setTempPassword(event.target.value);
                  submitPassword();
                }}
                ref={passwordInputRef} // Bind ref to passwordInputRef variable
                className="outline-none w-full text-sm pl-5 rounded-l transition focus:shadow-lg
                 dark:text-neutral-700 font-light leading-10 text-black
                  bg-neutral-100 dark:bg-neutral-200"
              ></input>
              <div
                onClick={submitPassword}
                className="px-3 flex flex-row whitespace-nowrap cursor-pointer  items-center justify-center py-2  bg-neutral-600 
                 hover:bg-neutral-800 hover:dark:bg-neutral-500 text-neutral-100  hover:text-white rounded-r duration-300"
              >
                <KeyRoundIcon className="duration-200 cursor-pointer w-4 h-4 " />

                <span className="font-semibold text-center">
                  &nbsp;{LOCKED.SUBMIT}
                </span>
              </div>
            </div>
          </div>
          {/** mobile */}
          <div className="lg:hidden sm:hidden md:hidden text-center w-full justify-center flex flex-col gap-2 py-4 dark:text-neutral-100">
            <div className=" ">
              <div className="font-semibold text-lg p-0 m-0 text-neutral-700">
                {LOCKED.PASSWORD_SUBMIT}
              </div>
              <p className="text-sm">{LOCKED.ARCHIVE_LOCK_TIPS}</p>
            </div>
            <div className="flex w-full pt-4">
              <input
                name="passwordCheck2"
                id="password"
                type="password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setTempPassword(event.target.value);
                  submitPassword();
                }}
                ref={passwordInputRef} // Bind ref to passwordInputRef variable
                className="outline-none w-full text-sm  rounded-l transition focus:shadow-lg dark:text-neutral-300 font-light leading-10 text-black
                  bg-neutral-100 dark:bg-neutral-200"
              ></input>
              <div
                onClick={submitPassword}
                className="px-3 flex flex-row whitespace-nowrap cursor-pointer text-center items-center justify-center
                 py-2 rounded-r duration-300 bg-neutral-600 
                 hover:bg-neutral-800 hover:dark:bg-neutral-500 text-neutral-100  hover:text-white "
              >
                <KeyRoundIcon className="duration-200 cursor-pointer " />

                <span className="font-semibold text-center ">
                  &nbsp;{LOCKED.SUBMIT}
                </span>
              </div>
            </div>
          </div>

          <div
            id="tips"
            className="flex flex-row justify-center items-center text-right "
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LockedPage;
