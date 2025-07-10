// mostrar/ocultar campo de horas según el modo seleccionado
        document.querySelectorAll('input[name="modo"]').forEach(radio => {
            radio.addEventListener('change', function() {
                const horasGroup = document.getElementById('horasGroup');
                if (this.value === 'personalizado') {
                    horasGroup.style.display = 'block';
                } else {
                    horasGroup.style.display = 'none';
                }
            });
        });

        // sincronizar slider con input numérico
        const consumoInput = document.getElementById('consumo');
        const consumoSlider = document.getElementById('consumo-slider');
        
        consumoInput.addEventListener('input', function() {
            consumoSlider.value = this.value;
        });
        
        consumoSlider.addEventListener('input', function() {
            consumoInput.value = this.value;
        });

        function changeTab(tabId) {
            // Ocultar todos los contenidos de pestañas
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Desactivar todas las pestañas
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Activar la pestaña seleccionada
            document.getElementById(tabId).classList.add('active');
            document.querySelector(`.tab[onclick="changeTab('${tabId}')"]`).classList.add('active');
            

        }


        function calcular() {
            // Mostrar estado de carga
            const calculateBtn = document.getElementById('calculateBtn');
            calculateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculando...';
            calculateBtn.disabled = true;
            
            // carga para mejor experiencia de usuario
            setTimeout(() => {
                // valores
                const consumoWatts = parseFloat(document.getElementById('consumo').value);
                const preciokWh = parseFloat(document.getElementById('kwh').value);
                const dias = parseInt(document.getElementById('dias').value);
                const modo = document.querySelector('input[name="modo"]:checked').value;
                const horasPorDia = modo === 'continuo' ? 24 : parseFloat(document.getElementById('horas').value);
                
                // Validaciones
                if (!consumoWatts || !preciokWh || !horasPorDia || !dias) {
                    alert('Por favor, completa todos los campos correctamente');
                    calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Calcular y Analizar';
                    calculateBtn.disabled = false;
                    return;
                }
                
                // calculos basicos
                const consumokWh = consumoWatts / 1000; // Convertir watts a kW
                const consumoDiario = consumokWh * horasPorDia; // kWh por día
                const consumoTotal = consumoDiario * dias; // kWh total
                const costoDiario = consumoDiario * preciokWh; // CLP por día
                const costoTotal = consumoTotal * preciokWh; // CLP total
                
                // resultados básicos
                const resultadosDiv = document.getElementById('resultados-contenido');
                resultadosDiv.innerHTML = `
                    <div class="result-item fade-in" style="animation-delay: 0.1s;">
                        <span class="result-label"><i class="fas fa-clock"></i> Consumo por hora:</span>
                        <span class="result-value">${consumokWh.toFixed(3)} kWh (${consumoWatts} W)</span>
                    </div>
                    <div class="result-item fade-in" style="animation-delay: 0.2s;">
                        <span class="result-label"><i class="fas fa-calendar-day"></i> Consumo diario:</span>
                        <span class="result-value">${consumoDiario.toFixed(2)} kWh</span>
                    </div>
                    <div class="result-item fade-in" style="animation-delay: 0.3s;">
                        <span class="result-label"><i class="fas fa-calendar-alt"></i> Consumo total (${dias} días):</span>
                        <span class="result-value">${consumoTotal.toFixed(2)} kWh</span>
                    </div>
                    <div class="result-item fade-in" style="animation-delay: 0.4s;">
                        <span class="result-label"><i class="fas fa-coins"></i> Costo diario:</span>
                        <span class="result-value">$${costoDiario.toLocaleString('es-CL', {maximumFractionDigits: 0})} CLP</span>
                    </div>
                    <div class="highlight fade-in" style="animation-delay: 0.5s;">
                        <div class="result-item">
                            <span class="result-label"><i class="fas fa-money-bill-wave"></i> Costo total (${dias} días):</span>
                            <span class="result-value">$${costoTotal.toLocaleString('es-CL', {maximumFractionDigits: 0})} CLP</span>
                        </div>
                    </div>
                    <div class="result-item fade-in" style="animation-delay: 0.6s;">
                        <span class="result-label"><i class="fas fa-calendar-check"></i> Costo promedio mensual:</span>
                        <span class="result-value">$${((costoTotal / dias) * 30).toLocaleString('es-CL', {maximumFractionDigits: 0})} CLP</span>
                    </div>
                    <div class="result-item fade-in" style="animation-delay: 0.7s;">
                        <span class="result-label"><i class="fas fa-calendar-star"></i> Costo promedio anual:</span>
                        <span class="result-value">$${((costoTotal / dias) * 365).toLocaleString('es-CL', {maximumFractionDigits: 0})} CLP</span>
                    </div>
                `;
                
                // derivadas (tasas de cambio)
                const derivativesContent = document.getElementById('derivatives-content');
                derivativesContent.innerHTML = `
                    <div class="math-section fade-in">
                        <h4><i class="fas fa-calculator"></i> Análisis de Variables (Derivadas Parciales)</h4>
                        <div class="math-content">
                            <p>Este análisis muestra cómo cambios en cada variable afectan el costo total, permitiendo identificar los factores más críticos para la optimización energética.</p>
                            
                            <div class="math-formula">
                                <strong>Función de Costo:</strong> C(W, p, h, d) = (W/1000) × p × h × d
                                <br>Donde:
                                <br>W = Consumo en Watts (Actual: ${consumoWatts}W)
                                <br>p = Precio por kWh (Actual: $${preciokWh} CLP)
                                <br>h = Horas por día (Actual: ${horasPorDia}h)
                                <br>d = Días (Actual: ${dias} días)
                            </div>
                            
                            <div class="result-item">
                                <span class="result-label"><i class="fas fa-arrow-up"></i> Variable al consumo (∂C/∂W):</span>
                                <span class="result-value">$${(preciokWh * horasPorDia * dias / 1000).toFixed(4)} CLP/Watt</span>
                            </div>
                            <p class="input-hint">Por cada Watt adicional de consumo, el costo aumenta en esta cantidad.</p>
                            
                            <div class="result-item">
                                <span class="result-label"><i class="fas fa-bolt"></i> Variable al precio (∂C/∂p):</span>
                                <span class="result-value">${(consumokWh * horasPorDia * dias).toFixed(2)} kWh</span>
                            </div>
                            <p class="input-hint">Por cada peso que aumente el precio del kWh, el costo total aumenta en esta cantidad.</p>
                            
                            <div class="result-item">
                                <span class="result-label"><i class="fas fa-clock"></i> Variable al tiempo de uso (∂C/∂h):</span>
                                <span class="result-value">$${(consumokWh * preciokWh * dias).toFixed(2)} CLP/hora</span>
                            </div>
                            <p class="input-hint">Por cada hora adicional de uso diario, el costo aumenta en esta cantidad.</p>
                            
                            <div class="result-item">
                                <span class="result-label"><i class="fas fa-calendar"></i> Variable al período (∂C/∂d):</span>
                                <span class="result-value">$${(consumokWh * preciokWh * horasPorDia).toFixed(2)} CLP/día</span>
                            </div>
                            <p class="input-hint">Por cada día adicional de uso, el costo aumenta en esta cantidad.</p>
                            
                            <div class="highlight">
                                <div class="result-item">
                                    <span class="result-label"><i class="fas fa-lightbulb"></i> Variable con mayor impacto:</span>
                                    <span class="result-value">${getMostSensitiveVariable(consumoWatts, preciokWh, horasPorDia, dias)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // optimización
                const optimizationContent = document.getElementById('optimization-content');
                optimizationContent.innerHTML = `
                    <div class="math-section fade-in">
                        <h4><i class="fas fa-chart-line"></i> Estrategias de Optimización Energética</h4>
                        <div class="math-content">
                            <p>Basado en el análisis de Variables, estas son las recomendaciones para reducir tus costos energéticos:</p>
                            
                            <div class="math-formula">
                                <strong>Oportunidades de ahorro:</strong>
                                <ul>
                                    <li><strong>Reducir el consumo en 10%</strong> (${(consumoWatts*0.1).toFixed(0)}W) ahorraría aproximadamente <strong>$${(10 * preciokWh * horasPorDia * dias / 1000).toLocaleString('es-CL', {maximumFractionDigits: 0})} CLP</strong> en este período</li>
                                    <li><strong>Disminuir el uso diario en 1 hora</strong> ahorraría <strong>$${(consumokWh * preciokWh * dias).toLocaleString('es-CL', {maximumFractionDigits: 0})} CLP</strong></li>
                                    <li><strong>Negociar un 5% de reducción en el precio del kWh</strong> ahorraría <strong>$${(costoTotal * 0.05).toLocaleString('es-CL', {maximumFractionDigits: 0})} CLP</strong></li>
                                    <li><strong>Implementar horarios eficientes</strong> podría reducir costos hasta en <strong>$${(costoTotal * 0.15).toLocaleString('es-CL', {maximumFractionDigits: 0})} CLP</strong> según análisis históricos</li>
                                </ul>
                            </div>
                            
                            <div class="highlight">
                                <div class="result-item">
                                    <span class="result-label"><i class="fas fa-magic"></i> Mejor oportunidad de ahorro:</span>
                                    <span class="result-value">${getBestSavingOpportunity(consumoWatts, preciokWh, horasPorDia, dias)}</span>
                                </div>
                            </div>
                            
                            <div class="math-formula">
                                <strong>Recomendaciones técnicas:</strong>
                                <ul>
                                    <li>Considera equipos con certificación <strong>Energy Star</strong> para mayor eficiencia</li>
                                    <li>Implementa sistemas de <strong>monitoreo energético en tiempo real</strong></li>
                                    <li>Configura <strong>esquemas de hibernación</strong> para períodos de baja demanda</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
                
                // avanzado
                const advancedContent = document.getElementById('advanced-content');
                advancedContent.innerHTML = `
                    <div class="math-section fade-in">
                        <h4><i class="fas fa-microscope"></i> Análisis Avanzado</h4>
                        <div class="math-content">
                            <p>Este análisis avanzado considera tasas de cambio no lineales y escenarios complejos para planificación estratégica.</p>
                            
                            <div class="math-formula">
                                <strong>Análisis de elasticidad:</strong>
                                <ul>
                                    <li>El costo es <strong>${getElasticity(consumoWatts, preciokWh, horasPorDia, dias)}</strong> respecto a cambios en el consumo energético</li>
                                    <li>La relación precio-costo muestra <strong>${getPriceSensitivity(consumoWatts, preciokWh, horasPorDia, dias)}</strong></li>
                                    <li>El factor tiempo tiene un impacto <strong>${getTimeImpact(horasPorDia)}</strong> en los costos totales</li>
                                </ul>
                            </div>
                            
                            <div class="math-formula">
                                <strong>Proyecciones a 5 años (considerando inflación del 3% anual):</strong>
                                <ul>
                                    <li>Año 1: $${(costoTotal).toLocaleString('es-CL', {maximumFractionDigits: 0})} CLP</li>
                                    <li>Año 2: $${(costoTotal * 1.03).toLocaleString('es-CL', {maximumFractionDigits: 0})} CLP</li>
                                    <li>Año 3: $${(costoTotal * Math.pow(1.03, 2)).toLocaleString('es-CL', {maximumFractionDigits: 0})} CLP</li>
                                    <li>Año 4: $${(costoTotal * Math.pow(1.03, 3)).toLocaleString('es-CL', {maximumFractionDigits: 0})} CLP</li>
                                    <li>Año 5: $${(costoTotal * Math.pow(1.03, 4)).toLocaleString('es-CL', {maximumFractionDigits: 0})} CLP</li>
                                </ul>
                            </div>
                            
                            <div class="highlight">
                                <div class="result-item">
                                    <span class="result-label"><i class="fas fa-project-diagram"></i> ROI potencial de medidas de eficiencia:</span>
                                    <span class="result-value">${getROI(consumoWatts, costoTotal)}</span>
                                </div>
                            </div>
                            
                            <div class="math-formula">
                                <strong>Escenarios alternativos:</strong>
                                <ul>
                                    <li><strong>Escenario optimista:</strong> $${(costoTotal * 0.85).toLocaleString('es-CL', {maximumFractionDigits: 0})} CLP (15% de ahorro)</li>
                                    <li><strong>Escenario pesimista:</strong> $${(costoTotal * 1.15).toLocaleString('es-CL', {maximumFractionDigits: 0})} CLP (15% de aumento)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
                
                document.getElementById('results').style.display = 'block';
                document.getElementById('results').scrollIntoView({ behavior: 'smooth' });

                calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Recalcular';
                calculateBtn.disabled = false;
                
            }, 800);
        }
        
        function getMostSensitiveVariable(W, p, h, d) {
            const sensitivities = {
                'Consumo (Watts)': (p * h * d / 1000),
                'Precio kWh': (W/1000 * h * d),
                'Horas de uso': (W/1000 * p * d),
                'Días': (W/1000 * p * h)
            };
            
            const maxSensitivity = Math.max(...Object.values(sensitivities));
            const mostSensitive = Object.keys(sensitivities).find(key => sensitivities[key] === maxSensitivity);
            
            return `${mostSensitive} (Impacto: $${maxSensitivity.toFixed(2)} CLP por unidad)`;
        }
        
        function getBestSavingOpportunity(W, p, h, d) {
            const savings = {
                'Reducir consumo en 10%': (W * 0.1 * p * h * d / 1000),
                'Reducir horas en 10%': (W/1000 * p * h * 0.1 * d),
                'Negociar precio 5% más bajo': (W/1000 * p * 0.05 * h * d),
                'Optimizar períodos de uso': (W/1000 * p * h * d * 0.07)
            };
            
            const maxSaving = Math.max(...Object.values(savings));
            const bestOpportunity = Object.keys(savings).find(key => savings[key] === maxSaving);
            
            return `${bestOpportunity} - Ahorro estimado: $${maxSaving.toLocaleString('es-CL', {maximumFractionDigits: 0})} CLP (${((maxSaving/((W/1000)*p*h*d))*100).toFixed(1)}% del costo total)`;
        }
        
        function getElasticity(W, p, h, d) {
            const elasticity = (p * h * d / 1000) / ((W/1000) * p * h * d / W);
            if (elasticity > 1.2) return 'altamente elástico';
            if (elasticity > 0.8) return 'proporcional';
            return 'inelástico';
        }
        
        function getPriceSensitivity(W, p, h, d) {
            const sensitivity = (W/1000 * h * d) / ((W/1000) * p * h * d / p);
            if (sensitivity > 1.1) return 'alta sensibilidad';
            if (sensitivity > 0.9) return 'sensibilidad media';
            return 'baja sensibilidad';
        }
        
        function getTimeImpact(h) {
            if (h >= 20) return 'muy alto (equipo siempre encendido)';
            if (h >= 12) return 'alto (jornada extendida)';
            if (h >= 8) return 'moderado (jornada estándar)';
            return 'bajo (uso parcial)';
        }
        
        function getROI(W, costoTotal) {
            if (W > 800) return 'ROI esperado <6 meses para medidas de eficiencia';
            if (W > 400) return 'ROI esperado 6-12 meses para medidas de eficiencia';
            return 'ROI esperado 12-18 meses para medidas de eficiencia';
        }
        
        function resetCalculator() {
            document.getElementById('consumo').value = 350;
            document.getElementById('consumo-slider').value = 350;
            document.getElementById('kwh').value = 140;
            document.getElementById('continuo').checked = true;
            document.getElementById('horasGroup').style.display = 'none';
            document.getElementById('dias').value = 30;
            document.getElementById('results').style.display = 'none';
            changeTab('basic');
            
            // Restaurar texto del botón
            document.getElementById('calculateBtn').innerHTML = '<i class="fas fa-calculator"></i> Calcular y Analizar';
        }
        
        // Permitir cálculo con Enter
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calcular();
            }
        });
        
        // Inicializar animaciones
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                document.querySelectorAll('.fade-in').forEach(el => {
                    el.style.opacity = 1;
                    el.style.transform = 'translateY(0)';
                });
            }, 100);
        });