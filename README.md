# FICHA V3 FINAL - Proyecto completo listo para Vercel

## Incluye:
- App con registro obligatorio +18
- Frase exacta T&C: "Acepto que compro fichas virtuales SIN VALOR REAL, no canjeables por dinero, solo para entretenimiento +18. No es apuesta con dinero real. Compra final, sin reembolsos. Juego responsable"
- Tienda con Mercado Pago (/api/crear-pago.js)
- Páginas legales en /public:
  - privacidad.html
  - terminos.html
  - aviso.html

## Deploy:
1. Sube este repo a GitHub
2. Vercel -> New Project -> Import
3. Env var: MP_TOKEN = APP_USR-xxxx
4. Deploy

URLs tras deploy:
- / -> app principal
- /privacidad.html -> Política
- /terminos.html -> Términos
- /aviso.html -> Aviso corto

Para Google Play usa:
https://tudominio.vercel.app/privacidad.html como link de privacidad.

Soporte: soporte@ficha.app
