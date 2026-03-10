import { drizzle } from "drizzle-orm/d1";
import type { Platform } from "../../../../app";
import * as schema from './schema/index';
import {CLOUDFLARE_D1_NAME} from '$env/static/private';



export const setD1Binding = (platform: Platform) => {
    if(!platform) {
        throw new Error('Platform is not provided. Adapter cloudflare is required.');
    }
    if (!platform.env.DB) {
        throw new Error(`D1 database binding "DB" is not found`); 
    } 
    else {
        return platform.env.DB;
    }
}

export const d1 = (platform: Platform):ReturnType<typeof drizzle<typeof schema>> => {
    return drizzle(platform.env.DB, { schema });

}