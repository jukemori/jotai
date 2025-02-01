import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

type Player = {
  id: number;
  name: string;
  position: string;
};

type PlayerStats = {
  goals: number;
  assists: number;
};

// Atom Family for individual player stats
export const playerStatAtom = atomFamily((playerId: number) =>
  atom<PlayerStats>({ goals: 0, assists: 0 }),
);

// Base atoms
export const startingXIAtom = atom<Player[]>([
  { id: 1, name: "Messi", position: "FW" },
  { id: 2, name: "Ronaldo", position: "FW" },
  { id: 3, name: "Mbappe", position: "FW" },
]);

// Derived read-only atom
export const totalGoalsAtom = atom((get) => {
  const players = get(startingXIAtom);
  return players.reduce((sum, player) => {
    return sum + get(playerStatAtom(player.id)).goals;
  }, 0);
});

// Add new atom for away score
export const awayScoreAtom = atom(0);

// Remove the first matchScoreAtom declaration and keep only this one
export const matchScoreAtom = atom(
  (get) => ({
    home: get(totalGoalsAtom),
    away: get(awayScoreAtom),
  }),
  (_get, set, update: "reset" | "awayGoal") => {
    if (update === "reset") {
      const players = _get(startingXIAtom);
      players.forEach((player) => {
        set(playerStatAtom(player.id), { goals: 0, assists: 0 });
      });
      set(awayScoreAtom, 0);
    } else if (update === "awayGoal") {
      set(awayScoreAtom, (prev) => prev + 1);
    }
  },
);

// Reset all functionality
export const resetAllAtom = atom(null, (_get, set) => {
  set(matchScoreAtom, "reset");
  set(startingXIAtom, [
    { id: 1, name: "Messi", position: "FW" },
    { id: 2, name: "Ronaldo", position: "FW" },
    { id: 3, name: "Mbappe", position: "FW" },
  ]);
});
