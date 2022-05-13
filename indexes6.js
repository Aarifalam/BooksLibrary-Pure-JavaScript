console.log('this is Es6 version of Book-Library Project.')

class Book {
    constructor(givenBookName, givenAuthorName, givenType) {
        this.name = givenBookName
        this.author = givenAuthorName
        this.type = givenType
    }
};


class Display {


    add(book) {
        console.log("adding to UI")
        let tableBody = document.getElementById("tableBody");
        let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`
        tableBody.innerHTML += uiString;
        console.log(tableBody)
    }


    clear() {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset()    // this reset() function will reset the form again
    }


    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        } else {
            return true
        }
    }


    show(type, displayMassage) {
        let massage = document.getElementById("massage");
        massage.innerHTML += `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>Holy guacamole!</strong> ${displayMassage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                             </div>`
        setTimeout(() => {
            massage.innerHTML = ""
        }, 2000);
    }

}



// Add submit event listner to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);
function libraryFormSubmit(event) {
    console.log("you have submitted library form");

    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let type;
    // console.log(name)
    // console.log(author)


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
    // console.log(type)
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