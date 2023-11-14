import { createUseStyles } from "react-jss";
import ITheme from "../../types/ITheme";

const useStyles = createUseStyles((theme: ITheme) => ({
  infiniteScrollContainer: {
    overflow: "auto",
    border: "1px solid black",
    boxSizing: "border-box",
    borderRadius: 5,
    backgroundColor: theme.contentBackgroundColor,
  },
  itemContainer: {},
  totalContentContainer: {
    overflow: "hidden",
  },
  loadingContainer: {
    display: "flex",
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default useStyles;
