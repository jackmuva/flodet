/* eslint-disable  @typescript-eslint/no-explicit-any */
export const HorizontalChart = (chartProps: { goal: string, monthLabels: Array<any>, dayBoxes: Array<any>, yearButtons: Array<any>, deleteGoal: (goal: string) => void }) => {

	const numColumns = Math.ceil(chartProps.dayBoxes.length / 7);

	return (
		<div className="shadow-sm overflow-x-auto w-screen md:w-fit border-2 rounded-lg pb-10 pt-4 pl-6 pr-4 relative">
			<div className="flex space-x-4 items-start">
				<div className="flex flex-col ">
					<div className="text-2xl font-bold mb-4 ml-4">{chartProps.goal}</div>
					<div className="flex text-sm pl-5 space-x-11">
						{chartProps.monthLabels}
					</div>
					<div className={`grid grid-rows-7 gap-1 grid-flow-col`}
						style={{ gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))` }}>
						{chartProps.dayBoxes}
					</div>
				</div>
				<div className="flex flex-col space-y-0.5 min-h-full h-fit overflow-y-auto">
					{chartProps.yearButtons}
				</div>
			</div>
			<button className="text-[11px] bg-red-400 font-semibold rounded-md hover:bg-red-600 text-white p-1 absolute bottom-2 right-3"
				onClick={() => chartProps.deleteGoal(chartProps.goal)}>
				Delete Activity
			</button>
		</div >

	)
}
