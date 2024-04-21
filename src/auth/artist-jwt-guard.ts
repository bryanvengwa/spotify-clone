import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { error } from "console";
import { Observable } from "rxjs";

@Injectable()
export class ArtistJwtGuard extends AuthGuard('jwt'){

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context)
    }
    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {

        if(error || !user){
            throw error || new UnauthorizedException()
        }
        console.log(user)
        if (user.artistId){
            return user;

        }
        throw err || new UnauthorizedException();
    }
}