import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { Repository } from 'typeorm';
import { UserInput, UserOutput } from '../dto/user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Verification } from '../entities/verification.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private verifitions: Repository<Verification>,
  ) {}

  async signup({ username, password, email }: UserInput): Promise<UserOutput> {
    try {
      const emailExist = await this.userRepository.findOne({
        where: { email },
      });

      if (!emailExist) {
        console.log('이메일이 존재하지 않습니다.');
        const User = await this.userRepository.save(
          this.userRepository.create({ username, email, password }),
        );

        const verification = this.verifitions.save(
          this.verifitions.create(User),
        );
        verification;
        return { ok: true };
      } else {
        console.log('이메일이 이미 존재합니다.');
        return { ok: false, error: '이메일이 이미 존재합니다.' };
      }
    } catch (error) {
      return { ok: false, error: `회원 가입에 실패했습니다.${error.message}` };
    }
  }
}

// Auth 내부 로직 :   추가 적인 개인수집,회원 가입 완료후 메일 보내기
