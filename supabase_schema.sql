-- Schema Supabase pour le planning HIS
-- Exécutez ces commandes dans l'éditeur SQL de votre projet Supabase

-- Table des créneaux HIS
CREATE TABLE IF NOT EXISTS his_slots (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL,
  main_id TEXT NOT NULL,
  sub_id TEXT NOT NULL,
  slot_type TEXT NOT NULL,
  label TEXT,
  max_places INTEGER NOT NULL DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des inscriptions
CREATE TABLE IF NOT EXISTS his_registrations (
  id BIGSERIAL PRIMARY KEY,
  slot_id TEXT NOT NULL REFERENCES his_slots(id) ON DELETE CASCADE,
  colleague_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(slot_id, colleague_id)
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_his_slots_date ON his_slots(date);
CREATE INDEX IF NOT EXISTS idx_his_slots_main_id ON his_slots(main_id);
CREATE INDEX IF NOT EXISTS idx_his_slots_sub_id ON his_slots(sub_id);
CREATE INDEX IF NOT EXISTS idx_his_registrations_slot_id ON his_registrations(slot_id);
CREATE INDEX IF NOT EXISTS idx_his_registrations_colleague_id ON his_registrations(colleague_id);

-- Politique RLS (Row Level Security) - Permettre la lecture à tous
ALTER TABLE his_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE his_registrations ENABLE ROW LEVEL SECURITY;

-- Politique pour his_slots : lecture et écriture pour tous (vous pouvez restreindre selon vos besoins)
CREATE POLICY "Allow all operations on his_slots" ON his_slots
  FOR ALL USING (true) WITH CHECK (true);

-- Politique pour his_registrations : lecture et écriture pour tous
CREATE POLICY "Allow all operations on his_registrations" ON his_registrations
  FOR ALL USING (true) WITH CHECK (true);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour his_slots
CREATE TRIGGER update_his_slots_updated_at
  BEFORE UPDATE ON his_slots
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

