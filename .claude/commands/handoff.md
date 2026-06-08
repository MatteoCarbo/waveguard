Aggiorna il file `.claude/handoff.md` con lo stato attuale della sessione.

Segui questi passi:

1. Esegui `git log --oneline -10` per vedere gli ultimi commit
2. Leggi il file `.claude/handoff.md` esistente
3. Riscrivi il file aggiornando:
   - **Ultimo commit**: hash e messaggio del commit più recente
   - **Feature attive**: aggiungi/rimuovi in base a cosa è cambiato questa sessione
   - **Decisioni di design già prese**: aggiungi eventuali nuove decisioni importanti prese in questa sessione (soglie, formule, comportamenti UI)
   - **Bug noti / cose aperte**: aggiorna con bug risolti o nuovi problemi emersi
   - **Contesto recente (ultima sessione)**: sostituisci con un riassunto di massimo 5 punti di cosa è stato fatto in questa sessione

Mantieni la struttura e il formato Markdown esistente.
Non chiedere conferma — scrivi direttamente il file aggiornato.
