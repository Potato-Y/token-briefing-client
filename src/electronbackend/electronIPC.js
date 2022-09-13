import axios from 'axios';

class ElectronIPC {
  constructor(ipc) {
    this.ipcMain = ipc;

    this.apiServerCheck();
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
}

export default ElectronIPC;
