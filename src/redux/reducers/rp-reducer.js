let initialResumes = [];

const initState = {
	resumes: initialList
}

const resumeReducer = (state = initState, action) => {
	if (action.type === "ADD_RESUME") {
		let newState = {resumes: [...state.resumes, {resume: action.resume}]};
		return newState;
	}
	if (action.type === "FETCH_RESUMES") {
		let newState = {resumes: action.resumes.data};
		console.log(newState.resumes);
		return newState;
	}
	if (action.type === "CLEAR_RESUMES") {
		let newState = initState;
		return newState;
	}
  return state;
}