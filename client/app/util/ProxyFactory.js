class ProxyFactory {
    static create(objeto, props, armadilha) {
        
        return new Proxy(objeto, {
            get(target, prop, receiver) {
              if (_ehFuncao(target[prop]) && props.includes(prop)) {

                return function () {
                  console.log(`${prop} disparou a armadilha.`)
                  target[prop].apply(target, arguments) //target: é a instância real de Negociacoes
                  armadilha(target) //executa a armadilha que recebe o objeto original
                }
                
              } else {
                return target[prop]
              }
            },

            set(target, prop, value, receiver) {
                
                const updated = Reflect.set(target, prop, value)

                if(props.includes(prop)) {
                    armadilha(target)
                }

                return updated
            }
          })

    }

    static _ehFuncao(fn) {
        return typeof (fn) == typeof (Function)
    }
}