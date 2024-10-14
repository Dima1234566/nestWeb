/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePasswordDto {
    @ApiProperty({ example: "example123", description: "User password example" })
    readonly password: string;
    @ApiProperty({ example: "aBQtYdZ3xL2r61YDC6zcH7bv", description: "User Id example" })
    readonly id: string;
}