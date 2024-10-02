// Create a script element to load chess.js
const script = document.createElement("script");
script.src = chrome.runtime.getURL("chess.js"); // Load the chess.js from the extension
script.onload = function () {
  this.remove(); // Remove the script element after it has loaded
};

// Append the script to the document
(document.head || document.documentElement).appendChild(script);

// Listen for messages from the injected script
window.addEventListener("message", (event) => {
  // Check if the message is from the injected script
  if (event.source !== window) return; // Ignore messages from other sources
  if (event.data.type === "STORE_PGN") {
    // Store the PGN in chrome storage
    chrome.storage.sync.set({ savedPGN: event.data.pgn }, () => {
      // console.log("PGN has been stored in storage.");
    });

    // Open a new tab with the Lichess paste URL
    // chrome.tabs.create({ url: "https://lichess.org/paste" });
    chrome.runtime.sendMessage({ action: "openLichessTab" });
  }
});
