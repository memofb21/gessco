(function ($) {
    $(document).ready(function () {
        const loader = document.getElementById("loader");
        const contenido = document.getElementById("contenido");

        document.body.classList.add("no-scroll");

        setTimeout(() => {
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
                contenido.style.opacity = "1";
                document.body.classList.remove("no-scroll");

                iniciarAnimaciones();
                iniciarScrollStory();
            }, 600);
        }, 5000);
    });



            function iniciarAnimaciones() {
                const titulo = document.querySelectorAll(".titulo-animado");
                const descripcion = document.querySelectorAll(".descripcion-animada");
                const contador = document.querySelector(".hero-contador");
                const esTelefono = window.matchMedia("(max-width: 767px)").matches;
                gsap.set(titulo, { opacity: 0, y: 80, visibility: "visible" });
                gsap.set(descripcion, { opacity: 0, y: 80 });
                document.body.style.overflow = "hidden";
                const intro = gsap.timeline()
                    .to(titulo, {
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out"
                    })
                    .to(titulo, {
                        y: esTelefono ? -160 : 0,
                        duration: 1.2,
                        ease: "power2.out"
                    })
                    .to(
                        ".overlayNegro",
                        {
                            opacity: 0,
                            duration: 1,
                            ease: "power1.out"
                        },
                        "-=1.2"
                    )
                    .to(
                        descripcion,
                        {
                            opacity: 0,
                            duration: 1.5,
                            ease: "power3.inOut"
                        },
                        "-=3.1"
                    )
                    // Tweens diferentes según dispositivo
                    if (esTelefono) {
                        // Móvil: fromTo con immediateRender para posicion inicial
                        intro.fromTo(descripcion,
                            { opacity: 0, y: -170 },
                            { opacity: 1, y: -170, duration: 1, ease: "power2.inOut", immediateRender: true },
                            "-=0.5"
                        )
                        // Animación inicial del contador: deslizar desde abajo + opacidad
                        .fromTo(contador,
                            { opacity: 0, y: 100 },
                            { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
                            "-=0.5"
                        )
                        .call(() => {
                            document.body.style.overflow = "auto";
                        });
                    } else {
                        // Desktop: to normal
                        intro.to(descripcion, {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: "power2.inOut"
                        }, "-=0.5").call(() => {
                            document.body.style.overflow = "auto";
                        });
                    }
            }


        function iniciarScrollStory(){

        gsap.registerPlugin(ScrollTrigger);
        const titulo = document.querySelector(".hero-titulo");
        const descripcion = document.querySelectorAll(".descripcion-animada");
        const contador = document.querySelector(".hero-contador");

        const esTelefono = window.matchMedia("(max-width: 767px)").matches;
        
        // En móvil no usar ScrollTrigger, ya está todo en iniciarAnimaciones
        if (esTelefono) {
            return;
        }

        const tlScroll = gsap.timeline({
            scrollTrigger:{
                trigger:"#home",
                start:"top top",
                end: esTelefono ? "+=5%" : "+=120%",
                scrub:1,
                pin: esTelefono ? false : true,  // 👈 AQUÍ EL CAMBIO
                anticipatePin:1,
            }
        });

        tlScroll
        .to(titulo,{
        y: esTelefono ? -35 : -78,
        scale: esTelefono ? 0.65 : 0.5
        },0)

        .fromTo(descripcion,
        { opacity:1, y:0 },
        { opacity:0, y:-20},
        0)

        .to(contador,{
        opacity:1,
        scale:1
        },0.3);

        }

    

    // Navbar on scrolling
    let navbarVisible = false;
    $(window).scroll(function () {
        if ($(this).scrollTop() > 700) {
            if (!navbarVisible) {
                navbarVisible = true;
                $('.navbar').css('display', 'flex');
                requestAnimationFrame(function() {
                    $('.navbar').addClass('visible');
                });
            }
        } else {
            if (navbarVisible) {
                navbarVisible = false;
                $('.navbar').removeClass('visible');
                setTimeout(function() {
                    $('.navbar').css('display', 'none');
                }, 800);
            }
        }
    });

    // Contador on scrolling (solo móvil)
    let scrollTimeout;
    let contadorPinned = false;
    let pinnedTop = 0;
    $(window).scroll(function () {
        const esTelefono = window.matchMedia("(max-width: 767px)").matches;
        if (esTelefono) {
            const scrollTop = $(this).scrollTop();
            const windowHeight = $(window).height();
            const footerElement = $('.container-fluid.bg-dark.text-white').last();
            const footerHeight = footerElement.length ? footerElement.outerHeight() : 0;
            const footerOffset = footerElement.length ? footerElement.offset().top : $(document).height();
            const distanceToFooter = footerOffset - (scrollTop + windowHeight);
            const contadorHeight = $('.hero-contador').outerHeight() || 150;

            // Si el footer es visible y el contador no está fijado, fijarlo en posición absolute
            if (distanceToFooter < 0 && !contadorPinned) {
                contadorPinned = true;
                // Fijar el contador a 50px encima del footer (posición constante)
                pinnedTop = footerOffset - contadorHeight - 0;
                $('.hero-contador').css({
                    'position': 'absolute',
                    'top': pinnedTop + 'px',
                    'bottom': 'auto',
                    'z-index': 10001
                });
            } else if (distanceToFooter >= 0 && contadorPinned) {
                // Si el footer ya no es visible, volver a position fixed
                contadorPinned = false;
                $('.hero-contador').css({
                    'position': 'fixed',
                    'bottom': '0',
                    'top': 'auto',
                    'z-index': 9999
                });
            }

            // Mostrar contador al hacer scroll
            if (scrollTop > 700) {
                $('.hero-contador').fadeIn(800);
                $('.back-to-top-animated').addClass('contador-visible');
            } else if (scrollTop < 600) {
                // Ocultar contador cuando regresa a la parte inicial (con hysteresis)
                $('.hero-contador').fadeOut(800);
                $('.back-to-top-animated').removeClass('contador-visible');
                clearTimeout(scrollTimeout); // Cancelar el timeout de inactividad
                return; // No ejecutar el timeout de inactividad
            }

            // Limpiar timeout anterior
            clearTimeout(scrollTimeout);

            // Ocultar contador después de 3 segundos de inactividad
            scrollTimeout = setTimeout(function() {
                $('.hero-contador').fadeOut(800);
                $('.back-to-top-animated').removeClass('contador-visible');
            }, 3000);
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $(".btn-play").click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $("#videoModal").on("shown.bs.modal", function (e) {
            $("#video").attr(
                "src",
                $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
            );
        });

        $("#videoModal").on("hide.bs.modal", function (e) {
            $("#video").attr("src", $videoSrc);
        });
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });
    function iniciarContador() {
        const fechaBoda = new Date("2026-09-26T15:30:00-06:00");

        function actualizar() {
            const ahora = new Date();
            const diferencia = fechaBoda - ahora;

            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor(
                (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

            document.getElementById("dias").textContent = dias;
            document.getElementById("horas").textContent = horas;
            document.getElementById("minutos").textContent = minutos;
        }

        actualizar();
        setInterval(actualizar, 60000);
    }

    iniciarContador();
})(jQuery);

