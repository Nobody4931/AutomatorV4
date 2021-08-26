// Application Command Type
// https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
export const CHAT_INPUT = 1;
export const USER       = 2;
export const MESSAGE    = 3;

// Command Option Type
// https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
export const COPT_SUB_COMMAND       = 1;
export const COPT_SUB_COMMAND_GROUP = 2;
export const COPT_STRING            = 3;
export const COPT_INTEGER           = 4;
export const COPT_BOOLEAN           = 5;
export const COPT_USER              = 6;
export const COPT_CHANNEL           = 7;
export const COPT_ROLE              = 8;
export const COPT_MENTIONABLE       = 9;
export const COPT_NUMBER            = 10;

// Command Permission Type
// https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permission-type
export const CPRM_ROLE = 1;
export const CPRM_USER = 2;
