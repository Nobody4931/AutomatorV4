// Gateway Opcodes
// https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes
export const DISPATCH        = 0;
export const HEARTBEAT       = 1;
export const IDENTIFY        = 2;
export const PRESENCE_UPDATE = 3;
export const VOICE_UPDATE    = 4;
export const RESUME          = 6;
export const RECONNECT       = 7;
export const REQUEST_MEMBERS = 8;
export const INVALID_SESSION = 9;
export const HELLO           = 10;
export const HEARTBEAT_ACK   = 11;

// Gateway Close Codes
// https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes
export const UNKNOWN_ERROR       = 4000;
export const UNKNOWN_OPCODE      = 4001;
export const DECODE_ERROR        = 4002;
export const NOT_AUTH            = 4003;
export const AUTH_FAILED         = 4004;
export const ALREADY_AUTH        = 4005;
export const INVALID_SEQ         = 4007;
export const RATE_LIMITED        = 4008;
export const TIMED_OUT           = 4009;
export const INVALID_SHARD       = 4010;
export const SHARDING_REQUIRED   = 4011;
export const INVALID_API_VERSION = 4012;
export const INVALID_INTENTS     = 4013;
export const DISALLOWED_INTENTS  = 4014;
