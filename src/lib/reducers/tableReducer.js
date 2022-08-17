const ADD_DATA_TO_TABLE = "ADD_DATA_TO_TABLE";

let initialState = [];

export const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA_TO_TABLE: {
      return action.payload.data;
    }
    default:
      return state;
  }
};
