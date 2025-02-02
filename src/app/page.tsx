"use client";

import { ContributionChart } from "./components/log/ContributionChart";
import { useEffect, useState } from "react";
import { MainMenu } from "./components/log/MainMenu";
import { ActivityTerminal } from "./components/log/ActivityTerminal";
import { LogMessagePanel } from "./components/log/LogMessagePanel";
import React from "react";

export default function Home() {
  const [logState, setLogState] = useState<{ activeGoal: string, goals: Array<string>, goalModal: boolean, dateMap: any, activeDate: string }>
    ({ activeGoal: "", goals: [], dateMap: {}, goalModal: false, activeDate: "" });

  useEffect(() => {
    if (localStorage.getItem("logState")) {
      setLogState(JSON.parse(localStorage.getItem("logState") ?? ""));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("logState", JSON.stringify(logState));
  }, [logState]);



  const addGoal = (goal: string) => {
    setLogState((prev) => ({ ...prev, activeGoal: goal, goals: [...prev.goals, goal], goalModal: false }));
  }
  const setActiveGoal = (goal: string) => {
    setLogState((prev) => ({ ...prev, activeGoal: goal }));
  }
  const toggleGoalModal = () => {
    setLogState((prev) => ({ ...prev, goalModal: !prev.goalModal }));
  }
  const addLog = (dateKey: string, newActivity: { message: string, activity: string }) => {
    if (dateKey in logState.dateMap) {
      setLogState((prev) => ({ ...prev, dateMap: { ...prev.dateMap, [dateKey]: [...prev.dateMap[dateKey], newActivity] } }));
    } else {
      setLogState((prev) => ({ ...prev, dateMap: { ...prev.dateMap, [dateKey]: [newActivity] } }));
    }
  }
  const setActiveDate = (date: string) => {
    setLogState((prev) => ({ ...prev, activeDate: date }));
  }
  const setData = (data: any) => {
    const activities = {};
    for (const dateKey of Object.keys(data)) {
      for (const elems of data[dateKey]) {
        activities[elems.activity] = 1;
      }
    }
    setLogState((prev) => ({ ...prev, dateMap: data, goals: Object.keys(activities) }));
  }
  const deleteGoal = (goal: string) => {
    let newGoals = [...logState.goals];
    let index = -1;
    for (let i = 0; i < newGoals.length; i += 1) {
      if (goal === newGoals[i]) {
        index = i;
      }
    }
    delete newGoals[index];

    let newDateMap = { ...logState.dateMap };
    const objs = [];
    for (const dateKey of Object.keys(newDateMap)) {
      if (dateKey.split("|")[1] === goal) {
        //@ts-ignore
        objs.push(dateKey);
      }
    }
    for (const obj of objs) {
      delete newDateMap[obj];
    }
    setLogState((prev) => ({ ...prev, activeGoal: "", activeDate: "", goals: newGoals, dateMap: newDateMap }));
  }


  return (
    <div className="absolute top-0 left-0 flex flex-col items-center w-screen min-h-screen text-stone-800 bg-stone-50">
      <MainMenu goals={logState.goals} addGoal={addGoal} setActiveGoal={setActiveGoal} toggleGoalModal={toggleGoalModal} goalModal={logState.goalModal}
        activeGoal={logState.activeGoal} dateMap={logState.dateMap} setData={setData} />
      <div className="pt-24 flex flex-col space-y-6 items-center w-screen">
        {logState.goals.length > 0 && <ContributionChart dateMap={logState.dateMap} goal={logState.activeGoal} setActiveDate={setActiveDate} deleteGoal={deleteGoal} />}
        <div className="flex flex-col justify-center items-center w-screen">
          {logState.goals.length > 0 && <ActivityTerminal addLog={addLog} activeGoal={logState.activeGoal} />}
          {logState.activeDate !== "" && <LogMessagePanel messages={logState.dateMap[logState.activeDate]} />}
        </div>
      </div>
    </div>
  );
}
