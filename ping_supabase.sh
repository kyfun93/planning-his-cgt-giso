#!/bin/bash

# Script pour "pinger" Supabase et montrer de l'activité
# Usage: ./ping_supabase.sh

SUPABASE_URL="https://xierjvlyymyfmhojtseh.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZXJqdmx5eW15Zm1ob2p0c2VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNDUxODUsImV4cCI6MjA3ODcyMTE4NX0.ZvX_9vKBhy8Bjl6Z-ocLS641r1I5jB7hCC6KC0kox38"

# Faire une requête simple pour compter les slots (limite à 1 pour minimiser le trafic)
echo "🔄 Ping Supabase pour montrer de l'activité..."

response=$(curl -s -X GET \
  "${SUPABASE_URL}/rest/v1/his_slots?select=id&limit=1" \
  -H "apikey: ${SUPABASE_ANON_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
  -H "Content-Type: application/json")

if [ $? -eq 0 ]; then
  echo "✅ Requête réussie - Activité enregistrée sur Supabase"
  echo "📊 Réponse: ${response:0:100}..."
else
  echo "❌ Erreur lors de la requête"
  exit 1
fi

