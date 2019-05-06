import { InputType, Field } from "type-graphql";
import Roomtype from "../../entity/roomtype.entity";

@InputType()
export class AddRoomtypeInput implements Partial<Roomtype> {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  size: number;

  @Field()
  minCapacity: number;

  @Field()
  maxCapacity: number;
}
