import { useState, useEffect } from "react";

export const statuses = {
  LOADING: "Loading...",
  OK: "OK",
  ERROR: "Error",
};

export function useFetch(URL, options) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(statuses.LOADING);

  useEffect(() => {
    setStatus(statuses.LOADING);
    fetch(URL, options)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setStatus(statuses.OK);
      })
      .catch((error) => setStatus(statuses.ERROR + " " + error));
  }, []);

  return { data, status };
}
