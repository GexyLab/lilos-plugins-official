# users-basic

Modulo del kernel che gestisce **utenti e accesso con password**.

- Tutto è in `users.json`, nella cartella del modulo: niente database.
- Le password sono salvate con scrypt; le sessioni durano `sessionDays` giorni (30) e scadono dopo `idleDays` giorni senza uso (7).
- Gli utenti si creano anche dalla riga di comando:

```
npm run kernel:cli -- users-basic add <nome> [--admin]
```

Fornisce i servizi `auth` e `users`.
