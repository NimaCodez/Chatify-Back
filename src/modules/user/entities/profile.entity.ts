import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'profiles' })
export class ProfileEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user_id: number;

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
  birthday: Date;

  @Column({ nullable: true })
  location: string;
}
