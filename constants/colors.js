const tintColor = '#2f95dc';

const primary = [
  '#FFC6C6',
  '#FFD8C6',
  '#FFEBC6',
  '#E5FFC6',
  '#C6FFCD',
  '#C6FFFD',
  '#C6EDFF',
  '#C6D5FF',
  '#D3C6FF',
  '#FFC6F2',
];

const primaryHighlighted = [
  '#F0A8A8',
  '#F0C1AB',
  '#EFD6A7',
  '#C1D8A6',
  '#AAD9B0',
  '#AEDBDA',
  '#ADCCDB',
  '#A6B3D8',
  '#AFA4D3',
  '#D5A3CA',
];

const secondary = [
  '#EBB8B8',
  '#EDCBBB',
  '#EDDBB9',
  '#D5EDB8',
  '#B8EBBE',
  '#B8EBEA',
  '#BBDEEF',
  '#B5C3EB',
  '#C0B4E6',
  '#EBB5DF',
];

const secondaryHighlighted = [
  '#FFB2B2',
  '#FFC7AD',
  '#FDDEA4',
  '#D5FDA6',
  '#A7FFB2',
  '#8FFDFA',
  '#A2E2FF',
  '#9CB4F8',
  '#B29BFF',
  '#FF9DE9',
];

const backgrounds = [...Array(10)].map((_, index) => ({
  primary: primary[index],
  primaryHighlighted: primaryHighlighted[index],
  secondary: secondary[index],
  secondaryHighlighted: secondaryHighlighted[index],
}));

// TODO: Sort default colors including selected and unselected greys.
export default {
  text: '#4A4A4A',
  tintColor,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
  primary,
  primaryHighlighted,
  secondary,
  secondaryHighlighted,
  backgrounds,
  selected: 'grey',
};
