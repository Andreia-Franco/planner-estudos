const API_URL = "/tarefas";

const campoMateria = document.getElementById("materia");
const campoAtividade = document.getElementById("atividade");
const botaoAdicionar = document.getElementById("botaoAdicionar");
const listaTarefas = document.getElementById("listaTarefas");


// ================================
// BUSCAR TAREFAS
// ================================

async function carregarTarefas() {

    try {

        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error(
                `Erro ao buscar tarefas: ${resposta.status}`
            );
        }

        const tarefas = await resposta.json();

        renderizarTarefas(tarefas);

    } catch (erro) {

        console.error("Erro ao carregar tarefas:", erro);

    }
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


    try {

        const resposta = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(novaTarefa)

        });


        if (!resposta.ok) {

            throw new Error(
                `Erro ao adicionar tarefa: ${resposta.status}`
            );

        }


        campoMateria.value = "";
        campoAtividade.value = "";

        campoMateria.focus();


        await carregarTarefas();


    } catch (erro) {

        console.error("Erro ao adicionar tarefa:", erro);

        alert(
            "Não foi possível adicionar a tarefa. Veja o console para mais detalhes."
        );

    }

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


    try {

        const resposta = await fetch(
            `${API_URL}/${tarefa.id}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(tarefaAtualizada)

            }
        );


        if (!resposta.ok) {

            throw new Error(
                `Erro ao atualizar tarefa: ${resposta.status}`
            );

        }


        await carregarTarefas();


    } catch (erro) {

        console.error("Erro ao atualizar tarefa:", erro);

        alert("Não foi possível atualizar a tarefa.");

    }
}


// ================================
// EXCLUIR TAREFA
// ================================

async function excluirTarefa(id) {

    try {

        const resposta = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        if (!resposta.ok) {

            throw new Error(
                `Erro ao excluir tarefa: ${resposta.status}`
            );

        }


        await carregarTarefas();


    } catch (erro) {

        console.error("Erro ao excluir tarefa:", erro);

        alert("Não foi possível excluir a tarefa.");

    }
}


// ================================
// INICIAR O PLANNER
// ================================

carregarTarefas();