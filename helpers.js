const bcrypt = require("bcrypt");

const hashPassword = (pass) => bcrypt.hashSync(pass, 12);
const comparePasswords = (pass, userPass) => bcrypt.compareSync(pass, userPass);

const numberGenerator = async (invoiceNo) => {
  let nextInvoiceNumber;

  const lastNumber = parseInt(invoiceNo.slice(-6), 10);
  nextInvoiceNumber = ("0000000" + (lastNumber + 1)).slice(-7);

  return nextInvoiceNumber;
};

const throwError = (message, status) => {
  const error = new Error(message);
  error.statusCode = status;

  throw error;
};

module.exports = {
  hashPassword,
  comparePasswords,
  numberGenerator,
  throwError,
};
