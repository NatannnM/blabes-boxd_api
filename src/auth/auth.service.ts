import { Injectable, NotFoundException } from "@nestjs/common";
import { UsuariosService } from "../usuarios/usuarios.service";
import { LoginDto } from "./login.dto";

@Injectable()
export class AuthService {
  constructor(private readonly usuariosService: UsuariosService) {}

  async login(loginDto: LoginDto) {
    const user = await this.usuariosService.findByEmail(loginDto.email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (user.password !== loginDto.password) {
      throw new NotFoundException('Senha incorreta');
    }

    return {
      message: 'Login bem-sucedido',
      user: {
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        admin: user.admin,
      },
    };
  }
}