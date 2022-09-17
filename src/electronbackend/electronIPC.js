import axios from 'axios';
import db from './db/dbController/DBController.js';

class ElectronIPC {
  constructor(ipc, win) {
    this.win = win;
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
    this.apiTokenbriefingLast_latest_post();
    this.winHighlight;
  }

  winHighlight() {
    this.ipcMain.on('win-highligth', () => {
      this.win.flashFrame(true);
    });
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

  /** api서버를 통해 토큰 브리핑 최신 정보를 받아온다. */
  apiTokenbriefingLast_latest_post() {
    this.ipcMain.on('api-tokenbriefing-last_latest_post', (event) => {
      axios
        .get(`http://${this.serverIp}/api/v1/tokenbriefing/last_latest_post`)
        .then((response) => {
          event.returnValue = response.data;
        })
        .catch((err) => {
          console.log('err channel: api-tokenbriefing-last_latest_post\n' + err);
          event.returnValue = false;
        });
    });
  }

  /** 클라이언트 설정 값 불러오기 */
  getClientSetting() {
    this.ipcMain.on('get-client-setting', (event) => {
      if (this.userName == '\\Not Loading\\' || this.serverIp == '\\Not Loading\\') {
        // 만약 로딩이 지속적으로 안될 경우 회수를 누적하여 db 로드를 다시 요청한다.
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
