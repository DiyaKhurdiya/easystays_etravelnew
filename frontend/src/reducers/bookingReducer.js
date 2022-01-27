import {
    CREATE_BOOKING_REQUEST,
    CREATE_BOOKING_SUCCESS,
    CREATE_BOOKING_FAIL,
    MY_BOOKINGS_REQUEST,
    MY_BOOKINGS_SUCCESS,
    MY_BOOKINGS_FAIL,
    ALL_BOOKINGS_REQUEST,
    ALL_BOOKINGS_SUCCESS,
    ALL_BOOKINGS_FAIL,
    UPDATE_BOOKING_REQUEST,
    UPDATE_BOOKING_SUCCESS,
    UPDATE_BOOKING_FAIL,
    UPDATE_BOOKING_RESET,
    DELETE_BOOKING_REQUEST,
    DELETE_BOOKING_SUCCESS,
    DELETE_BOOKING_FAIL,
    DELETE_BOOKING_RESET,
    BOOKING_DETAILS_REQUEST,
    BOOKING_DETAILS_SUCCESS,
    BOOKING_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../constants/bookingConstant";
  
  export const newBookingReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_BOOKING_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case CREATE_BOOKING_SUCCESS:
        return {
          loading: false,
          booking: action.payload,
        };
  
      case CREATE_BOOKING_FAIL:
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
  
  