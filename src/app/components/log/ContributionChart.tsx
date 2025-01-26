import { useState } from "react";

export const ContributionChart = (data: { dateMap: any }) => {
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
		for (let y = minVal; y <= new Date().getFullYear(); y += 1) {
			arr.push(y);
		}
		return arr;
	}

	const dayArray = getDaysArray(year + "-01-02", (year + 1) + "-01-01");
	const dayBoxes = dayArray.map((day: Date) => {
		return (
			<div key={day.toISOString()} className="h-3 w-3 bg-stone-200 rounded-sm" />
		)
	});

	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const monthLabels = months.map((mon: string) => {
		return (<div key={mon}> {mon} </div>)
	});

	const years = Object.keys(data.dateMap).map((date: string) => {
		return new Date(date).getFullYear();
	});
	const yearArray = getYearArray(years);
	yearArray.push(new Date().getFullYear());
	const yearButtons = yearArray.map((yr: number) => {
		return (
			<button key={yr} className="py-1 px-6 rounded-sm bg-stone-100 text-sm text-black">
				{yr}
			</button>
		)
	});

	const numColumns = Math.ceil(dayArray.length / 7);

	return (
		<div className="border-2 rounded-lg py-6 pl-6 pr-4">
			<div className="flex space-x-4 items-start">
				<div className="flex flex-col ">
					<div className="flex text-sm pl-5 space-x-11">
						{monthLabels}
					</div>
					<div className={`grid grid-rows-7 gap-1 grid-flow-col`}
						style={{ gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))` }}>
						{dayBoxes}
					</div>
				</div>
				<div className="flex flex-col h-full">
					{yearButtons}
				</div>
			</div>
		</div >
	);
}
