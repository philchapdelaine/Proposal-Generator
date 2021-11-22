// used for testing
const initialProposal = {
	"proposalId": 1,
	"proposalName": "dummy proposal",
	"resumes" : 
		[
			{
				"sectorID": 1,
				"name": "Experience",
				"linkedEmail": "mc@ae.com",
				"division": "Water",
				"empty": true,
				"proposalNumber": "1",
				"imageLoc": "blah/blah",
				"description": "I'm the best so I don't need to have any experience"
			},
			{
				"sectorID": 2,
				"name": "Education",
				"linkedEmail": "mc@ae.com",
				"division": "Ground",
				"empty": true,
				"proposalNumber": "1",
				"imageLoc": "blah/blah",
				"description": "II am also a super great description"
			}
		]
	};

// just for testing
const intialSector = {
	"sectorID": 4,
	"name": "TestSector",
	"linkedEmail": "mc@ae.com",
	"division": "Air",
	"imageLoc": "blah/blah",
	"description": "How do I keep making these descriptions so good"
}

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
		const proposaltoUpdateIndex = newState.proposals.findIndex(proposal => proposal.proposalId == action.proposalId);
		let updatedSectors = newState.proposals[proposaltoUpdateIndex].resumes.filter(sector => sector.sectorID !== action.sectorID);
		newState.proposals[proposaltoUpdateIndex].resumes = updatedSectors;
		return newState;
	}
	if (action.type === 'ADD_SECTOR') {
		let newState = {
			currentProposalIndex: state.currentProposalIndex,
			currentSector: {},
			proposals: [...state.proposals]
		};
		let proposaltoUpdateIndex = state.currentProposalIndex;
		newState.proposals[proposaltoUpdateIndex].resumes.push(state.currentSector);
		return newState;
	}
	// This will only get called when a user adds the first sector to new proposal
	if (action.type === 'ADD_SECTOR_NEW_PROPOSAL') {
		let newState = {
			currentProposalIndex: state.currentProposalIndex,
			currentSector: {},
			proposals: [...state.proposals]
		};
		let newProposal = action.newProposal;
		console.log(newState);
		console.log(newProposal);
		newState.currentProposalIndex = newState.proposals.push(newProposal) - 1;
		console.log(newState);
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
