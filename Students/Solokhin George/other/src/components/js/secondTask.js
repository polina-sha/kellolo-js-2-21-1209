function f() {

}

export default class Form {
    constructor() {
        this.button = document.querySelector("button");
        this.name = document.querySelector("#input1");
        this.phone = document.querySelector("#input2");
        this.email = document.querySelector("#input3");
        this._init();
    }

    _init() {
        console.log(this.button)
        this.button.addEventListener("click", evt => {
            if(this.isNameRight() && this.isRightNumber() && this.isRightEmail()){
                this.button.nextElementSibling.innerHTML="Сообщение отправлено";
            }
        })

    }

    isNameRight() {
        let templ = /(\W|\d|\_)/g;
        if (templ.test(this.name.value) || this.name.value == "") {
            this.name.nextElementSibling.innerHTML = "Неверное имя";
            return false;
        }
        this.name.nextElementSibling.innerHTML = "";
        return true;
    }

    isRightNumber() {
        console.log(this.phone.value.length);
        let templ = /\+\d\(\d\d\d\)\d\d\d\-\d\d\d\d/;
        if (templ.test(this.phone.value) && this.phone.value.length == 15) {
            this.phone.nextElementSibling.innerHTML = "";
            return true;
        } else {
            this.phone.nextElementSibling.innerHTML = "Неверный номер";
            return false
        }
    }

    isRightEmail() {
        let templ =/^([a-z.-]+)@([a-z]+)\.([a-z\.]{2,6})$/;
        if (templ.test(this.email.value)) {
            this.email.nextElementSibling.innerHTML = "";
            return true;
        } else {
            this.email.nextElementSibling.innerHTML = "Неверный email";
            return false
        }
    }
}