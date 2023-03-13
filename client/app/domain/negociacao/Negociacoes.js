class Negociacoes {
  constructor() {
    this._negociacoes = []
    Object.freeze(this) //Cogela o objeto, impedindo novas atribuições
  }

  get volumeTotal() {
    if (this._negociacoes.length > 0) {
      return this._negociacoes.reduce((acc, item) => {
        return acc + item.volume
      }, 0)
    } else {
      return 0
    }

    // let total = 0

    // for(let i = 0; i < this._negociacoes.length; i++){
    //   total += this._negociacoes[i].volume
    // }

    // return total
  }

  adiciona(negociacao) {
    this._negociacoes.push(negociacao)
  }

  paraArray() {
    //retorna uma nova referência criada com os itens de this._negociacoes
    return [].concat(this._negociacoes)
  }

  esvazia() {
    //this._negociacoes = [] após congelar o objeto, necessário alterar o esvazia
    this._negociacoes.length = 0
  }
}
