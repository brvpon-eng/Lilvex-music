import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, Play, Pause, Music, Volume2, Shield, Radio, Sparkles, 
  CheckCircle2, Star, Send, Layers, Zap, Sliders, Monitor, Smartphone, 
  Apple, Globe, Heart, MessageSquare, ChevronRight, ChevronLeft, Search, Library,
  User, Moon, Sun, Minimize2, SkipBack, SkipForward, Shuffle, Repeat, ExternalLink
} from 'lucide-react';

// Custom Windows Icon Component to avoid invalid Lucide icon import
const WindowsIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 88 88" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 12.402l35.687-4.86v35.806H0V12.402zm0 34.613h35.687v35.807L0 77.962V47.015zm39.544-39.995L88 0v40.354H39.544V7.02zm48.456 40h-48.456v40.355L88 88V47.02z"/>
  </svg>
);

// Custom LilVex Monogram Logo Component (matches the provided brand geometry)
const LilVexMonogram = ({ className = "h-8 w-8", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 100 100" fill={color} xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="30" width="16" height="40" />
    <rect x="18" y="58" width="30" height="12" />
    <rect x="50" y="25" width="15" height="12" />
    <rect x="50" y="42" width="15" height="28" />
    <rect x="68" y="27" width="15" height="43" />
  </svg>
);

// Full Brand Logo SVG Component
const LilVexLogo = ({ className = "h-7" }) => (
  <div className={`flex items-center space-x-2.5 font-black tracking-tighter select-none ${className}`}>
    <div className="bg-white text-black p-1.5 rounded-xl flex items-center justify-center font-bold shadow-md">
      <LilVexMonogram className="h-6 w-6" color="#000000" />
    </div>
    <span className="text-2xl font-extrabold tracking-tight text-white flex items-center">
      Lil<span className="text-indigo-400 ml-0.5">Vex</span>
      <span className="text-xs bg-indigo-500/20 text-indigo-300 font-medium px-2 py-0.5 rounded-full ml-2 border border-indigo-500/30">Music</span>
    </span>
  </div>
);

// Floating Audio Visualizer Component
const AudioEqualizer = ({ bars = 16, active = true, height = "h-8" }) => {
  return (
    <div className={`flex items-end gap-1 ${height}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="w-1 bg-gradient-to-t from-indigo-500 to-purple-400 rounded-full transition-all duration-300"
          style={{
            height: active ? `${Math.floor(Math.random() * 80) + 20}%` : '15%',
            animationDuration: `${0.4 + (i % 5) * 0.2}s`,
            animationName: active ? 'pulse' : 'none',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate'
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  // Real-time Download Counter State
  const [downloadCount, setDownloadCount] = useState(128490);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);

  // App Interface Interactive State
  const [activeTab, setActiveTab] = useState('Home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTrack, setCurrentTrack] = useState({
    title: "Putaapu Gang",
    artist: "Anirudh Ravichander",
    album: "Jailer / Trending in Sri Lanka",
    badge: "YouTube",
    duration: "3:45",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80"
  });
  const [playbackProgress, setPlaybackProgress] = useState(25);

  // Sample Track Playlists from App Screenshots
  const trendingSriLanka = [
    { id: 1, title: "Putaapu Gang", artist: "Anirudh Ravichander", badge: "YouTube", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80" },
    { id: 2, title: "Rathnamo (Female Ver)", artist: "Sai Abhyankkar", badge: "YouTube", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80" },
    { id: 3, title: "Aye Me Wage", artist: "Raveen Tharuka", badge: "YouTube", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&auto=format&fit=crop&q=80" },
    { id: 4, title: "Annakili (From Tamil)", artist: "Kevin Smokio", badge: "YouTube", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80" },
    { id: 5, title: "MOKADA WENNE (SOSA)", artist: "Kevin Smokio", badge: "YouTube", img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80" },
  ];

  const listenToChamel = [
    { id: 6, title: "Rhin Mae Numbawa", artist: "Sri Lanka Hits", badge: "YouTube", img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80" },
    { id: 7, title: "OOKF - NOT AGAIN", artist: "Lost Chameleon", badge: "Audius", img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&auto=format&fit=crop&q=80" },
    { id: 8, title: "CHANEL OH MY !", artist: "Lil Gzii", badge: "YouTube", img: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80" },
    { id: 9, title: "Chameleonic", artist: "Sabbia", badge: "Audius", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=80" },
  ];

  const loFiTracks = [
    { id: 10, title: "3 Hours of Chill Lofi", artist: "Lofi Girl / Sleep", badge: "YouTube", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80" },
    { id: 11, title: "Focus Beats", artist: "NOSAM", badge: "YouTube", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=80" },
    { id: 12, title: "Lo-Fi Clarity", artist: "CASS", badge: "YouTube", img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&auto=format&fit=crop&q=80" },
  ];

  // Feedback Form State
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    category: 'General Feedback',
    rating: 5,
    message: ''
  });
  const [feedbackList, setFeedbackList] = useState([
    {
      id: 1,
      name: "Marcus Vance",
      role: "Audio Engineer",
      rating: 5,
      category: "Feature Request",
      date: "2 hours ago",
      message: "The custom Audius + YouTube audio routing engine in LilVex is insane! Very clean dark themed interface matching Spotify but much smoother."
    },
    {
      id: 2,
      name: "Elena Rostova",
      role: "Music Enthusiast",
      rating: 5,
      category: "General Feedback",
      date: "1 day ago",
      message: "Sleek 3-column layout. Love the Sri Lankan regional trending recommendations!"
    },
    {
      id: 3,
      name: "Devon Chen",
      role: "DJ & Producer",
      rating: 5,
      category: "General Feedback",
      date: "3 days ago",
      message: "Lightweight RAM footprint and high fidelity sound. LilVex is definitely my primary desktop player now."
    }
  ]);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Canvas background animation ref
  const canvasRef = useRef(null);

  // Dynamic increment for live download counter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Player track progress simulation
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlaybackProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Motion Graphics Background Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles/Waves config
    const particles = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.4 ? '#818cf8' : '#ffffff'
    }));

    let step = 0;

    const render = () => {
      step += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle animated glowing waves
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.7);
      for (let x = 0; x < canvas.width; x += 10) {
        const y = Math.sin(x * 0.005 + step) * 25 + Math.cos(x * 0.002 + step * 0.5) * 15 + canvas.height * 0.65;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.15)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Render floating sound particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle Download Trigger
  const handleDownload = (os = 'Windows') => {
    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadComplete(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setDownloadProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setIsDownloading(false);
        setDownloadComplete(true);
        setDownloadCount(prev => prev + 1);

        const element = document.createElement("a");
        const file = new Blob([`LilVex Music App Desktop Installer for ${os}`], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `LilVex-Music-Setup-${os.toLowerCase()}.exe`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        setTimeout(() => setDownloadComplete(false), 5000);
      }
    }, 300);
  };

  // Feedback Submission Handler
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackForm.name || !feedbackForm.message) return;

    const newFeedback = {
      id: Date.now(),
      name: feedbackForm.name,
      role: "Verified User",
      rating: feedbackForm.rating,
      category: feedbackForm.category,
      date: "Just now",
      message: feedbackForm.message
    };

    setFeedbackList([newFeedback, ...feedbackList]);
    setFeedbackSubmitted(true);
    setFeedbackForm({
      name: '',
      email: '',
      category: 'General Feedback',
      rating: 5,
      message: ''
    });

    setTimeout(() => {
      setFeedbackSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-neutral-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* Dynamic Motion Canvas Banner Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0d0e12]/90 border-b border-neutral-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <LilVexLogo />

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-300">
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">App Preview</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#stats" className="hover:text-indigo-400 transition-colors">Downloads</a>
            <a href="#feedback" className="hover:text-indigo-400 transition-colors">User Reviews</a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center bg-neutral-900 border border-neutral-800 rounded-full px-3.5 py-1.5 text-xs text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse mr-2"></span>
              v1.0.4 Windows Desktop
            </div>
            <button 
              onClick={() => handleDownload('Windows')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-full transition duration-200 transform hover:scale-105 active:scale-95 flex items-center shadow-lg shadow-indigo-600/25 text-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Free
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-14 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Official LilVex Music App Release
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white">
                All Your Favorite Songs. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-white">
                  Zero Ads. One Software.
                </span>
              </h1>

              <p className="text-lg text-neutral-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Stream regional hits, trending playlists, and Audius lossless audio directly from your desktop. Featuring a slick 3-panel Spotify-inspired dark layout with built-in YouTube streaming integration.
              </p>

              {/* Primary Download & Counter Box */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => handleDownload('Windows')}
                  disabled={isDownloading}
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black px-8 py-4 rounded-2xl text-base transition-all duration-300 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 group transform hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5 transition-transform group-hover:translate-y-1" />
                  <span>{isDownloading ? `Downloading (${downloadProgress}%)` : 'Download LilVex Music for Windows'}</span>
                </button>

                <div className="flex items-center space-x-3 px-6 py-3.5 bg-neutral-900/90 border border-neutral-800 rounded-2xl">
                  <div className="text-left">
                    <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Active Downloads</p>
                    <p className="text-xl font-bold text-white tracking-wide font-mono">
                      {downloadCount.toLocaleString()} <span className="text-indigo-400 text-sm font-normal">+</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Download Feedback Toast Notification */}
              {downloadComplete && (
                <div className="p-4 bg-indigo-950/90 border border-indigo-500/50 rounded-xl text-indigo-300 text-sm flex items-center space-x-3 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <span>Installer download complete! Run `LilVex-Music-Setup-windows.exe` to start listening.</span>
                </div>
              )}

              {/* OS Compatibility badges */}
              <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-neutral-400 text-xs font-medium">
                <span className="flex items-center gap-1.5"><WindowsIcon className="w-4 h-4 text-indigo-400" /> Windows 10 / 11 (64-bit)</span>
                <span className="flex items-center gap-1.5"><Apple className="w-4 h-4 text-neutral-400" /> macOS Build Coming Soon</span>
              </div>
            </div>

            {/* Right Hero Feature Badge */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-indigo-600/20 blur-3xl rounded-full"></div>
              
              <div className="relative bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-6">
                
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold">
                      <LilVexMonogram className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">LilVex Desktop Core</h4>
                      <p className="text-xs text-neutral-400">Stream YouTube & Audius audio</p>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-medium">Live Stream</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-neutral-950/60 rounded-xl border border-neutral-800 text-xs">
                    <span className="text-neutral-400">Regional Trending Engine</span>
                    <span className="text-white font-medium">Sri Lanka & Global</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-neutral-950/60 rounded-xl border border-neutral-800 text-xs">
                    <span className="text-neutral-400">Lossless Sound Processing</span>
                    <span className="text-indigo-400 font-medium">Audius Built-In</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-neutral-950/60 rounded-xl border border-neutral-800 text-xs">
                    <span className="text-neutral-400">Ad Blocking Layer</span>
                    <span className="text-emerald-400 font-medium font-bold">100% Free / Ad-Free</span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <a href="#showcase" className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                    Explore full app interface below <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Live Interactive Software Window Showcase (Exact Match to Screenshots) */}
      <section id="showcase" className="py-16 bg-neutral-950/90 relative z-10 border-t border-neutral-800">
        <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Interactive Desktop Experience</h2>
            <p className="text-3xl sm:text-4xl font-black text-white">Exact Desktop App Interface Preview</p>
            <p className="text-neutral-400 text-sm">Experience the 3-column Spotify-inspired UI built directly into LilVex Music software.</p>
          </div>

          {/* Windows Application Window Wrapper */}
          <div className="bg-[#121318] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-200 text-xs select-none">
            
            {/* Windows Window Titlebar */}
            <div className="bg-[#0b0c0e] px-4 py-2.5 border-b border-neutral-800/80 flex items-center justify-between text-neutral-400">
              <div className="flex items-center space-x-2">
                <LilVexMonogram className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold text-neutral-200">LilVex Music</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-neutral-700 hover:bg-neutral-600 cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-neutral-700 hover:bg-neutral-600 cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer"></div>
              </div>
            </div>

            {/* App 3-Column Main Content Layout */}
            <div className="grid grid-cols-12 min-h-[580px] bg-[#121318]">
              
              {/* Left Sidebar (Column 1 - 2.5 cols) */}
              <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-[#0e0f13] border-r border-neutral-800/80 p-4 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Brand Header */}
                  <div className="flex items-center space-x-2 px-2 py-1">
                    <div className="bg-white text-black p-1 rounded-md font-bold">
                      <LilVexMonogram className="w-4 h-4 text-black" />
                    </div>
                    <span className="font-extrabold text-sm text-white tracking-tight">LilVex <span className="text-xs font-normal text-neutral-400">Music</span></span>
                  </div>

                  {/* Nav Links */}
                  <div className="space-y-1">
                    {[
                      { name: 'Home', icon: Music },
                      { name: 'Search', icon: Search },
                      { name: 'Library', icon: Library },
                      { name: 'Profile', icon: User },
                    ].map((item) => (
                      <button
                        key={item.name}
                        onClick={() => setActiveTab(item.name)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition ${activeTab === item.name ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'}`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sidebar Bottom Controls */}
                <div className="space-y-3 pt-6 border-t border-neutral-800/80">
                  {/* User Badge */}
                  <div className="flex items-center space-x-3 px-3 py-2 bg-neutral-900/80 border border-neutral-800 rounded-xl">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px]">
                      U1
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">User 01</p>
                      <p className="text-[10px] text-neutral-400">Sri Lanka</p>
                    </div>
                  </div>

                  {/* Toggle Mini Player */}
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 px-2">
                    <span className="flex items-center gap-1.5"><Minimize2 className="w-3.5 h-3.5" /> Mini player</span>
                    <input type="checkbox" className="accent-indigo-500 rounded cursor-pointer" />
                  </div>

                  {/* Light / Dark Mode Toggle */}
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 px-2">
                    <span className="flex items-center gap-1.5"><Moon className="w-3.5 h-3.5" /> Light / dark</span>
                    <input type="checkbox" defaultChecked className="accent-indigo-500 rounded cursor-pointer" />
                  </div>

                  {/* Audio Source Dropdown */}
                  <div className="pt-2">
                    <p className="text-[10px] text-neutral-400 mb-1 px-1">LilVex Source</p>
                    <select className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-[11px] text-neutral-200 focus:outline-none">
                      <option>Choose s...</option>
                      <option>YouTube Streaming</option>
                      <option>Audius Lossless</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Center Main Feed (Column 2 - 6.5 cols) */}
              <div className="col-span-12 md:col-span-6 lg:col-span-7 bg-[#121318] p-5 overflow-y-auto max-h-[580px] custom-scrollbar space-y-6">
                
                {/* Hero Greeting Card */}
                <div className="relative rounded-2xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-neutral-900 p-6 border border-indigo-500/20 flex flex-col justify-between min-h-[160px]">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">Good morning, User</h2>
                    <p className="text-xs text-indigo-200 mt-1">Official releases tuned to Sri Lanka and the genres you love.</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-xs font-bold text-white">{currentTrack.title}</p>
                      <p className="text-[11px] text-neutral-300">{currentTrack.artist}</p>
                    </div>
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-full text-xs flex items-center space-x-1.5 shadow-lg shadow-indigo-600/40 transition"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      <span>{isPlaying ? 'Pause' : 'Play now'}</span>
                    </button>
                  </div>
                </div>

                {/* Carousel Row 1: Trending in Sri Lanka */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">Trending in Sri Lanka</h3>
                      <p className="text-[11px] text-neutral-400">Most played new releases</p>
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-1 rounded-full bg-neutral-800 text-neutral-400 hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
                      <button className="p-1 rounded-full bg-neutral-800 text-neutral-400 hover:text-white"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {trendingSriLanka.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => {
                          setCurrentTrack({ ...item, album: "Trending in Sri Lanka" });
                          setIsPlaying(true);
                        }}
                        className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-2.5 hover:bg-neutral-800/80 cursor-pointer transition group"
                      >
                        <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                          <span className="absolute top-1.5 right-1.5 bg-red-600/90 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">{item.badge}</span>
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            </div>
                          </div>
                        </div>
                        <p className="text-xs font-bold text-white truncate">{item.title}</p>
                        <p className="text-[10px] text-neutral-400 truncate">{item.artist}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel Row 2: Because you listen to Chamel */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">Because you listen to Chamel</h3>
                      <p className="text-[11px] text-neutral-400">From your listening history</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {listenToChamel.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => {
                          setCurrentTrack({ ...item, album: "Recommended History" });
                          setIsPlaying(true);
                        }}
                        className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-2.5 hover:bg-neutral-800/80 cursor-pointer transition group"
                      >
                        <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                          <span className="absolute top-1.5 right-1.5 bg-indigo-600/90 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">{item.badge}</span>
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            </div>
                          </div>
                        </div>
                        <p className="text-xs font-bold text-white truncate">{item.title}</p>
                        <p className="text-[10px] text-neutral-400 truncate">{item.artist}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel Row 3: More Lo-fi */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white">More Lo-fi</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {loFiTracks.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => {
                          setCurrentTrack({ ...item, album: "Lo-Fi Collection" });
                          setIsPlaying(true);
                        }}
                        className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-2.5 hover:bg-neutral-800/80 cursor-pointer transition group"
                      >
                        <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-xs font-bold text-white truncate">{item.title}</p>
                        <p className="text-[10px] text-neutral-400 truncate">{item.artist}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Sidebar Now Playing Panel (Column 3 - 3 cols) */}
              <div className="col-span-12 md:col-span-3 lg:col-span-3 bg-[#0a0b0d] border-l border-neutral-800/80 p-4 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Currently playing player container */}
                  <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-center space-y-3">
                    <div className="relative aspect-video rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden flex flex-col items-center justify-center">
                      <img src={currentTrack.image} alt="Playing Track" className="w-full h-full object-cover opacity-60" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white mb-1 shadow-lg">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">{currentTrack.title}</h4>
                      <p className="text-xs text-indigo-400 line-clamp-1">{currentTrack.artist}</p>
                    </div>

                    <div className="pt-2 border-t border-neutral-900 text-[10px] text-neutral-400 text-left space-y-1">
                      <p className="text-neutral-500 uppercase tracking-wider text-[9px] font-bold">Audio Engine</p>
                      <p>The equalizer works on Audius & YouTube songs.</p>
                    </div>
                  </div>

                  {/* Up Next Queue */}
                  <div>
                    <h5 className="text-xs font-bold text-white mb-2">Up next</h5>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 p-2 bg-neutral-900/60 rounded-xl border border-neutral-800 text-xs">
                        <div className="w-8 h-8 rounded-lg bg-neutral-800 overflow-hidden flex-shrink-0">
                          <img src={trendingSriLanka[1].img} className="w-full h-full object-cover" />
                        </div>
                        <div className="truncate">
                          <p className="font-medium text-white truncate">{trendingSriLanka[1].title}</p>
                          <p className="text-[10px] text-neutral-400 truncate">{trendingSriLanka[1].artist}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <p className="text-[10px] text-neutral-400">LilVex Desktop Core Active</p>
                </div>
              </div>

            </div>

            {/* Bottom Playback Control Bar */}
            <div className="bg-[#0a0b0d] border-t border-neutral-800 px-4 py-3 flex items-center justify-between">
              
              {/* Left: Playing Track Details */}
              <div className="flex items-center space-x-3 min-w-[180px]">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 overflow-hidden flex-shrink-0">
                  <img src={currentTrack.image} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white line-clamp-1">{currentTrack.title}</p>
                  <p className="text-[10px] text-neutral-400 line-clamp-1">{currentTrack.artist}</p>
                </div>
              </div>

              {/* Center: Controls + Timeline Slider */}
              <div className="flex flex-col items-center space-y-1.5 max-w-md w-full px-4">
                <div className="flex items-center space-x-4">
                  <button className="text-neutral-400 hover:text-white"><Shuffle className="w-3.5 h-3.5" /></button>
                  <button className="text-neutral-400 hover:text-white"><SkipBack className="w-3.5 h-3.5" /></button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition shadow-md"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>
                  <button className="text-neutral-400 hover:text-white"><SkipForward className="w-3.5 h-3.5" /></button>
                  <button className="text-neutral-400 hover:text-white"><Repeat className="w-3.5 h-3.5" /></button>
                </div>

                <div className="w-full flex items-center space-x-2 text-[10px] font-mono text-neutral-400">
                  <span>1:12</span>
                  <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden cursor-pointer">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${playbackProgress}%` }}></div>
                  </div>
                  <span>{currentTrack.duration}</span>
                </div>
              </div>

              {/* Right: Volume & Equalizer badge */}
              <div className="flex items-center space-x-3 min-w-[160px] justify-end">
                <AudioEqualizer bars={4} active={isPlaying} height="h-3" />
                <Volume2 className="w-4 h-4 text-neutral-400" />
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="w-16 accent-indigo-500 h-1 bg-neutral-800 rounded cursor-pointer" 
                />
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Dynamic Statistics Bar */}
      <section id="stats" className="border-y border-neutral-800/80 bg-neutral-900/40 backdrop-blur-sm py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">100M+</p>
              <p className="text-xs uppercase tracking-wider text-neutral-400">YouTube & Audius Tracks</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400 tracking-tight">320 kbps</p>
              <p className="text-xs uppercase tracking-wider text-neutral-400">High Fidelity Output</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">0.0s</p>
              <p className="text-xs uppercase tracking-wider text-neutral-400">Ad Lag Delay</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400 tracking-tight">100%</p>
              <p className="text-xs uppercase tracking-wider text-neutral-400">Free Desktop Player</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Built for Audio Perfection</h2>
            <p className="text-3xl sm:text-5xl font-black tracking-tight text-white">Why Listeners Prefer LilVex</p>
            <p className="text-neutral-400 text-base">Engineered with high efficiency streaming codecs and a minimalist dark UI focused entirely on the music.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-neutral-900/60 border border-neutral-800 p-8 rounded-3xl hover:border-indigo-500/50 transition duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">100% Ad-Free Listening</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                No interruptive commercial breaks or audio popups. Enjoy uninterrupted playback sessions across your entire library.
              </p>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800 p-8 rounded-3xl hover:border-indigo-500/50 transition duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Regional Sri Lankan Recommendations</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Smart localized playlist engine that automatically surfaces trending music from Sri Lanka and surrounding regions.
              </p>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800 p-8 rounded-3xl hover:border-indigo-500/50 transition duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Audius & YouTube Sound Processing</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Integrated dual audio sources allowing seamless switching between Audius lossless streams and YouTube music catalog.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* User Feedback & Form Section */}
      <section id="feedback" className="py-24 relative z-10 bg-neutral-950/60 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Feedback Submission Form */}
            <div className="lg:col-span-5 bg-neutral-900/80 border border-neutral-800 p-8 rounded-3xl shadow-xl">
              <div className="mb-6 space-y-2">
                <div className="inline-flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                  <MessageSquare className="w-4 h-4" /> Community Voice
                </div>
                <h3 className="text-2xl font-black text-white">Send Software Feedback</h3>
                <p className="text-neutral-400 text-sm">Help us improve LilVex. Submit bug reports, feature ideas, or general reviews directly to our developers.</p>
              </div>

              {feedbackSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto border border-indigo-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Thank You!</h4>
                  <p className="text-neutral-400 text-sm max-w-xs mx-auto">Your feedback has been published to the live reviews showcase board below.</p>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">Your Name</label>
                    <input 
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      value={feedbackForm.name}
                      onChange={e => setFeedbackForm({...feedbackForm, name: e.target.value})}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">Category</label>
                    <select
                      value={feedbackForm.category}
                      onChange={e => setFeedbackForm({...feedbackForm, category: e.target.value})}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                    >
                      <option value="General Feedback">General Feedback</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Bug Report">Bug Report</option>
                      <option value="Audio Quality">Audio Quality Review</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedbackForm({...feedbackForm, rating: star})}
                          className="p-1 focus:outline-none"
                        >
                          <Star className={`w-6 h-6 ${star <= feedbackForm.rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-700'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">Message / Details</label>
                    <textarea 
                      rows="4"
                      required
                      placeholder="Share your thoughts about LilVex..."
                      value={feedbackForm.message}
                      onChange={e => setFeedbackForm({...feedbackForm, message: e.target.value})}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl text-sm transition flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Feedback</span>
                  </button>
                </form>
              )}
            </div>

            {/* Live Community Feedback Feed */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div>
                  <h3 className="text-2xl font-black text-white">User Reviews & Feedback</h3>
                  <p className="text-xs text-neutral-400">Live community submissions</p>
                </div>
                <div className="flex items-center space-x-1 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-full text-xs text-neutral-300">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>4.9 / 5.0 Rating</span>
                </div>
              </div>

              <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2 custom-scrollbar">
                {feedbackList.map((item) => (
                  <div key={item.id} className="bg-neutral-900/70 border border-neutral-800/80 p-6 rounded-2xl space-y-3 hover:border-neutral-700 transition">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-indigo-400 text-sm">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{item.name}</h4>
                          <p className="text-xs text-neutral-400">{item.role}</p>
                        </div>
                      </div>
                      <span className="text-[11px] bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded-full border border-neutral-700/50">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < item.rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-700'}`} 
                        />
                      ))}
                      <span className="text-xs text-neutral-400 ml-2">{item.date}</span>
                    </div>

                    <p className="text-neutral-300 text-sm leading-relaxed">{item.message}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800/80 bg-neutral-950 py-12 relative z-10 text-neutral-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <LilVexLogo />
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <a href="#showcase" className="hover:text-indigo-400 transition">App Preview</a>
            <a href="#features" className="hover:text-indigo-400 transition">Features</a>
            <a href="#feedback" className="hover:text-indigo-400 transition">Feedback</a>
            <a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition">Terms of Service</a>
          </div>

          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} LilVex Music Inc. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}