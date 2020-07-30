// include httpRequest helper
var HttpRequest = require('./FetchApi');

// Path API
const HOSTNAME = 'https://dpu.ntbprov.go.id/backend_absensi/';
const LOGIN = HOSTNAME + 'login';
const LOGOUT = HOSTNAME + 'logout';
const HOME = HOSTNAME + 'home';
const CEKIN = HOSTNAME + 'absen/cek_in';
const CEKOUT = HOSTNAME + 'absen/cek_out';
const OTHERS = HOSTNAME + 'absen/others';
const HISTORY = HOSTNAME + 'history';
const UPDATEFOTO = HOSTNAME + 'profil/update_foto';

// Controller Path API
/* Login API */
exports.login = async function (account, password) {
  let headers = new Headers();
  headers.append('Content-Type', 'multipart/form-data');

  let body = new FormData();
  body.append('account', account);
  body.append('password', password);

  let res = await HttpRequest.Post(LOGIN, body, headers);
  return res;
};

/* Logout API */
exports.logout = async function (idPegawai, token) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Id-Pegawai', idPegawai);
  headers.append('Token', token);
  let res = await HttpRequest.Post(LOGOUT, headers);
  return res;
};

/* Home API */
exports.getHome = async function (idPegawai, token) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Id-Pegawai', idPegawai);
  headers.append('Token', token);

  let res = await HttpRequest.Get(HOME, headers);
  let result = res.result[0];
  return result;
};

/* Cek in API */
exports.cekIn = async function (idPegawai, token, body) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Id-Pegawai', idPegawai);
  headers.append('Token', token);
  let res = await HttpRequest.Post(CEKIN, body, headers);
  return res;
};

/* Cek out API */
exports.cekOut = async function (idPegawai, token, body) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Id-Pegawai', idPegawai);
  headers.append('Token', token);
  let res = await HttpRequest.Post(CEKOUT, body, headers);
  return res;
};

/* Others API */
exports.others = async function (idPegawai, token, body) {
  let headers = new Headers();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Id-Pegawai', idPegawai);
  headers.append('Token', token);

  let data = new FormData();
  for (let key in body) {
    data.append(key, body[key]);
  }
  let res = await HttpRequest.Post(OTHERS, data, headers);
  return res;
};

/* History API */
exports.history = async function (idPegawai, token, body) {
  let headers = new Headers();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Id-Pegawai', idPegawai);
  headers.append('Token', token);

  let res = await HttpRequest.Post(HISTORY, body, headers);
  return res;
};

/* Update foto API */
exports.updateFoto = async function (idPegawai, token, body) {
  let headers = new Headers();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Id-Pegawai', idPegawai);
  headers.append('Token', token);

  let res = await HttpRequest.Post(UPDATEFOTO, body, headers);
  return res;
};
