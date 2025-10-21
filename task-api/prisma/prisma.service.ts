import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        //con esto nos aseguramos que la conexino a la BD se estaablezca correctamente cuando la app arranca
        await this.$connect();
    }
} 

