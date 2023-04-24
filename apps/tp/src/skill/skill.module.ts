import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from '@tp/skill/entities/skill.entity';

@Module({
	imports: [TypeOrmModule.forFeature([SkillEntity])],
	controllers: [SkillController],
	providers: [SkillService],
	exports: [SkillService],
})
export class SkillModule {}
