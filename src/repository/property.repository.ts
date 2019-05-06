import { Service } from "typedi";
import { Repository, EntityRepository } from "typeorm";
import Property from "../entity/property.entity";
import { LocaleEnum } from "../enum/locale.enum";

@Service()
@EntityRepository(Property)
export class PropertyRepository extends Repository<Property> {
  getProperty(propertyId: number) {
    return this.findOne(propertyId);
  }

  getProperties(locale: LocaleEnum, skip: number, take: number) {
    return this.createQueryBuilder("property")
      .leftJoinAndSelect("property.i18n", "i18n", "i18n.deletedAt IS NULL AND i18n.locale = :locale", { locale })
      .leftJoinAndSelect("property.i18ns", "i18ns", "i18ns.deletedAt IS NULL")
      .leftJoinAndSelect("property.roomtypes", "roomtypes", "roomtypes.deletedAt IS NULL")
      .where("property.deletedAt IS NULL")
      .orderBy("property.id", "DESC")
      .skip(skip)
      .take(take)
      .getMany();
  }
}
