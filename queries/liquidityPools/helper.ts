import { pageResults } from 'synthetix-data';

const uniswapV2SubgraphURL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';
const CRVTokenAddress = '0xd533a949740bb3306d119cc777fa900ba034cd52';
const balancerSubgraphURL = 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer';
const sTSLAPoolTokenAddress = '0x055db9aff4311788264798356bbf3a733ae181c6';

export async function getCurveTokenPrice(): Promise<number> {
	return pageResults({
		api: uniswapV2SubgraphURL,
		query: {
			entity: 'tokenDayDatas',
			selection: {
				orderBy: 'id',
				orderDirection: 'desc',
				where: {
					token: `\\"${CRVTokenAddress}\\"`,
				},
			},
			properties: ['priceUSD'],
		},
		max: 1,
		// @ts-ignore
	}).then((result) => {
		return Number(result[0].priceUSD);
	});
}

export async function getsTSLABalancerPool(): Promise<any> {
	return pageResults({
		api: balancerSubgraphURL,
		query: {
			entity: 'pools',
			selection: {
				orderBy: 'id',
				orderDirection: 'desc',
				where: {
					id: `\\"${sTSLAPoolTokenAddress}\\"`,
				},
			},
			properties: ['id', 'liquidity', 'totalShares'],
		},
		max: 1,
		// @ts-ignore
	}).then((result) => {
		return Number(result[0].liquidity) / Number(result[0].totalShares);
	});
}
