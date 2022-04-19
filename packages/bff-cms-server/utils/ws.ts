import webSocket from 'ws';
import { Server } from 'http';

enum ERRPR_CODE {
    'NO-OPTIONS' = '缺少必要http server参数'
}

export default class WsSocket {

    ws!: webSocket.Server<webSocket.WebSocket>;

    constructor (options: Server) {

        if (!options) {
            throw ERRPR_CODE['NO-OPTIONS'];
        }
        
        this.init(options);

        // wss.on('connection', function connection(ws: any) {
        //     console.log(1111, '-----');
        //     ws.on('esm_stats', function incoming(message: any) {
        //         console.log('received: %s', message);
        //     });
        // });

        // wss.on('error', function connection(error: any) {
        //     console.log(error, '----error---');
        // });
    }

    init(server: Server) {
        this.ws = new webSocket.Server({
            server
        });
        this.ws.on('connection', function(ws: any) {
            console.log('<---------- 建议连接 --------->');
        });

        this.ws.on('message', function(ws: any) {
            console.log('<---------- 建议连接 --------->');
        });

        this.ws.on('error', function(error: any) {
            console.log('<---------- 出现异常 --------->');
        });
    }
}