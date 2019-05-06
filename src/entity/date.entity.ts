import { Field, ObjectType } from "type-graphql";
import { CreateDateColumn, UpdateDateColumn, Column } from "typeorm";

@ObjectType()
export default abstract class DateEntity {
  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date;
}
