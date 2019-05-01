import { InputType, Field } from "type-graphql";
import Property from "../../entity/Property";

@InputType()
export class AddPropertyInput implements Partial<Property> {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  postcode: string;

  @Field()
  checkinStart: string;

  @Field()
  checkinEnd: string;

  @Field()
  checkout: string;
}
