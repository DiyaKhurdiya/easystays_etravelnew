import { ADD_TO_LIST, REMOVE_LIST_ITEM } from "../constants/listConstants";

export const listReducer = (state = { listItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_LIST:
      const item = action.payload;

      const isItemExist = state.listItems.find((i) => i.room === item.room);

      if (isItemExist) {
        return {
          ...state,
          listItems: state.listItems.map((i) =>
            i.room === isItemExist.room ? item : i
          ),
        };
      } else {
        return {
          ...state,
          listItems: [...state.listItems, item],
        };
      }
    case REMOVE_LIST_ITEM:
      return {
        ...state,
        listItems: state.listItems.filter((i) => i.room !== action.payload),
      };

    default:
      return state;
  }
};
