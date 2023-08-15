export default async function PageComponent({
	searchParams
}: {
	searchParams: { search: string }
}) {
	const result = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${searchParams.search}.json?print=pretty`
	).then(res => res.json() as any)
	return <iframe src={result.url} height='100%' width='100%'></iframe>
}
