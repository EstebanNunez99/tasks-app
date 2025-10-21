import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";


export interface User {
    name: string,
    age: number
}
//Esto ya no voy a usar porque vamos a usar el que definimos en prisma
// export interface Task {
//     id: number,
//     title: string,
//     description: string
//     // status: boolean
// }


//Tooooodo TasksService es una clase, tiene metodos, son los que defini como 
//getTasks, delteTasks, etc
@Injectable()
export class TasksService {

    //arreglo para almacenar tareas, ya no uso
    // private tasks: Task[] = [
    //     { id: 1, title: 'Aprender NestJS', description: 'Estudiar los fundamentos'},
    //     { id: 2, title: 'Hacer el backend', description: 'Crear la API de tareas'},
    // ]


    //PrismaService es un atajo de TypeScript que crea 
    //y asigna la propiedad prisma en nuestra clase automáticamente.
    constructor(private prisma: PrismaService){}

    //task es un parametro que debe tener la estructura de CreateTaskDto
    // createTasks(task: CreateTaskDto){
    //     console.log(task)
    //     this.primaTasks.push({
    //         ...task,
    //         id: this.primaTasks.length + 1
    //     })
    //     return task
        

    // }

    //-----Usando la BD------//
    async create(createTaskDto: CreateTaskDto){
        //this.prisma.task.create es el comando de prisma para crearr un
        // nuevo registro en la tabla Task
        return this.prisma.task.create({
            //le vamos a mandar el createTaskDto que viene del cliente
            data: createTaskDto
        })
    }


    // getTasks(){
        // nestjs puede retornar diferentes tipos de datos
        // return ['tasks 1', 'tasks 2', 'tasks 3']
        
        // return{
        //     name: 'Esteban desde una interface User',
        //     age:22
        // }
    //     return this.primaTasks

    // }

    //este metodo va a ser quien consulte la BD real
    async findAll(){

        //this.prisma: es el PrismaService inyectado, listo para usarse
        //.findMany() es el comando de Prisma similar a "SELECT * FROM Task;"
        return this.prisma.task.findMany();
    }

    // getTask(id: number){
    //     const taskFound = this.primaTasks.find( task => task.id === id)

    //     if(!taskFound){
    //         return new NotFoundException(`Task with id ${id} not found`)
    //     }
    //     return taskFound
    // }


    // --------usando la BD----------
    async findOne(id: number){

        //se usa findUniqueOrThrow, para que sino encuentral atarea
        // automaticamente manda un error que Nest 
        //lo toma como 404, despues tenemos que manejar estos eroores con unmiddleaware
        return this.prisma.task.findUniqueOrThrow({
            where: { id }
        })
    }

    // deleteTasks(){
    //     return 'eliminar tarea'
    // }

    //----------Usando la BD-----------
    async remove(id: number){
        return this.prisma.task.delete({
            where: { id }
        })
    }


    // updateTasks(task: UpdateTaskDto){
        
    //     console.log(task)
    //     return 'actualizar tarea'
    // }

    //----------Usando la BD-----------
    async update(id: number, updateTaskDto: UpdateTaskDto){
        return this.prisma.task.update({
            where: { id },
            data: updateTaskDto,
        })
    }

    // updateTasksStatus(){
    //     return 'actualizar estado'
    // }
}
