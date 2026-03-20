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

  const mlbbPacks = [
    { name: "5 Diamonds", price: 16, cat: "SMALL" }, { name: "11 Diamonds", price: 25, cat: "SMALL" },
    { name: "14 Diamonds", price: 34, cat: "SMALL" }, { name: "22 Diamonds", price: 42, cat: "SMALL" },
    { name: "33 Diamonds", price: 64, cat: "SMALL" }, { name: "86 Diamonds", price: 132, cat: "SMALL" },
    { name: "110 Diamonds", price: 163, cat: "SMALL" }, { name: "172 Diamonds", price: 252, cat: "SMALL" },
    { name: "275 Diamonds", price: 395, cat: "SMALL" }, { name: "343 Diamonds", price: 480, cat: "SMALL" },
    { name: "429 Diamonds", price: 595, cat: "SMALL" }, { name: "514 Diamonds", price: 725, cat: "SMALL" },
    { name: "600 Diamonds", price: 835, cat: "SMALL" }, { name: "686 Diamonds", price: 945, cat: "MEDIUM" },
    { name: "706 Diamonds", price: 955, cat: "MEDIUM" }, { name: "792 Diamonds", price: 1068, cat: "MEDIUM" },
    { name: "878 Diamonds", price: 1180, cat: "MEDIUM" }, { name: "963 Diamonds", price: 1295, cat: "MEDIUM" },
    { name: "1049 Diamonds", price: 1435, cat: "LARGE" }, { name: "1135 Diamonds", price: 1550, cat: "LARGE" },
    { name: "1412 Diamonds", price: 1895, cat: "LARGE" }, { name: "2195 Diamonds", price: 2850, cat: "LARGE" },
    { name: "3688 Diamonds", price: 4730, cat: "LARGE" }, { name: "5532 Diamonds", price: 7165, cat: "LARGE" },
    { name: "9288 Diamonds", price: 12000, cat: "LARGE" }, { name: "Weekly Pass 1x", price: 155, cat: "PASS" },
    { name: "Double 50+50", price: 95, cat: "PROMO" }, { name: "Double 150+150", price: 245, cat: "PROMO" },
    { name: "Twilight Pass", price: 790, cat: "PASS" }
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
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
      {/* Pink Announcement Banner */}
      <div className="bg-pink-500 py-2 px-4 whitespace-nowrap overflow-hidden">
        <p className="text-[9px] font-bold uppercase tracking-widest inline-block animate-marquee">
          FOLLOW US ON INSTAGRAM @DOAHLAOFFICIAL_STORE FOR UPDATES — JOIN OUR WHATSAPP COMMUNITY FOR EXCLUSIVE OFFERS — 
        </p>
      </div>

      <div className="p-6 relative">
        {/* The Theme Toggle Sun Button exactly where it was */}
        <div className="absolute right-6 top-10 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/20">
          ☀️
        </div>

        <header className="mb-10 mt-4">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase text-pink-500">DOAHLA OFFICIAL STORE</h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Featured Games</p>
        </header>

        {/* 4-Card Grid Exactly like your screenshot */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="relative border-2 border-pink-500 rounded-3xl p-1 bg-zinc-900 overflow-hidden">
            <img src="/mlbb.jpg" className="rounded-2xl w-full h-32 object-cover" alt="MLBB" />
            <p className="text-center py-3 text-[10px] font-black italic tracking-tighter">MOBILE LEGENDS</p>
          </div>
          <div className="relative border border-zinc-800 rounded-3xl p-1 bg-zinc-900 opacity-50">
            <img src="/coc.jpg" className="rounded-2xl w-full h-32 object-cover grayscale" alt="COC" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-500 text-[8px] font-bold px-3 py-1 rounded-full">COMING SOON</span>
            <p className="text-center py-3 text-[10px] font-black italic tracking-tighter text-gray-400">CLASH OF CLANS</p>
          </div>
          <div className="relative border border-zinc-800 rounded-3xl p-1 bg-zinc-900 opacity-50">
            <div className="h-32 bg-black rounded-2xl flex items-center justify-center italic font-black text-zinc-700">BGMI</div>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-500 text-[8px] font-bold px-3 py-1 rounded-full">COMING SOON</span>
            <p className="text-center py-3 text-[10px] font-black italic tracking-tighter text-gray-400">BGMI INDIA</p>
          </div>
          <div className="relative border border-zinc-800 rounded-3xl p-1 bg-zinc-900 opacity-50">
            <img src="/codm.jpg" className="rounded-2xl w-full h-32 object-cover grayscale" alt="CODM" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-500 text-[8px] font-bold px-3 py-1 rounded-full">COMING SOON</span>
            <p className="text-center py-3 text-[10px] font-black italic tracking-tighter text-gray-400">COD MOBILE</p>
          </div>
        </div>

        {/* Input & List Section */}
        <section className="space-y-4 max-w-lg mx-auto bg-zinc-900/40 p-5 rounded-[2.5rem] border border-pink-500/10">
          <div className="flex gap-2">
            <input placeholder="ID" value={playerID} onChange={(e)=>setPlayerID(e.target.value)} className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-sm focus:border-pink-500 outline-none" />
            <input placeholder="Zone" value={zoneID} onChange={(e)=>setZoneID(e.target.value)} className="w-24 bg-black border border-zinc-800 p-4 rounded-2xl text-sm focus:border-pink-500 outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
            {mlbbPacks.map((pack) => (
              <button key={pack.name} onClick={() => setSelectedPack(pack)} className={`text-left p-3 rounded-xl border transition-all ${selectedPack?.name === pack.name ? 'border-pink-500 bg-pink-500/10' : 'border-zinc-800 bg-black'}`}>
                <p className="text-[7px] text-pink-500 font-bold">{pack.cat}</p>
                <p className="text-[11px] font-bold truncate">{pack.name}</p>
                <p className="font-black text-xs text-pink-500">₹{pack.price}</p>
              </button>
            ))}
          </div>

          <button disabled={!selectedPack || !playerID || isProcessing} onClick={() => setIsProcessing(true)} className="w-full bg-pink-500 h-16 rounded-2xl font-black italic shadow-lg shadow-pink-500/30 active:scale-95 transition-all disabled:opacity-20">
            {isProcessing ? `LOADING ${countdown}s` : 'PURCHASE NOW'}
          </button>
        </section>

        <footer className="mt-10 flex justify-around text-[10px] font-black text-zinc-600 tracking-widest border-t border-zinc-900 pt-6">
          <span>HOME</span>
          <a href="https://chat.whatsapp.com/HKTFxXfoSWQ0uxSDlyvfO9">SUPPORT</a>
          <span>POLICIES</span>
        </footer>
      </div>
    </div>
  );
}