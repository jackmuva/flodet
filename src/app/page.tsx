"use client";
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { ContributionChart } from "./components/log/ContributionChart";
import { useEffect, useState } from "react";
import { MainMenu } from "./components/log/MainMenu";
import { ActivityTerminal } from "./components/log/ActivityTerminal";
import { LogMessagePanel } from "./components/log/LogMessagePanel";
import React from "react";
import Image from "next/image";

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
    setLogState((prev) => ({ ...prev, activeGoal: goal, activeDate: "", goals: [...prev.goals, goal], goalModal: false }));
  }
  const setActiveGoal = (goal: string) => {
    setLogState((prev) => ({ ...prev, activeDate: "", activeGoal: goal }));
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
    const activities: any = {};
    for (const dateKey of Object.keys(data)) {
      for (const elems of data[dateKey]) {
        activities[elems.activity] = 1;
      }
    }
    setLogState((prev) => ({ ...prev, dateMap: data, activeDate: "", activeGoal: "", goals: Object.keys(activities) }));
  }
  const deleteGoal = (goal: string) => {
    const newGoals = [...logState.goals];
    let index = -1;
    for (let i = 0; i < newGoals.length; i += 1) {
      if (goal === newGoals[i]) {
        index = i;
      }
    }
    newGoals.splice(index, 1);

    const newDateMap = { ...logState.dateMap };
    const objs = [];
    for (const dateKey of Object.keys(newDateMap)) {
      if (dateKey.split("|")[1] === goal) {
        objs.push(dateKey);
      }
    }
    for (const obj of objs) {
      delete newDateMap[obj];
    }
    setLogState((prev) => ({ ...prev, activeGoal: "", activeDate: "", goals: newGoals, dateMap: newDateMap }));
  }

  return (
    <div className="absolute top-0 left-0 flex flex-col items-center w-screen min-h-screen pb-20 text-stone-800 bg-stone-50">
      <MainMenu goals={logState.goals} addGoal={addGoal} setActiveGoal={setActiveGoal} toggleGoalModal={toggleGoalModal} goalModal={logState.goalModal}
        activeGoal={logState.activeGoal} dateMap={logState.dateMap} setData={setData} />
      <div className="pt-20 flex flex-col space-y-6 items-center w-screen">
        <div className="flex flex-col justify-center items-center w-screen">
          {logState.goals.length > 0 && logState.activeGoal !== "" && <ActivityTerminal addLog={addLog} activeGoal={logState.activeGoal} />}
          {logState.activeDate !== "" && logState.activeGoal !== "" && <LogMessagePanel messages={logState.dateMap[logState.activeDate]} />}
        </div>
        {logState.goals.length > 0 && logState.activeGoal !== "" && <ContributionChart dateMap={logState.dateMap} goal={logState.activeGoal} setActiveDate={setActiveDate} deleteGoal={deleteGoal} />}

        {logState.goals.length === 0 && <div className="w-11/12 md:w-fit">
          <div className="font-bold text-3xl">Flodet: Chart your activities</div>
          <div className="text-lg"> Inspired by Github&apos;s contribution chart, log any activity with a short message and start tracking your activities </div>
          <Image className={"place-self-center"} height={200} width={900} src={"/gh-chart.png"} alt="gh contibution chart" />
          <div className="text-lg">All data is kept locally in your browser session <strong className="mx-1">(clearing the browser&apos;s local data will clear your data)</strong></div>
          <div className="text-lg">Save your data by clicking
            <strong className="mx-1 border-b-2 text-sm">Save Progress</strong>
            in the toolbar to create a save file on your computer and
            <strong className="mx-1 border-b-2 text-sm">Import Save File</strong> to resume
          </div>
          <span className="text-lg">Hit the
            <button onClick={() => toggleGoalModal()} className="px-2 py-2 mx-1 bg-green-100 rounded-md text-sm font-bold text-stone-800 hover:bg-green-200">
              + Add Activiy
            </button>
            here or in the toolbar to get started
          </span>
        </div>}
      </div>
    </div>
  );
}
