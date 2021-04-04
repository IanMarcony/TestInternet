var socket = io();

$(document).ready(function () {
  function renderRegisters(registers) {
    $(".registers").html("");
    for (let index = registers.length - 1; index >= 0; index--) {
      const element = registers[index];

      $(".registers").append(`<li><h1>${element.data_hora}</h1>
      <p>Velocidade: ${element.velocidade.toFixed(2)} mbps</p></li>`);
    }
  }

  socket.on("updated", (data) => {
    $(".media").html("");
    $(".media").append(`Média: ${data.media.toFixed(2)} mbps`);
    renderRegisters(data.registers);
  });

  socket.on("previous", (data) => {
    $(".media").html("");
    $(".media").append(`Média: ${data.media.toFixed(2)} mbps`);
    renderRegisters(data.registers);
  });

  $("button").click(function () {
    console.log("clicou");
    socket.emit("message", { reload: true });
  });
});
