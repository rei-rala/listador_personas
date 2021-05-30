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
  if (e.target.id == 'reset_link') {
    while (target_list.lastChild) {
      target_list.lastChild.remove();
    }
    listed = [];
    console.log('Lista vaciada');
  }
  else {
    //console.log(`Count ${target_list.childElementCount}`)
    const frag = document.createDocumentFragment();
    let i = 1;
    
    while (target_list.lastChild) {
      target_list.lastChild.remove();
    };
    listed.forEach(enlistado => {
      const tempElement = document.createElement('li');
      tempElement.classList.add('item');
      tempElement.title = 'Click para eliminar este elemento';
      tempElement.value = i;
      tempElement.innerText = enlistado;
      i++;

      frag.appendChild(tempElement);
    });
    target_list.appendChild(frag);
    target_list.addEventListener('click', delete_item);
    counter.innerText = target_list.childElementCount;
  };
  return refreshButton(e);
};


function tryPush(e) {
  //console.info('Funciona adicionar')
  e.stopPropagation();
  function push () {    
      if (refreshButton()) {
      let name_    = document.getElementById('NOMBRE');
      let surname_ = document.getElementById('APELLIDO');   
      if (name_.value == '' || surname_.value =='') {
          console.log('Falta completar al menos un dato');
      }
      else {
        console.log(`Añadido: ${name_.value} ${surname_.value}.`);
        listed.push( `${name_.value} ${surname_.value}`);  
        show(e);
        target_list.lastElementChild.classList.add('new_item')
        function removeAnimation() {
          target_list.lastElementChild.classList.remove('new_item');
        }
        setTimeout( removeAnimation , 500 )
        name_.value = ''; surname_.value = '';
      }
    }
  }
  e.target.id.includes('btn_add') ? push() : {};
}


function delete_item(e) {
  //console.info('Funciona delete')
  // console.log(e)
  e.stopPropagation();
  const tarr = [];
  for (let i=0; i<target_list.childElementCount; i++) {
    const childNode = target_list.childNodes;
    if (childNode[i].value == e.target.value) {
      console.log(`Eliminado ${e.target.innerText}`);
      e.target.setAttribute('id', 'bye_item');
    }
    else {
      //console.info(`No es eliminado index ${i+1}`);
      tarr.push( listed[i] );
    }
  }
  // console.info(tarr)
  function awaitAnimation () {
    listed = tarr;
    show(e);
  }
  setTimeout(awaitAnimation , 200);
}