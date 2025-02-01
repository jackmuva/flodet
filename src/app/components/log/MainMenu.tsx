import { useState } from "react";
import { GoalModal } from "./GoalModal";

export const MainMenu = (menuProps: { goals: Array<string>, activeGoal: string, goalModal: boolean, toggleGoalModal: () => void, addGoal: (goal: string) => void, setActiveGoal: (goal: string) => void }) => {

	const goalTabs = menuProps.goals.map((goal) => {
		return (
			<button className={menuProps.activeGoal !== goal ? "px-2 py-0.5 rounded-md bg-neutral-200 hover:bg-neutral-300" :
				"font-bold px-2 py-0.5 rounded-md bg-neutral-400 hover:bg-neutral-300"}
				onClick={() => menuProps.setActiveGoal(goal)}>
				{goal}
			</button>
		)
	});



	return (
		<div className="sticky w-11/12 md:w-1/2 border-2 bg-neutral-100 top-10 h-32 rounded-md  shadow-lg flex items-center p-4 justify-between">
			<div className="flex w-5/6 justify-start items-center ">
				<div className="flex flex-col justify-center items-center min-w-36">
					<div className="font-bold text-2xl">
						Flodet
					</div>
					<div className="text-sm text-center">
						Locally kept logs
					</div>
					<button onClick={() => menuProps.toggleGoalModal()} className="px-2 py-2 mt-2 bg-green-100 rounded-md text-sm font-bold text-stone-800 hover:bg-green-200">
						+ Add Activiy
					</button>

				</div>
				<div className={"flex pace-x-2 flex-wrap"}>
					{menuProps.goalModal && <GoalModal toggleGoalModal={menuProps.toggleGoalModal} addGoal={menuProps.addGoal} />}
					<div className="flex flex-wrap gap-2">
						{goalTabs}
					</div>
				</div>
			</div>
			<div className="w-1/6 pl-2 flex flex-col space-y-2 justify-center items-center h-full py-2 border-l-2">
				<button onClick={() => { }} className="text-[11px] font-bold hover:text-stone-400 border-b-2 border-stone-300">
					Import Save File
				</button>
				{menuProps.goals.length > 0 &&
					<button onClick={() => { }} className="text-[11px] font-bold hover:text-stone-400 border-b-2 border-stone-300">
						Save Progress
					</button>
				}
			</div>

		</div>

	);
}
