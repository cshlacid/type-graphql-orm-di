import { registerEnumType } from "type-graphql";

export enum LocaleEnum {
  koKR = "ko-KR",
  enUs = "en-US",
  jaJP = "ja-JP",
  zhCN = "zh-CN",
}

registerEnumType(LocaleEnum, {
  name: "LocaleEnum",
  description: "locale",
});
