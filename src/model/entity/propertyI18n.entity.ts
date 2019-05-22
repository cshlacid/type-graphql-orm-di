import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Entity, PrimaryColumn, ManyToOne } from "typeorm";
import PropertyI18nBase from "../type/propertyI18n.type";
import { LocaleEnum } from "../../type/enum/locale.enum";
import Property from "./property.entity";

@Entity()
@ObjectType()
@InputType("PropertyI18nInput")
export default class PropertyI18n extends PropertyI18nBase {
  @Field(type => Int)
  @PrimaryColumn()
  propertyId: number;

  @Field(type => LocaleEnum)
  @PrimaryColumn("enum", { enum: LocaleEnum })
  locale: LocaleEnum;

  @ManyToOne(type => Property, property => property.i18ns, { nullable: false })
  property: Property;
}
