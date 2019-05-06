import { Service } from "typedi";
import { Repository, EntityRepository } from "typeorm";
import Roomtype from "../entity/roomtype.entity";

@Service()
@EntityRepository(Roomtype)
export class RoomtypeRepository extends Repository<Roomtype> {
  getRoomtype(roomtypeId: number) {
    return this.findOne(roomtypeId);
  }

  getRoomtypes(propertyId: number, skip: number, take: number) {
    return this.find({
      where: {
        property: {
          id: propertyId,
        },
      },
      order: {
        id: "ASC",
      },
      skip,
      take,
    });
  }
}
