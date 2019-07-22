/* eslint-disable complexity */
import React from 'react'
// import Swipeout from 'rc-swipeout'
// import Swipeout from 'react-native-swipeout'
// import BlankScreen from './BlankScreen'
import CategoryItem from './CategoryItem'
import CategoryItemForm from './CategoryItemForm'
import CategoryItemSwiper from './CategoryItemSwiper'
import SubcategoryItem from './SubcategoryItem'
import SubcategoryItemForm from './SubcategoryItemForm'

const BodyRenderItem = ({ categoryIndex, edit, shopping }) => ({
  item,
  index,
  move,
  moveEnd,
  isActive,
}) => {
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
      return <CategoryItemForm item={item} />
    } else {
      return <CategoryItem item={item} />
    }
  } else if (categoryIndex !== null && edit) {
    if (edit && item.key === edit.item.key) {
      return <SubcategoryItemForm index={index} item={item} />
    } else {
      return <SubcategoryItem index={index} item={item} />
    }
  } else if (categoryIndex !== null) {
    return (
      <SubcategoryItem
        index={index}
        item={item}
        move={move}
        moveEnd={moveEnd}
        isActive={isActive}
      />
    )
  }
}

export default BodyRenderItem
