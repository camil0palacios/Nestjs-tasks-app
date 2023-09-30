import { InternalServerErrorException } from '@nestjs/common';

export const generateResponse = (response) => {
  if (response?.error || response?.error) {
    throw new InternalServerErrorException(response);
  }
  return response;
};