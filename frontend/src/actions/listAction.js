import axios from "axios";
import { ADD_TO_LIST, REMOVE_LIST_ITEM } from "../constants/listConstants";

// Add to list

export const addItemsToList = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/room/${id}`);
  dispatch({
    type: ADD_TO_LIST,
    payload: {
      room: data.room._id,
      name: data.room.name,
      price: data.room.price,
      image: data.room.images[0].url,
      stock: data.room.Stock,
      quantity,
    },
  });
  localStorage.setItem("listItems", JSON.stringify(getState().list.listItems));
};

// Remove from list

export const removeItemsFromList = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_LIST_ITEM,
    payload: id,
  });

  localStorage.setItem("listItems", JSON.stringify(getState().list.listItems));
};
