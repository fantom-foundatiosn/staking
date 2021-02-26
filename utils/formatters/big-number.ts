import BaseBigJS from 'big.js';
import toformat from 'toformat';
import { ethers } from 'ethers';

const BigJS = toformat(BaseBigJS);
export type Big = typeof BigJS;

const PRECISION = 4;

export function toFixed(a: any, b: any, precision?: number): string {
	if (isZero(toBig(a)) || isZero(toBig(b))) {
		return '0';
	}
	return toBig(a)
		.div(toBig(b))
		.toFormat(precision ?? PRECISION);
}

export function formatUnits(a: any, decimals: number, precision?: number): string {
	return toFixed(a, toBig(10).pow(decimals), precision);
}

export function isZero(a: any): boolean {
	return toBig(a).eq(toBig('0'));
}

export function toBig(n: any): Big {
	return new BigJS(n.toString());
}

export function toEthersBig(a: any, b: number): ethers.BigNumber {
	return ethers.utils.parseUnits(a.div(Math.pow(10, b)).toString(), b);
}
