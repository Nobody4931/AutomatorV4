// Permission Flags
// https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
export const CREATE_INSTANT_INVITE = (1 << 0);
export const KICK_MEMBERS          = (1 << 1);
export const BAN_MEMBERS           = (1 << 2);
export const ADMINISTRATOR         = (1 << 3);
export const MANAGE_CHANNELS       = (1 << 4);
export const MANAGE_GUILD          = (1 << 5);
export const ADD_REACTIONS         = (1 << 6);
export const VIEW_AUDIT_LOG        = (1 << 7);
export const PRIORITY_SPEAKER      = (1 << 8);
export const STREAM                = (1 << 9);
export const VIEW_CHANNEL          = (1 << 10);
export const SEND_MESSAGES         = (1 << 11);
export const SEND_TTS_MESSAGES     = (1 << 12);
export const MANAGE_MESSAGES       = (1 << 13);
export const EMBED_LINKS           = (1 << 14);
export const ATTACH_FILES          = (1 << 15);
export const READ_MESSAGE_HISTORY  = (1 << 16);
export const MENTION_EVERYONE      = (1 << 17);
export const USE_EXTERNAL_EMOJIS   = (1 << 18);
export const VIEW_GUILD_INSIGHTS   = (1 << 19);
export const CONNECT               = (1 << 20);
export const SPEAK                 = (1 << 21);
export const MUTE_MEMBERS          = (1 << 22);
export const DEAFEN_MEMBERS        = (1 << 23);
export const MOVE_MEMBERS          = (1 << 24);
export const USE_VAD               = (1 << 25);
export const CHANGE_NICKNAME       = (1 << 26);
export const MANAGE_NICKNAMES      = (1 << 27);
export const MANAGE_ROLES          = (1 << 28);
export const MANAGE_WEBHOOKS       = (1 << 29);
export const MANAGE_EMOJIS         = (1 << 30);
export const USE_SLASH_COMMANDS    = (1 << 31);
export const REQUEST_TO_SPEAK      = (1 << 32);
export const MANAGE_THREADS        = (1 << 34);
export const USE_PUBLIC_THREADS    = (1 << 35);
export const USE_PRIVATE_THREADS   = (1 << 36);
export const ALL                   = (1 << 37) - 1;
