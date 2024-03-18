import {Command} from "./command.mjs";
import { Handler } from "./handler.mjs";

export class Service extends Handler {

    constructor() {
        super();
    }

    handle(dataTransport, context) {
        // The ws data transports will have been multiplexed and look identical to the http2 transports.
        // This is a multiplexer stage 2 for the HTTP2 and for Websockets. The stage 1 of the multiplexing for the websockets is done in the server.
        try {
           const c = new Command()
        } catch (e) {

        }
    }
}
