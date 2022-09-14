exports.data = {
  URL: "donations/start",
  lang: "en-CA",
  donationAmount: "20.00",
  transactionNumberStartsWith: "Test-",
  tributeInfo: {
    firstName: "Michael",
    lastName: "Corleone",
    cardType: "No Card"
  },
  fullName: "Vito Corleone",
  firstName: "Vito",
  lastName: "Corleone",
  email: "aka@aka.com",
  address: "123 Main St",
  country: "Canada",
  province: "Ontario",
  city: "Toronto",
  postCode: "L7J 0A5",
  card: {
    verification: {
      type: "Mastercard",
      number: "xxxxxxxxxxxx5454",
      expiryDate: "12/2028"
    },
    number: "5454545454545454",
    cardHolderName: "Vito Corleone",
    expiryMonth: "12",
    expiryYear: "2028",
    cvv: "123"
  },
  failedCard: {
    verification: {
      type: "Visa",
      number: "xxxxxxxxxxxx1111",
      expiryDate: "12/2028"
    },
    number: "4111111111111111",
    cardHolderName: "Akaka",
    expiryMonth: "12",
    expiryYear: "2028"
  },
  honourRoleOption: "Name Only",
  allowAkaCommunication: true,
  allowScreenedCompanies: true,
  privateMessage: "Hello",
  customHonourRollText: "Don Corleone",
  sponsorshipLevel: "Custom Donation Amount",
  recurringDonationStartDateMessage: "Your first donation will be processed on",
  recurringDonationStartDays: [
    1,
    15
  ],
  surveyResponses: [
    {
      question: "Single Line Text",
      answer: "Aliquam ultricies fermentum dapibus. Nullam sodales tempus nulla a mollis"
    },
    {
      question: "Single Choice",
      answer: "Option 2"
    },
    {
      question: "Text Box",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam leo enim, eleifend vehicula cursus a, sollicitudin vel leo. Donec cursus elit eget dolor efficitur venenatis. Aenean ipsum nisl, semper ac faucibus quis, laoreet a elit. Mauris auctor tellus sapien, sit amet facilisis mauris sollicitudin sit amet. Nunc sed elit justo. Donec viverra sed ligula non maximus. Pellentesque in massa in tellus vulputate efficitur. Curabitur convallis id erat sed pulvinar. Aenean libero dolor, consectetur facilisis vulputate in, elementum id erat."
    },
    {
      question: "Radio Choice",
      answer: "no"
    }
  ],
  notSet: "",
  zero: "$0.00",
  promoCode: "ABC123",
  storePromoCode: "PROMO50",
  total: "35.00",
  totalAfterPromo: "-$35.00",
  afterPromoCodeText: "Half off jerseys -$50.00 CAD",
  successfulVolunteerText: "Thank you for Registering as a Volunteer",
  honourRollOptions: [
    "Other (Custom)",
    "Show My Name and Amount",
    "Show My Name Only",
    "Show My Name as Anonymous (amount will show)"
  ],
  requiredFieldsAmountValidationMessages: [
    "Donation Amount is required."
  ],
  minMaxAmountValidationMessages: [
    "Donation Amount must be between 5 and 10000000."
  ],
  requiredFieldsTributeInfoValidationMessages: [
    "First Name is required",
    "Last Name is required"
  ],
  requiredFieldsDonorInfoValidationMessages: [
    "First Name is required",
    "Last Name is required",
    "E-mail is required",
    "Address is required",
    "City is required",
    "Province / State is required",
    "Postal Code / ZIP is required"
  ],
  requiredFieldsPaymentValidationMessages: [
    "Credit Card Number is required",
    "Card Holder Name is required",
    "Expiration Month is required",
    "Expiration Year is required"
  ],
  invalidCVVValidationMessages: [
    "Enter a valid CVV"
  ],
  fundErrors: {
    invalidFund: "Fund is invalid",
    requiredFund: "Fund is required",
    requiredFundName: "Other Fund Name is required."
  }
}