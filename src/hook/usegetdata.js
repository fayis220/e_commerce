"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const UseFetchData = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState();

  const FetchData = async (url) => {
    try {
      await axios.get(url).then((response) => {
        setData(response.data);
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (url) {
      FetchData(url);
    }
  }, [url]);

  return { data, isLoading, error };
};

export default UseFetchData;
