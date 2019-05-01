import { ObjectType, Field, Int, Authorized, Float, ID } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import Property from "./Property";

@Entity()
@ObjectType()
export default class Roomtype {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

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

  @Field()
  @CreateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Field(type => Property)
  @ManyToOne(type => Property, property => property.roomtypes, { nullable: false })
  property: Property;
}
