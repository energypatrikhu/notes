export function compareNumbers(a: any, b: any) {
	if (a === b) {
		return 0;
	}

	const nV1 = parseInt(a);
	const nV2 = parseInt(b);

	if (nV1 > nV2) {
		return 1;
	} else if (nV1 < nV2) {
		return -1;
	}

	return 0;
}
