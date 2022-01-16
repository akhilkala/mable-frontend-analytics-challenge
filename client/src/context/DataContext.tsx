import axios from "axios";
import React, { ReactElement } from "react";
import Loading from "../components/Loading";
import { Children, IData, Nullable } from "../utils/types";

type GrouperFunction = (
  sessions?: Nullable<IData[]>,
  startDate?: Date | undefined,
  endDate?: Date | undefined
) => any;

type ReducerFunction = (
  sessions?: Nullable<IData[]>,
  startDate?: Date | undefined,
  endDate?: Date | undefined
) => any;

type Value = {
  sessions: Nullable<IData[]>;
  getMinimumDate: () => Date | undefined;
  getMaximumDate: () => Date | undefined;
  getFilteredSessions: (
    startDate: Date,
    endDate: Date,
    sessions?: Nullable<IData[]>
  ) => IData[] | undefined;
  getGroupedByDay: GrouperFunction;
  getGroupedByMonth: GrouperFunction;
  getGroupedByYear: GrouperFunction;
  getReducedAmountsByDay: ReducerFunction;
  getReducedAmountsByMonth: ReducerFunction;
  getReducedAmountsByYear: ReducerFunction;
  getReducedAmounts: ReducerFunction;
};

const DataContext = React.createContext<Nullable<Value>>(null);

export const useData = () => {
  return React.useContext(DataContext);
};

export default function DataProvider({ children }: Children): ReactElement {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<any>(null);
  const [data, setData] = React.useState<Nullable<IData[]>>(null);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/data`)
      .then((raw) => {
        setData(raw.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="screen-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    <div className="screen-center">
      <h1>Something went wrong!</h1>
    </div>;
  }

  const getMinimumDate = () => {
    return data
      ?.map((entry) => new Date(entry.date))
      .reduce((min, current) => {
        if (current.getTime() < min.getTime()) {
          return current;
        } else {
          return min;
        }
      });
  };

  const getMaximumDate = () => {
    return data
      ?.map((entry) => new Date(entry.date))
      .reduce((min, current) => {
        if (current.getTime() > min.getTime()) {
          return current;
        } else {
          return min;
        }
      });
  };

  const getFilteredSessions = (
    startDate: Date,
    endDate: Date,
    sessions = data
  ) => {
    return sessions?.filter((entry) => {
      const SessionDateTime = new Date(entry.date).getTime();
      return (
        SessionDateTime >= startDate.getTime() &&
        SessionDateTime <= endDate.getTime()
      );
    });
  };

  const _getGroupedBy = (
    sessions = data,
    startDate = getMinimumDate(),
    endDate = getMaximumDate(),
    getKey: (date: Date) => string
  ) => {
    if (!sessions || !startDate || !endDate) return;
    const groups: any = {};
    getFilteredSessions(startDate, endDate, sessions)?.forEach((entry) => {
      const key = getKey(new Date(entry.date));
      if (groups[key] === undefined) {
        groups[key] = [entry];
      } else {
        groups[key].push(entry);
      }
    });
    return groups;
  };

  const getGroupedByDay = (
    sessions = data,
    startDate = getMinimumDate(),
    endDate = getMaximumDate()
  ) => {
    return _getGroupedBy(
      sessions,
      startDate,
      endDate,
      (date) =>
        `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`
    );
  };

  const getGroupedByMonth = (
    sessions = data,
    startDate = getMinimumDate(),
    endDate = getMaximumDate()
  ) => {
    return _getGroupedBy(
      sessions,
      startDate,
      endDate,
      (date) => `${date.getMonth() + 1} - ${date.getFullYear()}`
    );
  };

  const getGroupedByYear = (
    sessions = data,
    startDate = getMinimumDate(),
    endDate = getMaximumDate()
  ) => {
    return _getGroupedBy(sessions, startDate, endDate, (date) =>
      date.getFullYear().toString()
    );
  };

  const _getReducedAmounts = (groups: any) => {
    const reducedGroups: any = {};
    Object.keys(groups).forEach((group) => {
      const frequency: any = {};
      groups[group].forEach((entry: any) => {
        Object.keys(entry).forEach((key) => {
          if (!frequency[key]) frequency[key] = {};
          if (typeof entry[key] === "string" || !isNaN(entry[key])) {
            const value = entry[key];
            const freq = frequency[key][value];
            frequency[key][value] = freq === undefined ? 0 : freq + 1;
          } else {
            Object.keys(entry[key]).forEach((k) => {
              if (!frequency[key][k]) frequency[key][k] = {};
              const value = entry[key][k];
              const freq = frequency[key][k][value];
              frequency[key][k][value] = freq === undefined ? 0 : freq + 1;
            });
          }
        });
      });
      reducedGroups[group] = frequency;
    });

    const formattedGroups: any = {};
    Object.keys(reducedGroups).forEach((groupName) => {
      const reducedTotals: any = {};
      const totals = reducedGroups[groupName].totals;
      Object.keys(totals).forEach((key) => {
        if (reducedTotals[key] === undefined) {
          reducedTotals[key] = 0;
        }
        reducedTotals[key] += Object.keys(totals[key]).reduce(
          (acc, c) => acc + parseInt(c) * parseInt(totals[key][c]),
          0
        );
      });
      formattedGroups[groupName] = {
        ...reducedGroups[groupName],
        totals: reducedTotals,
      };
    });

    return formattedGroups;
  };

  const getReducedAmountsByDay = (
    sessions = data,
    startDate = getMinimumDate(),
    endDate = getMaximumDate()
  ) => {
    return _getReducedAmounts(getGroupedByDay(sessions, startDate, endDate));
  };

  const getReducedAmountsByMonth = (
    sessions = data,
    startDate = getMinimumDate(),
    endDate = getMaximumDate()
  ) => {
    return _getReducedAmounts(getGroupedByMonth(sessions, startDate, endDate));
  };

  const getReducedAmountsByYear = (
    sessions = data,
    startDate = getMinimumDate(),
    endDate = getMaximumDate()
  ) => {
    return _getReducedAmounts(getGroupedByYear(sessions, startDate, endDate));
  };

  const getReducedAmounts = (
    sessions = data,
    startDate = getMinimumDate(),
    endDate = getMaximumDate()
  ) => {
    if (!sessions || !startDate || !endDate) return;
    sessions = getFilteredSessions(startDate, endDate, sessions);
    return _getReducedAmounts({ group: sessions }).group;
  };

  const value = {
    sessions: data,
    getMinimumDate,
    getMaximumDate,
    getFilteredSessions,
    getGroupedByDay,
    getGroupedByMonth,
    getGroupedByYear,
    getReducedAmountsByDay,
    getReducedAmountsByMonth,
    getReducedAmountsByYear,
    getReducedAmounts,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
