import * as types from './types'
export default {
  [types.VIEW_LOADING]: (state, payload) => { state.bLoading = payload },
  [types.UPDATE_INDEX]:( state, payload) => { state.index = payload },
  [ 'UPDATE_USER' ]: ( state , payload) => { state.user = payload },
  [types.ADD_USER]: ( state , payload) => { state.user = payload }
}