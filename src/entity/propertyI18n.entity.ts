import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { LocaleEnum } from "../enum/locale.enum";
import Property from "./property.entity";
import DateEntity from "./date.entity";
import PropertyI18nBase from "./propertyI18nBase.entity";

@Entity()
@ObjectType()
@InputType("PropertyI18nInput")
export default class PropertyI18n extends PropertyI18nBase {
  @Field()
  @Column({ length: 100 })
  name: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  description?: string;
}
