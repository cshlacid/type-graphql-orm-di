import { ObjectType, Field } from "type-graphql";
import { Entity, Column } from "typeorm";
import DateEntity from "../base/date.entity";

@Entity()
@ObjectType()
export default class PropertyI18nBase extends DateEntity {
  @Field()
  @Column({ length: 100 })
  name: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  description?: string;
}
