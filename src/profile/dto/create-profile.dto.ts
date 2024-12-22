export enum ProfileGenderEnum {
  Male = 'male',
  Female = 'female',
  Others = 'others',
}

export class CreateProfileDto {
  picture: string;
  gender: ProfileGenderEnum;
}
