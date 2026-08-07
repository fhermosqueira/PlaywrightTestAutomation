# Playwright Test Automation

[![Playwright Tests](https://github.com/fhermosqueira/PlaywrightTestAutomation/actions/workflows/playwright.yml/badge.svg)](https://github.com/fhermosqueira/PlaywrightTestAutomation/actions/workflows/playwright.yml)

Suite de pruebas automatizadas end-to-end usando **Playwright** y **TypeScript**, implementando el patrón **Page Object Model (POM)** sobre [the-internet.herokuapp.com](https://the-internet.herokuapp.com), un sitio de práctica para QA automation.

Proyecto desarrollado como práctica de automatización de pruebas funcionales, con foco en una arquitectura mantenible y escalable.

## Stack

- **Playwright** — framework de testing E2E
- **TypeScript** — tipado estático
- **GitHub Actions** — integración continua (CI)

## Arquitectura

El proyecto implementa **Page Object Model (POM)**, separando la lógica de interacción con cada página (locators y acciones) de la lógica de los tests (orquestación y assertions). Esto evita duplicar locators entre tests y centraliza los cambios: si un selector cambia, se actualiza en un solo lugar.

### Estructura de carpetas

\`\`\`
├── pages/                  # Page Objects — locators y acciones por página
│   ├── base-page.ts        # Clase base con lo común a todas las páginas
│   ├── login-page.ts       # extends BasePage
│   └── addelement-page.ts  # extends BasePage
├── fixtures/               # Fixtures custom de Playwright
│   └── pages.ts            # Inyecta las Page Objects en los tests
├── tests/                  # Casos de prueba
│   └── auth.spec.ts
└── .github/workflows/      # CI — corre la suite en cada push
    └── playwright.yml
\`\`\`

### Decisiones de diseño

- **Herencia con `BasePage`**: todas las Page Objects extienden de una clase base que centraliza lo común (como la referencia a `page`), evitando repetir el constructor en cada Page Object.
- **Fixtures en vez de instanciación manual**: los tests reciben las Page Objects ya listas como parámetro (por ejemplo `{ loginPage }`), en vez de crear `new LoginPage(page)` a mano en cada test.
- **`baseURL` centralizado**: la URL del sitio bajo prueba se define una sola vez en `playwright.config.ts`; las Page Objects usan rutas relativas.
- **Data-driven testing**: los casos de login fallido se recorren desde un array de casos en vez de duplicar tests casi idénticos.

## Cómo correr los tests

\`\`\`bash
# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install

# Correr toda la suite
npx playwright test

# Correr en modo visual (con navegador visible)
npx playwright test --headed

# Ver el último reporte HTML
npx playwright show-report
\`\`\`

## Casos de prueba

La suite cubre los siguientes escenarios funcionales:

- Login exitoso
- Login fallido — usuario incorrecto
- Login fallido — password incorrecto
- Login fallido — campos vacíos
- Agregar elemento
- Agregar y quitar elemento
- Flujo encadenado: login exitoso + agregar y quitar elemento

Los casos de login fallido están implementados con **data-driven testing**: un único test parametrizado recorre un array de casos (usuario, password, mensaje de error esperado) en vez de duplicar tests casi idénticos.

## CI/CD

La suite corre automáticamente en cada `push` y `pull request` a `main` mediante **GitHub Actions**, en un entorno limpio (Ubuntu + navegadores recién instalados). El resultado de la última corrida se refleja en el badge al inicio de este README, y el reporte HTML queda disponible como artifact descargable en cada ejecución.