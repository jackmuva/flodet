/* eslint-disable  @typescript-eslint/no-explicit-any */
import { GoalModal } from "./GoalModal";
import { useRef } from "react";
import React from "react";

export const MainMenu = (menuProps: {
	goals: Array<string>, activeGoal: string, goalModal: boolean, toggleGoalModal: () => void,
	addGoal: (goal: string) => void, setActiveGoal: (goal: string) => void, dateMap: any, setData: (data: any) => void
}) => {

	const goalTabs = menuProps.goals.map((goal) => {
		return (
			<button key={goal} className={menuProps.activeGoal !== goal ? "px-2 py-0.5 rounded-md bg-neutral-200 hover:bg-neutral-300" :
				"font-bold px-2 py-0.5 rounded-md bg-neutral-400 hover:bg-neutral-300"}
				onClick={() => menuProps.setActiveGoal(goal)}>
				{goal}
			</button>
		)
	});

	const convertDataToCsv = (data: any) => {
		let res = ""
		res += "date, activity, message, \n";
		for (const dateKey of Object.keys(data)) {
			for (const log of data[dateKey]) {
				res += dateKey.split("|")[0].toString() + "," + log.activity.toString() + "," + log.message.toString() + ", \n";
			}
		}
		return res;
	}

	const convertCsvToData = (csv: string) => {
		const res: any = {}
		const rows = csv.split("\n");
		let first = true;
		for (const row of rows) {
			if (first) {
				first = false;
				continue;
			}
			const elems = row.split(",");
			if (elems.length < 3) {
				continue;
			} else if (elems[0].toString() + "|" + elems[1].toString() in res) {
				res[elems[0].toString() + "|" + elems[1].toString()] = [...res[elems[0].toString() + "|" + elems[1].toString()], { activity: elems[1], message: elems[2] }];
			} else {
				res[elems[0].toString() + "|" + elems[1].toString()] = [{ activity: elems[1], message: elems[2] }];
			}
		}
		menuProps.setData(res);
	}


	const saveFile = async () => {
		const rawCsv = convertDataToCsv(menuProps.dateMap);
		const file = new Blob([rawCsv ?? ""], { type: "text/csv" });
		const handle = await showSaveFilePicker({ suggestedName: "flodet-logs.csv" });
		const writer = await handle.createWritable();
		await writer.write(file);
		await writer.close();
	}

	const csvFile = useRef<HTMLInputElement | null>(null);

	const uploadCsv = () => {
		csvFile.current?.click();
	}

	const handleCsv = (event: any) => {
		const file = event.target.files[0];
		const fileReader = new FileReader();

		fileReader.readAsDataURL(file)
		fileReader.onload = () => {
			const csv = window.atob(fileReader.result?.toString().split(",")[1] ?? "");
			convertCsvToData(csv);
		}
	}

	return (
		<div className="sticky w-11/12 md:w-1/2 border-2 bg-neutral-100 top-10 h-32 rounded-md  shadow-lg flex items-center p-4 justify-between ">
			<div className="flex w-5/6 justify-start items-center h-full">
				<div className="flex flex-col justify-center items-center min-w-36">
					<div className="font-bold text-2xl">
						Flodet
					</div>
					<div className="text-sm text-center">
						Locally kept logs
					</div>
					<button onClick={() => menuProps.toggleGoalModal()} className="px-2 py-2 mt-2 bg-green-100 rounded-md text-sm font-bold text-stone-800 hover:bg-green-200">
						+ Add Activity
					</button>

				</div>
				<div className={"flex pace-x-2 flex-wrap h-full overflow-y-scroll"}>
					{menuProps.goalModal && <GoalModal toggleGoalModal={menuProps.toggleGoalModal} addGoal={menuProps.addGoal} />}
					<div className="flex flex-wrap gap-2 ">
						{goalTabs}
					</div>
				</div>
			</div>
			<div className="w-1/6 pl-2 flex flex-col space-y-2 justify-center items-center h-full py-2 border-l-2">
				<button onClick={() => uploadCsv()} className="text-[11px] font-bold hover:text-stone-400 border-b-2 border-stone-300">
					Import Save File
				</button>
				{menuProps.goals.length > 0 &&
					<button onClick={() => saveFile()} className="text-[11px] font-bold hover:text-stone-400 border-b-2 border-stone-300">
						Save Progress
					</button>
				}
				<input type="file" id="csvFile" style={{ display: 'none' }} ref={csvFile} accept="text/csv" onChange={handleCsv} />
			</div>

		</div>

	);
}
