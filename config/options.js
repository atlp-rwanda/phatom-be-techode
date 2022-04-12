const baseUrl = process.env.SERVER_URL;
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Phantom - Techode',
			version: '1.0.0',
			description: 'Phantom backend API. Application that allows simulating bus movements and enabling passengers to track their locations & movements. (Backend).',
		},
		servers: [
			{
				url: baseUrl || `http://localhost:5000/`,
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