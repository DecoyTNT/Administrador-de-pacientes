import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from './../App';

describe('Pruebas en <App />', () => {

    test('Funciona correctamente', () => {
        render(<App />);
        expect(screen.getByText('Administrador de pacientes')).toBeInTheDocument();
        expect(screen.getByTestId('nombre-app').textContent).toBe('Administrador de pacientes');
        expect(screen.getByTestId('nombre-app').tagName).toBe('H1');

        expect(screen.getByText('Crear Cita')).toBeInTheDocument();
        expect(screen.getByText('Agrega una nueva cita')).toBeInTheDocument();
    });

    test('Debe de crear una cita', () => {
        render(<App />);
        userEvent.type(screen.getByTestId('mascota'), 'Hook');
        userEvent.type(screen.getByTestId('propietario'), 'Jorge');
        userEvent.type(screen.getByTestId('fecha'), '2020-10-14');
        userEvent.type(screen.getByTestId('hora'), '11:30');
        userEvent.type(screen.getByTestId('sintomas'), 'Vomita cada que come');

        // Click en el boton de submit
        const btnSubmit = screen.getByTestId('btn-submit');
        userEvent.click(btnSubmit);

        // Revisar que no exista la alerta
        const alerta = screen.queryByTestId('alerta');
        expect(alerta).not.toBeInTheDocument();

        // Revisar por título dinamuco
        expect(screen.getByTestId('titulo-dinamico').textContent).toBe('Administra tus citas');
        expect(screen.getByTestId('titulo-dinamico').textContent).not.toBe('Agrega una nueva cita');
    });

    test('Verificar las citas en el DOM', async () => {
        render(<App />);
        const citas = await screen.findAllByTestId('cita');

        expect(citas).toMatchSnapshot();

        expect(screen.getByTestId('btn-eliminar').tagName).toBe('BUTTON');
        expect(screen.getByTestId('btn-eliminar')).toBeInTheDocument();

        // Verificar una cita
        expect(screen.getByText('Hook')).toBeInTheDocument();
    });

    test('Elimina una cita', () => {
        render(<App />);

        const btnEliminar = screen.getByTestId('btn-eliminar');
        expect(btnEliminar.tagName).toBe('BUTTON');
        expect(btnEliminar).toBeInTheDocument();

        // Simular el click
        userEvent.click(btnEliminar);

        // El boton ya no debe de estar
        expect(btnEliminar).not.toBeInTheDocument();

        // No debe de estar en el documento
        expect(screen.queryByText('Hook')).not.toBeInTheDocument();
        expect(screen.queryByTestId('cita')).not.toBeInTheDocument();
    });

})
