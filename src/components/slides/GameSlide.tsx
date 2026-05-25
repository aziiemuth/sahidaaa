"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "@/styles/GameSlide.module.css";

interface GameSlideProps {
  onClose: () => void;
}

// Item types with emoji, point value, speed multiplier, and rarity weight
const ITEM_TYPES = [
  { emoji: "💖", points: 10, speed: 1, weight: 30 },
  { emoji: "💕", points: 10, speed: 1.1, weight: 25 },
  { emoji: "🎂", points: 25, speed: 0.85, weight: 15 },
  { emoji: "🎁", points: 20, speed: 0.9, weight: 15 },
  { emoji: "⭐", points: 15, speed: 1.2, weight: 10 },
  { emoji: "🌸", points: 10, speed: 1, weight: 20 },
  { emoji: "🎀", points: 15, speed: 1.05, weight: 12 },
  { emoji: "💎", points: 50, speed: 1.5, weight: 3 },   // rare – fast diamond
  { emoji: "👑", points: 40, speed: 1.3, weight: 5 },   // rare – crown
];

// Trap items that cost a life
const TRAP_TYPES = [
  { emoji: "💔", points: -10, speed: 1.1, weight: 8 },
  { emoji: "🖤", points: -5, speed: 1.2, weight: 5 },
];

interface FallingItem {
  id: number;
  emoji: string;
  points: number;
  x: number;      // percent from left
  y: number;      // pixels from top
  speed: number;   // px per frame
  isTrap: boolean;
}

interface BurstEffect {
  id: number;
  x: number;
  y: number;
  points: number;
}

type GameState = "idle" | "playing" | "over";

const GAME_DURATION = 45; // seconds
const MAX_LIVES = 5;
const BASE_SPEED = 1.8;
const SPAWN_INTERVAL_MS = 650;

function pickWeighted<T extends { weight: number }>(items: T[]): T {
  const total = items.reduce((sum, i) => sum + i.weight, 0);
  let r = Math.random() * total;
  for (const item of items) {
    r -= item.weight;
    if (r <= 0) return item;
  }
  return items[0];
}

function getScoreMessage(score: number): string {
  if (score >= 500) return "LUAR BIASA! Kamu penuh cinta! 💖✨";
  if (score >= 300) return "Hebat banget! Sahida bangga! 🎉";
  if (score >= 150) return "Bagus! Cinta kamu terkumpul! 🌸";
  if (score >= 50) return "Lumayan! Coba lagi yuk~ 💕";
  return "Jangan menyerah! Coba sekali lagi 🥰";
}

