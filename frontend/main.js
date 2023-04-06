console.log('hello world');

tinymce.init({
    selector: "#textContent",
    plugins: 'code',
    toolbar: 'undo redo | forecolor backcolor | formatselect bold italic underline strikethrough | alignleft alignright | code',

    setup: function(editor) {
        editor.on('change', function(){
            editor.save();
        })
    }
})


let textContent = document.getElementById('textContent');
let textResult = document.getElementById('textResult');


document.getElementById('saveBtn').addEventListener('click', function(){
    console.log(textContent.value);

    textResult.innerHTML = textContent.value;
})