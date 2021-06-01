// NICE SPANGLISH BRO

let listed = [];

const body = document.querySelector('body')
body.addEventListener('click', delegate)

const listScreen = document.getElementById('listScreen')
const lotteryScreen = document.getElementById('lotteryScreen')
const target_list = document.getElementById('TARGET');

const name_    = document.getElementById('NOMBRE');
const surname_ = document.getElementById('APELLIDO');   
const button_add = document.getElementById('btn_add');
const button_add2 = document.getElementById('btn_add2');
const winnerList = document.getElementById('winnerList');

isOverflown = element => element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;

function delegate(e) {
  const TARGET_ID = e.target.id;
  const TARGET_CLASS = e.target.className;

  
  ( TARGET_CLASS == 'item') ? delete_item(e) : {};
  ( TARGET_ID == 'btn_add' || TARGET_ID == 'btn_add2') ? tryPush(e) : {};
  ( TARGET_ID == 'reset_link') ? show(e) : {};

  ( TARGET_ID == 'sortear' || TARGET_ID == 'toListScreen' ) ? toggleLotteryScreen(e) : {};
  ( TARGET_ID == 'reset-lottery') ? resetWinnerList(e) : {};
  ( TARGET_ID == 'lottery-go') ? lottery() : {};
  
  e.stopPropagation();
};


function refreshButton() {
  // console.info(e)
  const ingreso = document.getElementById('ingreso');
  const botones = ingreso.querySelectorAll('button');
  
  document.getElementById('contador').innerHTML = target_list.childElementCount;
  
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
    button_add2.innerText = 'Agregar';
    

    return true;
  }
}


function show (e) {
  if (e.target.id == 'reset_link') {
    target_list.childNodes.forEach(childNode => console.log(childNode.setAttribute('id', 'bye_item')));
    setTimeout( () => {
      while (target_list.childElementCount != 0) {
        //target_list.innerHTML = ''
        target_list.lastChild.remove();
        document.getElementById('contador').innerHTML = target_list.childElementCount;
        refreshButton();
      }
    } ,200);
    listed = [];
    setTimeout ( () => {
      name_.value = '';
      surname_.value = '';
    }, 0);
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
    return refreshButton();
  };
};


function tryPush(e) {
  //console.info('Funciona adicionar')
  function push () {    
    if (refreshButton()) {
      if (name_.value == '' || surname_.value =='') {
          console.log('Falta completar al menos un dato');
      }
      else {
        console.log(`Añadido: ${name_.value} ${surname_.value}.`);
        listed.push( `${name_.value} ${surname_.value}`);  
        show(e);
        target_list.lastElementChild.classList.add('new_item');
        function removeAnimation() {
          target_list.lastElementChild.classList.remove('new_item');
        }
        setTimeout( removeAnimation , 500 );
        name_.value = ''; surname_.value = '';
      };
    };
  };
  e.target.id.includes('btn_add') ? push() : {};
};


function  delete_item(e) {
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
};




function toggleLotteryScreen(e) {
  const childNodes = target_list.childElementCount;
  if (childNodes < 2) {return console.log('Debe haber al menos 2 candidatos')};

  if (e.target.id == 'sortear') {
    //console.info(e.target.id);

    listScreen.classList.toggle('switch_in');
    listScreen.classList.toggle('switch_out');
    
    setTimeout( () => {
      listScreen.classList.toggle('hide');
      lotteryScreen.classList.toggle('hide');
      lotteryScreen.classList.toggle('switch_out');
      lotteryScreen.classList.toggle('switch_in');
    }, 1000);
    
    refreshLottery(); resetWinnerList();

  } else if (e.target.id == 'toListScreen'){
    //console.info('ELSEEEEEE' + e.target);

    lotteryScreen.classList.toggle('switch_out');
    lotteryScreen.classList.toggle('switch_in');
    
    setTimeout( () => {
      
      lotteryScreen.classList.toggle('hide');
      listScreen.classList.toggle('hide');
      listScreen.classList.toggle('switch_out');
      listScreen.classList.toggle('switch_in');
    }, 1000);
  };
};

function refreshLottery () {
  const participantsList = document.getElementById('participants-list');

  while (participantsList.hasChildNodes() ) {
    participantsList.lastChild.remove();
  };
  const frag = document.createDocumentFragment();
  
  let i=0;
  listed.forEach( enlistado => {
    const tempElementLottery = document.createElement('LI');
    tempElementLottery.value = i+1;
    tempElementLottery.title = `Indice ${i+1}, ${enlistado}`;
    tempElementLottery.innerText = enlistado;
    i++;

    frag.appendChild(tempElementLottery);
  });
  participantsList.appendChild(frag);
};

function resetWinnerList() {
  while (winnerList.childElementCount > 0) {
    winnerList.removeChild(winnerList.lastChild);
  };
};


function lottery() {
  const PARTICIPANTS = document.getElementById('participants-list').childNodes;
  const qWinners = parseInt( document.getElementById('input-winners').value);
  

  if (qWinners == 0 || isNaN( qWinners ) ) {return console.log('Debe haber al menos un ganador')}
  else if (qWinners > 7 || qWinners > PARTICIPANTS.length) {return console.log('Demasiados ganadores')};
  
  resetWinnerList()


  const the_winners_are_stored_here = [];

  function defWinners() {
    let temp = Math.floor( Math.random() * (PARTICIPANTS.length) );

    if (the_winners_are_stored_here.includes(temp)) {
      defWinners()
    }
    else {
      the_winners_are_stored_here.push(temp)
      return temp+1
    }
  }

  for (let i=1; i!=qWinners+1; i++) {
    defWinners()
  }



  const frag = document.createDocumentFragment();

  let i = qWinners+1;
  the_winners_are_stored_here.forEach( w => {
    const tempElement = document.createElement('LI');

    tempElement.classList.add(`w${qWinners-i+2}`);
    tempElement.innerText = (document.getElementById('participants-list').childNodes[w]).innerText;
    tempElement.value = (document.getElementById('participants-list').childNodes[w]).value;
    tempElement.style.animation = ` rainbowBKG ${qWinners-i*0.55}s linear infinite`;
    frag.appendChild(tempElement)
    i--;
  });
  //console.info(frag)
  winnerList.appendChild(frag);

  //console.info(winnerList)

  
}