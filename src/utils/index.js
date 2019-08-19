export const withAsync = async fn => {
  try {
    const response = await fn();
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};
