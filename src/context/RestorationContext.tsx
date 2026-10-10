import React, { createContext, useContext, useState } from 'react';
import { PipelineStage, RestorationMetrics } from '../types';
import { RestorationPipeline } from '../services/RestorationPipeline';

interface RestorationContextType {
  stage: PipelineStage;
  progress: number;
  metrics: RestorationMetrics | null;
  startRestoration: (imageUri: string) => Promise<void>;
  resetPipeline: () => void;
}

const RestorationContext = createContext<RestorationContextType | undefined>(undefined);

export const RestorationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stage, setStage] = useState<PipelineStage>('IDLE');
  const [progress, setProgress] = useState<number>(0);
  const [metrics, setMetrics] = useState<RestorationMetrics | null>(null);

  const startRestoration = async (imageUri: string) => {
    try {
      setStage('ANALYZING_CREASES');
      const result = await RestorationPipeline.execute(imageUri, (currentStage, percent) => {
        setStage(currentStage);
        setProgress(percent);
      });
      setMetrics(result);
    } catch (e) {
      setStage('ERROR');
    }
  };

  const resetPipeline = () => {
    setStage('IDLE');
    setProgress(0);
    setMetrics(null);
  };

  return (
    <RestorationContext.Provider
      value={{ stage, progress, metrics, startRestoration, resetPipeline }}
    >
      {children}
    </RestorationContext.Provider>
  );
};

export const useRestoration = () => {
  const context = useContext(RestorationContext);
  if (!context) throw new Error('useRestoration must be used within RestorationProvider');
  return context;
};