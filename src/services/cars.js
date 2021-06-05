import axios from "axios";

export function getCars({ BrandId, ModelId }) {
  // Получить все авто
  return axios(`https://cars-server.herokuapp.com/cars`, {
    params: {
      BrandId,
      ModelId,
    },
  }).then((response) => {
    return response.data;
  });
}

export function getCar(id) {
  // Получить авто по id
  return axios(`https://cars-server.herokuapp.com/cars/${id}`).then(
    (response) => {
      return response.data;
    }
  );
}

export function createCar(car) {
  // создать авто
  return axios.post("https://cars-server.herokuapp.com/cars", car);
}

export function deleteCar(id) {
  return axios.delete(`https://cars-server.herokuapp.com/cars/${id}`);
}
