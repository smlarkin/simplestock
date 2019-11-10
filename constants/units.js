const units = [
  'UNIT-TYPE',
  'Bags',
  'Bottles',
  'Boxes',
  'Bunches',
  'Bushels',
  'Cartons',
  'Cases',
  'Cans',
  'Groups',
  'Items',
  'Jars',
  'Pieces',
  'Trays',
];

export default units.map(unit => ({ key: unit, label: unit, value: unit }));
