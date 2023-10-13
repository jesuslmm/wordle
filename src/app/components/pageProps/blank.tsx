export default function Blanks({
  word,
  spaces,
  row,
  isGuessed,
}: {
  word: string;
  spaces: number;
  row: string;
  isGuessed: boolean;
}) {
  return (
    <div className="mb-2 flex">
      {new Array(spaces).fill("").map((_, i) => {
        const bgColor = !isGuessed
          ? "bg-white"
          : row[i] === word[i]
          ? "bg-green-500 animate-correctChar animate-once text-white"
          : word.includes(row[i])
          ? "bg-yellow-500 animate-correctChar animate-once text-white"
          : "bg-red-500 animate-shake animate-once text-white";

        return (
          <section
            className={`flex h-12 w-h-12 items-center justify-center border rounded-sm border-gray-400 
            font-bold uppercase  ${bgColor}`}
            key={i}
          >
            {row[i]}
          </section>
        );
      })}
    </div>
  );
}
