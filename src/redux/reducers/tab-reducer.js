  const INITIAL_STATE = 0;
  
  const tabReducer = (state = INITIAL_STATE, action) => {
    if (action.type === 'SET_TAB') {
		let newState = action.tab;
		return newState;
	}
    return state;
  };
  
  export default tabReducer;