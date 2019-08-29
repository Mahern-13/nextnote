export const updateObj = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

/**
 * Merge state with object returned from the reducer
 * @param {object} reducer
 * @returns {object} reducer state object
 */
export function withStateMerge(reducer) {
  return function(state, action) {
    const result = reducer(state, action);
    return updateObj(state, result);
  };
}
