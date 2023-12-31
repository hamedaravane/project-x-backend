import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  uuid: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  type: string;

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

export interface UserDto {
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

// export function convertUserDtoToDomain {}

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
