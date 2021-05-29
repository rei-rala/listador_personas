let listed = [];
const counter = document.getElementById('contador');
const target_list = document.getElementById('TARGET');

const button_add = document.getElementById('btn_add');
const button_add2 = document.getElementById('btn_add2');

btn_add.addEventListener('click', pushItem );
btn_add2.addEventListener('click', pushItem );

button_add.innerText = '+';
button_add2.innerText = 'Agregar';


isOverflown = element => element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;

show = () => {
  let show = '';
  if (listed.length > 0) {
    for (let i=0; i < listed.length; i++) {
      show += listed[i]
    }
  } else {
    show = '<< Vacio >>'
  }
  target_list.innerHTML = show;
  counter.innerText = listed.length;
  const items = target_list.querySelectorAll('li');
  for (let i=0; i<items.length; i++) { 
    items[i].addEventListener('click', delete_item)
  }
}


function pushItem() {
  //console.info('Funciona adicionar')
  if ( isOverflown(target_list) ) {
      console.log('Maximo por pantalla');
      button_add.innerText = '!';
      button_add2.innerText = 'Excedido!'
      botton_add.style.backgroundColor = 'red';
      botton_add2.style.backgroundColor = 'red';
      botton_add.style.Color = 'white';
      botton_add2.style.Color = 'white';
  } else {
    button_add.innerText = '+';
    button_add2.innerText = 'Agregar'
    
    let name_    = document.getElementById('NOMBRE');
    let surname_ = document.getElementById('APELLIDO');   
    if (name_.value == '' || surname_.value =='') {
        console.log('Falta completar al menos un dato');
      } else {
        console.log(`Añadido: ${name_.value} ${surname_.value}.`);
        listed.push(`<li class='item' title="Click para eliminar este elemento." value="${listed.length+1}"> ${name_.value} ${surname_.value} </li>`); 
        
        show();
        name_.value = ''; surname_.value = '';
    }
  }
}


function delete_item() {
  //console.info('Funciona delete')
  
  const tarr = []
  for (let i=0; i<listed.length; i++) {
    if (listed[i].includes(' value=\"' + this.value + '\"')) {
      console.log(`Eliminado ${this.innerText}`);
    }
    else {
      //console.log(`No es eliminado index ${i+1}`)
      tarr.push(listed[i]);
    }
  }
  listed = tarr;

  show();
}

reset_everything = () => {
  console.log('Lista vaciada');
  listed = [];
  show();
}