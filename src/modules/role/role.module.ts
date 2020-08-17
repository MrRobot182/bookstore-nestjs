import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports: [TypeOrmModule.forFeature([RoleRepository]), SharedModule],
    providers: [RoleService],
    controllers: [RoleController]
})
export class RoleModule {}
