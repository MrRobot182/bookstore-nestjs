import { Controller, Get, Post, Param, Body, Patch, Delete, ParseIntPipe} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService){}

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id:number): Promise<UserDto>{
        const user = await this._userService.get(id);
        return user;
    }

    @Get()
    async getUsers(){
        const users = await this._userService.getAll();
        return users;
    }

    @Post('create')
    async createUser(@Body() user: User): Promise<UserDto>{
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
}