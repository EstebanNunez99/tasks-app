import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'; // Importamos la estrategia JWT que creamos
import { AuthController } from './auth.controller'; // Mantenemos tu AuthController
import { AuthService } from './auth.service'; // Mantenemos tu AuthService

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Registramos Passport
    JwtModule.register({}), // Registramos JwtModule
  ],
  controllers: [AuthController], // Mantenemos tu AuthController
  providers: [
    AuthService, // Mantenemos tu AuthService
    JwtStrategy, // Añadimos nuestra JwtStrategy
  ],
  exports: [PassportModule], // Exportamos PassportModule
})
export class AuthModule {}

