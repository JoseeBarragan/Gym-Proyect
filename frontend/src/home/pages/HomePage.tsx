import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gymImage from '../../../assets/gymPicture.png';
import '../../home/home.css';

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: 'power3.out' });

const memberships = [
  {
    name: 'Básico',
    price: '29.99',
    features: ['Acceso a gym', 'Horario limitado', 'Casilleros básicos'],
    cta: 'Elegir Básico',
  },
  {
    name: 'Pro',
    price: '49.99',
    features: ['Acceso 24/7', 'Clases grupales', 'Entrenador personal', 'Toallas incluidas'],
    cta: 'Elegir Pro',
    popular: true,
  },
  {
    name: 'Premium',
    price: '79.99',
    features: ['Todo incluido', 'Nutricionista', 'Spa y sauna', 'Estacionamiento'],
    cta: 'Elegir Premium',
  },
];

const classes = [
  { name: 'Spinning', time: 'Lun - Mie - Vie | 18:00', instructor: 'Carlos R.' },
  { name: 'Yoga', time: 'Mar - Jue | 07:00', instructor: 'Ana M.' },
  { name: 'Funcional', time: 'Lun - Mie - Vie | 07:00', instructor: 'Pedro S.' },
  { name: 'Boxeo', time: 'Mar - Jue | 19:00', instructor: 'Lucía F.' },
];

