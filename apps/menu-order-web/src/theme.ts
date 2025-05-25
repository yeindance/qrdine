'use client'
import { Button, MantineThemeOverride } from '@mantine/core'

const theme: MantineThemeOverride = {
	primaryColor: 'blue',
	fontFamily: 'var(--font-nunito), sans-serif',
	fontFamilyMonospace: 'var(--font-nunito), monospace',
	headings: {
		fontFamily: 'var(--font-nunito), sans-serif',
	},

	components: {
		Button: Button.extend({
			defaultProps: {},
			styles(theme) {
				return {
					root: {
						borderRadius: theme.radius.xs,
						borderWidth: 1.5,
						fontWeight: 700,
					},
				}
			},
		}),
	},
}

export default theme
