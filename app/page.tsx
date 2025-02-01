"use client";

import { useAtomValue } from "jotai";
import { startingXIAtom } from "@/atoms/footballAtoms";
import PlayerCard from "@/components/PlayerCard";
import Scoreboard from "@/components/Scoreboard";

export default function SoccerDashboard() {
  const startingXI = useAtomValue(startingXIAtom);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Football Match Dashboard
      </h1>

      <Scoreboard />

      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Players</h2>
        {startingXI.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}
