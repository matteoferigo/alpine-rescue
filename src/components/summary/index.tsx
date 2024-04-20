import SummaryDriveRoute from "@/components/summary/drive";
import SummaryHelicopterRoute from "@/components/summary/helicopter";
import SummaryOffroadRoute from "@/components/summary/offroad";
import type { SummaryComponentProps } from "@/components/summary/types";

const SummaryComponent = ({ open }: SummaryComponentProps) => {
  return (
    <aside
      className={`relative text-gray-900 dark:text-white bg-white dark:bg-gray-900 overflow-x-auto box-border space-y-10 transition-width duration-300 ${
        open
          ? "w-full h-3/5 md:h-screen md:w-[900px] px-7 py-10 ease-in"
          : "w-full h-0 md:w-0 md:h-screen p-0 ease-out"
      }`}
    >
      <SummaryOffroadRoute />
      <SummaryDriveRoute />
      <SummaryHelicopterRoute />
    </aside>
  );
};

export default SummaryComponent;
