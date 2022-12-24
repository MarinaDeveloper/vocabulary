const engWord = document.getElementById('eng'),
      uaWord = document.getElementById('ua'),
      inputs = document.getElementsByClassName('input'),
      addButton = document.getElementById('add-word-btn'),
      table = document.getElementById('table');

let words;
let btnsDelete;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

const addEventDelete = () => {
    if(words.length > 0) {
        btnsDelete = document.querySelectorAll('.btn-delete');
        for(let btn of btnsDelete) {
            btn.addEventListener('click', e => {
                deleteWors(e);
            })
        }
    }
}

const addWordToTable = index => {
    table.innerHTML += `
        <tr class="tr">
            <td class="eng-word">${words[index].english}</td>
            <td class="ua-word">${words[index].ukrainian}</td>
            <td>
                <button class="btn-delete"></button>
            </td>
        </tr>
    `
    addEventDelete();
}

words.forEach((element, i) => {
    addWordToTable(i);
});

addButton.addEventListener('click', () => {
    if(
        engWord.value.length < 1 ||
        uaWord.value.length < 1 ||
        !isNaN(engWord.value) ||
        !isNaN(uaWord.value)
    ){
        for(let key of inputs) {
            key.classList.add('error');
        }
    } else {
        for(let key of inputs) {
            key.classList.remove('error');
        }
        words.push(new CreareWord(engWord.value, uaWord.value));
        localStorage.setItem('words', JSON.stringify(words));
        addWordToTable(words.length - 1);
        engWord.value = null;
        uaWord.value = null;
    }
})

function CreareWord(english, ukrainian) {
    this.english = english;
    this.ukrainian = ukrainian;
}

const deleteWors = e => { 
    const rowIndex = e.target.parentNode.parentNode.rowIndex;
    e.target.parentNode.parentNode.parentNode.remove();
    words.splice(rowIndex, 1);
    localStorage.removeItem('words');
    localStorage.setItem('words', JSON.stringify(words));
}

addEventDelete();