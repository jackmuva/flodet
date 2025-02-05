/* eslint-disable  @typescript-eslint/no-explicit-any */
export const VerticalChart = (chartProps: { goal: string, monthLabels: Array<any>, dayBoxes: Array<any>, yearButtons: Array<any>, deleteGoal: (goal: string) => void }) => {

	const numColumns = Math.ceil(chartProps.dayBoxes.length / 53);

	return (
		<div className="shadow-sm overflow-x-auto overflow-y-hidden w-full border-2 rounded-lg pt-4 relative">
			<div className="text-2xl font-bold mb-4 ml-4">{chartProps.goal}</div>
			<div className="flex justify-between px-4">
				<div className="flex justify-center basis-4/5">
					<div className="flex flex-col pr-2 mt-1 space-y-[79px] justify-start">
						{chartProps.monthLabels}
					</div>
					<div className="flex flex-col items-start justify-start mt-1">
						<div className={`grid grid-rows-53 gap-1 `}
							style={{ gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))` }}>
							{chartProps.dayBoxes}
						</div>
					</div>
				</div>
				<div className="flex flex-col text-center justify-center basis-1/5 space-y-0.5 min-h-full h-fit overflow-y-auto">
					{chartProps.yearButtons}
				</div>

			</div>
			<button className="text-[11px] bg-red-400 font-semibold rounded-md hover:bg-red-600 text-white p-1 absolute bottom-2 right-3"
				onClick={() => chartProps.deleteGoal(chartProps.goal)}>
				Delete Activity
			</button>
			<div className="text-stone-50"> hi  </div>
		</div >

	)
}
