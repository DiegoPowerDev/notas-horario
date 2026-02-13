let activeTimer: NodeJS.Timeout | null = null;

export const clearExistingTimer = () => {
  if (activeTimer) {
    clearTimeout(activeTimer);
    activeTimer = null;
    console.log("⏱️ Temporizador previo limpiado");
  }
};

export const setActiveTimer = (timeoutId: NodeJS.Timeout) => {
  activeTimer = timeoutId;
};

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.error("Este navegador no soporta notificaciones de escritorio");
    return;
  }

  if (Notification.permission !== "granted") {
    await Notification.requestPermission();
  }
};

export const sendNativeNotification = (title: string, body: string) => {
  if (Notification.permission === "granted") {
    const notification = new Notification(title, {
      body,
      icon: "/vercel.svg", // Asegúrate de tener un icono en public
      silent: false, // Para que use el sonido del sistema
    });

    notification.onclick = () => {
      window.focus(); // Al hacer clic, regresa al navegador
    };
  }
};
