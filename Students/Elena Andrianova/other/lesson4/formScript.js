
class ValideForm {
    constructor() {
        this.regexp_name = /^[a-zа-яё]+$/gi;
        this.regexp_email = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
        this.regexp_phone = /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}(-\d{2}){2}$/;
        this.regexp_message = /[a-zа-яё0-9]/;

        this.btn = document.querySelector('.btn');
        this.name = document.querySelector('#registerName');
        this.email = document.querySelector('#registerEmail');
        this.phone = document.querySelector('#registerPhoneNumber');
        this.message = document.querySelector('#registerTextMessage');
        this.init();
    }

    init() {
        this.btn.addEventListener('click', ev => {
            if (this._valideName() && this._valideEmail() && this._validePhone() && this._valideMessage()){
                alert('Отправлено')
            }
        })
    }

    _valideName() {
        if(this.regexp_name.test(this.name.value) === true) {
            this.name.style.outline = '2px solid #6ef086';
            return true;
        } else {
            this.name.style.outline = '2px solid #e34949';
        }
    }

    _valideEmail(){
        if(this.regexp_email.test(this.email.value) === true) {
            this.email.style.outline = '2px solid #6ef086';
            return true;
        } else {
            this.email.style.outline = '2px solid #e34949';
            return false;
        }
    }

    _validePhone() {
        if(this.regexp_phone.test(this.phone.value) === true) {
            this.phone.style.outline = '2px solid #6ef086';
            return true;
        } else {
            this.phone.style.outline = '2px solid #e34949';
            return false;
        }
    }
    _valideMessage() {
        if(this.regexp_message.test(this.message.value) === true) {
            this.message.style.outline = '2px solid #6ef086';
            return true;
        } else {
            this.message.style.outline = '2px solid #e34949';
            return false;
        }
    }
}
