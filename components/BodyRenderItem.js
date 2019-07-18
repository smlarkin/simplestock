import React from 'react'
import CategoryItem from './CategoryItem'
import CategoryItemForm from './CategoryItemForm'
import CategoryItemSwiper from './CategoryItemSwiper'
import {
  validateAndUpdateCategory,
  validateAndUpdateSubcategory,
} from '../validation'

const BodyRenderItem = props => ({ item, index, move, moveEnd, isActive }) => {
  const {
    categories,
    category,
    categoryIndex,
    // colors,
    deleteCategory,
    deleteSubcategory,
    edit,
    setCategoryIndex,
    setEdit,
    updateCategory,
    updateSubcategory,
    shopping,
  } = props

  function handleEdit() {
    setEdit(item)
  }

  function handleDelete() {
    if (category) {
      deleteSubcategory({
        categoryKey: category.key,
        subcategoryKey: item.key,
      })
    } else {
      deleteCategory(item.key)
    }
  }

  function handleSelect() {
    if (!category) {
      setCategoryIndex(index)
    } else {
      console.log(item)
    }
  }

  function handleUpdate(updatedItem) {
    if (category) {
      validateAndUpdateSubcategory({
        ...updatedItem,
        category,
        edit,
        deleteSubcategory,
        setEdit,
        updateSubcategory,
      })
    } else {
      validateAndUpdateCategory({
        ...updatedItem,
        categories,
        deleteCategory,
        edit,
        setEdit,
        updateCategory,
      })
    }
  }

  if (categoryIndex === null && !edit) {
    return (
      <CategoryItemSwiper
        index={index}
        item={item}
        move={move}
        moveEnd={moveEnd}
        isActive={isActive}
      />
    )
  } else if (categoryIndex === null && edit) {
    if (item.key === edit.item.key) {
      return (
        <CategoryItemForm
          index={index}
          item={item}
          move={move}
          moveEnd={moveEnd}
          isActive={isActive}
        />
      )
    } else {
      return <CategoryItem item={item} />
    }
  }
}

export default BodyRenderItem
