import * as React from "react";
import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  plan: {
    planItems: localStorage.getItem("planItems")
      ? JSON.parse(localStorage.getItem("planItems"))
      : [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case "PLAN_ADD_ITEM":
      // add to plan
      const newItem = action.payload;
      const existItem = state.plan.planItems.find(
        (course) => course.code === newItem.code
      );
      const planItems = existItem
        ? state.plan.planItems.map((course) =>
            course.code === existItem.code ? newItem : course
          )
        : [...state.plan.planItems, newItem];
      localStorage.setItem("planItems", JSON.stringify(planItems));
      return { ...state, plan: { ...state.plan, planItems } };
    case "PLAN_REMOVE_ITEM": {
      const planItems = state.plan.planItems.filter(
        (course) => course.code !== action.payload.code
      );
      localStorage.setItem("planItems", JSON.stringify(planItems));
      return { ...state, plan: { ...state.plan, planItems } };
    }
    case 'PLAN_CLEAR':
      return { ...state, plan: { ...state.plan, planItems: [] } };
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
