function Modal () {
    const buttonDespesa = document.getElementById('buttonDespesa')
    const buttonInserir = document.getElementById('buttonInserir')
    
    if (buttonDespesa && buttonDespesa) {
        buttonDespesa.remove()
        buttonInserir.remove()
    }

    const titulo = document.getElementById('modal_titulo') 
    const classeTitulo = document.getElementById('modal_tituloDiv')
    const descricao = document.getElementById('modal_desc')
    const footer = document.getElementById('footer')

    titulo.innerHTML = '.:. Iniciar .:.'
    classeTitulo.className  = 'modal-header text-primary'
    descricao.innerHTML = 'Selecione a operação que deseja fazer'

    //Criação do botão Inserir consulta
    const button = document.createElement('button')
    button.setAttribute('id', 'buttonInserir')
    
    button.className = 'btn btn-outline-primary'
    button.innerHTML = 'Inserir Despesas'
        
    footer.appendChild(button)
    
    //Criação do botão consulta
    const button2 = document.createElement('button')
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