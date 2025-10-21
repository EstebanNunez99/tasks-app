import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersController {
   
    //forma abrevidad de hacer el constructor
    //con el constructor lo que hacemos en definitiva es injectar lo que tiene la clase UsersgetTasks() { return ['tasks 1', 'tasks 2', 'tasks 3']; }Service
    constructor ( private usersService: UsersService) {}
    
    @Get('/users') //getUsers es lo que se ejecuta cuando hacemos un GET a la ruta que definimos en service
    getUsers(){
        return this.usersService.getUsers()

    }
    @Post('/users')
    @UsePipes(new ValidationPipe())
    createUser(@Body() user: CreateUserDto){
        return this.usersService.createUser(user)
    }
}
