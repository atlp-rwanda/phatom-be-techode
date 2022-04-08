const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Phantom - Techode',
			version: '1.0.0',
			description: 'Phantom backend Express Library API',
		},
		servers: [
			{
				url: `http://localhost:5000/`,
			},
            {
				url: `http://phantom-back-ch-config--n1ewma.herokuapp.com/`,
			}
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					in: 'header',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: [
		'./routes/**/*.js'
	],
};

export default options