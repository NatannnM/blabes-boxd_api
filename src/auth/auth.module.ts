import { Module } from "@nestjs/common";
import { UsuariosModule } from "../usuarios/usuarios.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
  imports: [UsuariosModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}