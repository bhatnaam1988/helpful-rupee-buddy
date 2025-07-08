
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	safelist: [
		// Force generate all fintech classes
		'bg-fintech-primary',
		'bg-fintech-secondary', 
		'bg-fintech-accent',
		'text-fintech-primary',
		'text-fintech-secondary',
		'text-fintech-text-primary',
		'text-fintech-text-secondary',
		'text-fintech-text-tertiary',
		'from-fintech-primary',
		'to-fintech-primary-light',
		'from-fintech-secondary',
		'to-fintech-secondary-light',
		'from-fintech-accent',
		'to-fintech-accent-light',
		'shadow-fintech',
		'shadow-fintech-lg'
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Direct HSL Fintech Colors - No CSS Variables
				fintech: {
					primary: {
						DEFAULT: '248 78% 62%',
						dark: '247 80% 58%',
						light: '253 91% 68%',
					},
					secondary: {
						DEFAULT: '158 64% 52%',
						dark: '158 80% 40%',
						light: '158 64% 62%',
					},
					accent: {
						DEFAULT: '24 95% 53%',
						dark: '24 94% 50%',
						light: '24 95% 63%',
					},
					surface: {
						DEFAULT: '210 40% 98%',
						elevated: '0 0% 100%',
					},
					text: {
						primary: '220 26% 14%',
						secondary: '215 20% 55%',
						tertiary: '215 20% 65%'
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out'
			},
			boxShadow: {
				'fintech': '0 4px 20px -2px rgba(99, 102, 241, 0.1)',
				'fintech-lg': '0 8px 40px -4px rgba(99, 102, 241, 0.15)',
				'success': '0 4px 20px -2px rgba(16, 185, 129, 0.1)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
