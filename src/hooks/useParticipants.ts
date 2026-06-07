import { useState, useEffect, useCallback } from 'react';
import { trpc } from '@/providers/trpc';

export interface Participant {
  id: number;
  nom: string;
  parcours: string;
  categorie: string;
  club: string;
  createdAt?: Date;
}

const ADMIN_KEY = 'admin_token';

export function useParticipants() {
  const utils = trpc.useUtils();
  const { data: participantsData, isLoading } = trpc.participants.list.useQuery();

  const createMutation = trpc.participants.create.useMutation({
    onSuccess: () => {
      utils.participants.list.invalidate();
    },
  });

  const deleteMutation = trpc.participants.delete.useMutation({
    onSuccess: () => {
      utils.participants.list.invalidate();
    },
  });

  const participants: Participant[] = participantsData ?? [];

  const addParticipant = useCallback(
    (p: Omit<Participant, 'id' | 'createdAt'>) => {
      createMutation.mutate({
        nom: p.nom,
        parcours: p.parcours,
        categorie: p.categorie,
        club: p.club,
        typeCourse: p.typeCourse,
        dateNaissance: p.dateNaissance,
        adresse: p.adresse,
        telephone: p.telephone,
        sexe: p.sexe,
        email: p.email,
        tailleMaillot: p.tailleMaillot,
      });
    },
    [createMutation]
  );

  const deleteParticipant = useCallback(
    (id: number) => {
      deleteMutation.mutate({ id });
    },
    [deleteMutation]
  );

  return {
    participants,
    isLoading,
    addParticipant,
    deleteParticipant,
  };
}

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return !!localStorage.getItem(ADMIN_KEY);
    } catch {
      return false;
    }
  });

  const loginMutation = trpc.admin.login.useMutation();
  const verifyQuery = trpc.admin.verify.useQuery(
    { token: localStorage.getItem(ADMIN_KEY) ?? '' },
    { enabled: !!localStorage.getItem(ADMIN_KEY) }
  );

  // Auto-logout if token is invalid
  useEffect(() => {
    if (verifyQuery.data && !verifyQuery.data.valid && isAdmin) {
      logout();
    }
  }, [verifyQuery.data]);

  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      const result = await loginMutation.mutateAsync({ username, password });
      if (result.success && result.token) {
        localStorage.setItem(ADMIN_KEY, result.token);
        setIsAdmin(true);
        return true;
      }
      return false;
    },
    [loginMutation]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_KEY);
    setIsAdmin(false);
    window.location.reload();
  }, []);

  return { isAdmin, login, logout };
}
