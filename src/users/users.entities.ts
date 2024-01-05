import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import {
  IsAlpha,
  IsDate,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import {v4 as uuid} from 'UUID';

enum UserType {
  BUSINESS = 'business',
  INFLUENCER = 'influencer',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'nonBinary',
}

enum MaritalStatus {
  MARRIED = 'married',
  SINGLE = 'single',
  DIVORCED = 'divorced',
  WIDOWED = 'widowed',
}

@Entity('user', { database: 'test' })
export class UserEntity {
  @PrimaryColumn({ nullable: false, unique: true, type: 'uuid' })
  uuid = uuid();

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserType, nullable: false })
  type: UserType;

  @Column()
  @IsString()
  @IsAlpha(
    'en-US', { message: 'First name must only contain alphabetical characters' })
  @Length(1, 255, { message: 'First name must be between 1 and 255 characters long' })
  first_name: string;

  @Column()
  @IsString()
  @IsAlpha(
    'en-US', { message: 'Last name must only contain alphabetical characters' })
  @Length(1, 255, { message: 'Last name must be between 1 and 255 characters long' })
  last_name: string;

  @Column()
  @IsAlpha(
    'fa-IR', { message: 'Persian name must only contain persian alphabetical characters' })
  @Length(1, 255, { message: 'Persian name must be between 1 and 255 characters long' })
  persian_first_name: string;

  @Column()
  @IsAlpha(
    'fa-IR', { message: 'Persian last name must only contain persian alphabetical characters' })
  @Length(1, 255, { message: 'Persian last name must be between 1 and 255 characters long' })
  persian_last_name: string;

  @Column({ nullable: true, unique: true })
  national_id_number: string;

  @Column({ nullable: true, unique: true })
  national_registration_code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  date_of_birth: Date;

  @Column({ length: 30, unique: true })
  @Length(1, 30, { message: 'Instagram username must be between 1 and 30 characters long' })
  @Matches(/^[a-zA-Z0-9._]+$/, { message: 'Invalid characters in Instagram username' })
  instagram_username: string;

  @Column({ length: 15, unique: true, nullable: true })
  @IsString({ message: 'Twitter username must be a string' })
  @Length(1, 15, { message: 'Twitter username must be between 1 and 15 characters long' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Invalid characters in Twitter username' })
  twitter_username: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.MALE, nullable: false })
  @IsEnum(Gender, { message: 'Invalid gender' })
  gender: Gender;

  @Column({ type: 'enum', enum: MaritalStatus, default: MaritalStatus.SINGLE, nullable: true })
  @IsEnum(MaritalStatus, { message: 'Invalid marital status' })
  marital_status: MaritalStatus;

  @Column({ length: 15, unique: true })
  @IsString({ message: 'Mobile phone number must be a string' })
  @IsMobilePhone(undefined, { strictMode: true })
  mobile_phone_number: string;

  @Column({ nullable: true })
  country_of_residence: string;

  @Column({ nullable: true })
  state_of_residence: string;

  @Column()
  city_of_residence: string;

  @Column({ nullable: true })
  address_of_residence: string;

  @Column({ nullable: true })
  postal_code: string;

  @Column({ nullable: true })
  business_name: string;

  @Column({ length: 30, unique: true, nullable: true })
  @IsString({ message: 'Instagram username must be a string' })
  @Length(1, 30, { message: 'Instagram username must be between 1 and 30 characters long' })
  @Matches(/^[a-zA-Z0-9._]+$/, { message: 'Invalid characters in Instagram username' })
  business_instagram_username: string;

  @Column({ nullable: true })
  business_twitter_username: string;

  get age(): number {
    const today = new Date();
    const birthDate = new Date(this.date_of_birth);
    let age = today.getFullYear() - birthDate.getFullYear();

    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }, { message: 'password is not strong enough' })
  password: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  type: UserType;

  @IsString()
  @Transform(({ value } ) => value.charAt(0)?.toUpperCase() + value.slice(1))
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @Transform(({ value } ) => value.charAt(0)?.toUpperCase() + value.slice(1))
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  persian_first_name: string;

  @IsString()
  @IsNotEmpty()
  persian_last_name: string;

  national_id_number: string | null;

  national_registration_code: string | null;

  @IsDate({ message: 'Incorrect value for birth date' })
  @IsNotEmpty({message: 'Date of Birth should not be empty'})
  date_of_birth: Date;

  @IsString()
  @IsNotEmpty()
  @Length(1, 30, { message: 'Instagram username must be between 1 and 30 characters long' })
  @Matches(/^[a-zA-Z0-9._]+$/, { message: 'Invalid characters in Instagram username' })
  instagram_username: string;

  twitter_username: string | null;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(MaritalStatus)
  marital_status: MaritalStatus | null;

  @IsMobilePhone(undefined, {strictMode: true})
  mobile_phone_number: string;

  country_of_residence: string | null;

  state_of_residence: string | null;
  @IsString()
  city_of_residence: string;

  @IsString()
  address_of_residence: string;

  postal_code: string | null;

  business_name: string | null;

  business_instagram_username: string | null;

  business_twitter_username: string | null;
}

export function convertUserDtoToUserEntity(createUserDto: CreateUserDto): UserEntity {
  const userEntity = new UserEntity();

  userEntity.email = createUserDto.email;
  userEntity.password = createUserDto.password;
  userEntity.gender = createUserDto.gender;
  userEntity.first_name = createUserDto.first_name;
  userEntity.last_name = createUserDto.last_name;
  userEntity.persian_first_name = createUserDto.persian_first_name;
  userEntity.persian_last_name = createUserDto.persian_last_name;
  userEntity.national_id_number = createUserDto.national_id_number;
  userEntity.national_registration_code = createUserDto.national_registration_code;
  userEntity.date_of_birth = createUserDto.date_of_birth;
  userEntity.instagram_username = createUserDto.instagram_username;
  userEntity.twitter_username = createUserDto.twitter_username;
  userEntity.marital_status = createUserDto.marital_status;
  userEntity.mobile_phone_number = createUserDto.mobile_phone_number;
  userEntity.country_of_residence = createUserDto.country_of_residence;
  userEntity.state_of_residence = createUserDto.state_of_residence;
  userEntity.city_of_residence = createUserDto.city_of_residence;
  userEntity.address_of_residence = createUserDto.address_of_residence;
  userEntity.postal_code = createUserDto.postal_code;
  userEntity.business_name = createUserDto.business_name;
  userEntity.business_instagram_username = createUserDto.business_instagram_username;
  userEntity.business_twitter_username = createUserDto.business_twitter_username;

  return userEntity;
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
