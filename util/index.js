export function createDifference(numberStringA, numberStringB) {
  const current = Number(numberStringA)
  const base = Number(numberStringB)
  const difference = base - current
  return `${difference}`
}

export function createShop(numberString) {
  return Number(numberString) > 0
}

export function updateDifferenceAndShopping(categories, setCategories) {
  const updatedCategories = categories.map(category => {
    const subcategories = category.subcategories.map(subcategory => {
      const difference = createDifference(subcategory.current, subcategory.base)
      const shop = createShop(difference)
      return { ...subcategory, difference, shop }
    })
    return { ...category, subcategories }
  })
  setCategories(updatedCategories)
}

export function updateCurrentAmount(numberStringA, numberStringB) {
  const current = Number(numberStringA)
  const difference = Number(numberStringB)
  const total = current + difference
  return `${total}`
}

export function itemTitleIsDuplicate(title, array) {
  return array.find(item => item.title === title)
}

export function mapIndexToColors(index, colorsArray) {
  const stringifiedIndex = String(index)
  const finalDigit = stringifiedIndex[stringifiedIndex.length - 1]
  return colorsArray[finalDigit]
}

export function mapCategoriesToColors(categories, colors) {
  return categories.map((_, index) => {
    const stringifiedIndex = String(index)
    const finalDigit = stringifiedIndex[stringifiedIndex.length - 1]
    return colors[finalDigit]
  })
}
