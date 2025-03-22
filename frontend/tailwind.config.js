/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          DEFAULT: '#8b5cf6', // Purple color used for active items
          light: '#a78bfa',
          dark: '#7c3aed',
        },

        // Background colors
        background: {
          DEFAULT: '#070d1f', // Main background color
          sidebar: '#0f1631', // Sidebar background
          card: '#111827',    // Card background
          hover: '#1f2937',   // Hover state background
        },

        // Text colors
        text: {
          DEFAULT: '#ffffff', // Default text color (white)
          muted: '#9ca3af',   // Muted text (gray-400)
          disabled: '#6b7280', // Disabled text
        },

        // Status colors
        status: {
          success: '#10b981', // Green for success/high values
          warning: '#eab308', // Yellow for warning/medium values
          error: '#ef4444',   // Red for errors/low values
          info: '#3b82f6',    // Blue for information
        },

        // Border colors
        border: {
          DEFAULT: '#1f2937', // Default border color
          dark: '#374151',    // Darker border
        },

        // Chart colors
        chart: {
          purple: '#8b5cf6',
          green: '#10b981',
          yellow: '#eab308',
          red: '#ef4444',
          blue: '#3b82f6',
          indigo: '#6366f1',
          pink: '#ec4899',
          orange: '#f97316',
        },
      },
      // Add any other theme extensions here
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}