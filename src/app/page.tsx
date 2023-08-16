"use client"
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { useEffect, useState } from 'react'; // import useEffect and useState

const chat = new ChatOpenAI({
  maxTokens: 25,
  // streaming: true,
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
});

async function getResponse() {
  const res = await chat.call(
    [new HumanMessage("北京的首都在哪里？")],{
      // callbacks: [
      //   {
      //     handleLLMNewToken(token: string) {
      //       // console.log({ token });
      //       streamedResponse += token;
      //       //return streamRespnse
      //     },
      //   },
      // ],
    }
  );
  console.log({ res });
  return res
}


export default function Home() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getResponse();
      setResponse(res);
    }

    fetchData();
  }, []); // Empty dependency array means this useEffect will only run once, similar to componentDidMount

  return (
    <div>
      <h1>{response ? response.content : 'Loading...'}</h1>
    </div>
  )
}

