import { useState } from "react";
import "./App.css";

function App() {
  const [cep, setCep] = useState("");
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  async function buscarCEP() {
    setLoading(true);
    setErro(null);
    setDados(null);

    try {
      const cepLimpo = cep.replace(/\D/g, "");

      if (cepLimpo.length !== 8) {
        throw new Error("CEP inválido");
      }

      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) {
        throw new Error("CEP não encontrado");
      }

      setDados(data);
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

function ClearIput() {
  setCep('')
  setDados(null)
  setErro(null)
}

  return (
    <>
      <header>
        <h1>Aplicação de consultas de CEP</h1>
      </header>
      <div className="ContainerALL">
      <div className="container">
        <h1>Busca de CEP</h1>
        <div className="info">
          <strong>Conceito:</strong> Cliente (navegador) solicita dados (CEP) de
          um servidor atraves de requisições HTTP
        </div>
        <div className="AreaInput">
        <input
          type="text"
          placeholder="00000-000"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
        <button className="Bnt-Clear"  onClick={ClearIput}><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/debian/debian-original.svg" alt="" height='20px'/></button>
        </div>

        <button className="Bnt-Busca" onClick={buscarCEP} disabled={loading}>
          {loading ? "Carregando..." : "Buscar Dados CEP"}
        </button>

        <div className="resultado">
          {loading && <em>Carregando dados...</em>}

          {erro && (
            <>
              <h3>ERROR:</h3>
              <p className="Error">{erro}</p>
            </>
          )}
          {dados && !loading && (
            <>
              <h3>Dados recebidos</h3>
              <p>
                <strong>Rua:</strong>
                {dados.logradouro}
              </p>
              <p>
                <strong>Bairo:</strong>
                {dados.bairro}
              </p>
              <p>
                <strong>Cidade:</strong>
                {dados.localidade}
              </p>
              <p>
                <strong>Estado:</strong>
                {dados.uf}
              </p>
            </>
          )}

          {!dados && !loading && !erro && (
            <em>Clique no botão para fazer uma requisição...</em>
          )}
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
