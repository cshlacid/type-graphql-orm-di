import { Field, ObjectType, Int } from "type-graphql";
import { PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import DateEntity from "./date.entity";
import PropertyI18n from "./propertyI18n.entity";
import Roomtype from "./roomtype.entity";

@ObjectType()
export default abstract class PropertyBaseEntity extends DateEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => PropertyI18n, propertyi18n => propertyi18n.property)
  i18ns: PropertyI18n[];

  @OneToMany(type => Roomtype, roomtype => roomtype.property)
  roomtypes: Roomtype[];
}
