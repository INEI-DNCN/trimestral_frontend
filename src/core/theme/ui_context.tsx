// ui_context.tsx
import type { AlertColor } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { StateMessage } from "../../app/components/enum/enum";
import type { OnDialogParams } from "../../app/components/interface/router_interface";
import WrapperDialog from "../../app/components/wrapper_dialog";
import { CustomSnackbar } from "../snackbar/custom_snackbar";
import type { AppDispatch } from "../store/store";

type UIContextType = {
  dispatch: AppDispatch;
  navigate: NavigateFunction;
  onSnackbar: (message: string, alertColor?: AlertColor) => void;
  onDialog: (params: OnDialogParams) => void;
  handleCloseDialog: () => void;
};

const UIContext = createContext<UIContextType | null>(null);

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI debe usarse dentro de UIProvider");
  return ctx;
};

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbarStado, setSnackbarStado] = useState<StateMessage | any>(StateMessage.success);
  const [openDialog, setOpenDialog] = useState(false);
  const [childrenDialog, setChildrenDialog] = useState<any>({});
  const [maxWidthDialog, setMaxWidthDialog] = useState<'sm' | 'md' | 'lg' | 'xs' | 'xl'>('sm');
  const [titleDialog, setTitleDialog] = useState("");

  const handleCloseDialog = () => setOpenDialog(false);
  const handleCloseSnackbar = () => setOpen(false);

  const onSnackbar = (msg: string, alertColor: AlertColor = "success") => {
    setMessage(msg);
    setSnackbarStado(alertColor);
    setOpen(true);
  };

  const onDialog = ({ maxWidth, children, title }: OnDialogParams) => {
    setMaxWidthDialog(maxWidth);
    setChildrenDialog(children);
    setTitleDialog(title);
    setOpenDialog(true);
  };

  return (
    <UIContext.Provider value={{ navigate, dispatch, onSnackbar, onDialog, handleCloseDialog }}>
      {children}

      {/* Snackbar */}
      <CustomSnackbar
        open={open}
        onClose={handleCloseSnackbar}
        message={message}
        severity={snackbarStado}
      />

      {/* Dialog */}
      <WrapperDialog
        title={titleDialog}
        maxWidth={maxWidthDialog}
        open={openDialog}
        handleClose={handleCloseDialog}
        children={childrenDialog ?? <div />}
      />
    </UIContext.Provider>
  );
};
