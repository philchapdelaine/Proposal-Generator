const INITIAL_STATE = {
	currentProposalIndex: -1,
	currentProposalName: 'Untitled New Proposal',
	currentSector: {},
	proposals: []
}

const proposalReducer = (state = INITIAL_STATE, action) => {
	if (action.type === 'ADD_PROPOSAL') {
		let newState = {
			currentProposalIndex: 0,
			currentProposalName: state.currentProposalName,
			currentSector: state.currentSector,
			proposals: [...state.proposals, { proposal: action.proposal }]
		};
		return newState;
	}
	if (action.type === 'SET_PROPOSALS') {
		let newState = {
			currentProposalIndex: 0,
			currentProposalName: state.currentProposalName,
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
			currentProposalName: state.currentProposalName,
			currentSector: state.currentSector,
			proposals: [...state.proposals]
		};
		let updatedSectors = newState.proposals[state.currentProposalIndex].resumes.filter(sector => sector.sectorID !== action.sectorID);
		newState.proposals[state.currentProposalIndex].resumes = updatedSectors;
		newState.proposals[state.currentProposalIndex].proposalName = action.proposalName;
		console.log(newState);
		return newState;
	}
	if (action.type === 'ADD_SECTOR') {
		let newState = {
			currentProposalIndex: state.currentProposalIndex,
			currentProposalName: state.currentProposalName,
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
			currentProposalName: state.currentProposalName,
			currentSector: {},
			proposals: [...state.proposals]
		};
		let newProposal = action.newProposal;
		newState.currentProposalIndex = newState.proposals.push(newProposal) - 1;
		return newState;
	}
	if (action.type === 'SET_PROPOSAL_INDEX') {
		let newProposalName;
		action.currentProposalIndex === -1 ? newProposalName = "Untitled New Proposal" : newProposalName = state.proposals[action.currentProposalIndex].proposalName;
		let newState = {
			currentProposalIndex: action.currentProposalIndex,
			currentProposalName: newProposalName,
			currentSector: {},
			proposals: [...state.proposals]
		};
		return newState;
	}
	if (action.type === 'SET_CURRENT_SECTOR') {
		let newState = {
			currentProposalIndex: state.currentProposalIndex,
			currentProposalName: state.currentProposalName,
			currentSector: action.currentSector,
			proposals: [...state.proposals]
		};
		return newState;
	}
	if (action.type === 'UPDATE_NAME') {
		let newState = {
			currentProposalIndex: state.currentProposalIndex,
			currentProposalName: action.proposalName,
			currentSector: state.currentSector,
			proposals: [...state.proposals]
		};
		let proposaltoUpdateIndex = state.currentProposalIndex;
		newState.proposals[proposaltoUpdateIndex].proposalName = newState.currentProposalName;
		return newState;
	}
  return state;
};

export default proposalReducer;
