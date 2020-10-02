//1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки.
// Придумать шаблон, который заменяет одинарные кавычки на двойные.
//2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась
// на двойную.

function WordCensore(){
    textInput = document.getElementById('text'),
    textWord = document.getElementById('word'),
    textCens = textInput.value,
    regWord = /'/;
    textInput.value = "";
    
    while (regWord.test(textCens)){
        textCens = textCens.replace(regWord,'"');
    }
         
     textWord.innerHTML = textCens;
}

