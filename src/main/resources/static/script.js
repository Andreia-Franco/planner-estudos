const API_URL = "http://localhost:8080/tarefas";

const campoMateria = document.getElementById("materia");
const campoAtividade = document.getElementById("atividade");
const botaoAdicionar = document.getElementById("botaoAdicionar");
const listaTarefas = document.getElementById("listaTarefas");


// ================================
// BUSCAR TAREFAS NO JAVA
// ================================

async function carregarTarefas() {

    const resposta = await fetch(API_URL);

    const tarefas = await resposta.json();

    renderizarTarefas(tarefas);
}


// ================================
// MOSTRAR TAREFAS NA PÁGINA
// ================================

function renderizarTarefas(tarefas) {

    listaTarefas.innerHTML = "";

    tarefas.forEach(function(tarefa) {

        const novaTarefa = document.createElement("div");

        novaTarefa.classList.add("tarefa");

        if (tarefa.concluida) {
            novaTarefa.classList.add("concluida");
        }

        novaTarefa.innerHTML = `
            <div class="conteudo-tarefa">

                <h3>${tarefa.materia}</h3>

                <p>${tarefa.atividade}</p>

            </div>

            <div class="acoes-tarefa">

                <span class="status">
                    ${tarefa.concluida ? "Concluída" : "Pendente"}
                </span>

                <button
                    type="button"
                    class="botao-concluir"
                >
                    ${tarefa.concluida ? "Desfazer" : "Concluir"}
                </button>

                <button
                    type="button"
                    class="botao-excluir"
                >
                    Excluir
                </button>

            </div>
        `;


        const botaoConcluir =
            novaTarefa.querySelector(".botao-concluir");

        const botaoExcluir =
            novaTarefa.querySelector(".botao-excluir");


        // CONCLUIR / DESFAZER
        botaoConcluir.addEventListener("click", async function() {

            await atualizarTarefa(tarefa);

        });


        // EXCLUIR
        botaoExcluir.addEventListener("click", async function() {

            await excluirTarefa(tarefa.id);

        });


        listaTarefas.appendChild(novaTarefa);

    });
}


// ================================
// ADICIONAR TAREFA
// ================================

botaoAdicionar.addEventListener("click", async function() {

    const materia = campoMateria.value.trim();
    const atividade = campoAtividade.value.trim();


    if (materia === "" || atividade === "") {

        alert("Preencha todos os campos!");

        return;
    }


    const novaTarefa = {

        materia: materia,
        atividade: atividade,
        concluida: false

    };


    await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(novaTarefa)

    });


    campoMateria.value = "";
    campoAtividade.value = "";

    campoMateria.focus();


    await carregarTarefas();

});


// ================================
// ATUALIZAR TAREFA
// ================================

async function atualizarTarefa(tarefa) {

    const tarefaAtualizada = {

        materia: tarefa.materia,
        atividade: tarefa.atividade,
        concluida: !tarefa.concluida

    };


    await fetch(`${API_URL}/${tarefa.id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(tarefaAtualizada)

    });


    await carregarTarefas();
}


// ================================
// EXCLUIR TAREFA
// ================================

async function excluirTarefa(id) {

    await fetch(`${API_URL}/${id}`, {

        method: "DELETE"

    });


    await carregarTarefas();
}


// ================================
// INICIAR O PLANNER
// ================================

carregarTarefas();