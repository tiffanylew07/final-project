const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
const themeToggle = document.querySelector(".theme-toggle");

// load theme from local storage
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
// apply dark mode
        themeToggle.textContent = "☀️ Light Mode";
// changes button to light mode button when in dark mode
    }
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

/* clear variables to set up our buttons , notes container, and input box */
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
}
showNotes();

/*if the notes are in the browser / local storage, it will be displayed*/

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

/*adds a local storage to make sure our notes save even after refreshing*/
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");/* store elements */
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "https://img.icons8.com/?size=256&id=42858&format=png";
<!--    adds delete image icon -->
    img.alt = "Delete Note";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox); /* allows for input box and image to be displayed*/
    updateStorage();
});

/* This makes it so that when you click the button (btn) it will follow through wih that piece of code*/

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
      /*adds delete functionality to our notes*/
    } else if (e.target.tagName === "P") {
        e.target.addEventListener("keyup", updateStorage);
    }
});

/*on opening browser, checks local storage for any data and then display the data as a note*/

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
/*when we click enter it will add a line break and not do the default function of the enter key*/
