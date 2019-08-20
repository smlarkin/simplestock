/* eslint-disable complexity */
import React from 'react'
import CategoryItem from './CategoryItem'
import CategoryItemForm from './CategoryItemForm'
import ShopItem from './ShopItem'
import ShopItemForm from './ShopItemForm'
import SubcategoryItem from './SubcategoryItem'
import SubcategoryItemForm from './SubcategoryItemForm'

const BodyRenderItem = ({ categoryIndex, edit, shopping }) => ({
  item,
  index,
  move,
  moveEnd,
  isActive,
}) => {
  const itemIsEditItem = edit && edit.item.key === item.key

  if (categoryIndex !== null) {
    if (shopping && item.shop) {
      if (itemIsEditItem) {
        return <ShopItemForm index={index} item={item} />
      } else {
        return <ShopItem index={index} item={item} />
      }
    } else if (itemIsEditItem) {
      return <SubcategoryItemForm index={index} item={item} />
    } else {
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
  } else if (itemIsEditItem) {
    return <CategoryItemForm item={item} />
  } else {
    return (
      <CategoryItem
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
