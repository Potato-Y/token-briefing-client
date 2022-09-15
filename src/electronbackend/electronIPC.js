import axios from 'axios';
import db from './db/dbController/DBController.js';

class ElectronIPC {
  constructor(ipc) {
    this.ipcMain = ipc;
    this.dbController;
    this.userName = '\\Not Loading\\';
    this.serverIp = '\\Not Loading\\';
    /** dbLoad가 정상적으로 안된 경우 횟수 체크 */
    this.errStack = 0;

    this.dbLoad();

    this.apiServerCheck();
    this.getClientSetting();
    this.setServerIpUserName();
  }

  /** 프로그램에 필요한 DB 연결 및 내용 로드 */
  dbLoad() {
    this.dbController = new db();
    this.dbController.connectDB();

    this.dbController.getUserNameAndServerIp((userName, serverIp) => {
      this.userName = userName;
      this.serverIp = serverIp;
    });
  }

  /** API 서버의 주소를 확인 */
  apiServerCheck() {
    this.ipcMain.on('api-server-check', (event, arg) => {
      axios
        .get(`http://${arg}/api/v1/status/`)
        .then((response) => {
          console.log('서버 연결: ' + response.data.status);
          event.returnValue = true;
        })
        .catch((err) => {
          console.log('err channel: api-server-check\n' + err);
          event.returnValue = false;
        });
    });
  }

  getClientSetting() {
    this.ipcMain.on('get-client-setting', (event) => {
      if (this.userName == '\\Not Loading\\' || this.serverIp == '\\Not Loading\\') {
        this.errStack++;
        if (this.errStack > 5) {
          this.dbController.getUserNameAndServerIp((userName, serverIp) => {
            this.userName = userName;
            this.serverIp = serverIp;
          });
          return setTimeout(() => {
            event.returnValue = { userName: this.userName, serverIp: this.serverIp };
          }, 1000);
        }
      }
      event.returnValue = { userName: this.userName, serverIp: this.serverIp };
    });
  }

  /** 렌더에서 설정한 serverIp와 userName을 DB에 저장하는 ipc */
  setServerIpUserName() {
    this.ipcMain.on('set-serverip-username', (event, args) => {
      if (this.dbController.updateUserNameAndServerIp(event, args) == true) {
        this.serverIp = args.serverIp;
        this.userName = args.userName;
      }
    });
  }
}

export default ElectronIPC;
