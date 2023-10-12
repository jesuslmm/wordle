import Skeleton from "react-loading-skeleton";

export default function CardSkeleton() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-3 -mt-48">
      {new Array(5).fill("").map((_, i) => (
        <Skeleton key={i} height={50} width={300} />
      ))}
    </div>
  );
}
