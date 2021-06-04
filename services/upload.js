export function upload(value) {
  const request = new XMLHttpRequest();
  request.open('POST', 'https://cars-server.herokuapp.com/cars/', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(value);
}