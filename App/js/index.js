function btnStart () { 

    let titulo = document.getElementById('modal_titulo') 
    let classeTitulo = document.getElementById('modal_tituloDiv')
    let descricao = document.getElementById('modal_desc')
    let btnModal = document.getElementById('button')
    let btnConsulta = document.getElementById('buttonConsulta')

    titulo.innerHTML = 'Oq deseja fazer ?'
    classeTitulo.className  = 'modal-header text-primary'
    descricao.innerHTML = 'Selecione a operação que deseja fazer'
    btnModal.className = 'btn btn-outline-primary'
    btnModal.innerHTML = 'inserir despesas'
    btnConsulta.innerHTML = 'Consultar despesas'
    btnConsulta.className = 'btn btn-outline-warning'

    $('#modalInicial').modal('show')
}

function despesa () {
    window.location.href = './../App/index.html'
}