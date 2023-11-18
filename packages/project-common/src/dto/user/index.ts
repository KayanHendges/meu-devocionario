import { IsNotEmpty, IsString } from "class-validator";

export class IncludeUserPrayerDTO {
  @IsString()
  @IsNotEmpty()
  prayerId: string;
}

export class RemoveUserPrayerDTO {
  @IsString()
  @IsNotEmpty()
  prayerId: string;
}
