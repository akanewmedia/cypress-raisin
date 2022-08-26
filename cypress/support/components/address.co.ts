//The information regarding the libraries
import { selectMatDropDownOption, enterText, setCheckboxChecked, elementById } from "../utils/actions";

export class Address {
  addressType: any;
  address: any;
  city: any;
  country: any;
  province: any;
  postCode: any;
  useMainParticipantAddress: any;
  constructor(private addressInformationContainer: any) {
    this.addressType = elementById(this.addressInformationContainer, '#addressType');
    this.address = elementById(this.addressInformationContainer, '#addressLine1');
    this.city = elementById(this.addressInformationContainer, '#city');
    this.country = elementById(this.addressInformationContainer, '#country');
    this.province = elementById(this.addressInformationContainer, '#province');
    this.postCode = elementById(this.addressInformationContainer, '#postalCode');
    this.useMainParticipantAddress = elementById(this.addressInformationContainer, '#UseMainPartAddress-single');
  }

  selectAddressType(addressType) {
    selectMatDropDownOption(this.addressType, addressType);
  }

  selectCountry(country) {
    selectMatDropDownOption(this.country, country);
  }

  selectProvince(province) {
    selectMatDropDownOption(this.province, province);
  }

  enterAddress(text) {
    enterText(this.address, text);
  }

  enterCity(text) {
    enterText(this.city, text);
  }

  enterPostCode(text) {
    enterText(this.postCode, text);
  }

  setUseMyAddress(checked) {
    setCheckboxChecked(this.useMainParticipantAddress, checked);
  }
}
