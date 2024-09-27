import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { Profile } from 'passport';

@Entity({ name: 'users ' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  username: string;
  
  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  profile_id: number;

  @OneToOne(() => ProfileEntity, prof => prof.user)
  profile: Profile;
}
