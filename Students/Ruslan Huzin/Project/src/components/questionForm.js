export default class QuestionForm {
    constructor() {
        this.container = document.querySelector('.modal-question-form');
        this.modalWindow = document.querySelector('.modal-back');
        this.crossButton = document.querySelector('.modal-question-form i.fa-times');
        this.nameBox = document.querySelector('input[name="name"]');
        this.phoneBox = document.querySelector('input[name="phone"]');
        this.mailBox = document.querySelector('input[name="mail"]');
        this.textBox = document.querySelector('textarea[name="text"]');
        this.submitButton = document.querySelector('.submit-button');
        this.mailRegExp = new RegExp('^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$');
        this.nameRegExp = new RegExp('^[a-z]+$');
        this.phoneNumberRegExp = new RegExp('^([+]7)[(]([0-9]){3}[)]([0-9]){3}-([0-9]){4}$');
        this.textRegExp = new RegExp('.+')
        this.inputs = [this.nameBox, this.phoneBox, this.mailBox, this.textBox];
        this.RegExps = [this.nameRegExp, this.phoneNumberRegExp, this.mailRegExp, this.textRegExp]
        this.messages = ['Имя содержит только латинские буквы','Телефон имеет вид +7(000)000-0000', 'Неправильный E-mail', 'Введите сообщение']
        this._init();
    }

    _init() {
        this._render();
        this._handleActions();
    }
    
    _render() {
        setTimeout(() => {
            this.container.style.cssText = 'display: flex; animation: slide-in-right 0.5s';
            this.modalWindow.style.display = 'block';
        }, 1000);
    }

    _handleActions() {
        this.crossButton.addEventListener('click', () => {
            this.container.style.animation = 'slide-out-right 0.7s';
            setTimeout(() => {
                this.container.style.display = 'none';
                this.modalWindow.style.display = 'none';
            }, 500);
        });

        this.submitButton.addEventListener('click', this._setValidations.bind(this));

    }

    _setValidations(ev) {
        let i = 0;
        this.inputs.forEach(input => {
            if (!this.RegExps[i].test(input.value)) {
                input.placeholder = this.messages[i];
                input.classList.add('input-error');
                ev.preventDefault();
            }
            else{
                input.classList.remove('input-error');
            }
            i+=1;
        })
    }


    /*     _setValidations(ev) {
            if (!this.nameRegExp.test(this.nameBox.value)) {
                this.nameBox.placeholder = 'Имя содержит только латинские буквы';
                this.nameBox.classList.add('input-error');
                ev.preventDefault();
            }
            else{
                this.nameBox.classList.remove('input-error');
            }
            if (!this.mailRegExp.test(this.mailBox.value)) {
                this.mailBox.placeholder = 'Неправильный E-mail';
                this.mailBox.classList.add('input-error');
                ev.preventDefault();
            }
            else{
                this.mailBox.classList.remove('input-error');
            }
            if (!this.phoneNumberRegExp.test(this.phoneBox.value)) {
                this.phoneBox.placeholder = 'Телефон имеет вид +7(000)000-0000';
                this.phoneBox.classList.add('input-error');
                ev.preventDefault();
            }
            else{
                this.phoneBox.classList.remove('input-error');
            }

            if (this.textBox.value.length == 0){
                this.textBox.placeholder = 'Введите сообщение';
                this.textBox.classList.add('input-error');
                ev.preventDefault();
            }
            else{
                this.textBox.classList.remove('input-error');
            }
        } */
}