import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from "@nestjs/common";
  import { AuthGuard } from "@nestjs/passport";
  import { Observable } from "rxjs";
import { PayloadType } from "./types";

  @Injectable()
  export class ArtistJwtGuard extends AuthGuard("jwt") {
    canActivate(
      context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
      return super.canActivate(context);
    }
    handleRequest<TUser = PayloadType>(err: any, user: any): TUser {
  // 1
  if (err || !user) { //2
        throw err || new UnauthorizedException();
      }
      console.log(user);
      if (user.artistId) {
  // 3
  return user;
      }
      throw err || new UnauthorizedException();
    }
  }
  