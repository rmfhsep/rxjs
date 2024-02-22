const Rx = require("rxjs");
const { take } = require("rxjs/operators");
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

const stream = Rx.timer(3000, 1000);

stream.pipe(take(10)).subscribe({
  next: (data) => {
    console.log(data);
  },
});
