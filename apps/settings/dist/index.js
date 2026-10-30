import { SDK_VERSION as e, SettingsWindow as t, TAG_COLORS as n, actionButton as r, appIcon as i, apps as a, fileTypeList as o, fs as s, h as c, icon as l, kernel as u, menus as d, openMenu as f, segmented as p, selectField as m, session as h, settings as g, shortcutField as _, shortcuts as v, storage as y, swatches as b, tags as x, textField as S, toast as C, toggle as w } from "/host/sdk.js";
import * as T from "/host/system.js";
import { ACCENTS as E, LASSO_OPTIONS as D, RETENTION_OPTIONS as O, WORKSPACE_LIMITS as k, appFor as A, apps as j, canChangeExecution as M, defaultAppFor as N, executionMode as ee, fileApps as te, knownExtensions as P, launch as F, pickFile as I, resetAppsFor as L, setAppFor as ne, setTag as re, showAppSecurity as ie, startup as R, version as ae, workspaceManager as z } from "/host/system.js";
// src/settings/menuEditor.js
function oe(e, { openWindow: t, rerender: n, confirmButton: i }) {
	let a = d.layout(e), o = (t) => {
		d.setLayout(e, t), n();
	}, u = (e) => {
		if (e.type === "separator") return {
			label: "— Separatore —",
			description: ""
		};
		if (e.type === "submenu") return {
			label: e.label,
			description: `Sottomenu · ${e.items.length} ${e.items.length === 1 ? "voce" : "voci"}`
		};
		let t = d.action(e.action), n = e.label ?? t?.label ?? e.action;
		if (e.action === "desktop.create") {
			let t = e.params.kind === "folder" ? "Crea la cartella" : "Crea il file", r = e.params.template ? ` dal modello ${s.exists(e.params.template) ? s.path(e.params.template) : "(file eliminato)"}` : e.params.content ? " con un contenuto iniziale" : "";
			return {
				label: n,
				description: `${t} «${e.params.name}»${r}`
			};
		}
		return e.action === "app.launch" ? {
			label: n,
			description: `Apre l’app ${j.find((t) => t.id === e.params.app)?.name ?? e.params.app}`
		} : {
			label: n,
			description: "Azione"
		};
	}, f = (e, t) => {
		let n = structuredClone(a);
		return t(e.length === 1 ? n : n[e[0]].items, e[e.length - 1]), n;
	}, p = (e, t) => o(f(e, (e, n) => {
		let r = n + t;
		r < 0 || r >= e.length || ([e[n], e[r]] = [e[r], e[n]]);
	})), h = (e) => o(f(e, (e, t) => e.splice(t, 1))), g = (e, t, n) => {
		let { label: r, description: i } = u(e), a = t[t.length - 1], o = (e, t, n, i) => c("button", {
			class: "mm-btn",
			type: "button",
			title: t,
			"aria-label": `${t}: ${r}`,
			disabled: i,
			onclick: n
		}, l(e));
		return {
			label: t.length === 2 ? `↳ ${r}` : r,
			description: i,
			keywords: "menu contestuale voce separatore nuovo",
			control: c("div", { class: "mm-ctl" }, o("arrowUp", "Sposta su", () => p(t, -1), a === 0), o("arrowDown", "Sposta giù", () => p(t, 1), a === n - 1), o("x", "Togli", () => h(t)))
		};
	}, _ = [];
	a.forEach((e, t) => {
		_.push(g(e, [t], a.length)), e.type === "submenu" && e.items.forEach((n, r) => _.push(g(n, [t, r], e.items.length)));
	});
	let v = a.map((e, t) => [e, t]).filter(([e]) => e.type === "submenu"), y = [{
		value: "root",
		label: "Menu principale"
	}, ...v.map(([e, t]) => ({
		value: String(t),
		label: `Dentro «${e.label}»`
	}))], b = (e, t) => o(f(e === "root" ? [0] : [Number(e), 0], (e) => e.push(t))), x = d.actions(e).filter((e) => e.id !== "desktop.create" && e.id !== "app.launch"), C = m({
		value: x[0]?.id,
		label: "Voce da aggiungere",
		options: [...x.map((e) => ({
			value: e.id,
			label: e.label
		})), ...j.filter((e) => e.load).map((e) => ({
			value: `app:${e.id}`,
			label: `Apri ${e.name}`
		}))]
	}), w = m({
		value: "root",
		options: y,
		label: "Dove"
	}), T = m({
		value: "root",
		options: y,
		label: "Dove"
	}), E = v[0], D = S({
		placeholder: "Etichetta (es. Foglio di stile)",
		label: "Etichetta"
	}), O = S({
		placeholder: "Nome (es. stile.css)",
		label: "Nome del file o della cartella"
	}), k = m({
		value: "file",
		options: [{
			value: "file",
			label: "File"
		}, {
			value: "folder",
			label: "Cartella"
		}],
		label: "Tipo"
	}), A = null, M = r({
		label: "Modello…",
		onClick: async () => {
			let e = await I(t, {
				title: "Scegli il file modello",
				text: "Il nuovo file partirà con il contenuto di questo file."
			});
			e && (A = e.id, M.textContent = `Modello: ${e.name}`);
		}
	}), N = c("small", { class: "mm-note" });
	return [{
		title: d.list().find((t) => t.id === e)?.label ?? e,
		rows: _
	}, {
		title: "Aggiungi",
		rows: [
			{
				label: "Voce",
				description: "Un’azione o l’apertura di un’app",
				control: c("div", { class: "mm-add" }, C, w, r({
					label: "Aggiungi",
					onClick: () => {
						let e = C.value, t = e.startsWith("app:") ? {
							type: "action",
							action: "app.launch",
							label: `Apri ${j.find((t) => t.id === e.slice(4))?.name}`,
							params: { app: e.slice(4) }
						} : {
							type: "action",
							action: e
						};
						b(w.value, t);
					}
				}))
			},
			{
				label: "Separatore",
				description: "Una linea per raggruppare le voci",
				control: c("div", { class: "mm-add" }, T, r({
					label: "Aggiungi",
					onClick: () => b(T.value, { type: "separator" })
				}))
			},
			...E ? [{
				label: `Nuovo elemento in «${E[0].label}»`,
				description: "Crea un file o una cartella con questo nome; un file può partire dal contenuto di un modello",
				control: c("div", { class: "mm-add" }, D, O, k, M, r({
					label: "Aggiungi",
					primary: !0,
					onClick: () => {
						let e = D.value.trim(), t = O.value.trim();
						if (!e || !t) {
							N.textContent = "Servono l’etichetta e il nome";
							return;
						}
						let n = {
							kind: k.value,
							name: t,
							...A && k.value === "file" && { template: A }
						};
						b(String(E[1]), {
							type: "action",
							action: "desktop.create",
							label: e,
							icon: n.kind === "folder" ? "folderPlus" : "filePlus",
							params: n
						});
					}
				}), N)
			}] : [],
			{
				label: "Voci predefinite",
				description: d.isCustom(e) ? "Il menu è stato personalizzato" : "Il menu è quello predefinito",
				control: i("Ripristina", "Conferma", () => {
					d.reset(e), n();
				})
			}
		]
	}];
}
// src/settings/startup.js
function se() {
	return [{
		title: "Avvio automatico",
		rows: [{
			label: "Apri le app quando entri",
			description: "Si aprono le app scelte in App, con i loro parametri. Solo nella prima scheda di lilOS di questo browser: le altre si aprono vuote.",
			keywords: "avvio automatico accesso login esecuzione automatica",
			control: w({
				value: g.get("startupApps"),
				label: "Apri le app quando entri",
				onChange: (e) => g.set("startupApps", e)
			})
		}]
	}, {
		title: "Se qualcosa non va",
		rows: [{
			label: "Avvio senza app",
			description: "Per una volta sola: apri lilOS con ?avvio=no in fondo all’indirizzo. Le scelte salvate restano.",
			keywords: "avvio sicuro avvio=no",
			control: R.skipped ? "Attivo ora" : ""
		}]
	}];
}
function B(e) {
	let t = R.apps().filter((e) => j.some((t) => t.id === e.app));
	return [{
		title: "Si aprono quando entri",
		content: () => c("div", { class: "su-apps" }, c("p", { class: "su-hint" }, "Nel workspace in cui si apre lilOS, nell’ordine dell’elenco. Togli tutti i punti d’ingresso di un’app e l’app esce dall’elenco."), t.length ? t.map((t) => V(t, e)) : c("p", { class: "su-empty" }, "Nessuna app si apre da sola."), W(t, e))
	}];
}
function V(e, t) {
	let n = j.find((t) => t.id === e.app), a = R.windowEntries(n.id), o = new Map(e.entries.map((e) => [e.entry, e.params])), s = a.filter((e) => o.has(e.entry)).length, l = c("div", { class: "st-row su-head" }, i(n, "su-icon"), c("div", { class: "st-label" }, c("b", {}, n.name), c("small", {}, a.length === 1 ? "1 punto d’ingresso" : `${s} di ${a.length} punti d’ingresso`)), r({
		label: "Rimuovi dall’avvio",
		onClick: () => {
			R.removeApp(n.id), t.rerender();
		}
	})), u = a.flatMap((e) => {
		let r = o.has(e.entry), i = c("div", { class: "st-row su-entry" }, w({
			value: r,
			label: `${n.name}: ${e.label}`,
			onChange: (r) => {
				try {
					R.setEntry(n.id, e.entry, r);
				} catch (e) {
					C(e.message);
				}
				t.rerender();
			}
		}), c("div", { class: "st-label" }, c("b", {}, e.label), c("small", {}, c("code", {}, e.entry))));
		return r ? [i, H(n, e, o.get(e.entry), t)] : [i];
	});
	return c("div", { class: "st-card su-app" }, l, u);
}
function H(e, t, n, { openWindow: r }) {
	let i = `${t.label} di ${e.name}`;
	if (!t.params) {
		let r = "Questo punto d’ingresso non descrive i suoi parametri: arrivano all’app così come sono, come args.", a = c("span", { class: "su-note" }, r), o = c("textarea", {
			class: "su-json",
			spellcheck: "false",
			placeholder: "{ }",
			"aria-label": `Parametri (JSON) di ${i}`
		});
		return o.value = Object.keys(n).length ? JSON.stringify(n) : "", o.addEventListener("change", () => {
			let n = o.value.trim();
			try {
				let i;
				try {
					i = n ? JSON.parse(n) : {};
				} catch {
					throw Error("Non è JSON valido");
				}
				R.setParams(e.id, t.entry, i), o.removeAttribute("aria-invalid"), a.classList.remove("bad"), a.textContent = r;
			} catch (e) {
				o.setAttribute("aria-invalid", "true"), a.classList.add("bad"), a.textContent = `Non salvati: ${e.message}`;
			}
		}), c("div", { class: "su-params" }, c("span", { class: "su-plabel" }, "Parametri (JSON)"), c("span"), o, a);
	}
	let a = { ...n }, o = (n, r) => {
		let i = { ...a };
		r === "" || r == null ? delete i[n] : i[n] = r;
		try {
			return R.setParams(e.id, t.entry, i), a = i, !0;
		} catch (e) {
			return C(e.message, { timeout: 6e3 }), !1;
		}
	}, s = Object.entries(t.params).flatMap(([e, t]) => {
		let n = Object.hasOwn(a, e) ? a[e] : t.default, s = `${t.label} (${i})`, l;
		if (t.type === "boolean") l = w({
			value: n === !0,
			label: s,
			onChange: (t) => o(e, t)
		});
		else if (t.type === "choice") {
			let r = [{
				value: "",
				label: "—"
			}, ...t.options.map((e) => ({
				value: String(e.value),
				label: e.label
			}))];
			l = m({
				value: n === void 0 ? "" : String(n),
				options: r,
				label: s,
				onChange: (n) => o(e, n === "" ? null : t.options.find((e) => String(e.value) === n)?.value)
			});
		} else t.type === "number" ? (l = c("input", {
			class: "ctl-text su-number",
			type: "number",
			min: t.min,
			max: t.max,
			"aria-label": s
		}), l.value = n ?? "", l.addEventListener("change", () => {
			o(e, l.value === "" ? null : Number(l.value)) || (l.value = a[e] ?? "");
		})) : t.type === "file" || t.type === "folder" ? l = U(t, n, s, (t) => o(e, t), r) : (l = S({
			value: n ?? "",
			label: s,
			onChange: (t) => {
				o(e, t) || (l.value = a[e] ?? "");
			}
		}), t.maxLength && (l.maxLength = t.maxLength));
		return [c("label", {
			class: "su-plabel",
			title: t.description ?? ""
		}, t.label), c("div", { class: "su-field" }, l)];
	});
	return c("div", { class: "su-params" }, s);
}
function U(e, t, n, i, a) {
	let o = e.type === "folder", u = c("input", {
		class: "ctl-text",
		type: "text",
		readonly: !0,
		placeholder: o ? "Nessuna cartella" : "Nessun file",
		"aria-label": n
	}), d = (e) => {
		u.value = e ? s.exists(e) ? s.path(e) : "(non c’è più)" : "";
	};
	d(t);
	let f = r({
		label: "Scegli…",
		onClick: async () => {
			let t = await I(a, {
				kind: o ? "folder" : "file",
				title: e.label
			});
			t && i(t.id) && d(t.id);
		}
	}), p = c("button", {
		class: "ctl-btn su-clear",
		type: "button",
		title: "Togli",
		"aria-label": `Togli ${e.label}`
	}, l("x"));
	return p.addEventListener("click", () => {
		i(null) && d(null);
	}), c("div", { class: "su-path" }, u, f, p);
}
function W(e, { rerender: t }) {
	let n = r({
		label: "Aggiungi…",
		onClick: () => {
			let r = j.filter((t) => t.load && !e.some((e) => e.app === t.id) && R.windowEntries(t.id).length).sort((e, t) => e.name.localeCompare(t.name));
			if (!r.length) return C("Tutte le app sono già all’avvio");
			let i = n.getBoundingClientRect();
			f(i.left, i.bottom + 4, r.map((e) => ({
				label: e.name,
				icon: e.glyph,
				action: () => {
					try {
						R.addApp(e.id);
					} catch (e) {
						C(e.message);
					}
					t();
				}
			})));
		}
	});
	return c("div", { class: "st-row su-add" }, c("span", { class: "su-plus" }, l("plus")), c("div", { class: "st-label" }, c("b", {}, "Aggiungi un’app all’avvio"), c("small", {}, "Si apre la sua finestra principale; poi scegli altri punti d’ingresso e parametri")), n);
}
// src/settings/SettingsApp.js
var G = null, K = (e, t, n) => e === 1 ? `1 ${t}` : `${e} ${n}`;
function ce() {
	let e = z(), t = e?.current;
	return t ? [{
		title: "Workspace",
		rows: [
			{
				label: "Nome",
				keywords: "rinomina workspace",
				control: () => {
					let n = S({
						value: t.name,
						label: "Nome del workspace",
						onChange: (n) => e.rename(t.id, n)
					});
					return n.maxLength = k.MAX_NAME, n;
				}
			},
			{
				label: "Colore",
				description: "Il pallino nella barra in basso e accanto ai suoi file nel File Manager",
				keywords: "colore workspace",
				control: () => b({
					value: t.color,
					colors: E,
					onChange: (n) => e.setColor(t.id, n)
				})
			},
			{
				label: "File, cartelle e collegamenti",
				description: "Creati in questo workspace, sulla scrivania e nelle cartelle condivise",
				control: String(e.ownedCount(t.id))
			}
		]
	}, {
		title: "App",
		rows: j.map((t) => ({
			label: t.name,
			description: t.system ? "App di sistema: c’è in ogni workspace" : "Installata in lilOS: qui la puoi nascondere",
			keywords: `app nascondi mostra ${t.name}`,
			control: t.system ? "Sempre visibile" : () => w({
				value: e.isInstalled(t.id),
				label: `${t.name} visibile in questo workspace`,
				onChange: (n) => e.setInstalled(t.id, n)
			})
		}))
	}] : [];
}
function le() {
	let e = z();
	if (!e) return [];
	let t = e.list();
	return [{
		title: "Workspace",
		rows: [...t.map((n) => {
			let i = n.id === e.currentId, a = j.filter((t) => e.isInstalled(t.id, n.id)).length;
			return {
				label: i ? `${n.name} (attuale)` : n.name,
				description: `${K(e.ownedCount(n.id), "elemento creato", "elementi creati")} · ${K(a, "app", "app")}`,
				keywords: "workspace passa elimina",
				control: () => c("div", { class: "ws-settings-actions" }, i ? null : r({
					label: "Passa a questo",
					onClick: () => e.switchTo(n.id)
				}), t.length > 1 ? Q("Elimina…", "Elimina", () => e.remove(n.id)) : null)
			};
		}), {
			label: "Nuovo workspace",
			description: "Con la scrivania vuota e tutte le app visibili",
			control: r({
				label: "Crea",
				onClick: () => {
					let t = e.create();
					t && e.switchTo(t);
				}
			})
		}]
	}, {
		title: "Eliminare un workspace",
		rows: [{
			label: "I file restano",
			description: "La sua scrivania diventa la cartella Documenti/Scrivania di <nome> (se non è vuota); i file creati altrove restano dove sono, segnati come suoi."
		}, {
			label: "Le finestre restano",
			description: "Le sue finestre aperte passano nel workspace attuale, con le modifiche non salvate. Workarea, vista e app nascoste si perdono."
		}]
	}];
}
var q = [];
function ue() {
	let e = (e) => {
		try {
			let t = x.create({ name: e.value });
			q.length && re(q, t.id, !0), q = [];
		} catch (t) {
			C(t.message), e.focus();
		}
	}, t = q.filter((e) => s.exists(e)).length;
	return [{
		title: "Nuovo tag",
		rows: [{
			label: "Nome",
			description: t ? `Il nuovo tag andrà su ${K(t, "elemento selezionato", "elementi selezionati")}` : "Poi si assegna dal menu del tasto destro → Tag, sulla scrivania e nel File Manager",
			keywords: "nuovo tag crea etichetta",
			control: () => {
				let t = S({
					placeholder: "Per esempio: Urgente",
					label: "Nome del nuovo tag"
				});
				return t.maxLength = 30, t.classList.add("tag-new-name"), t.addEventListener("keydown", (n) => {
					n.key === "Enter" && (n.preventDefault(), e(t));
				}), c("div", { class: "tag-settings-actions" }, t, r({
					label: "Crea",
					primary: !0,
					onClick: () => e(t)
				}));
			}
		}]
	}, ...x.list().map((e) => ({
		title: e.name,
		rows: [
			{
				label: "Nome",
				keywords: "rinomina tag",
				control: () => {
					let t = S({
						value: e.name,
						label: `Nome del tag ${e.name}`,
						onChange: (n) => {
							try {
								x.rename(e.id, n);
							} catch (n) {
								C(n.message), t.value = x.get(e.id)?.name ?? "";
							}
						}
					});
					return t.maxLength = 30, t;
				}
			},
			{
				label: "Colore",
				keywords: "colore tag",
				control: () => b({
					value: e.color,
					colors: n,
					onChange: (t) => x.setColor(e.id, t)
				})
			},
			{
				label: "Visibile",
				description: e.visible ? "Gli elementi con questo tag si vedono ovunque" : "Gli elementi con questo tag sono nascosti ovunque: si ritrovano nel File Manager → Tag",
				keywords: "nascondi mostra invisibile tag",
				control: () => w({
					value: e.visible,
					label: `Tag ${e.name} visibile`,
					onChange: (t) => x.setVisible(e.id, t)
				})
			},
			{
				label: "Elementi",
				description: `${K(s.tagged(e.id).length, "elemento", "elementi")} in questo workspace e nelle cartelle condivise`,
				control: () => c("div", { class: "tag-settings-actions" }, r({
					label: "Mostra nel File Manager",
					onClick: () => F("files", { tag: e.id })
				}), Q("Elimina…", "Elimina il tag", () => x.remove(e.id)))
			}
		]
	}))];
}
function de() {
	let e = T.DESK_FIXED_ITEMS ?? [];
	return e.length ? [{
		title: "Elementi fissi",
		rows: [{
			label: "Sempre sulla scrivania",
			description: "Ci sono sulla scrivania di ogni workspace. Si aprono e si spostano come gli altri, ma non si rinominano e non si eliminano."
		}, ...e.map((e) => ({
			label: e.name,
			description: e.description,
			keywords: `elementi fissi scrivania elimina ${e.name}`,
			control: "Fisso"
		}))]
	}] : [];
}
var J = (e) => () => w({
	value: g.get(e),
	onChange: (t) => g.set(e, t)
}), Y = [
	"Generale",
	"Scrivania",
	"Elementi",
	"Finestre"
];
function fe() {
	let e = new Set(P()), t = /* @__PURE__ */ new Set(), n = (e) => {
		t.add(e);
		let n = N(e);
		return {
			label: e ? `.${e}` : "Senza estensione",
			description: n ? `Predefinita: ${n.name}` : "Nessuna app predefinita",
			keywords: `tipo file estensione apri con ${e}`,
			control: () => m({
				value: A(e)?.id ?? "ask",
				label: `App per ${e ? "." + e : "i file senza estensione"}`,
				options: [{
					value: "ask",
					label: "Chiedi ogni volta"
				}, ...te().map((e) => ({
					value: e.id,
					label: e.name
				}))],
				onChange: (t) => ne(e, t)
			})
		};
	}, r = o().map((t) => ({
		title: t.label,
		rows: t.exts.filter((t) => e.has(t)).map(n)
	})).filter((e) => e.rows.length), i = [...e].filter((e) => !t.has(e)).sort((e, t) => e === "" ? -1 : t === "" ? 1 : e.localeCompare(t));
	return [
		{
			title: "App per tipo di file",
			rows: [{
				label: "Tutti i tipi di file",
				description: "Aprendo un file, lilOS usa l’app scelta qui. Con «Chiedi ogni volta» compare la finestra Apri con.",
				control: Q("Ripristina tutti", "Conferma", () => {
					L(), G?.render();
				})
			}]
		},
		...r,
		...i.length ? [{
			title: "Altri",
			rows: i.map(n)
		}] : []
	];
}
function pe() {
	let e = s.trashed(), t = e.reduce((e, t) => e + t.bytes, 0);
	return [{
		title: "Eliminazione",
		rows: [{
			label: "Chiedi conferma",
			description: "Prima di eliminare file e cartelle, un piccolo menu chiede di confermare",
			keywords: "conferma elimina cancella domanda",
			control: J("deleteConfirm")
		}, {
			label: "Elimina definitivamente",
			description: "Gli elementi eliminati non passano dal cestino: si recuperano solo con Ctrl Z, finché la pagina resta aperta",
			keywords: "cestino definitivo subito cancella salta",
			control: J("deletePermanent")
		}]
	}, {
		title: "Cestino",
		rows: [
			{
				label: "Conserva gli elementi per",
				description: "Passato questo tempo, quello che è nel cestino viene eliminato definitivamente",
				keywords: "retention durata giorni pulizia automatica svuota",
				control: () => {
					let e = g.get("trashRetention"), t = O.some((t) => t.value === e) ? O : [...O, {
						value: e,
						label: e > 0 ? `${e} giorni` : "Per sempre"
					}];
					return m({
						value: e,
						label: "Conserva gli elementi nel cestino per",
						options: t,
						onChange: (e) => g.set("trashRetention", Number(e))
					});
				}
			},
			{
				label: "Contenuto",
				description: e.length ? `${K(e.length, "elemento", "elementi")} · ${$(t)}` : "Il cestino è vuoto",
				keywords: "apri cestino ripristina",
				control: r({
					label: "Apri il cestino",
					onClick: () => F("files", { trash: !0 })
				})
			},
			{
				label: "Svuota il cestino",
				description: "Elimina definitivamente tutto quello che contiene",
				keywords: "svuota cestino",
				control: e.length ? Q("Svuota…", "Svuota", () => s.purgeTrash()) : "Vuoto"
			}
		]
	}];
}
function X(e = s.root) {
	return s.children(e).reduce((e, t) => e + (t.type === "folder" ? X(t.id) : t.size ?? 0), 0);
}
function me() {
	let e = /* @__PURE__ */ new Map();
	for (let t of v.list()) e.has(t.group) || e.set(t.group, []), e.get(t.group).push(t);
	let t = (e) => Y.includes(e) ? Y.indexOf(e) : Y.length;
	return [
		{
			title: "Scorciatoie da tastiera",
			rows: [{
				label: "Tutte le scorciatoie",
				description: "Le modifiche valgono subito. Per registrare una combinazione premi +, poi i tasti; Esc annulla.",
				control: Q("Ripristina tutte", "Conferma", () => v.resetAll())
			}]
		},
		...[...e].sort(([e], [n]) => t(e) - t(n)).map(([e, t]) => ({
			title: e,
			rows: t.map((e) => ({
				label: e.label,
				keywords: `scorciatoia tasti ${e.keys.map((e) => v.format(e)).join(" ")}`,
				control: _(e.id)
			}))
		})),
		{
			title: "Mouse",
			rows: [
				{
					label: "Selezione a mano libera",
					description: "Disegna un percorso chiuso: si selezionano gli elementi che contiene",
					keywords: "lazo lasso percorso selezione alt",
					control: () => m({
						value: g.get("lasso"),
						options: D,
						onChange: (e) => g.set("lasso", e)
					})
				},
				{
					label: "Selezione a rettangolo",
					control: "Trascina sullo sfondo"
				},
				{
					label: "Aggiungere alla selezione",
					control: "Ctrl o Shift + clic o trascinamento"
				},
				{
					label: "Spostarsi sulla scrivania",
					control: "Spazio + trascina, o tasto centrale"
				}
			]
		},
		{
			title: "Tasti fissi",
			rows: [{
				label: "Muoversi nei menu, nelle liste e nei tab",
				control: "Frecce, Invio, Esc"
			}, {
				label: "Confermare o annullare la rinomina",
				control: "Invio, Esc"
			}]
		}
	];
}
var he = {
	isolated: "Isolata",
	open: "Non isolata",
	system: "Dentro lilOS",
	remote: "Isolata, nel suo sito"
};
function Z() {
	let e = M(), { isolated: t } = a.security(), n = j.filter((e) => e.package && !e.package.system);
	return [{
		title: "Esecuzione delle app",
		rows: [{
			label: "Esegui le app isolate",
			description: e ? "Ogni app gira in una sandbox e vede solo quello che i suoi permessi le concedono. Se lo togli, le app girano nella pagina di lilOS e in un Web Worker: più veloci, ma possono fare tutto quello che puoi fare tu. Vale dalla prossima apertura di ogni app." : "Solo un amministratore la cambia.",
			keywords: "sicurezza isolamento sandbox iframe worker",
			control: e ? w({
				value: t,
				label: "Esegui le app isolate",
				onChange: async (e) => {
					try {
						await a.setSecurity({ isolated: e });
					} catch (e) {
						C(`Non cambiata: ${e.message}`);
					}
					G?.render();
				}
			}) : t ? "Sì" : "No"
		}, {
			label: "App di sistema",
			description: "File Manager, Editor, Sistema e AppStore fanno parte di lilOS e girano sempre dentro lilOS."
		}]
	}, {
		title: "App installate",
		rows: n.length ? n.map((e) => {
			let t = ee(e.package), n = t.fixed ? t.reason : t.own === null ? "Come le altre app" : "Scelta per questa app";
			return {
				label: e.name,
				description: `${he[t.mode]} · ${n}`,
				keywords: "sicurezza isolamento",
				control: r({
					label: "Proprietà…",
					onClick: () => ie(e.id)
				})
			};
		}) : [{ label: "Nessuna app installata oltre a quelle di sistema" }]
	}];
}
function Q(e, t, n) {
	let i = 0, a = r({
		label: e,
		onClick: () => {
			if (!a.classList.contains("primary")) {
				a.textContent = t, a.classList.add("danger", "primary"), i = setTimeout(o, 4e3);
				return;
			}
			clearTimeout(i);
			let e = n();
			typeof e?.then == "function" ? (a.disabled = !0, a.setAttribute("aria-busy", "true"), e.catch((e) => C(e.message, { timeout: 7e3 })).finally(() => {
				a.disabled = !1, a.removeAttribute("aria-busy"), o();
			})) : o();
		}
	}), o = () => {
		a.textContent = e, a.classList.remove("danger", "primary");
	};
	return a;
}
function ge() {
	return y.bytes();
}
function $(e) {
	return e == null ? "Non disponibile" : e < 1024 ? `${e} B` : `${(e / 1024).toLocaleString(h.locale, { maximumFractionDigits: 1 })} KB`;
}
var _e = [
	[/Edg\/(\d+)/, "Edge"],
	[/Firefox\/(\d+)/, "Firefox"],
	[/Chrome\/(\d+)/, "Chrome"],
	[/Version\/(\d+).*Safari/, "Safari"]
];
function ve() {
	for (let [e, t] of _e) {
		let n = navigator.userAgent.match(e);
		if (n) return `${t} ${n[1]}`;
	}
	return "Sconosciuto";
}
function ye({ openWindow: n, args: r } = {}) {
	let i = new t({
		title: "Sistema",
		icon: "gear",
		width: 760,
		height: 500,
		tabs: [
			{ group: "Sistema" },
			{
				id: "appearance",
				label: "Aspetto",
				icon: "palette",
				description: "Colori e movimento dell’interfaccia.",
				subtabs: [{
					id: "colors",
					label: "Colori",
					sections: () => [{
						title: "Tema",
						rows: [{
							label: "Tema",
							description: "Chiaro o scuro: scrivania, barra, menu e finestre",
							keywords: "tema chiaro scuro dark light notte",
							control: p({
								value: g.get("theme"),
								label: "Tema",
								options: [{
									value: "light",
									label: "Chiaro"
								}, {
									value: "dark",
									label: "Scuro"
								}],
								onChange: (e) => g.set("theme", e)
							})
						}]
					}, {
						title: "Colore principale",
						rows: [{
							label: "Colore",
							description: "Selezione, pulsanti, tab attivi e logo",
							keywords: "accento tema",
							control: b({
								value: g.get("accent"),
								colors: E,
								onChange: (e) => g.set("accent", e)
							})
						}]
					}]
				}, {
					id: "motion",
					label: "Movimento",
					sections: () => [{
						title: "Animazioni",
						rows: [{
							label: "Animazioni",
							description: "Spostamenti della vista, menu e transizioni. Se il sistema operativo chiede movimento ridotto, restano ridotte.",
							keywords: "movimento transizioni",
							control: J("motion")
						}]
					}]
				}]
			},
			{
				id: "desk",
				label: "Scrivania",
				icon: "grid",
				description: "Comportamento della scrivania infinita.",
				subtabs: [{
					id: "items",
					label: "Elementi",
					sections: () => [...de(), {
						title: "Posizionamento",
						rows: [{
							label: "Allinea alla griglia",
							description: "Gli elementi trascinati si allineano a una griglia invisibile",
							keywords: "icone snap",
							control: J("snap")
						}]
					}]
				}, {
					id: "overview",
					label: "Panoramica",
					sections: () => [{
						title: "Pannello in basso a destra",
						rows: [{
							label: "Mostra la minimappa",
							keywords: "mappa miniatura",
							control: J("minimap")
						}]
					}]
				}]
			},
			{
				id: "workspaces",
				label: "Workspace",
				icon: "workspace",
				description: "Scrivanie separate, ognuna con i suoi elementi, finestre e app. I file fuori dalla scrivania sono di tutti.",
				subtabs: [{
					id: "current",
					label: "Questo workspace",
					sections: ce
				}, {
					id: "all",
					label: "Tutti",
					sections: le
				}]
			},
			{
				id: "tags",
				label: "Tag",
				icon: "tag",
				description: "Etichette colorate per ritrovare file e cartelle ovunque siano. Un tag invisibile nasconde i suoi elementi.",
				sections: ue
			},
			{
				id: "usability",
				label: "Usabilità",
				icon: "accessibility",
				description: "Tastiera, mouse, app che aprono i file, menu contestuali e cestino.",
				subtabs: [
					{
						id: "shortcuts",
						label: "Scorciatoie",
						sections: me
					},
					{
						id: "filetypes",
						label: "Tipi di file",
						sections: fe
					},
					{
						id: "contextmenu",
						label: "Menu contestuale",
						sections: () => oe("desktop.background", {
							openWindow: n,
							confirmButton: Q,
							rerender: () => G?.render()
						})
					},
					{
						id: "trash",
						label: "Cestino",
						sections: pe
					}
				]
			},
			{
				id: "apps",
				label: "App",
				icon: "window",
				description: "Come girano le app installate.",
				subtabs: [{
					id: "security",
					label: "Sicurezza",
					sections: Z
				}]
			},
			{
				id: "startup",
				label: "Avvio",
				icon: "power",
				description: "Le app che si aprono da sole quando entri in lilOS.",
				subtabs: [{
					id: "options",
					label: "Opzioni",
					sections: se
				}, {
					id: "apps",
					label: "App",
					sections: () => B({
						openWindow: n,
						rerender: () => G?.render()
					})
				}]
			},
			{ group: "Dati" },
			{
				id: "storage",
				label: "Archiviazione",
				icon: "disk",
				description: u.connected ? "Dati di lilOS salvati nella tua cartella utente." : "Dati di lilOS salvati in questo browser.",
				sections: () => [{
					title: "Spazio",
					rows: [{
						label: "Spazio usato",
						description: "Posizioni, vista e impostazioni",
						control: $(ge())
					}, {
						label: "Contenuto dei file",
						description: "Testo salvato nei file",
						control: $(X())
					}]
				}, {
					title: "Ripristino",
					rows: [{
						label: "Impostazioni predefinite",
						description: "Riporta impostazioni, scorciatoie, app dei tipi di file e menu ai valori iniziali",
						control: Q("Ripristina", "Conferma", () => {
							[
								"accent",
								"theme",
								"motion",
								"snap",
								"minimap",
								"lasso",
								"deleteConfirm",
								"deletePermanent",
								"trashRetention",
								"startupApps"
							].forEach((e) => g.reset(e)), v.resetAll(), L(), d.list().forEach((e) => d.reset(e.id));
						})
					}, {
						label: "Scrivania e file iniziali",
						description: "Elimina tutte le cartelle e i file creati, i workspace, i tag, le posizioni e la vista salvate, poi ricarica lilOS",
						keywords: "reset desktop workspace tag",
						control: Q("Ripristina…", "Elimina e ricarica", async () => {
							await s.reset(), [
								"workspaces",
								"tags",
								"desktop-layout",
								"desktop",
								"camera",
								"workareas",
								"editor-tree",
								"files-sidebar",
								"app-setup"
							].forEach((e) => y.remove(e)), await u.flush().catch(() => {}), location.reload();
						})
					}]
				}]
			},
			{ group: "" },
			{
				id: "about",
				label: "Informazioni",
				icon: "info",
				description: "Versione e ambiente.",
				sections: () => [{
					title: "lilOS",
					rows: [
						{
							label: "Versione",
							control: ae
						},
						{
							label: "Versione dell’SDK",
							control: e
						},
						{
							label: "Lingua",
							control: h.locale
						},
						{
							label: "Browser",
							control: ve()
						}
					]
				}]
			}
		]
	});
	G = i.view;
	let o = (e) => {
		Array.isArray(e?.tagFor) && (q = e.tagFor.filter((e) => typeof e == "string" && s.exists(e))), typeof e?.tab == "string" && i.view.select(e.tab), e?.tab === "tags" && i.view.panel.querySelector(".tag-new-name")?.focus();
	};
	o(r), i.on("launch", o);
	let c = z()?.on("change", () => i.view.render()), l = s.on("trash", () => i.view.render()), f = x.on("change", () => i.view.render()), m = [a.on("change", () => i.view.render()), a.on("security", () => i.view.render())];
	return i.on("destroy", () => {
		c?.(), l(), f(), m.forEach((e) => e()), G === i.view && (G = null);
	}), i;
}
export { ye as default };
