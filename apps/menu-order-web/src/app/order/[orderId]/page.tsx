'use client'
import { useQuery } from '@apollo/client'
import { Button } from '@mantine/core'
import { gql } from '@me/graphql/__generated__'
import _ from 'lodash'
import { useParams } from 'next/navigation'

const qgql = gql(`
	query Query($where: JSON!) {
		MenuList(where: $where) {
			id
			createdAt
			updatedAt
			deletedAt
			name
			price
		}
	}
`)

export default function OrderPage() {
	const params = useParams()
	const orderId = params.orderId as string
	const { data } = useQuery(qgql, {
		variables: {
			where: {},
		},
	})
	const menuList = _.get(data, 'MenuList', [])

	return (
		<main className='container mx-auto p-4'>
			<p>Order ID: {orderId}</p>
			<Button>Said</Button>
			<div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4'>
				{_.map(menuList, (item) => (
					<div key={item.id} className='p-4 border rounded shadow'>
						<h3 className='text-lg font-semibold'>{item.name}</h3>
						<p className='text-gray-600'>Price: ${item.price}</p>
						<p className='text-gray-500'>Created At: {new Date(item.createdAt).toLocaleString()}</p>
						<p className='text-gray-500'>Updated At: {new Date(item.updatedAt).toLocaleString()}</p>
					</div>
				))}
			</div>
		</main>
	)
}
