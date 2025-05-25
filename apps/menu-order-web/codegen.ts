import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	schema: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:5050/graphql',
	documents: ['src/**/*.tsx', 'src/**/*.ts'],
	generates: {
		'./src/graphql/__generated__/': {
			preset: 'client',
			plugins: [],
			presetConfig: {
				gqlTagName: 'gql',
			},
		},
	},
	ignoreNoDocuments: true,
}

export default config
