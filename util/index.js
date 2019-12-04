export function capitalizeWord(word) {
  return word.length > 1
    ? word[0].toUpperCase() + word.slice(1).toLowerCase()
    : word.toUpperCase();
}

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

export function formatCategoriesToShare(categories, shopping = false) {
  return categories
    .map(category => {
      return formatCategoryToShare(category, shopping);
    })
    .filter(category => category)
    .map(category => `${category}\n`)
    .join('');
}

export function formatCategoryToShare({ title, subcategories }, shopping) {
  const subcategoriesToShare = shopping
    ? subcategories.filter(subcategory => subcategory.shop)
    : subcategories;
  const formattedSubcategories = subcategoriesToShare.length
    ? subcategoriesToShare
        .map(
          subcategory =>
            `\t${formatSubcategoryToShare(subcategory, shopping)}\n`,
        )
        .join('')
    : null;
  return formattedSubcategories
    ? `${title.toUpperCase()}\n\n${formattedSubcategories}`
    : null;
}

export function formatSubcategoryToShare(
  { title, current, base, type, difference },
  shopping,
) {
  const content = shopping
    ? `${difference} (${type.toLowerCase()} of) `
    : `${current}/${base} (${type.toLowerCase()} of) `;

  return content + formatTitleText(title, 'CAPITALCASE');
}

export function formatTitleText(title, option = null) {
  return title
    .split(' ')
    .filter(word => word.length)
    .map(word => {
      const currentWord = word.trim();
      switch (option) {
        case 'CAPITALCASE':
          return capitalizeWord(currentWord);
        case 'UPPERCASE':
          return currentWord.toUpperCase();
        case 'LOWERCASE':
          return currentWord.toLowerCase();
        default:
          return currentWord;
      }
    })
    .join(' ');
}

export function formatIntegersForNumericKeypad(amount, callback) {
  const amountMatched = amount.match(/\d+/g);
  const finalAmount = amountMatched ? amountMatched[0] : amount;
  callback(finalAmount);
}

export function getCategory(categoryIndex, categories) {
  return categoryIndex !== null ? categories[categoryIndex] : null;
}

export function itemTitleIsDuplicate(title, array) {
  return array.some(item => item.title.toLowerCase() === title.toLowerCase());
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
