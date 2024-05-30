import ElevationProfile from "@/components/elevation";
import type { SummaryOffroadRouteProps } from "@/components/summary/offroad/types";
import RouteArchsTable from "@/components/summary/route";
import { useOffroadRouteContext } from "@/contexts/route/offroad/hooks";
import { formatTime } from "@/services/path/time/format";

const SummaryOffroadRoute = ({
  showABidirectional,
  setShowABidirectional,
}: SummaryOffroadRouteProps) => {
  const {
    offroadElevationGain,

    offroadNodesAStandard,
    offroadArchsAStandard,
    offroadDistanceAStandard,
    offroadDurationAStandard,

    offroadNodesABidirectional,
    offroadArchsABidirectional,
    offroadDistanceABidirectional,
    offroadDurationABidirectional,
  } = useOffroadRouteContext();
  const hasOffroadRoute = offroadNodesAStandard != null;

  return (
    <section>
      <h2 className="text-lg my-3 font-semibold text-gray-900 dark:text-white">
        <span className="inline-block text-center w-7 h-7 rounded-full bg-sky-200 mr-1">
          🥾
        </span>
        <span>Percorso fuori-sentiero</span>
      </h2>

      {hasOffroadRoute ? (
        <>
          <ElevationProfile
            nodes={
              showABidirectional
                ? offroadNodesABidirectional!
                : offroadNodesAStandard
            }
            className="w-full my-5"
            width={900}
          />
          <div className="relative flex w-full mb-2 bg-white dark:bg-slate-900 rounded-full">
            <span className="absolute inset-0 m-1 pointer-events-none">
              <span
                className={`absolute inset-0 w-1/2 bg-indigo-500 rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out translate-x-0 ${
                  showABidirectional ? "translate-x-full" : "translate-x-0"
                }`}
              />
            </span>
            <button
              className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
                showABidirectional
                  ? "text-slate-500 dark:text-slate-400"
                  : "text-white"
              }`}
              onClick={() => setShowABidirectional(false)}
            >
              {"A* Standard "}
              <span
                className={
                  showABidirectional
                    ? "text-slate-400 dark:text-slate-500"
                    : "text-indigo-200"
                }
              >
                {formatTime(offroadDurationAStandard!)}
              </span>
            </button>
            <button
              className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
                showABidirectional
                  ? "text-white"
                  : "text-slate-500 dark:text-slate-400"
              }`}
              onClick={() => setShowABidirectional(true)}
            >
              {"A* Bidirezionale "}
              <span
                className={
                  showABidirectional
                    ? "text-indigo-200"
                    : "text-slate-400 dark:text-slate-500"
                }
              >
                {formatTime(offroadDurationABidirectional!)}
              </span>
            </button>
          </div>
          <RouteArchsTable
            archs={
              showABidirectional
                ? offroadArchsABidirectional!
                : offroadArchsAStandard!
            }
            distance={
              showABidirectional
                ? offroadDistanceABidirectional!
                : offroadDistanceAStandard!
            }
            duration={
              showABidirectional
                ? offroadDurationABidirectional!
                : offroadDurationAStandard!
            }
            elevationGain={offroadElevationGain!}
          />
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

export default SummaryOffroadRoute;
