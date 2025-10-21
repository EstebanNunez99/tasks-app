import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    

    private users: any[] = [
        {
            id: 1,
            name: 'Esteban-1',
            phone: '1234567789'
        },{
            id: 2,
            name: 'Esteban-2',
            phone: '1234567789'
        },
        {
            id: 2,
            name: 'Esteban-3',
            phone: '1234567789'
        }
    ]
    getUsers(){
        return this.users
    }
    createUser(user:CreateUserDto){
        this.users.push(user)
        return {
            ...user,
            id: this.users.length + 1
        }
    }
}
