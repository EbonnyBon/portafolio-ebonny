document.addEventListener('DOMContentLoaded', () => {
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
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // --- LÓGICA DE HOVER PARA VIDEOS EN LA CUADRÍCULA ---
    const gridVideos = document.querySelectorAll('.gallery video');
    gridVideos.forEach(vid => {
        // Quitamos los controles en la cuadrícula para que se vea súper limpio
        vid.removeAttribute('controls');
        vid.muted = true; // El autoplay requiere que esté en silencio
        vid.loop = true;  // Que se repita mientras el mouse esté encima

        // Al poner el mouse, se reproduce
        vid.addEventListener('mouseenter', () => {
            vid.play();
        });
        
        // Al quitar el mouse, se pausa
        vid.addEventListener('mouseleave', () => {
            vid.pause();
        });
    });

    // --- LÓGICA DEL POP-UP (MODAL) PARA IMÁGENES Y VIDEOS ---
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const modalVid = document.getElementById("vid01");
    const closeBtn = document.querySelector(".close-modal");

    // Seleccionamos absolutamente todo (imágenes y videos)
    const galleryMedia = document.querySelectorAll('.item.posts img, .item.expodev video, .item.videos video');

    galleryMedia.forEach(media => {
        // Ponemos el cursor de "manita" para que sepan que es clickeable
        media.style.cursor = 'pointer';

        media.addEventListener('click', function() {
            modal.style.display = "flex";
            modal.style.justifyContent = "center";
            modal.style.alignItems = "center";

            if (this.tagName === 'IMG') {
                // Si es imagen, mostramos la imagen y ocultamos el video
                modalImg.style.display = "block";
                modalVid.style.display = "none";
                modalVid.pause(); 
                modalImg.src = this.src;
            } else if (this.tagName === 'VIDEO') {
                // Si es video, mostramos el video y ocultamos la imagen
                modalVid.style.display = "block";
                modalImg.style.display = "none";
                
                // Extraemos la ruta del video y la reproducimos con sonido
                const source = this.querySelector('source').src;
                modalVid.src = source;
                modalVid.muted = false; 
                modalVid.play();
            }
        });
    });

    // Función para cerrar todo y pausar el video
    function closeModal() {
        modal.style.display = "none";
        modalVid.pause(); 
        modalVid.currentTime = 0; // Regresa el video al inicio
    }

    // Cerrar con la X
    closeBtn.addEventListener('click', closeModal);

    // Cerrar al picar el fondo negro
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });
});