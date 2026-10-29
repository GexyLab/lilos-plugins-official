import { SettingsWindow as e, Window as t, actionButton as n, apps as r, h as i, kernel as a, kernelModules as o, repositories as s, textField as c, toast as l } from "/host/sdk.js";
// src/appstore/AppStoreApp.js
var u = {
	"fs.read": "Leggere i file in",
	"fs.write": "Leggere e modificare i file in",
	"fs.workspaces": "Vedere i file privati di tutti i workspace",
	"tags.read": "Vedere i tag",
	"tags.write": "Creare e assegnare tag",
	"desktop.items": "Mettere elementi sulla scrivania",
	"desktop.widget": "Mostrare widget sulla scrivania",
	"ui.menus": "Aggiungere voci ai menu",
	"ui.commands": "Aggiungere comandi",
	"ui.shortcuts": "Aggiungere scorciatoie da tastiera",
	"clipboard.read": "Leggere gli appunti",
	net: "Collegarsi a",
	"media.camera": "Usare la fotocamera",
	"media.microphone": "Usare il microfono",
	geo: "Conoscere la posizione",
	"apps.call": "Usare le azioni dell’app",
	"ai.use": "Usare l’intelligenza artificiale",
	"ai.expose": "Rendere le proprie azioni disponibili all’assistente",
	background: "Lavorare anche quando lilOS è chiuso",
	"apps.manage": "Installare e rimuovere app",
	"workspaces.manage": "Gestire i workspace",
	"settings.system": "Cambiare le impostazioni di sistema"
}, d = /* @__PURE__ */ new Set([
	"fs.app",
	"fs.tmp",
	"fs.open",
	"ui.notify",
	"clipboard.write",
	"auth.remote"
]);
function f(e) {
	let t = e.indexOf(":"), n = t < 0 ? e : e.slice(0, t), r = t < 0 ? "" : e.slice(t + 1);
	return `${u[n] ?? n}${r ? ` ${r.replace(/^~/, "Home")}` : ""}`;
}
var p = (e, t) => {
	let n = e.split(".").map(Number), r = t.split(".").map(Number);
	return (n[0] - r[0] || n[1] - r[1] || n[2] - r[2]) > 0;
}, m = (e, t) => e?.url && e.url.replace(/\.git$/i, "").replace(/\/+$/, "").toLowerCase() === t.url.replace(/\.git$/i, "").replace(/\/+$/, "").toLowerCase();
function h({ openWindow: u }) {
	let h = a.user?.role === "admin", g = {
		repos: [],
		catalogs: /* @__PURE__ */ new Map(),
		errors: /* @__PURE__ */ new Map(),
		modules: [],
		loading: !0,
		busy: null,
		newRepo: {
			url: "",
			name: ""
		}
	}, _, v = () => _.view.render();
	async function y(e, t, n) {
		if (!g.busy) {
			g.busy = e, v();
			try {
				let e = await t();
				n && l(typeof n == "function" ? n(e) : n, { timeout: 5e3 }), await b({ quiet: !0 });
			} catch (e) {
				l(e.message, { timeout: 7e3 });
			} finally {
				g.busy = null, v();
			}
		}
	}
	async function b({ quiet: e = !1 } = {}) {
		e || (g.loading = !0, v());
		try {
			g.repos = await s.list(), await Promise.all(g.repos.map(async (e) => {
				try {
					g.catalogs.set(e.id, await s.catalog(e.id)), g.errors.delete(e.id);
				} catch (t) {
					g.catalogs.delete(e.id), g.errors.set(e.id, t.message);
				}
			})), g.modules = h ? await o.list().catch(() => []) : [], await r.refresh();
		} catch (e) {
			l(e.message, { timeout: 7e3 });
		}
		g.loading = !1, v();
	}
	function x({ title: e, name: r, permissions: a = [], official: o, kernelModule: s = !1 }) {
		return new Promise((c) => {
			let l = a.filter((e) => !d.has(e.split(":")[0])), p = new t({
				title: e,
				icon: "download",
				width: 440,
				height: s || !o ? 340 : 300,
				minimizable: !1,
				maximizable: !1
			}), m = !1, h = (e) => {
				m || (m = !0, c(e), p.emit("close"));
			};
			p.on("destroy", () => h(null)), p.body.append(i("div", { class: "as-dialog" }, i("p", { class: "as-dialog-lead" }, s ? `${r} è un modulo del kernel: il suo codice girerà nel kernel, con accesso completo a utenti e file.` : `${r} potrà:`), !s && l.length ? i("ul", {}, ...l.map((e) => i("li", {}, f(e)))) : null, !s && !l.length ? i("p", {}, "Nessun permesso oltre ai propri dati.") : null, o ? null : i("p", { class: "as-warning" }, "Non verificata: viene da un repository non ufficiale. Non si può sapere chi l’ha scritta, né che il codice non sia stato modificato. Installala solo se ti fidi di chi la distribuisce."), i("div", { class: "as-dialog-buttons" }, n({
				label: "Annulla",
				onClick: () => h(null)
			}), n({
				label: o ? "Installa" : "Installa comunque",
				primary: o,
				danger: !o,
				onClick: () => h({
					grant: l,
					allowUnsigned: !o
				})
			})))), u(p);
		});
	}
	let S = (e) => i("span", { class: "as-status" }, e), C = (...e) => i("div", { class: "as-actions" }, ...e.filter(Boolean)), w = (e, t, r = {}) => n({
		label: e,
		onClick: t,
		...r
	}), T = (e) => (e.disabled = !!g.busy, e);
	function E() {
		if (g.loading) return [{ rows: [{ label: "Lettura dei repository…" }] }];
		let e = r.list();
		return g.repos.map((t) => {
			let n = g.catalogs.get(t.id), r = g.errors.get(t.id), i = r ? [{
				label: "Repository non raggiungibile",
				description: r
			}] : (n?.apps ?? []).map((r) => {
				if (r.error) return {
					label: r.path,
					description: `Pacchetto non valido: ${r.error}`
				};
				let i = r.manifest, a = e.find((e) => e.id === i.id), o = a && m(a.source, t), s;
				return s = a ? o && p(i.version, a.version) ? h ? T(w(`Aggiorna a ${i.version}`, () => O(a, t), { primary: !0 })) : S(`Aggiornamento ${i.version}`) : S(o ? "Installata" : "Installata da un altro repository") : h ? T(w("Installa", () => D(t, n, r), { primary: !0 })) : S("Disponibile"), {
					label: `${i.name} ${i.version}`,
					description: [
						i.description,
						i.publisher?.name,
						i.system ? "App di sistema" : i.kind === "remote" ? "App remota" : null
					].filter(Boolean).join(" · "),
					keywords: `${i.id} ${i.name}`,
					control: () => s
				};
			});
			return {
				title: `${t.name}${t.official ? "" : " (non ufficiale)"}`,
				rows: i.length ? i : [{ label: "Nessuna app" }]
			};
		});
	}
	async function D(e, t, n) {
		let i = n.manifest, a = await x({
			title: `Installa ${i.name}`,
			name: i.name,
			permissions: i.permissions,
			official: e.official
		});
		a && y("install", () => r.install({
			type: "git",
			url: e.url,
			path: n.path,
			ref: t.ref
		}, a), `${i.name} installata`);
	}
	async function O(e, t) {
		let n = (g.catalogs.get(t?.id)?.apps.find((t) => t.manifest?.id === e.id)?.manifest?.permissions ?? []).filter((t) => !d.has(t.split(":")[0]) && !e.granted.includes(t)), i = {
			grant: [],
			allowUnsigned: !t?.official
		};
		(n.length || !t?.official) && (i = await x({
			title: `Aggiorna ${e.manifest.name}`,
			name: e.manifest.name,
			permissions: n,
			official: !!t?.official
		}), !i) || y("update", () => r.update(e.id, i), (t) => t.unchanged ? `${e.manifest.name} è già aggiornata` : `${e.manifest.name} aggiornata alla ${t.version}`);
	}
	function k() {
		let e = r.list();
		return [{
			title: "Installate",
			rows: e.length ? e.map((e) => {
				let t = g.repos.find((t) => m(e.source, t)), n = g.catalogs.get(t?.id)?.apps.find((t) => t.manifest?.id === e.id)?.manifest, i = n && p(n.version, e.version);
				return {
					label: `${e.manifest.name} ${e.version}`,
					description: [
						t ? t.name : e.source?.type === "local" ? "Cartella locale" : "Origine sconosciuta",
						e.signed || e.system && t?.official ? "Verificata" : "Non verificata",
						e.required ? "Necessaria a lilOS" : null,
						i ? `Disponibile la ${n.version}` : null
					].filter(Boolean).join(" · "),
					keywords: `${e.id} ${e.manifest.name}`,
					control: () => h ? C(T(w(i ? `Aggiorna a ${n.version}` : "Cerca aggiornamenti", () => O(e, t), { primary: !!i })), T(w("Reinstalla", () => y("reinstall", () => r.update(e.id, {
						reinstall: !0,
						allowUnsigned: !(e.signed || e.system)
					}), `${e.manifest.name} reinstallata`))), e.required ? null : T(w("Rimuovi", () => y("remove", () => r.uninstall(e.id), `${e.manifest.name} rimossa`), { danger: !0 }))) : S(e.version)
				};
			}) : [{ label: "Nessuna app installata" }]
		}];
	}
	let A = () => g.modules.some((e) => (e.enabled ?? null) !== (e.running ?? null));
	function j() {
		return !h || !A() ? [] : [{
			title: "Riavvio necessario",
			rows: [{
				label: "Le modifiche ai moduli valgono dal prossimo avvio del kernel",
				control: () => T(w("Riavvia il kernel", () => y("restart", async () => {
					await o.restart(), await new Promise((e) => setTimeout(e, 2500));
				}, "Kernel riavviato"), { primary: !0 }))
			}]
		}];
	}
	function M() {
		return h ? g.loading ? [{ rows: [{ label: "Lettura dei repository…" }] }] : [...j(), ...g.repos.map((e) => {
			let t = g.catalogs.get(e.id), n = (t?.modules ?? []).map((n) => {
				if (n.error) return {
					label: n.path,
					description: `Pacchetto non valido: ${n.error}`
				};
				let r = n.module, i = g.modules.find((e) => e.name === r.name && e.enabled), a = i ? m(i.source, e) && p(r.version, i.enabled) ? T(w(`Aggiorna a ${r.version}`, () => P(i, e), { primary: !0 })) : S("Installato") : T(w("Installa", () => N(e, t, n), { primary: !0 }));
				return {
					label: `${r.name} ${r.version}`,
					description: [r.description, r.provides?.length ? `Fornisce: ${r.provides.join(", ")}` : null].filter(Boolean).join(" · "),
					control: () => a
				};
			});
			return {
				title: `${e.name}${e.official ? "" : " (non ufficiale)"}`,
				rows: g.errors.has(e.id) ? [{
					label: "Repository non raggiungibile",
					description: g.errors.get(e.id)
				}] : n.length ? n : [{ label: "Nessun modulo" }]
			};
		})] : [{ rows: [{ label: "Solo un amministratore vede e gestisce i moduli del kernel" }] }];
	}
	async function N(e, t, n) {
		let r = await x({
			title: `Installa ${n.module.name}`,
			name: n.module.name,
			official: e.official,
			kernelModule: !0
		});
		r && y("install", () => o.install({
			type: "git",
			url: e.url,
			path: n.path,
			ref: t.ref
		}, { allowUnsigned: r.allowUnsigned }), `${n.module.name} installato: riavvia il kernel per usarlo`);
	}
	async function P(e, t) {
		let n = !!t?.official;
		(n || await x({
			title: `Aggiorna ${e.name}`,
			name: e.name,
			official: n,
			kernelModule: !0
		})) && y("update", () => o.update(e.name, { allowUnsigned: !n }), (t) => t.unchanged ? `${e.name} è già aggiornato` : `${e.name} ${t.version} installato: riavvia il kernel`);
	}
	function F() {
		return h ? [...j(), {
			title: "Installati",
			rows: g.modules.length ? g.modules.map((e) => {
				let t = g.repos.find((t) => m(e.source, t));
				return {
					label: `${e.name} ${e.enabled ?? e.version}`,
					description: [
						e.description,
						e.provides.length ? `Fornisce: ${e.provides.join(", ")}` : null,
						e.enabled ? e.running === e.enabled ? "In uso" : e.running ? `In uso la ${e.running} fino al riavvio` : "Attivo dal prossimo avvio" : "Spento (restano i suoi dati)",
						t ? t.name : "Installato a mano"
					].filter(Boolean).join(" · "),
					control: () => e.enabled ? C(e.source ? T(w("Cerca aggiornamenti", () => P(e, t))) : null, T(w("Rimuovi", () => y("remove", () => o.remove(e.name), (t) => `${e.name} rimosso${t.kept.length ? " (i suoi dati restano)" : ""}: riavvia il kernel`), { danger: !0 }))) : S("Spento")
				};
			}) : [{ label: "Nessun modulo" }]
		}] : [{ rows: [{ label: "Solo un amministratore vede e gestisce i moduli del kernel" }] }];
	}
	function I() {
		let e = g.newRepo;
		return [{
			title: "Repository",
			rows: g.repos.map((e) => ({
				label: e.name,
				description: `${e.url}${e.official ? " · Ufficiale" : ""}${g.errors.has(e.id) ? ` · Non raggiungibile: ${g.errors.get(e.id)}` : ""}`,
				control: () => e.official || !h ? S(e.official ? "Sempre presente" : "") : T(w("Rimuovi", () => y("repo", () => s.remove(e.id), `${e.name} rimosso`), { danger: !0 }))
			}))
		}, h ? {
			title: "Aggiungi un repository",
			rows: [
				{
					label: "Indirizzo",
					description: "Un repository git con catalog.json, per esempio https://github.com/nome/repo",
					control: () => c({
						value: e.url,
						placeholder: "https://…",
						label: "Indirizzo del repository",
						onInput: (t) => {
							e.url = t;
						}
					})
				},
				{
					label: "Nome",
					description: "Facoltativo: altrimenti quello del suo catalogo",
					control: () => c({
						value: e.name,
						placeholder: "Nome",
						label: "Nome del repository",
						onInput: (t) => {
							e.name = t;
						}
					})
				},
				{
					label: "",
					control: () => T(w("Aggiungi", () => y("repo", async () => {
						let t = await s.add(e.url.trim(), e.name.trim() || void 0);
						return g.newRepo = {
							url: "",
							name: ""
						}, t;
					}, (e) => `${e.name} aggiunto`), { primary: !0 }))
				}
			]
		} : { rows: [{ label: "Solo un amministratore aggiunge e rimuove repository" }] }];
	}
	_ = new e({
		title: "AppStore",
		icon: "download",
		width: 860,
		height: 600,
		tabs: [
			{ group: "Catalogo" },
			{
				id: "apps",
				label: "App",
				icon: "window",
				description: "App dei repository: si installano per tutti gli utenti e tutti i workspace.",
				subtabs: [{
					id: "available",
					label: "Disponibili",
					sections: E
				}, {
					id: "installed",
					label: "Installate",
					sections: k
				}]
			},
			{
				id: "modules",
				label: "Moduli del kernel",
				icon: "monitor",
				description: "Parti del kernel: utenti, file system, collegamenti ad altri servizi. Valgono dopo il riavvio del kernel.",
				subtabs: [{
					id: "available",
					label: "Disponibili",
					sections: M
				}, {
					id: "installed",
					label: "Installati",
					sections: F
				}]
			},
			{ group: "" },
			{
				id: "repos",
				label: "Repository",
				icon: "link",
				description: "Da dove arrivano app e moduli. Quello ufficiale c’è sempre.",
				sections: I
			}
		]
	}), _.el.classList.add("appstore"), _.on("launch", (e) => {
		e?.tab && _.view.select(e.tab);
	});
	let L = r.on("change", () => v());
	return _.on("destroy", L), b(), _;
}
export { h as default };
