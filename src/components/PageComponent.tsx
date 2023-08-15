export default async function PageComponent({
	searchParams
}: {
	searchParams: { item: string }
}) {
	const { result } = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${searchParams.item}.json?print=pretty`
	).then(
		res =>
			res.json() as Promise<{
				result: {
					by: string
					descendants: number
					id: number
					kids: number[]
					score: number
					time: number
					title: string
					type: string
					url: string
				}
			}>
	)
	console.log(result)
	return <iframe src={result.url} height='100%' width='100%'></iframe>
}
