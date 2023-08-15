'use client'

import React from 'react'

export default function PageComponent({ children, ...derived }: any) {
	return (
		<form action='/item'>
			<button {...derived}>{children}</button>
		</form>
	)
}
