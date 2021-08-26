// Interaction Type
// https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type
export const PING                = 1;
export const APPLICATION_COMMAND = 2;
export const MESSAGE_COMPONENT   = 3;

// Interaction Callback Type
// https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type
export const CB_PONG                                 = 1;
export const CB_CHANNEL_MESSAGE_WITH_SOURCE          = 4;
export const CB_DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5;
export const CB_DEFERRED_UPDATE_MESSAGE              = 6;
export const CB_UPDATE_MESSAGE                       = 7;

// Interaction Callback Flags
// https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-data-flags
// [!] Same as message flags for now, check back later to see if it changes
