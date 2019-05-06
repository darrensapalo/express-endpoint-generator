import R from 'ramda';

export const OptionalIgnorePrimaryKeyField = R.replace(/, <FILTER_PRIMARY_KEY\?>/g);

export const OptionalIgnorePrimaryKeyImport = R.replace(/<FILTER_PRIMARY_KEY_IMPORT\?>/g);
