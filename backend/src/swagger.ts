import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PhoneBook CRUD APP - SOAP HEALTH',
            version: '1.0.0',
            description: 'API developed for the SOAP HEALTH coding challenge',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerDefinition);

export default swaggerSpec;