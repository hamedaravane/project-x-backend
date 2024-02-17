import * as bcrypt from 'bcrypt';
import {Transform, Type} from 'class-transformer';
import {
  Allow,
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
  ValidateIf,
} from 'class-validator';
import {BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from 'typeorm';
import {v4 as uuid} from 'uuid';

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

export enum IndustryValue {
  CafeAndRestaurant = 'Restaurant & Cafe',
  Beauty = 'Beauty',
  Fashion = 'Fashion',
  Fitness = 'Fitness',
  Retail = 'Retail',
  Bookstore = 'Bookstore',
  Grocery = 'Grocery',
  Cinema = 'Cinema',
  Jewelry = 'Jewelry',
  Pharmacy = 'Pharmacy',
  Flower = 'Flower',
  Other = 'Other',
}

export enum ProfessionEnum {
  Food = 'Food',
  Beauty = 'Beauty',
  Fashion = 'Fashion',
  Society = 'Society',
  Art = 'Art',
  Musician = 'Musician',
  Fitness = 'Fitness',
  Medical = 'Medical',
  Reporter = 'Reporter',
  Actor = 'Actor',
  Book = 'Book',
  Jewelry = 'Jewelry',
  Other = 'Other',
}

@Entity('user')
export class UserEntity {
  @IsString()
  @PrimaryColumn({nullable: false, unique: true, type: 'uuid'})
  uuid = uuid();

  @IsString()
  @Column({unique: true, nullable: false})
  email: string;

  @IsString()
  @Column()
  password: string;

  @IsEnum(UserType)
  @Column({type: 'enum', enum: UserType, nullable: false})
  type: UserType;

  @IsEnum(ProfessionEnum)
  @IsNotEmpty()
  influencer_type: ProfessionEnum;

  @IsEnum(IndustryValue)
  @IsNotEmpty()
  business_type: IndustryValue;

  @Column()
  @IsString()
  @IsAlpha('en-US', {
    message: 'First name must only contain alphabetical characters',
  })
  @Length(1, 255, {
    message: 'First name must be between 1 and 255 characters long',
  })
  first_name: string;

  @Column()
  @IsString()
  @IsAlpha('en-US', {
    message: 'Last name must only contain alphabetical characters',
  })
  @Length(1, 255, {
    message: 'Last name must be between 1 and 255 characters long',
  })
  last_name: string;

  @Column()
  @IsAlpha('fa-IR', {
    message: 'Persian name must only contain persian alphabetical characters',
  })
  @Length(1, 255, {
    message: 'Persian name must be between 1 and 255 characters long',
  })
  persian_first_name: string;

  @Column()
  @IsAlpha('fa-IR', {
    message: 'Persian last name must only contain persian alphabetical characters',
  })
  @Length(1, 255, {
    message: 'Persian last name must be between 1 and 255 characters long',
  })
  persian_last_name: string;

  @Allow()
  @Column({nullable: true, unique: true})
  national_id_number: string;

  @Allow()
  @Column({nullable: true, unique: true})
  national_registration_code: string;

  @IsDate()
  @Type(() => Date)
  @CreateDateColumn()
  created_at: Date;

  @IsDate()
  @Type(() => Date)
  @UpdateDateColumn()
  updated_at: Date;

  @IsDate()
  @Type(() => Date)
  @Column()
  date_of_birth: Date;

  @Column({length: 30, unique: true})
  @Length(1, 30, {
    message: 'Instagram username must be between 1 and 30 characters long',
  })
  @Matches(/^[a-zA-Z0-9._]+$/, {
    message: 'Invalid characters in Instagram username',
  })
  instagram_username: string;

  @Column({length: 15, unique: true, nullable: true})
  @IsString({message: 'Twitter username must be a string'})
  @Length(1, 15, {
    message: 'Twitter username must be between 1 and 15 characters long',
  })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Invalid characters in Twitter username',
  })
  twitter_username: string;

  @Column({type: 'enum', enum: Gender, default: Gender.MALE, nullable: false})
  @IsEnum(Gender, {message: 'Invalid gender'})
  gender: Gender;

  @Column({
    type: 'enum',
    enum: MaritalStatus,
    default: MaritalStatus.SINGLE,
    nullable: true,
  })
  @IsEnum(MaritalStatus, {message: 'Invalid marital status'})
  marital_status: MaritalStatus;

  @Column({length: 15, unique: true})
  @IsString({message: 'Mobile phone number must be a string'})
  @IsMobilePhone(undefined, {strictMode: true})
  mobile_phone_number: string;

  @Allow()
  @Column({nullable: true})
  country_of_residence: string;

  @Allow()
  @Column({nullable: true})
  state_of_residence: string;

  @Allow()
  @Column()
  city_of_residence: string;

  @Allow()
  @Column({nullable: true})
  address_of_residence: string;

  @Allow()
  @Column({nullable: true})
  postal_code: string;

  @Allow()
  @Column({nullable: true})
  business_name: string;

  @Column({length: 30, unique: true, nullable: true})
  @IsString({message: 'Instagram username must be a string'})
  @Length(1, 30, {
    message: 'Instagram username must be between 1 and 30 characters long',
  })
  @Matches(/^[a-zA-Z0-9._]+$/, {
    message: 'Invalid characters in Instagram username',
  })
  business_instagram_username: string;

  @Allow()
  @Column({nullable: true})
  business_twitter_username: string;

  get age(): number {
    const today = new Date();
    const birthDate = new Date(this.date_of_birth);
    let age = today.getFullYear() - birthDate.getFullYear();

    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

/**
 * Data Transfer Object (DTO) for creating a new user.
 * This class defines the structure and validation rules for the data required to create a new user.
 * @class
 */

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {message: 'password is not strong enough'},
  )
  password: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  user_type: UserType;

  @IsEnum(ProfessionEnum)
  @IsNotEmpty()
  @ValidateIf(object => {
    return object.user_type === UserType.INFLUENCER;
  })
  influencer_type: ProfessionEnum;

  @IsEnum(IndustryValue)
  @IsNotEmpty()
  @ValidateIf(object => {
    return object.user_type === UserType.BUSINESS;
  })
  business_industry: IndustryValue;

  @IsString()
  @Transform(({value}) => value.charAt(0)?.toUpperCase() + value.slice(1))
  @IsNotEmpty()
  @ValidateIf(object => {
    return object.user_type === UserType.INFLUENCER;
  })
  first_name: string;

  @IsString()
  @Transform(({value}) => value.charAt(0)?.toUpperCase() + value.slice(1))
  @IsNotEmpty()
  @ValidateIf(object => {
    return object.user_type === UserType.INFLUENCER;
  })
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf(object => {
    return object.user_type === UserType.INFLUENCER;
  })
  persian_first_name: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf(object => {
    return object.user_type === UserType.INFLUENCER;
  })
  persian_last_name: string;

  @Allow()
  national_id_number: string | null;

  @Allow()
  national_registration_code: string | null;

  @Type(() => Date)
  @IsDate({message: 'Incorrect value for birth date'})
  @IsNotEmpty({message: 'Date of Birth should not be empty'})
  birth_date: Date;

  @IsString()
  @IsNotEmpty()
  @Length(1, 30, {
    message: 'Instagram username must be between 1 and 30 characters long',
  })
  @Matches(/^[a-zA-Z0-9._]+$/, {
    message: 'Invalid characters in Instagram username',
  })
  instagram_account: string;

  @Allow()
  twitter_account: string | null;

  @IsEnum(Gender)
  gender: Gender;

  @Allow()
  marital_status: MaritalStatus | null;

  @IsMobilePhone(undefined, {strictMode: true})
  mobile_phone_number: string;

  @Allow()
  country: string | null;

  @Allow()
  state: string | null;

  @IsString()
  city: string;

  @IsString()
  @ValidateIf(object => {
    return object.user_type === UserType.BUSINESS;
  })
  address: string;

  @Allow()
  postal_code: string | null;

  @Allow()
  business_name: string | null;

  @Allow()
  business_instagram_username: string | null;

  @Allow()
  business_twitter_username: string | null;
}

