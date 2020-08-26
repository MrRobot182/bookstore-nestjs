import { Controller, Get, Post, Param, Body, Patch, Delete, ParseIntPipe, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';

@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService){}

    @Get(':id')
    @Roles('GENERAL')
    @UseGuards(AuthGuard(), RoleGuard)
    async getUser(@Param('id', ParseIntPipe) id:number): Promise<User>{
        const user = await this._userService.get(id);
        return user;
    }

    @UseGuards(AuthGuard())
    @Get()
    async getUsers(){
        const users = await this._userService.getAll();
        return users;
    }

    @Post('create')
    async createUser(@Body() user: User): Promise<User>{
        const createdUser = await this._userService.createUser(user); 
        return createdUser;  
    }

    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User){
        const updatedUser = await this._userService.updateUser(id, user);
        return updatedUser;
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number){
        await this._userService.deleteUser(id);
        return true;        
    }

    @Post('set-role/:userId/:roleId')
    async setRoleToUser(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('roleId', ParseIntPipe) roleId: number
    ) {
        return this._userService.setRoleToUser(userId, roleId);
    }
}
