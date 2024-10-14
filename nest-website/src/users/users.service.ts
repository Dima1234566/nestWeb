/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchema } from './users.model';
import { CreateUserDto } from './dto/create.user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { compareSync, hashSync } from 'bcryptjs';
import { LoginUserDto } from './dto/login.user.dto';
import * as nodemailer from 'nodemailer'




export const TRANSPORTER_PROVIDER = 'TRANSPORTER_PROVIDER';

@Injectable()
export class UsersService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private userModel: User,
        @Inject(TRANSPORTER_PROVIDER)
        private transporter: nodemailer.Transporter,
    ) {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.zoho.eu', port: 465, secure: true, auth: {
                user: process.env.MAIL_LOG, pass: process.env.MAIL_PASS
            },
        })
    }

    async createUser(user: CreateUserDto) {
        try {
            if (!user) {
                return console.log("нема юзера");
            }

            const { email, password, phone } = user;
            const lowerCaseEmail = email.toLocaleLowerCase();
            const findEmail = await this.userModel.findOne({
                email: lowerCaseEmail
            })
            const findPhone = await this.userModel.findOne({
                phone: phone
            })
            if (!findPhone && !findEmail) {
                const regUser = await this.userModel.create({
                    email: lowerCaseEmail,
                    password: password,
                    phone: phone

                })
                regUser.setPassword(password)
                regUser.save()
                await this.createToken(regUser)
                return regUser;

            } else {
                console.log("this phone and email exist");
            }

        } catch (error) {
            console.error(error);
        }

    }


    async findAllUsers() {
        try {
            return await this.userModel.find();

        } catch (error) {
            console.error(error);
        }
    }

    async findUserById(id: string, req: any) {
        try {
            const admin = await this.findToken(req);
            if (!admin) {
                return console.error("User not found");

            }
            if (admin && admin.role === 'admin') {
                return await this.userModel.findById(id)
            } else {
                console.error("User not admin");
            }


        } catch (error) {
            console.error(error);
        }
    }


    async findById(id: string): Promise<User> {
        try {

            return await this.userModel.findById(id)

        } catch (error) {
            console.error(error);
        }

    }


    // async updateUserPassword(passwordAndId: UpdatePasswordDto) {
    //     try {
    //         const { password, id } = passwordAndId;
    //         return await this.userModel.findByIdAndUpdate(id, {
    //             password: password
    //         })
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // async updateUser(data: UpdateUserDto, query: any) {
    //     try {

    //         const { email, photos, name, age, location } = data;
    //         const user: any = await this.findToken(query);
    //         if (!user) {
    //             console.log("Not authorizate");
    //         }
    //         if (email || photos || name || age || location) {
    //             await this.userModel.findByIdAndUpdate(user._id, {
    //                 ...data

    //             })
    //             return await this.userModel.findById(user.id)
    //         }

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    // async findAndDelete(id: string) {
    //     try {
    //         return await this.userModel.findByIdAndDelete(id)
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    async userLogin(user: LoginUserDto) {
        try {
            const { password, email } = user;
            const loginUser = await this.userModel.findOne({ email: email });
            if (!loginUser) {
                console.log("User not found");
            } else if (loginUser.comparePassword(password) === true) {
                await this.createToken(loginUser.id)
                return await this.userModel.findById(loginUser.id)
            } else {
                console.log("password useless");

            }

            return
        } catch (error) {
            console.error(error);
        }
    }

    async userLogout(req: any) {
        try {
            const user = await this.findToken(req);
            if (!user) {
                console.log('JWT are useless');
            } else {
                await this.userModel.findByIdAndUpdate({ _id: user.id }, { access_token: null, refresh_token: null })
                return await this.userModel.findById(user.id)
            }

        } catch (error) {
            console.error(error);
        }
    }


    async createToken(userId: string) {
        const payLoad = {
            id: userId
        }
        const secret = process.env.SECRET_KEY;
        const token = sign(payLoad, secret, { expiresIn: "30m" })

        const refreshToken = sign(payLoad, secret, { expiresIn: "1day" })
        try {
            await this.userModel.findByIdAndUpdate(userId, { access_token: token, refresh_token: refreshToken })
            return await this.userModel.findById(userId)
        } catch (error) {
            console.error(error);

        }
    }

    async findToken(req: any) {
        try {
            const { authorization = '' } = req.headers;

            const [bearer, token] = authorization.split(' ');

            if (bearer !== 'Bearer') {
                console.log("user not in a base");
            }
            const secret = process.env.SECRET_KEY;

            const findId = verify(token, secret) as JwtPayload;
            const user = await this.userModel.findById(findId.id);
            return user;
        } catch (error) {
            console.error(error);

        }
    }

    async refreshToken(refresh: { refresh_token: string }) {
        try {
            const user = await this.userModel.findOne(refresh)
            const updateToken = await this.createToken(user._id)
            return { access_token: updateToken.access_token, refresh_token: updateToken.refresh_token }
        } catch (error) {
            console.error(error);
        }
    }

}


UserSchema.methods.setPassword = async function (password: string) {
    return (this.password = hashSync(password, 10));

}
UserSchema.methods.comparePassword = function (password: string) {
    return compareSync(password, this.password);

}



// export abstract class FileValidator<TValidationOptions = Record<string, any>> {
//     constructor(protected readonly validationOptions: TValidationOptions) { }
//     abstract isValid(file?: any): boolean | Promise<boolean>;
//     abstract buildErrorMessage(file: any): string;
// }