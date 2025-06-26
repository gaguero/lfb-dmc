# PRD: Sistema Multi-Destinos DMC Panama
## Product Requirements Document

**Proyecto**: Local From Bocas - Multi-Destination Platform  
**Versión**: 1.0  
**Fecha**: 2025-01-27  
**Stakeholder**: Usuario/Propietario DMC  
**Desarrollador**: AI Assistant + Cursor IDE  

---

## 🎯 **VISIÓN DEL PRODUCTO**

Transformar la landing page actual de Bocas del Toro en una plataforma DMC completa que permita a los usuarios explorar y combinar múltiples destinos de Panamá de forma dinámica, con contenido e imágenes que se adaptan según las selecciones realizadas.

---

## 📋 **REQUERIMIENTOS FUNCIONALES**

### **RF1: Navegación por Destinos Primarios**
- El usuario puede seleccionar un destino principal desde la navbar
- El destino seleccionado define el contexto principal del contenido
- Solo un destino primario puede estar activo a la vez

### **RF2: Selección Multi-Destino**
- El usuario puede seleccionar múltiples destinos adicionales desde el widget de búsqueda
- Máximo 4 destinos combinados para mantener calidad de experiencia
- Feedback visual inmediato de las selecciones

### **RF3: Adaptación Dinámica de Contenido**
- Título hero cambia según destino primario
- Descripción se genera combinando destinos seleccionados
- Imágenes hero se distribuyen equitativamente según selecciones
- Widget de búsqueda refleja destinos seleccionados

### **RF4: Experiencia Responsive**
- Funcionalidad completa en desktop, tablet y móvil
- Adaptación de layout de imágenes según pantalla
- Multi-select optimizado para touch interfaces

---

## 🎨 **DESTINOS Y CONTENIDO**

### **Destinos Definidos:**
1. **Bocas del Toro** - Caribe, playa, relajación
2. **Chiriquí** - Montaña, café, aventura
3. **Las Perlas** - Islas Pacific, exclusividad
4. **Guna Yala** - Cultura indígena, autenticidad  
5. **Panama Ciudad** - Urban, histórico, negocios

### **Contenido por Destino:**
- Título hero específico
- Descripción base (~100 palabras)
- Imagen hero de alta calidad
- Actividades destacadas (3-5)
- Duración sugerida

---

## 🚀 **PLAN DE DESARROLLO POR FASES**

> **⚠️ IMPORTANTE**: Cada fase debe completarse y ser visualmente verificada por el humano antes de continuar a la siguiente fase. El desarrollador debe solicitar aprobación explícita al completar cada etapa.

---

### **FASE 1: ESTRUCTURA DE DATOS Y ESTADO**
**Objetivo**: Implementar la arquitectura base del sistema multi-destinos  
**Duración estimada**: 1-2 horas  

#### **Paso 1.1: Crear Estructura de Datos**
- [ ] Crear archivo `src/data/destinations.ts` con interface y datos de los 5 destinos
- [ ] Incluir contenido placeholder para testing visual
- [ ] Definir tipos TypeScript para el sistema

**🎯 Checkpoint Visual**: Verificar que los datos se importan correctamente sin errores de compilación

#### **Paso 1.2: Implementar Context de Estado**
- [ ] Crear `src/context/DestinationContext.tsx` 
- [ ] Hook customizado `useDestination()` para gestionar estado
- [ ] Estado incluye: destino primario, destinos seleccionados, contenido combinado

**🎯 Checkpoint Visual**: Consola del navegador debe mostrar estado inicial sin errores

#### **Paso 1.3: Integrar Context en Aplicación**
- [ ] Envolver app en DestinationProvider
- [ ] Verificar que componentes pueden acceder al estado

**🎯 Checkpoint Visual**: React DevTools debe mostrar el context funcionando
**👤 APROBACIÓN REQUERIDA**: El humano debe verificar que no hay errores y aprobar continuar

---

### **FASE 2: NAVBAR INTERACTIVA**
**Objetivo**: Transformar navbar actual en selector de destinos primarios  
**Duración estimada**: 1-2 horas

#### **Paso 2.1: Actualizar Botones de Navbar**
- [ ] Reemplazar enlaces actuales (Home, Destinations, etc.) con botones de destinos
- [ ] Implementar estado activo visual (botón seleccionado vs no seleccionado)
- [ ] Mantener iconos phone/mail en el lado derecho

