// 0_js/recursos-loader.js

// Mapeo de categorías a archivos JSON
const CATEGORIAS = {
    'manuales': 'manuales.json',
    'proyectos': 'proyectos.json',
    'bibliotecas': 'bibliotecas.json'
};

// Nombres amigables para las categorías
const CATEGORIA_NOMBRES = {
    'manuales': 'Manuales',
    'proyectos': 'Proyectos',
    'bibliotecas': 'Bibliotecas'
};

// Íconos por categoría
const CATEGORIA_ICONOS = {
    'manuales': 'fa-book',
    'proyectos': 'fa-flask',
    'bibliotecas': 'fa-book-open'
};

// Categorías que usan layout horizontal (una por renglón)
const CATEGORIAS_HORIZONTALES = ['manuales', 'proyectos'];

let datosCargados = {};
let categoriaActual = null;

/**
 * Carga un archivo JSON y lo almacena en caché
 */
async function cargarCategoria(categoriaKey) {
    if (datosCargados[categoriaKey]) {
        return datosCargados[categoriaKey];
    }
    
    try {
        const response = await fetch(`../0_js/recursos/${CATEGORIAS[categoriaKey]}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        datosCargados[categoriaKey] = data;
        return data;
    } catch (error) {
        console.error(`Error cargando ${categoriaKey}:`, error);
        return null;
    }
}

/**
 * Renderiza los items de una categoría en el contenido
 */
function renderizarCategoria(data, categoriaKey) {
    const container = document.getElementById('recursos-content');
    if (!data) {
        container.innerHTML = `
            <div class="main-content__header">
                <h2 class="main-content__title">
                    <i class="fas ${CATEGORIA_ICONOS[categoriaKey] || 'fa-folder-open'}"></i>
                    ${CATEGORIA_NOMBRES[categoriaKey] || categoriaKey}
                </h2>
                <p class="main-content__descripcion">Error al cargar los datos. Por favor, recarga la página.</p>
            </div>
        `;
        return;
    }
    
    // Determinar si es horizontal (manuales o proyectos)
    const esHorizontal = CATEGORIAS_HORIZONTALES.includes(categoriaKey);
    
    // Clases según el tipo
    const cardClass = esHorizontal ? 'category-card--horizontal' : 'category-card';
    const gridClass = esHorizontal ? 'category-grid--horizontal' : 'category-grid';
    
    let itemsHTML = data.items.map(item => {
        // Para horizontales, usamos grid-template-columns con imagen a la izquierda
        return `
            <div class="${cardClass}">
                <div class="category-card__image">
                    <img src="${item.imagen}" alt="${escapeHtml(item.nombre)}" loading="lazy" onerror="this.src='https://img.icons8.com/color/96/000000/document.png'">
                </div>
                <div class="category-card__body">
                    <h3 class="category-card__nombre">
                        <a href="${item.url}" target="_blank">${escapeHtml(item.nombre)} <i class="fa-solid fa-up-right-from-square" style="font-size:0.7rem;"></i></a>
                    </h3>
                    <p class="category-card__descripcion">${escapeHtml(item.descripcion)}</p>
                    <div class="category-card__etiquetas">
                        ${item.etiquetas.map(et => `<span class="category-card__etiqueta">${escapeHtml(et)}</span>`).join('')}
                    </div>
                    ${item.url && item.url !== '#' ? `
                        <div class="category-card__footer">
                            <a href="${item.url}" class="btn btn--primary btn--smaller" target="_blank">
                                <i class="fas fa-door-open"></i> Abrir
                            </a>
                            <a href="${item.url}" class="btn btn--secondary btn--smaller" download>
                                <i class="fas fa-download"></i> Descargar
                            </a>
                        </div>
                    ` : `
                        <div class="category-card__footer">
                            <span class="category-card__badge">Próximamente</span>
                        </div>
                    `}
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = `
        <div class="main-content__header">
            <h2 class="main-content__title">
                <i class="fas ${CATEGORIA_ICONOS[categoriaKey] || 'fa-folder-open'}"></i>
                ${escapeHtml(data.categoria)}
            </h2>
            <p class="main-content__descripcion">${escapeHtml(data.descripcion)}</p>
        </div>
        <div class="${gridClass}">
            ${itemsHTML}
        </div>
    `;
}

/**
 * Maneja la selección de una categoría desde el sidebar
 */
async function seleccionarCategoria(categoriaKey, updateUrl = true) {
    // Actualizar estado visual del sidebar
    document.querySelectorAll('#recursos-sidebar-list .sidebar__item').forEach(el => {
        el.classList.toggle('sidebar__item--active', el.dataset.categoria === categoriaKey);
    });
    
    categoriaActual = categoriaKey;
    
    // Actualizar URL si se solicita
    if (updateUrl && window.history && window.history.pushState) {
        const url = new URL(window.location);
        url.searchParams.set('categoria', categoriaKey);
        window.history.pushState({ categoria: categoriaKey }, '', url);
    }
    
    // Cargar y renderizar datos
    const data = await cargarCategoria(categoriaKey);
    renderizarCategoria(data, categoriaKey);
}

/**
 * Inicializa el sidebar con las categorías
 */
function inicializarSidebar() {
    const sidebar = document.getElementById('recursos-sidebar-list');
    if (!sidebar) return;
    
    // Limpiar sidebar
    sidebar.innerHTML = '';
    
    // Crear items del sidebar
    Object.keys(CATEGORIA_NOMBRES).forEach(key => {
        const li = document.createElement('li');
        li.className = 'sidebar__item';
        li.dataset.categoria = key;
        li.innerHTML = `<i class="fas ${CATEGORIA_ICONOS[key]}"></i> ${CATEGORIA_NOMBRES[key]}`;
        li.addEventListener('click', () => seleccionarCategoria(key));
        sidebar.appendChild(li);
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

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async function() {
    inicializarSidebar();
    
    // Verificar si hay una categoría en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaParam = urlParams.get('categoria');
    
    let categoriaInicial = categoriaParam || 'manuales';
    
    // Validar que la categoría exista
    if (!CATEGORIA_NOMBRES[categoriaInicial]) {
        categoriaInicial = 'manuales';
    }
    
    // Cargar la categoría inicial
    await seleccionarCategoria(categoriaInicial, false);
    
    // Manejar navegación con el historial
    window.addEventListener('popstate', async function(event) {
        const state = event.state;
        if (state && state.categoria && CATEGORIA_NOMBRES[state.categoria]) {
            await seleccionarCategoria(state.categoria, false);
        } else {
            const params = new URLSearchParams(window.location.search);
            const cat = params.get('categoria');
            if (cat && CATEGORIA_NOMBRES[cat]) {
                await seleccionarCategoria(cat, false);
            }
        }
    });
});