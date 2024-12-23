"use client";
/**
 * Blank Blog List
 * @returns {JSX.Element}
 * @constructor
 */
const NavPostListEmpty = ({
  searchKeyword = "none",
}: {
  searchKeyword?: string;
}) => {
  return (
    <div className="text-neutral-500 dark:text-neutral-300 flex flex-col w-full items-center justify-center min-h-screen mx-auto md:-mt-20">
      {searchKeyword && (
        <div className="">
          <span className="font-semibold">"{searchKeyword}"</span>에 대한
        </div>
      )}
      <div className=""> 레코드를 찾을 수 없습니다. </div>
    </div>
  );
};
export default NavPostListEmpty;
