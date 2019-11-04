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
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getNextId() {
        let nextId = localStorage.getItem('id')
        
        return parseInt(nextId) + 1
    }

    gravar(x) {
        let id = this.getNextId()
        localStorage.setItem(id, JSON.stringify(x))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {

        let despesas = []

        let id = localStorage.getItem('id')

        //Recuperar todas as espesas cadastradas em localStorage
        for (let i = 1; i <= id; i++) {

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
        
        let despesasFiltradas = []


        despesasFiltradas = this.recuperarTodosRegistros ()
        
        console.log(despesa)

        console.log(despesasFiltradas)

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

        localStorage.removeItem(id)
        
        document.getElementById('modal_titulo').innerHTML = 'Sucesso !'
        document.getElementById('modal_tituloDiv').className = 'modal-header text-success'
        document.getElementById('modal_desc').innerHTML = 'Despesa removida com sucesso !'
        document.getElementById('button').className = 'btn btn-success'
        document.getElementById('button').innerHTML = 'Voltar'
        document.getElementById('button').onclick = (() => { window.location.reload() })
        document.getElementById('closer').onclick = (() => { window.location.reload() })
        document.getElementById('conteudoModal').onclose = (() => { window.location.reload() })

    
    
        $('#modalRegistraDespesa').modal('show')
    }

    editarDispesa(id) {

        localStorage.getItem(id)

        document.getElementById('modal_titulo2').innerHTML = 'Edição !'
        document.getElementById('modal_tituloDiv2').className = 'modal-header text-warning'
        document.getElementById('modal_desc2').innerHTML = `selecione o valor que deseja editar :`

        document.getElementById('button1').className = 'btn btn-warning '
        document.getElementById('button2').className = 'btn btn-warning'
        document.getElementById('button3').className = 'btn btn-warning'
        document.getElementById('button4').className = 'btn btn-warning'
        document.getElementById('button5').className = 'btn btn-warning'
        document.getElementById('button6').className = 'btn btn-warning'

        document.getElementById('button1').innerHTML = 'Ano'
        document.getElementById('button2').innerHTML = 'Mes'
        document.getElementById('button3').innerHTML = 'Dia'
        document.getElementById('button4').innerHTML = 'Tipo'
        document.getElementById('button5').innerHTML = 'Valor'
        document.getElementById('button6').innerHTML = 'Descrição'

        $('#modalEditaDespesa').modal('show')

    }

}

let bd = new Bd ()

function createOutlay() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if (despesa.validarDados()) {
        
        document.getElementById('modal_tituloDiv').className = 'modal-header text-success'
        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com Sucesso !'
        document.getElementById('modal_desc').innerHTML = 'Despesa cadastrada com sucesso :)'
        document.getElementById('button').className = 'btn btn-outline-success'
        document.getElementById('button').innerHTML = 'Voltar'
        document.getElementById('buttonConsulta').innerHTML = 'Consultar'
        document.getElementById('buttonConsulta').className = 'btn btn-outline-warning'
        bd.gravar(despesa)

        $('#modalRegistraDespesa').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    } else {

        document.getElementById('modal_titulo').innerHTML = 'Erro'
        document.getElementById('modal_tituloDiv').className = 'modal-header text-danger'
        document.getElementById('modal_desc').innerHTML = 'Verifique se todos os campos estão preenchidos corretamente.'
        document.getElementById('button').className = 'btn btn-outline-danger'
        document.getElementById('button').innerHTML = 'Voltar e corrigir !'
        document.getElementById('buttonConsulta').innerHTML = 'Consultar despesas'
        document.getElementById('buttonConsulta').className = 'btn btn-outline-warning'


        $('#modalRegistraDespesa').modal('show')
    }
}

function carregarListaDespesas (despesas = [], filtro = false) {

    if (despesas.length === 0  && filtro == false) {
        despesas = bd.recuperarTodosRegistros()
    }

    //Selecionando o elemento tbody da Table
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    //Percorrer o Array despesas, listando cada despesas de forma dinâmica
    despesas.forEach(function (d) {
        

        //Criado a linha (tr)
        let linha = listaDespesas.insertRow()
        
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

        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function () {
            //remover a despesa
            let id = this.id.replace('id_despesa_', '') 

            bd.remover(id)
            
            
        }
        
        linha.insertCell(4).append(btn)

        // Criar o botão de Edição
        let btn2 = document.createElement('button')
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
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa (ano, mes, dia, tipo, descricao, valor)
    
    let despesas = bd.pesquisar(despesa)

    this.carregarListaDespesas(despesas , true)
    
    

}

function activeSession(algo) {
//selecionar array da orgigem do butao
    arrays = bd.recuperarTodosRegistros()
    
}

function verConsulta () {
    window.location.href = './consulta.html'
}