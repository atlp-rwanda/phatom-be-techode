import { BaseEntity, EntitySchema } from 'typeorm';

class ResetToken extends BaseEntity {
	token;

	expiration;

	checkValid = () => {
		const token = this;
		const now = new Date().getTime();
		return new Date(token.expiration).getTime() > now;
	};
}

export const ResetTokenSchema = new EntitySchema({
	target: ResetToken,
	name: 'ResetToken',
	tableName: 'ResetToken',
	columns: {
		id: {
			primary: true,
			generated: true,
		},
		token: {
			type: 'varchar',
			require: true,
			unique: true,
		},
		expiration: {
			type: 'timestamp with time zone',
		},
	},
	relations: {
		user: {
			target: 'User',
			type: 'one-to-one',
			joinColumn: true,
			eager: true,
			onDelete: 'CASCADE',
		},
	},
});

export default ResetToken;