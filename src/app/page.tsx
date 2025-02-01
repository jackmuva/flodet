"use client";

import { ContributionChart } from "./components/log/ContributionChart";
import { useState } from "react";
import { MainMenu } from "./components/log/MainMenu";

export default function Home() {
  const [logState, setLogState] = useState<{ activeGoal: string, goals: Array<string> }>
    ({ activeGoal: "", goals: [] });


  const addGoal = (goal: string) => {
    setLogState((prev) => ({ activeGoal: goal, goals: [...prev.goals, goal], goalModal: false }));
  }

  const setActiveGoal = (goal: string) => {
    setLogState((prev) => ({ ...prev, activeGoal: goal }));
  }

  return (
    <div className="absolute top-0 left-0 flex flex-col items-center w-screen min-h-screen text-stone-800 bg-stone-50">
      <MainMenu goals={logState.goals} addGoal={addGoal} setActiveGoal={setActiveGoal} />
      <div className="pt-32">
        {logState.goals.length > 0 && <ContributionChart dateMap={{}} goal={logState.activeGoal} />}
      </div>
    </div>
  );
}
