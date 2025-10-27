import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, ParseIntPipe, Query } from '@nestjs/common'; // 1. Añade UseGuards a la importación
import { AuthGuard } from '@nestjs/passport'; // 2. Importa AuthGuard
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import type { UpdateTaskDto } from "./dto/update-task.dto"; // Asegúrate de que UpdateTaskDto se importe sin 'type' si es una clase

//esto es un controlador y su trabajo es recibir peticiones HTTP
@UseGuards(AuthGuard('jwt')) // 3. ¡Aplica el guardián aquí!
@Controller('/tasks')
export class TaskController {

    constructor( private tasksService: TasksService) {}

    @Get()
    getAllTasks(@Query() query: any){
        // Quitamos los console.log de depuración si ya no los necesitas
        // console.log(query); 
        return this.tasksService.findAll() 
    }

    @Get('/:id') 
    getTask(@Param('id', ParseIntPipe) id:number){
        return this.tasksService.findOne(id)
    }

    @Post()
    // Ya no necesitamos @UsePipes aquí si lo hacemos global en main.ts, pero no hace daño dejarlo
    @UsePipes(new ValidationPipe({ transform: true })) 
    createTask(@Body() task:CreateTaskDto){
        // Quitamos los console.log de depuración si ya no los necesitas
        // console.log('--- BACKEND RECIBIÓ ESTO ---'); 
        // console.log(task);                            
        // console.log('-----------------------------');
        return this.tasksService.create(task)
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id:number){
        return this.tasksService.remove(id)
    }

    @Patch(':id')
    updateTask(
        @Param('id', ParseIntPipe) id:number,
        @Body() task: UpdateTaskDto 
    ) {
        return this.tasksService.update(id, task)
    }
}

