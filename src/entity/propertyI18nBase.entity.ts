import { ObjectType, Field, Int } from "type-graphql";
import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { LocaleEnum } from "../enum/locale.enum";
import Property from "./property.entity";
import DateEntity from "./date.entity";

@Entity()
@ObjectType()
export default class PropertyI18nBase extends DateEntity {
  @Field(type => Int)
  @PrimaryColumn()
  propertyId: number;

  @Field(type => LocaleEnum)
  @PrimaryColumn("enum", { enum: LocaleEnum })
  locale: LocaleEnum;

  @ManyToOne(type => Property, property => property.i18ns, { nullable: false })
  property: Property;
}
