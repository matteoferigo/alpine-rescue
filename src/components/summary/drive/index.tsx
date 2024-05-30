import type { SummaryDriveRouteProps } from "@/components/summary/drive/types";
import { useDriveRouteContext } from "@/contexts/route/drive/hooks";
import { useOffroadRouteContext } from "@/contexts/route/offroad/hooks";
import { formatTime } from "@/services/path/time/format";

const SummaryDriveRoute = ({ showABidirectional }: SummaryDriveRouteProps) => {
  const { roadDuration, trailDuration } = useDriveRouteContext();
  const { offroadDurationAStandard, offroadDurationABidirectional } =
    useOffroadRouteContext();
  const offroadDuration = showABidirectional
    ? offroadDurationABidirectional
    : offroadDurationAStandard;

  const hasDriveRoute =
    roadDuration != null && trailDuration != null && offroadDuration != null;

  return (
    <section>
      <h2 className="text-lg my-3 font-semibold text-gray-900 dark:text-white">
        <span className="inline-block text-center w-7 h-7 rounded-full bg-blue-200 mr-1">
          🚑
        </span>
        <span>Percorso via terra</span>
      </h2>

      {hasDriveRoute ? (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Tempo alla guida
              </th>
              <td className="px-3 py-4 text-right">
                {formatTime(roadDuration)}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Tempo percorrenza sentiero
              </th>
              <td className="px-3 py-4 text-right">
                {formatTime(trailDuration)}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Tempo fuori-sentiero
              </th>
              <td className="px-3 py-4 text-right">
                {formatTime(offroadDuration)}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="font-semibold text-gray-900 dark:text-white">
              <th className="px-3 py-3 text-base">Tempo stimato</th>
              <td className="px-3 py-3 text-right">
                {formatTime(roadDuration + trailDuration + offroadDuration)}
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <div
          className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
          role="alert"
        >
          <span className="font-medium">Spiacenti.</span> Percorso non trovato
        </div>
      )}
    </section>
  );
};

export default SummaryDriveRoute;
