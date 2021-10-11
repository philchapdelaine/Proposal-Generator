const commonstate = {
  fever: false,
  "dry cough": false,
  tiredness: false,
};
const rarestate = {
  "aches and pains": false,
  "sore throat": false,
  diarrhea: false,
  conjunctivitis: false,
  headache: false,
  "loss of taste": false,
  "loss of smell": false,
  "rash on skin": false,
  "finger or toe discolouration": false,
};
const seriousstate = {
  "difficulty breathing": false,
  "shortness of breath": false,
  "chest pain or pressure": false,
  "loss of speech": false,
  "loss of movement": false,
};
const atriskstate = {
  "Older than 64": false,
  "Have Liver Disease": false,
  "Have a weakened immune system": false,
  "Undergoing chemotherapy": false,
  Diabetic: false,
  "Undergoing dialysis": false,
  "BMI 40 and over": false,
  "In need of organ transplant": false,
};

const INITIAL_STATE = {
  common: Object.keys(commonstate),
  rare: Object.keys(rarestate),
  serious: Object.keys(seriousstate),
  atrisk: Object.keys(atriskstate),
  symptoms: { ...commonstate, ...rarestate, ...seriousstate },
  diagnosis: "",
  showResult: false,
};

const diagnosisReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SELECTED_SYMPTOMS":
      return {
        ...state,
        symptoms: { ...state.symptoms, ...action.payload },
      };

    case "RETAKE_TEST":
      return INITIAL_STATE;

    case "GENERATE_RESULT":
      return { ...state, showResult: true };

    case "HIDE_RESULT":
      return { ...state, showResult: false };

    default:
      return state;
  }
};

export default diagnosisReducer;

//  merely sample from:
// https://github.com/kenhyj/Traceify/tree/master/client/src/redux/reducers
