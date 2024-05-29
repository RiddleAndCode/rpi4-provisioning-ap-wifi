const fs = require('fs');
const os_cmd = require('child_process');

function update_nm_connection(ssid, pass) {
  return new Promise((resolved, reject) => {

    let cmd = `sudo /usr/bin/nmcli dev wifi connect ${ssid} password "${pass}"`;
    console.log(cmd);
    os_cmd.exec(cmd, function (error, stdout, stderr) {
      if (error) {
        reject(stderr);
      } else {
        resolved(stdout);
      }
    });
  })
}

function factory_nm_connection() {
  return new Promise((resolved, reject) => {

    let cmd = `for i in $(/usr/bin/nmcli con|/usr/bin/grep wifi|/usr/bin/awk '{print $1}'); do sudo /usr/bin/nmcli con delete $i; done`;
    console.log(cmd);
    os_cmd.exec(cmd, function (error, stdout, stderr) {
      if (error) {
        reject(stderr);
      } else {
        resolved(stdout);
      }
    });
  })
}

function software_reboot() {
  return new Promise((resolved, reject) => {
  
    let cmd = `sudo /sbin/reboot`;
    console.log(cmd);
    os_cmd.exec(cmd, function (error, stdout, stderr) {
      if (error) {
        reject(stderr);
      } else {
        resolved(stdout);
      }
    });
  })
}

function scan_wifi() {
  return new Promise((resolved, reject) => {
    let cmd = `sudo iw wlan0 scan | egrep 'SSID|signal'`;
    os_cmd.exec(cmd, function (error, stdout, stderr) {
      if (error) {
        reject(stderr);
      } else {
        console.log(stdout);
        resolved(stdout);
      }
    });
  })

}


module.exports.update_nm_connection = update_nm_connection;
module.exports.factory_nm_connection = factory_nm_connection;
module.exports.software_reboot = software_reboot;
module.exports.scan_wifi = scan_wifi;