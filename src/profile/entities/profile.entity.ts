import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum ProfileGenderEnum {
  Male = 'male',
  Female = 'female',
  Others = 'others',
}

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  picture: string;

  @Column({
    type: 'enum',
    enum: ProfileGenderEnum,
    default: ProfileGenderEnum.Male,
  })
  gender: ProfileGenderEnum;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
