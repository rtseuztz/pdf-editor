import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import pdfjsLib from 'pdfjs-dist'
import { RenderParameters } from 'pdfjs-dist/types/src/display/api';
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/upload a pdf/i);
  expect(linkElement).toBeInTheDocument();
});

test('open a pdf with bytes using pdf js lib', () => {
  //todo: implement this with a local test pdf
});
test('connected to backend', async () => {
    const response = await fetch('http://localhost:3001/index.html');
    const body = response.json();
    expect(response.status === 200).toBeTruthy();
  })
