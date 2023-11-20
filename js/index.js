const socket = io("https://presenterlinkserver.skywarspro15.repl.co/");
const presInteraction = document.querySelector(".presentation-interaction");

function createPoll(data) {
  presInteraction.innerHTML = "";

  let presentationText = document.createElement("h1");
  presentationText.className = "presentation-text";
  presentationText.innerText = data.question;

  let pollContainer = document.createElement("div");
  pollContainer.className = "poll";

  data.choices.forEach((choice) => {
    let pollChoice = document.createElement("button");
    pollChoice.innerText = choice;
    pollChoice.className = "poll-option";
    pollChoice.addEventListener("click", () => {
      socket.emit("answer", choice);
    });
    pollContainer.appendChild(pollChoice);
  });

  presInteraction.appendChild(presentationText);
  presInteraction.appendChild(pollContainer);
}

function replaceText(data) {
  presInteraction.innerHTML = "";

  let presentationText = document.createElement("h1");
  presentationText.className = "presentation-text";
  presentationText.innerText = data;
  presInteraction.appendChild(presentationText);
}

function waitingScreen(data) {
  replaceText(data);
  let actions = [
    {
      text: "Set a nickname",
      actions: "alert('testing1')",
    },
    {
      text: "See what song is currently playing",
      actions: "alert('testing2');",
    },
    {
      text: "Interact on the show booth",
      actions: "alert('testing3')",
    },
  ];

  let pollContainer = document.createElement("div");
  pollContainer.className = "poll";

  actions.forEach((action) => {
    let actionButton = document.createElement("button");
    actionButton.innerText = action.text;
    actionButton.className = "poll-option";
    actionButton.addEventListener("click", () => {
      eval(action.actions);
    });
    pollContainer.appendChild(actionButton);
  });

  presInteraction.appendChild(pollContainer);
}

socket.on("waiting", (data) => {
  waitingScreen(data);
});

socket.on("text", (data) => {
  replaceText(data);
});

socket.on("poll", (data) => {
  createPoll(data);
});
