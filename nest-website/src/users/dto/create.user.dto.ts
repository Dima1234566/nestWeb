/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: "example@gmail.com", description: "User email example" })
    readonly email: string;
    @ApiProperty({ example: "example123", description: "User password example" })
    readonly password: string;
    @ApiProperty({ example: "0962355522", description: "User phone number example" })
    readonly phone: string;

}