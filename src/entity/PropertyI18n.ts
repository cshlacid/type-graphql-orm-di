import { ObjectType, Field, Int, Authorized, Float, ID } from "type-graphql";
import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, PrimaryColumn, ManyToOne } from "typeorm";
import { LocaleEnum } from "../enum/locale.enum";
import Property from "./Property";

@Entity()
@ObjectType()
export default class PropertyI18n {
  @Field(type => ID)
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

  @Field()
  @CreateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @ManyToOne(type => Property, property => property.roomtypes, { nullable: false })
  property: Property;
}
