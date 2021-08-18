import Button from "@material-ui/core/Button";
import { blue } from "@material-ui/core/colors";
import type { Theme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { AddSvg } from "src/components/icons/svgs/AddSvg";

const ColorButton = withStyles((theme: Theme) => {
  return {
    root: {
      color: theme.palette.getContrastText(blue[500]),
      backgroundColor: blue[500],
      "&:hover": {
        backgroundColor: blue[700],
      },
      borderRadius: "50%",
      width: "80px",
      height: "80px",
      position: "absolute",
      top: "-64px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "0px",
    },
    label: {
      color: "white",
    },
  };
})(Button);

export const CreatePlanButton: React.VFC = () => {
  return (
    <div className="relative">
      <ColorButton variant="contained" color="primary">
        <Link href="/plans">
          <a className="flex flex-col items-center justify-center">
            <AddSvg className="h-10 w-10 text-white" />
            <span className="block text-1xs text-white">プラン作成</span>
          </a>
        </Link>
      </ColorButton>
    </div>
  );
};
