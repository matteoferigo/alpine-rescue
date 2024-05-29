import type { RouteArchsTableProps } from "@/components/summary/route/types";
import { formatTime } from "@/services/path/time/format";

const RouteArchsTable = ({
  archs,
  distance,
  duration,
  elevationGain,
}: RouteArchsTableProps) => {
  const { fromNode } = archs.at(0)!;
  const { toNode } = archs.at(-1)!;
  const descending = fromNode[2] > toNode[2];

  return (
    <div className="w-screen overflow-x-auto -mx-7 px-7 md:w-full md:mx-0 md:px-0">
      <table className="w-full text-sm text-left overflow-x-auto rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-3 py-3">
              Dislivello
            </th>
            <th scope="col" className="px-3 py-3">
              Pendenza
            </th>
            <th scope="col" className="px-3 py-3">
              Distanza
            </th>
            <th scope="col" className="px-3 py-3">
              Velocità
            </th>
            <th scope="col" className="px-3 py-3 text-right">
              Durata
            </th>
          </tr>
        </thead>
        <tbody>
          {archs.map((arch) => (
            <tr
              key={`${arch.fromNode}-${arch.toNode}`}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th className="px-3 py-4 space-x-1 font-semibold">
                <dt title={`${arch.toNode[1]},${arch.toNode[0]}`}>
                  {`${arch.toNode[2].toFixed(0)} mslm`}
                </dt>
                <dd className="hidden">{`${arch.fromNode[1]},${arch.fromNode[0]}`}</dd>
              </th>
              <td className="px-3 py-4 space-x-1">
                {!arch.elevation ? (
                  <span className="text-slate-600">=</span>
                ) : arch.descending ? (
                  <span className="text-red-600">▼</span>
                ) : (
                  <span className="text-emerald-600">▲</span>
                )}
                <span>{`${arch.elevation} m`}</span>
                <span className="text-xs">{`(${arch.slope}%)`}</span>
              </td>
              <td className="px-3 py-4 space-x-1">{`${arch.distance.toFixed(
                1
              )} m`}</td>
              <td className="px-3 py-4 space-x-1">
                <span className="text-xs">
                  <dt className="inline" title={arch.terrain.join("/")}>
                    {arch.slope > 50
                      ? "🧗"
                      : arch.terrain.includes("wood")
                      ? "🌳"
                      : arch.terrain.includes("rock")
                      ? "🪨"
                      : arch.terrain.includes("scree")
                      ? "🌿"
                      : "🥾"}
                  </dt>
                  <dd className="hidden">{arch.terrain.join("/")}</dd>
                </span>
                <span>{` ${arch.speed.toFixed(1)} m/s`}</span>
              </td>
              <td className="px-3 py-4 space-x-1 text-right">
                <dt title={`${arch.duration}`}>{formatTime(arch.duration)}</dt>
                <dd className="hidden">{`${arch.duration}s`}</dd>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-semibold text-gray-900 dark:text-white">
            <th className="px-3 py-4 space-x-1 font-semibold">
              <dt title={`${toNode[1]},${toNode[0]}`}>
                {`${toNode[2].toFixed(0)} mslm`}
              </dt>
              <dd className="hidden">{`${toNode[1]},${toNode[0]}`}</dd>
            </th>
            <td className="px-3 py-4 space-x-1">
              {!elevationGain ? (
                <span className="text-slate-600">=</span>
              ) : descending ? (
                <span className="text-red-600">▼</span>
              ) : (
                <span className="text-emerald-600">▲</span>
              )}
              <span>{`(${elevationGain} m)`}</span>
            </td>
            <td className="px-3 py-4 space-x-1">{`${distance.toFixed(
              1
            )} m`}</td>
            <td className="px-3 py-4 space-x-1" />
            <td className="px-3 py-4 space-x-1 text-right">
              <dt title={`${duration}`}>{formatTime(duration)}</dt>
              <dd className="hidden">{`${duration}s`}</dd>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default RouteArchsTable;
