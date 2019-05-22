import * as DataLoader from "dataloader";
import { Service } from "typedi";
import { EntityRepository, In } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { LocaleEnum } from "../type/enum/locale.enum";
import PropertyI18n from "../model/entity/propertyI18n.entity";

@Service()
@EntityRepository(PropertyI18n)
export class PropertyI18nRepository extends BaseRepository<PropertyI18n> {
  private propertyI18nsLoader: DataLoader<number, PropertyI18n[]> = new DataLoader(async ids => {
    const items = await this.getPropertyI18ns(ids);
    return Promise.resolve(ids.map(id => items.filter(item => item.propertyId === id)));
  }, { cache: false });

  getPropertyI18n(propertyId: number, locale: LocaleEnum) {
    return this.findOne({
      where: {
        property: {
          id: propertyId,
        },
        locale,
        deletedAt: null,
      },
    });
  }

  getPropertyI18ns(propertyIds: number | number[]) {
    if (!Array.isArray(propertyIds)) {
      propertyIds = [propertyIds];
    }

    return this.find({
      where: {
        property: {
          id: In(propertyIds),
        },
        deletedAt: null,
      },
    });
  }

  getPropertyI18nsLoader(propertyId: number) {
    return this.propertyI18nsLoader.load(propertyId);
  }

  addPropertyI18n(propertyId: number, i18n: PropertyI18n) {
    return this.save(this.create({
      ...i18n,
      propertyId,
    }));
  }
}
