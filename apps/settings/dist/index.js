import { SDK_VERSION as e, SettingsWindow as t, TAG_COLORS as n, actionButton as r, fileTypeList as i, fs as a, h as o, icon as s, kernel as c, menus as l, segmented as u, selectField as d, session as f, settings as p, shortcutField as m, shortcuts as h, storage as g, swatches as _, tags as v, textField as y, toast as b, toggle as x } from "/host/sdk.js";
import { ACCENTS as S, LASSO_OPTIONS as C, RETENTION_OPTIONS as w, WORKSPACE_LIMITS as T, appFor as E, apps as D, defaultAppFor as O, fileApps as k, knownExtensions as A, launch as j, pickFile as M, resetAppsFor as N, setAppFor as P, setTag as F, version as I, workspaceManager as L } from "/host/system.js";
// src/settings/menuEditor.js
function R(e, { openWindow: t, rerender: n, confirmButton: i }) {
	let c = l.layout(e), u = (t) => {
		l.setLayout(e, t), n();
	}, f = (e) => {
		if (e.type === "separator") return {
			label: "— Separatore —",
			description: ""
		};
		if (e.type === "submenu") return {
			label: e.label,
			description: `Sottomenu · ${e.items.length} ${e.items.length === 1 ? "voce" : "voci"}`
		};
		let t = l.action(e.action), n = e.label ?? t?.label ?? e.action;
		if (e.action === "desktop.create") {
			let t = e.params.kind === "folder" ? "Crea la cartella" : "Crea il file", r = e.params.template ? ` dal modello ${a.exists(e.params.template) ? a.path(e.params.template) : "(file eliminato)"}` : e.params.content ? " con un contenuto iniziale" : "";
			return {
				label: n,
				description: `${t} «${e.params.name}»${r}`
			};
		}
		return e.action === "app.launch" ? {
			label: n,
			description: `Apre l’app ${D.find((t) => t.id === e.params.app)?.name ?? e.params.app}`
		} : {
			label: n,
			description: "Azione"
		};
	}, p = (e, t) => {
		let n = structuredClone(c);
		return t(e.length === 1 ? n : n[e[0]].items, e[e.length - 1]), n;
	}, m = (e, t) => u(p(e, (e, n) => {
		let r = n + t;
		r < 0 || r >= e.length || ([e[n], e[r]] = [e[r], e[n]]);
	})), h = (e) => u(p(e, (e, t) => e.splice(t, 1))), g = (e, t, n) => {
		let { label: r, description: i } = f(e), a = t[t.length - 1], c = (e, t, n, i) => o("button", {
			class: "mm-btn",
			type: "button",
			title: t,
			"aria-label": `${t}: ${r}`,
			disabled: i,
			onclick: n
		}, s(e));
		return {
			label: t.length === 2 ? `↳ ${r}` : r,
			description: i,
			keywords: "menu contestuale voce separatore nuovo",
			control: o("div", { class: "mm-ctl" }, c("arrowUp", "Sposta su", () => m(t, -1), a === 0), c("arrowDown", "Sposta giù", () => m(t, 1), a === n - 1), c("x", "Togli", () => h(t)))
		};
	}, _ = [];
	c.forEach((e, t) => {
		_.push(g(e, [t], c.length)), e.type === "submenu" && e.items.forEach((n, r) => _.push(g(n, [t, r], e.items.length)));
	});
	let v = c.map((e, t) => [e, t]).filter(([e]) => e.type === "submenu"), b = [{
		value: "root",
		label: "Menu principale"
	}, ...v.map(([e, t]) => ({
		value: String(t),
		label: `Dentro «${e.label}»`
	}))], x = (e, t) => u(p(e === "root" ? [0] : [Number(e), 0], (e) => e.push(t))), S = l.actions(e).filter((e) => e.id !== "desktop.create" && e.id !== "app.launch"), C = d({
		value: S[0]?.id,
		label: "Voce da aggiungere",
		options: [...S.map((e) => ({
			value: e.id,
			label: e.label
		})), ...D.filter((e) => e.load).map((e) => ({
			value: `app:${e.id}`,
			label: `Apri ${e.name}`
		}))]
	}), w = d({
		value: "root",
		options: b,
		label: "Dove"
	}), T = d({
		value: "root",
		options: b,
		label: "Dove"
	}), E = v[0], O = y({
		placeholder: "Etichetta (es. Foglio di stile)",
		label: "Etichetta"
	}), k = y({
		placeholder: "Nome (es. stile.css)",
		label: "Nome del file o della cartella"
	}), A = d({
		value: "file",
		options: [{
			value: "file",
			label: "File"
		}, {
			value: "folder",
			label: "Cartella"
		}],
		label: "Tipo"
	}), j = null, N = r({
		label: "Modello…",
		onClick: async () => {
			let e = await M(t, {
				title: "Scegli il file modello",
				text: "Il nuovo file partirà con il contenuto di questo file."
			});
			e && (j = e.id, N.textContent = `Modello: ${e.name}`);
		}
	}), P = o("small", { class: "mm-note" });
	return [{
		title: l.list().find((t) => t.id === e)?.label ?? e,
		rows: _
	}, {
		title: "Aggiungi",
		rows: [
			{
				label: "Voce",
				description: "Un’azione o l’apertura di un’app",
				control: o("div", { class: "mm-add" }, C, w, r({
					label: "Aggiungi",
					onClick: () => {
						let e = C.value, t = e.startsWith("app:") ? {
							type: "action",
							action: "app.launch",
							label: `Apri ${D.find((t) => t.id === e.slice(4))?.name}`,
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
				control: o("div", { class: "mm-add" }, T, r({
					label: "Aggiungi",
					onClick: () => x(T.value, { type: "separator" })
				}))
			},
			...E ? [{
				label: `Nuovo elemento in «${E[0].label}»`,
				description: "Crea un file o una cartella con questo nome; un file può partire dal contenuto di un modello",
				control: o("div", { class: "mm-add" }, O, k, A, N, r({
					label: "Aggiungi",
					primary: !0,
					onClick: () => {
						let e = O.value.trim(), t = k.value.trim();
						if (!e || !t) {
							P.textContent = "Servono l’etichetta e il nome";
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
				}), P)
			}] : [],
			{
				label: "Voci predefinite",
				description: l.isCustom(e) ? "Il menu è stato personalizzato" : "Il menu è quello predefinito",
				control: i("Ripristina", "Conferma", () => {
					l.reset(e), n();
				})
			}
		]
	}];
}
// src/settings/SettingsApp.js
var z = null, B = (e, t, n) => e === 1 ? `1 ${t}` : `${e} ${n}`;
function V() {
	let e = L(), t = e?.current;
	return t ? [{
		title: "Workspace",
		rows: [
			{
				label: "Nome",
				keywords: "rinomina workspace",
				control: () => {
					let n = y({
						value: t.name,
						label: "Nome del workspace",
						onChange: (n) => e.rename(t.id, n)
					});
					return n.maxLength = T.MAX_NAME, n;
				}
			},
			{
				label: "Colore",
				description: "Il pallino nella barra in basso e accanto ai suoi file nell’app File",
				keywords: "colore workspace",
				control: () => _({
					value: t.color,
					colors: S,
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
		rows: D.map((t) => ({
			label: t.name,
			description: t.system ? "App di sistema: c’è in ogni workspace" : "Installata in lilOS: qui la puoi nascondere",
			keywords: `app nascondi mostra ${t.name}`,
			control: t.system ? "Sempre visibile" : () => x({
				value: e.isInstalled(t.id),
				label: `${t.name} visibile in questo workspace`,
				onChange: (n) => e.setInstalled(t.id, n)
			})
		}))
	}] : [];
}
function H() {
	let e = L();
	if (!e) return [];
	let t = e.list();
	return [{
		title: "Workspace",
		rows: [...t.map((n) => {
			let i = n.id === e.currentId, a = D.filter((t) => e.isInstalled(t.id, n.id)).length;
			return {
				label: i ? `${n.name} (attuale)` : n.name,
				description: `${B(e.ownedCount(n.id), "elemento creato", "elementi creati")} · ${B(a, "app", "app")}`,
				keywords: "workspace passa elimina",
				control: () => o("div", { class: "ws-settings-actions" }, i ? null : r({
					label: "Passa a questo",
					onClick: () => e.switchTo(n.id)
				}), t.length > 1 ? Z("Elimina…", "Elimina", () => e.remove(n.id)) : null)
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
var U = [];
function W() {
	let e = (e) => {
		try {
			let t = v.create({ name: e.value });
			U.length && F(U, t.id, !0), U = [];
		} catch (t) {
			b(t.message), e.focus();
		}
	}, t = U.filter((e) => a.exists(e)).length;
	return [{
		title: "Nuovo tag",
		rows: [{
			label: "Nome",
			description: t ? `Il nuovo tag andrà su ${B(t, "elemento selezionato", "elementi selezionati")}` : "Poi si assegna dal menu del tasto destro → Tag, sulla scrivania e nell’app File",
			keywords: "nuovo tag crea etichetta",
			control: () => {
				let t = y({
					placeholder: "Per esempio: Urgente",
					label: "Nome del nuovo tag"
				});
				return t.maxLength = 30, t.classList.add("tag-new-name"), t.addEventListener("keydown", (n) => {
					n.key === "Enter" && (n.preventDefault(), e(t));
				}), o("div", { class: "tag-settings-actions" }, t, r({
					label: "Crea",
					primary: !0,
					onClick: () => e(t)
				}));
			}
		}]
	}, ...v.list().map((e) => ({
		title: e.name,
		rows: [
			{
				label: "Nome",
				keywords: "rinomina tag",
				control: () => {
					let t = y({
						value: e.name,
						label: `Nome del tag ${e.name}`,
						onChange: (n) => {
							try {
								v.rename(e.id, n);
							} catch (n) {
								b(n.message), t.value = v.get(e.id)?.name ?? "";
							}
						}
					});
					return t.maxLength = 30, t;
				}
			},
			{
				label: "Colore",
				keywords: "colore tag",
				control: () => _({
					value: e.color,
					colors: n,
					onChange: (t) => v.setColor(e.id, t)
				})
			},
			{
				label: "Visibile",
				description: e.visible ? "Gli elementi con questo tag si vedono ovunque" : "Gli elementi con questo tag sono nascosti ovunque: si ritrovano in File → Tag",
				keywords: "nascondi mostra invisibile tag",
				control: () => x({
					value: e.visible,
					label: `Tag ${e.name} visibile`,
					onChange: (t) => v.setVisible(e.id, t)
				})
			},
			{
				label: "Elementi",
				description: `${B(a.tagged(e.id).length, "elemento", "elementi")} in questo workspace e nelle cartelle condivise`,
				control: () => o("div", { class: "tag-settings-actions" }, r({
					label: "Mostra in File",
					onClick: () => j("files", { tag: e.id })
				}), Z("Elimina…", "Elimina il tag", () => v.remove(e.id)))
			}
		]
	}))];
}
var G = (e) => () => x({
	value: p.get(e),
	onChange: (t) => p.set(e, t)
}), K = [
	"Generale",
	"Scrivania",
	"Elementi",
	"Finestre"
];
function q() {
	let e = new Set(A()), t = /* @__PURE__ */ new Set(), n = (e) => {
		t.add(e);
		let n = O(e);
		return {
			label: e ? `.${e}` : "Senza estensione",
			description: n ? `Predefinita: ${n.name}` : "Nessuna app predefinita",
			keywords: `tipo file estensione apri con ${e}`,
			control: () => d({
				value: E(e)?.id ?? "ask",
				label: `App per ${e ? "." + e : "i file senza estensione"}`,
				options: [{
					value: "ask",
					label: "Chiedi ogni volta"
				}, ...k().map((e) => ({
					value: e.id,
					label: e.name
				}))],
				onChange: (t) => P(e, t)
			})
		};
	}, r = i().map((t) => ({
		title: t.label,
		rows: t.exts.filter((t) => e.has(t)).map(n)
	})).filter((e) => e.rows.length), a = [...e].filter((e) => !t.has(e)).sort((e, t) => e === "" ? -1 : t === "" ? 1 : e.localeCompare(t));
	return [
		{
			title: "App per tipo di file",
			rows: [{
				label: "Tutti i tipi di file",
				description: "Aprendo un file, lilOS usa l’app scelta qui. Con «Chiedi ogni volta» compare la finestra Apri con.",
				control: Z("Ripristina tutti", "Conferma", () => {
					N(), z?.render();
				})
			}]
		},
		...r,
		...a.length ? [{
			title: "Altri",
			rows: a.map(n)
		}] : []
	];
}
function J() {
	let e = a.trashed(), t = e.reduce((e, t) => e + t.bytes, 0);
	return [{
		title: "Eliminazione",
		rows: [{
			label: "Chiedi conferma",
			description: "Prima di eliminare file e cartelle, un piccolo menu chiede di confermare",
			keywords: "conferma elimina cancella domanda",
			control: G("deleteConfirm")
		}, {
			label: "Elimina definitivamente",
			description: "Gli elementi eliminati non passano dal cestino: si recuperano solo con Ctrl Z, finché la pagina resta aperta",
			keywords: "cestino definitivo subito cancella salta",
			control: G("deletePermanent")
		}]
	}, {
		title: "Cestino",
		rows: [
			{
				label: "Conserva gli elementi per",
				description: "Passato questo tempo, quello che è nel cestino viene eliminato definitivamente",
				keywords: "retention durata giorni pulizia automatica svuota",
				control: () => {
					let e = p.get("trashRetention"), t = w.some((t) => t.value === e) ? w : [...w, {
						value: e,
						label: e > 0 ? `${e} giorni` : "Per sempre"
					}];
					return d({
						value: e,
						label: "Conserva gli elementi nel cestino per",
						options: t,
						onChange: (e) => p.set("trashRetention", Number(e))
					});
				}
			},
			{
				label: "Contenuto",
				description: e.length ? `${B(e.length, "elemento", "elementi")} · ${$(t)}` : "Il cestino è vuoto",
				keywords: "apri cestino ripristina",
				control: r({
					label: "Apri il cestino",
					onClick: () => j("files", { trash: !0 })
				})
			},
			{
				label: "Svuota il cestino",
				description: "Elimina definitivamente tutto quello che contiene",
				keywords: "svuota cestino",
				control: e.length ? Z("Svuota…", "Svuota", () => a.purgeTrash()) : "Vuoto"
			}
		]
	}];
}
function Y(e = a.root) {
	return a.children(e).reduce((e, t) => e + (t.type === "folder" ? Y(t.id) : t.size ?? 0), 0);
}
function X() {
	let e = /* @__PURE__ */ new Map();
	for (let t of h.list()) e.has(t.group) || e.set(t.group, []), e.get(t.group).push(t);
	let t = (e) => K.includes(e) ? K.indexOf(e) : K.length;
	return [
		{
			title: "Scorciatoie da tastiera",
			rows: [{
				label: "Tutte le scorciatoie",
				description: "Le modifiche valgono subito. Per registrare una combinazione premi +, poi i tasti; Esc annulla.",
				control: Z("Ripristina tutte", "Conferma", () => h.resetAll())
			}]
		},
		...[...e].sort(([e], [n]) => t(e) - t(n)).map(([e, t]) => ({
			title: e,
			rows: t.map((e) => ({
				label: e.label,
				keywords: `scorciatoia tasti ${e.keys.map((e) => h.format(e)).join(" ")}`,
				control: m(e.id)
			}))
		})),
		{
			title: "Mouse",
			rows: [
				{
					label: "Selezione a mano libera",
					description: "Disegna un percorso chiuso: si selezionano gli elementi che contiene",
					keywords: "lazo lasso percorso selezione alt",
					control: () => d({
						value: p.get("lasso"),
						options: C,
						onChange: (e) => p.set("lasso", e)
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
function Z(e, t, n) {
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
function Q() {
	return g.bytes();
}
function $(e) {
	return e == null ? "Non disponibile" : e < 1024 ? `${e} B` : `${(e / 1024).toLocaleString(f.locale, { maximumFractionDigits: 1 })} KB`;
}
var ee = [
	[/Edg\/(\d+)/, "Edge"],
	[/Firefox\/(\d+)/, "Firefox"],
	[/Chrome\/(\d+)/, "Chrome"],
	[/Version\/(\d+).*Safari/, "Safari"]
];
function te() {
	for (let [e, t] of ee) {
		let n = navigator.userAgent.match(e);
		if (n) return `${t} ${n[1]}`;
	}
	return "Sconosciuto";
}
function ne({ openWindow: n, args: r } = {}) {
	let i = new t({
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
							control: u({
								value: p.get("theme"),
								label: "Tema",
								options: [{
									value: "light",
									label: "Chiaro"
								}, {
									value: "dark",
									label: "Scuro"
								}],
								onChange: (e) => p.set("theme", e)
							})
						}]
					}, {
						title: "Colore principale",
						rows: [{
							label: "Colore",
							description: "Selezione, pulsanti, tab attivi e logo",
							keywords: "accento tema",
							control: _({
								value: p.get("accent"),
								colors: S,
								onChange: (e) => p.set("accent", e)
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
							control: G("motion")
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
							control: G("snap")
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
							control: G("minimap")
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
					sections: V
				}, {
					id: "all",
					label: "Tutti",
					sections: H
				}]
			},
			{
				id: "tags",
				label: "Tag",
				icon: "tag",
				description: "Etichette colorate per ritrovare file e cartelle ovunque siano. Un tag invisibile nasconde i suoi elementi.",
				sections: W
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
						sections: X
					},
					{
						id: "filetypes",
						label: "Tipi di file",
						sections: q
					},
					{
						id: "contextmenu",
						label: "Menu contestuale",
						sections: () => R("desktop.background", {
							openWindow: n,
							confirmButton: Z,
							rerender: () => z?.render()
						})
					},
					{
						id: "trash",
						label: "Cestino",
						sections: J
					}
				]
			},
			{ group: "Dati" },
			{
				id: "storage",
				label: "Archiviazione",
				icon: "disk",
				description: c.connected ? "Dati di lilOS salvati nella tua cartella utente." : "Dati di lilOS salvati in questo browser.",
				sections: () => [{
					title: "Spazio",
					rows: [{
						label: "Spazio usato",
						description: "Posizioni, vista e impostazioni",
						control: $(Q())
					}, {
						label: "Contenuto dei file",
						description: "Testo salvato nei file",
						control: $(Y())
					}]
				}, {
					title: "Ripristino",
					rows: [{
						label: "Impostazioni predefinite",
						description: "Riporta impostazioni, scorciatoie, app dei tipi di file e menu ai valori iniziali",
						control: Z("Ripristina", "Conferma", () => {
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
							].forEach((e) => p.reset(e)), h.resetAll(), N(), l.list().forEach((e) => l.reset(e.id));
						})
					}, {
						label: "Scrivania e file iniziali",
						description: "Elimina tutte le cartelle e i file creati, i workspace, i tag, le posizioni e la vista salvate, poi ricarica lilOS",
						keywords: "reset desktop workspace tag",
						control: Z("Ripristina…", "Elimina e ricarica", async () => {
							await a.reset(), [
								"workspaces",
								"tags",
								"desktop-layout",
								"desktop",
								"camera",
								"workareas",
								"editor-tree",
								"files-sidebar",
								"app-setup"
							].forEach((e) => g.remove(e)), await c.flush().catch(() => {}), location.reload();
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
							control: I
						},
						{
							label: "Versione dell’SDK",
							control: e
						},
						{
							label: "Lingua",
							control: f.locale
						},
						{
							label: "Browser",
							control: te()
						}
					]
				}]
			}
		]
	});
	z = i.view;
	let o = (e) => {
		Array.isArray(e?.tagFor) && (U = e.tagFor.filter((e) => typeof e == "string" && a.exists(e))), typeof e?.tab == "string" && i.view.select(e.tab), e?.tab === "tags" && i.view.panel.querySelector(".tag-new-name")?.focus();
	};
	o(r), i.on("launch", o);
	let s = L()?.on("change", () => i.view.render()), d = a.on("trash", () => i.view.render()), m = v.on("change", () => i.view.render());
	return i.on("destroy", () => {
		s?.(), d(), m(), z === i.view && (z = null);
	}), i;
}
export { ne as default };
