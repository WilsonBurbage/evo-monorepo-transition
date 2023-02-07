import * as textReplacementsActions from './../text-replacements/text-replacements.actions';

export const ACTIONS_THAT_REQUIRE_EVO_SETTINGS_SAVE = [
  textReplacementsActions.setTextReplacements,
  textReplacementsActions.upsertTextReplacement,
];
