// CODE EXPLAINED channel

// select the Elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');


// clases names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';


// Variables
let LIST = [];
let id = 0;


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// get item from LocalStorage
let data = localStorage.getItem('TODO');

// check if data is not empty
if(data){
	LIST = JSON.parse(data);
	id = LIST.length; // set the id to the last one in the list
	loadList(LIST); // load the list to the user interface
} else{ // if data is empty
	LIST = [];
	id = 0;
}
// load items to the user's interface
function loadList(array){
	array.forEach(function(item){
		addToDo(item.name, item.id, item.done, item.trash);
	});
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Refresh Button - clear the localStorage
clear.addEventListener('click', function(){
	localStorage.clear();
	location.reload();
});



// show todays date
const today = new Date();
const options = {weekday: 'long', month: 'short', day: 'numeric'};

dateElement.innerHTML = today.toLocaleDateString('en-US', options);


// addToDo function
function addToDo(toDo, id, done, trash){

	if(trash){
		return;
	}

	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINE_THROUGH : '';

	const item = 
	`<li class="item">
		<i class="fa ${DONE} co" job="complete" id="${id}"></i>
		<p class="text ${LINE}">${toDo}</p>
		<i class="fa fa-trash-o de" job="delete" id="${id}"></i>
	</li>	
	`;

	const position = 'beforeend';
	list.insertAdjacentHTML(position, item);
}


// add an item to the list user the Enter key
document.addEventListener('keyup', function(e){
	if(e.keyCode === 13){
		const toDo = input.value;

		// if the input isn't empty
		if(toDo){
			addToDo(toDo, id, false, false);

			LIST.push({
				name: toDo,
				id: id,
				done: false,
				trash: false
			});
			// add item to localStorage
			// we MUST add this code enywhere the LIST array is updated
			localStorage.setItem('TODO', JSON.stringify(LIST));

			// increment id for next item
			id++;
		}
		input.value = '';
	}
});


addToDo('Coffee', 1, false, true)


// complete todo
function completeToDo(element){
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

	LIST[element.id].done = LIST[element.id].done ? false : true;
}


// remove todo if we click Trash Bin
function removeToDo(element){
	element.parentNode.parentNode.removeChild(element.parentNode);

	LIST[element.id].trash = true;
}


// target the items created dynamically
list.addEventListener('click', function (e){
	const element = e.target; // this returns clicked element inside the list
	const elementJob =  element.attributes.job.value; // complete or delete

	if(elementJob === 'complete'){
		completeToDo(element);
	} else if(elementJob === 'delete'){
		removeToDo(element);
	}	
	// add item to localStorage
	// we MUST add this code enywhere the LIST array is updated
	localStorage.setItem('TODO', JSON.stringify(LIST));
});







