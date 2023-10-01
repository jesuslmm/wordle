interface Word {
  word: string;
}

export default async function GetName() {
  const res = await fetch("https://api.api-ninjas.com/v1/randomword?=", {
    headers: {
      "X-Api-Key": "WKGZg4Vj/kNl5mz8j+iVnw==UYQEpLlZt1VMY6fJ",
      "Content-Type": "application/json",
    },
  });

  const info: Word = await res.json();

  const chars = info.word.length;

  const response: [string, number] = [info.word, chars];

  return response;
}
