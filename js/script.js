const tabelaTarefa = document.getElementById('tabelaTarefa');
const listaImportancia = document.getElementById('listaImportancia');
const tituloImportancia = document.getElementById('tituloImportancia');
const adcBotao = document.getElementById('adcBotao');
const descricaoInput = document.getElementById('desc');
const autorInput = document.getElementById('autor');
const deptoInput = document.getElementById('depto');
const importanciaInput = document.getElementById('importancia');
const mostrarOrdemBtn = document.getElementById('mostrarOrdemBtn');
let tarefas = [];

function renderTable() {
  const tableBody = tabelaTarefa.querySelector('tbody');
  tableBody.innerHTML = '';
  tarefas.forEach((tarefa, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${tarefa.descricao}</td>
      <td>${tarefa.autor}</td>
      <td>${tarefa.depto}</td>
      <td>${tarefa.importancia}</td>
      <td>${tarefa.value || ''}</td>
      <td>${tarefa.duracao || ''}</td>
      <td><button onclick="deletaTarefa(${index})">Excluir</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function renderlistaImportancia() {
  listaImportancia.innerHTML = '';
  const sortedTarefas = tarefas.slice().sort((a, b) => b.importancia - a.importancia);
  sortedTarefas.forEach(tarefa => {
    const listaItem = document.createElement('li');
    listaItem.textContent = tarefa.descricao;
    listaImportancia.appendChild(listaItem);
  });
}

function deletaTarefa(index) {
  tarefas.splice(index, 1);
  renderTable();
  renderlistaImportancia();
}
      adcBotao.addEventListener('click', () => {
        const descricao = descricaoInput.value
        const autor = autorInput.value
        const depto = deptoInput.value
        const importancia = parseInt(importanciaInput.value);
        const tarefa = { descricao, autor, depto, importancia };
        const isPaid = confirm('A tarefa foi paga à parte?');
        if (isPaid) {
          const value = parseFloat(prompt('Valor pago:'));
          tarefa.value = value;
        }
        const isCompleted = confirm('A tarefa foi realizada à parte?');
        if (isCompleted) {
          const duracao = parseFloat(prompt('Duração da tarefa (horas):'));
          tarefa.duracao = duracao;
        }
        tarefas.push(tarefa);
        renderTable();
        renderlistaImportancia();
  
        descricaoInput.value = '';
        autorInput.value = '';
        deptoInput.value = '';
        importanciaInput.value = '';
      });

      mostrarOrdemBtn.addEventListener('click', () => {
    if (listaImportancia.style.display === 'none') {
      listaImportancia.style.display = 'block';
      tituloImportancia.style.display = 'block';
    } else {
      listaImportancia.style.display = 'none';
      tituloImportancia.style.display = 'none';
    }
  });