export function isValidName(validate, message) {
  return this.test("isValidName", message, function (value) {
	  const { path, createError } = this;

	  if (!value.match(validate)) {
      return createError({
        path,
        message: message ?? "INVALID_FORMAT_ERROR_MESSAGE"
      });
    }

    return true;
  });
}

export function isValidPhone(validate, message) {
  return this.test("isValidName", message, function (value) {
	  const { path, createError } = this;

	  if (!value.match(validate)) {
      return createError({
        path,
        message: message ?? "INVALID_FORMAT_ERROR_MESSAGE"
      });
    }

    return true;
  });
}

