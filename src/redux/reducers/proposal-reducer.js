const initialProposal = {
	proposalId : 1,
	resumes : 
		[
			{
				"sectorID": 1,
				"name": "Experience",
				"linkedEmail": "mc@ae.com",
				"division": "Water",
				"imageLoc": "blah/blah",
				"description":"I am a great description"
			},
			{
				"sectorID": 2,
				"name": "Education",
				"linkedEmail": "mc@ae.com",
				"division": "Ground",
				"imageLoc": null,
				"description":"I am also a super great description"
			}
		]
	};


const intialSector = {
	"sectorID": 4,
	"name": "TestSector",
	"linkedEmail": "mc@ae.com",
	"division": "Air",
	"imageLoc": "blah/blah",
	"description": "How do I keep making these descriptions so good"
}

const INITIAL_STATE = {
	currentSector: intialSector,
	proposals: [initialProposal]
}

const proposalReducer = (state = INITIAL_STATE, action) => {
	if (action.type === 'ADD_PROPOSAL') {
		let newState = {
			currentSector: intialSector,
			proposals: [...state.proposals, { proposal: action.proposal }]
		};
		return newState;
	}
	if (action.type === 'SET_PROPOSALS') {
		let newState = {
			currentSector: intialSector,
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
			currentSector: {},
			proposals: [...state.proposals]
		};
		let proposaltoUpdateIndex = 0;
		newState.proposals[proposaltoUpdateIndex].resumes.push(state.currentSector);
		return newState;
	}
  return state;
};

export default proposalReducer;
