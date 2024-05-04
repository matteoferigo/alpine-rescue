import ElevationProfile from "@/components/elevation";
import RouteArchsTable from "@/components/summary/route";
import { useOffroadRouteContext } from "@/contexts/route/offroad/hooks";
import { formatTime } from "@/services/path/time/format";
import { useState } from "react";

const SummaryOffroadRoute = () => {
  const {
    offroadNodes,
    offroadArchs,
    offroadDistance,
    offroadDuration,
    offroadElevationGain,

    offroadAlternativeNodes,
    offroadAlternativeArchs,
    offroadAlternativeDistance,
    offroadAlternativeDuration,
  } = useOffroadRouteContext();
  const hasOffroadRoute = offroadNodes != null;
  const [showAlternative, setShowAlternative] = useState(false);

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
            nodes={showAlternative ? offroadAlternativeNodes! : offroadNodes}
            className="w-full my-5"
            width={900}
          />
          <div className="relative flex w-full mb-2 bg-white dark:bg-slate-900 rounded-full">
            <span className="absolute inset-0 m-1 pointer-events-none">
              <span
                className={`absolute inset-0 w-1/2 bg-indigo-500 rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out translate-x-0 ${
                  showAlternative ? "translate-x-full" : "translate-x-0"
                }`}
              />
            </span>
            <button
              className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
                showAlternative
                  ? "text-slate-500 dark:text-slate-400"
                  : "text-white"
              }`}
              onClick={() => setShowAlternative(false)}
            >
              {"A* Bidirezionle "}
              <span
                className={
                  showAlternative
                    ? "text-slate-400 dark:text-slate-500"
                    : "text-indigo-200"
                }
              >
                {formatTime(offroadDuration!)}
              </span>
            </button>
            <button
              className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
                showAlternative
                  ? "text-white"
                  : "text-slate-500 dark:text-slate-400"
              }`}
              onClick={() => setShowAlternative(true)}
            >
              {"A* Bottom "}
              <span
                className={
                  showAlternative
                    ? "text-indigo-200"
                    : "text-slate-400 dark:text-slate-500"
                }
              >
                {formatTime(offroadAlternativeDuration!)}
              </span>
            </button>
          </div>
          <RouteArchsTable
            archs={showAlternative ? offroadAlternativeArchs! : offroadArchs!}
            distance={
              showAlternative ? offroadAlternativeDistance! : offroadDistance!
            }
            duration={
              showAlternative ? offroadAlternativeDuration! : offroadDuration!
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
