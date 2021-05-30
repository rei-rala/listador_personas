let listed = [];
const counter = document.getElementById('contador');
const target_list = document.getElementById('TARGET');

const reset_link = document.getElementById('reset_link');
const button_add = document.getElementById('btn_add');
const button_add2 = document.getElementById('btn_add2');

reset_link.addEventListener('click', show );

const ingreso = document.getElementById('ingreso');
ingreso.addEventListener('click', tryPush)

isOverflown = element => element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;

function refreshButton(e) {
  // console.info(e)
  const botones = ingreso.querySelectorAll('button');
  
  if (isOverflown(target_list)) {
    console.log('Maximo por pantalla');
    botones.forEach( elemento => {
      elemento.style.backgroundColor = 'red';
      elemento.style.Color = 'grey';
    });
    button_add.innerText = '!';
    button_add2.innerText = 'Excedido!';

    return false;
  }
  else {
    botones.forEach( elemento => {
      elemento.style.backgroundColor = 'green';
      elemento.style.Color = 'white';
      }
    );
    button_add.innerText = '+';
    button_add2.innerText = 'Agregar'

    return true;
  }
}


function show (e) {
  let show = '';
  if (e.target.id == 'reset_link') {
    while (target_list.lastChild) {
      target_list.lastChild.remove();
    }
    listed = [];
    console.log('Lista vaciada');
  }
  else {
    if (listed.length > 0) {
      for (let i=0; i < listed.length; i++) {
        show += listed[i];
      }
    }
    else {
      show = '<< Vacio >>';
    }
    target_list.innerHTML = show;
    counter.innerText = listed.length;
    target_list.addEventListener('click', delete_item);
  }
  return refreshButton(e);
}


function tryPush(e) {
  //console.info('Funciona adicionar')
  e.stopPropagation()
  function push () {    
      if (refreshButton()) {
      let name_    = document.getElementById('NOMBRE');
      let surname_ = document.getElementById('APELLIDO');   
      if (name_.value == '' || surname_.value =='') {
          console.log('Falta completar al menos un dato');
      }
      else {
        console.log(`Añadido: ${name_.value} ${surname_.value}.`);
        listed.push(`<li class='item' title="Click para eliminar este elemento." value="${listed.length+1}"> ${name_.value} ${surname_.value} </li>`); 
        show(e);
        name_.value = ''; surname_.value = '';
      }
    }
  }
  e.target.id.includes('btn_add') ? push() : {};
}


function delete_item(e) {
  //console.info('Funciona delete')
  e.stopPropagation();
  if (this.innerHTML == undefined) {
    console.log(this.inner);
  }
  else {
    const tarr = [];
    for (let i=0; i<listed.length; i++) {
      if (listed[i].includes(' value=\"' + e.target.value + '\"')) {
        console.log(`Eliminado ${e.target.innerText}`);
      }
      else {
        //console.info(`No es eliminado index ${i+1}`)
        tarr.push(listed[i]);
      }
    }
    listed = tarr;
    show(e);
  }
}