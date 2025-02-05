/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useState } from "react";
import React from "react";
import { HorizontalChart } from "./Charts/HorizontalChart";
import { VerticalChart } from "./Charts/VerticalChart";

export const ContributionChart = (data: { dateMap: any, goal: string, setActiveDate: (date: string) => void, deleteGoal: (goal: string) => void }) => {
	const [year, setYear] = useState<number>(new Date().getFullYear());

	const getDaysArray = function(start: string, end: string) {
		const arr = [];
		for (const dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
			arr.push(new Date(dt));
		}
		return arr;
	};

	const getYearArray = (years: Array<number>) => {
		const minVal = Math.min(...years);
		const arr = [];
		for (let y = minVal; y < new Date().getFullYear(); y += 1) {
			arr.push(y);
		}
		return arr;
	}

	const dayArray = getDaysArray(year + "-01-02", (year + 1) + "-01-01");
	const dayBoxes = dayArray.map((day: Date) => {
		const hasActivity = (day.toDateString() + "|" + data.goal) in data.dateMap;
		if (hasActivity) {
			console.log(day);
		}
		return (
			<div key={day.toISOString()} className="group relative">
				{hasActivity && <div onClick={() => data.setActiveDate(day.toDateString() + "|" + data.goal)}
					className={"cursor-pointer h-5 w-5 md:h-3 md:w-3 bg-green-500 rounded-sm"} />
				}
				{!hasActivity && <div className={"h-5 w-5 md:h-3 md:w-3 bg-gray-200 rounded-sm"} />
				}
				<div className="z-20 absolute w-fit min-w-24 bottom-full left-1/2 transform -translate-x-1/2 mb-2 
					hidden group-hover:block bg-gray-800 text-white text-sm rounded px-2 py-1">
					{day.toDateString()}
				</div>
			</div >
		)
	});

	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const monthLabels = months.map((mon: string) => {
		return (<div key={mon}> {mon} </div>)
	});

	const years = Object.keys(data.dateMap).map((date: string) => {
		return new Date(date.split("|")[0]).getFullYear();
	});
	const yearArray = getYearArray(years);
	yearArray.push(new Date().getFullYear());
	const yearButtons = yearArray.map((yr: number) => {
		return (
			<button key={yr} className={year === yr ? "text-center py-1 px-6 rounded-sm bg-stone-300 text-sm text-black hover:bg-stone-300" :
				"text-center py-1 px-6 rounded-sm bg-stone-100 text-sm text-black hover:bg-stone-300"}
				onClick={() => setYear(yr)}>
				{yr}
			</button>
		)
	});


	return (
		<>
			<div className="hidden md:block">
				<HorizontalChart goal={data.goal} dayBoxes={dayBoxes} monthLabels={monthLabels} yearButtons={yearButtons} deleteGoal={data.deleteGoal} />
			</div>
			<div className="block md:hidden w-11/12 h-fit">
				<VerticalChart goal={data.goal} dayBoxes={dayBoxes} monthLabels={monthLabels} yearButtons={yearButtons} deleteGoal={data.deleteGoal} />
			</div>
		</>
	);
}
