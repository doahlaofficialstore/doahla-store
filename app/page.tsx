"use client";
import React, { useState, useEffect } from 'react';

export default function DoahlaStore() {
  const [playerID, setPlayerID] = useState('');
  const [zoneID, setZoneID] = useState('');
  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const myUPI = "rajinanaga@okhdfcbank";
  const myNumber = "917005739323";

  // YOUR NEW UPDATED PRICE LIST
  const mlbbPacks = [
    { name: "5 Diamonds", price: 16, cat: "SMALL" },
    { name: "11 Diamonds", price: 25, cat: "SMALL" },
    { name: "14 Diamonds", price: 34, cat: "SMALL" },
    { name: "22 Diamonds", price: 42, cat: "SMALL" },
    { name: "33 Diamonds", price: 64, cat: "SMALL" },
    { name: "86 Diamonds", price: 132, cat: "SMALL" },
    { name: "110 Diamonds", price: 163, cat: "SMALL" },
    { name: "172 Diamonds", price: 252, cat: "SMALL" },
    { name: "275 Diamonds", price: 395, cat: "SMALL" },
    { name: "343 Diamonds", price: 480, cat: "SMALL" },
    { name: "429 Diamonds", price: 595, cat: "SMALL" },
    { name: "514 Diamonds", price: 725, cat: "SMALL" },
    { name: "600 Diamonds", price: 835, cat: "SMALL" },
    { name: "686 Diamonds", price: 945, cat: "MEDIUM" },
    { name: "706 Diamonds", price: 955, cat: "MEDIUM" },
    { name: "792 Diamonds", price: 1068, cat: "MEDIUM" },
    { name: "878 Diamonds", price: 1180, cat: "MEDIUM" },
    { name: "963 Diamonds", price: 1295, cat: "MEDIUM" },
    { name: "1049 Diamonds", price: 1435, cat: "LARGE" },
    { name: "1135 Diamonds", price: 1550, cat: "LARGE" },
    { name: "1412 Diamonds", price: 1895, cat: "LARGE" },
    { name: "2195 Diamonds", price: 2850, cat: "LARGE" },
    { name: "3688 Diamonds", price: 4730, cat: "LARGE" },
    { name: "5532 Diamonds", price: 7165, cat: "LARGE" },
    { name: "9288 Diamonds", price: 12000, cat: "LARGE" },
    { name: "Weekly Pass 1x", price: 155, cat: "PASS" },
    { name: "Double 50+50", price: 95, cat: "DOUBLE" },
    { name: "Double 150+150", price: 245, cat: "DOUBLE" },
    { name: "Twilight Pass", price: 790, cat: "PASS" },
  ];

  useEffect(() => {
    let timer: any;
    if (isProcessing && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isProcessing && countdown === 0 && selectedPack) {
      window.location.href = `upi://pay?pa=${myUPI}&pn=Doahla%20Store&am=${selectedPack.price}&cu=INR&tn=MLBB%20Order`;
      setTimeout(() => {
        const msg = `Hi! I paid ₹${selectedPack.price} for ${selectedPack.name}.\nID: ${playerID} (${zoneID})`;
        window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(msg)}`, '_blank');
        setIsProcessing(false);
        setCountdown(5);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isProcessing, countdown, selectedPack, playerID, zoneID]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-20">
      {/* Header Area */}
      <div className="p-8 text-center border-b border-pink-500/10">
        <h1 className="text-3xl font-black italic text-pink-500 tracking-tighter">DOAHLA OFFICIAL STORE</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-1">Safest & Most Affordable Store</p>
      </div>

      <div className="max-w-xl mx-auto p-4 space-y-8">
        {/* Game Selection (The Grid You Liked) */}
        <section>
          <h2 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">Featured Games</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-pink-500 rounded-3xl p-1 bg-zinc-900 overflow-hidden">
               <img src="/mlbb.jpg" className="rounded-2xl w-full h-32 object-cover opacity-80" alt="MLBB" />
               <p className="text-center py-2 text-[10px] font-bold italic">MOBILE LEGENDS</p>
            </div>
            <div className="border border-zinc-800 rounded-3xl p-1 bg-zinc-900/50 opacity-40">
               <div className="h-32 flex items-center justify-center text-[10px] font-bold">COMING SOON</div>
               <p className="text-center py-2 text-[10px] font-bold italic text-gray-500">CLASH OF CLANS</p>
            </div>
          </div>
        </section>

        {/* The Checkout Section */}
        <section className="bg-zinc-900/50 border border-pink-500/20 rounded-[2rem] p-6 space-y-6">
          <div className="flex gap-2">
            <input placeholder="User ID" value={playerID} onChange={(e)=>setPlayerID(e.target.value)} className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-sm focus:border-pink-500 outline-none" />
            <input placeholder="Zone" value={zoneID} onChange={(e)=>setZoneID(e.target.value)} className="w-24 bg-black border border-zinc-800 p-4 rounded-2xl text-sm focus:border-pink-500 outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {mlbbPacks.map((pack) => (
              <button 
                key={pack.name} 
                onClick={() => setSelectedPack(pack)}
                className={`text-left p-3 rounded-xl border transition-all ${selectedPack?.name === pack.name ? 'border-pink-500 bg-pink-500/10' : 'border-zinc-800 bg-black'}`}
              >
                <p className="text-[8px] text-pink-500 font-bold">{pack.cat}</p>
                <p className="text-xs font-bold truncate">{pack.name}</p>
                <p className="font-black text-sm">₹{pack.price}</p>
              </button>
            ))}
          </div>

          <button 
            disabled={!selectedPack || !playerID || isProcessing}
            onClick={() => setIsProcessing(true)}
            className="w-full bg-pink-500 h-16 rounded-2xl font-black italic tracking-tight shadow-lg shadow-pink-500/20 active:scale-95 transition-all disabled:opacity-30"
          >
            {isProcessing ? `REDIRECTING IN ${countdown}...` : 'PURCHASE NOW'}
          </button>
        </section>

        <footer className="text-center space-y-4">
          <a href="https://chat.whatsapp.com/HKTFxXfoSWQ0uxSDlyvfO9" className="text-pink-500 text-[10px] font-bold underline">JOIN WHATSAPP COMMUNITY</a>
          <div className="flex justify-center gap-8 text-[10px] font-bold text-gray-600">
            <span>HOME</span>
            <span>SUPPORT</span>
            <span>POLICIES</span>
          </div>
        </footer>
      </div>
    </div>
  );
}