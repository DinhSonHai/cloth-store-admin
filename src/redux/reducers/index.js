import { combineReducers } from 'redux';
import auth from './auth';
import products from './products';
import categories from './categories';
import brands from './brands';
import sizes from './sizes';
import colors from './colors';

export default combineReducers({
  auth, products, categories, brands, sizes, colors
});
