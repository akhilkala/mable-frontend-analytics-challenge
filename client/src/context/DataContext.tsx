import axios from "axios";
import React, { ReactElement } from "react";
import Loading from "../components/Loading";
import { Children, IData, Nullable } from "../utils/types";

type Value = {
  entries: Nullable<IData[]>;
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

  const value = {
    entries: data,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
