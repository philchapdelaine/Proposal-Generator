export const addProposal = proposal => {
  return {
    type: 'ADD_PROPOSAL',
    proposal: proposal
  }
};

export const setProposals = proposals => {
  return {
    type: 'SET_PROPOSALS',
    proposals: proposals
  }
};

export const getResumes = proposals => {
  return {
    type: "FETCH_RESUMES",
    proposals: proposals
  }
};

export const clearProposals = () => {
  return {
    type: "CLEAR_PROPOSALS"
  }
};
