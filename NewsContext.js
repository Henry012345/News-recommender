import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const NewsContext = createContext();

export const NewsContextProvider = (props) => {
  const [data, setData] = useState(null);
  // const apiKey = "c7ab212da85a4361a23290ec1f684177";
  const apiKeys = [
    "c7ab212da85a4361a23290ec1f684177",
    "415ac8b267884e2bb6e47b8353c90121",
    "4824e9c5418a47c6a9515027a95d47c6",
    "12d5214b3ee546faa365184e6c5d977a",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKeys[0]}`),

          axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKeys[1]}`),
          axios.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKeys[2]}`),
          axios.get(`https://newsapi.org/v2/everything?q=entertainment&apiKey=${apiKeys[3]}`),
          // Add more axios.get() requests here
        ]);
        console.log("Gotten Data: ", responses);

        const newsData = responses.map((response) => response.data);
        setData(newsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`https://newsapi.org/v2/everything?q=apple&from=2023-06-13&to=2023-06-13&sortBy=popularity&apiKey=${apiKey}`)
  //     .then((response) => {
  //       console.log("Gotten Data: ", response.data);
  //       return setData(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  return <>{data && <NewsContext.Provider value={data && { data }}>{props.children}</NewsContext.Provider>}</>;
};
