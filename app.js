class Despesa {
    constructor (ano, mes, dia, tipo, descricao, valor) {
        ano,
        mes,
        dia,
        tipo,
        descricao,
        valor
    }

    validarDados(mes) {

        //Validar se todos os campos estão preenchidos
        for (let i in this) {
            if (this[i] == undefined ||this[i] == ''  ||this[i] == null) {
                return false
            }
        }
        
        
        //Validar se o campo de dia é valido para o mês
        let dia = document.getElementById('dia')

        Change()
        if (this.dia <=0 || this.dia > diasMes) {
            console.log('Função do dia Disparada')
            dia.value = ''
            dia.className = 'form-control border-danger text-danger'
            dia.style.color = 'red'
            return false
        }

        
        //Valida se o campo "Valor" é somente numeros
        let Input = document.getElementById('valor')    

        Money()

        if (isNaN(moeda)) {
            console.log('Função do dinheiro Disparada')
            Input.value = ''
            Input.className = 'form-control border-danger text-danger'
            Input.style.color = 'red'
            return false
        }
        
        
        dia.className = 'form-control'
        dia.style.color = ''
        Input.className = 'form-control'
        Input.style.color = ''
        return true && this.valor
    }
    
}

console.log('console do valor : ',  this.valor)

// Class Bd serve para o Tratamento do Array, Gravar, Recuperar, Editar e Remover
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
                console.log('Não achei')
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
        console.log("Função Pesquisar")

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

        let Titulo = document.getElementById('modal_titulo') 
        let ClasseTitulo = document.getElementById('modal_tituloDiv')
        let Descricao = document.getElementById('modal_desc')
        let Footer = document.getElementById('footer')

        localStorage.removeItem(id)
        
        Titulo.innerHTML = 'Sucesso !'
        ClasseTitulo.className = 'modal-header text-success'
        Descricao.innerHTML = 'Despesa removida com sucesso !'

        //Criação do Botão Voltar
        let button = document.createElement('button')
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

let bd = new Bd ()

function criarDespesa() {
    console.log('Função Criar despesa')

    let Titulo = document.getElementById('modal_titulo') 
    let ClasseTitulo = document.getElementById('modal_tituloDiv')
    let Descricao = document.getElementById('modal_desc')
    let Footer = document.getElementById('footer')

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
        
        Titulo.innerHTML = 'Registro inserido com Sucesso !'
        ClasseTitulo.className = 'modal-header text-success'
        Descricao.innerHTML = 'Despesa cadastrada com sucesso :)'

        //Criação do Botão Voltar
        let button = document.createElement('button')
        button.setAttribute('id', 'buttonVoltar')

        button.innerHTML = 'Voltar'
        button.className = 'btn btn-outline-success'

        Footer.appendChild(button)
        
        //Função do Botão
        $('#footer').on('click', '#buttonVoltar', function(){
            $('#modalRegistraDespesa').modal('hide')
        });

        //Criação do Botão Consultar
        let button2 = document.createElement('button')
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
        let button = document.createElement('button')
        button.setAttribute('id', 'buttonVoltar')

        button.innerHTML = 'Voltar e corrigir !'
        button.className = 'btn btn-outline-danger'

        Footer.appendChild(button)

        //Função do Botão
        $('#footer').on('click', '#buttonVoltar', function(){
            $('#modalRegistraDespesa').modal('hide')
        });

        //Criação do Botão Consultar
        let button2 = document.createElement('button')
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
        d.valor.replace(',', '.')
        linha.insertCell(3).innerHTML = parseFloat(d.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

        //Criar o botão de Exclusão

        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        
        //Função de Remover
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
    valor = valor.replace(',', '.')
    let despesa = new Despesa (ano, mes, dia, tipo, descricao, valor)
    
    let despesas = bd.pesquisar(despesa)

    this.carregarListaDespesas(despesas , true)
    
    

}

function activeSession(algo) {
//selecionar array da orgigem do butao
    arrays = bd.recuperarTodosRegistros()
    
}

function CleanBtn () {
    let btn1 = document.getElementById('buttonVoltar') 
    let btn2 = document.getElementById('buttonConsultar')

    btn1.remove()
    btn2.remove()
}

//Função de Dias dos Meses
function Change () {
     let Valor = new Despesa (
        ano.value,
        mes.value,
    )

    let Ano = parseInt(Valor.ano)
    let Mes = parseInt(Valor.mes)
    console.log(`Mes: ${Valor.mes}`)
    console.log(`Ano: ${Valor.ano}`)

    switch (Mes) {
        case 1:
            diasMes = 31
            break;
        case 2:
            if (Ano % 4 == 0 && Ano % 100 != 0 || Ano % 400 == 0) {

                console.log('Ano Bissexto')
                diasMes = 29
            } else {

                console.log('Ano Normal')
                diasMes = 28
            }
            break
        case 3:
            diasMes = 31
            break
        case 4:
            diasMes = 30
            break
        case 5:
            diasMes = 31
            break
        case 6:
            diasMes = 30
            break
        case 7:
            diasMes = 31
            break
        case 8:
            diasMes = 31
            break
        case 9:
            diasMes = 30
            break
        case 10:
            diasMes = 31
            break
        case 11:
            diasMes = 30
            break
        case 12:
            diasMes = 31
            break
    
        default:
            break
    }
    console.log(`Dias: ${diasMes} dias.`)
    return diasMes
}

function Money () {
    let Moeda = new Despesa (
        valor.value
    )
    //Recupera o valor do input
    let input = document.getElementById('valor').value
    let cvrs = input.replace(',', '.')
    
    //Altera o Valor do Object
    moeda = Moeda.valor
    moeda = parseFloat(cvrs)

    console.log(moeda)
    return moeda
}