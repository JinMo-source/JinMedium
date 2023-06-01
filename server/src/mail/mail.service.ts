import { Injectable } from '@nestjs/common';
import { mailInterface } from './mail.interface';
import * as mailgun from 'mailgun-js';

@Injectable()
export class MailgunService {
  private readonly DOMAIN = process.env.MAILGUN_DOMAIN_NAME;
  private readonly Key = process.env.MAILGUN_API_KEY;
  private readonly mg = mailgun({
    apiKey: this.Key,
    domain: this.DOMAIN,
  });

  async sendEmail({ email, code }: mailInterface): Promise<void> {
    const data = {
      from: 'qkrwslah12342@gmail.com',
      to: email,
      subject: 'Hello',
      text: `Verification code: ${code}`,
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
