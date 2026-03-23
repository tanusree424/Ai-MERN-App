import { useState } from 'react'

import ReactFlow from "reactflow"
import { Background, Controls } from "reactflow";
import ReactMarkdown from "react-markdown";
import "reactflow/dist/style.css"
import axios from "axios";
import { serverURL } from './main';
import Swal from 'sweetalert2';
const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "Enter your question" },
    type: "input",
  },
  {
  id: "2",
  position: { x: 600, y: 100 },
  data: { label: "Answer will appear here" },
  style: {
    width: "auto",
    height: "auto",
    padding: 0,
    border: "none", // default border remove
    background: "transparent"
  }
}
];

const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2"
  }
];
function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("")
  

  const runFlow = async () => {
    try {
      setLoading(true);

      const res = await axios.post(`${serverURL}/ai/ask-ai`, {
        prompt: input
      });

      const answer = res.data.answer;
      console.log(res.data.answer)
      setAnswer(res.data.answer);
      setQuestion(input);

      setNodes((nds) =>
        nds.map((node) => {
          //  Question node update
          if (node.id === "1") {
            return {
              ...node,
              data: {
                ...node.data,
                label: (
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-4 rounded-2xl shadow-xl w-[280px] border-none">
                    <p className="text-xs opacity-80 mb-1">Your Question</p>
                    <p className="font-medium">{input}</p>
                  </div>
                )
              }
            };
          }

          //  Answer node update
          if (node.id === "2") {
            return {
              ...node,
              data: {
                ...node.data,
                label: (
                  <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl w-[360px] border border-gray-200">

                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-500">AI Response</span>
                    </div>

                    <div className={`"max-h-full" : "max-h-[180px] overflow-y-auto"} pr-2 custom-scroll`}>
                      <ReactMarkdown>{answer}</ReactMarkdown>
                    </div>

                   

                  </div>
                )
              }
            };
          }

          return node;
        })
      );

      setInput("");

    } catch (error) {
      console.log(error?.message);
      alert("Error Fetching AI RESPONSE");
    } finally {
      setLoading(false);
    }
  };

  const saveChat = async () => {
    try {
      await axios.post(`${serverURL}/ai/save`, {
        prompt: question,
        response: answer
      });
      Swal.fire({
        title:"Success!",
        text:"Data Saved",
        icon:"success",
        
        
        timer:3000
      })
    } catch (error) {
      alert("Failed to save DB")
      console.log(error?.response?.data?.message || error?.message)
    }
  }

return (
  <div className="h-screen flex flex-col md:flex-row bg-gray-100">

    {/* Sidebar / Top Panel */}
    <div className="w-full md:w-80 bg-white shadow-md p-4 flex flex-col gap-3 border-b md:border-r z-10">

      <h1 className="text-lg md:text-xl font-bold text-blue-600 text-center">
        AI Flow
      </h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask anything..."
        className="w-full h-24 md:h-40 p-2 md:p-3 text-sm md:text-base border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={runFlow}
        className="bg-blue-500 active:scale-95 hover:bg-blue-600 cursor-pointer text-white py-2 rounded-lg text-sm md:text-base transition"
      >
        {loading ? "Thinking..." : "Run Flow"}
      </button>

      <button
        onClick={saveChat}
        className="bg-green-500 active:scale-95 cursor-pointer hover:bg-green-600 text-white py-2 rounded-lg text-sm md:text-base transition"
      >
        Save Chat
      </button>

    </div>

    {/* Flow Area */}
    <div className="flex-1 relative overflow-hidden">

      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100"></div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        panOnDrag
        zoomOnScroll
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background />
        <Controls />
      </ReactFlow>

    </div>
  </div>
);
}

export default App
