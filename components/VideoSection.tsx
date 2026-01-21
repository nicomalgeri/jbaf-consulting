'use client';

import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-play when in view (muted for autoplay policy)
  useEffect(() => {
    if (videoRef.current) {
      if (isInView && !hasInteracted) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else if (!isInView && !hasInteracted) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isInView, hasInteracted]);

  const togglePlay = () => {
    if (videoRef.current) {
      setHasInteracted(true);
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03] tech-pattern tech-pattern-light" />

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-h2 font-heading text-primary-900 mb-3 sm:mb-4">
            See JBAF in Action
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            A message from our founder on how we deliver lasting impact
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center"
        >
          {/* iPhone-style frame container */}
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px]">
            {/* Phone frame */}
            <div className="relative bg-gray-900 rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl shadow-gray-900/30">
              {/* Inner bezel */}
              <div className="relative bg-black rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden">
                {/* Notch/Dynamic Island */}
                <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 bg-black rounded-full z-20" />

                {/* Video container with 9:16 aspect ratio */}
                <div className="relative aspect-[9/16] bg-gray-900">
                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    poster="/videos/video1-poster.jpg"
                  >
                    <source src="/videos/video1.mp4" type="video/mp4" />
                    <source src="/videos/video1.webm" type="video/webm" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Gradient overlay for controls visibility */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

                  {/* Play/Pause overlay button - shows when paused */}
                  {!isPlaying && (
                    <button
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity z-10"
                      aria-label="Play video"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform transition-transform hover:scale-105 active:scale-95">
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600 ml-1" fill="currentColor" />
                      </div>
                    </button>
                  )}

                  {/* Bottom controls */}
                  <div className="absolute bottom-4 sm:bottom-6 left-4 right-4 flex items-center justify-between z-10">
                    <button
                      onClick={togglePlay}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:bg-white/30 active:scale-95"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      ) : (
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:bg-white/30 active:scale-95"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      ) : (
                        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Home indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-1 bg-white/30 rounded-full" />
              </div>
            </div>

            {/* Reflection/glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-b from-primary-500/10 via-transparent to-transparent rounded-[3rem] blur-2xl -z-10" />
          </div>
        </motion.div>

        {/* Caption below video */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-gray-500 mt-6 sm:mt-8"
        >
          Joseph Ajayi, Founder & Director
        </motion.p>
      </div>
    </section>
  );
}
