import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';
import clsx from 'clsx';

type Mode = 'stopwatch' | 'pomodoro';

const POMODORO_DURATION: number = 25 * 60; // 25 minutes in seconds

function formatTime(totalSeconds: number): string {
  const minutes: number = Math.floor(totalSeconds / 60);
  const seconds: number = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function Timer() {
  const [mode, setMode] = useState<Mode>('pomodoro');
  const [seconds, setSeconds] = useState<number>(POMODORO_DURATION);
  const [running, setRunning] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setSeconds((prev: number) => {
        if (mode === 'pomodoro') {
          if (prev <= 1) {
            setRunning(false);
            return 0;
          }
          return prev - 1;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, mode]);

  function handleToggle(): void {
    if (mode === 'pomodoro' && seconds === 0) return;
    setRunning((r: boolean) => !r);
  }

  function handleReset(): void {
    setRunning(false);
    setSeconds(mode === 'pomodoro' ? POMODORO_DURATION : 0);
  }

  function handleModeChange(newMode: Mode): void {
    setRunning(false);
    setMode(newMode);
    setSeconds(newMode === 'pomodoro' ? POMODORO_DURATION : 0);
  }

  const isFinished: boolean = mode === 'pomodoro' && seconds === 0;

  return (
    <div className="px-4 py-4 border-b border-white/5 bg-[#0c1a0c]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-slate-300">
          <TimerIcon size={16} className="text-green-400" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Focus Timer
          </span>
        </div>
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5">
          <button
            onClick={() => handleModeChange('pomodoro')}
            className={clsx(
              'px-2.5 py-1 text-xs rounded-md transition-colors',
              mode === 'pomodoro'
                ? 'bg-green-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            Pomodoro
          </button>
          <button
            onClick={() => handleModeChange('stopwatch')}
            className={clsx(
              'px-2.5 py-1 text-xs rounded-md transition-colors',
              mode === 'stopwatch'
                ? 'bg-green-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            Stopwatch
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div
          className={clsx(
            'font-mono text-4xl font-bold tabular-nums tracking-tight',
            isFinished ? 'text-rose-400 animate-pulse' : 'text-white'
          )}
        >
          {formatTime(seconds)}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggle}
            disabled={isFinished}
            className={clsx(
              'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              isFinished
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : running
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            )}
          >
            {running ? <Pause size={14} /> : <Play size={14} />}
            {running ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
            title="Reset"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {isFinished && (
        <p className="mt-2 text-xs text-rose-400 text-center">
          ⏰ Time's up! Take a break.
        </p>
      )}
    </div>
  );
}
