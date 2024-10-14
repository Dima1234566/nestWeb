/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './users.model';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginUserDto } from './dto/login.user.dto';




@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @ApiOperation({ summary: "Create User" })
    @ApiResponse({ status: 200, type: User })
    @Post("/")
    async create(@Body() user: CreateUserDto): Promise<User> {
        return await this.userService.createUser(user);
    }

    // @ApiOperation({ summary: "google login" })
    // @ApiResponse({ status: 200, type: GoogleUserDto })
    // @UseGuards(GoogleAuthGuard)
    // @Get("/google/login")
    // googleLogin() {
    //     return;
    // }

    // @ApiOperation({ summary: "google login" })
    // @ApiResponse({ status: 200, type: GoogleUserDto })
    // @UseGuards(GoogleAuthGuard)
    // @Get("/google/redirect")
    // async googleRedirect(@Res() res: any, @Req() req: any) {
    //     const userId = req.user._id;
    //     const user = await this.userService.findById(userId);
    //     return res.redirect(`https://www.google.com/?token=${user.access_token}`);
    // }

    @ApiOperation({ summary: "Get User" })
    @ApiResponse({ status: 200, type: User })
    @Get("/")
    async findUsers(): Promise<User> {
        return await this.userService.findAllUsers();
    }

    @ApiOperation({ summary: "Get User by id" })
    @ApiResponse({ status: 200, type: User })
    @ApiBearerAuth("BearerAuthMethod")
    @Get("/find/:id")
    async findUserById(@Param('id') id: string, @Req() req: any): Promise<User> {
        return await this.userService.findUserById(id, req);
    }

    // @ApiOperation({ summary: "Update password" })
    // @ApiResponse({ status: 200, type: User })
    // @Put("/update")
    // async update(@Body() password: UpdatePasswordDto): Promise<User> {
    //     return await this.userService.updateUserPassword(password);
    // }

    // @ApiOperation({ summary: "Update user" })
    // @ApiResponse({ status: 200, type: User })
    // @ApiBearerAuth("BearerAuthMethod")
    // @Put("/update/user")
    // async updateUser(@Body() user: UpdateUserDto, @Req() query: any): Promise<User> {
    //     return await this.userService.updateUser(user, query);
    // }

    // @ApiOperation({ summary: "upload image" })
    // @ApiResponse({ status: 200, type: User })
    // @ApiBearerAuth("BearerAuthMethod")
    // @HttpCode(200)
    // @Post("/upload")
    // @UseInterceptors(
    //     FilesInterceptor("file", 5, {
    //         storage: diskStorage({
    //             destination: "upload",
    //             filename: (req: any, file, cd) => {
    //                 const filename = path.parse(file.originalname).name.replace(/\s/g, "") + "-" + Date.now();
    //                 const extension = path.parse(file.originalname).ext;
    //                 cd(null, `${filename}${extension}`);
    //             },
    //         }),

    //     }))
    // async uploadPhoto(@Req() req: any, @UploadedFiles() images: Express.Multer.File[]): Promise<User> {
    //     try {
    //         const user = await this.userService.findToken(req);
    //         if (!user) {
    //             console.log("user not in base ");
    //         }
    //         await this.cloudinaryService.uploadImages(user, images)



    //         return await this.userService.findById(user.id)

    //     } catch (error) {
    //         console.error(error);

    //     }
    // }

    // @ApiOperation({ summary: "Delete User Photo by id" })
    // @ApiResponse({ status: 200, type: User })
    // @ApiBearerAuth("BearerAuthMethod")
    // @Delete("/delete-image/:id")
    // async deletePhotoById(@Req() req: any, @Param('id') imageId: string): Promise<User> {
    //     const user = await this.userService.findToken(req);
    //     if (!user) {
    //         console.log("user not in base ");
    //     }
    //     await this.cloudinaryService.deleteImage(user, imageId);
    //     return await this.userService.findById(user.id);
    // }

    // @ApiOperation({ summary: "Delete User by id" })
    // @ApiResponse({ status: 200, type: User })
    // @Delete("/delete/:id")
    // async deleteById(@Param('id') id: string): Promise<User> {
    //     return await this.userService.findAndDelete(id);
    // }

    @ApiOperation({ summary: "Log in User" })
    @ApiResponse({ status: 200, type: User })
    @HttpCode(200)
    @Post("/login")
    async logIn(@Body() user: LoginUserDto): Promise<User> {
        return await this.userService.userLogin(user);
    }

    @ApiOperation({ summary: "Log Out User" })
    @ApiResponse({ status: 200, type: User })
    @HttpCode(200)
    @ApiBearerAuth("BearerAuthMethod")
    @Post("/logout")
    async logOut(@Req() req: any): Promise<User> {
        return await this.userService.userLogout(req);
    }

    // @ApiOperation({ summary: "forgot password? change it" })
    // @ApiResponse({ status: 200, type: User })
    // @HttpCode(200)
    // @Post("/forgot")
    // async forgotPass(@Body() data: ForgotPasswordDto): Promise<void> {
    //     return await this.userService.forgotPassword(data.email);
    // }

    // @ApiOperation({ summary: "find location User" })
    // @ApiResponse({ status: 200, type: User })
    // @HttpCode(200)
    // @ApiQuery({ name: 'size', required: false, type: Number })
    // @ApiQuery({ name: 'page', required: false, type: Number })
    // @ApiQuery({ name: 'location', required: false, type: String })
    // @Get("/find-location")
    // async findLocation(@Query() query: CreateUserDto) {
    //     return await this.userService.findLocationUser(query);
    // }

    @ApiOperation({ summary: "Update TOKEN" })
    @ApiResponse({ status: 200, type: Object })
    @Post("/refresh")
    async refreshToken(@Body() refresh: { refresh_token: string }) {
        return await this.userService.refreshToken(refresh);
    }

    // @ApiOperation({ summary: "verify User by id" })
    // @ApiResponse({ status: 200, type: User })
    // @Get("/verify-email/:id")
    // async verifyEmail(@Param('id') id: string): Promise<User> {
    //     return await this.userService.verification(id);
    // }

    // @ApiOperation({ summary: "favorite posts" })
    // @ApiResponse({ status: 200, type: User })
    // @ApiBearerAuth("BearerAuthMethod")
    // @HttpCode(200)
    // @Post("/favorites/:id")
    // async favorites(@Param("id") id: string, @Req() req: any): Promise<User> {
    //     return await this.userService.favorites(id, req);
    // }

    // @ApiOperation({ summary: "delete from favorite posts" })
    // @ApiResponse({ status: 200, type: User })
    // @ApiBearerAuth("BearerAuthMethod")
    // @HttpCode(200)
    // @Delete("/delete-favorites/:id")
    // async deleteFromFavorites(@Param("id") id: string, @Req() req: any): Promise<User> {
    //     return await this.userService.deleteFromFavorites(id, req);
    // }


}

