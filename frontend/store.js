export const initialState = { isLoading: true, error: null, data: {} }
export const FETCH_CHANNELS_REQUEST = "FETCH_CHANNELS_REQUEST"
export const FETCH_CHANNELS_SUCCESS = "FETCH_CHANNELS_SUCCESS"
export const FETCH_CHANNELS_FAILURE = "FETCH_CHANNELS_FAILURE"

function reducer(state, action) {
  switch (action.type) {
    case FETCH_CHANNELS_REQUEST:
      return { ...state, isLoading: true }
    case FETCH_CHANNELS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      }
    case FETCH_CHANNELS_FAILURE:
      return { ...state, isLoading: false, error: action.payload }
    default:
      throw new Error()
  }
}

export default reducer
