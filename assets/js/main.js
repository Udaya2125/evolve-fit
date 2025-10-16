// --- Imports for animations --- //
// import Lenis from '@studio-freight/lenis'
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
    // --- SMOOTH SCROLL INITIALIZATION ---
    const lenis = new Lenis();

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // --- GSAP ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Text Animation
    const heroTimeline = gsap.timeline();
    heroTimeline
        .to(".hero-title .char", {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.8,
            ease: "power3.out",
        })
        .to(".hero-subtitle", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
        }, "-=0.5");

    // 2. Pricing Cards Scroll Animation
    gsap.to(".pricing-card", {
        scrollTrigger: {
            trigger: ".pricing-section",
            start: "top 70%", // When the top of the section hits 70% of the viewport height
            toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
    });

    // 3. Pricing Card Tilt Effect
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10 degrees
            const rotateY = ((x - centerX) / centerX) * 10; // Max rotation 10 degrees

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                scale: 1.05,
                boxShadow: "0px 15px 30px -5px rgba(255,255,255,0.1)",
                ease: "power3.out",
                duration: 1
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                boxShadow: "none",
                ease: "power3.out",
                duration: 1
            });
        });
    });
});
