import {
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export abstract class BasicEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

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
