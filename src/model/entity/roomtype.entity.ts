import { ObjectType, Field, Int } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Property from "./property.entity";
import DateEntity from "../base/date.entity";

@Entity()
@ObjectType()
export default class Roomtype extends DateEntity {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => Int)
  @Column()
  propertyId: number;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  description?: string;

  @Field()
  @Column()
  size: number;

  @Field()
  @Column("smallint")
  minCapacity: number;

  @Field()
  @Column("smallint")
  maxCapacity: number;

  @Field(typee => Property)
  @ManyToOne(type => Property, property => property.roomtypes, { nullable: false })
  property: Promise<Property>;
}
