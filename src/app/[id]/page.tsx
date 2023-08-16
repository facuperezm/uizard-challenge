export default async function IdPage({
	params: { id }
}: {
	params: { id: string }
}) {
	const post = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
	).then(res => res.json() as Promise<{ url: string; title: string }>)
	return <iframe src={post.url} title={post.title} className='w-full h-full' />
}
