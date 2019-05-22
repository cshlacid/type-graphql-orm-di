import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import PropertyI18n from "./propertyI18n.entity";
import PropertyType from "../type/property.type";
import Roomtype from "./roomtype.entity";

@Entity()
@ObjectType()
@InputType("PropertyInput")
export default class Property extends PropertyType {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => PropertyI18n, propertyi18n => propertyi18n.property)
  i18ns: PropertyI18n[];

  @OneToMany(type => Roomtype, roomtype => roomtype.property)
  roomtypes: Roomtype[];
}
