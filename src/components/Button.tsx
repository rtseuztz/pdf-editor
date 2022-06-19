import { MouseEventHandler} from "react";

type props = {
    text: string, 
    onClick: MouseEventHandler, 
    style?: Object
}
const Button: React.FC<props> = ({
    text, onClick, style
}) => {
    let buttonStyle = {
        color: "#3131FF",
        width: "20%",
        cursor: "click"
    }
    if (style !== undefined) {
        console.log(style);
        buttonStyle = {
            ...buttonStyle,
            ...style
        }
    }
    return (
        <button data-testid="button" onClick={onClick} style={buttonStyle}>
            {text}
        </button>
    )
}
export default Button