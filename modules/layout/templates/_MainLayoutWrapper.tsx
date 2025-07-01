import CustomedTransitonWrapper from "@/modules/blog/wrapper/CustomedTransitonWrapper";
import React from "react";

const MainLayoutWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div
      id="center-wrapper"
      className="flex flex-col w-full relative z-10 pt-14 min-h-screen bg-white dark:bg-black dark:text-neutral-300"
    >
      <div className="flex flex-col justify-between w-full relative z-10  ">
        <div
          id="container-inner"
          className="w-full pl-7 pr-7 max-w-3xl justify-center mx-auto "
        >
          <CustomedTransitonWrapper>
            {/* <ModalProvider /> */}
            {children}

            {/* <JumpToTopButton />
            <JumpToBackButton /> */}
          </CustomedTransitonWrapper>
        </div>
      </div>
    </div>
  );
};

export default MainLayoutWrapper;
