import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function GeneralRecordTypePageWrapper({ children }: Props) {
  return <div className="w-full pt-10 flex flex-row">{children}</div>;
}
