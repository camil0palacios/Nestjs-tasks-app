import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { generateResponse } from 'libs/utils/generate-response';
import { UserInterface } from 'libs/interfaces/user.interfaces';
import { firstValueFrom } from 'rxjs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Injectable()
export class AdminService {
    
  constructor(
        @Inject('ADMIN_SERVICE') private clientAdmin: ClientProxy
    ) {}
    
    @ApiOkResponse()
    async getAllTasks(user: UserInterface) {
      const response = await firstValueFrom(this.clientAdmin.send('find_tasks', { user_id: user.id }));
      return generateResponse(response);
    }

    @ApiOkResponse()
    async getTask(id: number, user: UserInterface) { 
      const response = await firstValueFrom(this.clientAdmin.send('find_task', { task_id: id, user_id: user.id }));
      return generateResponse(response);
    }

    @ApiCreatedResponse()
    async createTask(body: any, user: UserInterface) {
      const response = await firstValueFrom(this.clientAdmin.send('create_task', { ...body, user_id: user.id }));
      return generateResponse(response);
    }

    @ApiOkResponse()
    async updateTask(id: number, body: any, user: UserInterface) {
      const response = await firstValueFrom(this.clientAdmin.send('update_task', { 
        task_id: id,
        user_id: user.id,
        ...body
      }));
      return generateResponse(response);
    }
    
    @ApiOkResponse()
    async removeTasks(taskId: number, user: UserInterface) {
      const response = await firstValueFrom(this.clientAdmin.send('remove_task', { task_id: taskId, user_id: user.id }));
      return generateResponse(response);
    }
}
