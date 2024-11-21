import { useGlobal } from '@/lib/global'
import { useEffect, useRef } from 'react'

/**
 * Encrypted article verification component
 * @param {password, validPassword} props
 * @param password correct password
 * @param validPassword(bool) Callback function, verify that the correct callback input parameter is true
 * @returns
 */
export const ArticleLock = props => {
  const { validPassword } = props
  const { locale } = useGlobal()

  const submitPassword = () => {
    const p = document.getElementById('password')
    if (!validPassword(p?.value)) {
      const tips = document.getElementById('tips')
      if (tips) {
        tips.innerHTML = ''
        tips.innerHTML = `<div class='text-red-500 animate__shakeX animate__animated'>${locale.COMMON.PASSWORD_ERROR}</div>`
      }
    }
  }

  const historyGoBack = () => {
    window.history.back()
  }

  const passwordInputRef = useRef(null)
  useEffect(() => {
    // Select the password input box and focus it
    passwordInputRef.current.focus()
  }, [])

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
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    submitPassword()
                  }
                }}
                ref={passwordInputRef} // Bind ref to passwordInputRef variable
                className="outline-none w-full text-sm pl-5 rounded-l transition focus:shadow-lg dark:text-neutral-300 font-light leading-10 text-black bg-neutral-50 dark:bg-neutral-500"
              ></input>
              <div
                onClick={submitPassword}
                className="px-3 whitespace-nowrap cursor-pointer text-center items-center justify-center py-2 dark:bg-yellow-500 bg-yellow-400 hover:bg-yellow-300 text-white rounded-r duration-300"
              >
                <i className={'duration-200 cursor-pointer fas fa-key'}>
                  {/* &nbsp;{locale.COMMON.SUBMIT} */}
                </i>
                &nbsp; 입력완료
              </div>
            </div>
            {/* <Button
              onClick={historyGoBack}
              className=" px-3 cursor-pointer items-center justify-center py-2 bg-neutral-100 hover:bg-neutral-50  text-black rounded-r duration-300"
            >
              뒤로가기
            </Button> */}
          </div>
          {/** mobile */}
          <div className="lg:hidden sm:hidden md:hidden text-left flex flex-col gap-2 py-4 dark:text-neutral-100">
            <div className=" ">
              {' '}
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
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    submitPassword()
                  }
                }}
                ref={passwordInputRef} // Bind ref to passwordInputRef variable
                className="outline-none w-full text-sm  rounded-l transition focus:shadow-lg dark:text-neutral-300 font-light leading-10 text-black bg-neutral-50 dark:bg-neutral-700"
              ></input>
              <div
                onClick={submitPassword}
                className="px-3 whitespace-nowrap cursor-pointer text-center items-center justify-center py-2 dark:bg-yellow-500 bg-yellow-400 hover:bg-yellow-300 text-white rounded-r duration-300"
              >
                <i className={'duration-200 cursor-pointer fas fa-key'}>
                  {/* &nbsp;{locale.COMMON.SUBMIT} */}
                </i>
                &nbsp; 입력완료
              </div>
            </div>
          </div>

          <div id="tips"></div>
        </div>
        <div
          onClick={historyGoBack}
          className="flex flex-row items-start justify-start text  text-right md:w-2/5  md:my-20  duration-200  hover:border-orange-200 border-b-2 border-neutral-100  hover:font-bold "
        >
          ← 뒤로가기
        </div>
      </div>
    </div>
  )
}
