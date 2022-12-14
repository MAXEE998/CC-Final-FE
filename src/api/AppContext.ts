import React from "react";
import { AlertColor } from "@mui/material";

export interface IAppContext {
  setBackDropStatus?: (status: React.SetStateAction<boolean>) => void;
  openSnackBar?: (message: string, severity: AlertColor) => void;
  logout?: (showMessage?: boolean, isPatient?: boolean) => void;
  navigate?: (path: string) => void;
  user?: any;
}

export default React.createContext<IAppContext>({});
