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
      proposalId: proposalId
  }
};

export const addSectorNewProposal = (newProposal) => {
    return {
        type: "ADD_SECTOR_NEW_PROPOSAl",
        newProposal: newProposal
    }
};

export const setProposalIndex = (currentProposalIndex) => {
    return {
        type: "SET_PROPOSAL_INDEX",
        currentProposalIndex: currentProposalIndex
    }
};

export const setCurrentSector = (currentSector) => {
    return {
        type: "SET_CURRENT_SECTOR",
        currentSector: currentSector
    }
};