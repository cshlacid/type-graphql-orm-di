import { Resolver, Query, Arg, Mutation, Authorized, Int } from "type-graphql";
import { Inject } from "typedi";
import { AddRoomtypeInput } from "../type/input/roomtype.input";
import Roomtype from "../model/entity/roomtype.entity";
import RoomtypeService from "../service/roomtype.service";

@Resolver(type => Roomtype)
class RoomtypeResolver {
  @Inject() private readonly roomtypeService: RoomtypeService;

  @Authorized("PROPERTY")
  @Query(returns => Roomtype, { nullable: true })
  roomtype(
    @Arg("propertyId", type => Int) propertyId: number,
    @Arg("roomtypeId", type => Int) roomtypeId: number,
  ): Promise<Roomtype | undefined> {
    return this.roomtypeService.getRoomtype(roomtypeId);
  }

  @Authorized("PROPERTY")
  @Query(returns => [Roomtype])
  roomtypes(@Arg("propertyId", type => Int) propertyId: number): Promise<Roomtype[]> {
    return this.roomtypeService.getRoomtypes(propertyId);
  }

  @Authorized("PROPERTY")
  @Mutation(returns => Roomtype)
  AddRoomtype(
    @Arg("propertyId", type => Int) propertyId: number,
    @Arg("data") RoomtypeData: AddRoomtypeInput,
  ): Promise<Roomtype> {
    return this.roomtypeService.addRoomtype(propertyId, RoomtypeData);
  }
}
