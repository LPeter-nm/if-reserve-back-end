import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { createAppDto } from './appDto/appDto';
// import { Public } from './modules/auth/skipAuth/skipAuth';

@Controller('app')
export class AppController {
    constructor(private readonly usrGeneral: AppService){}

    // @Public()
    @Post()
    registerGeneral(@Body() body: createAppDto){
        return this.usrGeneral.userAdmin(body)
    }
}
