'use client'
type ItemProps = {
	url: string
}
export default function Item({ url }: ItemProps) {
	return (
		<div>
			<iframe height={500} width={800} src={url} frameborder='10'></iframe>
		</div>
	)
}
