import { useReducer } from "react";
import { useData } from "../context/DataContext";
import { IChartState } from "../utils/types";

interface IAction {
  type: string;
  payload?: any;
}

function reducer(state: IChartState, action: IAction): IChartState {
  switch (action.type) {
    case "SET_START_DATE":
      return { ...state, startDate: action.payload };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    case "SET_DATA":
      return { ...state, data: action.payload };

    default:
      throw new Error("Illegal Action Type");
  }
}

export default function useChartState() {
  const data = useData();

  const initialState = {
    startDate: data?.getMinimumDate() || new Date(),
    endDate: data?.getMaximumDate() || new Date(),
    data: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    ...state,
    setStartDate: (date: Date) =>
      dispatch({ type: "SET_START_DATE", payload: date }),
    setEndDate: (date: Date) =>
      dispatch({ type: "SET_END_DATE", payload: date }),
    setData: (data: any) => dispatch({ type: "SET_DATA", payload: data }),
  };
}
