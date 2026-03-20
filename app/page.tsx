"use client";
import React, { useState, useEffect } from 'react';

export default function DoahlaStore() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('HOME');
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [playerID, setPlayerID] = useState('');
  const [zoneID, setZoneID] = useState('');
  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const myUPI = "rajinanaga@okhdfcbank";
  const whatsappNumber = "917085340215";

  // PACK DATA
  const packs: any = {
    SMALL: [
      { n: "5 Diamonds", p: 16 }, { n: "11 Diamonds", p: 25 }, { n: "14 Diamonds", p: 34 },
      { n: "22 Diamonds", p: 42 }, { n: "33 Diamonds", p: 64 }, { n: "86 Diamonds", p: 132 },
      { n: "110 Diamonds", p: 163 }, { n: "172 Diamonds", p: 252 }, { n: "275 Diamonds", p: 395 },
      { n: "343 Diamonds", p: 480 }, { n: "429 Diamonds", p: 595 }, { n: "514 Diamonds", p: 725 },
      { n: "600 Diamonds", p: 835 }
    ],
    MEDIUM: [
      { n: "686 Diamonds", p: 945 }, { n: "706 Diamonds", p: 955 }, { n: "792 Diamonds", p: 1068 },
      { n: "878 Diamonds", p: 1180 }, { n: "963 Diamonds", p: 1295 }
    ],
    LARGE: [
      { n: "1049 Diamonds", p: 1435 }, { n: "1135 Diamonds", p: 1550 }, { n: "1412 Diamonds", p: 1895 },
      { n: "2195 Diamonds", p: 2850 }, { n: "3688 Diamonds", p: 4730 }, { n: "5532 Diamonds", p: 7165 },
      { n: "9288 Diamonds", p: 12000 }
    ],
    PASSES: [
      { n: "Weekly Pass", p: 155 }, { n: "Starlight Card", p: 260 }, { n: "Premium Starlight", p: 500 }
    ]
  };

  const handlePayment = () => {
    if (!selectedPack || !playerID) return;
    setIsProcessing(true);
    const upiURL = `upi://pay?pa=${myUPI}&pn=Doahla%20Store&am=${selectedPack.p}&cu=INR&tn=Order%20${selectedPack.n}`;
    window.location.href = upiURL;
    
    // Auto-message backup after delay
    setTimeout(() => {
      const msg = `Hi Doahla! I paid ₹${selectedPack.p} for ${selectedPack.n}.\nID: ${playerID} (${zoneID})`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
      setIsProcessing(false);
    }, 5000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-zinc-900 text-pink-500' : 'bg-[#fff0f5] text-black'}`}>
      
      {/* 1. PINK MARQUEE */}
      <div className="bg-pink-500 text-white py-1 overflow-hidden whitespace-nowrap border-b border-pink-600">
        <div className="animate-marquee inline-block text-[10px] font-bold uppercase tracking-widest">
          FOLLOW OUR INSTAGRAM PAGE @DOAHLAOFFICIAL_STORE — JOIN OUR WHATSAPP COMMUNITY FOR UPDATES — BEST PRICES GUARANTEED —&nbsp;
        </div>
        <div className="animate-marquee inline-block text-[10px] font-bold uppercase tracking-widest">
          FOLLOW OUR INSTAGRAM PAGE @DOAHLAOFFICIAL_STORE — JOIN OUR WHATSAPP COMMUNITY FOR UPDATES — BEST PRICES GUARANTEED —&nbsp;
        </div>
      </div>

      {/* 2. HEADER & TOGGLE */}
      <div className="p-6 flex flex-col items-center relative">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`absolute right-6 top-6 p-2 rounded-full border-2 border-pink-500 shadow-md ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <h1 className="text-3xl font-black italic tracking-tighter mt-4 text-center">DOAHLA OFFICIAL STORE</h1>
      </div>

      {/* 3. MAIN CONTENT (SWITCHED BY TABS) */}
      <main className="max-w-xl mx-auto px-4 pb-32">
        
        {activeTab === 'HOME' && !selectedGame && (
          <div className={`p-4 rounded-[2rem] border-2 border-pink-500 ${!darkMode ? 'bg-white/50' : 'bg-black/20'}`}>
            <h2 className="text-[10px] font-bold mb-4 uppercase tracking-widest text-center">Select Game</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* MLBB - CLICKABLE */}
              <div onClick={() => setSelectedGame('MLBB')} className="cursor-pointer border-2 border-pink-500 rounded-2xl overflow-hidden hover:scale-105 transition-transform bg-black">
                <img src="/mlbb.jpg" className="w-full h-32 object-contain" alt="MLBB" />
                <p className="text-center text-[10px] font-black py-2 bg-pink-500 text-white uppercase italic">MOBILE LEGENDS</p>
              </div>
              {/* COMING SOON GAMES */}
              {['Clash of Clans', 'BGMI', 'COD Mobile'].map(game => (
                <div key={game} className="relative border-2 border-pink-200/50 rounded-2xl overflow-hidden bg-black opacity-60">
                  <div className="h-32 flex items-center justify-center font-black text-zinc-700 text-xs text-center p-2 uppercase italic">{game}</div>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-500 text-white text-[8px] font-bold px-2 py-1 rounded-full whitespace-nowrap">COMING SOON</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MLBB DETAILS VIEW */}
        {selectedGame === 'MLBB' && activeTab === 'HOME' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <button onClick={() => {setSelectedGame(null); setSelectedPack(null);}} className="text-[10px] font-bold underline">← BACK TO GAMES</button>
            
            <div className="flex gap-2">
              <input placeholder="PLAYER ID" value={playerID} onChange={e=>setPlayerID(e.target.value)} className={`w-full p-4 rounded-xl border-2 border-pink-500 outline-none font-bold text-sm ${darkMode ? 'bg-black' : 'bg-white'}`} />
              <input placeholder="ZONE" value={zoneID} onChange={e=>setZoneID(e.target.value)} className={`w-24 p-4 rounded-xl border-2 border-pink-500 outline-none font-bold text-sm ${darkMode ? 'bg-black' : 'bg-white'}`} />
            </div>

            {Object.keys(packs).map(cat => (
              <div key={cat}>
                <h3 className="text-xs font-black mb-2 italic border-b border-pink-500/30 pb-1">{cat} PACKS</h3>
                <div className="grid grid-cols-2 gap-2">
                  {packs[cat].map((p: any) => (
                    <button 
                      key={p.n} 
                      onClick={() => setSelectedPack(p)}
                      className={`p-3 rounded-xl border-2 transition-all text-left ${selectedPack?.n === p.n ? 'bg-pink-500 text-white border-white' : 'border-pink-500/20'}`}
                    >
                      <p className="text-[11px] font-bold leading-none">{p.n}</p>
                      <p className="text-sm font-black italic">₹{p.p}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button 
              disabled={!selectedPack || !playerID || isProcessing}
              onClick={handlePayment}
              className="w-full bg-pink-500 text-white h-16 rounded-2xl font-black italic text-lg shadow-xl active:scale-95 disabled:opacity-20 transition-all"
            >
              {isProcessing ? 'PROCESSING...' : 'PROCEED TO PAY'}
            </button>
          </div>
        )}

        {/* 4. SUPPORT PAGE */}
        {activeTab === 'SUPPORT' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black italic">SUPPORT CENTER</h2>
            <div className={`p-6 rounded-3xl border-2 border-pink-500 space-y-4 ${darkMode ? 'bg-black' : 'bg-white'}`}>
              <div>
                <p className="text-[10px] font-bold text-pink-500">WHATSAPP SUPPORT</p>
                <p className="font-bold">7085340215 / 70057 95669</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-pink-500">GMAIL SUPPORT</p>
                <p className="font-bold">evyyzhimomi@gamil.com</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-pink-500">INSTAGRAM</p>
                <p className="font-bold">@Doahlaofficial_store</p>
              </div>
              <a href="https://chat.whatsapp.com/HKTFxXfoSWQ0uxSDlyvfO9" className="block p-4 bg-pink-500 text-white rounded-xl text-center font-black text-sm">JOIN WHATSAPP GROUP</a>
            </div>
          </div>
        )}

        {/* 5. POLICIES PAGE */}
        {activeTab === 'POLICIES' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black italic uppercase">Terms & Policies</h2>
            <div className={`p-6 rounded-3xl border-2 border-pink-500 space-y-4 text-xs font-bold leading-relaxed ${darkMode ? 'bg-black' : 'bg-white'}`}>
              <p>1. Orders are typically completed within 5–30 minutes.</p>
              <p>2. In case of server delays, processing may take longer. Rest assured, your funds and diamonds are 100% safe.</p>
              <p>3. Please refrain from spamming WhatsApp DMs if your order hasn't arrived instantly; we process in sequence.</p>
              <p className="text-pink-600">4. Strictly NO REFUNDS for orders placed with incorrect User IDs or Zone IDs.</p>
              <p>5. 100% Refund guaranteed if we are unable to fulfill the order to your account.</p>
            </div>
          </div>
        )}
      </main>

      {/* 6. BOTTOM NAVIGATION */}
      <nav className={`fixed bottom-0 left-0 right-0 p-4 border-t border-pink-500/20 flex justify-around items-center z-50 ${darkMode ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-md`}>
        {['HOME', 'SUPPORT', 'POLICIES'].map(tab => (
          <button 
            key={tab} 
            onClick={() => {setActiveTab(tab); setSelectedGame(null);}}
            className={`text-[10px] font-black tracking-widest transition-all ${activeTab === tab ? 'text-pink-500 scale-110 underline decoration-2 underline-offset-4' : 'text-gray-500'}`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}