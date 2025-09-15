import React from "react";
import type { ReactNode } from "react";
import CookieConsent from "react-cookie-consent";

interface RootProps {
  children: ReactNode;
}

export default function Root({ children }: RootProps): JSX.Element {
  return (
    <>
      {children}
      <CookieConsent
        location="bottom"
        buttonText="Aceptar"
        declineButtonText="Rechazar"
        enableDeclineButton
        disableStyles={true}
        cookieName="filament_es_cookie_consent"
        containerClasses="cookie-container"
        buttonClasses="cookie-accept"
        declineButtonClasses="cookie-decline"
        expires={365}
      >
        🍪 Usamos cookies para mejorar la experiencia y analizar el tráfico.{" "}
        <a href="/privacy">Política de Privacidad</a>
      </CookieConsent>
    </>
  );
}