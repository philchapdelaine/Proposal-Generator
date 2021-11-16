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

export const clearProposals = () => {
  return {
    type: "CLEAR_PROPOSALS"
  }
};

export const deleteResume = (resumeId, proposalId) => {
  return {
    type: "DELETE_RESUME",
    proposalId : proposalId,
    resumeId: resumeId
  }
};