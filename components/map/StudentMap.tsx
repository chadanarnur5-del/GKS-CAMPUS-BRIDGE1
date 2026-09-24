'use client';

import React, { useState } from 'react';
import { MapPin, Search, Navigation, Utensils, Building2, Store, Clock, ExternalLink } from 'lucide-react';
import { SourceBadge } from '@/components/ui/SourceBadge';

export interface CampusPlace {
  id: string;
  nameEn: string;
  nameKo: string;
  category: 'Halal Food' | 'University Office' | 'Immigration' | 'Mart & 24/7' | 'Study Cafe';
  distanceMinutes: number;
  isOpenNow: boolean;
  openHours: string;
  address: string;
  dietaryTags: string[];
}

const SAMPLE_PLACES: CampusPlace[] = [
  {
    id: 'place-1',
    nameEn: 'Pasha Halal Kebabs & Rice',
    nameKo: '파샤 할랄 케밥',
    category: 'Halal Food',
    distanceMinutes: 8,
    isOpenNow: true,
    openHours: '10:00 - 22:00',
    address: 'Gwanak-gu, Sillim-dong 12-4',
    dietaryTags: ['Halal', 'No Pork', 'Cheap'],
  },
  {
    id: 'place-2',
    nameEn: 'Seoul Immigration Office (Sillim Annex)',
    nameKo: '서울 출입국·외국인청',
    category: 'Immigration',
    distanceMinutes: 22,
    isOpenNow: false,
    openHours: '09:00 - 18:00 (Weekdays)',
    address: 'Yangcheon-gu, Mokdongdong-ro 151',
    dietaryTags: ['Official Registration', 'ARC Issued'],
  },
  {
    id: 'place-3',
    nameEn: 'GS25 24/7 University Convenience Store',
    nameKo: 'GS25 관악캠퍼스점',
    category: 'Mart & 24/7',
    distanceMinutes: 3,
    isOpenNow: true,
    openHours: '24 Hours',
    address: 'On-Campus Student Center 1F',
    dietaryTags: ['24/7', 'T-Money Recharge', 'ATM'],
  },
];

export const StudentMap: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [filterHalalOnly, setFilterHalalOnly] = useState(false);

  const filteredPlaces = SAMPLE_PLACES.filter((place) => {
    const matchesSearch =
      place.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      place.nameKo.includes(search) ||
      place.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCat === 'All' || place.category === selectedCat;
    const matchesHalal = !filterHalalOnly || place.dietaryTags.includes('Halal');

    return matchesSearch && matchesCategory && matchesHalal;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold">Korea Student Map & Services</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">Verified locations, open status, and student dietary options</p>
        </div>
        <SourceBadge type="university" text="Kakao Map Data" />
      </div>

      {/* Controls */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search places, halal food, 24/7 stores, immigration..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-sm focus:outline-none focus:border-emerald-500 text-slate-100 placeholder-slate-500"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['All', 'Halal Food', 'Immigration', 'Mart & 24/7', 'University Office'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedCat === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800/40 text-slate-400 border border-slate-700/40 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs text-emerald-400 cursor-pointer bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <input
              type="checkbox"
              checked={filterHalalOnly}
              onChange={(e) => setFilterHalalOnly(e.target.checked)}
              className="rounded accent-emerald-500"
            />
            <span className="font-semibold">Halal Only</span>
          </label>
        </div>
      </div>

      {/* Interactive List Representation */}
      <div className="grid gap-3">
        {filteredPlaces.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs border border-slate-800 rounded-xl">
            No matching campus places found.
          </div>
        ) : (
          filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="p-4 bg-slate-800/30 border border-slate-800 hover:border-slate-700 rounded-xl transition space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-100">{place.nameEn}</h3>
                    <span className="text-xs text-slate-400 font-serif">({place.nameKo})</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {place.address} • <strong>{place.distanceMinutes} min walk</strong>
                    </span>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                    place.isOpenNow
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  {place.isOpenNow ? 'Open Now' : 'Closed'}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {place.dietaryTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-medium border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={`https://map.kakao.com/link/search/${encodeURIComponent(place.nameKo)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 text-[11px]"
                >
                  Open in KakaoMap <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
