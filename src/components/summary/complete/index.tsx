import type { SummaryCompleteRouteProps } from "@/components/summary/complete/types";
import { useDriveRouteContext } from "@/contexts/route/drive/hooks";
import { useHelicopterRouteContext } from "@/contexts/route/helicopter/hooks";
import { useOffroadRouteContext } from "@/contexts/route/offroad/hooks";
import { formatTime } from "@/services/path/time/format";

const SummaryCompleteRoute = ({
  showABidirectional,
  showDriveRoute,
  setShowDriveRoute,
}: SummaryCompleteRouteProps) => {
  const { roadDuration, trailDuration: roadTrailDuration } =
    useDriveRouteContext();
  const { flightDuration, trailDuration: flightTrailDuration } =
    useHelicopterRouteContext();
  const { offroadDurationAStandard, offroadDurationABidirectional } =
    useOffroadRouteContext();
  const offroadDuration = showABidirectional
    ? offroadDurationABidirectional
    : offroadDurationAStandard;

  const hasDriveRoute =
    roadDuration != null &&
    roadTrailDuration != null &&
    offroadDuration != null;
  const hasHelicopterRoute =
    flightDuration != null &&
    flightTrailDuration != null &&
    offroadDuration != null;
  const hasCompleteRoute = hasDriveRoute || hasHelicopterRoute;
  const showFlightRoute = !showDriveRoute;

  const completeDriveDuration = hasDriveRoute
    ? roadDuration + roadTrailDuration + offroadDuration
    : null;
  const completeFlightDuration = hasHelicopterRoute
    ? flightDuration + flightTrailDuration + offroadDuration
    : null;

  return (
    <section>
      <h2 className="text-lg my-3 font-semibold text-gray-900 dark:text-white">
        <span className="inline-block text-center w-7 h-7 rounded-full bg-blue-200 mr-1">
          🚑
        </span>
        <span>Percorso ottimale calcolato</span>
      </h2>

      {hasCompleteRoute ? (
        <>
          <div className="relative flex w-full mb-2 bg-white dark:bg-slate-900 rounded-full">
            <span className="absolute inset-0 m-1 pointer-events-none">
              <span
                className={`absolute inset-0 w-1/2 bg-indigo-500 rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out translate-x-0 ${
                  showDriveRoute ? "translate-x-full" : "translate-x-0"
                }`}
              />
            </span>
            <button
              className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
                showDriveRoute
                  ? "text-slate-500 dark:text-slate-400"
                  : "text-white"
              }`}
              disabled={!hasHelicopterRoute}
              onClick={() => setShowDriveRoute(false)}
            >
              {"Mezzi aerei "}
              <span
                className={
                  showDriveRoute
                    ? "text-slate-400 dark:text-slate-500"
                    : "text-indigo-200"
                }
              >
                {completeFlightDuration
                  ? formatTime(completeFlightDuration)
                  : "---"}
              </span>
            </button>
            <button
              className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
                showDriveRoute
                  ? "text-white"
                  : "text-slate-500 dark:text-slate-400"
              }`}
              disabled={!hasDriveRoute}
              onClick={() => setShowDriveRoute(true)}
            >
              {"Mezzi terrestri "}
              <span
                className={
                  showDriveRoute
                    ? "text-indigo-200"
                    : "text-slate-400 dark:text-slate-500"
                }
              >
                {completeDriveDuration
                  ? formatTime(completeDriveDuration)
                  : "---"}
              </span>
            </button>
          </div>

          {showFlightRoute && hasHelicopterRoute ? (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Tempo in volo
                  </th>
                  <td className="px-3 py-4 text-right">
                    {flightDuration ? formatTime(flightDuration) : "---"}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Tempo percorrenza sentiero
                  </th>
                  <td className="px-3 py-4 text-right">
                    {flightTrailDuration
                      ? formatTime(flightTrailDuration)
                      : "---"}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Tempo fuori-sentiero
                  </th>
                  <td className="px-3 py-4 text-right">
                    {offroadDuration ? formatTime(offroadDuration) : "---"}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="font-semibold text-gray-900 dark:text-white">
                  <th className="px-3 py-3 text-base">Tempo stimato</th>
                  <td className="px-3 py-3 text-right">
                    {completeFlightDuration
                      ? formatTime(completeFlightDuration)
                      : "---"}
                  </td>
                </tr>
              </tfoot>
            </table>
          ) : showDriveRoute && hasDriveRoute ? (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Tempo alla guida
                  </th>
                  <td className="px-3 py-4 text-right">
                    {roadDuration ? formatTime(roadDuration) : "---"}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Tempo percorrenza sentiero
                  </th>
                  <td className="px-3 py-4 text-right">
                    {roadTrailDuration ? formatTime(roadTrailDuration) : "---"}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Tempo fuori-sentiero
                  </th>
                  <td className="px-3 py-4 text-right">
                    {offroadDuration ? formatTime(offroadDuration) : "---"}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="font-semibold text-gray-900 dark:text-white">
                  <th className="px-3 py-3 text-base">Tempo stimato</th>
                  <td className="px-3 py-3 text-right">
                    {completeDriveDuration
                      ? formatTime(completeDriveDuration)
                      : "---"}
                  </td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <div
              className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
              role="alert"
            >
              <span className="font-medium">Spiacenti.</span> Percorso non
              trovato
            </div>
          )}
        </>
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

export default SummaryCompleteRoute;
