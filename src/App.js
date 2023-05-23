import './App.css';
import { useState } from 'react'

function App() {

  const [endereco, setEndereco] = useState({})

  function manipularEndereco(evento) {
    const cep = evento.target.value

    setEndereco({
      cep
    })

    if(cep && cep.length === 8){
      // obter o cep
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
          setEndereco(enderecoAntigo => {
            return {
              ...enderecoAntigo,
              rua: dados.logradouro,
              bairro: dados.bairro,
              cidade: dados.localidade,
              estado: dados.uf
            }
          })
        })
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Buscador de CEP</h1>
      </header>
      <section>
        <input className='campoCep' placeholder='Digite o CEP' onChange={manipularEndereco}></input>
        <ul className='lista'>
          <li>CEP: {endereco.cep}</li>
          <li>Rua: {endereco.rua}</li>
          <li>Bairro: {endereco.bairro}</li>
          <li>Cidade: {endereco.cidade}</li>
          <li>Estado: {endereco.estado}</li>
        </ul>
      </section>
    </div>
  );
}

export default App;
