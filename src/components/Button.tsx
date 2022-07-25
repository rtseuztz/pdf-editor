import React, { ChangeEventHandler, MouseEventHandler} from "react";

type props = {
    text: string, 
    onClick?: MouseEventHandler, 
    onChange?: ChangeEventHandler<HTMLInputElement>
    style?: Object,
    type?: string,
    id? :string,
}
const Button: React.FC<props> = ({
    text, onClick, onChange, style, type, id
}) => {
    let buttonStyle = {
        color: "#3131FF",
        width: "20%",
        cursor: "pointer"
    }
    type = type || "button";
    if (style !== undefined) {
        console.log(style);
        buttonStyle = {
            ...buttonStyle,
            ...style
        }
    }
    let html;
    switch (type) {
        case "file":
            html = <input 
                id={id}
                data-testid="button" 
                type={type}
                value={undefined} 
                onChange={onChange} 
                style={buttonStyle} 
                accept="application/pdf"
                />;
            break;
        default:
            html = <input 
                id={id}
                data-testid="button" 
                type={type} 
                onClick={onClick} 
                style={buttonStyle} 
                value={text}
                />
    }
    return (
        <>{html}</>
    )
}
export default Button