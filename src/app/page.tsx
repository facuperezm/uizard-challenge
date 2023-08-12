'use client'
import Link from 'next/link'
import React from 'react'

function fetcher() {
	return fetch(
		`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
	)
		.then(res => res.json())
		.then(data => data.splice(0, 10))
}

async function itemFetcher(item: number) {
	const res = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
	)
	const data = await res.json()
	return data
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
		<main className='flex p-6'>
			<aside className='flex flex-col gap-8 max-w-sm'>
				{items.map(item => {
					return (
						<div key={item.id}>
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
			<section className='flex-1 max-w-xl'>
				{selectedItem ? (
					<iframe src={selectedItem} height='100%' width='100%'></iframe>
				) : (
					<h1>Nothing selected</h1>
				)}
			</section>
		</main>
	)
}
