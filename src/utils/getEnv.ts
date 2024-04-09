import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import {Recordable, ViteEnv} from "@/typings/global";

export function isDevFn(mode: string): boolean {
    return mode === "development";
}

export function isProdFn(mode: string): boolean {
    return mode === "production";
}

/**
 * Whether to generate package preview
 */
export function isReportMode(): boolean {
    return process.env.VITE_REPORT === "true";
}

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Recordable): ViteEnv {
    const ret: any = {};

    for (const envName of Object.keys(envConf)) {
        let realName = envConf[envName].replace(/\\n/g, "\n");
        realName = realName === "true" ? true : realName === "false" ? false : realName;

        if (envName === "VITE_PORT") {
            realName = Number(realName);
        }
        if (envName === "VITE_PROXY") {
            try {
                realName = JSON.parse(realName);
            } catch (error) {
                console.log(error);
            }
        }
        ret[envName] = realName;
        process.env[envName] = realName;
    }
    return ret;
}

/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param confFiles ext
 */
export function getEnvConfig(match = "VITE_GLOB_", confFiles = [".env", ".env.production"]) {
    let envConfig = {};
    confFiles.forEach(item => {
        try {
            const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));
            envConfig = {...envConfig, ...env};
        } catch (error) {
            console.error(`Error in parsing ${item}`, error);
        }
    });

    Object.keys(envConfig).forEach(key => {
        const reg = new RegExp(`^(${match})`);
        if (!reg.test(key)) {
            Reflect.deleteProperty(envConfig, key);
        }
    });
    return envConfig;
}

/**
 * Get user root directory
 * @param dir file path
 */
export function getRootPath(...dir: string[]) {
    return path.resolve(process.cwd(), ...dir);
}

/**
 *
 */
export function getPath() {
    let path = ''
    const metaUrl = new URL(import.meta.url) // 获取当前模块的 URL
    const metaUrlMatch = metaUrl.pathname.match(/^(.*?)\/src\//) // 匹配src前面的路径
    if (metaUrlMatch && metaUrlMatch[1])
        path = metaUrlMatch[1]
    return path
}
