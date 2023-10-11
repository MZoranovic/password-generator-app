function useState(cb) {
  let state = {
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
    charactersLength: 0,
    password: '',
  };

  const setState = (newState) => {
    state = { ...state, ...newState };
    cb(state);
  };

  const getState = () => state;

  return [getState, setState];
}
