export const fetchData = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    if (json.message) {
      throw new Error(json.message);
    }
    throw new Error(`Error ${response.status} occurred`);
  }
  return json;
};
