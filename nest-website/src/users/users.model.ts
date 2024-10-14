/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Model } from "mongoose";

export type UserDocument = User & Document;
export enum UserRoles {
    admin, user, moderator

}

@Schema({ versionKey: false, timestamps: true })
export class User extends Model<User> {
    @ApiProperty({ example: 'admin', description: "User role" })
    @Prop({ type: String, default: 'user' })
    role: UserRoles;

    @ApiProperty({ example: 'moderator@gmail.com', description: "User email" })
    @Prop({ type: String, required: [true, "email is required"] })
    email: string;

    @ApiProperty({ example: 'moderasfw1234rator', description: "User password" })
    @Prop({ type: String, required: [true, "password is required"], minlength: 8 })
    password: string;

    @ApiProperty({ example: '{id: String, url: String}', description: "User photo" })
    @Prop({ type: Array, default: [] })
    photos: [Photo];

    @ApiProperty({ example: 'moderator', description: "User name" })
    @Prop({ type: String })
    firstName: string;

    @ApiProperty({ example: 15, description: "User age" })
    @Prop({ type: Number })
    age: number;

    @ApiProperty({ example: 'Lviv', description: "User location" })
    @Prop({ type: String })
    location: string;

    @ApiProperty({ example: '21ui3ht4qpwopjI#OJIO%#*$&^*@#$&!@(*$&', description: "User token" })
    @Prop({ type: String })
    access_token: string;

    @ApiProperty({ example: '1ui3ht4qpwopjI#OJIO%#*$&^*@#$&!@(*$&', description: "User retoken" })
    @Prop({ type: String })
    refresh_token: string;

    @ApiProperty({ example: '+380564784', description: "User phone" })
    @Prop({ type: String, minlength: 10, maxlength: 13 })
    phone: string;

    @ApiProperty({ example: 3890000, description: "User telegram id" })
    @Prop({ type: Number })
    tgId: number;

    @ApiProperty({ example: "09623wqer12r12rsfad55522", description: "User googleId example" })
    @Prop({ type: String })
    googleId: string;

    @ApiProperty({ example: true, description: "User status" })
    @Prop({ type: Boolean, default: false })
    ban: boolean;

    @Prop({ type: Boolean, default: false })
    verify: boolean;

    @Prop({ type: Array, default: [] })
    favorites: [];


}

// status:
// identity {
//     sexuality:
//     gender:
//     pronouns:
//     interestIn:
// }

// education:
// ethnicity:
// vip: bool

export const UserSchema = SchemaFactory.createForClass(User);
export interface Photo {
    id: string;
    url: string;
}


