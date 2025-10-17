import { defineConfig } from 'vite';
import reactSWC from '@vitejs/plugin-react-swc'; // Usando o plugin SWC
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    reactSWC(),
    federation({
      name: 'mf_auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthButtons': './src/components/AuthButtons.tsx',
        './AuthContext': './src/context/AuthContext.tsx',
        './firebase': './src/firebase.ts',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5001,
  },
});
