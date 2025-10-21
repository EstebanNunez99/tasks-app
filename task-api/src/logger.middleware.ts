import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('---  INSPECTOR DE ADUANAS (MIDDLEWARE) ---');
    console.log('Ruta:', req.originalUrl);
    console.log('Método:', req.method);
    
    // Esta es la línea más importante. Vemos el body tal cual llega.
    console.log('Body que llega:', req.body); 
    
    console.log('------------------------------------------');
    
    // Le decimos a la petición que puede seguir su camino hacia el controlador.
    next(); 
  }
}