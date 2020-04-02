import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
import PropTypes from 'prop-types';

function App() {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (!citasIniciales) {
        citasIniciales = [];
    }

    // Arreglo de citas
    const [citas, guardarCitas] = useState(citasIniciales);

    // Función que agrega una nueva cita
    const crearCita = cita => {
        guardarCitas([...citas, cita]);
    };

    // useEffect para realizar ciertas operaciones cuando el state cambia
    useEffect(() => {
        localStorage.setItem('citas', JSON.stringify(citas));
    }, [citas]);

    // Función que elimina una cita
    const eliminarCita = id => {
        const nuevasCitas = citas.filter(cita => cita.id !== id);
        guardarCitas(nuevasCitas);
    };

    return (
        <Fragment>
            <h1>Administrador de pacientes</h1>

            <div className="container">
                <div className="row">
                    <div className="one-half column">
                        <Formulario crearCita={crearCita} />
                    </div>
                    <div className="one-half column">
                        {citas.length !== 0 ? <h2>Administra tus citas</h2> : <h2>Agrega una nueva cita</h2>}

                        {citas.map(cita => (
                            <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
};

export default App;
