const body = document.querySelector("body")
// Основной блок
const mainBlock = document.createElement("div");
mainBlock.classList.add("main");
body.append(mainBlock);
//Обертка для кнопок
const panelButton = document.createElement("div");
panelButton.classList.add("main__panel")
//Кнопка добавление новой формы
const buttonCreateForm = document.createElement("button");
buttonCreateForm.type="button";
buttonCreateForm.innerHTML ="Add new Form";
//Кнопка удаления формы
const buttonDeleteForm = document.createElement("button");
buttonDeleteForm.type="button";
buttonDeleteForm.innerHTML ="Delete Random Form";
//Массив значений для label
const dataForm = ["City","Adress","Home","Number"]
//Дефолтное значение номера заголовка формы 
let defaultNumberTitle = 0;
//Переменная для увеличения значений name, placeholder,id
let count = 0;
//Функция увеличивающая count
function countIncrement(){
    return ++count
}
//Функция уменьшающая count
function countDecrement(){
    return --count
}
//Функция создающая форму с инпутами
function createForm() {
    //Заголовок формы
    let titleForm = document.createElement("h3");
    titleForm.classList.add("form__title");
    titleForm.innerHTML = `Form # ${defaultNumberTitle+count}`;
    //Создание формы, присвоение классов и добавление в форму элементов.
    const form = document.createElement("form");
    form.id=`form_${defaultNumberTitle+count}`
    form.classList.add("form");
    form.prepend(titleForm)
    dataForm.forEach((item,index) => {
        const input = document.createElement("input");
        const label = document.createElement("label");
        label.innerHTML = item;
        if(count >=1){
            input.name=`adress_${incrimentCount(count, index)}`;
            input.placeholder=`input_${incrimentCount(count, index)}`;

        } else{
            input.name=`adress_${index}`;
            input.placeholder=`input_${index}`;
        }
        switch(item) {
            case "City": 
            input.type="text";
            break;
            case "Adress": 
            input.type="text";
            break;
            case "Home": 
            input.type="number";
            break;
            case "Number": 
            input.type="number";
            break;
            default: 
            input.type="text";
        }
        form.append(label,input);
        mainBlock.append(form); 
    })  
}
//Функция для увеличения значений в name и placeholder
function incrimentCount( number,index){
    return index + number
}
//Функция удаления случайной формы и обновление значений в оставшихся формах
function deleteFormArray() {
    //Собираем все формы в массив
    let arrayForms = Array.from(document.querySelectorAll(".form"))
    //Получаем случайное число для удаления формы
    let randomNumber = randomInteger(0, arrayForms.length)
    //Перебор массива форм
    arrayForms.forEach((item,index) => {
        //Получаем title формы
        let newTitleForm = item.querySelectorAll(".form__title")
        //Получаем все инпуты формы
        let inputs = item.querySelectorAll("input")
        
        if(item.id === `form_${randomNumber}`){
            arrayForms.slice(randomNumber,1)
            item.remove()
        }
        if(item.id !== `form_${randomNumber}` && parseInt(item.id.match(/\d+/)) > randomNumber){
            //Меняем Title у формы
            newTitleForm[0].innerHTML =`Form # ${index-1}`;
            //Изменяем значение id формы
            item.id = `form_${index-1}`;
            //Перебираем инпуты и заменяем значения name и placeholder
            inputs.forEach((input) => {
                input.name = `adress_${parseInt(input.name.match(/\d+/)) - 1}`;
                input.placeholder=`input_${parseInt(input.placeholder.match(/\d+/)) - 1}`;
            })  
        }
    })
}

//Функция для получения случайного числа
function randomInteger(min, max) {
    let rand = min + Math.random() * max;
    return Math.floor(rand);
  }

//Добавляем кнопки на страницу
panelButton.append(buttonCreateForm, buttonDeleteForm)
//Добавляем блок с кнопками на страницу
mainBlock.append(panelButton)
//Создаем форму при клике на кнопку
buttonCreateForm.addEventListener("click", () => {
    createForm();
    countIncrement();
})
//Удаляем форму при клике
buttonDeleteForm.addEventListener('click', () => {
    countDecrement();
    deleteFormArray();  
})



