import axios from "axios";
import { useEffect, useState } from "react";
import { IData, Nullable } from "../utils/types";

export default function useFetch(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<Nullable<IData[]>>(null);

  const fetch = (loading = true) => {
    setIsLoading(loading);
    axios
      .get(url)
      .then((raw) => {
        setData(raw.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  return { isLoading, error, data, fetch };
}
