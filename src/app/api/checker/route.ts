const wordExists = require("word-exists");

export interface checker {
  word: string;
  try: string;
}

export async function POST(req: Request) {
  const data: checker = await req.json();

  const check = wordExists(data.try);

  if (check == false) {
    return new Response(JSON.stringify("doesn't exists"));
  }

  if (data.try == data.word) {
    return new Response(JSON.stringify(true));
  } else {
    return new Response(JSON.stringify(false));
  }
}