**🎯 Checkpoint Visual**: Navbar debe mostrar 5 destinos con uno activo por defecto

#### **Paso 2.2: Conectar Clicks con Estado**
- [ ] Implementar handlers para cambio de destino primario
- [ ] Verificar que el estado se actualiza correctamente
- [ ] Mantener estilo pill-shaped actual

**🎯 Checkpoint Visual**: Al hacer click en destino, debe cambiar el estado (verificar en React DevTools)

#### **Paso 2.3: Feedback Visual Mejorado**
- [ ] Animaciones suaves entre selecciones
- [ ] Estados hover bien definidos
- [ ] Responsive behavior en móvil

**🎯 Checkpoint Visual**: Navbar debe responder fluidamente a interacciones
**👤 APROBACIÓN REQUERIDA**: El humano debe aprobar el comportamiento de la navbar

---

### **FASE 3: CONTENIDO DINÁMICO BÁSICO**
**Objetivo**: Conectar selección de navbar con título y descripción hero  
**Duración estimada**: 1-2 horas

#### **Paso 3.1: Título Hero Dinámico**
- [ ] Conectar título con destino primario seleccionado
- [ ] Formato: "Discover [Nombre del Destino]"
- [ ] Mantener tipografía y estilos actuales

**🎯 Checkpoint Visual**: Título debe cambiar inmediatamente al seleccionar destino en navbar

#### **Paso 3.2: Descripción Dinámica**
- [ ] Mostrar descripción base del destino seleccionado
- [ ] Mantener longitud y formatting consistente
- [ ] Transición suave entre cambios

**🎯 Checkpoint Visual**: Descripción debe actualizarse sin jarring visual

#### **Paso 3.3: Widget de Búsqueda Básico**
- [ ] Campo "Destination" debe mostrar destino primario seleccionado
- [ ] Mantener otros campos (fecha, duración) sin cambios por ahora

**🎯 Checkpoint Visual**: Widget debe reflejar destino seleccionado en navbar
**👤 APROBACIÓN REQUERIDA**: El humano debe aprobar la sincronización de contenido

---

### **FASE 4: SISTEMA MULTI-SELECT**
**Objetivo**: Implementar selección múltiple en widget de búsqueda  
**Duración estimada**: 2-3 horas

#### **Paso 4.1: Widget Multi-Select UI**
- [ ] Reemplazar campo "Destination" con dropdown multi-select
- [ ] Checkboxes elegantes para cada destino
- [ ] Destino primario pre-seleccionado y disabled
- [ ] Límite máximo de 4 destinos total

**🎯 Checkpoint Visual**: Widget debe mostrar opciones multi-select funcionando

#### **Paso 4.2: Lógica de Selección Múltiple**
- [ ] Conectar selecciones con estado global
- [ ] Validación de límites (máximo 4 destinos)
- [ ] Feedback visual de destinos seleccionados

**🎯 Checkpoint Visual**: Selecciones deben reflejarse en el estado (React DevTools)

#### **Paso 4.3: Contenido Combinado Básico**
- [ ] Función para generar descripción combinada
- [ ] Lógica simple: "Discover [dest1], [dest2] and [dest3]..."
- [ ] Actualización automática al cambiar selecciones

**🎯 Checkpoint Visual**: Descripción debe cambiar al seleccionar múltiples destinos
**👤 APROBACIÓN REQUERIDA**: El humano debe aprobar el sistema multi-select

---

### **FASE 5: IMÁGENES DINÁMICAS**
**Objetivo**: Implementar layout adaptativo de imágenes hero  
**Duración estimada**: 2-3 horas

#### **Paso 5.1: Preparar Assets de Imágenes**
- [ ] Crear placeholder images para los 5 destinos
- [ ] Optimizar tamaños y formatos
- [ ] Organizar en `/public/destinations/`

**🎯 Checkpoint Visual**: Imágenes deben cargar sin errores

#### **Paso 5.2: Layout Grid Adaptativo**
- [ ] CSS Grid que se adapta según número de destinos seleccionados
- [ ] 1 destino = 100% ancho
- [ ] 2 destinos = 50% cada una
- [ ] 3+ destinos = grid equitativo
- [ ] Mantener rounded corners y shadows

**🎯 Checkpoint Visual**: Layout debe cambiar fluidamente con selecciones

#### **Paso 5.3: Transiciones e Loading States**
- [ ] Animaciones suaves entre cambios de imagen
- [ ] Loading placeholder mientras cargan nuevas imágenes
- [ ] Lazy loading para optimización

