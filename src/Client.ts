import { noop } from "./utils/constants";
import { getClientId } from "./utils/helper";

export interface ClientOptions {
    fetchClientId?: boolean;
}

export class Client {
    public clientId: string | null = process.env.SOUNDCLOUD_CLIENT_ID ?? null;

    public constructor(public options: ClientOptions = {
        fetchClientId: true
    }) {
        if (options.fetchClientId) {
            Client.fetchClientId().then(id => this.clientId = id, noop);
        }
    }

    public setClientId(clientId: string) {
        this.clientId = clientId;
    }

    public static async fetchClientId() {
        return await getClientId();
    }
}