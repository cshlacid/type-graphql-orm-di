import { ObjectType, Field, Int } from "type-graphql";
import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { LocaleEnum } from "../enum/locale.enum";
import Property from "./property.entity";
import DateEntity from "./date.entity";

@Entity()
@ObjectType()
export default class PropertyI18n extends DateEntity {
  @Field(type => Int)
  @PrimaryColumn()
  propertyId: number;

  @Field(type => LocaleEnum)
  @PrimaryColumn("enum", { enum: LocaleEnum })
  locale: LocaleEnum;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  description?: string;

  @ManyToOne(type => Property, property => property.roomtypes, { nullable: false })
  property: Property;
}
