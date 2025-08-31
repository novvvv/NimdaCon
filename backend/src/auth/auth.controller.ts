import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('api/auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {

    // #1 사용자 검증 로직 
    const user = await this.authService.validateUser(
      loginDto.username, // 유저가 입력한 사용자명
      loginDto.password, // 유저가 입력한 비밀번호 
    );
    
    // #1.1 사용자 검증 실패 시 예외 처리 
    if (!user) {
      throw new UnauthorizedException();
    }
    
    // #1.2 사용자 검증 성공 시 로그인 처리 시만
    return this.authService.login(user);
    
  }

  // #2 회원가입 로직 
  @Post('register')
  async register(@Body() registerDto: { username: string; password: string; email: string }) {
    // #2.1 회원가입 처리
    const user = await this.authService.register(registerDto.username, registerDto.password, registerDto.email);
    
    // #2.2 회원가입 성공 시 JWT 토큰 발급 (자동 로그인)
    return this.authService.login(user);
  }
}

/**
 * @Body() - Request에 포함된 데이터를 받아온다. 
 * 여기서는 사용자가 로그인 폼에 입력한 데이터 {username: string, password: string} 문자열 검증 
 */