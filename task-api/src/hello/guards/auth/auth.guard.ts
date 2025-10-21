import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest() as Request;
    // const request = context.switchToHttp().getRequest<Request>();
    console.log(request.url);

    // if (request.url === '/greet') return false

    //sino tiene en su encabezado una autorizacion no le dejamos pasar
    if (!request.headers['authorization']) return false;

    return true;
  }
}
