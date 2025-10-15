
export const API_URL = "/data/products.json";

export async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Network error: ${res.status}`);
  const data = await res.json();

  data.forEach(p => {
    if (p.image && !p.image.startsWith("http") && !p.image.startsWith("./")) {
      p.image = `./${p.image}`;
    }
  });

  return data;
}
