import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { FilesModule } from 'src/modules/files/files.module';
import { FriendsModule } from 'src/modules/friends/friends.module';
import { SharesModule } from 'src/modules/shares/shares.module';
import { AppController } from 'src/app.controller';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useFindAndModify: false
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    FilesModule,
    FriendsModule,
    SharesModule,
  ],

  controllers: [AppController],

})
export class AppModule { }
