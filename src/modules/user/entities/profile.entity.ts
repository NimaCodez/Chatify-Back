import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'profiles' })
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @OneToOne(() => UserEntity, user => user.profile)
  user: UserEntity;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  website: string;

  // Twitter handle
  @Column({ nullable: true })
  x: string;

  @Column({ nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  location: string;
}
