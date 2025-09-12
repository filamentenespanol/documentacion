# Guía de Contribución

¡Gracias por tu interés en colaborar en la traducción de **FilamentPHP al español**! 🎉  
Este proyecto es **comunitario y abierto**, así que cualquier aporte es bienvenido.

---

## 📌 Reglas básicas

- Mantén siempre un **tono respetuoso y constructivo**.
- Todas las contribuciones deben estar enfocadas en mejorar la **traducción y claridad** de la documentación.
- La documentación oficial está en inglés, cualquier duda técnica se valida con esa fuente.

---

## ✍️ Cómo contribuir

### 1. Reportar errores
- Si detectas traducciones incorrectas, faltas de ortografía o errores técnicos, abre un **[Issue](https://github.com/filamentenespanol/documentacion/issues)** con una descripción clara.

### 2. Mejorar traducciones
- Haz un **fork** del repositorio.
- Trabaja sobre una nueva **rama**:
  ```bash
  git checkout -b fix/traduccion-seccion-x
  ```
- Realiza los cambios y envía un **Pull Request**.

### 3. Consistencia de términos
- Consulta el archivo de **glosario (pendiente de completar)** antes de traducir términos técnicos.
- Ejemplo de términos fijos:
  - *Resource* → **Recurso**
  - *Form* → **Formulario**
  - *Table* → **Tabla**
  - *Widget* → **Widget** (se deja en inglés)
  - *Tenant* → **Arrendatario / Entidad** (según contexto)

### 4. Revisión de cambios
- Cada PR debe ser revisado por al menos **1 colaborador** antes de ser fusionado.
- La revisión incluye:
  - Legibilidad en español.
  - Consistencia con el glosario.
  - Que no se rompa la estructura de Markdown o el build de Docusaurus.

---

## 🛠️ Entorno de desarrollo

1. Clona el repo:
   ```bash
   git clone https://github.com/filamentenespanol/documentacion.git
   ```
2. Instala dependencias:
   ```bash
   pnpm install
   ```
3. Inicia el servidor local:
   ```bash
   pnpm start
   ```
4. Abre http://localhost:3000 en tu navegador.

---

## ✅ Buenas prácticas

- Usa **Markdown limpio** (sin HTML innecesario).
- Divide frases largas para mejorar la **legibilidad**.
- Nunca mezcles traducción con **opiniones personales**.
- Antes de enviar tu PR:
  - Revisa ortografía.
  - Verifica que la web compile sin errores (`pnpm build`).

---

## 🙌 Agradecimientos

Todas las contribuciones, grandes o pequeñas, ayudan a que más personas puedan usar **Filament en español**.  
Gracias por unirte a este esfuerzo comunitario ❤️
