"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Waves, MapPin, Info, Settings, Bell, BookOpen, Heart } from "lucide-react";
import { Beach } from "@/types";
import { BEACHES } from "@/lib/beaches";
import { MAX_FAVORITES } from "@/lib/useFavorites";
import FavoriteBeachRow from "./FavoriteBeachRow";

interface Props {
  open: boolean;
  onClose: () => void;
  favoriteIds: string[];
  onSelectBeach: (beach: Beach) => void;
  onRemoveFavorite: (beachId: string) => void;
}

function SoonBadge() {
  return (
    <span className="ml-auto text-[10px] font-bold text-white/25 bg-white/10 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
      Soon
    </span>
  );
}

export default function SideDrawer({
  open,
  onClose,
  favoriteIds,
  onSelectBeach,
  onRemoveFavorite,
}: Props) {
  const favoriteBeaches = favoriteIds
    .map((id) => BEACHES.find((b) => b.id === id))
    .filter(Boolean) as Beach[];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Dark overlay — tap to close */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 left-0 bottom-0 z-50 w-[78%] max-w-[340px] flex flex-col"
            style={{ background: "linear-gradient(180deg, #0c1a2e 0%, #0a1628 100%)" }}
          >
            {/* Header */}
            <div className="pt-safe px-5 pb-4 pt-12">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                  <Waves className="w-5 h-5 text-sky-400" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-white font-black text-base tracking-tight">WaveGuard</p>
                  <p className="text-white/30 text-[10px]">Portugal Beach Safety</p>
                </div>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-3 pb-4">

              {/* My Beaches section */}
              <div className="mb-2">
                <div className="flex items-center justify-between px-3 mb-1">
                  <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest">
                    My Beaches
                  </p>
                  <p className="text-[11px] text-white/25">
                    {favoriteIds.length}/{MAX_FAVORITES}
                  </p>
                </div>

                {favoriteBeaches.length === 0 ? (
                  <div className="px-3 py-5 text-center">
                    <Heart className="w-8 h-8 text-white/10 mx-auto mb-2" />
                    <p className="text-white/30 text-xs leading-relaxed">
                      Tap the ❤️ on any beach{"\n"}to save it here.
                    </p>
                  </div>
                ) : (
                  <div>
                    {favoriteBeaches.map((beach, i) => (
                      <FavoriteBeachRow
                        key={beach.id}
                        beach={beach}
                        index={i}
                        onSelect={(b) => {
                          onSelectBeach(b);
                          onClose();
                        }}
                        onRemove={onRemoveFavorite}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-white/8 my-3 mx-3" />

              {/* Navigation items */}
              <nav className="flex flex-col gap-0.5">
                <NavItem icon={<MapPin className="w-4 h-4" />} label="All Beaches" onClick={onClose} active />
                <NavItem icon={<Bell className="w-4 h-4" />} label="Alerts" soon />
                <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" soon />
                <NavItem icon={<Info className="w-4 h-4" />} label="About" soon />
              </nav>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-white/8">
              <button className="flex items-center gap-2 text-white/25 hover:text-white/50 transition-colors">
                <BookOpen className="w-3.5 h-3.5" />
                <span className="text-xs">Understand the data</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function NavItem({
  icon,
  label,
  onClick,
  active,
  soon,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  soon?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={soon}
      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-colors text-left ${
        active
          ? "bg-white/10 text-white"
          : "text-white/50 hover:text-white/80 hover:bg-white/5"
      } ${soon ? "cursor-default" : ""}`}
    >
      <span className={active ? "text-sky-400" : ""}>{icon}</span>
      <span className="text-sm font-medium">{label}</span>
      {soon && <SoonBadge />}
    </button>
  );
}