export function convertUserDtoToUserEntity(createUserDto: CreateUserDto): UserEntity {
  const userEntity = new UserEntity();

  userEntity.email = createUserDto.email;
  userEntity.password = createUserDto.password;
  userEntity.type = createUserDto.user_type;
  userEntity.influencer_type = createUserDto.influencer_type;
  userEntity.business_type = createUserDto.business_industry;
  userEntity.gender = createUserDto.gender;
  userEntity.first_name = createUserDto.first_name;
  userEntity.last_name = createUserDto.last_name;
  userEntity.persian_first_name = createUserDto.persian_first_name;
  userEntity.persian_last_name = createUserDto.persian_last_name;
  userEntity.national_id_number = createUserDto.national_id_number;
  userEntity.national_registration_code = createUserDto.national_registration_code;
  userEntity.date_of_birth = createUserDto.birth_date;
  userEntity.instagram_username = createUserDto.instagram_account;
  userEntity.twitter_username = createUserDto.twitter_account;
  userEntity.marital_status = createUserDto.marital_status;
  userEntity.mobile_phone_number = createUserDto.mobile_phone_number;
  userEntity.country_of_residence = createUserDto.country;
  userEntity.state_of_residence = createUserDto.state;
  userEntity.city_of_residence = createUserDto.city;
  userEntity.address_of_residence = createUserDto.address;
  userEntity.postal_code = createUserDto.postal_code;
  userEntity.business_name = createUserDto.business_name;
  userEntity.business_instagram_username = createUserDto.business_instagram_username;
  userEntity.business_twitter_username = createUserDto.business_twitter_username;

  return userEntity;
}

export interface CreateUserResponse {
  email: string;
}

export function userEntityToUserResponse(data: UserEntity): UserResponse {
  return {
    email: data.email,
    type: data.type,
    influencer_type: data.influencer_type,
    business_type: data.business_type,
    gender: data.gender,
    first_name: data.first_name,
    last_name: data.last_name,
    persian_first_name: data.persian_first_name,
    persian_last_name: data.persian_last_name,
    national_id_number: data.national_id_number,
    national_registration_code: data.national_registration_code,
    date_of_birth: data.date_of_birth,
    instagram_username: data.instagram_username,
    twitter_username: data.twitter_username,
    marital_status: data.marital_status,
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

export interface LoginUserResponse {
  token: string;
  user: UserResponse;
}

export interface UserResponse {
  email: string;
  type: UserType;
  influencer_type: ProfessionEnum;
  business_type: IndustryValue;
  gender: Gender;
  first_name: string;
  last_name: string;
  persian_first_name: string;
  persian_last_name: string;
  national_id_number: string;
  national_registration_code: string;
  date_of_birth: Date;
  instagram_username: string;
  twitter_username: string;
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

export class LoginInfo {
  @IsEmail({},{message: 'email is not in the right format'})
  @IsNotEmpty({message: 'email should not be empty'})
  @IsString()
  email: string;
  @IsString()
  @IsNotEmpty({message: 'password should not be empty'})
  password: string;
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
