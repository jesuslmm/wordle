"use client";

import { useState, useRef, useEffect } from "react";

export default function BlankDisplayer({
  data,
}: {
  data: [string, number] | [];
}) {
  const [otp, setOtp] = useState<string[]>();
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const [isFetched, setIsFetched] = useState(false);

  let currentOtp = 0;

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  useEffect(() => {
    setOtp(new Array(data[1]).fill(""));
  }, [data]);

  setTimeout(() => {
    // Set the isFetched state to false
    setIsFetched(true);
  }, 1200); // 1.2 second

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const newOTP: string[] = [...otp!];
    newOTP[currentOtp] = value;

    if (value) {
      setActiveOTPIndex(currentOtp + 1);
      setOtp(newOTP);
    }
  };

  const handleDelete = () => {
    const newOTP: string[] = [...otp!];
    if (currentOtp == otp!.length - 1) {
      newOTP[currentOtp + 1] = "";
    }
    newOTP[currentOtp] = "";
    setActiveOTPIndex(currentOtp - 1);
  };

  const SetBlanks = () => {
    const blanks: any = [];

    otp?.map((_, index) => {
      return blanks.push(
        <input
          key={index}
          ref={index === activeOTPIndex ? inputRef : null}
          className="border-2 w-14 h-14 m-0.5 text-center"
          type="text"
          maxLength={1}
          onChange={(e) => handleAdd(e)}
          onKeyDown={(e) => {
            currentOtp = index;
            console.log(currentOtp);
            if (e.key == "Backspace" || e.key == "Delete") {
              handleDelete();
            }
          }}
        ></input>
      );
    });

    return blanks;
  };

  if (!isFetched) {
    return <p>loading...</p>;
  }
  return (
    <div>
      {SetBlanks()}
      <p>{data[0]}</p>
    </div>
  );
}
