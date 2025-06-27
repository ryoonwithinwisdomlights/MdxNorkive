"use client";
import { useNorkiveTheme } from "@/context/NorkiveThemeProvider";
import { KeyRoundIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

/**
 * Encrypted article verification component
 * @param {password, validPassword} props
 * @param password correct password
 * @param validPassword(bool) Callback function, verify that the correct callback input parameter is true
 * @returns
 */
export const ArticleLock = (props) => {
  const { validPassword } = props;
  const { locale } = useNorkiveTheme();
  const router = useRouter();
  const [tempPassword, setTempPassword] = useState<string>("");
  const submitPassword = () => {
    // const p: HTMLElement = document.getElementById("password");
    if (!validPassword(tempPassword)) {
      const tips = document.getElementById("tips");
      if (tips) {
        tips.innerHTML = "";
        tips.innerHTML = `<div class='pt-4 font-semibold text-red-500  dark:text-red-500 animate__shakeX animate__animated'>${locale.COMMON.PASSWORD_ERROR}</div>`;
      }
    }
  };

  const historyGoBack = () => {
    router.back();
  };

  const passwordInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // Select the password input box and focus it
    if (passwordInputRef.current) {
      passwordInputRef?.current.focus();
    }
  }, []);

  return (
    <div className="w-full h-full  flex flex-col justify-center items-center p-24 ">
      <div
        id="articlelock_container"
        className="w-full flex flex-col justify-center items-start "
      >
        <div className="flex flex-col justify-center  w-full">
          {/** pc */}
          <div className="hidden md:flex w-full flex-row items-center justify-center">
            <div className=" flex flex-col items-start text-stone-700">
              <div className="font-semibold text-lg p-0 mr-4 ">
                {locale.COMMON.PASSWORD_SUBMIT}
              </div>
              {/* <p className="text-sm">{locale.COMMON.ARTICLE_LOCK_TIPS}</p> */}
              <p className="text-sm">{locale.COMMON.ARTICLE_LOCK_TIPS}</p>
            </div>
            <div className="flex ">
              <input
                name="passwordCheck1"
                id="password"
                type="password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  // let ss = event.target.value;
                  setTempPassword(event.target.value);
                  submitPassword();
                }}
                ref={passwordInputRef} // Bind ref to passwordInputRef variable
                className="outline-none w-full text-sm pl-5 rounded-l transition focus:shadow-lg
                 dark:text-neutral-300 font-light leading-10 text-black
                  bg-stone-100 dark:bg-stone-200"
              ></input>
              <div
                onClick={submitPassword}
                className="px-3 flex flex-row whitespace-nowrap cursor-pointer  items-center justify-center py-2  bg-stone-600 
                 hover:bg-stone-800 hover:dark:bg-stone-500 text-stone-100  hover:text-white rounded-r duration-300"
              >
                <KeyRoundIcon className="duration-200 cursor-pointer w-4 h-4 " />

                <span className="font-semibold text-center">
                  &nbsp;{locale.COMMON.SUBMIT}
                </span>
              </div>
            </div>
          </div>
          {/** mobile */}
          <div className="lg:hidden sm:hidden md:hidden text-center w-full justify-center flex flex-col gap-2 py-4 dark:text-neutral-100">
            <div className=" ">
              <div className="font-semibold text-lg p-0 m-0 text-stone-700">
                {/* 비밀번호를 <br />
                입력하세요. */}
                {locale.COMMON.PASSWORD_SUBMIT}
              </div>
              <p className="text-sm">{locale.COMMON.ARTICLE_LOCK_TIPS}</p>
            </div>
            <div className="flex w-full pt-4">
              <input
                name="passwordCheck2"
                id="password"
                type="password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  // let ss = event.target.value;
                  setTempPassword(event.target.value);
                  submitPassword();
                }}
                ref={passwordInputRef} // Bind ref to passwordInputRef variable
                className="outline-none w-full text-sm  rounded-l transition focus:shadow-lg dark:text-neutral-300 font-light leading-10 text-black
                  bg-stone-100 dark:bg-stone-200"
              ></input>
              <div
                onClick={submitPassword}
                className="px-3 flex flex-row whitespace-nowrap cursor-pointer text-center items-center justify-center py-2 rounded-r duration-300 bg-stone-600 
                 hover:bg-stone-800 hover:dark:bg-stone-500 text-stone-100  hover:text-white "
              >
                <KeyRoundIcon className="duration-200 cursor-pointer " />

                <span className="font-semibold text-center ">
                  &nbsp;{locale.COMMON.SUBMIT}
                </span>
              </div>
            </div>
          </div>

          <div
            id="tips"
            className="flex flex-row justify-center items-center text-right "
          ></div>
        </div>
        <div
          onClick={historyGoBack}
          className="pt-4 flex flex-row text-stone-700 items-start justify-start text-right md:w-2/5 
           md:my-20 duration-200  hover:border-stone-200 border-b-2 border-stone-100 hover:font-semibold "
        >
          {locale.RECORD.BACK}
        </div>
      </div>
    </div>
  );
};
