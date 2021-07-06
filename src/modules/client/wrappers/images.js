// https://discord.com/developers/docs/reference#image-formatting
export const GetAvatarURL = (UserID, Hash, Format = "png", Size = 256)
	=> `https://cdn.discordapp.com/avatars/${UserID}/${Hash}.${Format}?size=${Size}`;
