import { Global, Module } from '@nestjs/common';
import constants from '../constants';
import { v4 } from 'uuid';

@Global()
@Module({
	providers: [
		{
			provide: constants.uuid,
			useValue: v4,
		},
	],
	exports: [constants.uuid],
})
export class CommonModule {}
