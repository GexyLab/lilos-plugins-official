# lilOS

La versione installabile di lilOS, il sistema operativo web: la pagina (`web/`), il kernel
(`system/kernel/`) e quello che il kernel usa dell'SDK. I sorgenti non sono qui.

## Aggiornare

Un lilOS installato si aggiorna dall'AppStore (scheda Aggiornamenti, voce lilOS), solo da un
amministratore. La nuova versione si mette accanto a quella in uso e parte al riavvio del kernel:
se non parte, lilOS torna da solo alla versione di prima e lo dice agli amministratori. Se parte,
chiede se eliminare la versione di prima. Le modifiche di ogni versione sono in [CHANGELOG.md](CHANGELOG.md).

## Installare da zero

Serve Node.js 22 o successivo, il comando `git` e, con la configurazione predefinita, PostgreSQL
(il modulo fs-postgres ha un docker-compose.yml). Da questa cartella:

```sh
node system/kernel/tools/install.js <cartella di lilOS>
cd <cartella di lilOS>
node releases/1.8.0/system/kernel/cli.js users-basic add <nome> --admin
node run.js
```

Con `--from <cartella>` l'installazione prende configurazione, moduli e dati (gli utenti) da
`system/kernel` di una copia del repository di lilOS o da un altro lilOS installato.
