import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  user_type: UserType;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  persian_first_name: string;

  @Column()
  persian_last_name: string;

  @Column()
  national_id_number: string;

  @Column()
  national_registration_code: string;

  @Column()
  date_of_birth: Date;

  @Column()
  instagram_username: string;

  @Column()
  twitter_username: string;

  @Column()
  gender: Gender;

  @Column()
  marital_status: MaritalStatus;

  @Column()
  mobile_phone_number: string;

  @Column()
  country_of_residence: string;

  @Column()
  state_of_residence: string;

  @Column()
  city_of_residence: string;

  @Column()
  address_of_residence: string;

  @Column()
  postal_code: string;

  @Column({ nullable: true })
  business_name: string;

  @Column({ nullable: true })
  business_instagram_username: string;

  @Column({ nullable: true })
  business_twitter_username: string;
}

enum UserType {
  BUSINESS = 'business',
  INFLUENCER = 'influencer',
}

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

enum MaritalStatus {
  MARRIED = 'married',
  SINGLE = 'single',
  DIVORCED = 'divorced',
  WIDOWED = 'widowed',
}
