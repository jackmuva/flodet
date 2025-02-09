/* eslint-disable  @typescript-eslint/no-explicit-any */
export const LogMessagePanel = (panelProps: { messages: Array<any> }) => {
	return (
		<div className="w-full flex flex-col items-center">
			<div className="flex w-full md:w-1/2 items-stretch space-x-1 min-h-10 h-fit">
				<div className="bg-slate-900 font-semibold text-green-300 p-2 rounded-lg border-2 w-5/6 h-fit">
					{panelProps.messages.map((message) => {
						return (
							<div key={message.message}>+ {message.message}</div>
						)
					})}
				</div>
			</div>

		</div >
	)
}
