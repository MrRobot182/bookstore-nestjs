import { Controller, Get, Post, Param, Body, Patch, Delete, ParseIntPipe} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { ReadRoleDto } from './dtos/read-role-dto';
import { CreateRoleDto, UpdateRoleDto } from './dtos';

@Controller('roles')
export class RoleController {
    constructor(private readonly _roleService: RoleService){}

    @Get(':id')
    getRole(@Param('id', ParseIntPipe) id:number): Promise<ReadRoleDto>{
        return this._roleService.get(id);
    }

    @Get()
    getRoles(): Promise<ReadRoleDto[]>{
        return this._roleService.getAll();    
    }

    @Post()
    createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto>{
        return  this._roleService.createRole(role);   
    }

    @Patch(':id')
    updateRole(@Param('id', ParseIntPipe) id: number, @Body() role: Partial<UpdateRoleDto>){
        return this._roleService.updateRole(id, role);
    }

    @Delete(':id')
    deleteRole(@Param('id', ParseIntPipe) id: number){
        return this._roleService.deleteRole(id);
    }
}
