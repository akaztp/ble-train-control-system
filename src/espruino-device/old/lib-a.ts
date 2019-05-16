import { fnB } from './lib-b';

export function fnA() {
    console.log('Here fnA');
    fnB();
}
