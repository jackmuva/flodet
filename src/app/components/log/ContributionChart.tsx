export const ContributionChart = () => {
	const getDaysArray = function(start: string, end: string) {
		const arr = [];
		for (const dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
			arr.push(new Date(dt));
		}
		return arr;
	};

	const dayArray = getDaysArray("2024-01-02", "2025-01-01");
	const dayBoxes = dayArray.map((day: Date) => {
		return (
			<div key={day.toISOString()} className="h-3 w-3 bg-stone-200 rounded-sm" />
		)
	});
	const numColumns = Math.ceil(dayArray.length / 7);
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const monthLabels = months.map((mon: string) => {
		return (
			<div>
				{mon}
			</div>
		)
	});
	return (
		<div>
			<div className="flex flex-col border-2 rounded-md py-4 px-8">
				<div className="flex text-sm pl-5 space-x-11">
					{monthLabels}
				</div>
				<div className={`grid grid-rows-7 gap-1`}
					style={{ gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))` }}>
					{dayBoxes}
				</div>
			</div>
		</div >
	);
}
