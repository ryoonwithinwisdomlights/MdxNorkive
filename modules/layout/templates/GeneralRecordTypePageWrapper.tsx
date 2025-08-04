import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function GeneralRecordTypePageWrapper({ children }: Props) {
  return (
    <div className="w-screen  flex flex-row  justify-center ">{children}</div>
  );
}
