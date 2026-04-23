import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { GetProfileService } from './services/getProfile.service';
import { GetAllUsersService } from './services/getAllUsers.service';
import { CreateUserDto, TipoUsuario, UpdateUserDto } from './dto/user.dto';
import { UpdateUserService } from './services/updateUser.service';
import { DeleteUserService } from './services/deleteUser.service';
import { CreateInstructorService } from './services/createInstructor.service';
import { Roles } from '../shared/decorators/RoleDecorator';

@Controller("users")
export class UsersController {
    constructor(
        private readonly getProfileService: GetProfileService,
        private readonly getAllUsersService: GetAllUsersService,
        private readonly updateUserService: UpdateUserService,
        private readonly deleteUserService: DeleteUserService,
        private readonly createInstructorService: CreateInstructorService

    ) {}

    @Get("profile/:id")
    async getProfile(@Param("id") id: string){
        return await this.getProfileService.execute(id);
    }

    @Roles("Administrador")
    @Get("")
    async getAllUsers(@Query("tipoUsuario") tipoUsuario: TipoUsuario){
        return await this.getAllUsersService.execute(tipoUsuario);
    }

    @Patch("profile/:id")
    async updateProfile(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto){   
        return await this.updateUserService.execute(id, updateUserDto);
    }

    @Roles("Administrador")
    @Delete(":id")
    async deleteUser(@Param("id") id: string) {
        return await this.deleteUserService.execute(id);
    }

    @Roles("Administrador")
    @Post("instructor")
    async createInstructor(@Body() createUserDto: CreateUserDto) {
        await this.createInstructorService.execute(createUserDto);
        return;
    }
}
