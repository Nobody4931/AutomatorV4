// Http Status Codes
// https://discord.com/developers/docs/topics/opcodes-and-status-codes#http-http-response-codes
export const OK                  = 200;
export const CREATED             = 201;
export const NO_CONTENT          = 204;
export const NOT_MODIFIED        = 304;
export const BAD_REQUEST         = 400;
export const UNAUTHORIZED        = 401;
export const FORBIDDEN           = 403;
export const NOT_FOUND           = 404;
export const METHOD_NOT_ALLOWED  = 405;
export const TOO_MANY_REQUESTS   = 429;
export const GATEWAY_UNAVAILABLE = 502;

// Check Status Code
export function IsValidStatus(StatusCode) {
	return (StatusCode == OK || StatusCode == CREATED || StatusCode == NO_CONTENT);
}
