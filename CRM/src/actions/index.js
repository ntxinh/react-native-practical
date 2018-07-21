export const selectPerson = (peopleId) => {
  return {
    type: 'SELECTED_PERSON',
    payload: peopleId,
  };
};

export const noneSelected = () => {
  return {
    type: 'NONE_SELECTED',
  };
};
