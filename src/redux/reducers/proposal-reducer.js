const INITIAL_STATE = {
	proposals: []
}

const proposalReducer = (state = INITIAL_STATE, action) => {
	if (action.type === "ADD_PROPOSAL") {
		let newState = {proposals: [...state.proposals, {proposal: action.proposal}]};
		return newState;
	}
  if (action.type === "SET_PROPOSALS") {
		let newState = {proposals: action.proposals};
		return newState;
	}
	if (action.type === "CLEAR_PROPOSALS") {
		let newState = INITIAL_STATE;
		return newState;
	}
  return state;
};

export default proposalReducer;
