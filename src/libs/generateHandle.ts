import { paramCase } from 'param-case';
import { remove as removeAccents } from 'remove-accents';

export function generateHandle(title: string) {
	return paramCase(removeAccents(title)).replace(/\-+/g, '-');
}
