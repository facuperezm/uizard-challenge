'use client'
import React from 'react'

async function fetcher() {
	const res = await fetch(
		`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
	)
	return await res.json()
}

async function itemFetcher(item: number) {
	const res = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
	)
	return await res.json()
}

export interface Story {
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

export default function Home() {
	const [items, setItems] = React.useState<Story[]>([])
	const [selectedItem, setSelectedItem] = React.useState<string | null>(null)
	console.log(selectedItem)
	React.useEffect(() => {
		async function fetchData() {
			const topStoryIds = await fetcher()
			const data = await Promise.all(
				topStoryIds.map((item: string) => itemFetcher(item as any))
			)
			setItems(data)
		}
		fetchData()
	}, [])

	return (
		<main className='flex'>
			<aside className='flex flex-col max-w-md overflow-auto'>
				{items.map(item => {
					return (
						<div key={item.id} className='border p-2'>
							<h1>{item.title}</h1>
							<div className='flex'>
								<p className='opacity-50'>Posted by {item.by}</p>
								<button
									className='ml-auto'
									value={item.url}
									onClick={event => setSelectedItem(event.target.value)}
								>
									Visit website {'>>'}{' '}
								</button>
							</div>
						</div>
					)
				})}
			</aside>
			<section className='flex-1'>
				{selectedItem ? (
					<div className='w-full h-screen'>
						<iframe src={selectedItem} height='100%' width='100%'></iframe>
					</div>
				) : (
					<h1>Nothing selected</h1>
				)}
			</section>
		</main>
	)
}
