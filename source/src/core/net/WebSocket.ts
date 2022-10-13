import { NotifyConst } from "../common/NotifyConst";
import { Observer } from "../libs/event/Observer";
import { Logger } from "../libs/utils/Logger";
import { NetResponse } from "./NetResponse";

const logger = Logger.Create("WebSocket").setEnable(true);

/**
* @Author       : zsk
* @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-10-13 21:14:02
* @Description  : 
*/
class WebSocket extends Observer {
    private _url: string = "ws://192.168.0.101:8003";
    private _socket: Laya.Socket;
    private _waitList: UserInput[];
    private _current: UserInput;
    get connected(): boolean { return this._socket.connected; }

    init(): void {
        this._waitList = [];
        this._socket = new Laya.Socket();
        this._socket.connectByUrl(this._url);
        this._socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
        this._socket.on(Laya.Event.MESSAGE, this, this.onSocketMessage);
        this._socket.on(Laya.Event.ERROR, this, this.onSocketError);
        this._socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
    }

    sendMsg(msg: UserInput): void {
        if (this._current && msg.cmd == this._current.cmd) return;
        const waitList = this._waitList;
        if (waitList.length > 0) {
            for (let i = waitList.length - 1; i >= 0; i--) {
                if (waitList[ i ].cmd == msg.cmd) return;
            }
        }
        this._waitList.push(msg);
        this.executeWaitMsg();
    }

    private onSocketOpen(): void {
        this.dispatch(NotifyConst.SocketOpened);
        this.executeWaitMsg();
    }

    private onSocketMessage(message: string): void {
        const msg: UserOutput = JSON.parse(message);
        if (msg && !msg.error) {
            this.dispatch(`Response_${ msg.cmd[ 0 ].toUpperCase() + msg.cmd.substring(1) }`, msg);
            if (msg.syncInfo) this.dispatch(NetResponse.Response_SyncInfo, msg.syncInfo);
            if (this._current && this._current.cmd == msg.cmd)
                this._current = null;
        } else {
            this.dispatch(NotifyConst.NetMsgError, msg);
            this._current = null;
        }

        this._socket.input.clear();
        this.executeWaitMsg();
    }

    private onSocketError(e): void { }

    private onSocketClose(): void {
        this.dispatch(NotifyConst.SocketClosed);
        this._socket.connectByUrl(this._url);
    }

    private executeWaitMsg(): void {
        if (this.connected && !this._current && this._waitList.length > 0) {
            this._current = this._waitList.shift();
            this._socket.send(JSON.stringify(this._current));
        }
    }
}

export const websocket = new WebSocket();
windowImmit("websocket", websocket)