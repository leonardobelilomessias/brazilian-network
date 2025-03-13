"use client";
import { useState, useEffect } from 'react';
import { getQuestions } from '@/lib/supabase/queries/questionsClient';
import { IQuestion } from '@/app/types/TypesDB';


export const useQuestions = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions();
        setQuestions(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao carregar perguntas'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { questions, isLoading, error };
}; 