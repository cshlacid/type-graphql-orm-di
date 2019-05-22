import * as DataLoader from "dataloader";
import { Service } from "typedi";
import { Repository, EntityRepository, In } from "typeorm";
import Roomtype from "../model/entity/roomtype.entity";

@Service()
@EntityRepository(Roomtype)
export class RoomtypeRepository extends Repository<Roomtype> {
  private roomtypesLoader: DataLoader<number, Roomtype[]> = new DataLoader(async ids => {
    const items = await this.getRoomtypes(ids);
    return Promise.resolve(ids.map(id => items.filter(item => item.propertyId === id)));
  }, { cache: false });

  getRoomtype(roomtypeId: number) {
    return this.findOne({
      where: {
        id: roomtypeId,
        deletedAt: null,
      },
    });
  }

  getRoomtypes(propertyIds: number | number[]) {
    if (!Array.isArray(propertyIds)) {
      propertyIds = [propertyIds];
    }

    return this.find({
      where: {
        propertyId: In(propertyIds),
        deletedAt: null,
      },
      order: {
        id: "ASC",
      },
    });
  }

  getRoomtypesLoader(propertyId: number) {
    return this.roomtypesLoader.load(propertyId);
  }
}
