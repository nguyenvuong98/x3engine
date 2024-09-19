import { Module } from '@nestjs/common';
import { GroupRolesService } from './group-roles.service';
import { GroupRolesController } from './group-roles.controller';

@Module({
  providers: [GroupRolesService],
  controllers: [GroupRolesController]
})
export class GroupRolesModule {}
