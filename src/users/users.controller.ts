import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { GetProfileService } from './services/getProfile.service';
import { GetAllUsersService } from './services/getAllUsers.service';
import { UpdateUserDto } from './dto/user.dto';
import { UpdateUserService } from './services/updateUser.service';
import { DeleteUserService } from './services/deleteUser.service';

@Controller("users")
export class UsersController {
    constructor(
        private readonly getProfileService: GetProfileService,
        private readonly getAllUsersService: GetAllUsersService,
        private readonly updateUserService: UpdateUserService,
        private readonly deleteUserService: DeleteUserService

    ) {}

    @Get("profile/:id")
    async getProfile(@Param("id") id: string){
        return await this.getProfileService.execute(id);
    }

    @Get("")
    async getAllUsers(){
        return await this.getAllUsersService.execute();
    }

    @Patch("profile/:id")
    async updateProfile(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto){   
        return await this.updateUserService.execute(id, updateUserDto);
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: string) {
        return await this.deleteUserService.execute(id);
    }
}
