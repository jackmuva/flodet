"use client";

import { useState } from "react";
import { Log } from "./components/log/Log";

export default function Home() {
  const [page, setPage] = useState<string>("log");

  return (
    <div className="absolute top-0 left-0 flex items-center w-screen min-h-screen border-2 text-stone-800 bg-stone-50">
      <div className="flex flex-col space-y-8 basis-1/6 min-h-screen items-center 
        text-green-950 justify-center border-stone-200 border-r-2 bg-green-50">
        <div className="flex flex-col justify-center items-center space-y-0">
          <div className="text-2xl font-bold flex flex-col justify-end p-0 m-0">
            Flodet
          </div>
          <div className="text-sm">
            Keep your data local
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <button className="font-bold hover:text-green-500" onClick={() => setPage("log")}>
            Log
          </button>
          <button className="font-bold hover:text-green-500" onClick={() => setPage("journal")}>
            Journal
          </button>
        </div>
      </div>
      <div className="basis-5/6">
        {page === "log" &&
          <Log />
        }
      </div>
    </div>
  );
}
