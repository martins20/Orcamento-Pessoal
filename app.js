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
        const dia = document.getElementById('dia')

        mesValue()
        if (this.dia <=0 || this.dia > diasMes) {
            dia.value = ''
            dia.className = 'form-control border-danger text-danger'
            dia.style.color = 'red'
            return false
        }

        
        //Valida se o campo "Valor" é somente numeros
        const Input = document.getElementById('valor')    

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
        for (let i = 1; i <= id; i++) {

            //recuperar despesa
            const despesa = JSON.parse(localStorage.getItem(i))
            
            
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

        const dataButton = document.getElementById('databtn')
        const tipoButton = document.getElementById('tipobtn')
        const descricaoButton = document.getElementById('descricaobtn')
        const valorButton = document.getElementById('valorbtn')

        if (dataButton && tipoButton && descricaoButton && valorButton) {
            RemoveEditButton()
        }

        const Titulo = document.getElementById('modal_titulo') 
        const ClasseTitulo = document.getElementById('modal_tituloDiv')
        const Descricao = document.getElementById('modal_desc')
        const Footer = document.getElementById('footer')
        
        Titulo.innerHTML = '.: ATENÇÃO :.'
        ClasseTitulo.className = 'modal-header text-success'
        Descricao.innerHTML = 'Você esta prestes a excluir esta despesa, tem certeza ?'

        //Criação do Botão 
        const button2 = document.createElement('button')
        button2.setAttribute('id', 'true')

        button2.className = 'btn btn-outline-success'
        button2.innerHTML = 'Sim'
        button2.onclick = (() => {
            localStorage.removeItem(id)
            window.location.reload()
        })
        
        Footer.appendChild(button2)

        const button = document.createElement('button')
        button.setAttribute('id', 'false')

        button.className = 'btn btn-outline-danger'
        button.innerHTML = 'Não'
        button.onclick = (() => {
            $('#footer').on('click', '#false', function(){
                $('#modalRegistraDespesa').modal('hide')
            });
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

        const Titulo = document.getElementById('modal_titulo') 
        const ClasseTitulo = document.getElementById('modal_tituloDiv')
        const Descricao = document.getElementById('modal_desc')
        const Footer = document.getElementById('footer')
        
        Titulo.innerHTML = '.: EDIÇÃO :.'
        ClasseTitulo.className = 'modal-header text-warning'
        Descricao.innerHTML = 'Por favor, selecione oq deseja editar:'

        //Criação do Botão Data 
        const button1 = document.createElement('button')
        button1.setAttribute('id', 'databtn')

        button1.className = 'btn btn-outline-warning'
        button1.innerHTML = 'Data'
        button1.onclick = (() => {
            console.log(`Data: ${array.dia}/${array.mes}/${array.ano}`)
            RemoveEditButton()
            editingModal('Data', `${array.dia}/${array.mes}/${array.ano}`)
        })
        
        Footer.appendChild(button1)

        //Criação do Botão Tipo
        const button2 = document.createElement('button')
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
            RemoveEditButton()
            editingModal('Tipo', array.tipo)
        })
        
        Footer.appendChild(button2) 
        
        //Criação do Botão descricao 
        const button3 = document.createElement('button')
        button3.setAttribute('id', 'descricaobtn')

        button3.className = 'btn btn-outline-warning'
        button3.innerHTML = 'descricao'
        button3.onclick = (() => {
            console.log(`Descrição: ${array.descricao}`)
            RemoveEditButton()
            editingModal('Descrição', array.descricao)
        })
        
        Footer.appendChild(button3)
        
        //Criação do Botão valor 
        const button4 = document.createElement('button')
        button4.setAttribute('id', 'valorbtn')

        button4.className = 'btn btn-outline-warning'
        button4.innerHTML = 'valor'
        button4.onclick = (() => {
            console.log(`Valor: ${array.valor}`)
            RemoveEditButton()
            editingModal('Valor', array.valor)
        })
        
        Footer.appendChild(button4)

        $('#modalRegistraDespesa').modal('show')

        console.log(array)
    }

}

let bd = new Bd ()

