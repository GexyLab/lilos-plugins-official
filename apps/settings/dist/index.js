import { SDK_VERSION as e, SettingsWindow as t, TAG_COLORS as n, Window as r, actionButton as i, appIcon as a, apps as o, fileTypeList as s, fs as c, h as l, icon as u, kernel as d, menus as f, openMenu as p, segmented as m, selectField as h, session as g, settings as _, shortcutField as v, shortcuts as y, storage as b, swatches as x, tags as S, textField as C, toast as w, toggle as T } from "/host/sdk.js";
import * as E from "/host/system.js";
import { ACCENTS as D, LASSO_OPTIONS as O, RETENTION_OPTIONS as k, WORKSPACE_LIMITS as A, appFor as j, apps as M, canChangeExecution as N, defaultAppFor as ee, executionMode as te, fileApps as ne, knownExtensions as re, launch as P, pickFile as F, resetAppsFor as I, setAppFor as ie, setTag as ae, showAppSecurity as oe, startup as L, version as se, workspaceManager as R } from "/host/system.js";
// src/settings/menuEditor.js
function ce(e, { openWindow: t, rerender: n, confirmButton: r }) {
	let a = f.layout(e), o = (t) => {
		f.setLayout(e, t), n();
	}, s = (e) => {
		if (e.type === "separator") return {
			label: "— Separatore —",
			description: ""
		};
		if (e.type === "submenu") return {
			label: e.label,
			description: `Sottomenu · ${e.items.length} ${e.items.length === 1 ? "voce" : "voci"}`
		};
		let t = f.action(e.action), n = e.label ?? t?.label ?? e.action;
		if (e.action === "desktop.create") {
			let t = e.params.kind === "folder" ? "Crea la cartella" : "Crea il file", r = e.params.template ? ` dal modello ${c.exists(e.params.template) ? c.path(e.params.template) : "(file eliminato)"}` : e.params.content ? " con un contenuto iniziale" : "";
			return {
				label: n,
				description: `${t} «${e.params.name}»${r}`
			};
		}
		return e.action === "app.launch" ? {
			label: n,
			description: `Apre l’app ${M.find((t) => t.id === e.params.app)?.name ?? e.params.app}`
		} : {
			label: n,
			description: "Azione"
		};
	}, d = (e, t) => {
		let n = structuredClone(a);
		return t(e.length === 1 ? n : n[e[0]].items, e[e.length - 1]), n;
	}, p = (e, t) => o(d(e, (e, n) => {
		let r = n + t;
		r < 0 || r >= e.length || ([e[n], e[r]] = [e[r], e[n]]);
	})), m = (e) => o(d(e, (e, t) => e.splice(t, 1))), g = (e, t, n) => {
		let { label: r, description: i } = s(e), a = t[t.length - 1], o = (e, t, n, i) => l("button", {
			class: "mm-btn",
			type: "button",
			title: t,
			"aria-label": `${t}: ${r}`,
			disabled: i,
			onclick: n
		}, u(e));
		return {
			label: t.length === 2 ? `↳ ${r}` : r,
			description: i,
			keywords: "menu contestuale voce separatore nuovo",
			control: l("div", { class: "mm-ctl" }, o("arrowUp", "Sposta su", () => p(t, -1), a === 0), o("arrowDown", "Sposta giù", () => p(t, 1), a === n - 1), o("x", "Togli", () => m(t)))
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
	}))], b = (e, t) => o(d(e === "root" ? [0] : [Number(e), 0], (e) => e.push(t))), x = f.actions(e).filter((e) => e.id !== "desktop.create" && e.id !== "app.launch"), S = h({
		value: x[0]?.id,
		label: "Voce da aggiungere",
		options: [...x.map((e) => ({
			value: e.id,
			label: e.label
		})), ...M.filter((e) => e.load).map((e) => ({
			value: `app:${e.id}`,
			label: `Apri ${e.name}`
		}))]
	}), w = h({
		value: "root",
		options: y,
		label: "Dove"
	}), T = h({
		value: "root",
		options: y,
		label: "Dove"
	}), E = v[0], D = C({
		placeholder: "Etichetta (es. Foglio di stile)",
		label: "Etichetta"
	}), O = C({
		placeholder: "Nome (es. stile.css)",
		label: "Nome del file o della cartella"
	}), k = h({
		value: "file",
		options: [{
			value: "file",
			label: "File"
		}, {
			value: "folder",
			label: "Cartella"
		}],
		label: "Tipo"
	}), A = null, j = i({
		label: "Modello…",
		onClick: async () => {
			let e = await F(t, {
				title: "Scegli il file modello",
				text: "Il nuovo file partirà con il contenuto di questo file."
			});
			e && (A = e.id, j.textContent = `Modello: ${e.name}`);
		}
	}), N = l("small", { class: "mm-note" });
	return [{
		title: f.list().find((t) => t.id === e)?.label ?? e,
		rows: _
	}, {
		title: "Aggiungi",
		rows: [
			{
				label: "Voce",
				description: "Un’azione o l’apertura di un’app",
				control: l("div", { class: "mm-add" }, S, w, i({
					label: "Aggiungi",
					onClick: () => {
						let e = S.value, t = e.startsWith("app:") ? {
							type: "action",
							action: "app.launch",
							label: `Apri ${M.find((t) => t.id === e.slice(4))?.name}`,
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
				control: l("div", { class: "mm-add" }, T, i({
					label: "Aggiungi",
					onClick: () => b(T.value, { type: "separator" })
				}))
			},
			...E ? [{
				label: `Nuovo elemento in «${E[0].label}»`,
				description: "Crea un file o una cartella con questo nome; un file può partire dal contenuto di un modello",
				control: l("div", { class: "mm-add" }, D, O, k, j, i({
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
				description: f.isCustom(e) ? "Il menu è stato personalizzato" : "Il menu è quello predefinito",
				control: r("Ripristina", "Conferma", () => {
					f.reset(e), n();
				})
			}
		]
	}];
}
// src/settings/services.js
var z = null, B = null;
function V(e) {
	E.services ? B ??= E.services.list().then((e) => {
		z = e;
	}, (e) => {
		z = { error: e.message };
	}).finally(() => {
		B = null, e();
	}) : z = { error: "Questa versione di lilOS non ha i servizi delle app" };
}
function le(e) {
	return E.services?.on("change", () => V(e)) ?? null;
}
var H = {
	off: "Spento",
	starting: "Si avvia…",
	on: "Acceso",
	error: "Fermo"
};
function ue(e) {
	let t = Math.round((Date.now() - e) / 6e4);
	if (t < 1) return "da meno di un minuto";
	if (t < 60) return t === 1 ? "da 1 minuto" : `da ${t} minuti`;
	let n = Math.round(t / 60);
	return n === 1 ? "da 1 ora" : n < 48 ? `da ${n} ore` : `dal ${new Date(e).toLocaleDateString(g.locale)}`;
}
function U(e) {
	return e.status === "on" ? `${H.on} ${ue(e.since)}` : e.status === "starting" && e.error ? `Riparte… (si era fermato: ${e.error})` : e.status === "error" ? `${H.error}: ${e.error ?? "errore"}` : H[e.status] ?? e.status;
}
var W = async (e, t) => {
	try {
		await e();
	} catch (e) {
		w(e.message, { timeout: 7e3 });
	}
	V(t);
};
function de(e) {
	z || V(e);
	let t = z && !z.error && z.available, n = T({
		value: t ? z.enabled : !1,
		label: "Avvia i servizi automaticamente",
		onChange: (t) => W(() => E.services.setEnabled(t), e)
	});
	return n.disabled = !t, {
		label: "Avvia i servizi automaticamente",
		description: z ? z.error ? z.error : z.available ? "Quando entri partono i tuoi servizi scelti in Servizi. Quelli scelti da un amministratore per tutti partono comunque." : "Il kernel non ha il motore dei servizi (modulo services-isolate)" : "Lettura…",
		keywords: "servizi avvio automatico background kernel",
		control: n
	};
}
function fe(e) {
	z || V(e.rerender);
	let t = (e) => [{
		title: "Servizi installati",
		rows: [{ label: e }]
	}];
	return z ? z.error ? t(z.error) : z.available ? z.services.length ? [{
		title: "Servizi installati",
		content: () => l("div", { class: "su-apps" }, l("p", { class: "su-hint" }, "Le parti delle app che lavorano nel kernel, senza finestra, anche con lilOS chiuso. «All’avvio del sistema» vale per tutti gli utenti e lo sceglie un amministratore; «All’accesso» solo per te."), l("div", { class: "st-card su-app" }, z.services.flatMap((t) => pe(t, e))))
	}] : t("Nessuna app installata ha servizi.") : t("Il kernel non ha il motore dei servizi: serve il modulo services-isolate (AppStore → Kernel).") : t("Lettura…");
}
function pe(e, t) {
	let { rerender: n } = t, r = `${e.name} · ${e.label}`, o = [
		{
			value: "none",
			label: "Non si avvia"
		},
		{
			value: "login",
			label: "All’accesso"
		},
		...z.admin || e.startup === "system" ? [{
			value: "system",
			label: "All’avvio del sistema"
		}] : []
	], s = h({
		value: e.startup,
		options: o,
		label: `Avvio di ${r}`,
		onChange: (t) => W(() => E.services.setStartup(e.app, e.entry, t), n)
	});
	s.disabled = e.system && !z.admin;
	let c = e.status === "on" || e.status === "starting", d = l("button", {
		class: "ctl-btn su-clear",
		type: "button",
		title: "Riavvia",
		"aria-label": `Riavvia ${r}`
	}, u("redo"));
	d.disabled = !e.canControl || !c, d.addEventListener("click", () => W(() => E.services.restart(e.app, e.entry), n));
	let f = i({
		label: c ? "Spegni" : "Accendi",
		spinner: !0,
		onClick: () => W(() => E.services[c ? "stop" : "start"](e.app, e.entry), n)
	});
	f.disabled = !e.canControl, f.classList.add("su-power");
	let p = i({
		label: "Registro",
		onClick: () => he(e, t)
	});
	p.disabled = e.system && !z.admin;
	let m = l("div", { class: "st-row su-service" }, a(e, "su-icon"), l("div", { class: "st-label" }, l("b", {}, r), l("small", {}, l("span", { class: `su-state ${e.status}` }, U(e)), " · ", l("code", {}, e.entry), e.system && !z.admin ? " · scelto da un amministratore" : "")), s, d, f, p);
	return e.params && e.startup !== "none" ? [m, me(e, t)] : [m];
}
function me(e, { openWindow: t, rerender: n }) {
	let r = e.system && !z.admin, a = { ...e.values }, o = (t, r) => {
		let i = { ...a };
		r === "" || r == null ? delete i[t] : i[t] = r, a = i, W(() => E.services.setStartup(e.app, e.entry, e.startup, i), n);
	}, s = Object.entries(e.params).flatMap(([n, s]) => {
		let u = Object.hasOwn(a, n) ? a[n] : s.default, d = `${s.label} (${e.name} · ${e.label})`, f;
		if (s.type === "boolean") f = T({
			value: u === !0,
			label: d,
			onChange: (e) => o(n, e)
		});
		else if (s.type === "choice") f = h({
			value: u === void 0 ? "" : String(u),
			label: d,
			options: [{
				value: "",
				label: "—"
			}, ...s.options.map((e) => ({
				value: String(e.value),
				label: e.label
			}))],
			onChange: (e) => o(n, e === "" ? null : s.options.find((t) => String(t.value) === e)?.value)
		});
		else if (s.type === "number") f = l("input", {
			class: "ctl-text su-number",
			type: "number",
			min: s.min,
			max: s.max,
			"aria-label": d
		}), f.value = u ?? "", f.addEventListener("change", () => o(n, f.value === "" ? null : Number(f.value)));
		else if (s.type === "file" || s.type === "folder") {
			let e = C({
				value: u ?? "",
				label: d,
				placeholder: "~/…",
				onChange: (e) => o(n, e.trim())
			}), a = i({
				label: "Scegli…",
				onClick: async () => {
					let r = await F(t, {
						kind: s.type,
						title: s.label
					});
					if (!r) return;
					let i = `~${c.path(r.id).slice(c.home.length)}`;
					e.value = i, o(n, i);
				}
			});
			a.disabled = r, f = l("div", { class: "su-path" }, e, a);
		} else f = C({
			value: u ?? "",
			label: d,
			onChange: (e) => o(n, e)
		});
		return f.querySelectorAll?.("input, select, button").forEach((e) => {
			e.disabled ||= r;
		}), f.matches?.("input, select, button") && (f.disabled ||= r), [l("label", {
			class: "su-plabel",
			title: s.description ?? ""
		}, s.label), l("div", { class: "su-field" }, f)];
	});
	return l("div", { class: "su-params" }, s);
}
async function he(e, { openWindow: t }) {
	let n;
	try {
		n = await E.services.log(e.app, e.entry);
	} catch (e) {
		return w(e.message, { timeout: 7e3 });
	}
	let i = new r({
		title: `Registro di ${e.name} · ${e.label}`,
		icon: "list",
		width: 620,
		height: 380
	}), a = (e) => new Date(e).toLocaleTimeString(g.locale);
	i.body.append(l("div", {
		class: "su-log",
		tabindex: "0",
		"aria-label": "Registro"
	}, n.length ? n.map((e) => l("div", { class: `su-line ${e.level}` }, l("span", {}, a(e.at)), ` ${e.text}`)) : l("p", { class: "su-empty" }, "Nessuna riga: il servizio non è ancora partito."))), t(i);
}
// src/settings/startup.js
function ge({ rerender: e }) {
	return [{
		title: "Avvio automatico",
		rows: [de(e), {
			label: "Apri le app quando entri",
			description: "Si aprono le app scelte in App, con i loro parametri. Solo nella prima scheda di lilOS di questo browser: le altre si aprono vuote.",
			keywords: "avvio automatico accesso login esecuzione automatica",
			control: T({
				value: _.get("startupApps"),
				label: "Apri le app quando entri",
				onChange: (e) => _.set("startupApps", e)
			})
		}]
	}, {
		title: "Se qualcosa non va",
		rows: [{
			label: "Avvio senza app",
			description: "Per una volta sola: apri lilOS con ?avvio=no in fondo all’indirizzo. Le scelte salvate restano.",
			keywords: "avvio sicuro avvio=no",
			control: L.skipped ? "Attivo ora" : ""
		}]
	}];
}
function _e(e) {
	let t = L.apps().filter((e) => M.some((t) => t.id === e.app));
	return [{
		title: "Si aprono quando entri",
		content: () => l("div", { class: "su-apps" }, l("p", { class: "su-hint" }, "Nel workspace in cui si apre lilOS, nell’ordine dell’elenco. Togli tutti i punti d’ingresso di un’app e l’app esce dall’elenco."), t.length ? t.map((t) => ve(t, e)) : l("p", { class: "su-empty" }, "Nessuna app si apre da sola."), xe(t, e))
	}];
}
function ve(e, t) {
	let n = M.find((t) => t.id === e.app), r = L.windowEntries(n.id), o = new Map(e.entries.map((e) => [e.entry, e.params])), s = r.filter((e) => o.has(e.entry)).length, c = l("div", { class: "st-row su-head" }, a(n, "su-icon"), l("div", { class: "st-label" }, l("b", {}, n.name), l("small", {}, r.length === 1 ? "1 punto d’ingresso" : `${s} di ${r.length} punti d’ingresso`)), i({
		label: "Rimuovi dall’avvio",
		onClick: () => {
			L.removeApp(n.id), t.rerender();
		}
	})), u = r.flatMap((e) => {
		let r = o.has(e.entry), i = l("div", { class: "st-row su-entry" }, T({
			value: r,
			label: `${n.name}: ${e.label}`,
			onChange: (r) => {
				try {
					L.setEntry(n.id, e.entry, r);
				} catch (e) {
					w(e.message);
				}
				t.rerender();
			}
		}), l("div", { class: "st-label" }, l("b", {}, e.label), l("small", {}, l("code", {}, e.entry))));
		return r ? [i, ye(n, e, o.get(e.entry), t)] : [i];
	});
	return l("div", { class: "st-card su-app" }, c, u);
}
function ye(e, t, n, { openWindow: r }) {
	let i = `${t.label} di ${e.name}`;
	if (!t.params) {
		let r = "Questo punto d’ingresso non descrive i suoi parametri: arrivano all’app così come sono, come args.", a = l("span", { class: "su-note" }, r), o = l("textarea", {
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
				L.setParams(e.id, t.entry, i), o.removeAttribute("aria-invalid"), a.classList.remove("bad"), a.textContent = r;
			} catch (e) {
				o.setAttribute("aria-invalid", "true"), a.classList.add("bad"), a.textContent = `Non salvati: ${e.message}`;
			}
		}), l("div", { class: "su-params" }, l("span", { class: "su-plabel" }, "Parametri (JSON)"), l("span"), o, a);
	}
	let a = { ...n }, o = (n, r) => {
		let i = { ...a };
		r === "" || r == null ? delete i[n] : i[n] = r;
		try {
			return L.setParams(e.id, t.entry, i), a = i, !0;
		} catch (e) {
			return w(e.message, { timeout: 6e3 }), !1;
		}
	}, s = Object.entries(t.params).flatMap(([e, t]) => {
		let n = Object.hasOwn(a, e) ? a[e] : t.default, s = `${t.label} (${i})`, c;
		if (t.type === "boolean") c = T({
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
			c = h({
				value: n === void 0 ? "" : String(n),
				options: r,
				label: s,
				onChange: (n) => o(e, n === "" ? null : t.options.find((e) => String(e.value) === n)?.value)
			});
		} else t.type === "number" ? (c = l("input", {
			class: "ctl-text su-number",
			type: "number",
			min: t.min,
			max: t.max,
			"aria-label": s
		}), c.value = n ?? "", c.addEventListener("change", () => {
			o(e, c.value === "" ? null : Number(c.value)) || (c.value = a[e] ?? "");
		})) : t.type === "file" || t.type === "folder" ? c = be(t, n, s, (t) => o(e, t), r) : (c = C({
			value: n ?? "",
			label: s,
			onChange: (t) => {
				o(e, t) || (c.value = a[e] ?? "");
			}
		}), t.maxLength && (c.maxLength = t.maxLength));
		return [l("label", {
			class: "su-plabel",
			title: t.description ?? ""
		}, t.label), l("div", { class: "su-field" }, c)];
	});
	return l("div", { class: "su-params" }, s);
}
function be(e, t, n, r, a) {
	let o = e.type === "folder", s = l("input", {
		class: "ctl-text",
		type: "text",
		readonly: !0,
		placeholder: o ? "Nessuna cartella" : "Nessun file",
		"aria-label": n
	}), d = (e) => {
		s.value = e ? c.exists(e) ? c.path(e) : "(non c’è più)" : "";
	};
	d(t);
	let f = i({
		label: "Scegli…",
		onClick: async () => {
			let t = await F(a, {
				kind: o ? "folder" : "file",
				title: e.label
			});
			t && r(t.id) && d(t.id);
		}
	}), p = l("button", {
		class: "ctl-btn su-clear",
		type: "button",
		title: "Togli",
		"aria-label": `Togli ${e.label}`
	}, u("x"));
	return p.addEventListener("click", () => {
		r(null) && d(null);
	}), l("div", { class: "su-path" }, s, f, p);
}
function xe(e, { rerender: t }) {
	let n = i({
		label: "Aggiungi…",
		onClick: () => {
			let r = M.filter((t) => t.load && !e.some((e) => e.app === t.id) && L.windowEntries(t.id).length).sort((e, t) => e.name.localeCompare(t.name));
			if (!r.length) return w("Tutte le app sono già all’avvio");
			let i = n.getBoundingClientRect();
			p(i.left, i.bottom + 4, r.map((e) => ({
				label: e.name,
				icon: e.glyph,
				action: () => {
					try {
						L.addApp(e.id);
					} catch (e) {
						w(e.message);
					}
					t();
				}
			})));
		}
	});
	return l("div", { class: "st-row su-add" }, l("span", { class: "su-plus" }, u("plus")), l("div", { class: "st-label" }, l("b", {}, "Aggiungi un’app all’avvio"), l("small", {}, "Si apre la sua finestra principale; poi scegli altri punti d’ingresso e parametri")), n);
}
// src/settings/SettingsApp.js
var G = null, K = (e, t, n) => e === 1 ? `1 ${t}` : `${e} ${n}`;
function Se() {
	let e = R(), t = e?.current;
	return t ? [{
		title: "Workspace",
		rows: [
			{
				label: "Nome",
				keywords: "rinomina workspace",
				control: () => {
					let n = C({
						value: t.name,
						label: "Nome del workspace",
						onChange: (n) => e.rename(t.id, n)
					});
					return n.maxLength = A.MAX_NAME, n;
				}
			},
			{
				label: "Colore",
				description: "Il pallino nella barra in basso e accanto ai suoi file nel File Manager",
				keywords: "colore workspace",
				control: () => x({
					value: t.color,
					colors: D,
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
		rows: M.map((t) => ({
			label: t.name,
			description: t.system ? "App di sistema: c’è in ogni workspace" : "Installata in lilOS: qui la puoi nascondere",
			keywords: `app nascondi mostra ${t.name}`,
			control: t.system ? "Sempre visibile" : () => T({
				value: e.isInstalled(t.id),
				label: `${t.name} visibile in questo workspace`,
				onChange: (n) => e.setInstalled(t.id, n)
			})
		}))
	}] : [];
}
function Ce() {
	let e = R();
	if (!e) return [];
	let t = e.list();
	return [{
		title: "Workspace",
		rows: [...t.map((n) => {
			let r = n.id === e.currentId, a = M.filter((t) => e.isInstalled(t.id, n.id)).length;
			return {
				label: r ? `${n.name} (attuale)` : n.name,
				description: `${K(e.ownedCount(n.id), "elemento creato", "elementi creati")} · ${K(a, "app", "app")}`,
				keywords: "workspace passa elimina",
				control: () => l("div", { class: "ws-settings-actions" }, r ? null : i({
					label: "Passa a questo",
					onClick: () => e.switchTo(n.id)
				}), t.length > 1 ? Q("Elimina…", "Elimina", () => e.remove(n.id)) : null)
			};
		}), {
			label: "Nuovo workspace",
			description: "Con la scrivania vuota e tutte le app visibili",
			control: i({
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
function we() {
	let e = (e) => {
		try {
			let t = S.create({ name: e.value });
			q.length && ae(q, t.id, !0), q = [];
		} catch (t) {
			w(t.message), e.focus();
		}
	}, t = q.filter((e) => c.exists(e)).length;
	return [{
		title: "Nuovo tag",
		rows: [{
			label: "Nome",
			description: t ? `Il nuovo tag andrà su ${K(t, "elemento selezionato", "elementi selezionati")}` : "Poi si assegna dal menu del tasto destro → Tag, sulla scrivania e nel File Manager",
			keywords: "nuovo tag crea etichetta",
			control: () => {
				let t = C({
					placeholder: "Per esempio: Urgente",
					label: "Nome del nuovo tag"
				});
				return t.maxLength = 30, t.classList.add("tag-new-name"), t.addEventListener("keydown", (n) => {
					n.key === "Enter" && (n.preventDefault(), e(t));
				}), l("div", { class: "tag-settings-actions" }, t, i({
					label: "Crea",
					primary: !0,
					onClick: () => e(t)
				}));
			}
		}]
	}, ...S.list().map((e) => ({
		title: e.name,
		rows: [
			{
				label: "Nome",
				keywords: "rinomina tag",
				control: () => {
					let t = C({
						value: e.name,
						label: `Nome del tag ${e.name}`,
						onChange: (n) => {
							try {
								S.rename(e.id, n);
							} catch (n) {
								w(n.message), t.value = S.get(e.id)?.name ?? "";
							}
						}
					});
					return t.maxLength = 30, t;
				}
			},
			{
				label: "Colore",
				keywords: "colore tag",
				control: () => x({
					value: e.color,
					colors: n,
					onChange: (t) => S.setColor(e.id, t)
				})
			},
			{
				label: "Visibile",
				description: e.visible ? "Gli elementi con questo tag si vedono ovunque" : "Gli elementi con questo tag sono nascosti ovunque: si ritrovano nel File Manager → Tag",
				keywords: "nascondi mostra invisibile tag",
				control: () => T({
					value: e.visible,
					label: `Tag ${e.name} visibile`,
					onChange: (t) => S.setVisible(e.id, t)
				})
			},
			{
				label: "Elementi",
				description: `${K(c.tagged(e.id).length, "elemento", "elementi")} in questo workspace e nelle cartelle condivise`,
				control: () => l("div", { class: "tag-settings-actions" }, i({
					label: "Mostra nel File Manager",
					onClick: () => P("files", { tag: e.id })
				}), Q("Elimina…", "Elimina il tag", () => S.remove(e.id)))
			}
		]
	}))];
}
function Te() {
	let e = E.DESK_FIXED_ITEMS ?? [];
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
var J = (e) => () => T({
	value: _.get(e),
	onChange: (t) => _.set(e, t)
}), Y = [
	"Generale",
	"Scrivania",
	"Elementi",
	"Finestre"
];
function Ee() {
	let e = new Set(re()), t = /* @__PURE__ */ new Set(), n = (e) => {
		t.add(e);
		let n = ee(e);
		return {
			label: e ? `.${e}` : "Senza estensione",
			description: n ? `Predefinita: ${n.name}` : "Nessuna app predefinita",
			keywords: `tipo file estensione apri con ${e}`,
			control: () => h({
				value: j(e)?.id ?? "ask",
				label: `App per ${e ? "." + e : "i file senza estensione"}`,
				options: [{
					value: "ask",
					label: "Chiedi ogni volta"
				}, ...ne().map((e) => ({
					value: e.id,
					label: e.name
				}))],
				onChange: (t) => ie(e, t)
			})
		};
	}, r = s().map((t) => ({
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
					I(), G?.render();
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
function De() {
	let e = c.trashed(), t = e.reduce((e, t) => e + t.bytes, 0);
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
					let e = _.get("trashRetention"), t = k.some((t) => t.value === e) ? k : [...k, {
						value: e,
						label: e > 0 ? `${e} giorni` : "Per sempre"
					}];
					return h({
						value: e,
						label: "Conserva gli elementi nel cestino per",
						options: t,
						onChange: (e) => _.set("trashRetention", Number(e))
					});
				}
			},
			{
				label: "Contenuto",
				description: e.length ? `${K(e.length, "elemento", "elementi")} · ${$(t)}` : "Il cestino è vuoto",
				keywords: "apri cestino ripristina",
				control: i({
					label: "Apri il cestino",
					onClick: () => P("files", { trash: !0 })
				})
			},
			{
				label: "Svuota il cestino",
				description: "Elimina definitivamente tutto quello che contiene",
				keywords: "svuota cestino",
				control: e.length ? Q("Svuota…", "Svuota", () => c.purgeTrash()) : "Vuoto"
			}
		]
	}];
}
function X(e = c.root) {
	return c.children(e).reduce((e, t) => e + (t.type === "folder" ? X(t.id) : t.size ?? 0), 0);
}
function Oe() {
	let e = /* @__PURE__ */ new Map();
	for (let t of y.list()) e.has(t.group) || e.set(t.group, []), e.get(t.group).push(t);
	let t = (e) => Y.includes(e) ? Y.indexOf(e) : Y.length;
	return [
		{
			title: "Scorciatoie da tastiera",
			rows: [{
				label: "Tutte le scorciatoie",
				description: "Le modifiche valgono subito. Per registrare una combinazione premi +, poi i tasti; Esc annulla.",
				control: Q("Ripristina tutte", "Conferma", () => y.resetAll())
			}]
		},
		...[...e].sort(([e], [n]) => t(e) - t(n)).map(([e, t]) => ({
			title: e,
			rows: t.map((e) => ({
				label: e.label,
				keywords: `scorciatoia tasti ${e.keys.map((e) => y.format(e)).join(" ")}`,
				control: v(e.id)
			}))
		})),
		{
			title: "Mouse",
			rows: [
				{
					label: "Selezione a mano libera",
					description: "Disegna un percorso chiuso: si selezionano gli elementi che contiene",
					keywords: "lazo lasso percorso selezione alt",
					control: () => h({
						value: _.get("lasso"),
						options: O,
						onChange: (e) => _.set("lasso", e)
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
var ke = {
	isolated: "Isolata",
	open: "Non isolata",
	system: "Dentro lilOS",
	remote: "Isolata, nel suo sito"
};
function Z() {
	let e = N(), { isolated: t } = o.security(), n = M.filter((e) => e.package && !e.package.system);
	return [{
		title: "Esecuzione delle app",
		rows: [{
			label: "Esegui le app isolate",
			description: e ? "Ogni app gira in una sandbox e vede solo quello che i suoi permessi le concedono. Se lo togli, le app girano nella pagina di lilOS e in un Web Worker: più veloci, ma possono fare tutto quello che puoi fare tu. Vale dalla prossima apertura di ogni app." : "Solo un amministratore la cambia.",
			keywords: "sicurezza isolamento sandbox iframe worker",
			control: e ? T({
				value: t,
				label: "Esegui le app isolate",
				onChange: async (e) => {
					try {
						await o.setSecurity({ isolated: e });
					} catch (e) {
						w(`Non cambiata: ${e.message}`);
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
			let t = te(e.package), n = t.fixed ? t.reason : t.own === null ? "Come le altre app" : "Scelta per questa app";
			return {
				label: e.name,
				description: `${ke[t.mode]} · ${n}`,
				keywords: "sicurezza isolamento",
				control: i({
					label: "Proprietà…",
					onClick: () => oe(e.id)
				})
			};
		}) : [{ label: "Nessuna app installata oltre a quelle di sistema" }]
	}];
}
function Q(e, t, n) {
	let r = 0, a = i({
		label: e,
		onClick: () => {
			if (!a.classList.contains("primary")) {
				a.textContent = t, a.classList.add("danger", "primary"), r = setTimeout(o, 4e3);
				return;
			}
			clearTimeout(r);
			let e = n();
			typeof e?.then == "function" ? (a.disabled = !0, a.setAttribute("aria-busy", "true"), e.catch((e) => w(e.message, { timeout: 7e3 })).finally(() => {
				a.disabled = !1, a.removeAttribute("aria-busy"), o();
			})) : o();
		}
	}), o = () => {
		a.textContent = e, a.classList.remove("danger", "primary");
	};
	return a;
}
function Ae() {
	return b.bytes();
}
function $(e) {
	return e == null ? "Non disponibile" : e < 1024 ? `${e} B` : `${(e / 1024).toLocaleString(g.locale, { maximumFractionDigits: 1 })} KB`;
}
var je = [
	[/Edg\/(\d+)/, "Edge"],
	[/Firefox\/(\d+)/, "Firefox"],
	[/Chrome\/(\d+)/, "Chrome"],
	[/Version\/(\d+).*Safari/, "Safari"]
];
function Me() {
	for (let [e, t] of je) {
		let n = navigator.userAgent.match(e);
		if (n) return `${t} ${n[1]}`;
	}
	return "Sconosciuto";
}
function Ne({ openWindow: n, args: r } = {}) {
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
							control: m({
								value: _.get("theme"),
								label: "Tema",
								options: [{
									value: "light",
									label: "Chiaro"
								}, {
									value: "dark",
									label: "Scuro"
								}],
								onChange: (e) => _.set("theme", e)
							})
						}]
					}, {
						title: "Colore principale",
						rows: [{
							label: "Colore",
							description: "Selezione, pulsanti, tab attivi e logo",
							keywords: "accento tema",
							control: x({
								value: _.get("accent"),
								colors: D,
								onChange: (e) => _.set("accent", e)
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
					sections: () => [...Te(), {
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
					sections: Se
				}, {
					id: "all",
					label: "Tutti",
					sections: Ce
				}]
			},
			{
				id: "tags",
				label: "Tag",
				icon: "tag",
				description: "Etichette colorate per ritrovare file e cartelle ovunque siano. Un tag invisibile nasconde i suoi elementi.",
				sections: we
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
						sections: Oe
					},
					{
						id: "filetypes",
						label: "Tipi di file",
						sections: Ee
					},
					{
						id: "contextmenu",
						label: "Menu contestuale",
						sections: () => ce("desktop.background", {
							openWindow: n,
							confirmButton: Q,
							rerender: () => G?.render()
						})
					},
					{
						id: "trash",
						label: "Cestino",
						sections: De
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
				description: "Servizi e app che partono da soli all’avvio di lilOS e quando entri.",
				subtabs: [
					{
						id: "options",
						label: "Opzioni",
						sections: () => ge({ rerender: () => G?.render() })
					},
					{
						id: "services",
						label: "Servizi",
						sections: () => fe({
							openWindow: n,
							rerender: () => G?.render()
						})
					},
					{
						id: "apps",
						label: "App",
						sections: () => _e({
							openWindow: n,
							rerender: () => G?.render()
						})
					}
				]
			},
			{ group: "Dati" },
			{
				id: "storage",
				label: "Archiviazione",
				icon: "disk",
				description: d.connected ? "Dati di lilOS salvati nella tua cartella utente." : "Dati di lilOS salvati in questo browser.",
				sections: () => [{
					title: "Spazio",
					rows: [{
						label: "Spazio usato",
						description: "Posizioni, vista e impostazioni",
						control: $(Ae())
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
							].forEach((e) => _.reset(e)), y.resetAll(), I(), f.list().forEach((e) => f.reset(e.id));
						})
					}, {
						label: "Scrivania e file iniziali",
						description: "Elimina tutte le cartelle e i file creati, i workspace, i tag, le posizioni e la vista salvate, poi ricarica lilOS",
						keywords: "reset desktop workspace tag",
						control: Q("Ripristina…", "Elimina e ricarica", async () => {
							await c.reset(), [
								"workspaces",
								"tags",
								"desktop-layout",
								"desktop",
								"camera",
								"workareas",
								"editor-tree",
								"files-sidebar",
								"app-setup"
							].forEach((e) => b.remove(e)), await d.flush().catch(() => {}), location.reload();
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
							control: se
						},
						{
							label: "Versione dell’SDK",
							control: e
						},
						{
							label: "Lingua",
							control: g.locale
						},
						{
							label: "Browser",
							control: Me()
						}
					]
				}]
			}
		]
	});
	G = i.view;
	let a = (e) => {
		Array.isArray(e?.tagFor) && (q = e.tagFor.filter((e) => typeof e == "string" && c.exists(e))), typeof e?.tab == "string" && i.view.select(e.tab), e?.tab === "tags" && i.view.panel.querySelector(".tag-new-name")?.focus();
	};
	a(r), i.on("launch", a);
	let s = R()?.on("change", () => i.view.render()), l = c.on("trash", () => i.view.render()), u = S.on("change", () => i.view.render()), p = [
		o.on("change", () => i.view.render()),
		o.on("security", () => i.view.render()),
		le(() => i.view.render())
	];
	return i.on("destroy", () => {
		s?.(), l(), u(), p.forEach((e) => e?.()), G === i.view && (G = null);
	}), i;
}
export { Ne as default };
