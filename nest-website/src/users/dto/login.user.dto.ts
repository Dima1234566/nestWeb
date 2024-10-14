/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({ example: "example@gmail.com", description: "User email example" })
    readonly email: string;
    @ApiProperty({ example: "example123", description: "User password example" })
    readonly password: string;

}