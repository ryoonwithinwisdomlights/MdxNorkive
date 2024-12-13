"use client";
import { useGlobal } from "@/lib/providers/globalProvider";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRoundIcon } from "lucide-react";

/**
 * Encrypted article verification component
 * @param {password, validPassword} props
 * @param password correct password
 * @param validPassword(bool) Callback function, verify that the correct callback input parameter is true
 * @returns
 */
export const ArticleLock = (props) => {
  const { validPassword } = props;
  const { locale } = useGlobal({ from: "index" });
  const router = useRouter();
  const [tempPassword, setTempPassword] = useState<string>("");
  const submitPassword = () => {
    // const p: HTMLElement = document.getElementById("password");
    if (!validPassword(tempPassword)) {
      const tips = document.getElementById("tips");
      if (tips) {
        tips.innerHTML = "";
        tips.innerHTML = `<div class='text-red-500 animate__shakeX animate__animated'>${locale.COMMON.PASSWORD_ERROR}</div>`;
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
    <div className="w-full flex flex-col justify-center  items-start ">
      <div
        id="container"
        className="w-full flex flex-col justify-center items-start px-24 md:py-24 h-96 "
      >
        <div className="flex flex-row items-start ">
          {/** pc */}
          <div className="hidden md:flex">
            <div className="  flex flex-col items-start">
              <div className="font-bold text-lg p-0 mr-4">
                비밀번호를 입력하세요.
              </div>
              {/* <p className="text-sm">{locale.COMMON.ARTICLE_LOCK_TIPS}</p> */}
              <p className="text-sm">{locale.COMMON.ARTICLE_LOCK_TIPS}</p>
            </div>
            <div className="flex ">
              <input
                id="password"
                type="password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  // let ss = event.target.value;
                  setTempPassword(event.target.value);
                  submitPassword();
                }}
                ref={passwordInputRef} // Bind ref to passwordInputRef variable
                className="outline-none w-full text-sm pl-5 rounded-l transition focus:shadow-lg dark:text-neutral-300 font-light leading-10 text-black bg-neutral-50 dark:bg-neutral-500"
              ></input>
              <div
                onClick={submitPassword}
                className="px-3 whitespace-nowrap cursor-pointer text-center items-center justify-center py-2 dark:bg-neutral-500 bg-neutral-400 hover:bg-neutral-300 text-white rounded-r duration-300"
              >
                <KeyRoundIcon className="duration-200 cursor-pointer " />
                &nbsp;{locale.COMMON.SUBMIT}
                &nbsp; 입력완료
              </div>
            </div>
          </div>
          {/** mobile */}
          <div className="lg:hidden sm:hidden md:hidden text-left flex flex-col gap-2 py-4 dark:text-neutral-100">
            <div className=" ">
              {" "}
              <div className="font-bold text-lg p-0 m-0">
                비밀번호를 입력하세요.
              </div>
              {/* <p className="text-sm">{locale.COMMON.ARTICLE_LOCK_TIPS}</p> */}
              <p className="text-sm">{locale.COMMON.ARTICLE_LOCK_TIPS}</p>
            </div>
            <div className="flex ">
              <input
                id="password"
                type="password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  // let ss = event.target.value;
                  setTempPassword(event.target.value);
                  submitPassword();
                }}
                ref={passwordInputRef} // Bind ref to passwordInputRef variable
                className="outline-none w-full text-sm  rounded-l transition focus:shadow-lg dark:text-neutral-300 font-light leading-10 text-black bg-neutral-50 dark:bg-neutral-700"
              ></input>
              <div
                onClick={submitPassword}
                className="px-3 whitespace-nowrap cursor-pointer text-center items-center justify-center py-2 dark:bg-neutral-500 bg-neutral-400 hover:bg-neutral-300 text-white rounded-r duration-300"
              >
                <KeyRoundIcon className="duration-200 cursor-pointer " />
                &nbsp;{locale.COMMON.SUBMIT}
                &nbsp; 입력완료
              </div>
            </div>
          </div>

          <div id="tips"></div>
        </div>
        <div
          onClick={historyGoBack}
          className="flex flex-row items-start justify-start text  text-right md:w-2/5  md:my-20  duration-200  hover:border-neutral-200 border-b-2 border-neutral-100  hover:font-bold "
        >
          ← 뒤로가기
        </div>
      </div>
    </div>
  );
};
