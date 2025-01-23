import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/PrismaService';

@Injectable()
export class AppService {
    constructor(private readonly prisma: PrismaService){}

    helloWorld(){
        return 'Servidor online'
    }

    async userAdmin(){
        
    }
}
