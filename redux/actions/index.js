import {
  CREATE_CATEGORY,
  CREATE_SUBCATEGORY,
  DELETE_CATEGORY,
  DELETE_SUBCATEGORY,
  RESET_CATEGORIES,
  SET_CATEGORIES,
  SET_CATEGORY_INDEX,
  SET_EDIT,
  SET_SHARING,
  SET_SUBCATEGORIES,
  SET_SHOPPING,
  UPDATE_CATEGORY,
  UPDATE_SHOPPING,
  UPDATE_SUBCATEGORY,
} from '../types';

export const createCategory = category => ({
  type: CREATE_CATEGORY,
  payload: category,
});

export const createSubcategory = ({ categoryKey, subcategory }) => ({
  type: CREATE_SUBCATEGORY,
  payload: { categoryKey, subcategory },
});

export const deleteCategory = categoryKey => ({
  type: DELETE_CATEGORY,
  payload: categoryKey,
});

export const deleteSubcategory = ({ categoryKey, subcategoryKey }) => ({
  type: DELETE_SUBCATEGORY,
  payload: { categoryKey, subcategoryKey },
});

export const resetCategories = () => ({
  type: RESET_CATEGORIES,
  payload: {},
});

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setCategoryIndex = categoryIndex => ({
  type: SET_CATEGORY_INDEX,
  payload: categoryIndex,
});

export const setEdit = (item, type = null) => ({
  type: SET_EDIT,
  payload: item ? { item, type } : null,
});

export const setSharing = sharingObject => ({
  type: SET_SHARING,
  payload: sharingObject,
});

export const setShopping = boolean => ({
  type: SET_SHOPPING,
  payload: boolean,
});

export const setSubcategories = ({ categoryKey, subcategories }) => ({
  type: SET_SUBCATEGORIES,
  payload: { categoryKey, subcategories },
});

export const updateCategory = ({ categoryKey, category }) => ({
  type: UPDATE_CATEGORY,
  payload: { categoryKey, category },
});

export const updateShopping = ({
  categoryKey,
  subcategoryKey,
  subcategory,
}) => ({
  type: UPDATE_SHOPPING,
  payload: { categoryKey, subcategoryKey, subcategory },
});

export const updateSubcategory = ({
  categoryKey,
  subcategoryKey,
  subcategory,
}) => ({
  type: UPDATE_SUBCATEGORY,
  payload: { categoryKey, subcategoryKey, subcategory },
});
