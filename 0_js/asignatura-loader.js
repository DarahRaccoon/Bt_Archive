// ============================================================
// CONFIGURACIÓN
// ============================================================

// Mapeo de íconos para cada sección (se pueden personalizar)
const SECCIONES_CONFIG = {
    resumen: {
        icono: 'fa-file-pdf',
        titulo: 'Resumen de la asignatura',
        descripcion: 'Este resumen cubre todos los temas vistos a través de la materia y busca servir como material de consulta para alumnos y guía para docentes.',
        rutaBase: 'Resumen/0_Main.pdf'
    },
    diapositivas: {
        icono: 'fa-chalkboard-user',
        titulo: 'Diapositivas de la asignatura',
        descripcion: 'Diapositivas que recopilan los temas más relevantes de la asignatura.',
        rutaBase: 'Diapositivas/0_Main.pdf'
    }
};

// ============================================================
// FUNCIONES PRINCIPALES
// ============================================================

/**
 * Obtiene el ID de la asignatura desde la URL
 * Prioriza el parámetro ?id=, luego busca en la ruta
 */
function obtenerIdAsignatura() {
    // Opción 1: Desde parámetro URL (?id=...)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    if (idParam) return idParam;
    
    // Opción 2: Desde la URL (pathname) - busca la carpeta actual
    const pathParts = window.location.pathname.split('/');
    for (let i = pathParts.length - 1; i >= 0; i--) {
        const part = pathParts[i];
        if (part && /^\d+-/.test(part) && part.length > 3) {
            return part;
        }
    }
    
    // Opción 3: Desde el atributo data de un elemento (para pruebas)
    const container = document.getElementById('asignatura-container');
    if (container && container.dataset.asignaturaId) {
        return container.dataset.asignaturaId;
    }
    
    return null;
}

/**
 * Carga el archivo JSON de asignaturas
 */
