import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.getByText(/Contact Form/i)
    expect(header).toBeDefined()
    expect(header).toBeTruthy()
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const firstName = 'Zan'
    const firstNameInput = screen.getByLabelText(/First Name/i)
    userEvent.type(firstNameInput, firstName)
    const error = await screen.getByTestId('error')
    expect(error).toHaveTextContent('Error: firstName must have at least 5 characters.')
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const submit = screen.getByRole('button')
    userEvent.click(submit)
    const error = screen.queryAllByTestId('error')
    expect(error[0]).toHaveTextContent('Error: firstName must have at least 5 characters')
    expect(error[1]).toHaveTextContent('Error: lastName is a required field.')
    expect(error[2]).toHaveTextContent('Error: email must be a valid email address.')
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />) 
    const firstName = 'Unknown'
    const firstNameInput = screen.getByLabelText(/First Name/i)
    const lastName = 'HarryBob'
    const lastNameInput = screen.getByLabelText(/Last Name/i)
    const submit = screen.getByRole('button')
    userEvent.type(firstNameInput, firstName)
    userEvent.type(lastNameInput, lastName)
    userEvent.click(submit)
    const error = screen.getByTestId('error')
    expect(error).toHaveTextContent('Error: email must be a valid email address.')
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const firstName = 'Unknown'
    const firstNameInput = screen.getByLabelText(/First Name/i)
    const lastName = 'HarryBob'
    const lastNameInput = screen.getByLabelText(/Last Name/i)
    const email = 'unknownharrybob'
    const emailInput = screen.getByLabelText(/Email/i)
    const submit = screen.getByRole('button')
    userEvent.type(firstNameInput, firstName)
    userEvent.type(lastNameInput, lastName)
    userEvent.type(emailInput, email)
    userEvent.click(submit)
    const error = screen.getByTestId('error')
    expect(error).toHaveTextContent('Error: email must be a valid email address.')
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const firstName = 'Unknown'
    const firstNameInput = screen.getByLabelText(/First Name/i)
    const email = 'unknown@harrybob.com'
    const emailInput = screen.getByLabelText(/Email/i)
    const submit = screen.getByRole('button')
    userEvent.type(firstNameInput, firstName)
    userEvent.type(emailInput, email)
    userEvent.click(submit)
    const error = screen.getByTestId('error')
    expect(error).toHaveTextContent('Error: lastName is a required field.')
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstName = 'Unknown'
  const firstNameInput = screen.getByLabelText(/First Name/i)
  const lastName = 'HarryBob'
  const lastNameInput = screen.getByLabelText(/Last Name/i)
  const email = 'unknown@harrybob.com'
  const emailInput = screen.getByLabelText(/Email/i)
  const submit = screen.getByRole('button')
  userEvent.type(firstNameInput, firstName)
  userEvent.type(lastNameInput, lastName)
  userEvent.type(emailInput, email)
  userEvent.click(submit)
  const firstNameDisplay = screen.getByTestId('firstnameDisplay')
  const lastNameDisplay = screen.getByTestId('lastnameDisplay')
  const emailDisplay = screen.getByTestId('emailDisplay')
  const messageDisplay = await screen.queryByTestId('messageDisplay')
  expect(firstNameDisplay).toHaveTextContent(firstName)
  expect(lastNameDisplay).toHaveTextContent(lastName)
  expect(emailDisplay).toHaveTextContent(email)
  expect(messageDisplay).not.toBeInTheDocument()
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const firstName = 'Unknown'
    const firstNameInput = screen.getByLabelText(/First Name/i)
    const lastName = 'HarryBob'
    const lastNameInput = screen.getByLabelText(/Last Name/i)
    const email = 'unknown@harrybob.com'
    const emailInput = screen.getByLabelText(/Email/i)
    const message = 'I love you!'
    const messageInput = screen.getByLabelText(/Message/i)
    const submit = screen.getByRole('button')
    userEvent.type(firstNameInput, firstName)
    userEvent.type(lastNameInput, lastName)
    userEvent.type(emailInput, email)
    userEvent.type(messageInput, message)
    userEvent.click(submit)
    const firstNameDisplay = screen.getByTestId('firstnameDisplay')
    const lastNameDisplay = screen.getByTestId('lastnameDisplay')
    const emailDisplay = screen.getByTestId('emailDisplay')
    const messageDisplay = screen.getByTestId('messageDisplay')
    expect(firstNameDisplay).toHaveTextContent(firstName)
    expect(lastNameDisplay).toHaveTextContent(lastName)
    expect(emailDisplay).toHaveTextContent(email)
    expect(messageDisplay).toHaveTextContent(message)
});