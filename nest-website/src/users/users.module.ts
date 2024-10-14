/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.model';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  imports: [JwtModule.register({ secret: process.env.SECRET_KEY, signOptions: { expiresIn: '1day' } }),
  ConfigModule.forRoot({
    envFilePath: `.env`,
  }),
  MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema,
    collection: "users"
  }])]
})
export class UsersModule { }
