import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { ReadRoleDto } from './dtos/read-role-dto';
import { plainToClass } from 'class-transformer';
import { CreateRoleDto } from './dtos';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository
    ){}

    async get(id: number): Promise<ReadRoleDto>{
        if(!id){
            throw new BadRequestException("ID must be send");
        }

        const role = await this._roleRepository.findOne(id, {
            where: {status: 'active'},
        });

        if(!role){
            throw new NotFoundException("Role does not exist");
        }

        return plainToClass(ReadRoleDto, role);
    }

    async getAll(): Promise<ReadRoleDto[]>{
        
        const roles: Role[] = await this._roleRepository.find({
            where: {status: 'active'},
        });

        return roles.map((role: Role)=>plainToClass(ReadRoleDto,role));
    }

    async createRole(role: Partial<CreateRoleDto>): Promise<ReadRoleDto>{
        const savedRole: Role = await this._roleRepository.save(role);
        return plainToClass(ReadRoleDto, savedRole);
    }

    async updateRole(id: number, role: Partial<ReadRoleDto>): Promise<ReadRoleDto>{
        const foundRole = await this._roleRepository.findOne(id, {
            where: {
                status: 'active'
            }
        });

        if(!foundRole){
            throw new NotFoundException('This role does not exist');
        }

        foundRole.name = role.name;
        foundRole.description = role.description;

        const updateRole = await this._roleRepository.save(foundRole);

        await this._roleRepository.update(id, role);    

        return plainToClass(ReadRoleDto, updateRole);
    }

    async deleteRole(id: number): Promise<void>{
        const roleExists = await this._roleRepository.findOne(id, {where: {status: "active"}});
        
        if(!roleExists){
            throw new NotFoundException();
        }

        await this._roleRepository.update(id, {status: "inactive"});
    }
}
