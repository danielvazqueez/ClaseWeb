
let tags = document.getElementsByName('todo');
for(let i = 0; i < tags.length; i++) {
  let elementTag = tags[i];
  elementTag.addEventListener('change', () => {
    updateToDo(elementTag);
  });
}

function updateToDo(element) {
  if (element.checked) {
    element.nextSibling.classList.add('done');
    document.getElementById('doneList').appendChild(element.parentElement);
  } else {
    element.nextSibling.classList.remove('done');
    document.getElementById('listElement').appendChild(element.parentElement);
  }
}

let addElementText = document.getElementById('newitem');

addElementText.addEventListener('keyup', (event) => {
  if (event.keyCode === 13 && addElementText.value != '') {
    event.preventDefault();
    let liNode = document.createElement('li');
    let inputNode = document.createElement('input');
    let spanNode = document.createElement('span');
    spanNode.id = 'element' + tags.length;
    inputNode.type = 'checkbox';
    inputNode.name = 'todo';
    inputNode.value = tags.length;
    let textNode = document.createTextNode(addElementText.value);
    spanNode.appendChild(textNode);
    liNode.appendChild(inputNode);
    liNode.appendChild(spanNode);
    inputNode.addEventListener('change', () => {
      updateToDo(inputNode);
    });
    addElementText.value = '';
    document.getElementById('listElement').appendChild(liNode);
  }
});