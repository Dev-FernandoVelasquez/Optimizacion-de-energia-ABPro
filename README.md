# Optimización de energía ABPro

## Descripción
Este código implementa una calculadora de consumo energético con análisis avanzado que incluye:
- Cálculo básico de costos energéticos
- Análisis de variables (derivadas parciales)
- Estrategias de optimización
- Análisis avanzado con proyecciones

## Características principales

### Interfaz de usuario
- **Sistema de pestañas** para organizar los diferentes tipos de análisis
- **Validación de campos** para asegurar datos correctos
- **Sincronización** entre inputs numéricos y sliders
- **Mostrar/ocultar** campos según el modo seleccionado (continuo/personalizado)
- **Animaciones** para mejor experiencia de usuario

### Funcionalidades de cálculo
1. **Cálculos básicos**:
   - Conversión de Watts a kWh
   - Cálculo de consumo diario y total
   - Costos diarios, totales y promedios

2. **Análisis de variables**:
   - Derivadas parciales para cada variable (consumo, precio, horas, días)
   - Identificación de la variable con mayor impacto
   - Sensibilidad del costo a cambios en cada parámetro

3. **Optimización**:
   - Oportunidades de ahorro potencial
   - Recomendaciones técnicas
   - Mejor estrategia de ahorro identificada

4. **Análisis avanzado**:
   - Elasticidad del consumo
   - Proyecciones a 5 años con inflación
   - ROI de medidas de eficiencia
   - Escenarios optimistas/pesimistas

## Estructura del código

### Funciones principales

1. **Event Listeners**:
   - Control de pestañas (`changeTab()`)
   - Sincronización slider-input
   - Mostrar/ocultar campos según modo seleccionado

2. **Función `calcular()`**:
   - Realiza todos los cálculos principales
   - Genera los resultados en 4 secciones:
     - Resultados básicos
     - Análisis de variables
     - Optimización
     - Análisis avanzado

3. **Funciones de apoyo**:
   - `getMostSensitiveVariable()`: Identifica qué variable afecta más el costo
   - `getBestSavingOpportunity()`: Encuentra la mejor oportunidad de ahorro
   - Funciones de análisis (`getElasticity()`, `getPriceSensitivity()`, etc.)

4. **Funciones auxiliares**:
   - `resetCalculator()`: Reinicia el formulario
   - Event listener para tecla Enter

### Variables clave
- `consumoWatts`: Consumo en Watts del dispositivo
- `preciokWh`: Precio por kWh en CLP
- `horasPorDia`: Horas de uso diario
- `dias`: Período de cálculo en días

## Uso
1. Completa los campos del formulario:
   - Consumo en Watts (usar slider o input)
   - Precio por kWh
   - Modo de uso (continuo o personalizado)
   - Días de cálculo

2. Haz clic en "Calcular y Analizar" o presiona Enter

3. Explora los resultados en las diferentes pestañas:
   - **Básico**: Resultados fundamentales
   - **Variables**: Análisis de sensibilidad
   - **Optimización**: Estrategias de ahorro
   - **Avanzado**: Proyecciones y escenarios

4. Usa "Reiniciar" para comenzar un nuevo cálculo

## Tecnologías utilizadas
- HTML5
- CSS3 (con animaciones)
- JavaScript ES6
- Font Awesome para iconos
- Matemáticas aplicadas (cálculo diferencial)

## Personalización
El código puede adaptarse para:
- Diferentes monedas (cambiar 'CLP')
- Rangos de consumo (modificar valores del slider)
- Factores de inflación (en proyecciones)
- Umbrales de sensibilidad (en funciones de análisis)
