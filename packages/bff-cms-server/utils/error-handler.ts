import moment from 'moment';
import { error } from './logger';

async function handleErr(err: any, caugthBy: string): Promise<any> {
    const currTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    error('\n%s %s %s\n', currTime, caugthBy, err.stack || err.message || err);
}

export { handleErr };
