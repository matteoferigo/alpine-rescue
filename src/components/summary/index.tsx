import SummaryDriveRoute from "@/components/summary/drive";
import SummaryHelicopterRoute from "@/components/summary/helicopter";
import SummaryOffroadRoute from "@/components/summary/offroad";
import type { SummaryComponentProps } from "@/components/summary/types";

const SummaryComponent = ({ open }: SummaryComponentProps) => {
  return (
    <aside
      className={`bg-white fixed top-0 right-0 w-[500px] h-full px-7 py-10 box-border space-y-10 transition duration-300 ${
        open ? "translate-x-0 ease-in" : "translate-x-full ease-out"
      }`}
    >
      <SummaryOffroadRoute />
      <SummaryDriveRoute />
      <SummaryHelicopterRoute />
    </aside>
  );
};

export default SummaryComponent;
