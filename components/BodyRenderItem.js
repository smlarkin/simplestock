import React from 'react'
import BodyRenderItemContent from './BodyRenderItemContent'
import Swiper from './Swiper'
import { colors } from '../constants'
import { mapIndexToColors } from '../util'
import {
  validateAndUpdateCategory,
  validateAndUpdateSubcategory,
} from '../validation'

const { primary } = colors

const BodyRenderItem = props => ({ item, index, move, moveEnd, isActive }) => {
  const {
    categories,
    category,
    categoryIndex,
    colors,
    deleteCategory,
    deleteSubcategory,
    edit,
    setCategoryIndex,
    setEdit,
    updateCategory,
    updateSubcategory,
    shopping,
  } = props

  const color = !category
    ? mapIndexToColors(index, primary)
    : index % 2 === 0
    ? colors[categoryIndex].primary
    : colors[categoryIndex].secondary

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

  const content = (
    <BodyRenderItemContent
      category={category}
      color={color}
      edit={edit}
      item={item}
      handleUpdate={handleUpdate}
      setEdit={setEdit}
      shopping={shopping}
    />
  )

  if (category && shopping) {
    return content
  } else {
    return (
      <Swiper
        category={category}
        color={color}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleSelect={handleSelect}
        isActive={isActive}
        move={move}
        moveEnd={moveEnd}>
        {content}
      </Swiper>
    )
  }
}

export default BodyRenderItem
