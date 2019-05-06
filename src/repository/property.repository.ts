import { Service } from "typedi";
import { Repository, EntityRepository, getConnection, Connection } from "typeorm";
import Property from "../entity/property.entity";
import { LocaleEnum } from "../enum/locale.enum";

@Service()
@EntityRepository(Property)
export class PropertyRepository extends Repository<Property> {
  private connection: Connection;
  constructor() {
    super();
    this.connection = getConnection();
  }

  async getProperty(propertyId: number, force = false) {
    const cacheId = `property_${propertyId}`;
    if (force) {
      if (this.connection.queryResultCache) {
        await this.connection.queryResultCache.remove([cacheId]);
      }
    }

    return this.findOne(propertyId, {
      relations: ["i18n"],
      cache: {
        id: cacheId,
        milliseconds: 60000,
      },
    });
  }

  getProperties(locale: LocaleEnum, skip: number, take: number) {
    return this.createQueryBuilder("property")
      .leftJoinAndSelect("property.i18n", "i18n", "i18n.deletedAt IS NULL AND i18n.locale = :locale", { locale })
      .where("property.deletedAt IS NULL")
      .orderBy("property.id", "DESC")
      .skip(skip)
      .take(take)
      .getMany();
  }
}
