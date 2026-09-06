import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  Sparkles,
  FileText,
  HelpCircle,
  Send,
  UserCheck
} from 'lucide-react';
import { PASSAGES, QUESTIONS, Question } from './data/examData';

const WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbw00EtPyhylfx8ZUg3o7CFvc5g44RK17byvTJqy8kMY6grcfIVpTAT7Enu9NenGnBFR/exec';

const STUDENT_NAMES = ['Ngọc Trân', 'Như Quỳnh'];

type Screen = 'name_select' | 'quiz' | 'result';

export default function App() {
  const [screen, setScreen] = useState<Screen>('name_select');
  const [selectedName, setSelectedName] = useState<string>('');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [webhookSent, setWebhookSent] = useState<boolean>(false);
  const [filterReview, setFilterReview] = useState<'all' | 'correct' | 'incorrect'>('all');

  const passageScrollRef = useRef<HTMLDivElement>(null);
  const questionCardRef = useRef<HTMLDivElement>(null);

  const currentQuestion: Question = QUESTIONS[currentIdx];
  const isLastQuestion = currentIdx === QUESTIONS.length - 1;

  // Calculate score
  const score = QUESTIONS.reduce((acc, q) => {
    return userAnswers[q.cau] === q.dapAn ? acc + 1 : acc;
  }, 0);

  // Send result to Google Apps Script webhook when entering result screen
  useEffect(() => {
    if (screen === 'result' && !webhookSent) {
      setWebhookSent(true);

      const payload = {
        ten: selectedName,
        lop: '9',
        diem: score,
        tongCau: QUESTIONS.length,
        url: window.location.href,
      };

      console.log('Đang gửi kết quả bài thi:', payload);

      const sendWebhook = async () => {
        try {
          // Send with application/json
          await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          console.log('Gửi kết quả bài thi thành công!');
        } catch (err) {
          console.warn('Lỗi khi gửi webhook thông thường, thử fallback no-cors:', err);
          try {
            // Google Apps Script redirect might fail CORS; no-cors ensures dispatch
            await fetch(WEBHOOK_URL, {
              method: 'POST',
              mode: 'no-cors',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });
            console.log('Gửi kết quả bài thi hoàn tất qua chế độ no-cors.');
          } catch (error2) {
            console.error('Gửi kết quả thất bại hoàn toàn:', error2);
          }
        }
      };

      sendWebhook();
    }
  }, [screen, webhookSent, selectedName, score]);

  // Scroll to top of passage / question when question changes
  useEffect(() => {
    if (passageScrollRef.current) {
      passageScrollRef.current.scrollTop = 0;
    }
    if (questionCardRef.current && screen === 'quiz') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIdx, screen]);

  // Handlers
  const handleStartExam = () => {
    if (!selectedName) return;
    setUserAnswers({});
    setCurrentIdx(0);
    setWebhookSent(false);
    setFilterReview('all');
    setScreen('quiz');
  };

  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.cau]: option,
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setScreen('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setSelectedName('');
    setUserAnswers({});
    setCurrentIdx(0);
    setWebhookSent(false);
    setFilterReview('all');
    setScreen('name_select');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to render option text with visual underline for uppercase letters in Q1 & Q2
  const renderOptionContent = (qNum: number, text: string) => {
    if (qNum === 1 || qNum === 2) {
      // Highlight uppercase letters as the underlined part
      const parts: React.ReactNode[] = [];
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char >= 'A' && char <= 'Z') {
          parts.push(
            <span key={i} className="underline decoration-3 font-black decoration-indigo-600">
              {char}
            </span>
          );
        } else {
          parts.push(char);
        }
      }
      return <>{parts}</>;
    }
    return text;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-black shadow-xs shrink-0">
              <span className="text-base tracking-tighter">TA</span>
            </div>
            <div>
              <h1 className="font-black text-slate-800 text-base sm:text-lg tracking-tight uppercase leading-tight">
                Luyện Thi Lớp 10
              </h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Môn Tiếng Anh • 40 Câu
              </p>
            </div>
          </div>

          {selectedName && (
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3.5 py-1.5 rounded-2xl text-xs sm:text-sm font-bold shadow-xs">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              <span>{selectedName}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        {/* ==================== 1. MÀN HÌNH CHỌN TÊN ==================== */}
        {screen === 'name_select' && (
          <div className="w-full flex-1 flex flex-col items-center justify-center py-8 sm:py-12 space-y-8 my-auto">
            <div className="text-center space-y-3">
              <h1 className="text-4xl sm:text-6xl font-black text-indigo-600 tracking-tight">
                LUYỆN THI LỚP 10
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-slate-400 uppercase tracking-widest">
                Môn Tiếng Anh
              </p>
            </div>

            <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100 flex flex-col gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="student-select"
                  className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 block"
                >
                  Chọn tên của em
                </label>
                <div className="relative">
                  <select
                    id="student-select"
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value)}
                    className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-base sm:text-lg font-bold text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all cursor-pointer appearance-none"
                  >
                    <option value="">-- Nhấp để chọn --</option>
                    {STUDENT_NAMES.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                id="start-exam-button"
                onClick={handleStartExam}
                disabled={!selectedName}
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl text-lg sm:text-xl font-bold shadow-lg shadow-indigo-200 disabled:bg-slate-300 disabled:shadow-none hover:bg-indigo-700 transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Bắt đầu làm bài</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="text-slate-400 font-bold text-sm tracking-wide">
              Chúc em đạt kết quả cao nhất! 🚀
            </div>
          </div>
        )}

        {/* ==================== 2. MÀN HÌNH LÀM BÀI ==================== */}
        {screen === 'quiz' && (
          <div ref={questionCardRef} className="w-full flex flex-col gap-6">
            {/* Progress Bar & Header info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold">
                  TA
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Học sinh</p>
                  <p className="text-base font-bold text-slate-800">
                    <span className="text-indigo-600 font-black">{selectedName}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-left sm:text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tiến độ</p>
                  <p className="text-lg font-black text-slate-700">
                    <span className="text-indigo-600">{currentIdx + 1}</span> / {QUESTIONS.length}
                  </p>
                </div>
                <div className="w-40 sm:w-48 h-3 bg-slate-100 rounded-full overflow-hidden shrink-0">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Reading Passage if doan !== null */}
            {currentQuestion.doan && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col shadow-xs">
                <h3 className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Đoạn văn đọc hiểu (Phần {currentQuestion.doan})</span>
                </h3>
                <div
                  ref={passageScrollRef}
                  className="passage-box text-slate-700 text-sm sm:text-base leading-relaxed overflow-y-auto custom-scroll max-h-60 sm:max-h-72 p-4 bg-slate-50 rounded-2xl border border-slate-100 whitespace-pre-line font-serif pr-4"
                >
                  {PASSAGES[currentQuestion.doan]}
                </div>
              </div>
            )}

            {/* Question Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col shadow-sm">
              <div className="text-xs font-bold text-indigo-600 uppercase mb-2 tracking-widest">
                Câu hỏi {currentQuestion.cau}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight mb-6 whitespace-pre-line">
                {currentQuestion.hoi}
              </h3>

              {/* Options A, B, C, D */}
              <div className="grid grid-cols-1 gap-3.5">
                {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                  const isSelected = userAnswers[currentQuestion.cau] === optKey;
                  const optionText = currentQuestion[optKey];

                  return (
                    <button
                      key={optKey}
                      id={`option-${currentQuestion.cau}-${optKey}`}
                      type="button"
                      onClick={() => handleSelectOption(optKey)}
                      className={`answer-btn w-full p-4 sm:p-5 text-left border-2 rounded-2xl text-base sm:text-lg transition-all flex items-center gap-4 cursor-pointer select-none active:scale-[0.99] ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200 font-semibold shadow-xs'
                          : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/50 text-slate-800'
                      }`}
                    >
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {optKey}
                      </span>
                      <span className="flex-1 leading-relaxed">
                        {renderOptionContent(currentQuestion.cau, optionText)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentIdx === 0}
                  className={`px-6 py-4 rounded-2xl font-bold text-base flex items-center gap-2 transition active:scale-95 ${
                    currentIdx === 0
                      ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-200 cursor-pointer'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>CÂU TRƯỚC</span>
                </button>

                <button
                  id="next-question-btn"
                  type="button"
                  onClick={handleNext}
                  disabled={!userAnswers[currentQuestion.cau]}
                  className={`px-8 sm:px-10 py-4 rounded-2xl font-bold text-base uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center gap-2 ${
                    !userAnswers[currentQuestion.cau]
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                      : isLastQuestion
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 cursor-pointer'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 cursor-pointer'
                  }`}
                >
                  <span>{isLastQuestion ? 'NỘP BÀI' : 'CÂU TIẾP THEO'}</span>
                  {isLastQuestion ? (
                    <Send className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Quick Question Map Drawer/Grid */}
            <div className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-xs">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Bảng câu hỏi ({Object.keys(userAnswers).length}/{QUESTIONS.length} đã làm)
              </p>
              <div className="grid grid-cols-8 sm:grid-cols-10 gap-2">
                {QUESTIONS.map((q, idx) => {
                  const answered = !!userAnswers[q.cau];
                  const isCurrent = currentIdx === idx;
                  return (
                    <button
                      key={q.cau}
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-9 rounded-xl text-xs font-black flex items-center justify-center transition cursor-pointer active:scale-95 ${
                        isCurrent
                          ? 'ring-2 ring-indigo-600 bg-indigo-600 text-white'
                          : answered
                          ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {q.cau}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 3. MÀN HÌNH KẾT QUẢ ==================== */}
        {screen === 'result' && (
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center space-y-8 py-6">
            {/* Main Score Card */}
            <div className="bg-white rounded-[40px] shadow-2xl p-8 sm:p-12 w-full text-center border border-slate-100">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-indigo-50 rounded-full mb-6 border-4 border-white shadow-inner">
                <span id="final-score" className="text-5xl font-black text-indigo-600">
                  {score}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-2 tracking-tight uppercase">
                Kết quả của em
              </h2>
              <p id="result-msg" className="text-xl text-slate-500 mb-6 font-medium">
                Em đúng <span className="font-bold text-indigo-600">{score}/{QUESTIONS.length}</span> câu
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-8 text-sm sm:text-base font-semibold text-slate-600">
                {score >= 32
                  ? '🎉 Rất xuất sắc! Em nắm rất chắc kiến thức để thi vào lớp 10!'
                  : score >= 24
                  ? '👏 Khá tốt! Xem lại các câu sai bên dưới để bứt phá nhé!'
                  : '💪 Cố gắng lên em nhé! Hãy ôn lại các cấu trúc còn chưa vững.'}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  id="restart-exam-btn"
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-10 py-4 bg-slate-800 text-white rounded-2xl font-bold text-lg hover:bg-slate-900 transition-all shadow-lg active:scale-95 uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>LÀM LẠI TỪ ĐẦU</span>
                </button>
              </div>
            </div>

            {/* Detailed Question Review Section */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 w-full shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                    Chi tiết bài thi
                  </h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                    Xem lại từng câu đúng & sai
                  </p>
                </div>

                {/* Filter chips */}
                <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold self-start sm:self-auto">
                  <button
                    onClick={() => setFilterReview('all')}
                    className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
                      filterReview === 'all'
                        ? 'bg-white text-slate-800 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Tất cả (40)
                  </button>
                  <button
                    onClick={() => setFilterReview('correct')}
                    className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
                      filterReview === 'correct'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Đúng ({score})
                  </button>
                  <button
                    onClick={() => setFilterReview('incorrect')}
                    className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
                      filterReview === 'incorrect'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Sai ({QUESTIONS.length - score})
                  </button>
                </div>
              </div>

              {/* Review List */}
              <div className="mt-6 space-y-3.5 max-h-[500px] overflow-y-auto custom-scroll pr-2" id="review-list">
                {QUESTIONS.filter((q) => {
                  const isCorrect = userAnswers[q.cau] === q.dapAn;
                  if (filterReview === 'correct') return isCorrect;
                  if (filterReview === 'incorrect') return !isCorrect;
                  return true;
                }).map((q) => {
                  const userChoice = userAnswers[q.cau];
                  const isCorrect = userChoice === q.dapAn;

                  return (
                    <div
                      key={q.cau}
                      className={`p-4 sm:p-5 rounded-2xl border-2 transition ${
                        isCorrect
                          ? 'border-emerald-100 bg-emerald-50/50'
                          : 'border-rose-100 bg-rose-50/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-start gap-3">
                          <span
                            className={`font-black text-sm px-2 py-0.5 rounded-lg ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-rose-100 text-rose-700'
                            }`}
                          >
                            #{q.cau}
                          </span>
                          <span className="text-sm sm:text-base font-bold text-slate-800 whitespace-pre-line leading-snug">
                            {q.hoi}
                          </span>
                        </div>

                        <span
                          className={`shrink-0 text-xs font-black uppercase px-2.5 py-1 rounded-full ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {isCorrect ? '✔ Đúng' : '✘ Sai'}
                        </span>
                      </div>

                      {/* Passage preview if question has doan */}
                      {q.doan && (
                        <div className="mb-3 text-xs bg-white/90 border border-slate-200 p-3 rounded-xl text-slate-700 font-serif whitespace-pre-line leading-relaxed">
                          <span className="font-sans font-bold text-indigo-600 block mb-1 uppercase tracking-wider">
                            Đoạn văn {q.doan}
                          </span>
                          {PASSAGES[q.doan]}
                        </div>
                      )}

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                          const isKeyCorrect = q.dapAn === optKey;
                          const isKeySelectedByUser = userChoice === optKey;

                          let optStyle = 'bg-white/80 text-slate-600 border-slate-200';
                          if (isKeyCorrect) {
                            optStyle = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
                          } else if (isKeySelectedByUser && !isKeyCorrect) {
                            optStyle = 'bg-rose-100 text-rose-900 border-rose-300 font-bold line-through';
                          }

                          return (
                            <div
                              key={optKey}
                              className={`p-2.5 rounded-xl border text-xs sm:text-sm flex items-center gap-2 ${optStyle}`}
                            >
                              <span className="font-black shrink-0">{optKey}.</span>
                              <span className="flex-1">
                                {renderOptionContent(q.cau, q[optKey])}
                              </span>
                              {isKeyCorrect && (
                                <span className="text-emerald-700 text-xs font-bold shrink-0">
                                  ✓ Đáp án đúng
                                </span>
                              )}
                              {isKeySelectedByUser && !isKeyCorrect && (
                                <span className="text-rose-700 text-xs font-bold shrink-0">
                                  ✗ Em chọn
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Bottom result note */}
                      <div className="mt-3 pt-2 text-xs flex items-center justify-between text-slate-500 border-t border-slate-200/60 font-medium">
                        <span>
                          Em đã chọn:{' '}
                          <strong className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                            {userChoice ? `${userChoice}. ${q[userChoice]}` : 'Chưa chọn'}
                          </strong>
                        </span>
                        <span>
                          Đáp án đúng:{' '}
                          <strong className="text-emerald-700 font-bold">
                            {q.dapAn}. {q[q.dapAn]}
                          </strong>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 text-white rounded-2xl font-bold text-base hover:bg-slate-900 transition-all shadow-md active:scale-95 uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>LÀM LẠI TỪ ĐẦU</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-5 text-center text-xs font-bold text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white">
        <p>Luyện Thi Tiếng Anh Vào Lớp 10 • Tự tin bứt phá điểm số</p>
      </footer>
    </div>
  );
}
