import type {
  OverpassResponse,
  OverpassResponseElement,
} from "@/services/overpass/types";

// https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL
// https://wiki.openstreetmap.org/wiki/Overpass_API#The_Programmatic_Query_Language_(OverpassQL)
// https://overpass-turbo.eu

export async function overpassRequest<T extends OverpassResponseElement>(
  query: string
) {
  const payload = `[out:json];${query}`;
  console.debug("Overpass API Request", payload);

  const result = await fetch(
    `/api/overpass?data=${encodeURIComponent(payload)}`
  );

  const response: OverpassResponse<T> = await result.json();
  return response.elements;
}
