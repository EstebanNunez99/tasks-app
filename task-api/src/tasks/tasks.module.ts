//Module seria una funcion?
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TaskController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaModule } from 'prisma/prisma.module';
import { LoggerMiddleware } from 'src/logger.middleware';

//las clases se nombran con Mayusculas
@Module({
    imports: [PrismaModule],
    controllers: [TaskController],
    //los providers se usan para las injecciones
    providers: [TasksService]
})
export class TasksModule {
    configure(consumer: MiddlewareConsumer){
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('tasks')
    }
}
