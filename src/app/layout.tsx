import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Uizard Hackernews Reader',
	description: 'Frontend challenge created by Facundo Perez Montalvo'
}

async function LoadingItem() {
	return (
		<div className='grid items-center border-b border-r space-y-6 py-4 px-2 w-[384px]'>
			<div className='animate-pulse w-full'>
				<div className='h-2.5 w-full rounded-full bg-gray-300 '></div>
			</div>
			<div className='flex items-center w-full space-x-2 justify-between'>
				<div className='h-2.5 bg-gray-200 rounded-full w-36'></div>
				<div className='h-2.5 bg-gray-300 rounded-full w-28'></div>
			</div>
		</div>
	)
}

async function PostItem({ id }: { id: number }) {
	const post = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
	).then(
		res => res.json() as Promise<{ title: string; by: string; id: string }>
	)

	return (
		<li className='border-b border-r space-y-2 p-2'>
			<h1 className='truncate'>{post.title}</h1>
			<div className='flex justify-between'>
				<p className='opacity-50'>Posted by {post.by}</p>
				<button className=''>Visit website {'>>'}</button>
			</div>
		</li>
	)
}

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const posts = await fetch(
		`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&limitToFirst=10&orderBy="$key"`
	).then(res => res.json() as Promise<number[]>)

	return (
		<html lang='en' className='h-screen'>
			<body className='flex flex-col h-full'>
				<header>
					<nav className='w-full text-center bg-yellow-300 py-3'>
						<Link href='/'>Uizard Hackernews Reader</Link>
					</nav>
				</header>
				<main className='flex flex-row h-full overflow-hidden'>
					<aside className='max-w-sm overflow-y-auto'>
						<ul className='flex flex-col max-w-lg'>
							{posts.map(id => (
								<Link key={id} href={`/${id}`}>
									<Suspense fallback={<LoadingItem />}>
										<PostItem id={id} />
										{/* <LoadingItem /> */}
									</Suspense>
								</Link>
							))}
						</ul>
					</aside>
					<section className='flex-1 w-full max-h-screen flex flex-grow overflow-y-auto'>
						{children}
					</section>
				</main>
				<footer>
					<p className='text-center text-xs py-3'>
						Created with 🖤 by{' '}
						<Link href='https://www.facuperezm.com'>Facundo</Link>
					</p>
				</footer>
			</body>
		</html>
	)
}
