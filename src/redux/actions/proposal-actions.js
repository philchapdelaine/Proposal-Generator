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

export const deleteSector = (sectorID, proposalId) => {
  return {
    type: "DELETE_SECTOR",
    proposalId : proposalId,
    sectorID: sectorID
  }
};

export const addSector = (proposalId) => {
  return {
    type: "ADD_SECTOR",
    proposalId : proposalId
  }
};