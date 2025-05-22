const button = document.querySelector('.button-add-task'); //botão adicionar nova tarefa
const input = document.querySelector('.input-task'); // botão de input para receber valores digitados pelo usuario
const listaCompleta = document.querySelector('.list-task'); //ul - lista de tarefas

let minhaListaDeTarefas = []; //array que começa vazio, e todos valores são inseridos aqui.


function adicionarNovaTarefa(event) {
  event.preventDefault();
  
  if(input.value.trim() === '') {
    alert('Por favor digite uma nova tarefa!')
    return;
  }
  minhaListaDeTarefas.push({
    tarefa: input.value,
    concluida: false
  }) //pega o valor digitado pelo usuario e adiciona na lista e verifica se a tarefa está concluida ou não.

  mostrarTarefas(); //função que mostra a lista de tarefas

  input.value = ''; //input pega o valor inserido pelo usuário
}

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    adicionarNovaTarefa(e);
  }
});

function mostrarTarefas() {
  let novaLi = ''; //variavel que aceita alteração de valores começando vazia.

  minhaListaDeTarefas.forEach((item, index) => {
    novaLi = novaLi + `
      <li class="task ${item.concluida && "done"}">
            <i class="fa-solid fa-circle-check" onclick="concluirTarefa(${index})"></i>
            <p>${item.tarefa}</p>
            <i class="fa-solid fa-pencil" onclick="editarTarefa(${index})"></i>
            <i class="fa-solid fa-trash" onclick="deletarItem(${index})"></i>
          </li>
          `      
  })
  listaCompleta.innerHTML = novaLi; //adiciona no html a lista completa

  localStorage.setItem('lista', JSON.stringify(minhaListaDeTarefas)); //salva os itens da lista no localstorage para quando atualizar a tela, os dados não sejam perdidos.
  //json.stringify serve para transforma um objeto em string, pois o localStorage aceita apenas string.
};

//função para marcar tarefa como concluída, com operador de negação para tarefas não concluída
function concluirTarefa(index) {
  minhaListaDeTarefas[index].concluida = !minhaListaDeTarefas[index].concluida;

  mostrarTarefas();
}

//função para excluir um item da lista a partir da posição
function deletarItem(index) {
  minhaListaDeTarefas.splice(index, 1);  //posição do item e quantidade que irá ser excluida.
  
  mostrarTarefas();//chama a função para mostrar o restante da lista após a exclusão
}

function recarregarTarefas() {
    const tarefasLocalStorage = localStorage.getItem('lista');//pega o obbjeto do localStorage e manda pra lista de tarefas

    minhaListaDeTarefas = JSON.parse(tarefasLocalStorage) || []; //json.parse transforma string em objeto novamente para ser mostrado na tela, => || [](garante que sempre será um array)

    mostrarTarefas();
}

function editarTarefa(index) {
  const editaTarefa = prompt("Edite sua tarefa:", minhaListaDeTarefas[index].tarefa);

  if(editaTarefa !== null && editaTarefa.trim() !== "") {
    minhaListaDeTarefas[index].tarefa = editaTarefa.trim();

    mostrarTarefas();
  }
}

recarregarTarefas();

button.addEventListener('click', adicionarNovaTarefa);//quando clica no botão adicionar, o item é adicionado na lista abaixo

