"use client";

import GetName from "./components/getName/getName";
import React, { useEffect, useRef, useState } from "react";
import BlankDisplayer from "./components/pageProps/blankDisplayer";
import Try from "./components/pageProps/try";

const GetWord = async () => {
  const data = await GetName();
  return data;
};

export default function Home() {
  const [data, setData] = useState<[string, number] | []>([]);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    async function fetchData() {
      const info = await GetWord();
      setData(info);
    }

    fetchData();
  }, []);

  return (
    <main>
      <BlankDisplayer data={data} />
    </main>
  );
}
