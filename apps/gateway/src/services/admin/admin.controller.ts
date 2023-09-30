import { Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserInterface } from 'libs/interfaces/user.interfaces';
import { ActiveUser } from 'libs/decorators/user.decorators';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {

    constructor(private readonly AdminService: AdminService) {}

    @Get('/tasks')
    @UseGuards(AuthGuard)
    getAllTasks(@ActiveUser() user: UserInterface) {
        return this.AdminService.getAllTasks(user);
    }

    @Get('/tasks/:id')
    @UseGuards(AuthGuard)
    getTask(@Param('id') id: number, @ActiveUser() user: UserInterface) {
        return this.AdminService.getTask(id, user);
    }

    @Post('/tasks')
    @UseGuards(AuthGuard)
    createTask(
      @Body() createTaskDto: CreateTaskDto, 
      @ActiveUser() user: UserInterface) 
    {
      return this.AdminService.createTask(createTaskDto, user);
    }

    @Put('/tasks/:id')
    @UseGuards(AuthGuard)
    updateTask(
      @Param('id') id: number,
      @Body() body: UpdateTaskDto, 
      @ActiveUser() user: UserInterface
    ) {
      return this.AdminService.updateTask(id, body, user);
    }
    
    @Delete('/tasks/:id')
    @UseGuards(AuthGuard)
    removeTasks(@Param('id') id: number, @ActiveUser() user: UserInterface) {
        return this.AdminService.removeTasks(id, user);
    }
    
}
