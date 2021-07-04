import { Queue } from "../classes/queue.js";
import { Sleep } from "../functions/util.js";

import * as HttpOP from "../api/enums/http.js";

import * as Options from "../../config.js";

import Axios from "axios";


/* Rate Limits Handler */
export const Buckets = {};

export async function InitBucket(UniqueID, RetryAfter = 0) {
	let Bucket = Buckets[UniqueID] = [];
	Bucket[0] = new Queue();
	Bucket[1] = RetryAfter;

	(async function ProcessBucket() {
		if (Bucket[0].Size() > 0) {
			if (Bucket[1] > 0) {
				await Sleep(Bucket[1]);
				Bucket[1] = 0;
			}

			let Request = Bucket[0].Dequeue();
			let Response = await Axios({
				url: Request[0],
				method: Request[1],
				data: Request[2],
				headers: Request[3],
				validateStatus: () => true
			});

			if (Response.headers["x-ratelimit-remaining"] == 0)
				Bucket[1] = Math.floor(Response.headers["x-ratelimit-reset-after"] * 1000 + 0.5);

			Request[4](Response);
		}

		setImmediate(ProcessBucket);
	})();
}

/* Base Request Function */
export async function RequestBase(Endpoint, Method, Data, Headers) {
	return new Promise(async (Resolve) => {
		let URL = `https://discord.com/api/${Options.APIVersion}/${Endpoint}`;
		let Response = await Axios({
			url: URL,
			method: Method,
			data: Data,
			headers: Headers,
			validateStatus: () => true
		});

		if (Response.status == HttpOP.TOO_MANY_REQUESTS) {
			let UniqueID = Response.headers["x-ratelimit-bucket"];
			if (Buckets[UniqueID] == null)
				InitBucket(UniqueID, Math.floor(Response.headers["x-ratelimit-reset-after"] * 1000 + 0.5));

			Buckets[UniqueID][0].Enqueue([ URL, Method, Data, Headers, Resolve ]);
		} else Resolve(Response);
	});
}


/* Default HTTPS Requests */
export async function HttpsRequest(Endpoint, Method, Data, Headers = {}) {
	Headers["Content-Type"] = Headers["Content-Type"] ?? "application/json";

	return await RequestBase(Endpoint, Method, Data, Headers);
}

export async function GETRequest(Endpoint, Data, Headers) {
	return await HttpsRequest(Endpoint, "GET", Data, Headers);
}

export async function POSTRequest(Endpoint, Data, Headers) {
	return await HttpsRequest(Endpoint, "POST", Data, Headers);
}

export async function PUTRequest(Endpoint, Data, Headers) {
	return await HttpsRequest(Endpoint, "PUT", Data, Headers);
}

export async function PATCHRequest(Endpoint, Data, Headers) {
	return await HttpsRequest(Endpoint, "PATCH", Data, Headers);
}

export async function DELETERequest(Endpoint, Data, Headers) {
	return await HttpsRequest(Endpoint, "DELETE", Data, Headers);
}


/* Authenticated HTTPS Requests */
export async function HttpsRequestA(Endpoint, Method, Data, Headers = {}) {
	Headers["Content-Type"] = Headers["Content-Type"] ?? "application/json";
	Headers["Authorization"] = Headers["Authorization"] ?? Options.AppToken;

	return await RequestBase(Endpoint, Method, Data, Headers);
}

export async function GETRequestA(Endpoint, Data, Headers) {
	return await HttpsRequestA(Endpoint, "GET", Data, Headers);
}

export async function POSTRequestA(Endpoint, Data, Headers) {
	return await HttpsRequestA(Endpoint, "POST", Data, Headers);
}

export async function PUTRequestA(Endpoint, Data, Headers) {
	return await HttpsRequestA(Endpoint, "PUT", Data, Headers);
}

export async function PATCHRequestA(Endpoint, Data, Headers) {
	return await HttpsRequestA(Endpoint, "PATCH", Data, Headers);
}

export async function DELETERequestA(Endpoint, Data, Headers) {
	return await HttpsRequestA(Endpoint, "DELETE", Data, Headers);
}
