"use client";

import React, { useEffect, useState } from "react";
import BlankDisplayer from "./components/pageProps/blankDisplayer";
import { generate } from "random-words";
import Title from "./components/pageProps/Title";
import Restart from "./components/pageProps/restart";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "./components/skeleton/cardSkeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactConfetti from "react-confetti";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  const [word, setWord] = useState<[string, number]>();

  const [isWinned, setIsWinned] = useState(false);

  const [isLost, setIsLost] = useState(false);

  const winNotify = () =>
    toast("🏆 You won!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const wordNotify = () => {
    toast(`❌ You lost! the word was "${word?.[0].toUpperCase()}"`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const setWinned = () => {
    setIsWinned(true);
  };

  const setLost = () => {
    setIsLost(true);
  };

  const GenerateWord = () => {
    setIsWinned(false);
    setIsLost(false);
    setIsLoaded(false);
    const word = generate({ maxLength: 6 });

    const chars = word.length;

    const data: [string, number] = [word as any, chars];

    return setWord(data);
  };

  useEffect(() => {
    if (!isWinned && !isLost) {
      GenerateWord();
    } else if (isWinned) {
      winNotify();
    } else if (isLost) {
      wordNotify();
    }
  }, [isWinned, isLost]);

  setTimeout(() => {
    setIsLoaded(true);
  }, 1200);

  return (
    <main className="overflow-x-hidden w-full">
      <SkeletonTheme highlightColor="#ABCDEA">
        {isWinned && <ReactConfetti />}
        <Title />
        {isLoaded ? (
          <BlankDisplayer
            info={word!}
            isWinned={isWinned}
            isLost={isLost}
            setLost={setLost}
            setWinned={setWinned}
          />
        ) : (
          <CardSkeleton />
        )}
        <Restart
          generateWord={GenerateWord}
          isWinned={isWinned}
          isLost={isLost}
          isLoaded={isLoaded}
        />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </SkeletonTheme>
    </main>
  );
}
