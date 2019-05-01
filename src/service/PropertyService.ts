import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { PropertyRepository } from "../repository/PropertyRepository";
import { LocaleEnum } from "../enum/locale.enum";
import { AddPropertyInput } from "../type/input/property.input";
import Property from "../entity/Property";
import PropertyI18n from "../entity/PropertyI18n";
import { getManager } from "typeorm";

@Service()
export default class PropertyService {
  @InjectRepository()
  private readonly propertyRepository: PropertyRepository;

  getProperty(propertyId: number) {
    return this.propertyRepository.getProperty(propertyId);
  }

  getProperties(skip: number, take: number) {
    return this.propertyRepository.getProperties(LocaleEnum.koKR, skip, take);
  }

  async addProperty(data: AddPropertyInput) {
    return getManager().transaction(async trx => {
      const property = new Property();
      property.postcode = data.postcode;
      property.checkinStart = data.checkinStart;
      property.checkinEnd = data.checkinEnd;
      property.checkout = data.checkout;
      await trx.save(property);

      const i18n = new PropertyI18n();
      i18n.name = data.name;
      i18n.description = data.description;
      i18n.property = property;
      await trx.save(i18n);

      return property;
    });
  }
}
