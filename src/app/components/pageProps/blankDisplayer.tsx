"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import Blanks from "./blank";

export default function BlankDisplayer({
  info,
  isWinned,
  isLost,
  setWinned,
  setLost,
}: {
  info: [string, number];
  isWinned: boolean;
  isLost: boolean;
  setWinned: () => void;
  setLost: () => void;
}) {
  const [rows, setRows] = useState<string[]>(new Array(5).fill(""));

  const [shouldFetch, SetShouldFetch] = useState(false);

  const [actualRow, setActualRow] = useState<number>(0);

  const addRow = useRef(0);

  const countChar = useRef(0);

  const [data] = useState({
    word: info[0],
    length: info[1],
  });

  const WordNotExists = () => {
    toast.error("☠ That word doesnt exists!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    if (rows[addRow.current].length == data.length) {
      const word = rows[addRow.current];

      const fetcher = async () => {
        const args = {
          word: info[0],
          try: word,
        };

        const response = await fetch("/api/checker", {
          method: "POST",
          body: JSON.stringify(args),
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();

        if (data == "doesn't exists") {
          WordNotExists();
        } else if (data == false) {
          console.log(addRow.current);
          if (addRow.current == 4) {
            setLost();
          }
          setActualRow((prevState) => prevState + 1);
          addRow.current += 1;
          countChar.current = 0;
        } else if (data == true) {
          setActualRow((prevState) => prevState + 1);
          setWinned();
        }
      };

      fetcher();
    }
  }, [shouldFetch]);

  const HandleKeyUp = (e: KeyboardEvent) => {
    if (!isWinned && !isLost) {
      if (e.key === "Enter") {
        SetShouldFetch((prevState) => !prevState);
      }
      if (e.key === "Backspace") {
        if (countChar.current > 0) {
          countChar.current -= 1;
        }

        setRows((prevState) => ({
          ...prevState,
          [addRow.current]: `${prevState[addRow.current].slice(
            0,
            prevState[addRow.current].length - 1
          )}`,
        }));
      }
      if (countChar.current < data.length && e.key.match(/^[A-z]$/)) {
        countChar.current += 1;
        setRows((prevState) => ({
          ...prevState,
          [addRow.current]: `${
            prevState[addRow.current]
          }${e.key.toLowerCase()}`,
        }));
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", HandleKeyUp);

    return () => {
      window.removeEventListener("keyup", HandleKeyUp);
    };
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-3 -mt-48">
      {new Array(5).fill("").map((_, index) => (
        <Blanks
          key={index}
          word={info[0] as string}
          spaces={info[1] as number}
          row={rows[index]}
          isGuessed={index < actualRow}
        />
      ))}
    </div>
  );
}
