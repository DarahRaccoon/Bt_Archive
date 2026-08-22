// 0_js/extras-loader.js

// Mapeo de categorías a archivos JSON
const CATEGORIAS = {
    'buscadores': 'buscadores.json',
    'bases-datos': 'bases_datos.json',
    'imagenes': 'imagenes.json',
    'software': 'software.json',
    'simuladores': 'simuladores.json',
    'creadores': 'creadores.json',
    'videos': 'videos.json'
};

// Nombres amigables para las categorías (para la URL)
const CATEGORIA_NOMBRES = {
    'buscadores': 'Buscadores',
    'bases-datos': 'Bases de datos',
    'imagenes': 'Bancos de imágenes',
    'software': 'Software',
    'simuladores': 'Simuladores',
    'creadores': 'Creadores de contenido',
    'videos': 'Videos selectos'
};

// Íconos por categoría
const CATEGORIA_ICONOS = {
    'buscadores': 'fa-magnifying-glass',
    'bases-datos': 'fa-database',
    'imagenes': 'fa-images',
    'software': 'fa-laptop-code',
    'simuladores': 'fa-gears',
    'creadores': 'fa-person-chalkboard',
    'videos': 'fa-youtube'
};

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
        const response = await fetch(`../0_js/extras/${CATEGORIAS[categoriaKey]}`);
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
    const container = document.getElementById('extras-content');
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
    
    // Si la categoría es "videos", usar un renderizado especial con iframes
    const esVideos = categoriaKey === 'videos';
    
    let itemsHTML = data.items.map(item => {
        if (esVideos) {
            return `
                <div class="category-card">
                    <div class="category-card__video">
                        <iframe src="https://www.youtube.com/embed/${item.videoId}" 
                                title="${escapeHtml(item.nombre)}"
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerpolicy="strict-origin-when-cross-origin" 
                                allowfullscreen>
                        </iframe>
                    </div>
                    <h3 class="category-card__nombre">
                        <a href="${item.url}" target="_blank">${escapeHtml(item.nombre)} <i class="fa-solid fa-up-right-from-square" style="font-size:0.7rem;"></i></a>
                    </h3>
                    <p class="category-card__descripcion">${escapeHtml(item.descripcion)}</p>
                    <div class="category-card__etiquetas">
                        ${item.etiquetas.map(et => `<span class="category-card__etiqueta">${escapeHtml(et)}</span>`).join('')}
                    </div>
                </div>
            `;
        }
        
        // Renderizado normal con imagen
        return `
            <div class="category-card">
                <div class="category-card__image">
                    <img src="${item.imagen}" alt="${escapeHtml(item.nombre)}" loading="lazy">
                </div>
                <h3 class="category-card__nombre">
                    <a href="${item.url}" target="_blank">${escapeHtml(item.nombre)} <i class="fa-solid fa-up-right-from-square" style="font-size:0.7rem;"></i></a>
                </h3>
                <p class="category-card__descripcion">${escapeHtml(item.descripcion)}</p>
                <div class="category-card__etiquetas">
                    ${item.etiquetas.map(et => `<span class="category-card__etiqueta">${escapeHtml(et)}</span>`).join('')}
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
        <div class="category-grid">
            ${itemsHTML}
        </div>
    `;
}

/**
 * Maneja la selección de una categoría desde el sidebar
 */
async function seleccionarCategoria(categoriaKey, updateUrl = true) {
    // Actualizar estado visual del sidebar
    document.querySelectorAll('#extras-sidebar-list .sidebar__item').forEach(el => {
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
    const sidebar = document.getElementById('extras-sidebar-list');
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
    
    let categoriaInicial = categoriaParam || 'buscadores';
    
    // Validar que la categoría exista
    if (!CATEGORIA_NOMBRES[categoriaInicial]) {
        categoriaInicial = 'buscadores';
    }
    
    // Cargar la categoría inicial
    await seleccionarCategoria(categoriaInicial, false);
    
    // Manejar navegación con el historial (botones atrás/adelante)
    window.addEventListener('popstate', async function(event) {
        const state = event.state;
        if (state && state.categoria && CATEGORIA_NOMBRES[state.categoria]) {
            await seleccionarCategoria(state.categoria, false);
        } else {
            // Si no hay estado, intentar leer de la URL
            const params = new URLSearchParams(window.location.search);
            const cat = params.get('categoria');
            if (cat && CATEGORIA_NOMBRES[cat]) {
                await seleccionarCategoria(cat, false);
            }
        }
    });
});