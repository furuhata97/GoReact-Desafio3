/**
 * Types
 */
export const Types = {
  MOSTRAR: "modal/MOSTRAR",
  ESCONDER: "modal/ESCONDER"
};

/**
 * Reducer
 */

const INITIAL_STATE = {
  visible: false,
  cordinates: null
};

export default function modal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.MOSTRAR:
      return {
        visible: true,
        cordinates: action.payload.cordinates
      };
    case Types.ESCONDER:
      return {
        visible: false,
        cordinates: null
      };
    default:
      return state;
  }
}

/**
 * Actions
 */

export const Creators = {
  mostrar: cordinates => ({
    type: Types.MOSTRAR,
    payload: { cordinates }
  }),

  esconder: () => ({
    type: Types.ESCONDER
  })
};
