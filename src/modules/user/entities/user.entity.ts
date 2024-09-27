import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { Profile } from 'passport';

@Entity({ name: 'users ' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  profile_id: string;

  @OneToOne(() => ProfileEntity, prof => prof.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  profile: Profile;
}
