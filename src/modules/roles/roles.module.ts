import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Roles, RolesSchema } from './roles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Roles.name, schema: RolesSchema }])
  ],
  providers: [RolesService, RolesRepository],
  controllers: [RolesController]
})
export class RolesModule {}
