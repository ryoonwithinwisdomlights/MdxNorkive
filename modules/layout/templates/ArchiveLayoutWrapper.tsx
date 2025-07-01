import RightSlidingDrawer from "./RightSlidingDrawer";

export default function ArchiveLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row justify-between w-full h-full relative z-10">
      <div
        id="container-inner"
        className="w-full max-w-3xl justify-center mx-auto "
      >
        {children}
      </div>

      <RightSlidingDrawer />
    </div>
  );
}
