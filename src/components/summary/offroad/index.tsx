import ElevationProfile from "@/components/elevation";
import { useOffroadRouteContext } from "@/contexts/route/offroad/hooks";

const SummaryOffroadRoute = () => {
  const { offroadNodes } = useOffroadRouteContext();
  const hasOffroadRoute = offroadNodes != null;

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
            nodes={offroadNodes}
            className="w-full my-5"
            width={444}
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
