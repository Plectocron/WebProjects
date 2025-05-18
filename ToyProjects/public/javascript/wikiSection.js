const wikiContent = document.getElementById("wikiContent");
const originalHTML = wikiContent.innerHTML;
const section = wikiContent.dataset.section;

function initButtons() {
    setupEditButton();
    setupResetButton();
}

function setupEditButton() {
    document.getElementById("editButton").addEventListener("click", () => {
        wikiContent.innerHTML = `
            <textarea id="editedTextContent" rows="5" cols="60">${document.getElementById("textContent").innerText}</textarea>
            <button type="submit" id="submitButton">Submit</button>
        `;
        document.getElementById("submitButton").addEventListener("click", (e) => {
            e.preventDefault();
            const newText = document.getElementById("editedTextContent").value;
            fetch("/editSubmitted", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({newText, section})
            })
            
            wikiContent.innerHTML = originalHTML;
            document.getElementById("textContent").innerText = newText;

            initButtons();
        });
    });
};

function setupResetButton() {
    document.getElementById("resetButton").addEventListener("click", () => {
        console.log("click detected");
        const defaultText = "Sample text";
        fetch("/resetExecuted", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({defaultText, section})
        })
        document.getElementById("textContent").innerText = defaultText;
    })
}

setupEditButton();
setupResetButton();