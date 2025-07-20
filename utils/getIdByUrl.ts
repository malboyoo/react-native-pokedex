export function getIdByUrl(url: string): number {
  const id = url.split("/").at(-2);
  return parseInt(id ?? "0");
}
