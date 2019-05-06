import R from 'ramda';
import {map} from "rxjs/operators";
import {pipe} from "rxjs";
import {
    OptionalIgnorePrimaryKeyField,
    OptionalIgnorePrimaryKeyImport
} from "@parser/options";

/**
 * Replaces the model name on a given string.
 */
export const ReplaceModelName = R.replace(/<MODEL_NAME>/g);
/**
 * Replaces the timestamp placeholder with actual timestamp data.
 */
export const ReplaceTimestamp = R.replace(/<TIMESTAMP>/g);


/**
 * Generic route replacements
 */
export const ReplaceFetchRoute = R.replace(/<FETCH_ROUTE>/g);
export const ReplaceFetchFilename = R.replace(/<FETCH_FILENAME>/g);
export const ReplaceFetchFunc = R.replace(/<FETCH_FUNC>/g);

export const ReplaceCreateRoute = R.replace(/<CREATE_ROUTE>/g);
export const ReplaceCreateFilename = R.replace(/<CREATE_FILENAME>/g);
export const ReplaceCreateFunc = R.replace(/<CREATE_FUNC>/g);

export const ReplaceDeleteRoute = R.replace(/<DELETE_ROUTE>/g);
export const ReplaceDeleteFilename = R.replace(/<DELETE_FILENAME>/g);
export const ReplaceDeleteFunc = R.replace(/<DELETE_FUNC>/g);

export const ReplaceListRoute = R.replace(/<LIST_ROUTE>/g);
export const ReplaceListFilename = R.replace(/<LIST_FILENAME>/g);
export const ReplaceListFunc = R.replace(/<LIST_FUNC>/g);

export const ReplaceUpdateRoute = R.replace(/<UPDATE_ROUTE>/g);
export const ReplaceUpdateFilename = R.replace(/<UPDATE_FILENAME>/g);
export const ReplaceUpdateFunc = R.replace(/<UPDATE_FUNC>/g);


/**
 * Performs the replacements for <FILTER_PRIMARY_KEY_IMPORT> and
 * <FILTER_PRIMARY_KEY>, depending on the `shouldHidePrimaryKey` flag provided.
 *
 * @param shouldHidePrimaryKey
 * @param modelName
 * @constructor
 */
export function OptionalIgnorePrimaryKey(shouldHidePrimaryKey: boolean, modelName: string) {


    if (!shouldHidePrimaryKey)
        // Remove the unused code
        return pipe(
            map(OptionalIgnorePrimaryKeyField("")),
            map(OptionalIgnorePrimaryKeyImport(""))
        );

    const usageReplacement = `, FieldsWithoutPrimaryKey(${modelName})`;
    const importReplacement = 'import {FieldsWithoutPrimaryKey} from "@utils/sequelize-util";';

    // Replace with import and the code.
    return pipe(
        map(OptionalIgnorePrimaryKeyField(usageReplacement)),
        map(OptionalIgnorePrimaryKeyImport(importReplacement))
    )
}
