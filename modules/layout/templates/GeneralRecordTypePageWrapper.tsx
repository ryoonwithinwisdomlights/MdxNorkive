import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function GeneralRecordTypePageWrapper({ children }: Props) {
  return (
    <div className="xl:w-[calc(100vw-300px)] w-full h-vh flex flex-row  justify-end items-start ">
      {children}
    </div>
  );
}
