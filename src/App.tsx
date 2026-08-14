import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, ChevronDown } from "lucide-react";

const PASSCODE = "COLGATE";
import FlowerScene3D from "./components/FlowerScene3D";
import ButterflyBackground from "./components/ButterflyBackground";
import FlowerGarden from "./components/FlowerGarden";
import PhotoGallery from "./components/PhotoGallery";
import TikTokDM from "./components/TikTokDM";

const Typewriter = ({
  text,
  delay = 50,
  onComplete,
}: {
  text: string;
  delay?: number;
  onComplete?: () => void;
}) => {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, delay, onComplete]);

  return <span className="font-mono">{currentText}</span>;
};

export default function App() {
  const [stage, setStage] = useState<"console" | "reveal">("console");
  const [consoleFinished, setConsoleFinished] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const tryUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (code === PASSCODE) {
      setStage("reveal");
    } else {
      setError(true);
    }
  };

  return (
    <div
      className={`relative min-h-screen w-full flex items-center justify-center bg-[#08060f] selection:bg-purple-deep/30`}
    >
      <div className="scanline" />

      <AnimatePresence mode="wait">
        {stage === "console" ? (
          <motion.div
            key="console"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full max-w-2xl p-8 font-mono text-sm md:text-base text-white/80"
          >
            <div className="space-y-2">
              <div className="flex gap-2 text-purple-soft/60">
                <span>[system]</span>
                <Typewriter
                  text="Initializing heart.PROTOCOL_v2.0..."
                  delay={30}
                  onComplete={() => setConsoleFinished(true)}
                />
              </div>

              <div className="flex gap-2 h-6">
                <span>[status]</span>
                {consoleFinished && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-400"
                  >
                    READY
                  </motion.span>
                )}
              </div>

              {consoleFinished && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-8 flex flex-col items-start gap-6"
                >
                  <p className="text-white/40 italic">
                    {">"} One encrypted package found for you.
                  </p>

                  <form
                    onSubmit={tryUnlock}
                    className="pt-6 w-full flex flex-col items-start gap-5"
                  >
                    <label
                      htmlFor="passcode"
                      className="text-[10px] uppercase tracking-[0.3em] text-purple-soft/50"
                    >
                      enter passcode to decrypt
                    </label>

                    <div className="w-full max-w-xs flex items-center gap-2">
                      <span className="text-purple-soft/70">{"->"}</span>
                      <input
                        id="passcode"
                        type="text"
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value.toUpperCase());
                          setError(false);
                        }}
                        placeholder="PASSCODE"
                        autoCapitalize="characters"
                        autoComplete="off"
                        spellCheck={false}
                        className="flex-1 bg-transparent border-b border-purple-deep/40 focus:border-purple-soft outline-none py-2 font-mono tracking-[0.35em] uppercase text-purple-soft placeholder:text-white/15"
                      />
                    </div>

                    {error && (
                      <p className="text-red-400/90 text-xs font-mono">
                        access denied ; invalid passcode
                      </p>
                    )}

                    <button
                      type="submit"
                      className="group flex items-center gap-3 px-6 py-3 border border-purple-deep/30 bg-purple-deep/5 hover:bg-purple-deep/10 text-purple-soft transition-all duration-300 pointer-events-auto"
                    >
                      <Lock
                        size={16}
                        className="group-hover:rotate-12 transition-transform"
                      />
                      <span className="font-mono tracking-widest uppercase text-xs">
                        Decrypt Message
                      </span>
                      <span className="terminal-cursor" />
                    </button>
                  </form>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full min-h-screen overflow-x-hidden"
          >
            <section className="relative h-svh min-h-[560px] w-full flex items-center justify-center overflow-hidden">
              <FlowerScene3D />

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 1.5 }}
                className="z-20 text-center px-6"
              >
                <h2 className="text-purple-deep font-mono text-xl tracking-[0.3em] uppercase glow-text mb-2">
                  Decrypted
                </h2>
                <div className="w-12 h-px bg-purple-deep/30 mx-auto mb-8" />

                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCode("");
                    setError(false);
                    setStage("console");
                  }}
                  className="text-white/20 hover:text-white/60 transition-colors uppercase text-[10px] tracking-widest font-mono"
                >
                  Re-encrypt
                </motion.button>
              </motion.div>

              {/* Subtle tech overlays */}
              <div className="absolute top-8 left-4 sm:left-8 text-[10px] font-mono text-white/10 uppercase tracking-widest space-y-1">
                <div>ln: 420</div>
                <div>id: 0xDEADBEEF</div>
                <div>type: organic_emotion</div>
              </div>

              <div className="absolute bottom-8 right-4 sm:right-8 text-[10px] font-mono text-white/10 uppercase tracking-widest">
                flower_reveal // success
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4 }}
                onClick={(e) => {
                  e.stopPropagation();
                  document
                    .getElementById("garden")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-purple-soft/50 hover:text-purple-soft transition-colors animate-bounce"
                aria-label="Scroll to more flowers"
              >
                <ChevronDown size={28} />
              </motion.button>
            </section>

            <FlowerGarden />
            <PhotoGallery />
            <TikTokDM />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
