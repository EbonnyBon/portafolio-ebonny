document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. FILTROS ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => { item.style.opacity = '1'; }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // --- 2. MODAL PARA POSTS Y YOUTUBE ---
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const modalIframe = document.getElementById("ytIframe");
    const closeBtn = document.querySelector(".close-modal");

    const galleryPosts = document.querySelectorAll('.post-img');
    const galleryVideos = document.querySelectorAll('.vid-thumb');

    // Función para apagar todo al cerrar
    function closeModal() {
        modal.style.display = "none";
        modalIframe.src = ""; // Esto detiene el video de YouTube
    }

    // Al hacer clic en un Post (Imagen)
    galleryPosts.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            modal.style.display = "flex";
            modal.style.justifyContent = "center";
            modal.style.alignItems = "center";
            
            modalImg.style.display = "block";
            modalIframe.style.display = "none";
            modalImg.src = this.src;
        });
    });

    // Al hacer clic en un Video (YouTube)
    galleryVideos.forEach(vid => {
        vid.style.cursor = 'pointer';
        vid.addEventListener('click', function() {
            modal.style.display = "flex";
            modal.style.justifyContent = "center";
            modal.style.alignItems = "center";

            modalIframe.style.display = "block";
            modalImg.style.display = "none";
            
            const ytId = this.getAttribute('data-youtube-id');
            // Le pasamos la ruta con autoplay
            modalIframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1`;
        });
    });

    // Cerrar modal
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // --- 3. LÓGICA DE BOTONES DE NAVEGACIÓN (MENÚ ARRIBA) ---
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Le quitamos el relleno rosa a todos los botones de arriba
            navLinks.forEach(nav => nav.classList.remove('active'));
            // Se lo ponemos solo al que le acabas de dar clic
            link.classList.add('active');
        });
    });
});