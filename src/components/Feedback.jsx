import { useEffect, useMemo, useRef, useState } from "react";
import { Snackbar, Alert, Slide } from '@mui/material';

export default function Feedback({ loading, error, success, duration = 3000 }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ severity: "info", message: "" });
  
  useEffect(() => {
    if (loading) {
      setState({ severity: "info", message: "Carregando..." });
      setOpen(true);
      return;
    }  

    if (error) {
      setState({ severity: "error", message: error });
      setOpen(true);
      return;
    }

    if (success) {
      setState({ severity: "success", message: success });
      setOpen(true);
      return;
    }
    setOpen(false);
  }, [loading, error, success]);

  const autoHide = state.severity === "info" ? null :duration;

  return (
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={autoHide ?? undefined}
      anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
      slots={{ transition: Slide }}
      slotProps={{ transition: { direction: 'down' } }}
    >
      <Alert onClose={() => setOpen(false)} severity={state.severity} variant="filled" sx={{ width: '100%' }}>
        {state.message}
      </Alert>
    </Snackbar>
  );
}   