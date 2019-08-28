export const withAsync = async fn => {
  try {
    const response = await fn();
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

export const trimPhoneNumber = el =>
  el.match(/(\(|\d)([0-9]|[A-Z]|[()-\s])+\d{2}\)?/)[0].trim();
