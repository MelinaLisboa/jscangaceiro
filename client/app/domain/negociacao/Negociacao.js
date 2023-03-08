class Negociacao {
  constructor(_data, _quantidade, _valor) {
    //IMUTABILIDADE

    //Opção 1 de como criar
    Object.assign(this, {
      _quantidade,
      _valor,
    })
    this._data = new Date(_data.getTime()) //poderia estar dentro do assign, coloquei aqui para legibilidade

    //Opção 2 de como criar
    //criando uma nova data, uma NOVA referência
    // this._data = new Date(data.getTime()) //data
    // this._quantidade = quantidade
    // this._valor = valor
    Object.freeze(this)
  }

  get volume() {
    return this._quantidade * this._valor
  }

  get data() {
    return new Date(this._data.getTime()) //this._data
  }

  get quantidade() {
    return this._quantidade
  }

  get valor() {
    return this._valor
  }
}
