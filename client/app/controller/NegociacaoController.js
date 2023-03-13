class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document)

    this._inputData = $('#data')
    this._inputQuantidade = $('#quantidade')
    this._inputValor = $('#valor')

    const self = this

    //Agora é um Proxy!
    this._negociacoes = new Proxy(new Negociacoes(), {
      get(target, prop, receiver) {
        if (
          typeof target[prop] == typeof Function &&
          ['adiciona', 'esvazia'].includes(prop)
        ) {
          return function () {
            console.log(`${prop} disparou a armadilha.`)
            target[prop].apply(target, arguments) //target: é a instância real de Negociacoes
            self._negociacoesView.update(target)
          }
        } else {
          return target[prop]
        }
      },
    })

    this._negociacoesView = new NegociacoesView('#negociacoes')
    this._negociacoesView.update(this._negociacoes)

    this._mensagem = new Mensagem()
    this._mensagemView = new MensagemView('#mensagemView')
    this._mensagemView.update(this._mensagem)
  }
  adiciona(event) {
    //cancela a submissão do formulário
    event.preventDefault()
    this._negociacoes.adiciona(this._criaNegociacao())
    this._mensagem.texto = 'Negociação adicionada com sucesso.'
    // this._negociacoesView.update(this._negociacoes) //Substituído pelo update do Proxy
    this._mensagemView.update(this._mensagem)
    this._limpaFormulario()
  }

  apaga() {
    this._negociacoes.esvazia()
    //this._negociacoesView.update(this._negociacoes) //Substituído pelo update do Proxy
    this._mensagem.texto = 'Negociações apagadas com sucesso.'
    this._mensagemView.update(this._mensagem)
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
