console.log('hello world');

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

printNotesList();