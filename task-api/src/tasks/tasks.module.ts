//Module seria una funcion?
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TaskController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { LoggerMiddleware } from '../logger.middleware';
import { AuthModule } from '../auth/auth.module';

//las clases se nombran con Mayusculas
@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [TaskController],
    //los providers se usan para las injecciones
    providers: [TasksService]
})
// export class TasksModule {
//     configure(consumer: MiddlewareConsumer){
//         consumer
//             .apply(LoggerMiddleware)
//             .forRoutes('tasks')
//     }
// }
export class TasksModule implements NestModule {
    configure(consumer: MiddlewareConsumer){
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('tasks')
    }
}
