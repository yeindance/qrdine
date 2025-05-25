'use client'
import { useParams } from 'next/navigation'

export default function OrderPage() {
	const params = useParams()
	const orderId = params.orderId as string

	return (
		<main className='container mx-auto p-8'>
			<h1 className='text-2xl font-bold mb-4 bg-red-300'>Order Details</h1>
			<p>Order ID: {orderId}</p>
		</main>
	)
}
