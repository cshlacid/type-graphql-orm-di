import { Resolver, Query, Args, Arg, ID, Mutation, Authorized } from "type-graphql";
import { Inject } from "typedi";
import { PaginationArg } from "../graphql/arg/pagination.arg";
import RoomtypeService from "../service/roomtype.service";
import Roomtype from "../entity/roomtype.entity";
import { AddRoomtypeInput } from "../graphql/input/roomtype.input";

@Resolver()
class RoomtypeResolver {
  @Inject() private readonly roomtypeService: RoomtypeService;

  @Query(returns => Roomtype, { nullable: true })
  roomtype(@Arg("roomtypeId", type => ID) roomtypeId: number): Promise<Roomtype | undefined> {
    return this.roomtypeService.getRoomtype(roomtypeId);
  }

  @Query(returns => [Roomtype])
  roomtypes(@Arg("propertyId", type => ID) propertyId: number, @Args() { skip, take }: PaginationArg): Promise<Roomtype[]> {
    return this.roomtypeService.getRoomtypes(propertyId, skip, take);
  }

  @Authorized("PROPERTY")
  @Mutation(returns => Roomtype)
  AddRoomtype(@Arg("propertyId", type => ID) propertyId: number, @Arg("data") RoomtypeData: AddRoomtypeInput): Promise<Roomtype> {
    return this.roomtypeService.addRoomtype(propertyId, RoomtypeData);
  }
}
