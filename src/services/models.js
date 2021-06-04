export function getModels(brand) {
  // получить модели по бренду
  return fetch(`https://cars-server.herokuapp.com/models/${brand}`).then(
    (response) => {
      return response.json();
    }
  );
}
