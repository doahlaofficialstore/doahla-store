"use client";
import React, { useState, useEffect } from 'react';

export default function DoahlaStore() {
  const [playerID, setPlayerID] = useState('');
  const [zoneID, setZoneID] = useState('');
  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const myUPI = "rajinanaga@okhdfcbank";
  const myNumber = "917005739323"; // Adjust if your WhatsApp number is different

  const diamondPacks = [
    { name: "5 Diamonds", price: 16, category: "SMALL" },
    { name: "11 Diamonds", price: 25, category: "SMALL" },
    { name: "14 Diamonds", price: 34, category: "SMALL" },
    { name: "22 Diamonds", price: 42, category: "SMALL" },
    { name: "33 Diamonds", price: 64, category: "SMALL" },
    { name: "86 Diamonds", price: 132, category: "SMALL" },
    { name: "110 Diamonds", price: 163, category: "SMALL" },
    { name: "172 Diamonds", price: 252, category: "SMALL" },
    { name: "275 Diamonds", price: 395, category: "SMALL" },
    { name: "343 Diamonds", price: 480, category: "SMALL" },
    { name: "429 Diamonds", price: 595, category: "SMALL" },
    { name: "514 Diamonds", price: 725, category: "SMALL" },
    { name: "600 Diamonds", price: 835, category: "SMALL" },
    { name: "686 Diamonds", price: 945, category: "MEDIUM" },
    { name: "706 Diamonds", price: 955, category: "MEDIUM" },
    { name: "792 Diamonds", price: 1068, category: "MEDIUM" },
    { name: "878 Diamonds", price: 1180, category: "MEDIUM" },
    { name: "963 Diamonds", price: 1295, category: "MEDIUM" },
    { name: "1049 Diamonds", price: 1435, category: "LARGE" },
    { name: "1135 Diamonds", price: 1550, category: "LARGE" },
    { name: "1412 Diamonds", price: 1895, category: "LARGE" },
    { name: "2195 Diamonds", price: 2850, category: "LARGE" },
    { name: "3688 Diamonds", price: 4730, category: "LARGE" },
    { name: "5532 Diamonds", price: 7165, category: "LARGE" },
    { name: "9288 Diamonds", price: 12000, category: "LARGE" },
    { name: "Weekly Pass 1x", price: 155, category: "PASSES" },
    { name: "Weekly Pass 2x", price: 310, category: "PASSES" },
    { name: "Double 50+50", price: 95, category: "PROMO" },
    { name: "Double 150+150", price: 245, category: "PROMO" },
    { name: "Twilight Pass", price: 790, category: "PASSES" },
  ];

  useEffect(() => {
    let timer: any;
    if (isProcessing && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isProcessing && countdown === 0 && selectedPack) {
      const upiURL = `upi://pay?pa=${myUPI}&pn=Doahla%20Store&am=${selectedPack.price}&cu=INR&tn=MLBB%20Topup`;
      
      // Attempt to open Payment App
      window.location.href = upiURL;

      // Backup WhatsApp Redirect after 4 seconds
      setTimeout(() => {
        const msg = `Hi Doahla! I want to buy ${selectedPack.name} (₹${selectedPack.price}).\nID: ${playerID}\nZone: ${zoneID}`;
        window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(msg)}`, '_blank');
        setIsProcessing(false);
        setCountdown(5);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isProcessing, countdown, selectedPack, playerID, zoneID]);

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-black italic text-pink-500 mb-2">DOAHLA OFFICIAL STORE</h1>
        <p className="text-gray-400">Most Safest and Affordable Store 🪄</p>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        {/* User Info Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <input 
            placeholder="Player ID" 
            className="bg-zinc-900 border border-pink-500/30 p-3 rounded-xl focus:outline-none focus:border-pink-500"
            value={playerID}
            onChange={(e) => setPlayerID(e.target.value)}
          />
          <input 
            placeholder="Zone ID" 
            className="bg-zinc-900 border border-pink-500/30 p-3 rounded-xl focus:outline-none focus:border-pink-500"
            value={zoneID}
            onChange={(e) => setZoneID(e.target.value)}
          />
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-2 gap-3 h-[400px] overflow-y-auto pr-2 scrollbar-hide">
          {diamondPacks.map((pack) => (
            <button 
              key={pack.name}
              onClick={() => setSelectedPack(pack)}
              className={`p-4 rounded-2xl border-2 transition-all text-left ${
                selectedPack?.name === pack.name 
                ? 'border-pink-500 bg-pink-500/10' 
                : 'border-zinc-800 bg-zinc-900'
              }`}
            >
              <div className="text-xs text-pink-400 font-bold">{pack.category}</div>
              <div className="font-bold">{pack.name}</div>
              <div className="text-lg font-black text-pink-500">₹{pack.price}</div>
            </button>
          ))}
        </div>

        {/* Buy Button */}
        <button 
          disabled={!selectedPack || !playerID || isProcessing}
          onClick={() => setIsProcessing(true)}
          className="w-full bg-pink-500 py-4 rounded-2xl font-black text-xl shadow-lg shadow-pink-500/20 disabled:opacity-50 active:scale-95 transition-transform"
        >
          {isProcessing ? `OPENING PAYMENT IN ${countdown}s...` : 'BUY NOW'}
        </button>

        {/* WhatsApp Group Link */}
        <a 
          href="https://chat.whatsapp.com/HKTFxXfoSWQ0uxSDlyvfO9"
          className="block text-center text-pink-400 text-sm underline mt-4"
        >
          Join our official WhatsApp Group
        </a>
      </div>
    </div>
  );
}