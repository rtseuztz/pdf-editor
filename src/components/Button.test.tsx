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
    render(<Button id="my_test_btn_id" text={a} onClick={increment} style={style}/>);
    const linkElement = screen.getByTestId("button")
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveStyle({
        border: "5px solid pink",
        color: "#3131FF",
        width: "20%",
    })
    expect(linkElement).toHaveValue(a);
    const button = $(document).find("input");
    expect(button).toBeDefined()
    button.trigger("click");
    expect(incremented).toBeTruthy();
    expect($(document).find("#my_test_btn_id")[0]).toBeTruthy()
});
