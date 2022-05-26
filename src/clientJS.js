const { io } = require("socket.io-client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = io("http://192.168.1.27:3000");

const leer = () => {
  return new Promise((res, rej) => {
    rl.question("Enviar: ", (resp) => {
      return res(resp);
    });
  });
};
const main = async () => {
  let resp;

  resp = await leer();
  socket.emit("message", { name: "clientjs", message: resp });

  socket.on("recived", (data) => {
    console.log(data);
    console.log("recivido: ", data);
  });
};

main();
