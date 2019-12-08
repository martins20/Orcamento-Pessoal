class Despesa {
    constructor (ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano,
        this.mes = mes,
        this.dia = dia,
        this.tipo = tipo,
        this.descricao = descricao,
        this.valor = valor
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
            dia.value = ''
            dia.className = 'form-control border-danger text-danger'
            dia.style.color = 'red'
            return false
        }

        
        //Valida se o campo "Valor" é somente numeros
        let Input = document.getElementById('valor')    

        Money()

        if (isNaN(moeda)) {
            Input.value = ''
            Input.className = 'form-control border-danger text-danger'
            Input.style.color = 'red'
            return false
        }
        
        
        dia.className = 'form-control'
        dia.style.color = ''
        Input.className = 'form-control'
        Input.style.color = ''
        return true
    }
    
}

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

        const dataButton = document.getElementById('databtn')
        const tipoButton = document.getElementById('tipobtn')
        const descricaoButton = document.getElementById('descricaobtn')
        const valorButton = document.getElementById('valorbtn')

        if (dataButton && tipoButton && descricaoButton && valorButton) {
            RemoveEditButton()
        }

        let Titulo = document.getElementById('modal_titulo') 
        let ClasseTitulo = document.getElementById('modal_tituloDiv')
        let Descricao = document.getElementById('modal_desc')
        let Footer = document.getElementById('footer')
        
        Titulo.innerHTML = '.: ATENÇÃO :.'
        ClasseTitulo.className = 'modal-header text-success'
        Descricao.innerHTML = 'Você esta prestes a excluir esta despesa, tem certeza ?'

        //Criação do Botão 
        let button2 = document.createElement('button')
        button2.setAttribute('id', 'false')

        button2.className = 'btn btn-outline-success'
        button2.innerHTML = 'Sim'
        button2.onclick = (() => {
            localStorage.removeItem(id)
            window.location.reload()
        })
        
        Footer.appendChild(button2)

        let button = document.createElement('button')
        button.setAttribute('id', 'true')

        button.className = 'btn btn-outline-danger'
        button.innerHTML = 'Não'
        button.onclick = (() => {
            window.location.reload()
        })
        Footer.appendChild(button)  
        
        
        $('#modalRegistraDespesa').modal('show')
        
    }
    
    editarDispesa(a) {

        const buttonResponse = document.getElementById('true')
        const buttonResponse2 = document.getElementById('false')
        
        if (buttonResponse && buttonResponse2) {
            buttonResponse.remove()
            buttonResponse2.remove()
        }

        this.recuperarTodosRegistros()
        const array = JSON.parse(localStorage.getItem(a))

        let Titulo = document.getElementById('modal_titulo') 
        let ClasseTitulo = document.getElementById('modal_tituloDiv')
        let Descricao = document.getElementById('modal_desc')
        let Footer = document.getElementById('footer')
        
        Titulo.innerHTML = '.: EDIÇÃO :.'
        ClasseTitulo.className = 'modal-header text-warning'
        Descricao.innerHTML = 'Por favor, selecione oq deseja editar:'

        //Criação do Botão Data 
        let button1 = document.createElement('button')
        button1.setAttribute('id', 'databtn')

        button1.className = 'btn btn-outline-warning'
        button1.innerHTML = 'Data'
        button1.onclick = (() => {
            console.log(`Data: ${array.dia}/${array.mes}/${array.ano}`)
        })
        
        Footer.appendChild(button1)

        //Criação do Botão Tipo
        let button2 = document.createElement('button')
        button2.setAttribute('id', 'tipobtn')

        button2.className = 'btn btn-outline-warning'
        button2.innerHTML = 'Tipo'
        button2.onclick = (() => {

            switch (parseInt(array.tipo)) {
                case 1:
                    array.tipo = 'Alimentação'
                    break
                    
                case 2:
                    array.tipo = 'Educação'
                    break
                    
                case 3:
                    array.tipo = 'Lazer'
                    break
                        
                case 4:
                    array.tipo = 'Saúde'
                    break
                        
                case 5:
                    array.tipo = 'Transporte'
                    break
                    
                            
                default:
                    break
                }

            console.log(`Tipo: ${array.tipo}`)
        })
        
        Footer.appendChild(button2) 
        
        //Criação do Botão descricao 
        let button3 = document.createElement('button')
        button3.setAttribute('id', 'descricaobtn')

        button3.className = 'btn btn-outline-warning'
        button3.innerHTML = 'descricao'
        button3.onclick = (() => {
            console.log(`Descrição: ${array.descricao}`)
        })
        
        Footer.appendChild(button3)
        
        //Criação do Botão valor 
        let button4 = document.createElement('button')
        button4.setAttribute('id', 'valorbtn')

        button4.className = 'btn btn-outline-warning'
        button4.innerHTML = 'valor'
        button4.onclick = (() => {
            console.log(`Valor: ${array.valor}`)
        })
        
        Footer.appendChild(button4)

        $('#modalRegistraDespesa').modal('show')


        console.log(array)
    }

}

let bd = new Bd ()

function criarDespesa() {

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

        //Função do BotãoVoltar
        $('#footer').on('click', '#buttonVoltar', function(){
            $('#modalRegistraDespesa').modal('hide')
        });

        //Criação do Botão Consultar
        let button2 = document.createElement('button')
        button2.setAttribute('id', 'buttonConsultar')

        button2.innerHTML = 'Consultar'
        button2.className = 'btn btn-outline-warning'

        Footer.appendChild(button2)

        //Função do BotãoConsultar
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
        let linha = listaDespesas.insertRow()
        let data = linha.insertCell(0)
        let tipo = linha.insertCell(1)
        let descricao = linha.insertCell(2)
        let valor = linha.insertCell(3)

        //substituindo a virgula por ponto e transformando o d.valor em float
        let concertar = d.valor.replace(',', '.')
    
        d.valor = concertar
        d.valor = parseFloat(d.valor)
        
        
        //Criado a linha (tr)
        linha.setAttribute('id', `Despesa${d.id}`)
        
        //criar as colunas (td)
        data.innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        data.className = 'data'
        
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
        tipo.innerHTML = d.tipo
        tipo.className = 'tipo'

        descricao.innerHTML = d.descricao
        descricao.className = 'descricao'

        valor.innerHTML = d.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        valor.className = 'valor'
        
        

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

        btn.onfocus = (() => {
            const btn1 = document.getElementById('false')
            const btn2 = document.getElementById('true')
            
            btn1.remove()
            btn2.remove()
        })
        
        linha.insertCell(4).append(btn)

        // Criar o botão de Edição
        let btn2 = document.createElement('button')
        btn2.className = 'btn btn-danger ml-1'
        btn2.innerHTML = '<i class="fas fa-edit"></i>'
        btn2.id = `id_despesa_${d.id}`

        btn2.onclick = function () {
            bd.editarDispesa(d.id)
        }

        btn2.onfocus = function () {
            RemoveEditButton()
        }

        
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
    valor = parseFloat(valor)
    
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

    switch (Mes) {
        case 1:
            diasMes = 31
            break;
        case 2:
            if (Ano % 4 == 0 && Ano % 100 != 0 || Ano % 400 == 0) {
                diasMes = 29
            } else {
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
    return moeda
}

function RemoveEditButton () {
    
    const dataButton = document.getElementById('databtn')
    const tipoButton = document.getElementById('tipobtn')
    const descricaoButton = document.getElementById('descricaobtn')
    const valorButton = document.getElementById('valorbtn')
    dataButton.remove()
    tipoButton.remove()
    descricaoButton.remove()
    valorButton.remove()
    

}