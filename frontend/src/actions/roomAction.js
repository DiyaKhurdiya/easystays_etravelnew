import axios from "axios";
//import { config } from "dotenv";

import {
  ALL_ROOM_FAIL,
  ALL_ROOM_REQUEST,
  ALL_ROOM_SUCCESS,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/roomConstants";

export const getRoom =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 25000],
    category,
    ratings = 0,
    location,
    amenity
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_ROOM_REQUEST });

      let link = `/api/v1/rooms?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/rooms?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      if (location) {
        link = `/api/v1/rooms?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&location=${location}`;
      }

      if (amenity) {
        link = `/api/v1/rooms?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&amenity=${amenity}`;
      }

      if (category && amenity) {
        link = `/api/v1/rooms?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}&amenity=${amenity}`;
      }

      if (location && amenity) {
        link = `/api/v1/rooms?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&location=${location}&amenity=${amenity}`;
      }

      if (category && location) {
        link = `/api/v1/rooms?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}&location=${location}`;
      }

      if (category && location && amenity) {
        link = `/api/v1/rooms?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}&location=${location}&amenity=${amenity}`;
      }
      const { data } = await axios.get(link);

      dispatch({
        type: ALL_ROOM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ROOM_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get room details
export const getRoomDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ROOM_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/room/${id}`);

    dispatch({
      type: ROOM_DETAILS_SUCCESS,
      payload: data.room,
    });
  } catch (error) {
    dispatch({
      type: ROOM_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// New Review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
