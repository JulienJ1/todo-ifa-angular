import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
        load: [configuration]
    }), TasksModule, UsersModule, AuthModule, MongooseModule.forRootAsync({
        imports: [ConfigModule], useFactory: async (configService: ConfigService) => ({
            uri: configService.get('mongo.uri')
        }), inject: [ConfigService],
    })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}


