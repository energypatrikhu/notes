export function parseSearchParams(searchParams: URLSearchParams) {
	const params: { [key: string]: string | Array<string> } = {};

	for (let [key, value] of searchParams.entries()) {
		if (key.endsWith('[]')) {
			key = key.slice(0, -2);

			if (key in params) {
				(params[key] as Array<string>).push(value);
			} else {
				params[key] = [value];
			}
		} else {
			params[key] = value;
		}
	}

	return params;
}
