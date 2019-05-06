import { ObjectType, Field, ID } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, Index } from "typeorm";
import PropertyI18n from "./propertyI18n.entity";
import Roomtype from "./roomtype.entity";

@Entity()
@ObjectType()
export default class Property {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Field()
  @Column({ length: 6 })
  postcode: string;

  @Field()
  @Column("time")
  checkinStart: string;

  @Field()
  @Column("time")
  checkinEnd: string;

  @Field()
  @Column("time")
  checkout: string;

  @Field()
  @CreateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Field(type => PropertyI18n, { nullable: true })
  @OneToOne(type => PropertyI18n, propertyi18n => propertyi18n.property)
  i18n: PropertyI18n;

  @Field(type => [PropertyI18n], { nullable: true })
  @OneToMany(type => PropertyI18n, propertyi18n => propertyi18n.property)
  i18ns: PropertyI18n[];

  @Field(type => [Roomtype], { nullable: true })
  @OneToMany(type => Roomtype, roomtype => roomtype.property)
  roomtypes: Roomtype[];
}
