import { BaseEntity, EntitySchema } from 'typeorm';

export class User extends BaseEntity {
	id;
	fullname;
	username;
	password;
}

export const UserSchema = new EntitySchema({
	name: 'User',
	tableName: 'User',
	target: User,
	columns: {
		id: {
			primary: true,
			generated: true,
			type: 'int',
		},
		fullname: {
			type: 'varchar',
		},
		username: {
			type: 'varchar',
		},
		password: {
			type: 'varchar'
		},
	},
});

export default User