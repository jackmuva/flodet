/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useState } from "react";
import React from "react";

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
		return (
			<div key={day.toISOString()} className="group relative">
				{hasActivity && <div onClick={() => data.setActiveDate(day.toDateString() + "|" + data.goal)}
					className={"cursor-pointer h-3 w-3 bg-green-500 rounded-sm"} />
				}
				{!hasActivity && <div className={"h-3 w-3 bg-gray-200 rounded-sm"} />
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
			<button key={yr} className="py-1 px-6 rounded-sm bg-stone-100 text-sm text-black hover:bg-stone-300"
				onClick={() => setYear(yr)}>
				{yr}
			</button>
		)
	});

	const numColumns = Math.ceil(dayArray.length / 7);

	return (
		<div className="shadow-sm overflow-x-auto w-screen md:w-fit border-2 rounded-lg pb-10 pt-4 pl-6 pr-4 relative">
			<div className="flex space-x-4 items-start">
				<div className="flex flex-col ">
					<div className="text-2xl font-bold mb-4 ml-4">{data.goal}</div>
					<div className="flex text-sm pl-5 space-x-11">
						{monthLabels}
					</div>
					<div className={`grid grid-rows-7 gap-1 grid-flow-col`}
						style={{ gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))` }}>
						{dayBoxes}
					</div>
				</div>
				<div className="flex flex-col space-y-0.5 min-h-full h-fit overflow-y-auto">
					{yearButtons}
				</div>
			</div>
			<button className="text-[11px] bg-red-400 font-semibold rounded-md hover:bg-red-600 text-white p-1 absolute bottom-2 right-3"
				onClick={() => data.deleteGoal(data.goal)}>
				Delete Activity
			</button>
		</div >
	);
}
