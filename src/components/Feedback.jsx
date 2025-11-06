import { useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_DURATION = 2800;
const EXIT_ANIMATION = 300;

export default function Feedback({ loading, error, success, duration = DEFAULT_DURATION }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  const { type, message, icon } = useMemo(() => {
    if (loading) return { type: "loading", message: "Carregando...", icon: "⏳" };
    if (error) return { type: "error", message: error, icon: "❌" };
    if (success) return { type: "success", message: success, icon: "✅" };
    return {};
  }, [loading, error, success]);

  const hideTimer = useRef(null);
  const unmountTimer = useRef(null);

  const clearTimers = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }

    if (unmountTimer.current) {
      clearTimeout(unmountTimer.current);
      unmountTimer.current = null;
    }
  };

  useEffect(() => {
    clearTimers();

    if (!type) {
      setExiting(false);
      setVisible(false);
      return;
    }

    setVisible(true);
    setExiting(false);

    if (type === "loading") {
      return;
    }

    hideTimer.current = setTimeout(() => {
      setExiting(true);
      unmountTimer.current = setTimeout(() => {
        setVisible(false);
        setExiting(false);
      }, EXIT_ANIMATION);
    }, duration);
    return clearTimers;
  }, [type, message, duration]);

  if (!visible) return null;

  const toneClass =
    type === "error" ? "toast--error" :
      type === "success" ? "toast--success" :
        "toast--loading";

  return (
    <div
      role="status"
      aria-live={type === "loading" ? "polite" : "assertive"}
      className={`toast ${toneClass} ${exiting ? "exit" : "enter"}`}>
      <span className="toast__icon" aria-hidden="true">{icon}</span>
      <span className="toast__message">{message}</span>
    </div>
  );
}   