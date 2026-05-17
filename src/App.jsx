import React, { useState, useEffect, useRef } from 'react';
import { 
  Trash2, Radio, BookOpen, ChevronDown, ChevronUp, Ticket, 
  ShoppingBag, Percent, Video, Menu, MapPin, CheckCircle, 
  Play, Pause, Camera, Clock, ShieldAlert, Zap, Award, Lock, User, Server 
} from 'lucide-react';

// =================================================================
// 0. MAPEO DE ARCHIVOS CORREGIDO ESTRICTAMENTE A .PNG
// =================================================================
const IMAGES = {
  novedades: "/media/Visor Hero Misión Novedades El Plan Maestro.png",
  vidrio: "/media/vibrant-minimalistic-retro-futuristic-animefunk-ae (24).png",
  qr: "/media/vibrant-minimalistic-retro-futuristic-animefunk-ae (4).png",
  mapa: "/media/vibrant-minimalistic-retro-futuristic-animefunk-ae (2).png",
  aula: "/media/vibrant-minimalistic-retro-futuristic-animefunk-ae (7).png",
  enseres: "/media/vibrant-minimalistic-retro-futuristic-animefunk-ae (15).png",
  admin: "/media/vibrant-minimalistic-retro-futuristic-animefunk-ae (22).png",
  video: "/media/vibe-boogie-pop.mp4",
  podcast: "/media/podcast-elda.m4a"
};

const POP_FONT_HEAD = { fontFamily: "'Impact', 'Arial Black', sans-serif", letterSpacing: '3px' };
const POP_FONT_BODY = { fontFamily: "'Courier New', Courier, monospace", fontWeight: 'bold' };

