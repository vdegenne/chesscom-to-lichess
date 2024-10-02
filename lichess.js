// Function to paste PGN into the textarea on Lichess
function pastePGNToTextarea() {
  // Retrieve the saved PGN from storage
  chrome.storage.sync.get("savedPGN", (data) => {
    console.log(data);
    const pgn = data.savedPGN;

    // Check if there is a PGN saved in storage
    if (pgn) {
      // Find the unique textarea on the page
      const textarea = document.querySelector("textarea");

      // Check if the textarea exists
      if (textarea) {
        textarea.value = pgn; // Set the textarea value to the saved PGN

        // Remove the PGN from storage after pasting
        chrome.storage.sync.remove("savedPGN", () => {
          console.log("PGN removed from storage after pasting.");
        });

        document.querySelector("#form3-analyse")?.click();

        document.querySelector("main [type=submit]")?.click();
      } else {
        console.log("Textarea not found on the Lichess page.");
      }
    } else {
      console.log("No PGN found in storage.");
    }
  });
}

// Call the function to paste PGN into the textarea
pastePGNToTextarea();
