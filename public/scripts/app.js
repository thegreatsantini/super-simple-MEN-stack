$(document).ready(function() {
  $(".choice").on("click", function(e) {
    e.preventDefault();
    const botChoice = getBotChoice();
    const userChoice = e.target.dataset.choice;
    let winner = checkWinner(botChoice, userChoice);
    $("#result").html(winner);
    let result = winner === 'you lose' ? 'loss' : 'win'
    
    $.ajax({
      method: "POST",
      url: "/winner",
      data: {'result' : result}
      // success: saveNewRecipe(e.target),
    })
      .done(function(data) {
        console.log("**data**", data);
      })
      .catch(function(error) {
        console.log("**Error**", error);
      });
  });
});

function getBotChoice() {
  const options = ["rock", "paper", "scissors"];
  const randIndex = Math.floor(Math.random() * 3);
  return options[randIndex];
}

function checkWinner(bot, user) {
  switch (user) {
    case "rock":
      return bot === "scissors" ? "you win" : "you lose";
    case "paper":
      return bot === "rock" ? "you win" : "you lose";
    case "scissors":
      return bot === "paper" ? "you win" : "you lose";
    default:
      return "tied";
  }
}
