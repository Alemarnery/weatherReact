import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Clima from "./Components/Clima";
import Error from "./Components/Error";
import Formulario from "./Components/Formulario";

function App() {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarApi = async () => {
      const API_KEY = "0e4cf236883808a47de47fad68a24a54";
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_KEY}`;

      const api = await fetch(url);
      const weatherReponse = await api.json();
      guardarResultado(weatherReponse);
      guardarConsultar(false);

      if (resultado.cod === "404") {
        guardarError(true);
      } else {
        guardarError(false);
      }
    };

    if (consultar) {
      consultarApi();
    }
  }, [ciudad, pais, consultar]);

  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <>
      <Header titulo="Clima" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m5 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m5 s12">{componente}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