export default function App() {
  // --- ESTADOS DE CONTROL ---
  const [showLogin, setShowLogin] = useState(false);
  const [loginState, setLoginState] = useState('idle');
  const [userRole, setUserRole] = useState('público');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Carrusel de Diapositivas (Misión Novedades)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Simulación de Enseres (72 Horas)
  const [enseres, setEnseres] = useState([
    { id: 1, nombre: "Silla ergonómica de oficina", calle: "Plaza Castelar, 4", horasRestantes: 42, foto: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=400&q=80" },
    { id: 2, nombre: "Mesa de comedor de madera", calle: "Calle Nueva, 28", horasRestantes: 68, foto: "https://images.unsplash.com/photo-1530018607912-eff2df11a3be?auto=format&fit=crop&w=400&q=80" }
  ]);

  // --- REFERENCIAS DE SECCIÓN PARA EL SCROLL ESTILO SPACEX ---
  const sectionRefs = {
    hero: useRef(null),
    vidrio: useRef(null),
    enseres: useRef(null),
    colectivas: useRef(null),
    institucional: useRef(null),
    aula: useRef(null)
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- TEMPORIZADORES ---
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % 3);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const timer = setInterval(() => {
      setEnseres(prev => prev.map(item => ({
        ...item,
        horasRestantes: item.horasRestantes > 0 ? item.horasRestantes - 1 : 0
      })));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const slidesPlanMaestro = [
    { titulo: "MISIÓN 01: MERITOCRACIA POR INGENIERÍA SOCIAL", desc: "El Ayuntamiento inyecta Elda-Coins directamente en la billetera cívica del vecino colaborador." },
    { titulo: "MISIÓN 02: TRAZABILIDAD LER EN CONTENEDORES", desc: "Sistemas informáticos en origen que notifican rutas eficientes al equipo de recogida de Fobesa." },
    { titulo: "MISIÓN 03: RENDIMIENTO DEL CANON (LEY 7/2022)", desc: "Deducción de costes fiscales masivos al desviar la materia orgánica del vertedero de Villena." }
  ];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;

    setLoginState('connecting');
    setTimeout(() => {
      setLoginState('mysql');
      setTimeout(() => {
        setLoginState('validating');
        setTimeout(() => {
          setLoginState('success');
          setTimeout(() => {
            setShowLogin(false);
            setLoginState('idle');
          }, 1200);
        }, 1000);
      }, 1000);
    }, 800);
  };

  const injectCredentials = (role, user, pass) => {
    setUsername(user);
    setPassword(pass);
    setUserRole(role);
  };

  return (
    <div style={{ backgroundColor: '#FAF6EE', color: '#111', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* NAVBAR FLOTANTE PERSISTENTE */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '75px',
        backgroundColor: '#FAF6EE', borderBottom: '4px solid #111',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 30px', zIndex: 1000, boxShadow: '0 4px 0px #111'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => scrollToSection(sectionRefs.hero)}>
          <div style={{ width: '26px', height: '26px', backgroundColor: '#00C853', border: '3px solid #111', boxShadow: '2px 2px 0px #111' }}></div>
          <span style={{ ...POP_FONT_HEAD, fontSize: '1.5rem', textTransform: 'uppercase' }}>Elda Circular Civic OS</span>
        </div>

        <nav style={{ display: 'flex', gap: '15px' }}>
          {Object.keys(sectionRefs).map((key) => (
            <button 
              key={key}
              onClick={() => scrollToSection(sectionRefs[key])} 
              style={{
                backgroundColor: '#FFF', border: '3px solid #111', padding: '6px 12px',
                ...POP_FONT_HEAD, fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase',
                boxShadow: '3px 3px 0px #111'
              }}
            >
              {key === 'hero' ? 'Novedades' : key === 'colectivas' ? 'Empresas' : key === 'institucional' ? 'Ecosistema' : `Misión ${key}`}
            </button>
          ))}
        </nav>

        <div>
          <button 
            onClick={() => setShowLogin(true)} 
            style={{
              backgroundColor: userRole !== 'público' ? '#FFEB3B' : '#111', 
              color: userRole !== 'público' ? '#111' : '#FFF', 
              padding: '10px 20px', border: '3px solid #111', ...POP_FONT_HEAD, fontSize: '0.85rem',
              cursor: 'pointer', textTransform: 'uppercase', boxShadow: '-4px 4px 0px #00C853'
            }}
          >
            {userRole !== 'público' ? `🕹️ ROL: ${userRole.toUpperCase()}` : '🔐 ACCESO OPERATIVO'}
          </button>
        </div>
      </header>

      {/* SECCIONES CONTINUAS DE SCROLL VERTICAL */}
      <main style={{ paddingTop: '75px' }}>

        {/* --- SECCIÓN 1: MISIÓN NOVEDADES --- */}
        <section ref={sectionRefs.hero} style={{ height: 'calc(100vh - 75px)', display: 'flex', flexDirection: 'column', borderBottom: '4px solid #111' }}>
          <div style={{ flex: 1, backgroundColor: '#E0F7FA', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <div style={{ width: '85%', height: '90%', aspectRatio: '16/9', border: '4px solid #111', boxShadow: '10px 10px 0px #111', backgroundImage: `url("${IMAGES.novedades}")`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
              <button 
                onClick={() => setIsPlaying(!isPlaying)} 
                style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: '#FFEB3B', border: '3px solid #111', padding: '12px', cursor: 'pointer', boxShadow: '4px 4px 0px #111' }}
              >
                {isPlaying ? <Pause size={20} color="#111" /> : <Play size={20} color="#111" />}
              </button>
            </div>
          </div>
          <div style={{ height: '200px', backgroundColor: '#FFF', borderTop: '4px solid #111', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ maxWidth: '65%' }}>
              <span style={{ ...POP_FONT_BODY, backgroundColor: '#111', color: '#FFF', padding: '4px 8px' }}>SISTEMA ESTÁTICO DE TRANSPARENCIA CIVIC OS</span>
              <h2 style={{ ...POP_FONT_HEAD, fontSize: '1.9rem', margin: '8px 0', textTransform: 'uppercase' }}>{slidesPlanMaestro[currentSlide].titulo}</h2>
              <p style={{ margin: 0, fontSize: '1.05rem', color: '#333', ...POP_FONT_BODY }}>{slidesPlanMaestro[currentSlide].desc}</p>
            </div>
            <button style={{ backgroundColor: '#00E676', color: '#111', padding: '16px 30px', border: '3px solid #111', ...POP_FONT_HEAD, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '6px 6px 0px #111', textTransform: 'uppercase' }}>
              Explorar Plan Maestro 📑
            </button>
          </div>
        </section>

        {/* --- SECCIÓN 2: MISIÓN VIDRIO --- */}
        <section ref={sectionRefs.vidrio} style={{ height: 'calc(100vh - 75px)', display: 'flex', flexDirection: 'column', borderBottom: '4px solid #111' }}>
          <div style={{ flex: 1, backgroundColor: '#FFF9C4', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <div style={{ width: '85%', height: '90%', aspectRatio: '16/9', border: '4px solid #111', boxShadow: '10px 10px 0px #111', backgroundImage: `url("${IMAGES.vidrio}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          </div>
          <div style={{ height: '200px', backgroundColor: '#FFF', borderTop: '4px solid #111', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ maxWidth: '60%' }}>
              <span style={{ ...POP_FONT_BODY, color: '#D50000', backgroundColor: '#FFEBEE', padding: '4px 8px', border: '1px solid #D50000' }}>⚠️ PASO CRÍTICO: PROHIBIDO METER VIDRIO EN BOLSAS CON QR</span>
              <h2 style={{ ...POP_FONT_HEAD, fontSize: '1.9rem', margin: '8px 0', textTransform: 'uppercase' }}>Iglú Verde Fix & Curvas de Llenado</h2>
              <p style={{ margin: 0, fontSize: '1.05rem', color: '#333', ...POP_FONT_BODY }}>El vidrio se deposita suelto directamente en el iglú. Valida tu check-in los sábados a menos de 5 metros para inyectar +10 Elda-Coins.</p>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ backgroundColor: '#FAF6EE', border: '3px solid #111', padding: '12px', textAlign: 'center', boxShadow: '4px 4px 0px #111', ...POP_FONT_BODY }}>
                <span style={{ fontSize: '1.4rem', color: '#2E7D32', display: 'block' }}>2 Meses</span>
                <span style={{ fontSize: '0.7rem' }}>AHORRO HOSPITALARIO</span>
              </div>
              <button onClick={() => alert("Verificando coordenadas... ¡Éxito! Depósito validado.")} style={{ backgroundColor: '#00B0FF', color: '#FFF', padding: '16px 30px', border: '3px solid #111', ...POP_FONT_HEAD, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '6px 6px 0px #111', textTransform: 'uppercase' }}>
                Validar Ubicación GPS 📍
              </button>
            </div>
          </div>
        </section>

        {/* --- SECCIÓN 3: MISIÓN ENSERES --- */}
        <section ref={sectionRefs.enseres} style={{ height: 'calc(100vh - 75px)', display: 'flex', flexDirection: 'column', borderBottom: '4px solid #111' }}>
          <div style={{ flex: 1, backgroundColor: '#FFCCBC', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <div style={{ width: '85%', height: '90%', aspectRatio: '16/9', border: '4px solid #111', boxShadow: '10px 10px 0px #111', backgroundImage: `url("${IMAGES.enseres}")`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', gap: '25px', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              {enseres.map(item => (
                <div key={item.id} style={{ width: '260px', backgroundColor: '#FFF', border: '4px solid #111', boxShadow: '6px 6px 0px #111', padding: '12px' }}>
                  <div style={{ display: 'flex', justify: 'space-between', marginBottom: '8px', ...POP_FONT_BODY, fontSize: '0.8rem' }}>
                    <span style={{ backgroundColor: '#FF3D00', color: '#FFF', padding: '2px 6px', border: '1px solid #111' }}>⏳ {item.horasRestantes}H REPET</span>
                    <span style={{ color: '#666' }}>ACTIVO</span>
                  </div>
                  <img src={item.foto} alt={item.nombre} style={{ width: '100%', height: '110px', objectFit: 'cover', border: '2px solid #111', marginBottom: '8px' }} />
                  <h4 style={{ ...POP_FONT_HEAD, margin: '0 0 4px 0', fontSize: '1.1rem', textTransform: 'uppercase' }}>{item.nombre}</h4>
                  <span style={{ fontSize: '0.75rem', ...POP_FONT_BODY, color: '#555' }}>📍 {item.calle}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: '200px', backgroundColor: '#FFF', borderTop: '4px solid #111', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ maxWidth: '60%' }}>
              <span style={{ ...POP_FONT_BODY, backgroundColor: '#FF9100', color: '#111', padding: '4px 8px' }}>TABLÓN PÚBLICO CONTRA EL ABANDONO DE VOLUMINOSOS</span>
              <h2 style={{ ...POP_FONT_HEAD, fontSize: '1.9rem', margin: '8px 0', textTransform: 'uppercase' }}>Intercambio e Identificación de Enseres</h2>
              <p style={{ margin: 0, fontSize: '1.05rem', color: '#333', ...POP_FONT_BODY }}>Haz una foto al mueble viejo antes de sacarlo. Estará expuesto 72 horas en el tablón municipal para fomentar su adopción vecinal y evitar residuos.</p>
            </div>
            <button onClick={() => alert("Abriendo cámara simulada...")} style={{ backgroundColor: '#FF6E40', color: '#FFF', padding: '16px 30px', border: '3px solid #111', ...POP_FONT_HEAD, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '6px 6px 0px #111', textTransform: 'uppercase' }}>
              📷 Publicar Nuevo Ensere
            </button>
          </div>
        </section>

        {/* --- SECCIÓN 4: SOLUCIONES COLECTIVAS --- */}
        <section ref={sectionRefs.colectivas} style={{ height: 'calc(100vh - 75px)', display: 'flex', flexDirection: 'column', borderBottom: '4px solid #111' }}>
          <div style={{ flex: 1, backgroundColor: '#E1BEE7', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <div style={{ width: '85%', height: '90%', aspectRatio: '16/9', border: '4px solid #111', boxShadow: '10px 10px 0px #111', backgroundImage: `url("${IMAGES.qr}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          </div>
          <div style={{ height: '200px', backgroundColor: '#FFF', borderTop: '4px solid #111', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ maxWidth: '60%' }}>
              <span style={{ ...POP_FONT_BODY, backgroundColor: '#D500F9', color: '#FFF', padding: '4px 8px' }}>LOGÍSTICA URBANA DE ALTA PUREZA</span>
              <h2 style={{ ...POP_FONT_HEAD, fontSize: '1.9rem', margin: '8px 0', textTransform: 'uppercase' }}>Kit para Empresas, Comunidades y Edificios</h2>
              <p style={{ margin: 0, fontSize: '1.05rem', color: '#333', ...POP_FONT_BODY }}>Modelos de contenedores plegables para portales de vecinos y bonificaciones directas en la tasa de basura industrial para comercios de Elda.</p>
            </div>
            <button onClick={() => alert("Formulario desplegado.")} style={{ backgroundColor: '#E040FB', color: '#FFF', padding: '16px 30px', border: '3px solid #111', ...POP_FONT_HEAD, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '6px 6px 0px #111', textTransform: 'uppercase' }}>
              Solicitar Adhesión de Edificio 🏢
            </button>
          </div>
        </section>

        {/* --- SECCIÓN 5: ECOSISTEMA --- */}
        <section ref={sectionRefs.institucional} style={{ height: 'calc(100vh - 75px)', display: 'flex', flexDirection: 'column', borderBottom: '4px solid #111' }}>
          <div style={{ flex: 1, backgroundColor: '#B2EBF2', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <div style={{ width: '85%', height: '90%', aspectRatio: '16/9', border: '4px solid #111', boxShadow: '10px 10px 0px #111', backgroundImage: `url("${IMAGES.mapa}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          </div>
          <div style={{ height: '200px', backgroundColor: '#FFF', borderTop: '4px solid #111', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ maxWidth: '60%' }}>
              <span style={{ ...POP_FONT_BODY, backgroundColor: '#00B8D4', color: '#FFF', padding: '4px 8px' }}>MARCO REGULATORIO INTERACTIVO</span>
              <h2 style={{ ...POP_FONT_HEAD, fontSize: '1.9rem', margin: '8px 0', textTransform: 'uppercase' }}>Colaboradores y Enlaces Oficiales</h2>
              <p style={{ margin: 0, fontSize: '1.05rem', color: '#333', ...POP_FONT_BODY }}>Estrategia conjunta auditada para mitigar penalizaciones fiscales en el eje Elda-Villena, en total cumplimiento con la Ley Estatal 7/2022 y el PIRCV.</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', ...POP_FONT_HEAD, fontSize: '0.85rem' }}>
              <div style={{ border: '2px solid #111', padding: '10px', backgroundColor: '#FAF6EE' }}>AYUNTAMIENTO ELDA</div>
              <div style={{ border: '2px solid #111', padding: '10px', backgroundColor: '#FOBESA' }}>FOBESA LOGÍSTICA</div>
              <div style={{ border: '2px solid #111', padding: '10px', backgroundColor: '#FAF6EE' }}>ECOVIDRIO FIX</div>
            </div>
          </div>
        </section>

        {/* --- SECCIÓN 6: AULA VIRTUAL --- */}
        <section ref={sectionRefs.aula} style={{ height: 'calc(100vh - 75px)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, backgroundColor: '#FFE082', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <div style={{ width: '85%', height: '90%', aspectRatio: '16/9', border: '4px solid #111', boxShadow: '10px 10px 0px #111', backgroundImage: `url("${IMAGES.aula}")`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justify: 'center' }}>
              <div style={{ backgroundColor: '#FFF', border: '4px solid #111', padding: '20px', maxWidth: '380px', boxShadow: '6px 6px 0px #111' }}>
                <h4 style={{ ...POP_FONT_HEAD, margin: '0 0 8px 0', fontSize: '1.2rem', color: '#E65100' }}>🎓 RETO GENERACIÓN Z-ERO</h4>
                <p style={{ margin: '0 0 15px 0', fontSize: '0.9rem', ...POP_FONT_BODY }}>¿A dónde debe llevarse un espejo plano roto de salón?</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button onClick={() => alert("❌ Incorrecto. El cristal plano daña la fundición.")} style={{ padding: '8px', border: '2px solid #111', backgroundColor: '#FAF6EE', cursor: 'pointer', textAlign: 'left', ...POP_FONT_BODY, fontSize: '0.8rem' }}>A) Al iglú de Vidrio de la calle</button>
                  <button onClick={() => alert("🎯 ¡Correcto! Destino: Ecoparque Campo Alto.")} style={{ padding: '8px', border: '2px solid #111', backgroundColor: '#FAF6EE', cursor: 'pointer', textAlign: 'left', ...POP_FONT_BODY, fontSize: '0.8rem' }}>B) Al Ecoparque Fijo de Elda</button>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: '200px', backgroundColor: '#FFF', borderTop: '4px solid #111', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ maxWidth: '60%' }}>
              <span style={{ ...POP_FONT_BODY, backgroundColor: '#FFB300', color: '#111', padding: '4px 8px' }}>CENTRO EDUCATIVO DE AUDITORÍA SOCIAL</span>
              <h2 style={{ ...POP_FONT_HEAD, fontSize: '1.9rem', margin: '8px 0', textTransform: 'uppercase' }}>Tutorial de la App e Instrucción Escolar</h2>
              <p style={{ margin: 0, fontSize: '1.05rem', color: '#333', ...POP_FONT_BODY }}>Sincroniza el carnet escolar de tus hijos. Los aciertos en los cuestionarios de trazabilidad suman Elda-Coins al saldo familiar de forma directa.</p>
            </div>
            <button onClick={() => alert("Abriendo flujo de audio...")} style={{ backgroundColor: '#FFB300', color: '#111', padding: '16px 30px', border: '3px solid #111', ...POP_FONT_HEAD, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '6px 6px 0px #111', textTransform: 'uppercase' }}>
              📻 Escuchar Podcast Técnico
            </button>
          </div>
        </section>

      </main>

      {/* MODAL DE LOGIN */}
      {showLogin && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(17,17,17,0.6)', backdropFilter: 'blur(10px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
        }}>
          <div style={{ width: '460px', backgroundColor: '#FAF6EE', border: '4px solid #111', boxShadow: '12px 12px 0px #111', padding: '30px', position: 'relative' }}>
            <button onClick={() => setShowLogin(false)} style={{ position: 'absolute', top: '15px', right: '15px', border: '2px solid #111', fontWeight: 'bold', cursor: 'pointer', padding: '4px 10px', backgroundColor: '#FF8A80' }}>X</button>

            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <h3 style={{ ...POP_FONT_HEAD, fontSize: '1.7rem', margin: 0, textTransform: 'uppercase' }}>🎛️ Consola de Autenticación</h3>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', ...POP_FONT_BODY, color: '#00E676', backgroundColor: '#111', display: 'inline-block', padding: '2px 8px' }}>API CONNECTED: PORT 80 / MYSQL</p>
            </div>

            {loginState !== 'idle' ? (
              <div style={{ backgroundColor: '#FFF', border: '3px solid #111', padding: '25px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', boxShadow: '4px 4px 0px #111' }}>
                <Server size={38} className={loginState !== 'success' ? 'animate-spin' : ''} color={loginState === 'success' ? '#00C853' : '#FFAB00'} />
                <div style={{ ...POP_FONT_BODY, fontSize: '0.9rem' }}>
                  {loginState === 'connecting' && <span>📡 Buscando nodo activo en Apache server...</span>}
                  {loginState === 'mysql' && <span>🗄️ SELECT * FROM usuarios WHERE user_id...</span>}
                  {loginState === 'validating' && <span>🔐 Descifrando hash MD5 y asignando nivel de Rol...</span>}
                  {loginState === 'success' && <span style={{ color: '#00C853', fontWeight: 'bold' }}>✓ SUCCESS: ¡Sesión sincronizada!</span>}
                </div>
                <div style={{ width: '100%', height: '14px', backgroundColor: '#E0E0E0', border: '2px solid #111', overflow: 'hidden' }}>
                  <div style={{ height: '100%', backgroundColor: loginState === 'success' ? '#00C853' : '#FFC107', width: loginState === 'connecting' ? '25%' : loginState === 'mysql' ? '50%' : loginState === 'validating' ? '75%' : '100%', transition: 'width 0.4s ease' }}></div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ ...POP_FONT_HEAD, fontSize: '0.9rem', textTransform: 'uppercase' }}>Identificador Ciudadano / ROL</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <User size={18} style={{ position: 'absolute', left: '12px' }} />
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario o catastro..." style={{ width: '100%', padding: '12px 12px 12px 40px', border: '3px solid #111', fontSize: '1rem', backgroundColor: '#FFF', boxSizing: 'border-box', boxShadow: '3px 3px 0px #111' }} required />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ ...POP_FONT_HEAD, fontSize: '0.9rem', textTransform: 'uppercase' }}>Clave de Acceso Encriptada</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '12px' }} />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" style={{ width: '100%', padding: '12px 12px 12px 40px', border: '3px solid #111', fontSize: '1rem', backgroundColor: '#FFF', boxSizing: 'border-box', boxShadow: '3px 3px 0px #111' }} required />
                  </div>
                </div>

                <div style={{ marginTop: '5px', borderTop: '3px dashed #111', paddingTop: '12px' }}>
                  <span style={{ ...POP_FONT_BODY, fontSize: '0.75rem', display: 'block', marginBottom: '8px', color: '#D50000' }}>⚡ INYECTOR MULTI-ROL (BOTONES DE DEMOSTRACIÓN PARA REUNIÓN):</span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button type="button" onClick={() => injectCredentials('vecino', 'miguel.valera', 'elda2026')} style={{ flex: 1, padding: '6px', fontSize: '0.75rem', ...POP_FONT_BODY, border: '2px solid #111', backgroundColor: '#E8F5E9', cursor: 'pointer', boxShadow: '2px 2px 0px #111' }}>Vecino</button>
                    <button type="button" onClick={() => injectCredentials('partner', 'calzados.elda', 'comercio99')} style={{ flex: 1, padding: '6px', fontSize: '0.75rem', ...POP_FONT_BODY, border: '2px solid #111', backgroundColor: '#E3F2FD', cursor: 'pointer', boxShadow: '2px 2px 0px #111' }}>Partner</button>
                    <button type="button" onClick={() => injectCredentials('gestor', 'fobesa.operador', 'fobesa2026')} style={{ flex: 1, padding: '6px', fontSize: '0.75rem', ...POP_FONT_BODY, border: '2px solid #111', backgroundColor: '#FFE0B2', cursor: 'pointer', boxShadow: '2px 2px 0px #111' }}>Gestor</button>
                    <button type="button" onClick={() => injectCredentials('admin', 'municipal.root', 'masterkey7')} style={{ flex: 1, padding: '6px', fontSize: '0.75rem', ...POP_FONT_BODY, border: '2px solid #111', backgroundColor: '#FFCDD2', cursor: 'pointer', boxShadow: '2px 2px 0px #111' }}>Admin</button>
                  </div>
                </div>

                <button type="submit" style={{ backgroundColor: '#00C853', color: '#FFF', padding: '14px', border: '3px solid #111', ...POP_FONT_HEAD, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '4px 4px 0px #111', marginTop: '10px' }}>Sincronizar con XAMPP 📡</button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}