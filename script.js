// const e = require("express")

console.log("In this we will write code for to add book to DOM ")


// Todos"
// 1. Store all the data to the localStorage
// 2. Give another column as an option to delete the book
// 3. Add a scroll bar to the view



// Constructor
function Book(givenBookName, givenAuthorName, givenType) {
    this.bookName = givenBookName
    this.author = givenAuthorName
    this.type = givenType

};




// Display constructor
function Display() {

}




// Add method to display prototype  

// for add in display    ->  this will contain tamplate of html dom which will be shown at display
Display.prototype.add = function (book) {
    console.log("adding to UI")
    let tableBody = document.getElementById("tableBody");
    let uiString = `<tr>
                        <td>${book.bookName}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`
    tableBody.innerHTML += uiString;
    console.log(tableBody)
}

// for clear the data after submiting
Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset()    // this reset() function will reset the form again
}

// implementing the validation
Display.prototype.validate = function (book) {
    if (book.bookName.length < 2 || book.author.length < 2) {
        return false
    } else {
        return true
    }
}



Display.prototype.show = function (type, displayMassage) {
    let massage = document.getElementById("massage");
    massage.innerHTML += `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>Holy guacamole!</strong> ${displayMassage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                             </div>`
    setTimeout(() => {
        massage.innerHTML = ""
    }, 2000);
}



// Add submit event listner to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);
function libraryFormSubmit(event) {
    console.log("you have submitted library form");

    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let type;

    // fiction, programming, cooking
    let fiction = document.getElementById("fiction");
    let progmming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (progmming.checked) {
        type = progmming.value;
    }
    else if (cooking.checked) {
        type = cooking.value
    }

    let book = new Book(name, author, type)
    console.log(book)


    // for to show in display created display Object
    let display = new Display();

    if (display.validate(book)) {
        // these two are methods of display
        display.add(book);
        display.clear();
        display.show("success", "Your book has successfully added. ");
    }
    else {
        // show error to user
        display.show("danger", "sorry you can't add this book. ")
    }


    event.preventDefault();
    // form has it's own property that when we will submit the form then it will automatically reload.  this "event.preDefault" help us to not reload the file

}