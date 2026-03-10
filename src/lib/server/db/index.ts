import type { Platform } from '../../../app';
import { local_db } from './local';
import { d1 } from '$lib/server/db/d1';
import type { DBType } from '../../../types';

const isLocalEnvironment = () => {
    //undefined can happens running migrations locally
    if( typeof (import.meta.env.MODE) === 'undefined' || import.meta.env.MODE === 'development'){
        return true;
    }
    return false;
}

export const db = (platform: Platform): DBType => {
    if (isLocalEnvironment()) {
        return local_db();
    }
    else {
        return d1(platform);
    }
}


