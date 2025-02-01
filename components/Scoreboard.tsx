"use client";

import { useAtom } from "jotai";
import { matchScoreAtom, resetAllAtom } from "@/atoms/footballAtoms";

export default function Scoreboard() {
  const [score, dispatch] = useAtom(matchScoreAtom);
  const [, resetAll] = useAtom(resetAllAtom);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Match Score</h2>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={resetAll}
        >
          Reset All 🔄
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-blue-100 p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Home</h3>
          <div className="text-3xl">{score.home}</div>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Away</h3>
          <div className="text-3xl">{score.away}</div>
          <button
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => dispatch("awayGoal")}
          >
            Away Goal +
          </button>
        </div>
      </div>
    </div>
  );
}
