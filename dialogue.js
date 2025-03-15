/**
 * Dialogue Text Printer
 * 
 * Creates a dialogue element that:
 * - Prints text character by character
 * - Displays one paragraph at a time
 * - Allows the user to progress to the next paragraph by clicking
 * - Clears the previous paragraph when moving to the next
 */
class DialogueTextPrinter {
    constructor(dialogueId, paragraphs) {
        // Find or create the dialogue element
        this.dialogueElement = document.getElementById(dialogueId);
        this.dialogueBox = document.getElementById('dialogue-box');
        if (!this.dialogueElement) {
            return;
        }

        // Initialize variables
        this.paragraphs = paragraphs;
        this.currentParagraphIndex = 0;
        this.charIndex = 0;
        this.isTyping = false;
        this.typingTimer = null;
        this.indicatorElement = null;

        // Set up click event
        this.dialogueBox.addEventListener('click', () => this.handleClick());

        // Start the first paragraph
        this.startParagraph();
    }

    handleClick() {
        // If we're in the middle of typing, complete the paragraph immediately
        if (this.isTyping) {
            this.completeCurrentParagraph();
            return;
        }

        // If we've reached the end of all paragraphs, restart from the beginning
        if (this.currentParagraphIndex >= this.paragraphs.length) {
            this.currentParagraphIndex = 0;
        }

        // Start the next paragraph
        this.clearDialogue();
        this.startParagraph();
    }

    clearDialogue() {
        // Remove all content from the dialogue element
        while (this.dialogueElement.firstChild) {
            this.dialogueElement.removeChild(this.dialogueElement.firstChild);
        }
    }

    startParagraph() {
        // If we've reached the end, do nothing
        if (this.currentParagraphIndex >= this.paragraphs.length) {
            return;
        }

        // Create a new paragraph element
        const paragraphElement = document.createElement('p');
        this.dialogueElement.appendChild(paragraphElement);

        // Reset character index and mark as typing
        this.charIndex = 0;
        this.isTyping = true;

        // Start the typing animation
        this.typeNextChar(paragraphElement);
    }

    typeNextChar(paragraphElement) {
        const currentText = this.paragraphs[this.currentParagraphIndex];

        // If we have more characters to type
        if (this.charIndex < currentText.length) {
            // Add the next character
            paragraphElement.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;

            // Schedule the next character
            this.typingTimer = setTimeout(() => {
                this.typeNextChar(paragraphElement);
            }, 40); // Typing speed - adjust as needed
        } else {
            // We've finished typing this paragraph
            this.isTyping = false;
            this.currentParagraphIndex++;

            // Create and add a "continue" indicator
            this.addContinueIndicator();
        }
    }

    completeCurrentParagraph() {
        // Clear any pending typing timer
        clearTimeout(this.typingTimer);

        // Get the current paragraph and show it completely
        const paragraphElement = this.dialogueElement.querySelector('p');
        if (paragraphElement) {
            paragraphElement.textContent = this.paragraphs[this.currentParagraphIndex];
        }

        // Update state
        this.isTyping = false;
        this.currentParagraphIndex++;

        // Show the continue indicator
        this.addContinueIndicator();
    }

    addContinueIndicator() {
        // Remove any existing indicator
        if (this.indicatorElement) {
            this.indicatorElement.remove();
        }

        // Create new indicator
        this.indicatorElement = document.createElement('div');
        this.indicatorElement.textContent = this.currentParagraphIndex < this.paragraphs.length ?
            'Click to continue...' : 'Click to restart...';
        this.indicatorElement.style.fontSize = '2vh';
        this.indicatorElement.style.color = '#777';
        this.indicatorElement.style.marginTop = '1.5vh';
        this.indicatorElement.style.textAlign = 'right';

        // Add it to the dialogue
        this.dialogueElement.appendChild(this.indicatorElement);
    }
}

// assigning listeners
document.addEventListener('DOMContentLoaded', () => {
    let contactDialogue = [
        "Pssst... come closer...",
        "So, you took a look at Harry's work?",
        "Well, I'm his agent, Mr. Plonky...",
        "If you'd like to contact him about an opportunity... I can take a message for him...",
        "Just fill out the form below and I'll make sure he gets it.",
        "If not, you can also reach out using the social links at the bottom, got it?",
    ];

    const contactDialogueBox = new DialogueTextPrinter('contact-dialogue', contactDialogue);

    let aboutDialogue = [
        "Hi There, I'm Harry - A Game Developer & Web Engineer currently based in South-East London.",
        "I'm passionate about my work, hopefully you can tell by exploring my Portfolio.",
        "I love being creative and making projects that challenge my abilities...",
        "I have a First-Class Honours degree in Game Development, and I'm skilled in Unity, Game Design, and Web Technologies like React.js",
        "I find enjoyment in solo projects, but I get much further when collaborating with others.",
        "So, sit back, relax, and explore my work on this site.",
    ];
    const aboutDialogueBox = new DialogueTextPrinter('about-dialogue', aboutDialogue);
});
