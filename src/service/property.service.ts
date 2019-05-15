import { Service } from "typedi";
import { getManager } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { LocaleEnum } from "../enum/locale.enum";
import { AddPropertyInput } from "../graphql/input/property.input";
import { PropertyRepository } from "../repository/property.repository";
import { PropertyI18nRepository } from "../repository/propertyI18n.repository";
import Property from "../entity/property.entity";
import PropertyI18n from "../entity/propertyI18n.entity";
import { Transactional } from "typeorm-transactional-cls-hooked";

@Service()
export default class PropertyService {
  @InjectRepository() private readonly propertyRepository: PropertyRepository;
  @InjectRepository() private readonly propertyI18nRepository: PropertyI18nRepository;

  getProperty(propertyId: number, force = false) {
    return this.propertyRepository.getProperty(propertyId, force);
  }

  getProperties(skip: number, take: number) {
    return this.propertyRepository.getProperties(LocaleEnum.koKR, skip, take);
  }

  getpropertyI18ns(propertyId: number) {
    return this.propertyI18nRepository.getPropertyI18nsLoader(propertyId);
  }

  @Transactional()
  async addProperty(data: Property) {
    const property = await this.propertyRepository.addProperty(data);
    await this.propertyI18nRepository.addPropertyI18n(property.id, data.i18n);

    return property;
  }
}
