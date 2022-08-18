import { AnyAction } from "@reduxjs/toolkit";

const ADD_DATA_TO_CRYPT_ABOUT = "ADD_DATA_TO_CRYPT_ABOUT";

let initialState = {};

export const cryptAboutReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_DATA_TO_CRYPT_ABOUT: {
      return action.payload.data;
    }
    default:
      return state;
  }
};
