import { Controller, Get, Post, Put, Patch, Delete, Body, Query, Param, UsePipes, ValidationPipe, ParseIntPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import type { UpdateTaskDto } from "./dto/update-task.dto";

//esto es un controlador y su trabajo es recibir peticiones HTTP
@Controller('/tasks')
export class TaskController {
    //variable del tipo TasksService, lo mismo que haciamos en aed con los registros
    // tasksService: TasksService;
    // //se ejecuta ni bien es instanciada la clase
    // constructor(tasksService: TasksService) {
    //     //la propiedad tasksService de la clase va a ser igual al parametro tasksService que se recibe en el constructor
    //     this.tasksService = tasksService;
    // }


    //--------usnado la BD
    //se ejecuta ni bien es instanciada la clase
    constructor( private tasksService: TasksService) {
        //la propiedad tasksService de la clase va a ser igual al parametro tasksService que se recibe en el constructor
    }


    // @Get('')
    // getAllTask(){
    //     return this.tasksService.getTasks()
    // }
    
    // se utiliza para extraer los parámetros de la cadena de consulta de la URL de una solicitud HTTP
    //En la URL http://localhost:3000/items?page=2&limit=10, el decorador @Query() puede extraer page como 2 y limit como 10 
    
    //ahhora vamos a usar el nuevo findAllTasks
    // getAllTask(@Query() query:any){
    //     console.log(query)
    //     return this.tasksService.getTasks()
    // }

    @Get()
    //---------usando la BD
    getAllTasks(@Query() query: any){
        console.log(query);
        return this.tasksService.findAll() //este es el que se usa ahora
    }


    // @Get('/:id') // a esta ruta llegamos por el /tasks/id
    // //se usan parametros para recibir valores dinamicamente de la URL
    // getTask(@Param('id') id:string){
    //     console.log(id)
    //     //coon parseInt() pasamos a numero entero
    //     return this.tasksService.getTask(parseInt(id))
    // }



    //-------usando la BD
    @Get('/:id') // a esta ruta llegamos por el /tasks/id
    //se usan parametros para recibir valores dinamicamente de la URL
    getTask(@Param('id', ParseIntPipe) id:number){
        return this.tasksService.findOne(id)
    }

    // @Post()
    // @UsePipes(new ValidationPipe())
    // createTask(@Body() task:CreateTaskDto){
    //     return this.tasksService.createTask(task)
    // }

    //------Usando la BD------/
    @Post()
    @UsePipes(new ValidationPipe())
    createTask(@Body() task:CreateTaskDto){
        console.log('--- BACKEND RECIBIÓ ESTO ---'); // <--- LÍNEA 1
        console.log(task);                            // <--- LÍNEA 2
        console.log('-----------------------------');
        return this.tasksService.create(task)
    }

    // @Put() //actualiza todo el objeto
    // updateTask(@Body() task:UpdateTaskDto){
    //     return this.tasksService.updateTasks(task)
    // }

    // @Delete('')//lo que está despues del arroba es el metodo HTTP
    // deleteTask(){
    //     return this.tasksService.deleteTasks()
    // }

    //--------usando la BD
    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id:number){
        return this.tasksService.remove(id)
    }



    // @Patch('') //permite actualizar parcialmente el objeto
    // apdateTasksStatus(){
    //     return this.tasksService.updateTasksStatus()
    // }

    //---------usando la BD
    @Patch(':id')
    updateTask(
        @Param('id', ParseIntPipe) id:number,
        @Body() task: UpdateTaskDto 
    ) {
        return this.tasksService.update(id, task)
    }




    // // @Get('/')
    // // index(){
    // //     return 'Inicio'
    // // }
}