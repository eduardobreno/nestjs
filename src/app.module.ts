import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://shhareit-mongo:27017/dev', { useFindAndModify: false }),
    MongooseModule.forRoot('mongodb://localhost:27017/dev', { useFindAndModify: false }),
    AuthModule,
    UsersModule,
  ],

  controllers: [AppController],

})
export class AppModule { }
