const initialProposal = {
	proposalId : 1,
	resumes : 
		[
			{
				"ID": 1,
				"Name": "John Smith",
				"Sectors": [
					{
						"ID": 1,
						"Title": "Experience"
					},
					{
						"ID": 2,
						"Title": "Projects"
					},
					{
						"ID": 3,
						"Title": "Education"
					}
				]
			},
			{
				"ID": 2,
				"Name": "Steve Jobs",
				"Sectors": [
					{
						"ID": 1,
						"Title": "Experience"
					},
					{
						"ID": 2,
						"Title": "Projects"
					},
					{
						"ID": 3,
						"Title": "Education"
					}
				]
			},
			{
				"ID": 3,
				"Name": "Michael Chung",
				"Sectors": [
					{
						"ID": 1,
						"Title": "Experience"
					},
					{
						"ID": 2,
						"Title": "Projects"
					},
					{
						"ID": 3,
						"Title": "Education"
					}
				]
			}
		]
	};
	

const intialSector = {
	sectorID: 1,
	name: 'Experience',
	division: 'water',
	description: 'This will be a good description blah blah blahmhdjhasdkshsjkdhsjhkjsh'
  }

const INITIAL_STATE = {
	currentSector: intialSector,
	proposals: [initialProposal]
}

const proposalReducer = (state = INITIAL_STATE, action) => {
	if (action.type === 'ADD_PROPOSAL') {
		let newState = {proposals: [...state.proposals, {proposal: action.proposal}]};
		return newState;
	}
	if (action.type === 'SET_PROPOSALS') {
		let newState = {proposals: action.proposals};
		return newState;
	}
	if (action.type === 'CLEAR_PROPOSALS') {
		let newState = INITIAL_STATE;
		return newState;
	}
	if (action.type === 'DELETE_RESUME') {
		let newState = {
			currentSector: state.currentSector,
			proposals: [...state.proposals]
		};
		const proposaltoUpdateIndex = newState.proposals.findIndex(proposal => proposal.proposalId == action.proposalId)
		let updatedProposal = newState.proposals[proposaltoUpdateIndex].resumes.filter(resume => resume.ID !== action.resumeId);
		newState.proposals[proposaltoUpdateIndex].resumes = updatedProposal;
		return newState;
	}
	if (action.type === 'ADD_RESUME') {
		let newState = {
			currentSector: {},
			proposals: [...state.proposals]
		};
		const proposaltoUpdateIndex = newState.proposals.findIndex(proposal => proposal.proposalId == action.proposalId)
		let updatedProposal = newState.proposals[proposaltoUpdateIndex].resumes.filter(resume => resume.ID !== action.resumeId);
		newState.proposals[proposaltoUpdateIndex].resumes = updatedProposal;
		return newState;
	}
  return state;
};

export default proposalReducer;
