import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { v4 as uuid } from "uuid";
import {
  IsAlpha,
  IsDate,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength
} from "class-validator";
import { Transform } from "class-transformer";
import * as bcrypt from "bcrypt";
import { isMobilePhone } from "class-validator/types/decorator/string/IsMobilePhone";

enum UserType {
  BUSINESS = "business",
  INFLUENCER = "influencer",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  NON_BINARY = "nonBinary",
}

enum MaritalStatus {
  MARRIED = "married",
  SINGLE = "single",
  DIVORCED = "divorced",
  WIDOWED = "widowed",
}

@Entity("user", { database: "test" })
export class UserEntity {
  @PrimaryColumn({ nullable: false, unique: true, type: "uuid" })
  uuid: string;

  @Column({ unique: true, nullable: false })
  @IsEmail()
  email: string;

  @Column()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @MaxLength(255, { message: "Password is too long" })
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ type: "enum", enum: UserType, nullable: false })
  type: UserType;

  @Column()
  @Transform(({ value }) => value.charAt(0).toUpperCase() + value.slice(1))
  @IsAlpha(
    "en-US", { message: "First name must only contain alphabetical characters" })
  @Length(1, 255, { message: "First name must be between 1 and 255 characters long" })
  first_name: string;

  @Column()
  @Transform(({ value }) => value.charAt(0).toUpperCase() + value.slice(1))
  @IsAlpha(
    "en-US", { message: "Last name must only contain alphabetical characters" })
  @Length(1, 255, { message: "Last name must be between 1 and 255 characters long" })
  last_name: string;

  @Column()
  @IsAlpha(
    "fa-IR", { message: "Persian name must only contain persian alphabetical characters" })
  @Length(1, 255, { message: "Persian name must be between 1 and 255 characters long" })
  persian_first_name: string;

  @Column()
  @IsAlpha(
    "fa-IR", { message: "Persian last name must only contain persian alphabetical characters" })
  @Length(1, 255, { message: "Persian last name must be between 1 and 255 characters long" })
  persian_last_name: string;

  @Column({ nullable: true, unique: true })
  national_id_number: string;

  @Column({ nullable: true, unique: true })
  national_registration_code: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @Column({ type: "date" })
  @IsDate({ message: "Invalid date format for date_of_birth" })
  date_of_birth: Date;

  get age(): number {
    const today = new Date();
    const birthDate = new Date(this.date_of_birth);
    let age = today.getFullYear() - birthDate.getFullYear();

    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  @Column({ length: 30, unique: true })
  @IsString({ message: "Instagram username must be a string" })
  @Length(1, 30, { message: "Instagram username must be between 1 and 30 characters long" })
  @Matches(/^[a-zA-Z0-9._]+$/, { message: "Invalid characters in Instagram username" })
  instagram_username: string;

  @BeforeInsert()
  @BeforeUpdate()
  normalizeInstagramUsername() {
    this.instagram_username = this.instagram_username.toLowerCase();
  }

  @Column({ length: 15, unique: true, nullable: true })
  @IsString({ message: "Twitter username must be a string" })
  @Length(1, 15, { message: "Twitter username must be between 1 and 15 characters long" })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: "Invalid characters in Twitter username" })
  twitter_username: string;

  @BeforeInsert()
  @BeforeUpdate()
  normalizeTwitterUsername() {
    this.twitter_username = this.twitter_username.toLowerCase();
  }

  @Column({ type: "enum", enum: Gender, default: Gender.MALE, nullable: false })
  @IsEnum(Gender, { message: "Invalid gender" })
  gender: Gender;

  @Column({ type: 'enum', enum: MaritalStatus, default: MaritalStatus.SINGLE, nullable: true })
  @IsEnum(MaritalStatus, { message: 'Invalid marital status' })
  marital_status: MaritalStatus;

  @Column({ length: 15, unique: true })
  @IsString({ message: 'Mobile phone number must be a string' })
  @IsMobilePhone(undefined,{strictMode: true})
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
  @IsString({ message: "Instagram username must be a string" })
  @Length(1, 30, { message: "Instagram username must be between 1 and 30 characters long" })
  @Matches(/^[a-zA-Z0-9._]+$/, { message: "Invalid characters in Instagram username" })
  business_instagram_username: string;

  @Column({ nullable: true })
  business_twitter_username: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  type: UserType;
  first_name: string;
  last_name: string;
  persian_first_name: string;
  persian_last_name: string;
  national_id_number: string;
  national_registration_code: string;
  date_of_birth: Date;
  instagram_username: string;
  twitter_username: string;
  gender: Gender;
  marital_status: MaritalStatus;
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

export function convertUserDtoToUserEntity(data: CreateUserDto): UserEntity {
  return {
    uuid: uuid(),
    email: data.email,
    password: data.password,
    type: data.type,
    first_name: data.first_name,
    last_name: data.last_name,
    persian_first_name: data.persian_first_name,
    persian_last_name: data.persian_last_name,
    national_id_number: data.national_id_number,
    national_registration_code: data.national_registration_code,
    created_at: new Date(),
    updated_at: new Date(),
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
  };
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
