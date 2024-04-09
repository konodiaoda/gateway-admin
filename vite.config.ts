import {ConfigEnv, defineConfig, loadEnv, UserConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {wrapperEnv} from "./src/utils/getEnv";
import svgr from "vite-plugin-svgr";
import {resolve} from "path";

export default defineConfig((mode: ConfigEnv): UserConfig => {
    const env = loadEnv(mode.mode, process.cwd());
    const viteEnv = wrapperEnv(env);

    return {
        resolve: {
            alias: {
                "@": resolve(__dirname, "./src")
            }
        },
        base: viteEnv.VITE_PUBLIC_URL,
        // global css
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                }
            }
        },
        // server config
        server: {
            host: "0.0.0.0", // allow external access
            port: viteEnv.VITE_PORT,
            open: viteEnv.VITE_OPEN,
            cors: true,
            proxy: {
                "/api": {
                    target: "http://127.0.0.1:4523/m1/3838577-0-default", // postman mock
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, "")
                }
            }
        },
        // plugins
        plugins: [
            react(), svgr()
        ],
        esbuild: {
            pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
        },
        // build configure
        build: {
            outDir: "dist",
            minify: "esbuild",
            // minify: "terser",
            // terserOptions: {
            // 	compress: {
            // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
            // 		drop_debugger: true
            // 	}
            // },
            rollupOptions: {
                output: {
                    // Static resource classification and packaging
                    chunkFileNames: "assets/js/[name]-[hash].js",
                    entryFileNames: "assets/js/[name]-[hash].js",
                    assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
                }
            }
        }
    };
});
