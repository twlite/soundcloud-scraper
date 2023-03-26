import type { Client } from "../Client";
import { Endpoints } from "../utils/constants";
import { getJSON } from "../utils/helper";

export class BaseEndpoint {
    public constructor(public readonly client: Client) {}

    public async request(path: string) {
        const url = `${Endpoints.BaseAPI}/${path}?client_id=${this.client.clientId}`;
        const result = await getJSON(url);

        return result;
    }
}