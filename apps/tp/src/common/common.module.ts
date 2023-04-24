import { Global, Module } from '@nestjs/common';
import constants from '../constants';
import { v4 } from 'uuid';
import * as errorMessages from './error-messages';

@Global()
@Module({
	providers: [
		{
			provide: constants.uuid,
			useValue: v4,
		},
		{
			provide: constants.error_messages,
			useValue: errorMessages,
		},
	],
	exports: [constants.uuid, constants.error_messages],
})
export class CommonModule {}
