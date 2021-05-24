let listed = [];
let counter = document.getElementById('contador');
let target_list = document.getElementById('TARGET');

let button_add = document.getElementById('btn_add');
button_add.innerHTML = '+';

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}


function show(array) {
  counter.innerHTML = array.length;
  let show = '';
  if (array.length != 0) {
    array.forEach ( fullName => show += `<li class='item' onclick='delete_item(this)'> ${fullName} </li>`);
  } else {
    show = '<< VACIO >>'
  }
  return show
}


let refresh = function() {
  if ( isOverflown(target_list) ) {
      console.log('Maximo por pantalla');
      button_add.innerHTML = '!';
  } else {
    button_add.innerHTML = '+';
    let name_    = document.getElementById('NOMBRE');
    let surname_ = document.getElementById('APELLIDO');   
    if ( name_.value.includes(' ') || surname_.value.includes(' ') ) {
      console.log('No se permiten espacios');
    } else {
      if (name_.value == '' || surname_.value =='') {
        console.log('Falta completar al menos un dato');
      } else {
        console.log(`${listed.length+1}. Añadido Nombre: ${name_.value}, Apellido: ${surname_.value}`);
        listed.push(`${name_.value} ${surname_.value}`);
        target_list.innerHTML = show(listed);
        name_.value = ''; surname_.value = '';
      }
    }
  }
}

let delete_item = function(elemento) {
  //let target_list = document.getElementById('TARGET');
  let tarr = [];

  for ( let index = 0; index < listed.length; index++ ) {
    let element = listed[index];
    if (element == elemento.innerText) {
      console.log(`Eliminado '${element}' en indice ${index+1}`);
    } else {
      tarr.push(element);
    }
  }

  target_list.innerHTML = show(tarr);
  listed = tarr
  console.log(target_list.innerText)
}

let reset_everything = () => {
  listed = [];
  target_list.innerHTML = show(listed);
}