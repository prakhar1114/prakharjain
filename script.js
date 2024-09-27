// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Select all copy buttons
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent triggering the parent hover

            // Get the email address text
            const email = this.parentElement.textContent.trim().replace('📋', '').trim();

            // Create a temporary textarea to copy the email
            const textarea = document.createElement('textarea');
            textarea.value = email;
            document.body.appendChild(textarea);
            textarea.select();
            textarea.setSelectionRange(0, 99999); // For mobile devices

            try {
                // Copy the text
                const successful = document.execCommand('copy');
                if (successful) {
                    // Optionally, provide feedback to the user
                    this.textContent = '✓ Copied!';
                    setTimeout(() => {
                        this.textContent = '📋';
                    }, 2000);
                } else {
                    throw new Error('Copy command was unsuccessful');
                }
            } catch (err) {
                console.error('Failed to copy email:', err);
            }

            // Remove the temporary textarea
            document.body.removeChild(textarea);
        });
    });
});