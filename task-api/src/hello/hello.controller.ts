import { Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Query, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ValidateUserPipe } from './validate-user/validate-user.pipe';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller()
export class HelloController {

    @Get('/')
    index(@Req() request: Request, @Res() response: Response){
        response.status(200).json({
            message: 'Hola con express'

        })
    }
    @Get('new')
    @HttpCode(201)
    somethingNew(){
        return 'Something new'
    }

    @Get('notfound')
    @HttpCode(404)
    notFoundPage(){
        return '404 page nor found'
    }
    @Get('error')
    @HttpCode(500)
    errorPage(){
        return 'error Route'
    }

    @Get('/ticket/:num')
    //todas las variables vienen como string asi que hay que convertir a 
    // numero manualmente si lo necesitamos, con Parse
    getNumer(@Param('num', ParseIntPipe) num:number){
        return num + 14
    }

    //hay que convertir todos los datos que se ingresan por parametros

    @Get('/active/:status')
    isUserActive(@Param('status', ParseBoolPipe) status:boolean){
        console.log(typeof(status))
        return status
    }

    @Get('/greet')
    @UseGuards(AuthGuard)
    greet(@Query(ValidateUserPipe) query: {name: string, age:number}){
        console.log(typeof(query.age))
        console.log(typeof(query.name))
        return `Hello ${query.name}, you are ${query.age} years old `
    }

    
}
