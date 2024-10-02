// Function to execute when the button is clicked
function executeYourCode() {
  // Get the textarea element in the share modal
  const textarea = document.querySelector("textarea"); // Adjust this selector if necessary
  if (textarea) {
    const pgnValue = textarea.value; // Get the value from the textarea

    // Save the value in Chrome's storage
    chrome.storage.sync.set({ pgn: pgnValue }, () => {
      console.log("PGN saved:", pgnValue);

      // Open a new tab with the lichess paste URL
      chrome.tabs.create({ url: "https://lichess.org/paste" });
    });
  } else {
    console.log("Textarea not found.");
  }
}

// Function to append a button to the share modal
function appendButton(copyButton) {
  // Check if the button already exists to avoid duplicates
  if (!document.getElementById("my-custom-button")) {
    const button = document.createElement("button");
    button.id = "my-custom-button";
    button.textContent = "Analyze on lichess";
    button.style.marginTop = "0px"; // Add some space from existing content
    button.style.padding = "6px 9px"; // Add some space from existing content

    // Add click event listener to the button
    button.addEventListener("click", () => {
      copyButton.click();
    });

    // Append the button to the modal
    copyButton.parentElement.appendChild(button);
  }
}

// Debounce function to limit the frequency of calls
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Function to handle changes in the #share-modal
const handleShareModalContent = debounce((modal) => {
  // Check if the modal has content and the specific element exists
  const pgnCopyElement = modal.querySelector(".share-menu-tab-pgn-copy");
  if (modal.hasChildNodes() && pgnCopyElement) {
    appendButton(pgnCopyElement);
    console.log("Share modal content with PGN copy detected!", modal);
  }
}, 1000); // 300 ms debounce delay

// Select the #share-modal element
const shareModal = document.getElementById("share-modal");

// Set up a MutationObserver to monitor changes to the modal's content
const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    // Only call handleShareModalContent if child nodes have been added
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      console.log("Mutation detected");
      handleShareModalContent(shareModal);
    }
  }
});

// Start observing the #share-modal element for changes in its child nodes
observer.observe(shareModal, {
  childList: true, // Observe changes to direct children
  subtree: true, // Observe the entire subtree (in case content is nested)
});