**🎯 Checkpoint Visual**: Cambios de imagen deben ser fluidos y profesionales
**👤 APROBACIÓN REQUERIDA**: El humano debe aprobar el comportamiento de imágenes

---

### **FASE 6: CONTENIDO INTELIGENTE**
**Objetivo**: Sistema avanzado de descripción combinada  
**Duración estimada**: 2-3 horas

#### **Paso 6.1: Template de Descripciones**
- [ ] Sistema de templates para combinaciones comunes
- [ ] Lógica para combinar highlights de múltiples destinos
- [ ] Duración sugerida basada en número de destinos

**🎯 Checkpoint Visual**: Descripciones deben ser coherentes y atractivas

#### **Paso 6.2: Highlights Combinados**
- [ ] Mostrar actividades destacadas de destinos seleccionados
- [ ] Sistema de priorización para evitar saturación
- [ ] Layout responsive para móvil

**🎯 Checkpoint Visual**: Highlights deben complementarse entre destinos

#### **Paso 6.3: Optimización de UX**
- [ ] Micro-interacciones pulidas
- [ ] Estados de error y validación
- [ ] Accessibility compliance

**🎯 Checkpoint Visual**: Experiencia debe sentirse profesional y pulida
**👤 APROBACIÓN REQUERIDA**: El humano debe aprobar la experiencia completa

---

### **FASE 7: RESPONSIVE Y POLISH**
**Objetivo**: Optimización móvil y detalles finales  
**Duración estimada**: 2-3 horas

#### **Paso 7.1: Optimización Móvil**
- [ ] Navbar responsive con 5 destinos
- [ ] Multi-select optimizado para touch
- [ ] Layout de imágenes apilado en móvil

**🎯 Checkpoint Visual**: Experiencia móvil debe ser completamente funcional

#### **Paso 7.2: Performance y Loading**
- [ ] Optimización de imágenes
- [ ] Lazy loading y code splitting
- [ ] Medición de performance metrics

**🎯 Checkpoint Visual**: Site debe cargar rápidamente en todas las condiciones

#### **Paso 7.3: Testing Final**
- [ ] Testing en múltiples dispositivos
- [ ] Verificación de todos los user flows
- [ ] Documentación de componentes

**🎯 Checkpoint Visual**: Sistema completo debe funcionar sin errores
**👤 APROBACIÓN FINAL**: El humano debe aprobar el producto completo

---

## 📊 **CRITERIOS DE ACEPTACIÓN**

### **Funcionalidad Core:**
- [ ] Usuario puede seleccionar destino primario desde navbar
- [ ] Usuario puede combinar hasta 4 destinos desde widget
- [ ] Contenido se actualiza dinámicamente sin errores
- [ ] Imágenes se adaptan según selecciones
- [ ] Experiencia responsive en todos los dispositivos

### **Performance:**
- [ ] Tiempo de carga inicial < 3 segundos
- [ ] Transiciones entre destinos < 500ms
- [ ] Sin errores de JavaScript en consola
- [ ] Lighthouse score > 85 en todas las métricas

### **UX/UI:**
- [ ] Interfaz intuitiva y autodescriptiva
- [ ] Feedback visual claro en todas las interacciones
- [ ] Consistencia con brand guidelines establecidos
- [ ] Accesibilidad WCAG AA compliance

---

## 🔄 **PROCESO DE APROBACIÓN**

1. **Desarrollo**: AI Assistant implementa cada paso
2. **Checkpoint Visual**: Verificación técnica de funcionalidad
3. **Solicitud de Aprobación**: AI Assistant presenta resultado al humano
4. **Revisión Humana**: Usuario verifica en localhost:3000
5. **Aprobación/Rechazo**: Usuario autoriza continuar o solicita ajustes
6. **Iteración**: Si hay rechazo, corregir y volver a paso 2
7. **Próxima Fase**: Solo continuar con aprobación explícita

---

## 📋 **DELIVERABLES**

- **Código**: Componentes React funcionales y testeados
- **Assets**: Imágenes optimizadas para todos los destinos
- **Documentación**: README actualizado con nueva funcionalidad
- **Testing**: Manual testing report por cada fase
- **Deployment**: Versión funcional desplegada en ambiente de pruebas

---

**Notas**: Este PRD seguirá un enfoque iterativo con validación humana constante para asegurar que cada incremento agrega valor visible y funcional al producto. 