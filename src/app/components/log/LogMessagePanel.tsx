export const LogMessagePanel = (panelProps: { messages: Array<any> }) => {
	console.log(panelProps.messages);
	return (
		<div className="w-full flex flex-col items-center">
			<div className="flex w-full md:w-1/2 items-stretch space-x-1 h-10">
				<div className="bg-slate-900 font-semibold text-green-300 p-2 rounded-lg border-2 w-full h-fit">
					{panelProps.messages.map((message) => {
						return (
							<div>+ {message.message}</div>
						)
					})}
				</div>
			</div>

		</div >
	)
}
