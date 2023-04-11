import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BasicEntity {
	@CreateDateColumn({
		type: 'timestamp',
		update: false,
	})
	createdAt: string;

	@UpdateDateColumn({
		type: 'timestamp',
	})
	updatedAt: string;

	@DeleteDateColumn({
		type: 'timestamp',
		insert: false,
		nullable: true,
	})
	deletedAt: string;
}
