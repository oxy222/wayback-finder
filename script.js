document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('wayback-form');
    const urlInput = document.getElementById('url-input');
    const submitButton = document.getElementById('submit-button');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error-message');
    const resultDiv = document.getElementById('result');
    const resultLink = document.getElementById('result-link');
    const resultTimestamp = document.getElementById('result-timestamp');
    const notFoundDiv = document.getElementById('not-found');
    const currentDateSpan = document.getElementById('current-date');

    // Display current date dynamically
    const today = new Date();
    currentDateSpan.textContent = today.toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric'
    }); // Uses browser's locale & date


    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission
        const urlToFetch = urlInput.value.trim();

        if (!urlToFetch) {
            displayError("Please enter a URL.");
            return;
        }

        // Basic URL validation (browser often handles this with type="url")
        try {
            new URL(urlToFetch); // Check if it's a valid URL structure
        } catch (_) {
            displayError("Please enter a valid URL (e.g., https://example.com).");
            return;
        }


        // --- UI Reset and Loading State ---
        hideMessages();
        loadingDiv.classList.remove('hidden');
        submitButton.disabled = true;
        submitButton.textContent = 'Searching...';

        // --- API Call ---
        try {
            // Use the Wayback Machine Availability API
            const apiUrl = `https://archive.org/wayback/available?url=${encodeURIComponent(urlToFetch)}`;

            const response = await fetch(apiUrl);

            if (!response.ok) {
                // Handle HTTP errors
                throw new Error(`Wayback Machine API responded with status: ${response.status}`);
            }

            const data = await response.json();

            // --- Process Response ---
            if (data && data.archived_snapshots && data.archived_snapshots.closest) {
                const snapshot = data.archived_snapshots.closest;
                if (snapshot.available && snapshot.url) {
                    displayResult(snapshot.url, snapshot.timestamp);
                } else {
                    notFoundDiv.classList.remove('hidden');
                }
            } else {
                // No snapshot found
                notFoundDiv.classList.remove('hidden');
            }

        } catch (error) {
            console.error("Error fetching Wayback Machine data:", error);
            // Display user-friendly error messages
            if (error.message.includes('Failed to fetch')) {
                 displayError("Network error. Please check your connection or try again later.");
            } else if (error.message.includes('status:')) {
                 displayError(`Error communicating with the Wayback Machine API. ${error.message}`);
            }
             else {
                displayError("An unexpected error occurred. Please try again.");
            }
        } finally {
            // --- Cleanup UI ---
            loadingDiv.classList.add('hidden');
            submitButton.disabled = false;
            submitButton.textContent = 'Find Snapshot';
        }
    });

    // --- Helper Functions ---

    function displayResult(url, timestamp) {
        resultLink.href = url;
        resultLink.textContent = url; // Show the full snapshot URL

        // Format the timestamp (YYYYMMDDHHMMSS)
        const year = timestamp.substring(0, 4);
        const month = timestamp.substring(4, 6);
        const day = timestamp.substring(6, 8);
        const hour = timestamp.substring(8, 10);
        const minute = timestamp.substring(10, 12);

        const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`); // Assume UTC

        resultTimestamp.textContent = `Captured on: ${date.toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })}`; // Use browser locale for display

        resultDiv.classList.remove('hidden');
    }

    function displayError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }

     function hideMessages() {
        errorDiv.classList.add('hidden');
        resultDiv.classList.add('hidden');
        notFoundDiv.classList.add('hidden');
        errorDiv.textContent = ''; // Clear previous errors
    }
});
