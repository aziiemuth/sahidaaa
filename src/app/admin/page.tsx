"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "@/styles/AdminPage.module.css";

interface QuizAnswer {
  id: string;
  session_id: string;
  question_index: number;
  question_text: string;
  answer_text: string;
  created_at: string;
}

interface GroupedSession {
  sessionId: string;
  answers: QuizAnswer[];
  lastUpdate: Date;
}

export default function AdminPage() {
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const fetchAnswers = async () => {
      const { data, error } = await supabase
        .from("quiz_answers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching answers:", error);
      } else {
        setAnswers(data || []);
      }
      setLoading(false);
    };

    fetchAnswers();

    const channel = supabase
      .channel("quiz_answers_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "quiz_answers",
        },
        (payload) => {
          const newAnswer = payload.new as QuizAnswer;
          setAnswers((prev) => [newAnswer, ...prev]);
          // Reset to page 1 to see the live update
          setCurrentPage(1);
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setIsConnected(true);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Group by session
  const sessions = answers.reduce((acc, ans) => {
    const existing = acc.find(s => s.sessionId === ans.session_id);
    if (existing) {
      existing.answers.push(ans);
      // Update lastUpdate if this answer is newer
      const ansDate = new Date(ans.created_at);
      if (ansDate > existing.lastUpdate) {
        existing.lastUpdate = ansDate;
      }
    } else {
      acc.push({
        sessionId: ans.session_id,
        answers: [ans],
        lastUpdate: new Date(ans.created_at)
      });
    }
    return acc;
  }, [] as GroupedSession[]);

  // Sort sessions by last update time (newest first), and sort answers within each session by question_index
  sessions.sort((a, b) => b.lastUpdate.getTime() - a.lastUpdate.getTime());
  sessions.forEach(s => s.answers.sort((a, b) => a.question_index - b.question_index));

  // Pagination calculation
  const totalPages = Math.ceil(sessions.length / ITEMS_PER_PAGE);
  const paginatedSessions = sessions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Memuat Dashboard...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <p className={styles.subtitle}>Pantau jawaban kuis pacarmu di sini ✨</p>
        </div>
        <div className={styles.status}>
          <span className={isConnected ? styles.pulse : ""} style={{ backgroundColor: isConnected ? '#2ecc71' : '#e74c3c' }}></span>
          {isConnected ? "Live Updates Aktif" : "Menghubungkan..."}
        </div>
      </header>

      {sessions.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyEmoji}>📭</div>
          <p className={styles.emptyText}>Belum ada jawaban yang masuk nih.</p>
          <p className={styles.emptyText} style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Tunggu dia ngisi ya!</p>
        </div>
      ) : (
        <>
          <div className={styles.sessionList}>
            {paginatedSessions.map((session) => {
              // Find global index for the session number
              const sessionIndex = sessions.findIndex(s => s.sessionId === session.sessionId);
              const sessionNumber = sessions.length - sessionIndex;
              return (
                <div key={session.sessionId} className={styles.sessionCard}>
                  <div className={styles.sessionHeader}>
                    <h2 className={styles.sessionTitle}>Sesi #{sessionNumber}</h2>
                    <span className={styles.sessionTime}>
                      Update terakhir: {session.lastUpdate.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                  <div className={styles.sessionBody}>
                    {session.answers.map((answer) => (
                      <div key={answer.id} className={styles.answerRow}>
                        <div className={styles.questionSection}>
                          <span className={styles.qNum}>Q{answer.question_index + 1}</span>
                          <span className={styles.qText}>{answer.question_text}</span>
                        </div>
                        <div className={styles.answerSection}>
                          <span className={styles.aArrow}>↳</span>
                          <span className={styles.aText}>{answer.answer_text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={styles.pageBtn}
              >
                Sebelumnya
              </button>
              <span className={styles.pageInfo}>
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={styles.pageBtn}
              >
                Berikutnya
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
