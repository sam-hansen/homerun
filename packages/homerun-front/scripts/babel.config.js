module.exports = function (api) {
	api.cache(false);

	const presets = [
		[
			"@babel/env",
			{
				targets: {
					node: "12.13.0",
				},
			},
		],
	];
	return {
		presets,
	};
};
