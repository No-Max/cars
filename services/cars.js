export function getCars() {
  // Получить все авто
  return fetch("https://cars-server.herokuapp.com/cars").then((response) => {
    return response.json();
  });
}

export function getCar(id) {
  // Получить авто по id
  return fetch(`https://cars-server.herokuapp.com/cars/${id}`).then(
    (response) => {
      return response.json();
    }
  );
}
