import Button from "@material-ui/core/Button";
import { blue } from "@material-ui/core/colors";
import type { Theme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import type { ButtonHTMLAttributes } from "react";

const ColorButton = withStyles((theme: Theme) => {
  return {
    root: {
      color: theme.palette.getContrastText(blue[500]),
      backgroundColor: blue[500],
      "&:hover": {
        backgroundColor: blue[700],
      },
    },
    label: {
      color: "white",
    },
  };
})(Button);

// buttonタグの型情報を受け取る
export const BlueButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <ColorButton variant="contained" color="primary" onClick={props.onClick}>
      {props.children}
    </ColorButton>
  );
};
