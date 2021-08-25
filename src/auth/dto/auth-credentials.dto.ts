import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PASSWORD_PATTERN } from '../../utils/constants';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(PASSWORD_PATTERN, { message: 'Password too weak' })
  password: string;
}
