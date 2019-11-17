class Despesa {
    constructor (ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao 
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined ||this[i] == ''  ||this[i] == null) {
                return false
            }
        }
        return true
    }

}

class Bd {

    constructor() {
        const id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getNextId() {
        const nextId = localStorage.getItem('id')
        
        return parseInt(nextId) + 1
    }

    gravar(x) {
        const id = this.getNextId()
        localStorage.setItem(id, JSON.stringify(x))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {

        const despesas = []

        const id = localStorage.getItem('id')

        //Recuperar todas as espesas cadastradas em localStorage
        for (const i = 1; i <= id; i++) {

            //recuperar despesa
            let despesa = JSON.parse(localStorage.getItem(i))
            
            
            //verificar se existe a possibilidade de haver indices removidos/Retidados 
            if (despesa === null) {
                continue
            }

            despesa.id = i
            
            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar (despesa) {
        
        const despesasFiltradas = []


        despesasFiltradas = this.recuperarTodosRegistros ()

        //ano
        if (despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }        

        //mes
        if (despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        //dia 
        if (despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        //tipo
        if (despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        //descricao
        if (despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        //valor
        if (despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }
        
        return despesasFiltradas
    }

    remover(id) {

        const Titulo = document.getElementById('modal_titulo') 
        const ClasseTitulo = document.getElementById('modal_tituloDiv')
        const Descricao = document.getElementById('modal_desc')
        const Footer = document.getElementById('footer')

        //localStorage.removeItem(id)
        
        Titulo.innerHTML = 'Sucesso !'
        ClasseTitulo.className = 'modal-header text-success'
        Descricao.innerHTML = 'Despesa removida com sucesso !'

        //Criação do Botão Voltar
        const button = document.createElement('button')
        button.setAttribute('id', 'Excluir')

        button.className = 'btn btn-outline-success'
        button.innerHTML = 'Voltar'
        button.onclick = (() => {
            window.location.reload()
        })
        
        Footer.appendChild(button)    
    
        $('#modalRegistraDespesa').modal('show')
        
    }

    editarDispesa() {

        //Condição para mudar o Array

    }

}

const bd = new Bd ()

function createOutlay() {

    const Titulo = document.getElementById('modal_titulo') 
    const ClasseTitulo = document.getElementById('modal_tituloDiv')
    const Descricao = document.getElementById('modal_desc')
    const Footer = document.getElementById('footer')

    const ano = document.getElementById('ano')
    const mes = document.getElementById('mes')
    const dia = document.getElementById('dia')
    const tipo = document.getElementById('tipo')
    const descricao = document.getElementById('descricao')
    const valor = document.getElementById('valor')

    const despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if (despesa.validarDados()) {
        
        Titulo.innerHTML = 'Registro inserido com Sucesso !'
        ClasseTitulo.className = 'modal-header text-success'
        Descricao.innerHTML = 'Despesa cadastrada com sucesso :)'

        //Criação do Botão Voltar
        const button = document.createElement('button')
        button.setAttribute('id', 'buttonVoltar')

        button.innerHTML = 'Voltar'
        button.className = 'btn btn-outline-success'

        Footer.appendChild(button)
        
        //Função do Botão
        $('#footer').on('click', '#buttonVoltar', function(){
            $('#modalRegistraDespesa').modal('hide')
        });

        //Criação do Botão Consultar
        const button2 = document.createElement('button')
        button2.setAttribute('id', 'buttonConsultar')

        button2.innerHTML = 'Consultar'
        button2.className = 'btn btn-outline-warning'

        Footer.appendChild(button2)
        
        bd.gravar(despesa)

        //Função do Botão
        $('#footer').on('click', '#buttonConsultar', function(){
            window.location.href = 'consulta.html'
        });

        $('#modalRegistraDespesa').modal('show')

    //Apaga os Valores dos Campos
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else {

        Titulo.innerHTML = 'Erro'
        ClasseTitulo.className = 'modal-header text-danger'
        Descricao.innerHTML = 'Verifique se todos os campos estão preenchidos corretamente.'


        //Criação do Botão Voltar
        const button = document.createElement('button')
        button.setAttribute('id', 'buttonVoltar')

        button.innerHTML = 'Voltar e corrigir !'
        button.className = 'btn btn-outline-danger'

        Footer.appendChild(button)

        //Função do Botão
        $('#footer').on('click', '#buttonVoltar', function(){
            $('#modalRegistraDespesa').modal('hide')
        });

        //Criação do Botão Consultar
        const button2 = document.createElement('button')
        button2.setAttribute('id', 'buttonConsultar')

        button2.innerHTML = 'Consultar'
        button2.className = 'btn btn-outline-warning'

        Footer.appendChild(button2)

        //Função do Botão
        $('#footer').on('click', '#buttonConsultar', function(){
            window.location.href = 'consulta.html'
        });

        $('#modalRegistraDespesa').modal('show')
    }
}

function carregarListaDespesas (despesas = [], filtro = false) {

    if (despesas.length === 0  && filtro == false) {
        despesas = bd.recuperarTodosRegistros()
    }

    //Selecionando o elemento tbody da Table
    const listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    //Percorrer o Array despesas, listando cada despesas de forma dinâmica
    despesas.forEach(function (d) {
        

        //Criado a linha (tr)
        const linha = listaDespesas.insertRow()
        
        //criar as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        
        //ajustar tipo
        switch (parseInt(d.tipo)) {
            case 1:
                d.tipo = 'Alimentação'
                break
                
                case 2:
                    d.tipo = 'Educação'
                break
                
            case 3:
                d.tipo = 'Lazer'
                break
                
            case 4:
                d.tipo = 'Saúde'
                break
                
                case 5:
                    d.tipo = 'Transporte'
                    break
            
                    
                    default:
                        break
                    }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        //Criar o botão de Exclusão

        const btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function () {
            //remover a despesa
            const id = this.id.replace('id_despesa_', '') 

            bd.remover(id)
            
            
        }
        
        linha.insertCell(4).append(btn)

        // Criar o botão de Edição
        const btn2 = document.createElement('button')
        btn2.className = 'btn btn-danger ml-1'
        btn2.innerHTML = '<i class="fas fa-edit"></i>'
        btn2.id = `id_despesa_${d.id}`
        btn2.onclick = (editar => {
            bd.editarDispesa(d.id)
            console.log(d.id)
        } )
        
        linha.insertCell(5).append(btn2)
    })
   

}

function pesquisarDespesa () {
    const ano = document.getElementById('ano').value
    const mes = document.getElementById('mes').value
    const dia = document.getElementById('dia').value
    const tipo = document.getElementById('tipo').value
    const descricao = document.getElementById('descricao').value
    const valor = document.getElementById('valor').value

    const despesa = new Despesa (ano, mes, dia, tipo, descricao, valor)
    
    const despesas = bd.pesquisar(despesa)

    this.carregarListaDespesas(despesas , true)
    
    

}

function activeSession(algo) {
//selecionar array da orgigem do butao
    arrays = bd.recuperarTodosRegistros()
    
}

function CleanBtn () {
    const btn1 = document.getElementById('buttonVoltar') 
    const btn2 = document.getElementById('buttonConsultar')

    btn1.remove()
    btn2.remove()
}