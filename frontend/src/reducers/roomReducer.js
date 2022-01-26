import {
  ALL_ROOM_REQUEST,
  ALL_ROOM_SUCCESS,
  ALL_ROOM_FAIL,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/roomConstants.js";

export const roomReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ALL_ROOM_REQUEST:
      return {
        loading: true,
        rooms: [],
      };
    case ALL_ROOM_SUCCESS:
      return {
        loading: false,
        rooms: action.payload.rooms,
        roomsCount: action.payload.roomsCount,
        resultPerPage: action.payload.resultPerPage,
      };
    case ALL_ROOM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const roomDetailsReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case ROOM_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ROOM_DETAILS_SUCCESS:
      return {
        loading: false,
        room: action.payload,
      };
    case ROOM_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
