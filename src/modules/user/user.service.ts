import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MapperService } from '../../shared/mapper.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserDetails } from './user.details.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        private readonly _mapperService: MapperService
    ){}

    async get(id: number): Promise<UserDto>{
        if(!id){
            throw new BadRequestException("ID must be send");
        }

        const user = await this._userRepository.findOne(id, {
            where: {status: 'active'},
        });

        if(!user){
            throw new NotFoundException("User does not exist");
        }

        return this._mapperService.map<User, UserDto>(user, new UserDto());
    }

    async getAll(): Promise<UserDto>{
        
        const users: User[] = await this._userRepository.find({
            where: {status: 'active'},
        });

        return this._mapperService.mapCollection<User, UserDto>(users, new UserDto());
    }

    async createUser(user: User){
        const details = new UserDetails();
        user.details = details;
        const repo = await getConnection().getRepository(Role); 
        const defaultRole = await repo.findOne({where: {name: 'GENERAL'}});
        user.roles = [defaultRole];

        const savedUser: User = await this._userRepository.save(user);
        return this._mapperService.map<User, UserDto>(savedUser, new UserDto());
    }

    async updateUser(id: number, user: User): Promise<void>{
        await this._userRepository.update(id, user);    
    }

    async deleteUser(id: number): Promise<void>{
        const userExists = await this._userRepository.findOne(id, {where: {status: "active"}});
        if(!userExists){
            throw new NotFoundException();
        }

        await this._userRepository.update(id, {status: "inactive"});
    }
}
