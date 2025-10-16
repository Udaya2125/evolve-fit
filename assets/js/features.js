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

    // --- GSAP SCROLL-TRIGGERED ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);

    // Animate header
    const heroTimeline = gsap.timeline();
    heroTimeline
        .to(".features-header .char", {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.8,
            ease: "power3.out",
        });

    // Select all feature sections
    const featureSections = document.querySelectorAll('.feature-section');

    // Create a scroll-triggered animation for each section
    featureSections.forEach(section => {
        const imageHolder = section.querySelector('.image-holder');
        const textContent = section.querySelector('.text-column');

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 60%', // Animation starts when the top of the section is 60% from the top of the viewport
                toggleActions: 'play none none none', // Play the animation once when it enters
            }
        });

        // Animate the image holder (slide in from right and fade in)
        timeline.to(imageHolder, {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out'
        });

        // Animate the text content (fade in)
        timeline.to(textContent, {
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out'
        }, '<=0.2'); // Start this animation 0.2s after the previous one starts
    });

    // 3D Tilt Effect for Feature Images
    featureSections.forEach(section => {
        const imageHolder = section.querySelector('.image-holder');

        section.addEventListener('mousemove', (e) => {
            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8; // Max rotation 8 degrees
            const rotateY = ((x - centerX) / centerX) * 8; // Max rotation 8 degrees

            // Get the original transform from the timeline
            const originalTransform = gsap.getProperty(imageHolder, "transform");

            gsap.to(imageHolder, {
                rotationX: rotateX,
                rotationY: rotateY,
                scale: 1.05,
                boxShadow: "0px 20px 40px -10px rgba(255,255,255,0.15)",
                ease: "power3.out",
                duration: 1
            });
        });

        section.addEventListener('mouseleave', () => {
            gsap.to(imageHolder, {
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                boxShadow: "0 0 0px rgba(255,255,255,0)",
                ease: "power3.out",
                duration: 1
            });
        });
    });
});
