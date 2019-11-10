export function createDifference(numberStringA, numberStringB) {
  const current = parseInt(numberStringA);
  const base = parseInt(numberStringB);
  const difference = base - current;
  return `${difference}`;
}

export function createShop(numberString) {
  return parseInt(numberString) > 0;
}

export function focusInput(name, inputs) {
  inputs[name].focus();
}

export function formatCategories(categories) {
  return categories.map(category => `${formatCategory(category)}\n`).join('');
}

export function formatCategory({ title, subcategories }) {
  const formattedSubcategories = subcategories
    .map(subcategory => `  ${formatSubcategory(subcategory)}\n\n`)
    .join('');
  return `${title.toUpperCase()}\n\n${formattedSubcategories}`;
}

export function formatIntegersForNumericKeypad(amount, callback) {
  const amountMatched = amount.match(/\d+/g);
  const finalAmount = amountMatched ? amountMatched[0] : amount;
  callback(finalAmount);
}

export function formatSubcategory({ title, current, base, type }) {
  return `${title}    ${current} / ${base}  ${type}`;
}

export function itemTitleIsDuplicate(title, array) {
  return array.some(item => item.title === title);
}

export function mapCategoriesToColors(categories, colors) {
  return categories.map((_, index) => {
    const stringifiedIndex = index.toString();
    const finalDigit = stringifiedIndex[stringifiedIndex.length - 1];
    return colors[finalDigit];
  });
}

export function mapIndexToColors(index, colorsArray) {
  const stringifiedIndex = index.toString();
  const finalDigit = stringifiedIndex[stringifiedIndex.length - 1];
  return colorsArray[finalDigit];
}

export function setRef(ref, name, inputs) {
  inputs[name] = ref;
}

export function updateCurrentAmount(numberStringA, numberStringB) {
  const current = parseInt(numberStringA);
  const difference = parseInt(numberStringB);
  const total = current + difference;
  return `${total}`;
}

export function updateDifferenceAndShopping(categories, setCategories) {
  const updatedCategories = categories.map(category => {
    const subcategories = category.subcategories.map(subcategory => {
      const difference = createDifference(
        subcategory.current,
        subcategory.base,
      );
      const shop = createShop(difference);
      return { ...subcategory, difference, shop };
    });
    return { ...category, subcategories };
  });
  setCategories(updatedCategories);
}
