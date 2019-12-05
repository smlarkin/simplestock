/* eslint-disable complexity */
import React from 'react';
import CategoryItem from './CategoryItem';
import CategoryItemForm from './CategoryItemForm';
import ShopItem from './ShopItem';
import ShopItemForm from './ShopItemForm';
import SubcategoryItem from './SubcategoryItem';
import SubcategoryItemForm from './SubcategoryItemForm';

const BodyRenderItem = ({ categoryIndex, edit, shopping }) => ({
  item,
  index,
  move,
  moveEnd,
  isActive,
}) => {
  const itemIsEditItem = edit && edit.item.key === item.key;

  if (categoryIndex !== null) {
    if (shopping && item.shop) {
      if (itemIsEditItem) {
        return <ShopItemForm {...{ index, item }} />;
      } else {
        return <ShopItem {...{ index, item }} />;
      }
    } else if (itemIsEditItem) {
      return <SubcategoryItemForm {...{ index, item }} />;
    } else {
      return <SubcategoryItem {...{ index, item, move, moveEnd, isActive }} />;
    }
  } else if (itemIsEditItem) {
    return <CategoryItemForm {...{ item }} />;
  } else {
    return <CategoryItem {...{ index, item, move, moveEnd, isActive }} />;
  }
};

export default BodyRenderItem;
