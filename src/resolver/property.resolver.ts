import { Resolver, Query, Args, Arg, Mutation, Authorized, FieldResolver, Root, Int } from "type-graphql";
import { Inject } from "typedi";
import { PaginationArg } from "../graphql/arg/pagination.arg";
import { AddPropertyInput } from "../graphql/input/property.input";
import Property from "../entity/property.entity";
import PropertyI18n from "../entity/propertyI18n.entity";
import Roomtype from "../entity/roomtype.entity";
import PropertyService from "../service/property.service";
import RoomtypeService from "../service/roomtype.service";

@Resolver(type => Property)
class PropertyResolver {
  @Inject() private readonly propertyService: PropertyService;
  @Inject() private readonly roomtypeService: RoomtypeService;

  // @Authorized("PROPERTY")
  @Query(returns => Property, { nullable: true })
  property(
    @Arg("propertyId", type => Int) propertyId: number,
    @Arg("force", type => Boolean, { nullable: true }) force = false,
  ): Promise<Property | undefined> {
    return this.propertyService.getProperty(propertyId, force);
  }

  // @Authorized("ADMIN")
  @Query(returns => [Property], { nullable: true })
  properties(@Args() { skip, take }: PaginationArg): Promise<Property[]> {
    return this.propertyService.getProperties(skip, take);
  }

  // @Authorized("PROPERTY")
  // @FieldResolver(returns => [PropertyI18n], { nullable: true })
  // i18ns(@Root() property: Property): Promise<PropertyI18n[]> {
  //   return this.propertyService.getpropertyI18ns(property.id);
  // }

  @Authorized("PROPERTY")
  @FieldResolver(returns => [Roomtype], { nullable: true })
  roomtypes(@Root() property: Property): Promise<Roomtype[]> {
    return this.roomtypeService.getRoomtypes(property.id);
  }

  // @Authorized("ADMIN")
  @Mutation(returns => Property)
  addProperty(@Arg("data", type => Property) data: Property): Promise<Property> {
    return this.propertyService.addProperty(data);
  }
}
