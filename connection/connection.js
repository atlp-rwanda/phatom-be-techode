import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserSchema } from '../models/user.js';
import dotenv from "dotenv"

dotenv.config();
export const source = new DataSource({
	type: 'postgres',
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	synchronize: true,
	logging: false,
	migrations: ['../database/migrations/**/*.ts'],
	subscribers: ['../database/subscribers/**/*.ts'],
	entities: [UserSchema],
	cli: {
		migrationsDir: '../migration/',
	},
});

export default source;