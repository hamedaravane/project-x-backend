import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

@Entity('user', {database: 'test'})
export class UserEntity {
  @PrimaryColumn('uuid')
  uuid: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserType, nullable: false})
  type: UserType;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  persian_first_name: string;

  @Column()
  persian_last_name: string;

  @Column({nullable: true})
  national_id_number: string;

  @Column({nullable: true})
  national_registration_code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  date_of_birth: Date;

  @Column()
  instagram_username: string;

  @Column({ nullable: true })
  twitter_username: string;

  @Column()
  gender: string;

  @Column({ nullable: true })
  marital_status: MaritalStatus;

  @Column()
  mobile_phone_number: string;

  @Column({ nullable: true })
  country_of_residence: string;

  @Column({ nullable: true })
  state_of_residence: string;

  @Column()
  city_of_residence: string;

  @Column()
  address_of_residence: string;

  @Column({ nullable: true })
  postal_code: string;

  @Column({ nullable: true })
  business_name: string;

  @Column({ nullable: true })
  business_instagram_username: string;

  @Column({ nullable: true })
  business_twitter_username: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  type: string;
  first_name: string;
  last_name: string;
  persian_first_name: string;
  persian_last_name: string;
  national_id_number: string;
  national_registration_code: string;
  date_of_birth: string;
  instagram_username: string;
  twitter_username: string;
  gender: string;
  marital_status: string;
  mobile_phone_number: string;
  country_of_residence: string;
  state_of_residence: string;
  city_of_residence: string;
  address_of_residence: string;
  postal_code: string;
  business_name: string;
  business_instagram_username: string;
  business_twitter_username: string;
}

export interface User {
  uuid: string;
  email: string;
  password: string;
  type: string;
  firstName: string;
  lastName: string;
  persianFirstName: string;
  persianLastName: string;
  nationalIdNumber: string;
  nationalRegistrationCode: string;
  birthDate: Date;
  instagramUsername: string;
  twitterUsername: string;
  gender: Gender;
  maritalStatus: MaritalStatus;
  mobilePhoneNumber: string;
  residenceCountry: string;
  residenceState: string;
  residenceCity: string;
  address: string;
  postalCode: string;
  businessName: string;
  businessInstagramUsername: string;
  businessTwitterUsername: string;
}

// export function convertUserDomainToDto {}

export function convertUserDtoToUserEntity(data: CreateUserDto): UserEntity {
  return {
    uuid: crypto.randomUUID(),
    email: data.email,
    password: data.password,
    type: data.type,
    first_name: data.first_name,
    last_name: data.last_name,
    persian_first_name: data.persian_first_name,
    persian_last_name: data.persian_last_name,
    national_id_number: data.national_id_number,
    national_registration_code: data.national_registration_code,
    date_of_birth: new Date(data.date_of_birth),
    instagram_username: data.instagram_username,
    twitter_username: data.twitter_username,
    gender: data.gender,
    marital_status: MaritalStatus[data.marital_status],
    mobile_phone_number: data.mobile_phone_number,
    country_of_residence: data.country_of_residence,
    state_of_residence: data.state_of_residence,
    city_of_residence: data.city_of_residence,
    address_of_residence: data.address_of_residence,
    postal_code: data.postal_code,
    business_name: data.business_name,
    business_instagram_username: data.business_instagram_username,
    business_twitter_username: data.business_twitter_username
  }
}
