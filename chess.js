// Function to execute when the button is clicked
function analyzeInLichess() {
  // Get the chessboard element and call game.getPGN()
  const boardSingle = document.getElementById("board-single");

  if (boardSingle && boardSingle.game) {
    const pgn = boardSingle.game.getPGN(); // Get the PGN from the game object
    // Send a message to the content script to store the PGN
    window.postMessage({ type: "STORE_PGN", pgn: pgn }, "*");
  } else {
    console.log("Game object not found or does not have getPGN() method.");
  }
}

// Function to append a button to #board-layout-main
function appendButton() {
  // Check if the button already exists
  if (!document.getElementById("my-show-pgn-button")) {
    const button = document.createElement("button");
    button.id = "my-show-pgn-button";
    button.textContent = "Analyze on Lichess";
    button.style.marginTop = "18px"; // Add some space from existing content
    button.style.padding = "6px"; // Add some padding for better appearance
    button.style.maxWidth = "200px";

    // Add click event listener to the button
    button.addEventListener("click", analyzeInLichess);

    // Append the button to #board-layout-main
    const boardLayoutMain = document.getElementById("board-layout-main");
    console.log(boardLayoutMain);
    if (boardLayoutMain) {
      boardLayoutMain.appendChild(button);
    }
  }
}

// Wait for the DOM to fully load before appending the button
appendButton();
