import { PickType } from "@nestjs/swagger";
import { UserRegiterRequestDdto } from "../user/user.dto";

export class SignIdRequestDto extends PickType(UserRegiterRequestDdto, ['username', 'password']) {}
