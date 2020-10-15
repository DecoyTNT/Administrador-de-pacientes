import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Formulario from './../../components/Formulario';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

describe('Pruebas en <Formulario />', () => {
    // const wrapper = render(<Formulario />);
    // wrapper.debug();
    const crearCita = jest.fn();

    test('Debe mostrar correctamente el componente', () => {
        render(<Formulario
            crearCita={crearCita}
        />);

        // const { getByText } = render(<Formulario />);
        // expect(wrapper.getByText('Crear Cita')).toBeInTheDocument();
        expect(screen.getByText('Crear Cita')).toBeInTheDocument();
        expect(screen.getByTestId('titulo').tagName).toBe('H2');

        expect(screen.getByTestId('titulo').textContent).toBe('Crear Cita');

        expect(screen.getByTestId('btn-submit').tagName).toBe('BUTTON');
    });

    test('Debe de validar el formulario', () => {
        render(<Formulario
            crearCita={crearCita}
        />);
        // Click en el boton de submit
        const btnSubmit = screen.getByTestId('btn-submit');
        fireEvent.click(btnSubmit);

        // Revisar por la alerta
        expect(screen.getByTestId('alerta')).toBeInTheDocument();
        expect(screen.getByTestId('alerta').textContent).toBe('Todos los campos son obligatorios');
    });

    test('Debe de ejecutar el metodo crearCita', () => {
        render(<Formulario
            crearCita={crearCita}
        />);
        fireEvent.change(screen.getByTestId('mascota'), {
            target: {
                value: 'Hook'
            }
        });
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

        // Revisar que se llame el metodo crearCita
        expect(crearCita).toHaveBeenCalled();
        expect(crearCita).toHaveBeenCalledTimes(1);
    });

});