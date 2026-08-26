package com.planner.estudos.controller;

import com.planner.estudos.model.Tarefa;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tarefas")

public class TarefaController {

    private final List<Tarefa> tarefas = new ArrayList<>();
    private Long proximoId = 1L;


    @GetMapping
    public List<Tarefa> listarTarefas() {

        return tarefas;

    }
    @PostMapping
    public Tarefa criarTarefa(@RequestBody Tarefa novaTarefa) {

        novaTarefa.setId(proximoId++);

        tarefas.add(novaTarefa);

        return novaTarefa;
    }
    @PutMapping("/{id}")
    public Tarefa atualizarTarefa(
            @PathVariable Long id,
            @RequestBody Tarefa tarefaAtualizada
    ) {

        for (Tarefa tarefa : tarefas) {

            if (tarefa.getId().equals(id)) {

                tarefa.setMateria(tarefaAtualizada.getMateria());
                tarefa.setAtividade(tarefaAtualizada.getAtividade());
                tarefa.setConcluida(tarefaAtualizada.isConcluida());

                return tarefa;
            }
        }

        return null;
    }
    @DeleteMapping("/{id}")
    public void excluirTarefa(@PathVariable Long id) {

        tarefas.removeIf(tarefa ->
                tarefa.getId().equals(id)
        );
    }
}
