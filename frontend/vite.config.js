import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    
    server: {
        port: 3000, // 使用するポート番号を指定
        proxy: {
            '/api': {
                target: 'http://localhost:8000/',
                changeOrigin: true,
            },


        },
        
    },
})