export default function GameSlide({ onClose }: GameSlideProps) {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [bursts, setBursts] = useState<BurstEffect[]>([]);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [caught, setCaught] = useState(0);
  const [showMiss, setShowMiss] = useState(false);
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sahida-game-highscore");
        return saved ? parseInt(saved, 10) : 0;
      } catch {
        return 0;
      }
    }
    return 0;
  });

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const gameLoopRef = useRef<(timestamp: number) => void>(() => {});
  const lastSpawnRef = useRef(0);
  const nextIdRef = useRef(0);
  const itemsRef = useRef<FallingItem[]>([]);
  const livesRef = useRef(MAX_LIVES);
  const gameStateRef = useRef<GameState>("idle");
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const bestComboRef = useRef(0);
  const caughtRef = useRef(0);
  const difficultyRef = useRef(1);

  // Keep refs in sync
  useEffect(() => { itemsRef.current = items; }, [items]);
  useEffect(() => { livesRef.current = lives; }, [lives]);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { comboRef.current = combo; }, [combo]);
  useEffect(() => { bestComboRef.current = bestCombo; }, [bestCombo]);
  useEffect(() => { caughtRef.current = caught; }, [caught]);

  const spawnItem = useCallback(() => {
    const isTrap = Math.random() < 0.15 * difficultyRef.current;
    const type = isTrap
      ? pickWeighted(TRAP_TYPES)
      : pickWeighted(ITEM_TYPES);

    const newItem: FallingItem = {
      id: nextIdRef.current++,
      emoji: type.emoji,
      points: type.points,
      x: 5 + Math.random() * 85,
      y: -50,
      speed: type.speed * BASE_SPEED * (0.9 + difficultyRef.current * 0.15),
      isTrap: isTrap,
    };
    setItems((prev) => [...prev, newItem]);
  }, []);

  const handleCatch = useCallback((item: FallingItem) => {
    // Remove item
    setItems((prev) => prev.filter((i) => i.id !== item.id));

    if (item.isTrap) {
      // Hit a trap
      setCombo(0);
      comboRef.current = 0;
      setLives((prev) => {
        const newLives = Math.max(0, prev - 1);
        if (newLives <= 0) {
          setGameState("over");
        }
        return newLives;
      });
      setShowMiss(true);
      setTimeout(() => setShowMiss(false), 400);
      // Add negative score burst
      setBursts((prev) => [
        ...prev,
        { id: nextIdRef.current++, x: item.x, y: item.y, points: item.points },
      ]);
      setScore((prev) => Math.max(0, prev + item.points));
    } else {
      // Caught a good item
      const newCombo = comboRef.current + 1;
      setCombo(newCombo);
      comboRef.current = newCombo;
      if (newCombo > bestComboRef.current) {
        setBestCombo(newCombo);
        bestComboRef.current = newCombo;
      }

      const comboMultiplier = Math.min(1 + (newCombo - 1) * 0.2, 3);
      const earnedPoints = Math.round(item.points * comboMultiplier);

      setScore((prev) => prev + earnedPoints);
      setCaught((prev) => prev + 1);
      caughtRef.current += 1;

      // Burst effect
      setBursts((prev) => [
        ...prev,
        { id: nextIdRef.current++, x: item.x, y: item.y, points: earnedPoints },
      ]);
    }

    // Clean bursts after animation
    setTimeout(() => {
      setBursts((prev) => prev.slice(1));
    }, 800);
  }, []);

  // Game loop
  const gameLoop = useCallback(
    (timestamp: number) => {
      if (gameStateRef.current !== "playing") return;

      const gameArea = gameAreaRef.current;
      if (!gameArea) return;

      const areaHeight = gameArea.clientHeight;

      // Spawn new items
      if (timestamp - lastSpawnRef.current > SPAWN_INTERVAL_MS / difficultyRef.current) {
        spawnItem();
        lastSpawnRef.current = timestamp;
      }

      // Move items down
      setItems((prev) => {
        const updated: FallingItem[] = [];
        let missedAny = false;

        for (const item of prev) {
          const newY = item.y + item.speed;
          if (newY > areaHeight + 50) {
            // Item fell out of bounds
            if (!item.isTrap) {
              missedAny = true;
            }
          } else {
            updated.push({ ...item, y: newY });
          }
        }

        if (missedAny) {
          // Reset combo
          setCombo(0);
          comboRef.current = 0;
          setLives((l) => {
            const newLives = Math.max(0, l - 1);
            if (newLives <= 0) {
              setGameState("over");
            }
            return newLives;
          });
          setShowMiss(true);
          setTimeout(() => setShowMiss(false), 400);
        }

        return updated;
      });

      animFrameRef.current = requestAnimationFrame((t) => gameLoopRef.current(t));
    },
    [spawnItem]
  );

  // Sync gameLoop ref
  useEffect(() => {
    gameLoopRef.current = gameLoop;
  }, [gameLoop]);

  // Timer
  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("over");
          return 0;
        }
        // Increase difficulty over time
        difficultyRef.current = 1 + (GAME_DURATION - prev + 1) / GAME_DURATION;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Start/stop game loop
  useEffect(() => {
    if (gameState === "playing") {
      animFrameRef.current = requestAnimationFrame((t) => gameLoopRef.current(t));
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState]);

  // Save high score on game over
  useEffect(() => {
    if (gameState === "over") {
      if (scoreRef.current > highScore) {
        setHighScore(scoreRef.current);
        try {
          localStorage.setItem(
            "sahida-game-highscore",
            String(scoreRef.current)
          );
        } catch { /* noop */ }
      }
    }
  }, [gameState, highScore]);

  const startGame = () => {
    setScore(0);
    scoreRef.current = 0;
    setLives(MAX_LIVES);
    livesRef.current = MAX_LIVES;
    setTimeLeft(GAME_DURATION);
    setItems([]);
    itemsRef.current = [];
    setBursts([]);
    setCombo(0);
    comboRef.current = 0;
    setBestCombo(0);
    bestComboRef.current = 0;
    setCaught(0);
    caughtRef.current = 0;
    difficultyRef.current = 1;
    lastSpawnRef.current = 0;
    setGameState("playing");
  };

  // Touch/click handler for items
  const handleItemClick = (e: React.MouseEvent | React.TouchEvent, item: FallingItem) => {
    e.preventDefault();
    e.stopPropagation();
    handleCatch(item);
  };

  return (
    <section className={styles.slide}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onClose} id="game-back-btn">
          ←
        </button>
        <div className={styles.heading}>
          <h2 className={styles.title}>🎮 Tangkap Cinta</h2>
          <p className={styles.subtitle}>♡ Mini game spesial untukmu</p>
        </div>
        <div className={styles.spacer} />
      </div>

      {/* HUD */}
      {gameState === "playing" && (
        <div className={styles.hud}>
          <div className={styles.hudChip}>
            <span className={styles.hudIcon}>💖</span>
            <span className={styles.hudValue}>{score}</span>
            <span className={styles.hudLabel}>Skor</span>
          </div>
          <div className={styles.hudChip}>
            <span className={styles.hudIcon}>⏱️</span>
            <span className={styles.hudValue}>{timeLeft}s</span>
            <span className={styles.hudLabel}>Waktu</span>
          </div>
          <div className={styles.hudChip}>
            <span className={styles.hudIcon}>❤️</span>
            <span className={styles.hudValue}>
              {"❤️".repeat(lives)}{"🤍".repeat(MAX_LIVES - lives)}
            </span>
            <span className={styles.hudLabel}>Nyawa</span>
          </div>
        </div>
      )}

      {/* Game Area */}
      <div className={styles.gameArea} ref={gameAreaRef} id="game-area">
        {/* Start Screen */}
        {gameState === "idle" && (
          <div className={styles.startScreen}>
            <div className={styles.startEmoji}>💝</div>
            <h3 className={styles.startTitle}>
              Tangkap <span className={styles.startTitleHighlight}>Cinta</span>!
            </h3>
            <p className={styles.startDesc}>
              Tap hati, bintang, dan hadiah yang jatuh!
              <br />
              Hindari hati yang patah 💔
              <br />
              Buat combo untuk poin lebih banyak!
            </p>
            <button
              className={styles.startBtn}
              onClick={startGame}
              id="game-start-btn"
            >
              🎮 Mulai Main!
            </button>
            {highScore > 0 && (
              <p className={styles.startHint}>
                🏆 Skor tertinggi: {highScore}
              </p>
            )}
            <p className={styles.startHint}>📱 Tap item untuk menangkap</p>
          </div>
        )}

        {/* Falling items */}
        {gameState === "playing" &&
          items.map((item) => (
            <div
              key={item.id}
              className={styles.fallingItem}
              style={{
                left: `calc(${item.x}% - 24px)`,
                top: `${item.y}px`,
              }}
              onPointerDown={(e) => handleItemClick(e, item)}
            >
              {item.emoji}
            </div>
          ))}

        {/* Burst effects */}
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className={styles.catchBurst}
            style={{
              left: `calc(${burst.x}% - 30px)`,
              top: `${burst.y - 30}px`,
            }}
          >
            <span className={styles.burstScore}>
              {burst.points > 0 ? `+${burst.points}` : burst.points}
            </span>
            {[...Array(6)].map((_, i) => {
              const angle = (i / 6) * 360;
              const dist = 20 + Math.random() * 15;
              return (
                <span
                  key={i}
                  className={styles.burstParticle}
                  style={{
                    "--bx": `${Math.cos((angle * Math.PI) / 180) * dist}px`,
                    "--by": `${Math.sin((angle * Math.PI) / 180) * dist}px`,
                    background:
                      burst.points > 0
                        ? `hsl(${330 + i * 15}, 80%, 65%)`
                        : `hsl(0, 60%, 55%)`,
                  } as React.CSSProperties}
                />
              );
            })}
          </div>
        ))}

        {/* Combo indicator */}
        {gameState === "playing" && combo >= 3 && (
          <div className={styles.comboIndicator} key={combo}>
            🔥 {combo}x Combo! {combo >= 8 ? "✨" : ""}
          </div>
        )}

        {/* Miss flash */}
        {showMiss && <div className={styles.missFlash} />}

        {/* Game Over Screen */}
        {gameState === "over" && (
          <div className={styles.gameOverScreen}>
            <div className={styles.gameOverEmoji}>
              {score >= 300 ? "🏆" : score >= 150 ? "🎉" : "💖"}
            </div>
            <h3 className={styles.gameOverTitle}>Permainan Selesai!</h3>
            <span className={styles.gameOverScore}>{score}</span>
            <span className={styles.gameOverLabel}>Total Skor</span>
            <p className={styles.gameOverMessage}>{getScoreMessage(score)}</p>

            <div className={styles.gameOverStats}>
              <div className={styles.gameOverStat}>
                <div className={styles.gameOverStatVal}>{caught}</div>
                <div className={styles.gameOverStatLabel}>Ditangkap</div>
              </div>
              <div className={styles.gameOverStat}>
                <div className={styles.gameOverStatVal}>{bestCombo}x</div>
                <div className={styles.gameOverStatLabel}>Best Combo</div>
              </div>
              <div className={styles.gameOverStat}>
                <div className={styles.gameOverStatVal}>
                  {highScore < score ? score : highScore}
                </div>
                <div className={styles.gameOverStatLabel}>Rekor</div>
              </div>
            </div>

            <button
              className={styles.retryBtn}
              onClick={startGame}
              id="game-retry-btn"
            >
              🔄 Main Lagi
            </button>
            <button
              className={styles.closeBtn}
              onClick={onClose}
              id="game-close-btn"
            >
              Kembali
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
