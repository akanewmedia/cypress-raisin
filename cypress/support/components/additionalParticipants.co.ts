import { elementById } from "../utils/actions";

export class AdditionalParticipants {
  container: any;
  constructor() {
    this.container = elementById('#base-page-top rx-additional-participants');
  }
}