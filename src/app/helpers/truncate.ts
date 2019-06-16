import { take } from 'ramda';
export const truncate = (text: string, length: number) => text ? `${take(length, text)}${text.length > length ? '...' : ''}` : '';
