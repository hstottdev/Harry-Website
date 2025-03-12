$(document).ready(function() {
    // Store the default description text
    const defaultDescription = $('#hover-description').text();
    const $descriptionElement = $('#hover-description');

    // Handle hover on preview description containers
    $('.preview-description').parent().hover(
        // Mouse enter
        function() {
            // Get the preview description from the child element
            const $previewDesc = $(this).find('.preview-description');
            const description = $previewDesc.text().trim();
            
            // If description exists, update the hover description
            if (description) {
                $descriptionElement.text(description);
            }
        },
        // Mouse leave
        function() {
            // Reset to default description when hover ends
            $descriptionElement.text(defaultDescription);
        }
    );
});