function showTime() {
  const now = new Date();

  console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
  console.log(now.toLocaleTimeString());
}

setInterval(showTime, 1000);
