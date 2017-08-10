import {combineReducers} from 'redux';
import taxpayerReturn from './taxpayerReturn'
import ui from './ui'

const rootReducer = combineReducers({
  taxpayerReturn,
  ui
});

export default rootReducer;

export function getTaxpayerReturn(state){
  return state.taxpayerReturn
}

export function getUI(state){
  return state.ui
}
