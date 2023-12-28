interface Film {
  id: number;
  title: string;
  pathimage: string;
  overview: string;
}
export function getImageUrl(films: Film): string {
  return "https://image.tmdb.org/t/p/w500/" + films.pathimage;
}
