class NegociacaoService {
  obterNegociacoesDaSemana(cb) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'negociacoes/semana')

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        //Se requisição concluída e resposta pronta (pode ser tb resposta de erro)
        if (xhr.status == 200) {
          //código que indica que a operação foi realizada com sucesso
          const negociacoes = JSON.parse(xhr.responseText).map(
            (objeto) =>
              new Negociacao(
                new Date(objeto.data),
                objeto.quantidade,
                objeto.valor
              )
          )

          cb(null, negociacoes)
        } else {
          console.log(xhr.responseText)
          cb('Não foi possível obter as negociações da semana.', null)
        }
      }
    }
    xhr.send() //executa a requisição configurada
  }
}

//Ao invés do NegociacaoController chamar obterNegociacoesDaSemana passando como parâmetro instância de mensagem e de NegociacaoController. Ele passa uma função de Callback, implementada no NegociacaoController, onde eu tenho acesso às instâncias. Em caso de erro, a função Callback envia como parâmetro: (1) o erro e (2)null. Em caso de sucesso envia como parâmetro (1)null e (2)dados resultantes da operação.
