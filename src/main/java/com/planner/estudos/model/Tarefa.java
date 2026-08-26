package com.planner.estudos.model;

public class Tarefa {

    private Long id;
    private String materia;
    private String atividade;
    private boolean concluida;


    // Construtor vazio
    public Tarefa() {
    }


    // Construtor com todas as informações
    public Tarefa(Long id, String materia, String atividade, boolean concluida) {
        this.id = id;
        this.materia = materia;
        this.atividade = atividade;
        this.concluida = concluida;
    }


    // GETTERS

    public Long getId() {
        return id;
    }

    public String getMateria() {
        return materia;
    }

    public String getAtividade() {
        return atividade;
    }

    public boolean isConcluida() {
        return concluida;
    }


    // SETTERS

    public void setId(Long id) {
        this.id = id;
    }

    public void setMateria(String materia) {
        this.materia = materia;
    }

    public void setAtividade(String atividade) {
        this.atividade = atividade;
    }

    public void setConcluida(boolean concluida) {
        this.concluida = concluida;
    }
}