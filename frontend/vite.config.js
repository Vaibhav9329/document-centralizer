import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
<<<<<<< HEAD
  plugins: [react(), tailwindcss()],
})
=======
  plugins: [
    react(),
    tailwindcss(),
  ],
  //  base: '/dist/'
})
>>>>>>> 9e453f3 (feat(user): implement user module with dashboard and document management)
