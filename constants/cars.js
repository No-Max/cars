export const cars = [
  {
    brand: 'Audi',
    model: 'A1',
    img: 'audi-a1.jpeg',
    price: 30000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    brand: 'Audi',
    model: 'A8',
    img: 'audi-a8.jpeg',
    price: 40000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    brand: 'Audi',
    model: 'Q7',
    img: 'audi-q7.jpeg',
    price: 60000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    brand: 'BMW',
    model: 'e60',
    img: 'bmw-e60.jpg',
    price: 50000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    brand: 'BMW',
    model: 'x5',
    img: 'bmw-x5.jpg',
    price: 40000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    brand: 'Skoda',
    model: 'Fabia',
    img: 'skoda-fabia.jpeg',
    price: 40000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    brand: 'Skoda',
    model: 'Fabia',
    img: 'skoda-fabia.jpeg',
    price: 40000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
  {
    brand: 'Skoda',
    model: 'Octavia',
    img: 'skoda-octavia.jpeg',
    price: 30000,
    description: 'Достойный авто по доступной цене. Приятный разгон и хорошая шумоизоляция.',
  },
];

export const brands = Array.from(new Set(cars.map(car => car.brand)));