import { createShop, createDifference, itemTitleIsDuplicate } from '../util'

/* eslint-disable complexity */
export function validateAndUpdateSubcategory({
  category,
  base,
  edit,
  current,
  difference,
  deleteSubcategory,
  key,
  setEdit,
  shop,
  title,
  type,
  updateSubcategory,
}) {
  console.log(key, title, current, base, type, difference, shop)
  if (!title && !current && !base && !type) {
    deleteSubcategory({
      categoryKey: category.key,
      subcategoryKey: edit.item.key,
    })
    setEdit(null)
  } else if (title && current && base && type) {
    const currentDifference = !difference
      ? createDifference(current, base)
      : difference
    const currentShop = !shop ? createShop(currentDifference) : shop
    if (
      edit.item.title === title &&
      edit.item.current === current &&
      edit.item.base === base &&
      edit.item.type === type &&
      edit.item.difference === currentDifference &&
      edit.item.shop === currentShop
    ) {
      setEdit(null)
    } else if (
      edit.item.title !== title &&
      itemTitleIsDuplicate(title, category.subcategories)
    ) {
      alert('Title already exists!')
    } else {
      const subcategory = {
        key: edit.item.key,
        title,
        current,
        base,
        type,
        difference: currentDifference,
        shop: currentShop,
      }
      console.log('updated subcategory ', subcategory)
      updateSubcategory({
        categoryKey: category.key,
        subcategoryKey: edit.item.key,
        subcategory,
      })
      setEdit(null)
      return true
    }
  } else {
    alert('All fields must be completed')
  }
}

export function validateAndUpdateCategory({
  categories,
  color,
  deleteCategory,
  edit,
  key,
  setEdit,
  subcategories,
  title,
  updateCategory,
}) {
  if (title) {
    if (
      edit.item.title === title &&
      edit.item.color.primary === color.primary
    ) {
      setEdit(null)
    } else if (itemTitleIsDuplicate(title, categories)) {
      alert('This category already exists!')
    } else {
      updateCategory({
        categoryKey: edit.item.key,
        category: { color, key, title, subcategories },
      })
      setEdit(null)
    }
  } else {
    setEdit(null)
    deleteCategory(key)
  }
}

export function amountIsValid(amount) {
  const amountNumber = Number(amount)
  if (isNaN(amountNumber) || amountNumber < 0) {
    alert('A number between 0 and 999')
  } else {
    return true
  }
}
