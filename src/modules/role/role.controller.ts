import { Controller, Get, Post, Param, Body, Patch, Delete, ParseIntPipe} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';

@Controller('roles')
export class RoleController {
    constructor(private readonly _roleService: RoleService){}

    @Get(':id')
    async getRole(@Param('id', ParseIntPipe) id:number): Promise<Role>{
        const role = await this._roleService.get(id);
        return role;
    }

    @Get()
    async getRoles(){
        const roles = await this._roleService.getAll();
        return roles;
    }

    @Post()
    async createRole(@Body() role: Role): Promise<Role>{
        const createdRole = await this._roleService.createRole(role); 
        return createdRole;  
    }

    @Patch(':id')
    async updateRole(@Param('id', ParseIntPipe) id: number, @Body() role: Role){
        await this._roleService.updateRole(id, role);
        return true;
    }

    @Delete(':id')
    async deleteRole(@Param('id', ParseIntPipe) id: number){
        await this._roleService.deleteRole(id);
        return true;        
    }
}
