"use client";

import { useAtom } from "jotai";
import { playerStatAtom } from "@/atoms/footballAtoms";

export default function PlayerCard({
  player,
}: {
  player: { id: number; name: string };
}) {
  const [stats, setStats] = useAtom(playerStatAtom(player.id));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-bold">{player.name}</h3>
      <div className="flex justify-between mt-2">
        <div>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
            onClick={() =>
              setStats((prev) => ({ ...prev, goals: prev.goals + 1 }))
            }
          >
            Goal ⚽
          </button>
          <span>Goals: {stats.goals}</span>
        </div>
        <div>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded mr-2"
            onClick={() =>
              setStats((prev) => ({ ...prev, assists: prev.assists + 1 }))
            }
          >
            Assist 🎯
          </button>
          <span>Assists: {stats.assists}</span>
        </div>
      </div>
    </div>
  );
}
