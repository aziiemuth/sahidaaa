"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTrashCan, 
  faMapMarkerAlt, 
  faChevronLeft, 
  faChevronRight,
  faCircle,
  faReply,
  faBoxOpen,
  faChartLine
} from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/AdminPage.module.css";
import Swal from "sweetalert2";
interface QuizAnswer {
  id: string;
  session_id: string;
  question_index: number;
  question_text: string;
  answer_text: string;
  created_at: string;
}

interface UserLocation {
  session_id: string;
  latitude: number;
  longitude: number;
  updated_at: string;
}

interface GroupedSession {
  sessionId: string;
  answers: QuizAnswer[];
  lastUpdate: Date;
}

export default function AdminPage() {
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [locations, setLocations] = useState<Record<string, UserLocation>>({});
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 1;

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
      
      const { data: locData, error: locError } = await supabase
        .from("user_locations")
        .select("*");
        
      if (locError) {
        console.error("Error fetching locations:", locError);
      } else if (locData) {
        const locMap: Record<string, UserLocation> = {};
        locData.forEach(loc => {
          locMap[loc.session_id] = loc;
        });
        setLocations(locMap);
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

    const locChannel = supabase
      .channel("user_locations_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_locations",
        },
        (payload) => {
          const newLoc = payload.new as UserLocation;
          if (newLoc.session_id) {
            setLocations((prev) => ({ ...prev, [newLoc.session_id]: newLoc }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(locChannel);
    };
  }, []);

  const handleClearData = async () => {
    const result = await Swal.fire({
      title: "Hapus Semua Data?",
      text: "Semua jawaban kuis dan lokasi akan dihapus selamanya!",
      icon: "warning",
      iconColor: "#f43f5e",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      background: "rgba(15, 23, 42, 0.95)",
      color: "#f3f4f6",
      width: "340px",
      padding: "1.5rem",
      customClass: {
        popup: styles.swalPopup,
        title: styles.swalTitle,
        htmlContainer: styles.swalText,
        confirmButton: styles.swalConfirmBtn,
        cancelButton: styles.swalCancelBtn,
      },
      buttonsStyling: false,
    });

    if (!result.isConfirmed) return;

    const { error } = await supabase
      .from("quiz_answers")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Gagal menghapus data kuis: " + error.message,
        icon: "error",
        iconColor: "#ef4444",
        confirmButtonText: "OK",
        background: "rgba(15, 23, 42, 0.95)",
        color: "#f3f4f6",
        width: "320px",
        padding: "1.25rem",
        customClass: {
          popup: styles.swalPopup,
          title: styles.swalTitle,
          htmlContainer: styles.swalText,
          confirmButton: styles.swalConfirmBtn,
        },
        buttonsStyling: false,
      });
    } else {
      // Also delete locations
      await supabase.from("user_locations").delete().neq("session_id", "00000000-0000-0000-0000-000000000000");
      setAnswers([]);
      setLocations({});
      setCurrentPage(1);
      
      Swal.fire({
        title: "Berhasil!",
        text: "Semua data berhasil dihapus!",
        icon: "success",
        iconColor: "#10b981",
        confirmButtonText: "Bagus",
        background: "rgba(15, 23, 42, 0.95)",
        color: "#f3f4f6",
        width: "320px",
        padding: "1.25rem",
        customClass: {
          popup: styles.swalPopup,
          title: styles.swalTitle,
          htmlContainer: styles.swalText,
          confirmButton: styles.swalConfirmBtn,
        },
        buttonsStyling: false,
      });
    }
  };

  // Group by session using both answers and locations
  const sessionMap: Record<string, GroupedSession> = {};

  // 1. Group answers
  answers.forEach((ans) => {
    if (!sessionMap[ans.session_id]) {
      sessionMap[ans.session_id] = {
        sessionId: ans.session_id,
        answers: [],
        lastUpdate: new Date(0),
      };
    }
    
    const session = sessionMap[ans.session_id];
    
    // Check for duplicate answers (happens if user refreshes the page and restarts quiz)
    const existingIndex = session.answers.findIndex(a => a.question_index === ans.question_index);
    if (existingIndex === -1) {
      session.answers.push(ans);
    } else {
      // Keep the newest answer for this question
      if (new Date(ans.created_at) > new Date(session.answers[existingIndex].created_at)) {
        session.answers[existingIndex] = ans;
      }
    }
    
    const ansDate = new Date(ans.created_at);
    if (ansDate > session.lastUpdate) {
      session.lastUpdate = ansDate;
    }
  });

  // 2. Add locations to sessions (or create new sessions if they only have location)
  Object.values(locations).forEach((loc) => {
    if (!sessionMap[loc.session_id]) {
      sessionMap[loc.session_id] = {
        sessionId: loc.session_id,
        answers: [],
        lastUpdate: new Date(loc.updated_at || 0),
      };
    } else {
      const locDate = new Date(loc.updated_at || 0);
      if (locDate > sessionMap[loc.session_id].lastUpdate) {
        sessionMap[loc.session_id].lastUpdate = locDate;
      }
    }
  });

  const sessions = Object.values(sessionMap);

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
          <p className={styles.subtitle}>
            <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '8px', color: '#f472b6' }} />
            Pantau jawaban kuis pacarmu di sini
          </p>
        </div>
        <div className={styles.headerControls}>
          {answers.length > 0 && (
            <button className={styles.clearBtn} onClick={handleClearData}>
              <FontAwesomeIcon icon={faTrashCan} /> Hapus Semua Data
            </button>
          )}
          <div className={styles.status}>
            <FontAwesomeIcon 
              icon={faCircle} 
              className={isConnected ? styles.pulseIcon : ""} 
              style={{ color: isConnected ? '#2ecc71' : '#e74c3c', fontSize: '12px' }} 
            />
            {isConnected ? "Live Updates Aktif" : "Menghubungkan..."}
          </div>
        </div>
      </header>

      {sessions.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyEmoji}>
            <FontAwesomeIcon icon={faBoxOpen} />
          </div>
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
              const loc = locations[session.sessionId];
              return (
                <div key={session.sessionId} className={styles.sessionCard}>
                  <div className={styles.sessionHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h2 className={styles.sessionTitle}>Sesi #{sessionNumber}</h2>
                      <span className={styles.sessionTime}>
                        Update terakhir: {session.lastUpdate.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>
                    {loc && (
                      <a 
                        href={`https://www.google.com/maps?q=${loc.latitude},${loc.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundColor: '#e74c3c', color: 'white', padding: '8px 16px', borderRadius: '12px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(231, 76, 60, 0.4)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(231, 76, 60, 0.3)'; }}
                      >
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> Lokasi
                      </a>
                    )}
                  </div>
                  <div className={styles.sessionBody}>
                    {session.answers.map((answer) => (
                      <div key={answer.id} className={styles.answerRow}>
                        <div className={styles.questionSection}>
                          <span className={styles.qNum}>Q{answer.question_index + 1}</span>
                          <span className={styles.qText}>{answer.question_text}</span>
                        </div>
                        <div className={styles.answerSection}>
                          <span className={styles.aArrow}>
                            <FontAwesomeIcon icon={faReply} rotation={180} />
                          </span>
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
                <FontAwesomeIcon icon={faChevronLeft} style={{ marginRight: '8px' }} /> Sebelumnya
              </button>
              <span className={styles.pageInfo}>
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={styles.pageBtn}
              >
                Berikutnya <FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
