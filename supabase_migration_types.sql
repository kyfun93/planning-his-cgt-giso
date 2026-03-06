-- Migration Supabase : aligner les anciens types de créneaux (slot_type) avec les nouveaux.
-- À exécuter dans Supabase → SQL Editor si vous avez des créneaux créés avec les anciennes valeurs.
-- Les nouveaux types sont définis dans app.js (ATTACHMENT_HIERARCHY).

-- MCBT – VAFO : anciens "Matin" / "Après-Midi" → "Équipe de nuit" / "3x8"
UPDATE his_slots SET slot_type = 'Équipe de nuit' WHERE main_id = 'mcbt' AND sub_id = 'mcbt_vafo' AND slot_type = 'Matin';
UPDATE his_slots SET slot_type = '3x8' WHERE main_id = 'mcbt' AND sub_id = 'mcbt_vafo' AND slot_type = 'Après-Midi';

-- MCBT – NTR4 : anciens types équipe → "Équipe de nuit" / "3x8"
UPDATE his_slots SET slot_type = 'Équipe de nuit' WHERE main_id = 'mcbt' AND sub_id = 'mcbt_ntr4' AND slot_type = 'Équipe nuit';
UPDATE his_slots SET slot_type = '3x8' WHERE main_id = 'mcbt' AND sub_id = 'mcbt_ntr4' AND slot_type IN ('Équipe A', 'Équipe B', 'Équipe C');

-- MCBT – BLR : idem
UPDATE his_slots SET slot_type = 'Équipe de nuit' WHERE main_id = 'mcbt' AND sub_id = 'mcbt_blr' AND slot_type = 'Équipe nuit';
UPDATE his_slots SET slot_type = '3x8' WHERE main_id = 'mcbt' AND sub_id = 'mcbt_blr' AND slot_type IN ('Équipe A', 'Équipe B', 'Équipe C');

-- EMHT – Toul : anciens types (EMI, PEF Câbles, Lachaise, Denfert, SITE, Traction M) → Jour / MTM nuit / MTM 3X8
UPDATE his_slots SET slot_type = 'Jour' WHERE main_id = 'emht' AND sub_id = 'emht_toul' AND slot_type IN ('EMI', 'PEF Câbles', 'Lachaise', 'Denfert', 'SITE');
UPDATE his_slots SET slot_type = 'MTM 3X8' WHERE main_id = 'emht' AND sub_id = 'emht_toul' AND slot_type = 'Traction M';

-- VDF → VAFO (si des créneaux avaient encore l’ancien sub_id mcbt_vdf)
UPDATE his_slots SET sub_id = 'mcbt_vafo' WHERE sub_id = 'mcbt_vdf';
