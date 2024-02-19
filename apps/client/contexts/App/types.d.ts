interface IAppContext {
  header: string;
  setHeader: (header: string) => void;
  displayHeader: boolean;
  setDisplayHeader: (value: boolean) => void;
}
