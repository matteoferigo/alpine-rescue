import CloseButton from "@/components/close-button";
import SummaryDriveRoute from "@/components/summary/drive";
import SummaryHelicopterRoute from "@/components/summary/helicopter";
import SummaryOffroadRoute from "@/components/summary/offroad";
import type { SummaryComponentProps } from "@/components/summary/types";
import { useState } from "react";

const SummaryComponent = ({ open }: SummaryComponentProps) => {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <aside
      className={`relative text-gray-900 dark:text-white bg-white dark:bg-gray-900 h-3/5 md:h-screen overflow-x-auto py-10 box-border space-y-10 transition-width duration-300 ${
        open && isOpen
          ? "w-full md:w-[900px] px-7 ease-in"
          : "w-0 px-0 ease-out"
      }`}
    >
      <SummaryOffroadRoute />
      <SummaryDriveRoute />
      <SummaryHelicopterRoute />
      <div className="absolute top-2 right-2 md:top-4 !m-0">
        <CloseButton onClick={() => setIsOpen((prev) => !prev)} />
      </div>
    </aside>
  );
};

export default SummaryComponent;
