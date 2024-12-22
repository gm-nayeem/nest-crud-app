import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  age: number;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true }) // cascade use to insert & update without save an entity
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user)
  @JoinColumn({ name: 'post_id' })
  posts: Post[];
}
