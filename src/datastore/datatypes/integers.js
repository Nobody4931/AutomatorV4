/* Signed Counterparts */
export const AutoInt8 = {
	["Read"]: function(Buffer, Offset) {
		return [ Buffer.readInt8(Offset), Offset + 1 ];
	},

	["Write"]: function(Buffer, Data, Offset) {
		return Buffer.writeInt8(Data, Offset);
	},

	["Calculate"]: function(_Data) {
		return 1;
	}
};

export const AutoInt16 = {
	["Read"]: function(Buffer, Offset) {
		return [ Buffer.readInt16LE(Offset), Offset + 2 ];
	},

	["Write"]: function(Buffer, Data, Offset) {
		return Buffer.writeInt16LE(Data, Offset);
	},

	["Calculate"]: function(_Data) {
		return 2;
	}
};

export const AutoInt32 = {
	["Read"]: function(Buffer, Offset) {
		return [ Buffer.readInt32LE(Offset), Offset + 4 ];
	},

	["Write"]: function(Buffer, Data, Offset) {
		return Buffer.writeInt32LE(Data, Offset);
	},

	["Calculate"]: function(_Data) {
		return 4;
	}
};

export const AutoInt64 = {
	["Read"]: function(Buffer, Offset) {
		return [ Buffer.readBigInt64LE(Offset), Offset + 8 ];
	},

	["Write"]: function(Buffer, Data, Offset) {
		return Buffer.writeBigInt64LE(Data, Offset);
	},

	["Calculate"]: function(_Data) {
		return 8;
	}
};

/* Unsigned Counterparts */
export const AutoUInt8 = {
	["Read"]: function(Buffer, Offset) {
		return [ Buffer.readUInt8(Offset), Offset + 1 ];
	},

	["Write"]: function(Buffer, Data, Offset) {
		return Buffer.writeUInt8(Data, Offset);
	},

	["Calculate"]: function(_Data) {
		return 1;
	}
};

export const AutoUInt16 = {
	["Read"]: function(Buffer, Offset) {
		return [ Buffer.readUInt16LE(Offset), Offset + 2 ];
	},

	["Write"]: function(Buffer, Data, Offset) {
		return Buffer.writeUInt16LE(Data, Offset);
	},

	["Calculate"]: function(_Data) {
		return 2;
	}
};

export const AutoUInt32 = {
	["Read"]: function(Buffer, Offset) {
		return [ Buffer.readUInt32LE(Offset), Offset + 4 ];
	},

	["Write"]: function(Buffer, Data, Offset) {
		return Buffer.writeUInt32LE(Data, Offset);
	},

	["Calculate"]: function(_Data) {
		return 4;
	}
};

export const AutoUInt64 = {
	["Read"]: function(Buffer, Offset) {
		return [ Buffer.readBigUInt64LE(Offset), Offset + 8 ];
	},

	["Write"]: function(Buffer, Data, Offset) {
		return Buffer.writeBigUInt64LE(Data, Offset);
	},

	["Calculate"]: function(_Data) {
		return 8;
	}
};
