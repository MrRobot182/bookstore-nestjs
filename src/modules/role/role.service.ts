import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository
    ){}

    async get(id: number): Promise<Role>{
        if(!id){
            throw new BadRequestException("ID must be send");
        }

        const role = await this._roleRepository.findOne(id, {
            where: {status: 'active'},
        });

        if(!role){
            throw new NotFoundException("Role does not exist");
        }

        return role;
    }

    async getAll(): Promise<Role[]>{
        
        const roles: Role[] = await this._roleRepository.find({
            where: {status: 'active'},
        });

        return roles;
    }

    async createRole(role: Role){
        const savedRole: Role = await this._roleRepository.save(role);
        return savedRole;
    }

    async updateRole(id: number, role: Role): Promise<void>{
        await this._roleRepository.update(id, role);    
    }

    async deleteRole(id: number): Promise<void>{
        const roleExists = await this._roleRepository.findOne(id, {where: {status: "active"}});
        
        if(!roleExists){
            throw new NotFoundException();
        }

        await this._roleRepository.update(id, {status: "inactive"});
    }
}
