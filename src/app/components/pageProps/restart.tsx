export default function Restart({
  generateWord,
  isWinned,
  isLost,
  isLoaded,
}: {
  generateWord: () => void;
  isWinned: boolean;
  isLost: boolean;
  isLoaded: boolean;
}) {
  const btnColor =
    isWinned && isLoaded
      ? "bg-green-500 hover:bg-green-600"
      : isLost && isLoaded
      ? "bg-red-500 hover:bg-blue-500"
      : isLoaded && !isLost && !isWinned
      ? "bg-blue-500 hover:bg-red-500"
      : "bg-blue-500 cursor-progress";

  const text = isWinned ? "Play again" : "Restart";

  return (
    <>
      <button
        className={`flex justify-center m-auto -mt-24 lg:-mt-52 border-2 
        px-8 py-3 rounded-md text-lg text-white font-semibold
        hover:scale-105 hover:text-xl transition-all ${btnColor}`}
        onClick={() => generateWord()}
      >
        {!isLoaded ? (
          <>
            <svg
              className=" -ml-8 animate-spin"
              fill="none"
              height="28"
              viewBox="0 0 48 48"
              width="48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              />
            </svg>
            Loading...
          </>
        ) : (
          text
        )}
      </button>
    </>
  );
}
