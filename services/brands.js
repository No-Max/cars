export function getBrands() {
  // Получить бренды
  return fetch(`https://cars-server.herokuapp.com/brands`).then((response) => {
    return response.json();
  });
}
