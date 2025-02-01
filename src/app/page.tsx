"use client";

import { ContributionChart } from "./components/log/ContributionChart";
import { useState } from "react";
import { MainMenu } from "./components/log/MainMenu";
import { ActivityTerminal } from "./components/log/ActivityTerminal";

export default function Home() {
  const [logState, setLogState] = useState<{ activeGoal: string, goals: Array<string>, goalModal: boolean, dateMap: any }>
    ({ activeGoal: "", goals: [], dateMap: {}, goalModal: false });


  const addGoal = (goal: string) => {
    setLogState((prev) => ({ activeGoal: goal, goals: [...prev.goals, goal], goalModal: false, dateMap: prev.dateMap }));
  }
  const setActiveGoal = (goal: string) => {
    setLogState((prev) => ({ ...prev, activeGoal: goal }));
  }
  const toggleGoalModal = () => {
    setLogState((prev) => ({ ...prev, goalModal: !prev.goalModal }));
  }
  const addLog = (dateKey: string, newActivity: { message: string, activity: string }) => {
    setLogState((prev) => ({ ...prev, dateMap: { ...prev.dateMap, [dateKey]: newActivity } }));
  }


  console.log(logState.dateMap);
  return (
    <div className="absolute top-0 left-0 flex flex-col items-center w-screen min-h-screen text-stone-800 bg-stone-50">
      <MainMenu goals={logState.goals} addGoal={addGoal} setActiveGoal={setActiveGoal} toggleGoalModal={toggleGoalModal} goalModal={logState.goalModal}
        activeGoal={logState.activeGoal} />
      <div className="pt-32 flex flex-col space-y-6 items-center w-screen">
        {logState.goals.length > 0 && <ActivityTerminal addLog={addLog} activeGoal={logState.activeGoal} />}
        {logState.goals.length > 0 && <ContributionChart dateMap={logState.dateMap} goal={logState.activeGoal} />}
      </div>
    </div>
  );
}
