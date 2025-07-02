"use client";
import Footer from "./Footer";
import NavPostList from "./NavPostList";

const LeftNavigationBar = () => {
  return (
    <div className="font-sans hidden md:fixed  md:left-0 md:block md:w-[20%] border-r dark:bg-neutral-900 dark:border-transparent z-10">
      <div className="h-screen overflow-y-auto scrollbar-hide overscroll-contain">
        <div className="md:w-full px-6  ">
          <div className="mb-20 mt-10 pb-10">
            <NavPostList />
          </div>
        </div>
      </div>

      <div className="fixed md:w-[20%] bottom-0 z-20 bg-white border-rdark:bg-neutral-900">
        <Footer />
      </div>
    </div>
  );
};

export default LeftNavigationBar;
