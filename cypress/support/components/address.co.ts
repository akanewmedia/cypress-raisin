//The information regarding the libraries
import { selectMatDropDownOption, enterText, setCheckboxChecked } from "../utils/actions";

export class Address {
  addressType: any;
  address: any;
  city: any;
  country: any;
  province: any;
  postCode: any;
  useMainParticipantAddress: any;
  constructor(private addressInformationContainer: any) {
    this.addressType = this.addressInformationContainer.$('#addressType');
    this.address = this.addressInformationContainer.$('#addressLine1');
    this.city = this.addressInformationContainer.$('#city');
    this.country = this.addressInformationContainer.$('#country');
    this.province = this.addressInformationContainer.$('#province');
    this.postCode = this.addressInformationContainer.$('#postalCode');
    this.useMainParticipantAddress = this.addressInformationContainer.$('#UseMainPartAddress-single');
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
