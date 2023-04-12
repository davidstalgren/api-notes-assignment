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

function init() {

    const loginFormDiv = document.getElementById('login');
    const userNameInput = document.createElement('input');
    const userPasswordInput = document.createElement('input');
    const loginUserBtn = document.createElement('button');

    userNameInput.placeholder = 'Username';
    userNameInput.setAttribute('id', 'userNameInput');
    userPasswordInput.placeholder = 'Password';
    userPasswordInput.setAttribute('id', 'userPasswordInput');
    loginUserBtn.innerText = 'Log in';
    
    loginFormDiv.append(userNameInput, userPasswordInput, loginUserBtn);

    loginUserBtn.addEventListener('click', loginUser)
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
    })
}

let noteHeading = document.getElementById('noteHeading');
let noteDescription = document.getElementById('noteDescription');
let noteContent = document.getElementById('noteContent');
let noteResult = document.getElementById('noteResult');
let notesList = document.getElementById('notesList');


document.getElementById('saveNoteBtn').addEventListener('click', addNote)

function addNote() {
    console.log('click', noteContent.value);
    noteResult.innerHTML = noteContent.value;

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

}

function printNotesList() {

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
                <button id="${note.noteId}">Edit</button>
            </div>`;

            noteWrapper.appendChild(noteCard);

        })

        notesList.innerHTML = '';
        notesList.appendChild(noteWrapper);
    })
}

init();
printNotesList();