const testimonials = [
  {
    name: 'María González',
    quote: 'El mejor gym de la ciudad. Instalaciones increíbles y entrenadores de primera.',
    avatar: 'MG',
  },
  {
    name: 'Carlos Rodríguez',
    quote: 'Las clases grupales son excelentes. Muy recomendado para todos los niveles.',
    avatar: 'CR',
  },
  {
    name: 'Ana Martínez',
    quote: 'Ambiente motivador y equipamiento de última generación. ¡Me encanta!',
    avatar: 'AM',
  },
];

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const titleWordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleText = 'TRANSFORMA TU CUERPO';
      const words = titleText.split(' ');
      const wordElements: HTMLSpanElement[] = [];
      
      if (titleRef.current) {
        titleRef.current.innerHTML = '';
        words.forEach((word, wordIndex) => {
          const wordSpan = document.createElement('span');
          wordSpan.style.display = 'inline-block';
          wordSpan.style.marginRight = wordIndex < words.length - 1 ? '0.3em' : '0';
          
          const letters = word.split('').map((letter) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(60px) rotateX(90deg)';
            span.style.transformOrigin = 'center bottom';
            span.style.whiteSpace = 'nowrap';
            titleWordsRef.current.push(span);
            wordSpan.appendChild(span);
            return span;
          });
          
          titleRef.current?.appendChild(wordSpan);
          wordElements.push(...letters);
        });
      }

      const tl = gsap.timeline({ delay: 0.3 });
      
      tl.to(titleWordsRef.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.03,
        ease: 'back.out(1.7)',
      })
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power4.out' },
          '-=0.2'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.8, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${gymImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 md:mb-6 tracking-tight"
          style={{ textShadow: '0 4px 30px rgba(59, 130, 246, 0.3)', whiteSpace: 'nowrap' }}
        />
        <p
          ref={subtitleRef}
          className="text-lg md:text-2xl text-gray-300 mb-8 md:mb-10 font-light"
        >
          Entrena con los mejores profesionales y alcanza tus objetivos
        </p>
        <button
          ref={ctaRef}
          className="group inline-flex flex-col items-center gap-1 sm:gap-2 bg-transparent text-white font-bold py-2 px-4 sm:py-4 sm:px-8 rounded-full"
          onClick={() => {
            const membresiasSection = document.getElementById('membresias');
            if (membresiasSection) {
              membresiasSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >
          <span className="text-center text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg">Ver Membresías</span>
          <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center">
            <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        '.feature-card',
        { 
          opacity: 0, 
          y: 80,
          scale: 0.9,
          rotateX: 15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power4.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: 'Clases Grupales',
      description: 'Variedad de clases para todos los niveles y objetivos.',
      icon: '🏋️',
      gradient: 'from-blue-600/20 to-cyan-600/20',
    },
    {
      title: 'Equipamiento Moderno',
      description: 'Máquinas de última generación para tu entrenamiento.',
      icon: '💪',
      gradient: 'from-purple-600/20 to-pink-600/20',
    },
    {
      title: 'Instructores Certificados',
      description: 'Profesionales dedicados a tu progreso.',
      icon: '🎯',
      gradient: 'from-green-600/20 to-emerald-600/20',
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#0a0a0a] px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          ¿Por qué elegirnos?
        </h2>
        <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-cyan-600 mx-auto mb-12 rounded-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card group bg-[#111111]/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-blue-600 transition-all duration-500 overflow-hidden relative`}
            >
              <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="text-4xl md:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MembershipsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        '.membership-card',
        { 
          opacity: 0, 
          scale: 0.7,
          rotateY: 15,
          z: -100,
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          z: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power4.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#111111] px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Membresías
        </h2>
        <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-cyan-600 mx-auto mb-4 rounded-full" />
        <p className="text-gray-400 text-center mb-12 text-lg">
          Elige el plan perfecto para ti
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {memberships.map((membership, index) => (
            <div
              key={index}
              className={`membership-card group bg-[#0a0a0a]/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-blue-600 shadow-lg shadow-blue-600/20 relative transition-all duration-500 hover:scale-[1.03] hover:border-blue-600/60 overflow-hidden`}
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10">
                {membership.name}
              </h3>
              <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 relative z-10">
                ${membership.price}
                <span className="text-base md:text-lg text-gray-400 font-normal">/mes</span>
              </div>
              <ul className="mb-8 space-y-3 relative z-10">
                {membership.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-300 flex items-center gap-2">
                    <span className="text-green-500 shrink-0">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 rounded-xl transition-all duration-300 relative z-10 group-hover:shadow-lg group-hover:shadow-blue-600/30">
                {membership.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClassesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const isEven = i % 2 === 0;
        tl.fromTo(
          card,
          {
            opacity: 0,
            x: isEven ? -100 : 100,
            rotate: isEven ? -10 : 10,
            scale: 0.8,
          },
          {
            opacity: 1,
            x: 0,
            rotate: 0,
            scale: 1,
            duration: 1,
            ease: 'elastic.out(1, 0.6)',
          },
          i * 0.15
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#0a0a0a] px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(139,92,246,0.1),transparent_50%)]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Nuestras Clases
        </h2>
        <div className="w-24 h-1 bg-linear-to-r from-purple-600 to-pink-600 mx-auto mb-4 rounded-full" />
        <p className="text-gray-400 text-center mb-12 text-lg">
          Encuentra la clase perfecta para tu rutina
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {classes.map((cls, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="class-card group bg-[#111111]/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-purple-600 transition-all duration-500 overflow-hidden"
            >
              <div className="h-40 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden group-hover:shadow-lg group-hover:shadow-purple-600/30 transition-shadow duration-500">
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-4xl class-icon transform transition-transform duration-300">
                  {cls.name === 'Spinning' && '🚴'}
                  {cls.name === 'Yoga' && '🧘'}
                  {cls.name === 'Funcional' && '💪'}
                  {cls.name === 'Boxeo' && '🥊'}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">{cls.name}</h3>
              <p className="text-gray-400 text-sm mb-1">{cls.time}</p>
              <p className="text-gray-500 text-sm">con {cls.instructor}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        '.testimonial-card',
        { 
          opacity: 0,
          y: 60,
          rotateX: 20,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1,
          stagger: 0.25,
          ease: 'power4.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#111111] px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08),transparent_60%)]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Testimonios
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-4 rounded-full" />
        <p className="text-gray-400 text-center mb-12 text-lg">
          Lo que dicen nuestros miembros
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card group bg-[#0a0a0a]/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-purple-600/60 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-purple-600/40 transition-shadow duration-500">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">Miembro desde 2023</p>
                  </div>
                </div>
                <p className="text-gray-300 italic relative">
                  <span className="text-4xl text-purple-600/30 absolute -top-4 -left-2">"</span>
                  {testimonial.quote}
                  <span className="text-4xl text-purple-600/30 absolute -bottom-6 right-2">"</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">PowerGym</h3>
            <p className="text-gray-400 text-sm">
              Tu gimnasio de confianza para alcanzar tus metas fitness.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Membresías
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Clases
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 4.03-6.98 8.388-.058 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 4.029 6.78 8.388 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-4.029 6.979-8.388.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-4.026-6.78-8.387-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.163-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.756-1.653-2.051-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.439-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">© 2024 PowerGym. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export function HomePage() {
  return (
    <div className="gym-home-page bg-[#0a0a0a] min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <div id="membresias" />
      <MembershipsSection />
      <ClassesSection />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
}
