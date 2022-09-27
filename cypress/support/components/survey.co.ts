import { elementByClass, enterText, pressEsc, scrollToElement, selectMatDropDownOption } from "../utils/actions";
/**
 * Represents the survey component in forms
 */
export class SurveyComponent {
  container: any;
  fieldFillers: {};

  // fills out a textbox survey field
  textbox(container, answer) {
    const element = elementByClass(container, 'input[type="text"]');
    scrollToElement(element)
    return enterText(element, answer)
  }

  // fills out a textarea survey field
  textarea(container, answer) {
    const element = elementByClass(container, 'textarea');
    scrollToElement(element)
    return enterText(element, answer);
  }

  // fills out a radio button list survey field
  radioBtnList(container, answer) {
    const element = container.get('mat-radio-button').contains(answer);
    scrollToElement(element);
    return element.click();
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
    const dropDownSelector = elementByClass(container, 'mat-select');
    scrollToElement(container);
    selectMatDropDownOption(dropDownSelector, answer)
  }

  // factory method that returns a survey field filler based be the [type] parameter
  getSurveyFieldFiller(type, container, answer) {
    switch (type) {
      case 'text':
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
    let questionFound = false;
    cy.get('#survey rx-field-input').each(el => {
        // exist when finding the question
        if (questionFound) {
            return;
        }
        let label = el.find('.mat-label, .radio-title').first();
        let type = el.find('input').attr('type');

        if(!type && !!el.find('textarea').first()) {
          type = 'textarea';
        }
        console.log('bindSelectors',type, label.text());
        

        // label.prop('innerText')
        //     .then(questionValue => el.find('ng-star-inserted').first()
        //         .then(type => {
        //             if (questionValue.includes(question)) {                        
        //                 this.getSurveyFieldFiller(type, el, answer);
        //                 questionFound = true;
        //             }
        //         }))
    });
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
    data.forEach(o => {
      let question = o.question;
      let answer = o.answer;
      this.setAnswer({ question, answer });
    });

  }
}
