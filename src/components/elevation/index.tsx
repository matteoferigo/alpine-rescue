import type { ElevationProfileProps } from "@/components/elevation/types";
import { getDistance } from "ol/sphere";
import { useEffect, useRef } from "react";

const ElevationProfile = ({
  nodes,
  className,
  width,
  height,
}: ElevationProfileProps) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Definisco il canvas
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const padding = 5;

    // Pulisco il canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calcolo il rapporto per disegnare sul canvas
    const distances = [];
    let totalDistance = 0;
    for (let i = 1; i < nodes.length; i++) {
      const distance = getDistance(nodes[i - 1], nodes[i]);
      distances.push(distance);
      totalDistance += distance;
    }
    const ratio = (canvas.width - padding * 2) / totalDistance;

    // Calcolo l'altezza massima del canvas
    const elevations = nodes.map((node) => node[2]);
    const minElevation = Math.min(...elevations);
    const maxElevation = Math.max(...elevations);
    const elevationGain = maxElevation - minElevation;
    canvas.height = Math.ceil(elevationGain * ratio) + padding * 2;

    // Disegno le curve di livello
    const elevationStep = 10;
    for (
      let h = Math.round(minElevation - (minElevation % elevationStep));
      h <= maxElevation;
      h += elevationStep
    ) {
      // Disegno la linea di livello
      const altitude = (maxElevation - h) * ratio;
      ctx.beginPath();
      ctx.moveTo(0, altitude);
      ctx.lineTo(canvas.width, altitude);

      ctx.strokeStyle = "lightgrey";
      if (h % 50 === 0) {
        ctx.lineWidth = 2;
      } else {
        ctx.lineWidth = 1;
      }
      ctx.stroke();

      // Riporto l'altitudine
      if (h % 50 === 0) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, altitude - 4, 20, 8);
        ctx.fillRect(canvas.width - 20, altitude - 4, 20, 8);
        ctx.font = "8px sans-serif";
        ctx.fillStyle = "grey";
        ctx.fillText(`${h}`, 0, altitude + 3);
        ctx.fillText(`${h}`, canvas.width - 18, altitude + 3);
      }
    }

    // Disegno il profilo altimetrico
    ctx.beginPath();
    let x = padding;
    let y = padding + (maxElevation - elevations[0]) * ratio;
    ctx.moveTo(x, y);

    for (let i = 1; i < nodes.length; i++) {
      x += distances[i - 1] * ratio;
      y = padding + (maxElevation - elevations[i]) * ratio;
      ctx.lineTo(x, y);
    }

    // Applico lo stile della linea
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.setLineDash([6, 5]);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgb(0, 149, 255)";
    ctx.stroke();

    // Rappresento il nodo di partenza
    x = padding + 2;
    y = padding + (maxElevation - elevations[0]) * ratio;

    ctx.beginPath();
    ctx.setLineDash([1]);
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgb(0, 149, 255)";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.strokeStyle = "white";
    ctx.stroke();

    // Rappresento i nodi intermedi
    for (let i = 1; i < nodes.length - 1; i++) {
      x += distances[i - 1] * ratio;
      y = padding + (maxElevation - elevations[i]) * ratio;

      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgb(0, 149, 255)";
      ctx.stroke();
    }

    // Rappresento il nodo di arrivo
    x += distances.at(-1)! * ratio - 2;
    y = padding + (maxElevation - elevations.at(-1)!) * ratio;

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.strokeStyle = "white";
    ctx.stroke();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas ref={ref} className={className} width={width} height={height} />
  );
};

export default ElevationProfile;
