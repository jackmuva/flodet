import { useState } from "react";

export const ActivityTerminal = (termProps: { activeGoal: string, addLog: (dateKey: string, newActivity: { message: string, activity: string }) => void }) => {
	const [message, setMessage] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	}

	const handleSubmit = () => {
		termProps.addLog(new Date().toDateString() + "|" + termProps.activeGoal, { message: message, activity: termProps.activeGoal });
		setMessage("");
	}

	return (
		<div className="w-full flex flex-col items-center">
			<div className="flex w-full md:w-1/2 items-stretch space-x-1 h-10">
				<input type="text" className="bg-slate-900 text-blue-200 placeholder-gray-400 p-2 rounded-lg border-2 w-5/6 h-full"
					placeholder="Log your activity with a commit message" onChange={handleChange} value={message}
				/>
				<button className="font-bold text-sm rounded-lg bg-green-600 px-8 text-white hover:bg-green-500 h-full"
					onClick={handleSubmit}>
					Log
				</button>
			</div>

		</div >
	);
}
