import Link from 'next/link'

export default function ItemsMap({ items }: any) {
	return (
		<div>
			{items ? (
				items.map(item => {
					return (
						<div key={item.id}>
							<h1>{item.title}</h1>
							<p className='opacity-50'>Posted by {item.by}</p>
							{/* <Link href={item.url}>Visit website {'>>'} </Link> */}
						</div>
					)
				})
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}
