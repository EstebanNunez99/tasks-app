// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { JwksClient } from 'jwks-rsa';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   private jwksClient: JwksClient;

//   constructor() {
//     super({
//       // 1. Extrae el token JWT del encabezado 'Authorization' como Bearer Token
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       // 2. No ignoramos la expiración del token
//       ignoreExpiration: false,
//       // 3. NO usamos un secreto fijo, sino las claves públicas de Keycloak
//       secretOrKeyProvider: (request, rawJwtToken, done) => {
//         // Obtenemos la URL de las claves públicas de Keycloak
//         // Reemplaza 'localhost:8080' y 'task-app' si usaste nombres diferentes
//         const keycloakUrl = 'http://localhost:8080/realms/task-app'; 
//         this.jwksClient = new JwksClient({
//           jwksUri: `${keycloakUrl}/protocol/openid-connect/certs`,
//         });

//         // Extraemos el 'kid' (Key ID) del encabezado del token JWT
//         const decodedHeader = JSON.parse(
//           Buffer.from(rawJwtToken.split('.')[0], 'base64url').toString(),
//         );
//         const kid = decodedHeader.kid;

//         // Buscamos la clave pública correspondiente a ese 'kid'
//         this.jwksClient.getSigningKey(kid, (err, key) => {
//           if (err) {
//             return done(err);
//           }
//           // --- ESTA ES LA VERSIFICACIÓN QUE FALTA ---
//           if (!key) {
//              return done(new Error('No se encontró la clave pública para el KID proporcionado.'));
//           }
//           // ------------------------------------------
//           const signingKey = key.getPublicKey();
//           done(null, signingKey); // Devolvemos la clave pública encontrada
//         });
//       },
//       // 4. Audiencia esperada (el Client ID de nuestro backend)
//       audience: 'task-api-client', 
//       // 5. Emisor esperado (la URL de nuestro Realm en Keycloak)
//       issuer: 'http://localhost:8080/realms/task-app',
//       algorithms: ['RS256'], // Algoritmo de firma que usa Keycloak por defecto
//     });
//   }

//   // 6. Método 'validate': Se ejecuta si la firma y las claims son válidas
//   async validate(payload: any) {
//     // 'payload' contiene la información decodificada del token JWT
//     // Aquí podríamos buscar el usuario en nuestra BD si quisiéramos
//     // Por ahora, simplemente devolvemos el payload tal cual
//     return payload; 
//   }
// }
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwksClient } from 'jwks-rsa';
import { Buffer } from 'buffer'; // Asegúrate que Buffer esté importado

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Ya no necesitamos definir keycloakUrl y keycloakAudience aquí
  private jwksClient: JwksClient;

  constructor() {
    // LLamada a super() va primero
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        // Definimos la URL base aquí directamente
        const keycloakUrl = 'http://localhost:8080/realms/task-app'; 

        // Inicializamos el cliente JWKS si no existe
        if (!this.jwksClient) {
          this.jwksClient = new JwksClient({
            jwksUri: `${keycloakUrl}/protocol/openid-connect/certs`,
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
          });
        }

        try {
          const decodedHeader = JSON.parse(
            Buffer.from(rawJwtToken.split('.')[0], 'base64url').toString('utf-8'),
          );
          const kid = decodedHeader.kid;

          if (!kid) {
             return done(new UnauthorizedException('Token header missing Key ID (kid).'), false);
          }

          this.jwksClient.getSigningKey(kid, (err, key) => {
            if (err || !key) {
               return done(new UnauthorizedException('Failed to get signing key or key not found.'), false);
            }
            const signingKey = key.getPublicKey();
            done(null, signingKey);
          });
        } catch (error) {
           done(new UnauthorizedException('Invalid token header.'), false);
        }
      },
      // --- CORRECCIÓN AQUÍ: Usamos los valores directamente ---
      audience: 'task-api-client', // Client ID del backend
      issuer: 'http://localhost:8080/realms/task-app', // URL del Realm
      // ----------------------------------------------------
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    // El método validate se queda igual
    return payload;
  }
}

