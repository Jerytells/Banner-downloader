document.addEventListener("DOMContentLoaded", () => {
    const loaderWrapper = document.getElementById("loader-wrapper");
    const mainContent = document.getElementById("main-content");
    
    // 1. Lógica del loader: espera 3 segundos y luego lo oculta
    setTimeout(() => {
        loaderWrapper.classList.add("fade-out");
        setTimeout(() => {
            loaderWrapper.classList.add("hidden");
            mainContent.classList.remove("hidden");
        }, 500);
    }, 3000); 

    // 2. Lógica de selección y descarga
    const playerSelect = document.getElementById("player-select");
    const downloadBtn = document.getElementById("download-btn");
    const previewImage = document.getElementById("banner-preview");
    const defaultGallery = document.getElementById("default-gallery");
    const previewContainer = document.getElementById("preview-container");

    // Elementos del Custom Dropdown
    const dropdownSelected = document.getElementById("dropdown-selected");
    const dropdownOptions = document.getElementById("dropdown-options");
    const dropdownText = document.getElementById("dropdown-text");
    const dropdownOptionsList = document.querySelectorAll(".dropdown-option");

    // Banners disponibles
    const banners = {
        "top1": "assets/Zephyr - 1.png",
        "top2": "assets/Hal  - 2.png",
        "top3": "assets/Dest - 3.png",
        "top4": "assets/WilsonMC - 4.png",
        "top5": "assets/SavsxZ - 5.png",
        "top6": "assets/Xpr0ShaderX GD - 6.png",
        "top7": "assets/Lestram - 7.png",
        "top8": "assets/Jdap18 - 8.png",
        "top9": "assets/CesarGDD - 9.png",
        "top10": "assets/SrSillir - 10.png",
        "top11": "assets/Daniel - 11.png",
        "top12": "assets/Benji - 12.png",
        "top13": "assets/AndresGaming - 13.png",
        "top14": "assets/Kuzz - 14.png"
    };

    // Función para actualizar la vista según la selección
    function updateSelection(selectedPlayer) {
        if (selectedPlayer && banners[selectedPlayer]) {
            const imageUrl = banners[selectedPlayer];
            
            // Mostrar la imagen grande
            previewImage.src = imageUrl;
            previewImage.classList.remove("hidden");
            
            // Ocultar la galería por defecto
            if (defaultGallery) defaultGallery.classList.add("hidden");
            
            previewContainer.classList.remove("empty");
            downloadBtn.disabled = false;
            
            // Sincronizar el valor interno
            playerSelect.value = selectedPlayer;

            // Sincronizar el texto del dropdown visual
            const selectedOption = document.querySelector(`.dropdown-option[data-value="${selectedPlayer}"]`);
            if (selectedOption) dropdownText.textContent = selectedOption.textContent;

        } else {
            // Estado vacío / por defecto
            previewImage.classList.add("hidden");
            previewImage.src = "";
            
            // Mostrar la galería
            if (defaultGallery) defaultGallery.classList.remove("hidden");
            
            previewContainer.classList.add("empty");
            downloadBtn.disabled = true;
            playerSelect.value = "";
            dropdownText.textContent = "Selecciona un banner";
        }
    }

    // --- LÓGICA DEL CUSTOM DROPDOWN ---

    // Abrir/Cerrar dropdown
    dropdownSelected.addEventListener("click", () => {
        dropdownOptions.classList.toggle("hidden");
        dropdownSelected.classList.toggle("active");
    });

    // Cerrar si se hace click fuera
    document.addEventListener("click", (e) => {
        if (!dropdownSelected.contains(e.target) && !dropdownOptions.contains(e.target)) {
            dropdownOptions.classList.add("hidden");
            dropdownSelected.classList.remove("active");
        }
    });

    // Seleccionar opción del dropdown
    dropdownOptionsList.forEach(option => {
        option.addEventListener("click", () => {
            const value = option.getAttribute("data-value");
            updateSelection(value);
            dropdownOptions.classList.add("hidden");
            dropdownSelected.classList.remove("active");
        });
    });

    // Cuando el usuario hace click en una imagen de la galería...
    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const value = item.getAttribute("data-value");
            updateSelection(value);
        });
    });

    // Cuando el usuario hace clic en descargar...
    downloadBtn.addEventListener("click", () => {
        const selectedPlayer = playerSelect.value;
        if (selectedPlayer && banners[selectedPlayer]) {
            const imageUrl = banners[selectedPlayer];
            
            const enlaceVirtual = document.createElement("a");
            enlaceVirtual.href = imageUrl;
            enlaceVirtual.download = `Banner_Hardest_${selectedPlayer}.png`; 
            
            document.body.appendChild(enlaceVirtual);
            enlaceVirtual.click();
            document.body.removeChild(enlaceVirtual);
        }
    });
});