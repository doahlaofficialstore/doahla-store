"use client";

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home'); 
  const [darkMode, setDarkMode] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null); 
  const [selectedPack, setSelectedPack] = useState(null); 
  const [category, setCategory] = useState('Small Pack');
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(5);
  
  const [playerID, setPlayerID] = useState('');
  const [zoneID, setZoneID] = useState('');

  const myNumber = "917085340215";
  const myUPI = "rajinanaga@okhdfcbank";
  const myInsta = "Doahlaofficial_store";

  // Load Saved IDs
  useEffect(() => {
    const savedID = localStorage.getItem('doahla_player_id');
    const savedZone = localStorage.getItem('doahla_zone_id');
    if (savedID) setPlayerID(savedID);
    if (savedZone) setZoneID(savedZone);
  }, []);

  // AUTOMATED PAYMENT REDIRECT LOGIC
  useEffect(() => {
    let timer: any;
    if (isProcessing && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isProcessing && countdown === 0 && selectedPack) {
      // 1. Generate UPI Link (Added 'selectedPack' check for safety)
      const upiURL = `upi://pay?pa=${myUPI}&pn=Doahla%20Official&am=${selectedPack.price}&cu=INR&tn=Order%20for%20${encodeURIComponent(selectedPack.name)}`;
      
      // 2. Open Payment App
      window.location.href = upiURL;

      // 3. Open WhatsApp after a short delay so they can send the receipt
      setTimeout(() => {
        const msg = `Hi Doahla! I just paid ₹${selectedPack.price} for ${selectedPack.name}.\nID: ${playerID} (${zoneID})\nSending payment receipt now:`;
        window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(msg)}`, '_blank');
        setIsProcessing(false);
        setCountdown(5);
        setSelectedPack(null);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isProcessing, countdown]);

  const handleFinalOrder = () => {
    if(!playerID) return alert("Please enter Player ID");
    localStorage.setItem('doahla_player_id', playerID);
    localStorage.setItem('doahla_zone_id', zoneID);
    setIsProcessing(true);
  };

  const mlbbPacks = {
    "Small Pack": [
      { id: 1, name: "5 Diamonds", price: 16 }, { id: 2, name: "11 Diamonds", price: 25 },
      { id: 3, name: "14 Diamonds", price: 34 }, { id: 4, name: "22 Diamonds", price: 42 },
      { id: 5, name: "33 Diamonds", price: 64 }, { id: 6, name: "86 Diamonds", price: 132 },
    ],
    "Medium/Large": [
      { id: 7, name: "172 Diamonds", price: 252 }, { id: 8, name: "275 Diamonds", price: 395 },
      { id: 11, name: "706 Diamonds", price: 955 }, { id: 12, name: "1049 Diamonds", price: 1435 },
    ],
    "Passes": [
      { id: 15, name: "Weekly Pass", price: 155 }, { id: 16, name: "Starlight Card", price: 260 },
      { id: 17, name: "Premium Starlight", price: 500 }, { id: 18, name: "Twilight Pass", price: 790 },
    ]
  };

  const games = [
    { id: 'mlbb', name: "Mobile Legends", img: "/mlbb.jpg", active: true },
    { id: 'coc', name: "Clash of Clans", img: "/coc.jpg", active: false },
    { id: 'bgmi', name: "BGMI India", img: "/bgmi.jpg", active: false },
    { id: 'codm', name: "COD Mobile", img: "/codm.jpg", active: false },
  ];

  return (
    <main className={`min-h-screen pb-40 transition-all duration-500 ${darkMode ? 'bg-[#121212] text-white' : 'bg-[#fff0f5] text-slate-900'}`}>
      
      {/* 1. Sliding Marquee */}
      <div className="bg-[#f472b6] text-white py-2 overflow-hidden whitespace-nowrap font-bold italic text-[10px] uppercase tracking-widest border-b border-pink-300">
        <div className="inline-block animate-marquee">
          <span className="mx-4">Follow us on Instagram @{myInsta} for updates — </span>
          <span className="mx-4">Follow us on Instagram @{myInsta} for updates — </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: inline-block; animation: marquee 15s linear infinite; }
      `}</style>

      {/* Theme Toggle */}
      <button onClick={() => setDarkMode(!darkMode)} className="fixed top-20 right-4 z-[60] p-3 rounded-full bg-[#f472b6] text-white shadow-lg">
        {darkMode ? '☀️' : '🌙'}
      </button>

      <div className="max-w-md mx-auto p-4">
        
        {activeTab === 'home' && !selectedGame && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h1 className="text-4xl font-black text-[#f472b6] my-8 italic text-center uppercase tracking-tighter drop-shadow-sm">Doahla Official Store</h1>
            
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">Featured Games</h2>
            <div className="grid grid-cols-2 gap-4">
              {games.map(game => (
                <button key={game.id} 
                  onClick={() => game.active ? setSelectedGame(game) : alert(`${game.name} Coming Soon...`)}
                  className={`relative p-3 rounded-[2.5rem] border-2 transition-all active:scale-95 ${darkMode ? 'bg-[#1a1a1a] border-[#f472b6]' : 'bg-white border-pink-50 shadow-sm'}`}
                >
                  <div className={`aspect-square rounded-3xl overflow-hidden mb-2 ${!game.active && 'opacity-40 grayscale'}`}>
                    <img src={game.img} alt={game.name} className="w-full h-full object-cover" />
                  </div>
                  {!game.active && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-[#f472b6] text-white text-[8px] font-black px-2 py-1 rounded-full shadow-lg">COMING SOON</span>
                    </div>
                  )}
                  <p className="font-bold text-xs uppercase italic">{game.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- MLBB MENU --- */}
        {selectedGame?.id === 'mlbb' && !selectedPack && (
          <div className="animate-in slide-in-from-right-4">
            <button onClick={() => setSelectedGame(null)} className="text-[#f472b6] font-bold text-[10px] mb-6 uppercase tracking-widest">← Back to Games</button>
            <h2 className="text-2xl font-black mb-6 italic text-[#f472b6] border-b-2 border-[#f472b6]/20 pb-2">DIAMOND PACKS</h2>
            
            <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
              {['Small Pack', 'Medium/Large', 'Passes'].map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-5 py-2 rounded-full font-black text-[9px] uppercase whitespace-nowrap transition-all border-2 ${category === cat ? 'bg-[#f472b6] border-[#f472b6] text-white' : (darkMode ? 'bg-[#1a1a1a] border-[#f472b6]/30 text-gray-400' : 'bg-white border-pink-100 text-gray-400')}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {mlbbPacks[category].map(pack => (
                <button key={pack.id} onClick={() => setSelectedPack(pack)}
                  className={`p-4 rounded-[2rem] border-2 transition-all active:scale-95 text-center ${darkMode ? 'bg-[#1a1a1a] border-[#f472b6]' : 'bg-white border-pink-50'}`}
                >
                  <p className="font-black text-xl text-[#f472b6] mb-1">💎</p>
                  <p className="font-bold text-[11px] mb-1 opacity-90">{pack.name}</p>
                  <p className="font-black text-sm text-[#f472b6]">₹{pack.price}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- CHECKOUT WITH UPI REDIRECT --- */}
        {selectedPack && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
            <div className={`w-full max-w-sm rounded-[3rem] p-8 border-t-8 border-[#f472b6] ${darkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
              
              {!isProcessing ? (
                <>
                  <h3 className="font-black text-[#f472b6] uppercase text-center text-xs tracking-widest mb-6 italic">Secure Checkout</h3>
                  <div className="space-y-4 mb-8 text-left">
                    <div>
                      <label className="text-[9px] font-black uppercase text-[#f472b6] ml-2 tracking-widest">Player User ID</label>
                      <input type="text" placeholder="e.g. 12345678" value={playerID} onChange={(e) => setPlayerID(e.target.value)}
                        className={`w-full p-4 rounded-2xl border-2 outline-none focus:border-[#f472b6] ${darkMode ? 'bg-[#222] border-[#f472b6]/20 text-white' : 'bg-gray-50 border-pink-50 text-black'}`} />
                    </div>
                    <div>
                      <label className="text-[9px] font-black uppercase text-[#f472b6] ml-2 tracking-widest">Zone ID</label>
                      <input type="text" placeholder="e.g. 1234" value={zoneID} onChange={(e) => setZoneID(e.target.value)}
                        className={`w-full p-4 rounded-2xl border-2 outline-none focus:border-[#f472b6] ${darkMode ? 'bg-[#222] border-[#f472b6]/20 text-white' : 'bg-gray-50 border-pink-50 text-black'}`} />
                    </div>
                  </div>

                  <div className="p-4 rounded-3xl mb-8 text-center bg-pink-50/50 dark:bg-pink-500/10 border-2 border-dashed border-[#f472b6]/30">
                    <p className="text-[10px] font-bold text-[#f472b6] uppercase mb-1">{selectedPack.name}</p>
                    <p className="text-3xl font-black">₹{selectedPack.price}</p>
                  </div>

                  <button onClick={handleFinalOrder} className="w-full py-5 bg-[#f472b6] text-white rounded-2xl font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                    Pay via GPay / UPI
                  </button>
                  <button onClick={() => setSelectedPack(null)} className="w-full mt-4 text-gray-400 font-bold text-[10px] uppercase">Cancel</button>
                </>
              ) : (
                <div className="text-center py-10 animate-in zoom-in-95">
                  <div className="text-6xl mb-6">💎</div>
                  <h2 className="text-2xl font-black text-[#f472b6] mb-2 uppercase italic">Thank you!</h2>
                  <p className="text-xs font-bold opacity-70 mb-8 uppercase tracking-widest">Visit us again at Doahla Official</p>
                  <div className="text-5xl font-black text-[#f472b6] animate-pulse">{countdown}</div>
                  <p className="mt-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Opening Secure Payment App...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- OTHER TABS (Support/Policies) --- */}
        {activeTab === 'support' && (
          <div className="py-6 space-y-4 animate-in fade-in text-center">
             <h2 className="text-3xl font-black text-[#f472b6] italic uppercase mb-8">Support</h2>
             <button onClick={() => window.open(`https://wa.me/${myNumber}`)} className="w-full p-6 rounded-[2.5rem] bg-[#25D366] text-white font-black flex items-center justify-center gap-3 shadow-lg">
                <span className="text-2xl">💬</span> WHATSAPP ADMIN
             </button>
             <button onClick={() => window.open(`https://instagram.com/${myInsta}`)} className="w-full p-6 rounded-[2.5rem] border-2 border-[#f472b6] text-[#f472b6] font-black italic shadow-sm uppercase">Instagram</button>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="py-6 space-y-4 animate-in fade-in text-left">
             <h2 className="text-3xl font-black text-[#f472b6] italic text-center uppercase tracking-tighter mb-8">Policies</h2>
             <div className="space-y-4">
                {[{t: "Accuracy", d: "No refunds for incorrect IDs.", i: "⚠️"}, {t: "Delivery", d: "5-30 minutes standard time.", i: "⏱️"}, {t: "Safety", d: "100% refund for failed server orders.", i: "🛡️"}].map((term, i) => (
                  <div key={i} className={`p-6 rounded-[2rem] border-l-8 border-[#f472b6] shadow-md ${darkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
                    <p className="font-black text-[#f472b6] text-[11px] uppercase flex items-center gap-2 mb-1"><span>{term.i}</span> {term.t}</p>
                    <p className="text-[11px] opacity-70 leading-relaxed">{term.d}</p>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className={`fixed bottom-0 left-0 right-0 p-6 flex justify-around border-t z-50 transition-colors ${darkMode ? 'bg-[#121212]/95 border-[#f472b6]/30' : 'bg-white/95 border-pink-100'} backdrop-blur-md`}>
        {['home', 'support', 'terms'].map(tab => (
          <button key={tab} onClick={() => {setActiveTab(tab); setSelectedGame(null); setSelectedPack(null);}} 
            className={`font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'text-[#f472b6] scale-110' : 'text-gray-400'}`}>
            {tab === 'terms' ? 'Policies' : tab}
          </button>
        ))}
      </div>
    </main>
  );
}