function init(message) {

    const loginFormDiv = document.getElementById('loginFormDiv');
    
    const userNameInput = document.createElement('input');
    const userPasswordInput = document.createElement('input');
    const loginUserBtn = document.createElement('button');
    
    userNameInput.placeholder = 'Username (admin)';
    userNameInput.setAttribute('id', 'userNameInput');
    userPasswordInput.placeholder = 'Password (admin)';
    userPasswordInput.setAttribute('id', 'userPasswordInput');
    loginUserBtn.innerText = 'Log in';
    
    loginFormDiv.innerHTML = '';
    loginFormDiv.append(userNameInput, userPasswordInput, loginUserBtn);
    
    loginUserBtn.addEventListener('click', loginUser)
    
    if (message) {
        console.log(message);
        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.classList.add('errorMessage');
        errorMessageDiv.innerText = message;
        loginFormDiv.appendChild(errorMessageDiv);
    }
}

function loginUser() {
    console.log('click');

    const loginUserName = document.getElementById('userNameInput');
    const loginUserPassword = document.getElementById('userPasswordInput');

    let userLogin = {
        userName: loginUserName.value,
        userPassword: loginUserPassword.value
    }

    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLogin)
    })
    .then(res => res.json())
    .then(data => {
        console.log('result', data);

        if (data.access) {

            const loginFormDiv = document.getElementById('loginFormDiv');
            loginFormDiv.innerHTML = '';

            printWelcomeMessage(data.message, data.user);
            printCreateNoteForm();
            printNotesList();

        } else {
            init(data.message);
        }
    })
}

function printWelcomeMessage(message, user) {
     let welcomeHeading = document.getElementById('welcomeHeading');

     welcomeHeading.innerHTML = `
        ${message}!<br>
        Welcome ${user}, please write or view your notes below.`;
}

function printCreateNoteForm() {
    let noteForm = document.getElementById('noteForm');

    noteForm.innerHTML = `
        <span>Heading:</span><input type="text" id="noteHeading"><br>
        <span>Description:</span><input type="text" id="noteDescription"><br>
        <span>Content:</span><textarea id="noteContent"></textarea>
        <button id="addNewNoteBtn">Add new note</button><br>
        <button id="saveChangesToNoteBtn">Save changes</button>`;

    document.getElementById('addNewNoteBtn').addEventListener('click', addNote);
    document.getElementById('saveChangesToNoteBtn').addEventListener('click', changeNote);

    tinymce.init({
        selector: "#noteContent",
        plugins: 'code',
        toolbar: 'undo redo | forecolor backcolor | formatselect bold italic underline strikethrough | alignleft alignright | code',
    
        setup: function(editor) {
            editor.on('change', function(){
                editor.save();
            })
        }
    })
}

function addNote() {
    
    let noteHeading = document.getElementById('noteHeading');
    let noteDescription = document.getElementById('noteDescription');
    let noteContent = document.getElementById('noteContent');

    fetch('http://localhost:3000/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newNoteHeading: noteHeading.value,
            newNoteDescription: noteDescription.value,
            newNoteContent: noteContent.value
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log('create note', data);
    })

    printNotesList();
}

function changeNote() {
    
    let noteHeading = document.getElementById('noteHeading');
    let noteDescription = document.getElementById('noteDescription');
    let noteContent = document.getElementById('noteContent');

    fetch('http://localhost:3000/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newNoteHeading: noteHeading.value,
            newNoteDescription: noteDescription.value,
            newNoteContent: noteContent.value
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log('create note', data);
    })

    printNotesList();
}

function printNotesList() {

    let notesList = document.getElementById('notesList');

    fetch('http://localhost:3000/notes/')
    .then(res => res.json())
    .then(data => {
        console.log('notes from DB', data);

        let noteWrapper = document.createElement('div');
        noteWrapper.classList.add('noteCardWrapper');
        
        data.map(note => {

            let noteCard = document.createElement('div');
            noteCard.classList.add('noteCard');
        
            noteCard.innerHTML = `

            <h2 class="noteHeading">${note.noteHeading}</h2>

            <span class="noteCreateDate">- note was created at ${note.createDate}</span><br><br>
            
            <span class="noteDescription">${note.noteDescription}</span><br>
            <button>Read more &#8594;</button><br><br>
            
            <div class="noteContent hiddenContent">
                ${note.noteContent}<br>
                <button class="editNoteBtn" id="${note.noteId}">Edit</button>
            </div>`;

            
            noteWrapper.appendChild(noteCard);
            
        })
        
        notesList.innerHTML = '';
        notesList.appendChild(noteWrapper);

        document.querySelectorAll('.editNoteBtn')
        .forEach((button => {
            button.addEventListener('click', getEditNote)
        }));

    })
}

function getEditNote(e) {

    let noteToEdit = e.srcElement.id;

    fetch('http://localhost:3000/notes/' + noteToEdit)
    .then(res => res.json())
    .then(data => {
        console.log('specific note from db', data);

        let noteForm = document.getElementById('noteForm');
        
        noteForm.innerHTML = '';
        noteForm.innerHTML = `
        <span>Heading:</span><input type="text" id="noteHeading"><br>
        <span>Description:</span><input type="text" id="noteDescription"><br>
        <span>Content:</span><textarea id="noteContent"></textarea>
        <button id="addNewNoteBtn">Add new note</button><br>
        <button id="saveChangesToNoteBtn">Save changes</button>`;
        
        let noteHeading = document.getElementById('noteHeading');
        let noteDescription = document.getElementById('noteDescription');
        let noteContent = document.getElementById('noteContent');

        noteHeading.value = data[0].noteHeading;
        noteDescription.value = data[0].noteDescription;
        noteContent.value = data[0].noteContent;

        document.getElementById('addNewNoteBtn').addEventListener('click', addNote);
        document.getElementById('saveChangesToNoteBtn').addEventListener('click', changeNote);

        tinymce.init({
            selector: "#noteContent",
            plugins: 'code',
            toolbar: 'undo redo | forecolor backcolor | formatselect bold italic underline strikethrough | alignleft alignright | code',
        
            setup: function(editor) {
                editor.on('change', function(){
                    editor.save();
                })
            }
        })
    })

    console.log(noteToEdit);
}

init();