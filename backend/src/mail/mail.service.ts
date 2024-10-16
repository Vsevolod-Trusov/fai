import { Injectable } from '@nestjs/common';
import { EnrollDto } from 'deal/dto/deal.dto';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

export type EmailConfig = {
  host: string;
  port: string;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
};

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private confirmationTemplate: handlebars.TemplateDelegate;

  constructor() {
    this.transporter = nodemailer.createTransport(
      {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: process.env.MAILER_SECURE === 'true',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      {
        from: {
          name: 'No-reply',
          address: process.env.MAIL_USER,
        },
      },
    );

    this.confirmationTemplate = this.loadTemplate('template.hbs');
  }

  private loadTemplate(templateName: string): handlebars.TemplateDelegate {
    const templatesFolderPath = path.join(__dirname, './templates');
    const templatePath = path.join(templatesFolderPath, templateName);

    const templateSource = fs.readFileSync(templatePath, 'utf8');
    return handlebars.compile(templateSource);
  }

  async sendEmail({
    to,
    data,
    subject,
  }: {
    to: string;
    data: EnrollDto;
    subject: string;
  }) {
    const html = this.confirmationTemplate({
      data: data,
    });

    await this.transporter.sendMail({
      to,
      subject,
      html,
    });
  }
}
