import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtSecret } from "src/modules/auth/auth.constants";
import { Request } from 'express';
import { ACCESS_TOKEN_HEADER_NAME, USER_DETAIL_HEADER_NAME, USER_PAYLOAD_HEADER_NAME } from "src/share/constants";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from 'cache-manager'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
            @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
        const payload = await this.jwtService.verifyAsync(
            token,
            {
            secret: jwtSecret
            }
        );

        request[USER_PAYLOAD_HEADER_NAME] = payload;
        
        const cacheAuthData = await this.cacheManager.get(token)
        
        if (!cacheAuthData) {
            throw new Error()
        }

        const parseAuth = JSON.parse(cacheAuthData.toString());

        if (!parseAuth.status) {
            throw new Error()
        }

        request[USER_DETAIL_HEADER_NAME] = parseAuth;
        request[ACCESS_TOKEN_HEADER_NAME] = token;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const accessToken =  request.headers[ACCESS_TOKEN_HEADER_NAME]

    if (!accessToken) { return null } 
    const [type, token] = accessToken.toString().split(' ') ?? [];
    return type.toLowerCase() === 'bearer' ? token : undefined;
  }
}