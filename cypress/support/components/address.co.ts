//The information regarding the libraries
import { selectMatDropDownOption, enterText, setCheckboxChecked, elementById, buildSelector, scrollToElement } from "../utils/actions";

export class Address {
  addressType: any;
  address: any;
  city: any;
  country: any;
  province: any;
  postCode: any;
  useMainParticipantAddress: any;
  constructor(private addressInformationContainer: any) {
    this.addressType = buildSelector(this.addressInformationContainer, '#addressType');
    this.address = buildSelector(this.addressInformationContainer, '#addressLine1');
    this.city = buildSelector(this.addressInformationContainer, '#city');
    this.country = buildSelector(this.addressInformationContainer, '#country');
    this.province = buildSelector(this.addressInformationContainer, '#province');
    this.postCode = buildSelector(this.addressInformationContainer, '#postalCode');
    this.useMainParticipantAddress = buildSelector(this.addressInformationContainer, '#UseMainPartAddress-single');
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
    cy.get(this.postCode).clear()
    enterText(this.postCode, text);
  }

  setUseMyAddress(checked) {
    setCheckboxChecked(this.useMainParticipantAddress, checked);
  }
}
