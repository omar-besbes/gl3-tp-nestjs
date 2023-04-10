import { CreateDateColumn, Entity } from 'typeorm';

@Entity()
export class BasicEntity {
	@CreateDateColumn({
		type: 'timestamp',
		update: false,
	})
	createdAt: string;

	@CreateDateColumn({
		type: 'timestamp',
	})
	updatedAt: string;

	@CreateDateColumn({
		type: 'timestamp',
	})
	deletedAt: string;
}
