import { Resolver, Query, Args, Arg, ID, Mutation } from "type-graphql";
import Property from "../entity/Property";
import { Inject } from "typedi";
import PropertyService from "../service/PropertyService";
import { PaginationArg } from "../type/arg/pagination.arg";
import { AddPropertyInput } from "../type/input/property.input";

@Resolver()
class PropertyResolver {
  @Inject()
  private readonly propertyService: PropertyService;

  @Query(returns => Property, { nullable: true })
  property(@Arg("propertyId", type => ID) propertyId: number): Promise<Property | undefined> {
    return this.propertyService.getProperty(propertyId);
  }

  @Query(returns => [Property])
  properties(@Args() { skip, take }: PaginationArg): Promise<Property[]> {
    return this.propertyService.getProperties(skip, take);
  }

  @Mutation(returns => Property)
  AddProperty(@Arg("data") propertyData: AddPropertyInput): Promise<Property> {
    return this.propertyService.addProperty(propertyData);
  }
}
