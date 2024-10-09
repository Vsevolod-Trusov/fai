import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PublicMethod } from 'lib/auth/decorators/public.decorator';
import { AuthService } from './auth.service';
import { UserDto } from './dto/auth.dto';

@PublicMethod()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUpWithEmail(@Body() signUpDto: UserDto, @Res() res: Response) {
    try {
      const { uid } = await this.authService.signUpWithEmail(
        signUpDto.email,
        signUpDto.password,
        signUpDto.role,
      );
      return res.status(201).json({ uid });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
