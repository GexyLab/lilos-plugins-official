import { SDK_VERSION as e, SettingsWindow as t, TAG_COLORS as n, actionButton as r, apps as i, fileTypeList as a, fs as o, h as s, icon as c, kernel as l, menus as u, segmented as d, selectField as f, session as p, settings as m, shortcutField as h, shortcuts as g, storage as _, swatches as v, tags as y, textField as b, toast as x, toggle as S } from "/host/sdk.js";
import { ACCENTS as C, LASSO_OPTIONS as w, RETENTION_OPTIONS as T, WORKSPACE_LIMITS as E, appFor as D, apps as O, canChangeExecution as k, defaultAppFor as A, executionMode as j, fileApps as M, knownExtensions as N, launch as P, pickFile as F, resetAppsFor as I, setAppFor as ee, setTag as te, showAppSecurity as L, version as R, workspaceManager as z } from "/host/system.js";
// src/settings/menuEditor.js
function B(e, { openWindow: t, rerender: n, confirmButton: i }) {
	let a = u.layout(e), l = (t) => {
		u.setLayout(e, t), n();
	}, d = (e) => {
		if (e.type === "separator") return {
			label: "— Separatore —",
			description: ""
		};
		if (e.type === "submenu") return {
			label: e.label,
			description: `Sottomenu · ${e.items.length} ${e.items.length === 1 ? "voce" : "voci"}`
		};
		let t = u.action(e.action), n = e.label ?? t?.label ?? e.action;
		if (e.action === "desktop.create") {
			let t = e.params.kind === "folder" ? "Crea la cartella" : "Crea il file", r = e.params.template ? ` dal modello ${o.exists(e.params.template) ? o.path(e.params.template) : "(file eliminato)"}` : e.params.content ? " con un contenuto iniziale" : "";
			return {
				label: n,
				description: `${t} «${e.params.name}»${r}`
			};
		}
		return e.action === "app.launch" ? {
			label: n,
			description: `Apre l’app ${O.find((t) => t.id === e.params.app)?.name ?? e.params.app}`
		} : {
			label: n,
			description: "Azione"
		};
	}, p = (e, t) => {
		let n = structuredClone(a);
		return t(e.length === 1 ? n : n[e[0]].items, e[e.length - 1]), n;
	}, m = (e, t) => l(p(e, (e, n) => {
		let r = n + t;
		r < 0 || r >= e.length || ([e[n], e[r]] = [e[r], e[n]]);
	})), h = (e) => l(p(e, (e, t) => e.splice(t, 1))), g = (e, t, n) => {
		let { label: r, description: i } = d(e), a = t[t.length - 1], o = (e, t, n, i) => s("button", {
			class: "mm-btn",
			type: "button",
			title: t,
			"aria-label": `${t}: ${r}`,
			disabled: i,
			onclick: n
		}, c(e));
		return {
			label: t.length === 2 ? `↳ ${r}` : r,
			description: i,
			keywords: "menu contestuale voce separatore nuovo",
			control: s("div", { class: "mm-ctl" }, o("arrowUp", "Sposta su", () => m(t, -1), a === 0), o("arrowDown", "Sposta giù", () => m(t, 1), a === n - 1), o("x", "Togli", () => h(t)))
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
	}))], x = (e, t) => l(p(e === "root" ? [0] : [Number(e), 0], (e) => e.push(t))), S = u.actions(e).filter((e) => e.id !== "desktop.create" && e.id !== "app.launch"), C = f({
		value: S[0]?.id,
		label: "Voce da aggiungere",
		options: [...S.map((e) => ({
			value: e.id,
			label: e.label
		})), ...O.filter((e) => e.load).map((e) => ({
			value: `app:${e.id}`,
			label: `Apri ${e.name}`
		}))]
	}), w = f({
		value: "root",
		options: y,
		label: "Dove"
	}), T = f({
		value: "root",
		options: y,
		label: "Dove"
	}), E = v[0], D = b({
		placeholder: "Etichetta (es. Foglio di stile)",
		label: "Etichetta"
	}), k = b({
		placeholder: "Nome (es. stile.css)",
		label: "Nome del file o della cartella"
	}), A = f({
		value: "file",
		options: [{
			value: "file",
			label: "File"
		}, {
			value: "folder",
			label: "Cartella"
		}],
		label: "Tipo"
	}), j = null, M = r({
		label: "Modello…",
		onClick: async () => {
			let e = await F(t, {
				title: "Scegli il file modello",
				text: "Il nuovo file partirà con il contenuto di questo file."
			});
			e && (j = e.id, M.textContent = `Modello: ${e.name}`);
		}
	}), N = s("small", { class: "mm-note" });
	return [{
		title: u.list().find((t) => t.id === e)?.label ?? e,
		rows: _
	}, {
		title: "Aggiungi",
		rows: [
			{
				label: "Voce",
				description: "Un’azione o l’apertura di un’app",
				control: s("div", { class: "mm-add" }, C, w, r({
					label: "Aggiungi",
					onClick: () => {
						let e = C.value, t = e.startsWith("app:") ? {
							type: "action",
							action: "app.launch",
							label: `Apri ${O.find((t) => t.id === e.slice(4))?.name}`,
							params: { app: e.slice(4) }
						} : {
							type: "action",
							action: e
						};
						x(w.value, t);
					}
				}))
			},
			{
				label: "Separatore",
				description: "Una linea per raggruppare le voci",
				control: s("div", { class: "mm-add" }, T, r({
					label: "Aggiungi",
					onClick: () => x(T.value, { type: "separator" })
				}))
			},
			...E ? [{
				label: `Nuovo elemento in «${E[0].label}»`,
				description: "Crea un file o una cartella con questo nome; un file può partire dal contenuto di un modello",
				control: s("div", { class: "mm-add" }, D, k, A, M, r({
					label: "Aggiungi",
					primary: !0,
					onClick: () => {
						let e = D.value.trim(), t = k.value.trim();
						if (!e || !t) {
							N.textContent = "Servono l’etichetta e il nome";
							return;
						}
						let n = {
							kind: A.value,
							name: t,
							...j && A.value === "file" && { template: j }
						};
						x(String(E[1]), {
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
				description: u.isCustom(e) ? "Il menu è stato personalizzato" : "Il menu è quello predefinito",
				control: i("Ripristina", "Conferma", () => {
					u.reset(e), n();
				})
			}
		]
	}];
}
// src/settings/SettingsApp.js
var V = null, H = (e, t, n) => e === 1 ? `1 ${t}` : `${e} ${n}`;
function ne() {
	let e = z(), t = e?.current;
	return t ? [{
		title: "Workspace",
		rows: [
			{
				label: "Nome",
				keywords: "rinomina workspace",
				control: () => {
					let n = b({
						value: t.name,
						label: "Nome del workspace",
						onChange: (n) => e.rename(t.id, n)
					});
					return n.maxLength = E.MAX_NAME, n;
				}
			},
			{
				label: "Colore",
				description: "Il pallino nella barra in basso e accanto ai suoi file nell’app File",
				keywords: "colore workspace",
				control: () => v({
					value: t.color,
					colors: C,
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
		rows: O.map((t) => ({
			label: t.name,
			description: t.system ? "App di sistema: c’è in ogni workspace" : "Installata in lilOS: qui la puoi nascondere",
			keywords: `app nascondi mostra ${t.name}`,
			control: t.system ? "Sempre visibile" : () => S({
				value: e.isInstalled(t.id),
				label: `${t.name} visibile in questo workspace`,
				onChange: (n) => e.setInstalled(t.id, n)
			})
		}))
	}] : [];
}
function U() {
	let e = z();
	if (!e) return [];
	let t = e.list();
	return [{
		title: "Workspace",
		rows: [...t.map((n) => {
			let i = n.id === e.currentId, a = O.filter((t) => e.isInstalled(t.id, n.id)).length;
			return {
				label: i ? `${n.name} (attuale)` : n.name,
				description: `${H(e.ownedCount(n.id), "elemento creato", "elementi creati")} · ${H(a, "app", "app")}`,
				keywords: "workspace passa elimina",
				control: () => s("div", { class: "ws-settings-actions" }, i ? null : r({
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
var W = [];
function G() {
	let e = (e) => {
		try {
			let t = y.create({ name: e.value });
			W.length && te(W, t.id, !0), W = [];
		} catch (t) {
			x(t.message), e.focus();
		}
	}, t = W.filter((e) => o.exists(e)).length;
	return [{
		title: "Nuovo tag",
		rows: [{
			label: "Nome",
			description: t ? `Il nuovo tag andrà su ${H(t, "elemento selezionato", "elementi selezionati")}` : "Poi si assegna dal menu del tasto destro → Tag, sulla scrivania e nell’app File",
			keywords: "nuovo tag crea etichetta",
			control: () => {
				let t = b({
					placeholder: "Per esempio: Urgente",
					label: "Nome del nuovo tag"
				});
				return t.maxLength = 30, t.classList.add("tag-new-name"), t.addEventListener("keydown", (n) => {
					n.key === "Enter" && (n.preventDefault(), e(t));
				}), s("div", { class: "tag-settings-actions" }, t, r({
					label: "Crea",
					primary: !0,
					onClick: () => e(t)
				}));
			}
		}]
	}, ...y.list().map((e) => ({
		title: e.name,
		rows: [
			{
				label: "Nome",
				keywords: "rinomina tag",
				control: () => {
					let t = b({
						value: e.name,
						label: `Nome del tag ${e.name}`,
						onChange: (n) => {
							try {
								y.rename(e.id, n);
							} catch (n) {
								x(n.message), t.value = y.get(e.id)?.name ?? "";
							}
						}
					});
					return t.maxLength = 30, t;
				}
			},
			{
				label: "Colore",
				keywords: "colore tag",
				control: () => v({
					value: e.color,
					colors: n,
					onChange: (t) => y.setColor(e.id, t)
				})
			},
			{
				label: "Visibile",
				description: e.visible ? "Gli elementi con questo tag si vedono ovunque" : "Gli elementi con questo tag sono nascosti ovunque: si ritrovano in File → Tag",
				keywords: "nascondi mostra invisibile tag",
				control: () => S({
					value: e.visible,
					label: `Tag ${e.name} visibile`,
					onChange: (t) => y.setVisible(e.id, t)
				})
			},
			{
				label: "Elementi",
				description: `${H(o.tagged(e.id).length, "elemento", "elementi")} in questo workspace e nelle cartelle condivise`,
				control: () => s("div", { class: "tag-settings-actions" }, r({
					label: "Mostra in File",
					onClick: () => P("files", { tag: e.id })
				}), Q("Elimina…", "Elimina il tag", () => y.remove(e.id)))
			}
		]
	}))];
}
var K = (e) => () => S({
	value: m.get(e),
	onChange: (t) => m.set(e, t)
}), q = [
	"Generale",
	"Scrivania",
	"Elementi",
	"Finestre"
];
function J() {
	let e = new Set(N()), t = /* @__PURE__ */ new Set(), n = (e) => {
		t.add(e);
		let n = A(e);
		return {
			label: e ? `.${e}` : "Senza estensione",
			description: n ? `Predefinita: ${n.name}` : "Nessuna app predefinita",
			keywords: `tipo file estensione apri con ${e}`,
			control: () => f({
				value: D(e)?.id ?? "ask",
				label: `App per ${e ? "." + e : "i file senza estensione"}`,
				options: [{
					value: "ask",
					label: "Chiedi ogni volta"
				}, ...M().map((e) => ({
					value: e.id,
					label: e.name
				}))],
				onChange: (t) => ee(e, t)
			})
		};
	}, r = a().map((t) => ({
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
					I(), V?.render();
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
function Y() {
	let e = o.trashed(), t = e.reduce((e, t) => e + t.bytes, 0);
	return [{
		title: "Eliminazione",
		rows: [{
			label: "Chiedi conferma",
			description: "Prima di eliminare file e cartelle, un piccolo menu chiede di confermare",
			keywords: "conferma elimina cancella domanda",
			control: K("deleteConfirm")
		}, {
			label: "Elimina definitivamente",
			description: "Gli elementi eliminati non passano dal cestino: si recuperano solo con Ctrl Z, finché la pagina resta aperta",
			keywords: "cestino definitivo subito cancella salta",
			control: K("deletePermanent")
		}]
	}, {
		title: "Cestino",
		rows: [
			{
				label: "Conserva gli elementi per",
				description: "Passato questo tempo, quello che è nel cestino viene eliminato definitivamente",
				keywords: "retention durata giorni pulizia automatica svuota",
				control: () => {
					let e = m.get("trashRetention"), t = T.some((t) => t.value === e) ? T : [...T, {
						value: e,
						label: e > 0 ? `${e} giorni` : "Per sempre"
					}];
					return f({
						value: e,
						label: "Conserva gli elementi nel cestino per",
						options: t,
						onChange: (e) => m.set("trashRetention", Number(e))
					});
				}
			},
			{
				label: "Contenuto",
				description: e.length ? `${H(e.length, "elemento", "elementi")} · ${$(t)}` : "Il cestino è vuoto",
				keywords: "apri cestino ripristina",
				control: r({
					label: "Apri il cestino",
					onClick: () => P("files", { trash: !0 })
				})
			},
			{
				label: "Svuota il cestino",
				description: "Elimina definitivamente tutto quello che contiene",
				keywords: "svuota cestino",
				control: e.length ? Q("Svuota…", "Svuota", () => o.purgeTrash()) : "Vuoto"
			}
		]
	}];
}
function X(e = o.root) {
	return o.children(e).reduce((e, t) => e + (t.type === "folder" ? X(t.id) : t.size ?? 0), 0);
}
function re() {
	let e = /* @__PURE__ */ new Map();
	for (let t of g.list()) e.has(t.group) || e.set(t.group, []), e.get(t.group).push(t);
	let t = (e) => q.includes(e) ? q.indexOf(e) : q.length;
	return [
		{
			title: "Scorciatoie da tastiera",
			rows: [{
				label: "Tutte le scorciatoie",
				description: "Le modifiche valgono subito. Per registrare una combinazione premi +, poi i tasti; Esc annulla.",
				control: Q("Ripristina tutte", "Conferma", () => g.resetAll())
			}]
		},
		...[...e].sort(([e], [n]) => t(e) - t(n)).map(([e, t]) => ({
			title: e,
			rows: t.map((e) => ({
				label: e.label,
				keywords: `scorciatoia tasti ${e.keys.map((e) => g.format(e)).join(" ")}`,
				control: h(e.id)
			}))
		})),
		{
			title: "Mouse",
			rows: [
				{
					label: "Selezione a mano libera",
					description: "Disegna un percorso chiuso: si selezionano gli elementi che contiene",
					keywords: "lazo lasso percorso selezione alt",
					control: () => f({
						value: m.get("lasso"),
						options: w,
						onChange: (e) => m.set("lasso", e)
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
var ie = {
	isolated: "Isolata",
	open: "Non isolata",
	system: "Dentro lilOS",
	remote: "Isolata, nel suo sito"
};
function Z() {
	let e = k(), { isolated: t } = i.security(), n = O.filter((e) => e.package && !e.package.system);
	return [{
		title: "Esecuzione delle app",
		rows: [{
			label: "Esegui le app isolate",
			description: e ? "Ogni app gira in una sandbox e vede solo quello che i suoi permessi le concedono. Se lo togli, le app girano nella pagina di lilOS e in un Web Worker: più veloci, ma possono fare tutto quello che puoi fare tu. Vale dalla prossima apertura di ogni app." : "Solo un amministratore la cambia.",
			keywords: "sicurezza isolamento sandbox iframe worker",
			control: e ? S({
				value: t,
				label: "Esegui le app isolate",
				onChange: async (e) => {
					try {
						await i.setSecurity({ isolated: e });
					} catch (e) {
						x(`Non cambiata: ${e.message}`);
					}
					V?.render();
				}
			}) : t ? "Sì" : "No"
		}, {
			label: "App di sistema",
			description: "File Manager, Editor, Impostazioni e AppStore fanno parte di lilOS e girano sempre dentro lilOS."
		}]
	}, {
		title: "App installate",
		rows: n.length ? n.map((e) => {
			let t = j(e.package), n = t.fixed ? t.reason : t.own === null ? "Come le altre app" : "Scelta per questa app";
			return {
				label: e.name,
				description: `${ie[t.mode]} · ${n}`,
				keywords: "sicurezza isolamento",
				control: r({
					label: "Proprietà…",
					onClick: () => L(e.id)
				})
			};
		}) : [{ label: "Nessuna app installata oltre a quelle di sistema" }]
	}];
}
function Q(e, t, n) {
	let i = 0, a = r({
		label: e,
		onClick: () => {
			a.classList.contains("primary") ? (clearTimeout(i), o(), n()) : (a.textContent = t, a.classList.add("danger", "primary"), i = setTimeout(o, 4e3));
		}
	}), o = () => {
		a.textContent = e, a.classList.remove("danger", "primary");
	};
	return a;
}
function ae() {
	return _.bytes();
}
function $(e) {
	return e == null ? "Non disponibile" : e < 1024 ? `${e} B` : `${(e / 1024).toLocaleString(p.locale, { maximumFractionDigits: 1 })} KB`;
}
var oe = [
	[/Edg\/(\d+)/, "Edge"],
	[/Firefox\/(\d+)/, "Firefox"],
	[/Chrome\/(\d+)/, "Chrome"],
	[/Version\/(\d+).*Safari/, "Safari"]
];
function se() {
	for (let [e, t] of oe) {
		let n = navigator.userAgent.match(e);
		if (n) return `${t} ${n[1]}`;
	}
	return "Sconosciuto";
}
function ce({ openWindow: n, args: r } = {}) {
	let a = new t({
		title: "Impostazioni",
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
							control: d({
								value: m.get("theme"),
								label: "Tema",
								options: [{
									value: "light",
									label: "Chiaro"
								}, {
									value: "dark",
									label: "Scuro"
								}],
								onChange: (e) => m.set("theme", e)
							})
						}]
					}, {
						title: "Colore principale",
						rows: [{
							label: "Colore",
							description: "Selezione, pulsanti, tab attivi e logo",
							keywords: "accento tema",
							control: v({
								value: m.get("accent"),
								colors: C,
								onChange: (e) => m.set("accent", e)
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
							control: K("motion")
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
					sections: () => [{
						title: "Posizionamento",
						rows: [{
							label: "Allinea alla griglia",
							description: "Gli elementi trascinati si allineano a una griglia invisibile",
							keywords: "icone snap",
							control: K("snap")
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
							control: K("minimap")
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
					sections: ne
				}, {
					id: "all",
					label: "Tutti",
					sections: U
				}]
			},
			{
				id: "tags",
				label: "Tag",
				icon: "tag",
				description: "Etichette colorate per ritrovare file e cartelle ovunque siano. Un tag invisibile nasconde i suoi elementi.",
				sections: G
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
						sections: re
					},
					{
						id: "filetypes",
						label: "Tipi di file",
						sections: J
					},
					{
						id: "contextmenu",
						label: "Menu contestuale",
						sections: () => B("desktop.background", {
							openWindow: n,
							confirmButton: Q,
							rerender: () => V?.render()
						})
					},
					{
						id: "trash",
						label: "Cestino",
						sections: Y
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
			{ group: "Dati" },
			{
				id: "storage",
				label: "Archiviazione",
				icon: "disk",
				description: l.connected ? "Dati di lilOS salvati nella tua cartella utente." : "Dati di lilOS salvati in questo browser.",
				sections: () => [{
					title: "Spazio",
					rows: [{
						label: "Spazio usato",
						description: "Posizioni, vista e impostazioni",
						control: $(ae())
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
								"trashRetention"
							].forEach((e) => m.reset(e)), g.resetAll(), I(), u.list().forEach((e) => u.reset(e.id));
						})
					}, {
						label: "Scrivania e file iniziali",
						description: "Elimina tutte le cartelle e i file creati, i workspace, i tag, le posizioni e la vista salvate, poi ricarica lilOS",
						keywords: "reset desktop workspace tag",
						control: Q("Ripristina…", "Elimina e ricarica", async () => {
							await o.reset(), [
								"workspaces",
								"tags",
								"desktop-layout",
								"desktop",
								"camera",
								"workareas",
								"editor-tree",
								"files-sidebar",
								"app-setup"
							].forEach((e) => _.remove(e)), await l.flush().catch(() => {}), location.reload();
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
							control: R
						},
						{
							label: "Versione dell’SDK",
							control: e
						},
						{
							label: "Lingua",
							control: p.locale
						},
						{
							label: "Browser",
							control: se()
						}
					]
				}]
			}
		]
	});
	V = a.view;
	let s = (e) => {
		Array.isArray(e?.tagFor) && (W = e.tagFor.filter((e) => typeof e == "string" && o.exists(e))), typeof e?.tab == "string" && a.view.select(e.tab), e?.tab === "tags" && a.view.panel.querySelector(".tag-new-name")?.focus();
	};
	s(r), a.on("launch", s);
	let c = z()?.on("change", () => a.view.render()), f = o.on("trash", () => a.view.render()), h = y.on("change", () => a.view.render()), b = [i.on("change", () => a.view.render()), i.on("security", () => a.view.render())];
	return a.on("destroy", () => {
		c?.(), f(), h(), b.forEach((e) => e()), V === a.view && (V = null);
	}), a;
}
export { ce as default };
