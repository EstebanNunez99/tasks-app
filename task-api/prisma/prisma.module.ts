import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Module({
    providers: [PrismaService],
    
    //exports: Le dice a NestJS: "Cualquier otro módulo que 
    // importe PrismaModule tiene permiso para usar 
    // PrismaService"
    exports: [PrismaService]

})
export class PrismaModule{}