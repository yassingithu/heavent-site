import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Attendre la fin de l'animation de sortie
    }, 2500); // Afficher le splash pendant 2.5 secondes

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10"
        >
          {/* Arrière-plan animé */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 20%, hsl(var(--accent) / 0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 40% 80%, hsl(var(--primary) / 0.2) 0%, transparent 50%)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-0"
            />
          </div>

          {/* Contenu principal */}
          <div className="relative z-10 flex flex-col items-center space-y-8">
            {/* Logo avec animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
              className="relative"
            >
              {/* Effet de glow derrière le logo */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-xl opacity-50"
              />
              
              <img 
                src="/lovable-uploads/df0014d7-d697-4525-a5ee-71cf8fa774ab.png" 
                alt="Heavent People Agency" 
                className="relative h-24 w-auto md:h-32 drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.3))'
                }}
              />
            </motion.div>

            {/* Texte avec animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-center space-y-2"
            >
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Heavent People Agency
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Créateur d'expériences
              </p>
            </motion.div>

            {/* Barre de progression animée */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.2, duration: 1, ease: "easeInOut" }}
              className="w-32 h-1 bg-gradient-to-r from-primary to-accent rounded-full overflow-hidden"
            >
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-full w-full bg-white/30 rounded-full"
              />
            </motion.div>
          </div>

          {/* Particules flottantes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0,
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -50,
                  x: Math.random() * window.innerWidth,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute w-2 h-2 bg-gradient-to-br from-primary to-accent rounded-full blur-sm"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;