import { useState } from "react";

export const GoalModal = (goalProps: { toggleGoalModal: () => void, addGoal: (goal: string) => void }) => {
	const [activity, setActivity] = useState<string>("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActivity(e.target.value);
	}

	return (
		<div className="fixed w-80 md:w-1/4 h-1/4 border-2 rounded-md bg-stone-200 flex flex-col space-y-2 justify-center items-center">
			<button onClick={() => goalProps.toggleGoalModal()} className="hover:font-bold m-1 absolute top-0 left-0">
				X
			</button>
			<div className="flex space-x-2 items-center justify-center">
				<label>Activity:</label>
				<input type="text" className="py-1 px-2 rounded-md border-2 border-stone-400"
					onChange={handleInputChange} />
			</div>
			<button className="rounded-md py-1 px-4 bg-stone-800 text-white hover:bg-stone-600"
				onClick={() => goalProps.addGoal(activity)}>
				Add
			</button>
		</div>

	)
}
