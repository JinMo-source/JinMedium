import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { Repository } from 'typeorm';
import { UserInput, UserOutput } from '../dto/user.dto';
import { ok } from 'assert';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userResitory: Repository<User>,
  ) {}

  async signup({ username, password, email }: UserInput): Promise<UserOutput> {
    await this.userResitory.save({ username, password, email });
    try {
      return { ok: true };
    } catch (error) {
      return { ok: false, error: '회원 가입에 실패했습니다.' };
    }
  }
}

// Auth 내부 로직 : 비밀번호 암호화, Email 중복 체크,비밀번호 강도 체크,비밀번호 확이 필드를 추가,추가 적인 개인수집,회원 가입 완료후 메일 보내기
