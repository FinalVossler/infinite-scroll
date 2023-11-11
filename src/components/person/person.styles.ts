import { createUseStyles } from "react-jss";
import ITheme from "../../types/ITheme";

const useStyles = createUseStyles((theme: ITheme) => ({
  personContainer: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid " + theme.darkerPrimary,
    padding: 10,
    fontSize: 20,
    margin: 5,
    borderRadius: 5,
    backgroundColor: theme.darkerPrimary,
    color: "white",
  },
}));

export default useStyles;
