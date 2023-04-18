import {
	BaseEntity,
	CreateDateColumn,
	DeleteDateColumn,
	ObjectLiteral,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ICommon } from '@common/interfaces/common.inerface';

export abstract class CommonEntity
	extends BaseEntity
	implements ObjectLiteral, ICommon
{
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
