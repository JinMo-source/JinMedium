import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { Repository } from 'typeorm';
import { UserInput, UserOutput } from '../dto/user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async signup({ username, password, email }: UserInput): Promise<UserOutput> {
    try {
      const emailExist = await this.userRepository.findOne({
        where: { email },
      });

      if (!emailExist) {
        // 이메일 도메인에 따라 Role 할당

        const savedUser = await this.userRepository.save(
          this.userRepository.create({ username, email, password }),
        );

        this.eventEmitter.emit('userSignedUp', savedUser);

        return { ok: true };
      } else {
        console.log('이메일이 이미 존재합니다.');
        return { ok: false, error: '이메일이 이미 존재합니다.' };
      }
    } catch (error) {
      return { ok: false, error: `회원 가입에 실패했습니다.${error.message}` };
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      return user || null;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      return user || null;
    } catch (error) {
      console.log(error);
    }
  }
}
