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