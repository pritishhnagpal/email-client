export function getStoredData(key) {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
