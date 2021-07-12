export const AutoFloat = {
	["Read"]: function(Buffer, Offset) {
		return [ Buffer.readFloatLE(Offset), Offset + 4 ];
	},

	["Write"]: function(Buffer, Data, Offset) {
		return Buffer.writeFloatLE(Data, Offset);
	},

	["Calculate"]: function(_Data) {
		return 4;
	}
};

export const AutoDouble = {
	["Read"]: function(Buffer, Offset) {
		return [ Buffer.readDoubleLE(Offset), Offset + 8 ];
	},

	["Write"]: function(Buffer, Data, Offset) {
		return Buffer.writeDoubleLE(Data, Offset);
	},

	["Calculate"]: function(_Data) {
		return 8;
	}
};
