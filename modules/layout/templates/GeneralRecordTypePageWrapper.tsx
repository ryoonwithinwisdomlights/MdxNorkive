import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function GeneralRecordTypePageWrapper({ children }: Props) {
  return (
    <div className="w-full flex flex-row justify-center items-center">
      {children}
    </div>
  );
}
