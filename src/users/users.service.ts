import { Injectable } from '@nestjs/common';
import { User } from './users.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ user_id: id });
  }
}
