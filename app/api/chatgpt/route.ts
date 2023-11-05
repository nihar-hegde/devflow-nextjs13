import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a knowledgeable assistant that provides quality information all things mainly about coding and software development of all kinds you are a total software development guru. ",
          },
          {
            role: "user",
            content: `Tell me ${question}`,
          },
        ],
      }),
    });
    const respnseData = await response.json();
    const reply = respnseData.choices[0].message.content;
    console.log(reply);
    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
