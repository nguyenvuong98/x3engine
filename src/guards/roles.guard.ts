import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/decorators/roles.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return matchRoles(roles, user.permissions);
  }
}

function matchRoles(roles: string[], userPermissions: string[]): boolean {
  if (!userPermissions) {
    throw new HttpException('permission denied', HttpStatus.FORBIDDEN)
  }

  const checkPermission = roles.every(item => userPermissions.includes(item));
  
  return checkPermission
}
