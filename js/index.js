function Modal () {

    let titulo = document.getElementById('modal_titulo') 
    let classeTitulo = document.getElementById('modal_tituloDiv')
    let descricao = document.getElementById('modal_desc')
    let footer = document.getElementById('footer')

    titulo.innerHTML = 'Oq deseja fazer ?'
    classeTitulo.className  = 'modal-header text-primary'
    descricao.innerHTML = 'Selecione a operação que deseja fazer'

    //Criação do botão Inserir consulta
    let button = document.createElement('button')
    button.setAttribute('id', 'buttonInserir')
    
    button.className = 'btn btn-outline-primary'
    button.innerHTML = 'Inserir Despesas'
        
    footer.appendChild(button)
    
    //Criação do botão consulta
    let button2 = document.createElement('button')
    button2.setAttribute('id', 'buttonDespesa')

    button2.className = 'btn btn-outline-warning'
    button2.innerHTML = 'Ver consultas'

    footer.appendChild(button2)


    // Função Modal Dinamico
    $('#footer').on('click', '#buttonInserir', function(){
        window.location.href = 'inserirDespesa.html'
    });
        
    $('#footer').on('click', '#buttonDespesa', function(){
        window.location.href = 'consulta.html'
    });
        
        
    $('#modalInicial').modal('show')
}

function Clean () {
    const btn1 = document.getElementById('buttonDespesa') 
    const btn2 = document.getElementById('buttonInserir')

    btn1.remove()
    btn2.remove()

    console.log('Reset')
}