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

                gsap.set(titulo, { opacity: 0, y: 80, visibility: "visible" });
                gsap.set(descripcion, { opacity: 0, y: 80 });

                const intro = gsap.timeline()
                    .to(titulo, {
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out"
                    })
                    .to(titulo, {
                        y: 0,
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
                    .to(descripcion, {
                        opacity: 1,
                        duration: 1,
                        ease: "power2.inOut"
                    }, "-=0.5")
            }


        function iniciarScrollStory(){

        gsap.registerPlugin(ScrollTrigger);
        const titulo = document.querySelector(".hero-titulo");
        const descripcion = document.querySelectorAll(".descripcion-animada");
        const contador = document.querySelector(".hero-contador");

        const esTelefono = window.matchMedia("(max-width: 575px)").matches;

        const tlScroll = gsap.timeline({
            scrollTrigger:{
                trigger:"#home",
                start:"top top",
                end: esTelefono ? "+=250%" : "+=120%",
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
    $(window).scroll(function () {
        if ($(this).scrollTop() > 700) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
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

