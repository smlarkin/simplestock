import React from 'react'
import CategoryItem from './CategoryItem'
import CategoryItemForm from './CategoryItemForm'
import ShopItem from './ShopItem'
import ShopItemForm from './ShopItemForm'
import SubcategoryItem from './SubcategoryItem'
import SubcategoryItemForm from './SubcategoryItemForm'
import SubcategoryItemFormSpecial from './SubcategoryItemFormSpecial'

// eslint-disable-next-line complexity
const BodyRenderItemContent = ({
  category,
  color,
  edit,
  setEdit,
  item,
  handleUpdate,
  shopping,
}) => {
  if (edit && edit.item.key === item.key) {
    if (category && shopping) {
      return (
        <ShopItemForm
          color={color}
          edit={edit}
          handleUpdate={handleUpdate}
          item={item}
        />
      )
    } else if (category) {
      if (edit.type === 'current' || edit.type === 'base') {
        return (
          <SubcategoryItemFormSpecial
            edit={edit}
            handleUpdate={handleUpdate}
            item={item}
            setEdit={setEdit} // work on this
          />
        )
      } else {
        return (
          <SubcategoryItemForm
            edit={edit}
            handleUpdate={handleUpdate}
            item={item}
          />
        )
      }
    } else {
      return <CategoryItemForm handleUpdate={handleUpdate} item={item} />
    }
  } else if (category && shopping) {
    return (
      <ShopItem
        color={color}
        setEdit={setEdit}
        handleUpdate={handleUpdate}
        item={item}
      />
    )
  } else if (category) {
    return <SubcategoryItem setEdit={setEdit} item={item} />
  } else {
    return <CategoryItem item={item} />
  }
}

export default BodyRenderItemContent
