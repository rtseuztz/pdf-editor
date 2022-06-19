import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';
import $ from 'jquery'

test('renders a button with text', () => {
    let a = "a";
    let incremented = false;
    const increment = () => {
        a += "a"
        incremented = true;
    }

    const style = {
        border: "5px solid pink"
    }
    
    render(<Button text={a} onClick={increment} style={style}/>);
    const linkElement = screen.getByTestId("button")
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveStyle({
        border: "5px solid pink",
        color: "#3131FF",
        width: "20%",
    })
    expect(linkElement).toHaveTextContent(a);
    const button = $(document).find("button");
    expect(button).toBeDefined()
    button.trigger("click");
    expect(incremented).toBeTruthy();
});
