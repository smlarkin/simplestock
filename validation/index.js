/* eslint-disable complexity */
import { createShop, createDifference, itemTitleIsDuplicate } from '../util'

export function amountIsValid(amount) {
  const amountNumber = Number(amount)
  if (isNaN(amountNumber) || amountNumber < 0) {
    alert('A number between 0 and 999')
  } else {
    return true
  }
}

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
  if (!title && !current && !base && !type) {
    deleteSubcategory({
      categoryKey: category.key,
      subcategoryKey: edit.item.key,
    })
    return setEdit(null)
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
      return setEdit(null)
    } else if (
      edit.item.title !== title &&
      itemTitleIsDuplicate(title, category.subcategories)
    ) {
      alert('Title already exists!')
    } else {
      const subcategory = {
        key,
        title,
        current,
        base,
        type,
        difference: currentDifference,
        shop: currentShop,
      }
      updateSubcategory({
        categoryKey: category.key,
        subcategoryKey: edit.item.key,
        subcategory,
      })
      return setEdit(null)
    }
  } else {
    alert('All fields must be completed')
  }
}
