import R from 'ramda';

/**
 * Replaces the model name on a given string.
 */
export const ReplaceModelName = R.replace(/<MODEL_NAME>/g);

export const ReplaceTimestamp = R.replace(/<TIMESTAMP>/g);

export const ReplaceGetRoute = R.replace(/<GET_ROUTE>/g);

export const ReplaceCreateRoute = R.replace(/<CREATE_ROUTE>/g);

export const ReplaceDeleteRoute = R.replace(/<DELETE_ROUTE>/g);

export const ReplaceGetFilename = R.replace(/<GET_FILENAME>/g);

export const ReplaceCreateFilename = R.replace(/<CREATE_FILENAME>/g);

export const ReplaceDeleteFilename = R.replace(/<DELETE_FILENAME>/g);

export const ReplaceGetFunc = R.replace(/<GET_FUNC>/g);

export const ReplaceCreateFunc = R.replace(/<CREATE_FUNC>/g);

export const ReplaceDeleteFunc = R.replace(/<DELETE_FUNC>/g);