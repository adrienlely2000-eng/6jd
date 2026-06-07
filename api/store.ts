import { readFileSync, writeFileSync, existsSync } from "fs";

const FILE = "data.json";

interface Participant {
  id: number;
  nom: string;
  parcours: string;
  categorie: string;
  club: string;
  typeCourse: string;
  dateNaissance: string;
  adresse: string;
  telephone: string;
  sexe: string;
  email: string;
  tailleMaillot: string;
  createdAt: string;
}

interface Data {
  participants: Participant[];
  admins: { username: string; passwordHash: string }[];
}

function load(): Data {
  if (!existsSync(FILE)) {
    return { participants: [], admins: [] };
  }
  return JSON.parse(readFileSync(FILE, "utf-8"));
}

function save(data: Data) {
  writeFileSync(FILE, JSON.stringify(data, null, 2));
}

let data = load();

const ADMIN_HASH = "$2b$10$k9XwtNDIh3vl8AEjj1mEFOD4rtTt0UzAEdv5rtGdm/zGnSr2B9Vl6";

export const store = {
  getParticipants(): Participant[] {
    return data.participants;
  },
  addParticipant(p: Omit<Participant, "id" | "createdAt">): Participant {
    const newP = { ...p, id: Date.now(), createdAt: new Date().toISOString() };
    data.participants.push(newP);
    save(data);
    return newP;
  },
  deleteParticipant(id: number) {
    data.participants = data.participants.filter((p) => p.id !== id);
    save(data);
  },
  getAdmin(username: string) {
    return data.admins.find((a) => a.username === username);
  },
  resetAdmin() {
    data.admins = [{ username: "admin", passwordHash: ADMIN_HASH }];
    save(data);
  },
  init() {
    if (data.admins.length === 0) {
      store.resetAdmin();
    }
  },
};
