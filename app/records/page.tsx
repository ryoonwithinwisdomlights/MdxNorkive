import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();

  //   useEffect(() => {
  //     router.push("/");
  //   }, []);
  return <div>page</div>;
};

export default page;
