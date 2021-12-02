const INITIAL_STATE = {
	currentProposalIndex: -1,
	currentSector: {},
	proposals: []
}

const proposalReducer = (state = INITIAL_STATE, action) => {
	if (action.type === 'ADD_PROPOSAL') {
		let newState = {
			currentProposalIndex: 0,
			currentSector: state.currentSector,
			proposals: [...state.proposals, { proposal: action.proposal }]
		};
		return newState;
	}
	if (action.type === 'SET_PROPOSALS') {
		let newState = {
			currentProposalIndex: 0,
			currentSector: state.currentSector,
			proposals: action.proposals
		};
		return newState;
	}
	if (action.type === 'CLEAR_PROPOSALS') {
		let newState = INITIAL_STATE;
		return newState;
	}
	if (action.type === 'DELETE_SECTOR') {
		let newState = {
			currentProposalIndex: state.currentProposalIndex,
			currentSector: state.currentSector,
			proposals: [...state.proposals]
		};
		let updatedSectors = newState.proposals[state.currentProposalIndex].resumes.filter(sector => sector.sectorID !== action.sectorID);
		newState.proposals[state.currentProposalIndex].resumes = updatedSectors;
		return newState;
	}
	if (action.type === 'ADD_SECTOR') {
		let newState = {
			currentProposalIndex: state.currentProposalIndex,
			currentSector: {},
			proposals: [...state.proposals]
		};
		let proposaltoUpdateIndex = state.currentProposalIndex;
		newState.proposals[proposaltoUpdateIndex] = action.newProposal;
		return newState;
	}
	if (action.type === 'ADD_SECTOR_NEW_PROPOSAL') {
		let newState = {
			currentProposalIndex: state.currentProposalIndex,
			currentSector: {},
			proposals: [...state.proposals]
		};
		let newProposal = action.newProposal;
		newState.currentProposalIndex = newState.proposals.push(newProposal) - 1;
		return newState;
	}
	if (action.type === 'SET_PROPOSAL_INDEX') {
		let newState = {
			currentProposalIndex: action.currentProposalIndex,
			currentSector: {},
			proposals: [...state.proposals]
		};
		return newState;
	}
	if (action.type === 'SET_CURRENT_SECTOR') {
		let newState = {
			currentProposalIndex: state.currentProposalIndex,
			currentSector: action.currentSector,
			proposals: [...state.proposals]
		};
		return newState;
	}
  return state;
};

export default proposalReducer;
