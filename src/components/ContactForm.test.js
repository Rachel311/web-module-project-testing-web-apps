import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';

test('renders without errors', ()=>{
    render (<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.getByText("Contact Form");
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const nameError = screen.getByLabelText("First Name*");
    userEvent.type(nameError, "San");

    const errors = await screen.findAllByText(/error/i);
    expect(errors.length).toEqual(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const button = screen.getByRole("button");
    userEvent.click(button);

    const errors = await screen.findAllByText(/error/i);
    expect(errors.length).toEqual(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render (<ContactForm/>)
    const firstname = screen.getByLabelText('First Name*')
    userEvent.type(firstname, "Rachel")
    const lastname = screen.getByLabelText("Last Name*")
    userEvent.type(lastname, "Van")
    const button = screen.getByRole("button")
    userEvent.click(button)
    const errors = await screen.findByTestId(/error/i)
    expect(errors).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const email = screen.getByLabelText("Email*");
    userEvent.type(email, "T");

    const errors = await screen.findAllByText(/error/i);
    expect(errors.length).toEqual(1);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render (<ContactForm/>)  
    const button = screen.getByRole("button")
    userEvent.click(button)
    const errors = screen.queryByText(/lastName is a required field/i)
    await waitFor( ( ) => {
        expect(errors).toBeInTheDocument()
    }) 
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render (<ContactForm/>) 
    const firstInput = screen.getByLabelText("First Name*");
    userEvent.type(firstInput,"Ricky");

    const secondInput = screen.getByLabelText("Last Name*");
    userEvent.type(secondInput,"Garcia");

    const thirdInput = screen.getByLabelText("Email*");
    userEvent.type(thirdInput, "ricky555@gmail.com");

    const button = screen.getByRole("button");
    userEvent.click(button);

    const fnSubmmitted = await screen.findByTestId("firstnameDisplay");
    const lnSubmitted = await screen.findByTestId("lastnameDisplay");
    const eSubmitted = await screen.findByTestId("emailDisplay");
    const bSubmmited  = await screen.queryByTestId("messageDisplay");

    expect(fnSubmmitted).toBeInTheDocument();
    expect(lnSubmitted).toBeInTheDocument();
    expect(eSubmitted).toBeInTheDocument();
    expect(bSubmmited).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
});