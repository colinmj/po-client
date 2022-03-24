const reducer = (prs = [], action) => {
  switch (action.type) {
    case 'FETCH_PRS':
      return action.payload

    default:
      return prs
  }
}

export default reducer
