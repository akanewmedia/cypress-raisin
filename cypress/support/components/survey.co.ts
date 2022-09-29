import { elementByClass, elementsByClass, enterText, pressEsc, scrollToElement, selectMatDropDownOption, selectRadioption } from "../utils/actions";
/**
 * Represents the survey component in forms
 */
export class SurveyComponent {
  container: any;
  fieldFillers: {};

  // fills out a textbox survey field
  textbox(container, answer) {
    scrollToElement(container)
    return enterText(container, answer)
  }

  // fills out a textarea survey field
  textarea(container, answer) {
    scrollToElement(container)
    return enterText(container, answer);
  }

  // fills out a radio button list survey field
  radioBtnList(container, answer) {
    scrollToElement(container);
    return selectRadioption(container, answer);
  }

  // fills out the checkbox group survey field, the answer can be a string, or an array of strings
  checkboxGroup(container, answer) {
    scrollToElement(container);
    if (Array.isArray(answer)) {
      answer.forEach((ans) => {
        selectMatDropDownOption(container, ans);
        pressEsc();
      })
    } else {
      selectMatDropDownOption(container, answer);
    }
    pressEsc();
  }

  // fills out a kendo dropdown survey field
  dropdownlist(container, answer) {
    let element = null;
    if (typeof container === 'string') {
      element = elementByClass(container, 'mat-select');
    } else {
      element = container.find('mat-select');
    }

    scrollToElement(container);
    selectMatDropDownOption(element, answer)
  }

  // factory method that returns a survey field filler based be the [type] parameter
  getSurveyFieldFiller(type, container, answer) {
    switch (type) {
      case 'text':
      case 'tel':
        this.textbox(container, answer);
        break;
      case 'textarea':
        this.textarea(container, answer);
        break;
      case 'radio':
        this.radioBtnList(container, answer);
        break;
      case 'dropdownlist':
        this.dropdownlist(container, answer);
        break;
      case 'checkboxgroup':
      case 'checkbox':
        this.checkboxGroup(container, answer);
        break;
      default:
        // TODO: implement other types when necessary
        throw new Error(`To fix, please implement ${type} in the SurveyComponent`)
    }
  }
  /**
   * Parses the survey fields on the page. When this method resolves then the [this.fieldFillers] property
   * will be a hash of questions with a corresponding function that will fill out the field.
   * This cannot be called in the constructor, so call this prior to calling [fill].
   * @returns {promise.Promise<any[]> | *}
   */
  bindSelectors(question, answer) {
    let questionsFound = [];

    cy.get(elementsByClass('.survey .input-wrap')).each(el => {

      let label = el.find('mat-label, .radio-title');
      // Check to make sure that the quesiton being anwsered is the same that is passed
      if (label.text() === question) {
        let type = this.getElementType(el);
        let questionId = this.getQuestionId(label, type, el);

        // If the question has already been anwsered if it skipped
        if (questionsFound.filter((item) => item === questionId).length > 0) {
          return;
        }

        questionsFound.push(questionId);
        console.debug('bindSelectors', type, questionId, question, answer);
        this.getSurveyFieldFiller(type, el, answer);
      }
    });
  }

  /**
   * Gets the question id of the element
   *
   * @private
   * @param {JQuery<HTMLElement>} label
   * @param {string} type
   * @param {JQuery<HTMLElement>} el
   * @return {*} 
   * @memberof SurveyComponent
   */
  private getQuestionId(label: JQuery<HTMLElement>, elementType: string, el: JQuery<HTMLElement>) {
    let questionId = label.attr('for');
    if (elementType === 'radio' || elementType === 'dropdownlist') {
      questionId = el.find('mat-radio-group, mat-select').attr('id');
    }
    return questionId;
  }

  /**
   * Determines the type of input to fill and returns the type
   *
   * @private
   * @param {JQuery<HTMLElement>} el
   * @return {*} 
   * @memberof SurveyComponent
   */
  private getElementType(el: JQuery<HTMLElement>) {
    let elementType = el.find('input').attr('type');
    if (!elementType && el.find('textarea').first().length > 0) {
      elementType = 'textarea';
    }

    if (!elementType && el.find('mat-select').length > 0) {
      elementType = 'dropdownlist';
    }

    return elementType;
  }

  /**
   * Answers a survey question. Triggers a fail if the question is not found.
   * @param question
   * @param answer
   * @returns {*}
   */
  setAnswer({ question, answer }) {
    this.bindSelectors(question, answer);
  }

  /**
   * Fills the entire survey using [data.surveyResponses] which must be an array [{question: "...", answer: "..."}]
   * @param data
   */
  fill(data) {
    data.forEach(o => this.setAnswer(o));
  }
}
