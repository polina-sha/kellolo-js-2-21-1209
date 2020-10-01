import Basket from './basket';
import Catalog from './catalog';
import QuestionForm from './questionForm';

export default () => {
    let b = new Basket();
    let c = new Catalog(b);
    let questionForm = new QuestionForm();
}