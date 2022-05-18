import _ka from './ka';
import _en from './en';

interface IKey {
    [key: string]: any;
}

export const ka_ge = 'ka-GE';
export const en_us = 'en-US';

export const ka = 'ka';
export const en = 'en';

const translateList: IKey = {
     ka: _ka, en: _en
}

export default translateList