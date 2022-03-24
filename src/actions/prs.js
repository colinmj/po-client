import * as api from '../api/api.js'

export const getPrs = (params) => async (dispatch) => {
  try {
    const { data } = await api.getPrs(params)

    dispatch({ type: 'FETCH_PRS', payload: data })
  } catch (error) {
    console.log(error.message)
  }
}
