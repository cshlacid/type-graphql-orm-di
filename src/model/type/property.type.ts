import { Field, ObjectType, InputType } from "type-graphql";
import { OneToOne, Index, Column } from "typeorm";
import DateEntity from "../base/date.entity";
import PropertyI18n from "../entity/propertyI18n.entity";
import { Length } from "class-validator";

@ObjectType()
@InputType("PropertyInputType")
export default class PropertyType extends DateEntity {
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
