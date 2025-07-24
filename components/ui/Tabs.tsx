/**
 * Tabs switch tabs
 * @param {*} param0
 * @returns
 */
const Tabs = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return <section className={"duration-200 " + className}>{children}</section>;
};

export default Tabs;
