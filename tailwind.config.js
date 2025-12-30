/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your Brand Colors
        navy: {
          DEFAULT: "#002a4b",
          50: "#f0f6fa",
          100: "#e0ebf5",
          900: "#002a4b",
        },
        gold: {
          DEFAULT: "#d09b2c",
        },
        lavender: {
          DEFAULT: "#9391c7",
        },
        
        // Mappings for the UI Components (shadcn/ui compatibility)
        border: "hsl(var(--border))",
        input: "#e2e8f0", // slate-200
        ring: "#002a4b",  // Your navy color for focus rings
        background: "#ffffff",
        foreground: "#0f172a", // slate-900
        primary: {
          DEFAULT: "#002a4b",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f1f5f9",
          foreground: "#0f172a",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f8fafc", // slate-50
          foreground: "#64748b", // slate-500
        },
        accent: {
          DEFAULT: "#f1f5f9",
          foreground: "#0f172a",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
    },
  },
  plugins: [],
}