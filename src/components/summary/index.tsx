import SummaryDriveRoute from "@/components/summary/drive";
import SummaryHelicopterRoute from "@/components/summary/helicopter";
import SummaryOffroadRoute from "@/components/summary/offroad";
import type { SummaryComponentProps } from "@/components/summary/types";

const SummaryComponent = ({ open }: SummaryComponentProps) => {
  return (
    <aside
      className={`text-gray-900 dark:text-white bg-white dark:bg-gray-900 h-screen overflow-x-auto py-10 box-border space-y-10 transition-width duration-300 ${
        open ? "w-[900px] px-7 ease-in" : "w-0 px-0 ease-out"
      }`}
    >
      <SummaryOffroadRoute />
      <SummaryDriveRoute />
      <SummaryHelicopterRoute />
    </aside>
  );
};

export default SummaryComponent;
