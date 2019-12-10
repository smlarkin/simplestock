import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  categoriesReducer,
  categoryIndexReducer,
  editingReducer,
  sharingReducer,
  shoppingReducer,
} from './reducers';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  categoryIndex: categoryIndexReducer,
  editing: editingReducer,
  sharing: sharingReducer,
  shopping: shoppingReducer,
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = composeWithDevTools || compose;
}

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  let store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware()),
  );
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
