import { createUseStyles } from "react-jss";
import ITheme from "../../types/ITheme";

const useStyles = createUseStyles((theme: ITheme) => ({
  infiniteScrollContainer: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    border: "1px solid black",
    padding: 10,
    boxSizing: "border-box",
    borderRadius: 5,
    backgroundColor: theme.contentBackgroundColor,
  },
  itemContainer: {},
  loadingContainer: {
    display: "flex",
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default useStyles;
