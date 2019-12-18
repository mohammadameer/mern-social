const getUniqueErrorMessage = err => {
  let outpu;
  try {
    let fieldName = err.message.substring(
      err.message.lastIndexOf(".%") + 2,
      err.message.lastIndexOf("_1")
    );
    output =
      fieldName.chartAt(0).toUpperCase() +
      fieldName.slice(1) +
      " already exist";
  } catch (err) {
    output = "unique field already exist";
  }
  return output;
};

const getErrorMessage = err => {
  let message = "";
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = "something went wrong";
    }
  } else {
    for (let errName in err.errors) {
      if (err.error[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};
