class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document)

    this._inputData = $('#data')
    this._inputQuantidade = $('#quantidade')
    this._inputValor = $('#valor')

    this._negociacoes = new Bind(
      new Negociacoes(),
      new NegociacoesView('#negociacoes'),
      'adiciona',
      'esvazia'
    )

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView('#mensagemView'),
      'texto'
    )
  }

  adiciona(event) {
    try {
      event.preventDefault() //cancela a submissão do formulário
      this._negociacoes.adiciona(this._criaNegociacao())
      this._mensagem.texto = 'Negociação adicionada com sucesso.'
      this._limpaFormulario()
    } catch (err) {
      console.log(err)
      console.log(err.stack)
      if (err instanceof DataInvalidaException) {
        this._mensagem.texto = err.message
      } else {
        this._mensagem.texto =
          'Um erro inesperado aconteceu. Entre em contato com o suporte.'
      }
    }
  }

  apaga() {
    this._negociacoes.esvazia()
    this._mensagem.texto = 'Negociações apagadas com sucesso.'
  }

  _limpaFormulario() {
    this._inputData.value = ''
    this._inputQuantidade.value = 1
    this._inputValor.value = 0.0
    this._inputData.focus()
  }

  _criaNegociacao() {
    return new Negociacao(
      DateConverter.paraData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    )
  }

  importaNegociacoes() {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'negociacoes/semana')

    xhr.onreadystatechange = () => {
      //realizaremos configurações aqui
      if (xhr.readyState == 4) {
        //Se requisição concluída e resposta pronta (pode ser tb resposta de erro)
        if (xhr.status == 200) {//código que indica que a operação foi realizada com sucesso
          JSON
            .parse(xhr.responseText)
            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            .forEach(negociacao => this._negociacoes.adiciona(negociacao))
            
          this._mensagem.texto = 'Negociações importadas com sucesso.'
        } else {
          console.log(xhr.responseText)
          console.log('Não foi possível obter as negociações da semana.')
        }
      }
    }
    xhr.send() //executa a requisição configurada
  }
}

// let data = new Date(
//     ...this._inputData.value
//     .split('-')
//     .map((item, indice) => {
//         if(indice === 1){
//             return item - 1 //ajusta valor do mês (0-jan/11-dez)
//         }
//         return item
//     }))
