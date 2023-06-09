import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { MailService } from './mail.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Verification } from './entities/verification.entity';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/users/entities/User.entity';
import { UserService } from 'src/users/service/user.service';

@Controller('mail')
export class MailController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) {}

  @Get(':token')
  @Redirect('http://localhost:3000')
  async getToken(@Query('token') token: string) {
    console.log(token);
    const verification = await this.verificationRepository.findOne({
      where: { code: token },
      relations: ['user'],
    });

    if (verification) {
      const user = verification.user;
      console.log(user);

      // Verification 엔티티 삭제
      await this.verificationRepository.remove(verification);

      // USER 엔티티의 isVerified 속성 업데이트
      user.verified = true;

      // USER 권한 부여
      if ((user.email = process.env.ADMIN_EMAIL)) {
        user.role = UserRole.admin;
      } else {
        user.role = UserRole.writer;
      }

      await this.userRepository.save(user);
    }
  }
}