function criarDespesa() {

    const btn1 = document.getElementById('buttonVoltar') 
    const btn2 = document.getElementById('buttonConsultar')

    if (btn1 && btn2){
    btn1.remove()
    btn2.remove()
    }

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

        //Função do BotãoVoltar
        $('#footer').on('click', '#buttonVoltar', function(){
            $('#modalRegistraDespesa').modal('hide')
        });

        //Criação do Botão Consultar
        const button2 = document.createElement('button')
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
    const listaDespesas = document.getElementById('listaDespesas')

    listaDespesas.innerHTML = ''
    
    //Percorrer o Array despesas, listando cada despesas de forma dinâmica
    despesas.forEach(function (d) {
        const linha = listaDespesas.insertRow()
        const data = linha.insertCell(0)
        const tipo = linha.insertCell(1)
        const descricao = linha.insertCell(2)
        const valor = linha.insertCell(3)

        //substituindo a virgula por ponto e transformando o d.valor em float
        const concertar = d.valor.replace(',', '.')
    
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

        const btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        
        //Função de Remover
        btn.onclick = function () {
            //remover a despesa
            const id = this.id.replace('id_despesa_', '') 

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
        const btn2 = document.createElement('button')
        btn2.className = 'btn btn-danger ml-1'
        btn2.innerHTML = '<i class="fas fa-edit"></i>'
        btn2.id = `id_despesa_${d.id}`

        btn2.onclick = (() => {
            bd.editarDispesa(d.id)
        })

        btn2.onfocus = (() => {
            RemoveEditButton()
        })

        
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

    valor = parseFloat(valor)
    const despesas = bd.pesquisar(despesa)
    

    this.carregarListaDespesas(despesas , true)
}

//Função de Dias dos Meses
function mesValue () {
     let Valor = new Despesa (
        ano.value,
        mes.value,
    )

    const Ano = parseInt(Valor.ano)
    const Mes = parseInt(Valor.mes)

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
    const input = document.getElementById('valor').value
    const cvrs = input.replace(',', '.')
    
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

function editingModal (nome, valor) {

    const Titulo = document.getElementById('modal_titulo') 
    const ClasseTitulo = document.getElementById('modal_tituloDiv')
    const Descricao = document.getElementById('modal_desc')
    const Footer = document.getElementById('footer')

    
    Titulo.innerHTML = `.: Editando de | ${valor} | para: :.`
    ClasseTitulo.className = 'modal-header text-success'

    
    
    switch (nome) {
        case 'Data':
            Descricao.innerHTML = ''

            Descricao.className = 'd-flex modal-body '

            //Criação das Caixas
            const caixaSelecaoDia = document.createElement('input')
            caixaSelecaoDia.className = 'form-control'
            caixaSelecaoDia.setAttribute('id', 'dia')
            caixaSelecaoDia.setAttribute('placeholder', 'Dia')
        
            Descricao.appendChild(caixaSelecaoDia)

            const caixaSelecaoMes = document.createElement('select')
            caixaSelecaoMes.className = 'form-control'
            caixaSelecaoMes.setAttribute('id', 'mes')

            const mes = document.createElement('option')

            mes.innerHTML = 'Mes'
            mes.value = ''

            caixaSelecaoMes.appendChild(mes)

            const janeiro = document.createElement('option')

            janeiro.innerHTML = 'Janeiro'
            janeiro.value = 1

            caixaSelecaoMes.appendChild(janeiro)

            const fevereiro = document.createElement('option')

            fevereiro.innerHTML = 'Fevereiro'
            fevereiro.value = 2

            caixaSelecaoMes.appendChild(fevereiro)

            const marco = document.createElement('option')

            marco.innerHTML = 'Marco'
            marco.value = 3

            caixaSelecaoMes.appendChild(marco)

            const abril = document.createElement('option')

            abril.innerHTML = 'Abril'
            abril.value = 4

            caixaSelecaoMes.appendChild(abril)

            const maio = document.createElement('option')

            maio.innerHTML = 'Maio'
            maio.value = 5

            caixaSelecaoMes.appendChild(maio)

            const junho = document.createElement('option')

            junho.innerHTML = 'Junho'
            junho.value = 6

            caixaSelecaoMes.appendChild(junho)

            const julho = document.createElement('option')

            julho.innerHTML = 'Julho'
            julho.value = 7

            caixaSelecaoMes.appendChild(julho)

            const agosto = document.createElement('option')

            agosto.innerHTML = 'Agosto'
            agosto.value = 8

            caixaSelecaoMes.appendChild(agosto)

            const setembro = document.createElement('option')

            setembro.innerHTML = 'Setembro'
            setembro.value = 9

            caixaSelecaoMes.appendChild(setembro)

            const outubro = document.createElement('option')

            outubro.innerHTML = 'Outubro'
            outubro.value = 10

            caixaSelecaoMes.appendChild(outubro)

            const novembro = document.createElement('option')

            novembro.innerHTML = 'Novembro'
            novembro.value = 11

            caixaSelecaoMes.appendChild(novembro)

            const dezembro = document.createElement('option')

            dezembro.innerHTML = 'Dezembro'
            dezembro.value = 12

            caixaSelecaoMes.appendChild(dezembro)
            
            
        
            Descricao.appendChild(caixaSelecaoMes)
            
            const caixaSelecaoAno = document.createElement('input')
            caixaSelecaoAno.className = 'form-control'
            caixaSelecaoAno.setAttribute('id', 'ano')
            caixaSelecaoAno.setAttribute('placeholder', `Ano`)
        
            Descricao.appendChild(caixaSelecaoAno)
            break

        case 'Tipo':

            Descricao.innerHTML = ''

            Descricao.className = 'd-flex modal-body '

            const caixaSelecaoTipo = document.createElement('select')
            caixaSelecaoTipo.className = 'form-control'
            caixaSelecaoTipo.setAttribute('id', 'tipo')
            
            Descricao.appendChild(caixaSelecaoTipo)

            //Options dos tipos

            const selecaoTipo = document.createElement('option')
            const alimentacao = document.createElement('option')
            const educacao = document.createElement('option')
            const lazer = document.createElement('option')
            const saude = document.createElement('option')
            const transporte = document.createElement('option')

            selecaoTipo.innerHTML = 'Tipo'
            selecaoTipo.value = ''
            
            caixaSelecaoTipo.appendChild(selecaoTipo)

            alimentacao.innerHTML = 'Alimentação'
            alimentacao.value = 1
            
            caixaSelecaoTipo.appendChild(alimentacao)
            
            educacao.innerHTML = 'Educação'
            educacao.value = 2
            
            caixaSelecaoTipo.appendChild(educacao)

            lazer.innerHTML = 'Lazer'
            lazer.value = 3
            
            caixaSelecaoTipo.appendChild(lazer)

            saude.innerHTML = 'Saúde'
            saude.value = 4
            
            caixaSelecaoTipo.appendChild(saude)

            transporte.innerHTML = 'Transporte'
            transporte.value = 5
            
            caixaSelecaoTipo.appendChild(transporte)
            break

        case 'Descrição':
            Descricao.innerHTML = ''

            Descricao.className = ' modal-body '

            const inputDesc = document.createElement('input')
            inputDesc.setAttribute('id',  'descricao')
            inputDesc.innerHTML = 'Descrição'
            inputDesc.className = 'form-control'

            Descricao.appendChild(inputDesc)
            break

        case 'Valor':

            Descricao.innerHTML = ''
            Descricao.className = ' modal-body '

            const inputValor = document.createElement('input')
            inputValor.className = 'form-control'

            Descricao.appendChild(inputValor)
            break
        default:
            Descricao.className = ''
            Descricao.innerHTML = ''
            break
   }



    //Criação dos Botões 
    const button2 = document.createElement('button')
    button2.setAttribute('id', 'false')

    button2.className = 'btn btn-outline-success'
    button2.innerHTML = 'Editar'
    button2.onclick = (() => {
        //localStorage.removeItem(id)
        window.location.reload()
    })
    
    Footer.appendChild(button2)

    const button = document.createElement('button')
    button.setAttribute('id', 'true')

    button.className = 'btn btn-outline-danger'
    button.innerHTML = 'Cancelar'
    button.onclick = (() => {
        $('#footer').on('click', '#true', function(){
            $('#modalRegistraDespesa').modal('hide')
        });
    })
    Footer.appendChild(button)  
    
    
    $('#modalRegistraDespesa').modal('show')
}