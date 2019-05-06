import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import Roomtype from "../entity/roomtype.entity";
import { RoomtypeRepository } from "../repository/roomtype.repository";
import { AddRoomtypeInput } from "../graphql/input/roomtype.input";
import { PropertyRepository } from "../repository/property.repository";

@Service()
export default class RoomtypeService {
  @InjectRepository() private readonly propertyRepository: PropertyRepository;
  @InjectRepository() private readonly roomtypeRepository: RoomtypeRepository;

  getRoomtype(roomtypeId: number) {
    return this.roomtypeRepository.getRoomtype(roomtypeId);
  }

  getRoomtypes(propertyId: number, skip: number, take: number) {
    return this.roomtypeRepository.getRoomtypes(propertyId, skip, take);
  }

  async addRoomtype(propertyId: number, data: AddRoomtypeInput) {
    const property = await this.propertyRepository.getProperty(propertyId);
    if (!property) {
      throw new Error("property not found");
    }

    const roomtype = new Roomtype();
    roomtype.name = data.name;
    roomtype.description = data.description;
    roomtype.size = data.size;
    roomtype.minCapacity = data.minCapacity;
    roomtype.maxCapacity = data.maxCapacity;
    roomtype.property = property;
    return this.roomtypeRepository.save(roomtype);
  }
}
