import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, Index } from "typeorm";
import DateEntity from "./date.entity";
import PropertyI18n from "./propertyI18n.entity";
import Roomtype from "./roomtype.entity";
import { Length } from "class-validator";
import PropertyBaseEntity from "./propertyBase.entity";

@Entity()
@ObjectType()
@InputType("PropertyInput")
export default class Property extends PropertyBaseEntity {
  @Index()
  @Field()
  @Length(5, 6)
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

  @Field(type => PropertyI18n, { nullable: true })
  @OneToOne(type => PropertyI18n, propertyi18n => propertyi18n.property)
  i18n: PropertyI18n;
}
