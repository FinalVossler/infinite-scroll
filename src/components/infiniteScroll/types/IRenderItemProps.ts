import ITheme from "../../../types/ITheme";

export interface IRenderItemProps<T> {
  item: T;
  index: number;
  theme: ITheme;
}
