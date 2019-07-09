/* eslint-disable no-confusing-arrow */
import {
  CREATE_CATEGORY,
  CREATE_SUBCATEGORY,
  DELETE_CATEGORY,
  DELETE_SUBCATEGORY,
  RESET_CATEGORIES,
  SET_CATEGORIES,
  SET_CATEGORY_INDEX,
  SET_EDIT,
  SET_SUBCATEGORIES,
  SET_SHOPPING,
  UPDATE_CATEGORY,
  UPDATE_SUBCATEGORY,
} from '../types'

// eslint-disable-next-line complexity
export const categoriesReducer = (state = [], action) => {
  const { type, payload } = action
  switch (type) {
    case CREATE_CATEGORY:
      return [payload, ...state]
    case CREATE_SUBCATEGORY:
      return state.map(category =>
        category.key === payload.categoryKey
          ? {
              ...category,
              subcategories: [payload.subcategory, ...category.subcategories],
            }
          : category)
    case RESET_CATEGORIES:
      return []
    case UPDATE_CATEGORY:
      return state.map(category =>
        category.key === payload.categoryKey ? payload.category : category)
    case UPDATE_SUBCATEGORY:
      return state.map(category =>
        category.key === payload.categoryKey
          ? {
              ...category,
              subcategories: category.subcategories.map(subcategory =>
                subcategory.key === payload.subcategoryKey
                  ? payload.subcategory
                  : subcategory),
            }
          : category)
    case DELETE_CATEGORY:
      return state.filter(category => category.key !== payload)
    case DELETE_SUBCATEGORY:
      return state.map(category =>
        category.key === payload.categoryKey
          ? {
              ...category,
              subcategories: category.subcategories.filter(
                subcategory => subcategory.key !== payload.subcategoryKey
              ),
            }
          : category)
    case SET_CATEGORIES:
      return payload
    case SET_SUBCATEGORIES:
      return state.map(category =>
        category.key === payload.categoryKey
          ? {
              ...category,
              subcategories: payload.subcategories,
            }
          : category)
    default:
      return state
  }
}

export const categoryIndexReducer = (state = null, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_CATEGORY_INDEX:
      return payload
    default:
      return state
  }
}

export const editReducer = (state = null, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_EDIT:
      return payload
    default:
      return state
  }
}

export const shoppingReducer = (state = false, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_SHOPPING:
      return payload
    default:
      return state
  }
}
