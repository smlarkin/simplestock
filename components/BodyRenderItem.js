/* eslint-disable complexity */
import React from 'react';
import CategoryItem from './CategoryItem';
import CategoryItemForm from './CategoryItemForm';
import ShopItem from './ShopItem';
import ShopItemForm from './ShopItemForm';
import SubcategoryItem from './SubcategoryItem';
import SubcategoryItemForm from './SubcategoryItemForm';

const BodyRenderItem = ({ categoryIndex, editing, shopping }) => ({
  item,
  index,
  move,
  moveEnd,
  isActive,
}) => {
  const itemIsEditingItem = editing && editing.item.key === item.key;

  if (categoryIndex !== null) {
    if (shopping && item.shop) {
      if (itemIsEditingItem) {
        return <ShopItemForm {...{ index, item }} />;
      } else {
        return <ShopItem {...{ index, item }} />;
      }
    } else if (itemIsEditingItem) {
      return <SubcategoryItemForm {...{ index, item }} />;
    } else {
      return <SubcategoryItem {...{ index, item, move, moveEnd, isActive }} />;
    }
  } else if (itemIsEditingItem) {
    return <CategoryItemForm {...{ item }} />;
  } else {
    return <CategoryItem {...{ index, item, move, moveEnd, isActive }} />;
  }
};

export default BodyRenderItem;
