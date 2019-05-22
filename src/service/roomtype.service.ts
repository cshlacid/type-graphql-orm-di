import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { RoomtypeRepository } from "../repository/roomtype.repository";
import { PropertyRepository } from "../repository/property.repository";
import { AddRoomtypeInput } from "../type/input/roomtype.input";

@Service()
export default class RoomtypeService {
  @InjectRepository() private readonly propertyRepository: PropertyRepository;
  @InjectRepository() private readonly roomtypeRepository: RoomtypeRepository;

  getRoomtype(roomtypeId: number) {
    return this.roomtypeRepository.getRoomtype(roomtypeId);
  }

  getRoomtypes(propertyId: number) {
    return this.roomtypeRepository.getRoomtypesLoader(propertyId);
  }

  async addRoomtype(propertyId: number, data: AddRoomtypeInput) {
    const property = await this.propertyRepository.getProperty(propertyId);
    if (!property) {
      throw new Error("property not found");
    }

    // const roomtype = new Roomtype();
    // roomtype.name = data.name;
    // roomtype.description = data.description;
    // roomtype.size = data.size;
    // roomtype.minCapacity = data.minCapacity;
    // roomtype.maxCapacity = data.maxCapacity;
    // roomtype.propertyId = property.id;
    // return this.roomtypeRepository.save(roomtype);

    const roomtype = this.roomtypeRepository.create({
      ...data,
    });

    return this.roomtypeRepository.save(roomtype);
  }
}
