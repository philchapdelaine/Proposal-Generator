export const addResume = resume => {
    return {
      type: 'ADD_RESUME',
      resume: resume
    }
  }
  
  export const getResumes = resumes => {
    return {
      type: "FETCH_RESUMES",
      resumes: resumes
    }
  }
  
  export const clearResumes = () => {
    return {
      type: "CLEAR_RESUMES"
    }
  }