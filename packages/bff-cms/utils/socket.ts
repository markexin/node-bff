import { SOCKET_ADDRESS } from '../config/env';
import ReconnectingWebSocket from 'reconnecting-websocket';

const socket = new ReconnectingWebSocket(SOCKET_ADDRESS, [], {
  connectionTimeout: 1000,
  maxRetries: 10,
});

export default socket;