async function cargarAsignaturas() {
    try {
        const response = await fetch('/Bt_Archive/0_js/asignaturas.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data.asignaturas;
    } catch (error) {
        console.error('Error cargando asignaturas:', error);
        return null;
    }
}

/**
 * Encuentra una asignatura por su ID o nombre de carpeta
 */
function buscarAsignatura(asignaturas, identificador) {
    // Primero buscar por ID exacto
    let encontrada = asignaturas.find(a => a.id === identificador);
    if (encontrada) return encontrada;
    
    // Si no, buscar por nombre normalizado (para carpetas con acentos)
    const nombreNormalizado = identificador
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    
    return asignaturas.find(a => {
        const aNormalizado = a.id.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
        return aNormalizado === nombreNormalizado;
    });
}

/**
 * Escapa HTML para prevenir XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Genera el HTML para la sección de "Resumen y Diapositivas"
 */
function generarSeccionResumenDiapos(asignatura) {
    const resumenPath = asignatura.rutaResumen || `Resumen/0_Main.pdf`;
    const diaposPath = asignatura.rutaDiapositivas || `Diapositivas/0_Main.pdf`;
    
    // Usar paths absolutos siempre
    const resumenUrl = resumenPath.startsWith('/Bt_Archive/') 
        ? resumenPath 
        : `/Bt_Archive/${resumenPath}`;
    const diaposUrl = diaposPath.startsWith('/Bt_Archive/') 
        ? diaposPath 
        : `/Bt_Archive/${diaposPath}`;
    
    return `
        <div class="grid grid--auto-fit">
            <div class="card">
                <h3 class="card__title"><i class="fas fa-file-pdf" style="color: var(--color-primary);"></i> Resumen de la asignatura</h3>
                <p class="card__text">Este resumen cubre todos los temas vistos a través de la materia y busca servir como material de consulta para alumnos y guía para docentes.</p>
                <div class="card__footer">
                    <a href="${resumenUrl}" class="btn btn--secondary" target="_blank" download>
                        <i class="fas fa-download"></i> Descargar
                    </a>
                    <a href="${resumenUrl}" class="btn btn--primary" target="_blank">
                        <i class="fa-solid fa-door-open"></i> Abrir
                    </a>
                </div>
            </div>

            <div class="card">
                <h3 class="card__title"><i class="fa-solid fa-chalkboard-user" style="color: var(--color-primary);"></i> Diapositivas</h3>
                <p class="card__text">Estas recopilan los temas más relevantes de la asignatura de manera más concisa.</p>
                <div class="card__footer">
                    <a href="${diaposUrl}" class="btn btn--secondary" target="_blank" download>
                        <i class="fas fa-download"></i> Descargar
                    </a>
                    <a href="${diaposUrl}" class="btn btn--primary" target="_blank">
                        <i class="fa-solid fa-door-open"></i> Abrir
                    </a>
                </div>
            </div>
        </div>
    `;
}

/**
 * Genera el HTML para el manual de asignatura
 */
function generarSeccionManual(asignatura) {
    const manualPath = asignatura.rutaManual || `/Bt_Archive/manuales/${asignatura.nombre}.pdf`;
    
    // Asegurar ruta absoluta
    const manualUrl = manualPath.startsWith('/Bt_Archive/') 
        ? manualPath 
        : `/Bt_Archive/${manualPath}`;
    
    return `
        <div style="max-width: 1000px; margin: 0 auto;">
            <div style="text-align: center;">
                <a href="${manualUrl}" class="btn btn--primary" target="_blank">
                    <i class="fas fa-download"></i> Descargar manual
                </a>
            </div>
        </div>
    `;
}

/**
 * Genera el HTML para los videos
 */
function generarSeccionVideos(videos) {
    if (!videos || videos.length === 0) {
        return `
            <div style="text-align: center; padding: 2rem; color: var(--color-text-light);">
                <i class="fas fa-info-circle"></i> Próximamente se agregarán videos recomendados para esta asignatura.
            </div>
        `;
    }
    
    const videosHTML = videos.map(video => `
        <div class="card">
            <div style="position: relative; padding-bottom: 50%; height: 0; overflow: hidden; margin-bottom: 1rem">
                <iframe src="${video.embedUrl}" 
                        title="${escapeHtml(video.titulo)}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen>
                </iframe>
            </div>
            <h3 class="card__title">${escapeHtml(video.titulo)}</h3>
            <p class="card__subtitle">Por: ${escapeHtml(video.autor || '')}</p>
            <p class="card__text">${escapeHtml(video.descripcion || '')}</p>
            <a href="${video.url}" class="btn btn--primary" target="_blank">
                <i class="fa-brands fa-youtube"></i> Ver en YouTube
            </a>
        </div>
    `).join('');
    
    return `<div class="grid grid--auto-fit">${videosHTML}</div>`;
}

/**
 * Genera el HTML para recursos extra
 */
function generarSeccionRecursosExtra(recursos) {
    if (!recursos || (!recursos.ejercicios?.length && !recursos.articulos?.length)) {
        return `
            <div style="text-align: center; padding: 2rem; color: var(--color-text-light);">
                <i class="fas fa-info-circle"></i> Próximamente se agregarán recursos extra para esta asignatura.
            </div>
        `;
    }
    
    let html = '<div class="grid grid--auto-fit">';
    
    // Ejercicios/Prácticas
    if (recursos.ejercicios && recursos.ejercicios.length > 0) {
        html += `
            <article class="card">
                <div class="card__icon">
                    <i class="fas fa-pencil-alt"></i>
                </div>
                <h3 class="card__title" style="margin-bottom: 1.5rem;">Ejercicios y prácticas</h3>
                <ul style="list-style: none; text-align: left;">
                    ${recursos.ejercicios.map(ej => `
                        <li style="margin-bottom: 0.75rem;">
                            <a href="${ej.url}" target="_blank">
                                <i class="${ej.icono || 'fa-solid fa-pen'}"></i> ${escapeHtml(ej.nombre)}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </article>
        `;
    }
    
    // Artículos/Papers
    if (recursos.articulos && recursos.articulos.length > 0) {
        html += `
            <article class="card">
                <div class="card__icon">
                    <i class="fas fa-scroll"></i>
                </div>
                <h3 class="card__title" style="margin-bottom: 1.5rem;">Artículos recomendados</h3>
                <ul style="list-style: none; text-align: left;">
                    ${recursos.articulos.map(art => `
                        <li style="margin-bottom: 0.75rem;">
                            <a href="${art.url}" target="_blank">
                                <i class="${art.icono || 'fa-regular fa-file-lines'}"></i> ${escapeHtml(art.nombre)}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </article>
        `;
    }
    
    html += '</div>';
    return html;
}

/**
 * Renderiza la página completa de la asignatura
 */
function renderizarPagina(asignatura) {
    const container = document.getElementById('asignatura-container');
    if (!container) {
        console.error('No se encontró el contenedor #asignatura-container');
        return;
    }
    
    // Datos de la asignatura
    const nombre = asignatura.nombre;
    const descripcion = asignatura.descripcion || '';
    const portada = asignatura.portada || './portada.jpg';
    const videos = asignatura.videos || [];
    const recursosExtra = asignatura.recursosExtra || null;
    
    // Construir el HTML
    container.innerHTML = `
        <!-- Sección de inicio con presentación -->
        <section id="inicio" class="hero" style="background-image: url(${portada});">
            <div class="container hero__container">
                <div class="hero__content">
                    <h2 class="hero__title">${escapeHtml(nombre)}</h2>
                    <p class="hero__subtitle">${escapeHtml(descripcion)}</p>
                </div>
            </div>
        </section>

        <!-- BARRA DE NAVEGACIÓN ENTRE SECCIONES -->
        <div class="section section-gray" style="padding: 1rem 0;">
            <div class="container">
                <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
                    <a href="#resumen_y_diapos" class="btn btn--smaller btn--outline"><i class="fas fa-book"></i> Resúmen y diapositivas</a>
                    <a href="#manual" class="btn btn--smaller btn--outline"><i class="fas fa-book"></i> Manual</a>
                    <a href="#videos" class="btn btn--smaller btn--outline"><i class="fab fa-youtube"></i> Videos de apoyo</a>
                    <a href="#recursos-extra" class="btn btn--smaller btn--outline"><i class="fas fa-link"></i> Recursos extra</a>
                </div>
            </div>
        </div>

        <!-- SECCIÓN: RESUMEN Y DIAPOSITIVAS -->
        <section id="resumen_y_diapos" class="section section-light">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-header__title">
                        <i class="fa-solid fa-person-chalkboard" style="color: var(--color-primary);"></i> 
                        Resúmen y diapositivas
                    </h2>
                    <p class="section-header__subtitle">Estos documentos recopilan los temas vistos durante la asignatura, así como recursos de apoyo extra.</p>
                </div>
                ${generarSeccionResumenDiapos(asignatura)}
            </div>
        </section>

        <!-- SECCIÓN: MANUAL DE ASIGNATURA -->
        <section id="manual" class="section section-gray">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-header__title">
                        <i class="fas fa-book-open" style="color: var(--color-primary);"></i> 
                        Manual de asignatura
                    </h2>
                    <p class="section-header__subtitle">Documento institucional que recopila las unidades de cada asignatura, sus temas y las competencias a desarrollar por parte de los alumnos a lo largo del cuatrimestre.</p>
                </div>
                ${generarSeccionManual(asignatura)}
            </div>
        </section>

        <!-- SECCIÓN: VIDEOS -->
        <section id="videos" class="section section-light">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-header__title">
                        <i class="fab fa-youtube" style="color: var(--color-primary);"></i> 
                        Videos explicativos
                    </h2>
                    <p class="section-header__subtitle">Videos recomendados para un mejor entendimiento de algunos conceptos de la materia.</p>
                </div>
                ${generarSeccionVideos(videos)}
            </div>
        </section>

        <!-- SECCIÓN: RECURSOS EXTRA -->
        <section id="recursos-extra" class="section section-gray">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-header__title">
                        <i class="fas fa-paperclip" style="color: var(--color-primary);"></i> 
                        Recursos extra
                    </h2>
                    <p class="section-header__subtitle">Material complementario para profundizar.</p>
                </div>
                ${generarSeccionRecursosExtra(recursosExtra)}
            </div>
        </section>
    `;
}

// ============================================================
// INICIALIZACIÓN
// ============================================================

(async function init() {
    try {
        // 1. Obtener ID de la asignatura
        const asignaturaId = obtenerIdAsignatura();
        if (!asignaturaId) {
            console.error('No se pudo determinar la asignatura. Verifica la URL.');
            document.getElementById('asignatura-container').innerHTML = `
                <div style="text-align: center; padding: 4rem; color: var(--color-error);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem;"></i>
                    <h2>No se pudo identificar la asignatura</h2>
                    <p>Verifica que la URL sea correcta.</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--color-gray-dark);">
                        Ejemplo: <code>/0_html/asignature_page.html?id=4-biologia-molecular</code>
                    </p>
                </div>
            `;
            return;
        }
        
        // 2. Cargar datos
        const asignaturas = await cargarAsignaturas();
        if (!asignaturas) {
            document.getElementById('asignatura-container').innerHTML = `
                <div style="text-align: center; padding: 4rem; color: var(--color-error);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem;"></i>
                    <h2>Error al cargar los datos</h2>
                    <p>Por favor, recarga la página o contacta al administrador.</p>
                </div>
            `;
            return;
        }
        
        // 3. Buscar la asignatura
        const asignatura = buscarAsignatura(asignaturas, asignaturaId);
        if (!asignatura) {
            document.getElementById('asignatura-container').innerHTML = `
                <div style="text-align: center; padding: 4rem; color: var(--color-error);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem;"></i>
                    <h2>Asignatura no encontrada</h2>
                    <p>La asignatura "${escapeHtml(asignaturaId)}" no existe en el repositorio.</p>
                    <a href="/Bt_Archive/0_html/asignaturas.html" class="btn btn--primary" style="margin-top: 1rem;">
                        <i class="fas fa-arrow-left"></i> Volver al listado
                    </a>
                </div>
            `;
            return;
        }
        
        // 4. Renderizar la página
        renderizarPagina(asignatura);
        
        // 5. Actualizar título de la página
        document.title = `${asignatura.nombre} - BT_Archive`;
        
        console.log(`✅ Asignatura "${asignatura.nombre}" cargada correctamente`);
        
    } catch (error) {
        console.error('Error en la inicialización:', error);
        const container = document.getElementById('asignatura-container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 4rem; color: var(--color-error);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem;"></i>
                    <h2>Error inesperado</h2>
                    <p>${escapeHtml(error.message)}</p>
                </div>
            `;
        }
    }
})();