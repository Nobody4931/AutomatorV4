// Message Type
// https://discord.com/developers/docs/resources/channel#message-object-message-types
export const DEFAULT                                      = 0;
export const RECIPIENT_ADD                                = 1;
export const RECIPIENT_REMOVE                             = 2;
export const CALL                                         = 3;
export const CHANNEL_NAME_CHANGE                          = 4;
export const CHANNEL_ICON_CHANGE                          = 5;
export const CHANNEL_PINNED_MESSAGE                       = 6;
export const GUILD_MEMBER_JOIN                            = 7;
export const USER_PREMIUM_GUILD_SUBSCRIPTION              = 8;
export const USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1       = 9;
export const USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2       = 10;
export const USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3       = 11;
export const CHANNEL_FOLLOW_ADD                           = 12;
export const GUILD_DISCOVERY_DISQUALIFIED                 = 14;
export const GUILD_DISCOVERY_REQUALIFIED                  = 15;
export const GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16;
export const GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING   = 17;
export const THREAD_CREATED                               = 18;
export const REPLY                                        = 19;
export const APPLICATION_COMMAND                          = 20;
export const THREAD_STARTER_MESSAGE                       = 21;
export const GUILD_INVITE_REMINDER                        = 22;

// Message Flags
// https://discord.com/developers/docs/resources/channel#message-object-message-flags
export const FLAG_CROSSPOSTED            = (1 << 0);
export const FLAG_IS_CROSSPOST           = (1 << 1);
export const FLAG_SUPPRESS_EMBEDS        = (1 << 2);
export const FLAG_SOURCE_MESSAGE_DELETED = (1 << 3);
export const FLAG_URGENT                 = (1 << 4);
export const FLAG_HAS_THREAD             = (1 << 5);
export const FLAG_EPHEMERAL              = (1 << 6);
export const FLAG_LOADING                = (1 << 7);
