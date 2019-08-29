export const withAsync = async fn => {
  try {
    const response = await fn();
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

export const withTries = async (fn, delay = 0, maxTries = 3, tries = 0) => {
  const [response, error] = await withAsync(() => fn());
  if (error && tries < maxTries) {
    return new Promise(resolve => {
      setTimeout(async () => {
        return resolve(withTries(fn, delay, maxTries, tries + 1));
      }, delay);
    });
  } else if (error) {
    return [null, error];
  }
  return [response, null];
};

export const trimPhoneNumber = el =>
  el.match(/(\(|\d)([0-9]|[A-Z]|[()-\s])+\d{2}\)?/)[0].trim();
