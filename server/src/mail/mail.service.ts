import { Injectable } from '@nestjs/common';
import { mailInterface } from './mail.interface';
import * as mailgun from 'mailgun-js';
import { Repository } from 'typeorm';
import { Verification } from './entities/verification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Verification)
    private readonly verifitions: Repository<Verification>,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.eventEmitter.on('userSignedUp', this.handleUserSignedUp.bind(this));
  }

  private readonly DOMAIN = process.env.MAILGUN_DOMAIN_NAME;
  private readonly Key = process.env.MAILGUN_API_KEY;
  private readonly mg = mailgun({
    apiKey: this.Key,
    domain: this.DOMAIN,
  });

  async handleUserSignedUp(savedUser: any) {
    try {
      const verification = this.verifitions.create({ user: savedUser });
      const savedVerification = await this.verifitions.save(verification);

      await this.sendEmail({
        email: savedUser.email,
        code: savedVerification.code,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async sendEmail({ email, code }: mailInterface): Promise<void> {
    const verificationLink = new URL(
      `mail/token?token=${code}`,
      'http://localhost:4000',
    );
    const data = {
      from: 'qkrwslah12342@gmail.com',
      to: email,
      subject: 'Hello',
      html: `<a href="${verificationLink}">Click here to verify your email</a>`,
    };

    try {
      const response = await this.mg.messages().send(data);
      console.log(response);
      console.log('Email sent successfully');
    } catch (error) {
      console.log(error);
      //   console.log(this.mg);
      console.log('Failed to send email');
    }
  }
}
