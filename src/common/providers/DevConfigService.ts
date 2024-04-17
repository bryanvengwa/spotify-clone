
import {
    Injectable
} from "@nestjs/common";
@Injectable()
export class DevConfigService {
    DBHOST = "localhost";
    getDBHOST() {
        return this.DBHOST;
    }
}
@Injectable()
export class AppService {
    constructor(private devConfigService: DevConfigService) {}
    getHello(): string {
        return `Hello I am learning Nest.js Fundamentals
${this.devConfigService.getDBHOST()}`;
} }