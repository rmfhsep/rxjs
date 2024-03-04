const Rx = require("rxjs");
const {
  take,
  tap,
  filter,
  map,
  reduce,
  concatMap,
  concatAll,
  mergeMap,
  mergeAll,
} = require("rxjs/operators");
// 어레이로부터 만들기 (frOm)
// const deliveries = ["delivery1", "delivery2", "delivery3"];

// const stream = Rx.from(deliveries);
// // stream.subscribe({
// //   next: (data) => {
// //     console.log(data);
// //   },
// //   error: (err) => {
// //     console.log(err);
// //   },
// //   complete: () => {
// //     console.log("completed");
// //   },
// // });

// // 프로미스로부터 만들기
// function makePromise() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("deliev");
//     }, 3000);
//   });
// }

// Rx.from(makePromise()).subscribe({
//   next: (data) => {
//     console.log(data);
//   },
// });

// ----------------------
// const stream = Rx.interval(1000);

// stream.pipe(take(10)).subscribe({
//   next: (data) => {
//     console.log(data);
//   },
//   complete: () => {},
// });

// const stream = Rx.timer(3000, 1000);

// stream.pipe(take(10)).subscribe({
//   next: (data) => {
//     console.log(data);
//   },
// });

// ----------------

// const stream1 = Rx.from([1, 2, 3, 4, 5]);
// const stream2 = Rx.from([6, 7, 8, 9, 10]);

// const stream3 = Rx.interval(1000).pipe(take(2));
// const stream4 = Rx.interval(1000).pipe(take(2));
// // concat 이어 붙이다.
// Rx.merge(stream3, stream4).subscribe({
//   next: console.log,
// });

// // merge 병합하다

//-------------
// const stream = Rx.from([1, 2, 3, 4]);

//tap
//데이터를 가지고 흐름에는 영향을 끼치지 않음.
// stream
//   .pipe(
//     tap((data) => console.log("1")),
//     tap((data) => console.log("2"))
//   )
//   .subscribe({
//     next: () => {
//       console.log(3);
//     },
//   });

// filter
// stream.pipe(filter((data) => data > 3)).subscribe((data) => console.log(data));

//map
// stream.pipe(map((data) => data * 2)).subscribe(console.log);

// stream
//   .pipe(
//     reduce((acc, data) => {
//       return acc + data;
//     })
//   )
//   .subscribe(console.log);

// -----------------------
// 택배

const stream = Rx.interval(1000).pipe(
  take(3),
  map((data) => `택배${data + 1} `)
);

// concat (map)
function openBox(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data, "상품 개봉");
      resolve(data);
    }, 5000);
  });
}

function checkBox(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data, "상품 검사");
      resolve(data);
    }, 5000);
  });
}

function useProduct(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data, "상품 사용");
      resolve(data);
    }, 5000);
  });
}

async function userTask(data) {
  await openBox(data);
  await checkBox(data);
  await useProduct(data);
}

//mergeAll
const stream1 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream2 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream3 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream4 = Rx.interval(1000).pipe(take(3), tap(console.log));

const stream5 = Rx.of(stream1, stream2, stream3, stream4);

// 1,2 동시에 실행
stream5.pipe(mergeAll(2)).subscribe();

//mergeMap
// stream.pipe(mergeMap((data) => Rx.from(userTask(data)))).subscribe();
