// 10초에 한번씩 주식 거래를 시작한다.

//한번의 주식 거래에서는 1000번의 api call을 수행한다.
// 1000번의 api call 을 함에 있어서 동시 요청은 10회 이하로 제한한다.
// 10회의 요청이 끝날때마다 5ms 동안 휴식을 한다.
// 1000번의 요청 중에 에러가 발생하면 요청을 다시 시작하되 최대 2번까지 반복한다.
// (물론 동시 요청 10회 이하의 조건은 만족해야 한다.)

// 주식 거래를 성공한 뒤에는 10개씩 나누어 결과를 저장하되, 주식 거래 행위에 영향을 주지 않도록 비동기로 저장한다.

const { default: Axios } = require("axios");
const {
  from,
  range,
  retry,
  interval,
  bufferCount,
  reduce,
  mergeMap,
} = require("rxjs");

function startTrade$(tradeNumber) {
  return range(0, 1000).pipe(
    map(() => apiCall$().pipe(delay(5))),
    mergeAll(10),
    retry(2),
    reduce((acc, data) => {
      return tradeNumber;
    })
  );
}

function apiCall$() {
  return from(Axios.get("https://naver.com"));
}

function saveResult$() {}

interval(10 * 1000).pipe(
  mergeMap((tradeNumber) => startTrade$(tradeNumber)),
  bufferCount(10),
  mergeMap((results) => saveResult$(results))
);
