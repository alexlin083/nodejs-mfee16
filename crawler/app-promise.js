//test-promise
const axios = require("axios");
const fs = require("fs");

const moment = require("moment");
const BusinessDay = moment().format("YYYYMMDD");
// console.log(date);

//promise
function readFilePromise() {
  return new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

readFilePromise()
  .then((data) => {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: BusinessDay,
        stockNo: data,
      },
    });
  })
  .then(function (response) {
    // console.log(response.data.date);
    if (response.data.stat === "OK") {
      console.log(response.data.date);
      console.log(response.data.title);
    }
  })
  .catch((err) => {
    console.log(err);
  });
