const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const APPLY_DB_VERSION = 1;
const DB_NAME = path.join(__dirname, '../Data', 'token-briefing-client.sqlite');

class DBController {
  constructor() {
    this.db;
    this.lastLatestDBVersion = 1;
  }

  connectDB() {
    makeFoler('./Data'); //디렉터리가 없으면 생성

    this.db = new sqlite3.Database(DB_NAME, (err) => {
      if (err) {
        return console.error('err: ' + err);
      }
      console.log('DB 연결 완료');
    });

    this.db.serialize(() => {
      // 쿼리가 순차적으로 이루어지도록

      // DB 버전을 확인
      this.db.get(`SELECT * FROM 'client_settings' WHERE id='settings'`, (err, value) => {
        if (err) {
          // 에러 발생 시 기존 DB가 존재하지 않던 것으로 인지 후 기본값 저장
          console.log('DB 버전이 존재하지 않습니다. 기본 설정을 적용합니다.');

          this.db.serialize(() => {
            // 클라이언트 설정
            this.db.run(
              `CREATE TABLE 'client_settings'(
                id TEXT PRIMART KEY,
                db_version INTEGER NOT NULL,
                server_ip TEXT,
                user_name TEXT
              )`,
              (err) => {
                if (err) {
                  return console.error(`DB ERR: 'client_settings' 테이블 생성 실패. \n${err}`);
                }
              }
            );

            // 클라이언트 기본 설정 주입
            this.db.run(
              `INSERT INTO 'client_settings'(
                id,
                db_version,
                user_name,
                server_ip
              )
              VALUES(
                'settings',
                '${APPLY_DB_VERSION}',
                'not found',
                'not found'
              )`,
              (err) => {
                if (err) {
                  return console.error(`DB ERR: 'client_settings' 데이터 추가 실패. \n${err}`);
                }
              }
            );
          });
        } else {
          // DB 버전 확인 시 정상적인 파일로 인식
          try {
            if (!isNaN(value.db_version)) {
              console.log('연결된 DB 버전: ' + value.db_version);
            } else {
              console.error('버전 정보를 불러오지 못 하였습니다. DB 파일이 정상적으로 생성되어 있는지 확인하세요.\n간단 조치: Data 폴더를 지우고 프로그램을 다시 실행하세요.');
            }
          } catch (err) {
            console.error('DB를 불러오는 중 오류가 발생하였습니다. \n간단 조치: Data 폴더를 지우고 프로그램을 다시 실행하세요.\n' + err);
          }
        }
      });
    });
  }

  /**
   * electronIPC에서 userName과 serverIp 저장을 위해 사용
   * @param {*} func 변수 지정할 함수
   */
  getUserNameAndServerIp(func) {
    this.db.serialize();
    this.db.get(`SELECT * FROM 'client_settings' WHERE id='settings'`, (err, value) => {
      if (err) {
        console.log('err [getUserNameAndServerIp]: ' + err);
      } else {
        try {
          func(value.user_name, value.server_ip);
        } catch (err) {
          console.log('err [getUserNameAndServerIp/catch]: ' + err);
        }
      }
    });
  }

  /**
   * 유저 설정 값을 변경합니다.
   * @param  event ipcMain event
   * @param  args ipcMain args
   * @returns 작업이 정상 완료될 경우 true를 리턴
   */
  updateUserNameAndServerIp(event, args) {
    this.db.serialize();

    this.db.run(
      `
    UPDATE 'client_settings' 
    SET
    'server_ip'='${args.serverIp}', 
    'user_name'='${args.userName}' 
    WHERE
    id='settings'`,
      (err) => {
        if (err) {
          console.error('err: [updateUserNameAndServerIp]' + err);
          event.returnValue = false;

          return false;
        } else {
          console.log('[updateUserNameAndServerIp] 성공');
          event.returnValue = true;

          return true;
        }
      }
    );
  }
}

/** 새로운 폴더 만들기 */
const makeFoler = (dir) => {
  if (!fs.existsSync(dir)) {
    console.log('폴더를 생성합니다.\n * 생성 위치: ' + dir);
    fs.mkdirSync(dir);
  }
};

export default DBController;
