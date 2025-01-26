import { useState } from "react";
import { ContributionChart } from "./ContributionChart";
import { GoalModal } from "./GoalModal";

export const Log = () => {
	const [logState, setLogState] = useState<{ activeGoal: string, goals: Array<string>, goalModal: boolean }>
		({ activeGoal: "", goals: [], goalModal: false });

	const toggleGoalModal = () => {
		setLogState((prev) => ({ ...prev, goalModal: !prev.goalModal }));
	}

	const addGoal = (goal: string) => {
		setLogState((prev) => ({ activeGoal: goal, goals: [...prev.goals, goal], goalModal: false }));
	}

	const setActiveGoal = (goal: string) => {
		setLogState((prev) => ({ ...prev, activeGoal: goal }));
	}

	const goalTabs = logState.goals.map((goal) => {
		return (
			<button className="px-2 py-1 rounded-md bg-neutral-200 hover:bg-neutral-400"
				onClick={() => setActiveGoal(goal)}>
				{goal}
			</button>
		)
	});

	return (
		<div className="flex flex-col justify-center items-center">
			<div className={logState.goals.length === 0 ? "flex space-x-2 border-2 h-72 bg-neutral-100 w-1/2 rounded-lg justify-center items-center" :
				"flex space-x-2 mb-2"}>
				<button onClick={() => toggleGoalModal()} className="px-4 py-1 bg-green-600 rounded-md text-white hover:bg-green-500">
					+ Add Activiy
				</button>
				<div className="flex flex-col justify-center items-center border-2 rounded-md bg-neutral-100 px-4 py-2">
					<button onClick={() => { }} className="text-sm hover:-translate-y-0.5 border-b-2 border-stone-400 px-1">
						Import Data
					</button>
					{logState.goals.length > 0 &&
						<button onClick={() => { }} className="text-sm hover:-translate-y-0.5 border-b-2 border-stone-400 px-1">
							Save Data
						</button>
					}
				</div>
				{logState.goalModal && <GoalModal toggleGoalModal={toggleGoalModal} addGoal={addGoal} />}
			</div>
			<div className="flex w-5/6 mb-1 space-x-2">
				{goalTabs}
			</div>
			{logState.goals.length > 0 && <ContributionChart dateMap={{}} goal={logState.activeGoal} />}
		</div>
	);
}
