import { n as e, r as t, t as n } from "./i18n-BNs41huj.js";
import { a as r, i, n as a, t as o } from "./browser-DmwxbmZ7.js";
import { clearHistory as s } from "./optionsWindow-DQvCvYJ8.js";
import { Window as c, fs as l, h as u, icon as d, openMenu as f } from "/host/sdk.js";
import { launch as p } from "/host/system.js";
// src/netwave/historyWindow.js
var m = "netwave-history", h = 864e5, g = null, _ = (e) => {
	try {
		return new URL(e).host;
	} catch {
		return e;
	}
}, v = (e) => n.date(e, {
	hour: "2-digit",
	minute: "2-digit"
}), y = (e) => {
	let t = new Date(e);
	return t.setHours(0, 0, 0, 0), t.getTime();
};
function b(e) {
	return g?.win.el.isConnected || (g = new x(e)), e(g.win, m);
}
var x = class {
	view = "pages";
	range = "all";
	session = "";
	text = "";
	constructor(n) {
		this.openWindow = n;
		let r = this.win = new c({
			title: e("history.title"),
			icon: "clock",
			width: 900,
			height: 600,
			minWidth: 520,
			minHeight: 320
		});
		r.el.classList.add("nw-history"), this.side = u("nav", {
			class: "nw-h-side",
			"aria-label": e("history.title")
		}), this.search = u("input", {
			class: "nw-h-search",
			type: "search",
			placeholder: e("history.search"),
			"aria-label": e("history.search")
		}), this.filter = u("select", {
			class: "nw-h-filter",
			"aria-label": e("history.bySession")
		}), this.list = u("div", {
			class: "nw-h-list",
			role: "list"
		}), r.body.append(u("div", { class: "nw-h-root" }, this.side, u("div", { class: "nw-h-main" }, u("div", { class: "nw-h-tools" }, u("label", { class: "nw-h-searchbox" }, d("search"), this.search), this.filter), this.list))), this.search.addEventListener("input", () => {
			this.text = this.search.value, this.draw();
		}, { signal: r.signal }), this.filter.addEventListener("change", () => {
			this.session = this.filter.value, this.draw();
		}, { signal: r.signal });
		let i = t.on("change", () => this.draw());
		r.on("destroy", () => {
			i(), g === this && (g = null);
		}), this.draw();
	}
	openUrl(e, { newWindow: t = !1, privately: n = !1 } = {}) {
		let r = a();
		if (!r || t || n) {
			let t = new o({
				url: e,
				...n && { private: !0 }
			}, this.openWindow);
			this.openWindow(t.win, t.key, { main: !0 });
		} else r.newTab(e), r.show();
	}
	#e() {
		let e = a();
		if (e) return e;
		let t = new o({}, this.openWindow);
		return this.openWindow(t.win, t.key, { main: !0 }), t;
	}
	draw() {
		let n = {
			pages: null,
			sessions: t.sessions().length,
			closed: t.closed().length
		}, r = (e, t, r) => u("button", {
			type: "button",
			class: "nw-h-place",
			"aria-current": this.view === e ? "page" : null,
			onclick: () => {
				this.view = e, this.draw();
			}
		}, d(t), u("span", {}, r), n[e] == null ? null : u("span", { class: "nw-h-count" }, String(n[e]))), i = (e, t) => u("button", {
			type: "button",
			class: "nw-h-place sub",
			"aria-current": this.view === "pages" && this.range === e ? "page" : null,
			onclick: () => {
				this.view = "pages", this.range = e, this.draw();
			}
		}, d("calendar"), u("span", {}, t));
		if (this.side.replaceChildren(r("pages", "globe", e("history.pages")), r("sessions", "workarea", e("history.sessions")), r("closed", "undo", e("history.closed")), u("hr"), i("all", e("history.all")), i("today", e("history.today")), i("yesterday", e("history.yesterday")), i("week", e("history.week")), u("hr"), u("button", {
			type: "button",
			class: "nw-h-place",
			onclick: () => s(this.win)
		}, d("trash"), u("span", {}, e("history.clear")))), this.filter.hidden = this.view !== "pages", this.view === "pages") {
			let n = t.sessions();
			this.filter.replaceChildren(u("option", { value: "" }, e("history.allSessions")), ...n.map((e) => u("option", {
				value: e.id,
				selected: e.id === this.session
			}, e.name))), this.session && !n.some((e) => e.id === this.session) && (this.session = "");
		}
		this.search.placeholder = e(this.view === "sessions" ? "history.searchSessions" : "history.search"), this.view === "pages" ? this.#t() : this.view === "sessions" ? this.#n() : this.#r();
	}
	#t() {
		let r = y(Date.now()), i = {
			all: [0, Infinity],
			today: [r, Infinity],
			yesterday: [r - h, r - 1],
			week: [r - 6 * h, Infinity]
		}[this.range], a = t.visits({
			from: i[0],
			to: i[1],
			text: this.text,
			session: this.session || null,
			limit: 2e3
		});
		if (!a.length) return this.list.replaceChildren(u("p", { class: "nw-h-empty" }, e("history.noPages")));
		let o = [], s = null;
		for (let i of a) {
			let a = y(i.at);
			if (a !== s) {
				s = a;
				let t = a === r ? e("history.today") : a === r - h ? e("history.yesterday") : "";
				o.push(u("div", { class: "nw-h-day" }, [t, n.date(a, {
					weekday: "long",
					day: "numeric",
					month: "long",
					year: "numeric"
				})].filter(Boolean).join(" · ")));
			}
			let c = u("div", {
				class: "nw-h-row",
				role: "listitem",
				tabindex: "0",
				title: i.url
			}, u("span", { class: "nw-h-time" }, v(i.at)), d("globe"), u("span", { class: "nw-h-name" }, i.title || _(i.url), u("small", {}, _(i.url))), i.session ? u("button", {
				type: "button",
				class: "nw-chip",
				title: e("history.onlySession"),
				onclick: (e) => {
					e.stopPropagation(), this.session = i.session.id, this.draw();
				}
			}, d("workarea"), i.session.name) : u("span", { class: "nw-chip grey" }, e("session.none")), u("button", {
				type: "button",
				class: "nw-h-act",
				title: e("history.remove"),
				"aria-label": e("history.remove"),
				onclick: (e) => {
					e.stopPropagation(), t.removeVisits([i]);
				}
			}, d("x")));
			c.addEventListener("click", () => this.openUrl(i.url)), c.addEventListener("keydown", (e) => {
				e.key === "Enter" && this.openUrl(i.url);
			}), c.addEventListener("contextmenu", (n) => {
				n.preventDefault(), f(n.clientX, n.clientY, [
					{
						label: e("history.openTab"),
						icon: "plus",
						action: () => this.openUrl(i.url)
					},
					{
						label: e("history.openWindow"),
						icon: "window",
						action: () => this.openUrl(i.url, { newWindow: !0 })
					},
					{
						label: e("page.openLinkPrivate"),
						icon: "eyeOff",
						action: () => this.openUrl(i.url, { privately: !0 })
					},
					{
						label: e("page.copyLink"),
						icon: "link",
						action: () => navigator.clipboard?.writeText(i.url).catch(() => {})
					},
					"-",
					{
						label: e("history.remove"),
						icon: "trash",
						action: () => t.removeVisits([i])
					},
					{
						label: e("history.removeSite", { host: _(i.url) }),
						icon: "trash",
						action: () => t.removeVisits(t.visits({ limit: 1e5 }).filter((e) => _(e.url) === _(i.url)))
					}
				]);
			}), o.push(c);
		}
		this.list.replaceChildren(...o);
	}
	#n() {
		let a = t.sessions({ text: this.text });
		if (!a.length) return this.list.replaceChildren(u("p", { class: "nw-h-empty" }, e("history.noSessions")));
		this.list.replaceChildren(...a.map((a) => {
			let o = [...i].find((e) => e.session?.id === a.id), s = a.file && l.exists(a.file), c = a.events.at(-1), f = a.tabs.slice(0, 6);
			return u("div", {
				class: `nw-h-card${o ? " open" : ""}`,
				role: "listitem"
			}, u("div", { class: "nw-h-card-top" }, d("workarea"), u("b", {}, a.name), o ? u("span", { class: "nw-chip ok" }, e("history.openNow")) : null, u("span", { class: "nw-h-card-when" }, e(`history.event.${c.event}`, {
				when: n.date(c.at, {
					day: "numeric",
					month: "short",
					hour: "2-digit",
					minute: "2-digit"
				}),
				n: a.tabs.length
			}))), a.path ? u("div", { class: "nw-h-card-path" }, a.path) : null, u("div", { class: "nw-h-card-tabs" }, ...f.map((e) => u("span", {
				class: "nw-h-pill",
				title: e.url
			}, d("globe"), e.title || _(e.url))), a.tabs.length > f.length ? u("span", { class: "nw-h-pill" }, `+${a.tabs.length - f.length}`) : null), u("div", { class: "nw-h-card-acts" }, o ? u("button", {
				type: "button",
				class: "ctl-btn",
				onclick: () => o.show()
			}, d("window"), e("history.goToWindow")) : u("button", {
				type: "button",
				class: "ctl-btn primary",
				onclick: () => r(this.#e(), a)
			}, e("history.reopen")), u("button", {
				type: "button",
				class: "ctl-btn",
				onclick: () => this.#e().openSnapshot(a)
			}, e("history.reopenAsWas", { when: v(a.at) })), s ? u("button", {
				type: "button",
				class: "ctl-btn",
				onclick: () => p("files", { folder: l.get(a.file).parent })
			}, d("folder"), e("history.showFile")) : null, !s && a.file ? u("span", { class: "nw-h-gone" }, d("warning"), e("history.fileGone")) : null, u("button", {
				type: "button",
				class: "nw-h-act",
				title: e("history.removeSession"),
				"aria-label": e("history.removeSession"),
				onclick: () => t.removeSession(a.id)
			}, d("trash"))));
		}));
	}
	#r() {
		let r = this.text.trim().toLowerCase(), i = t.closed().filter((e) => !r || e.tabs.some((e) => `${e.title} ${e.url}`.toLowerCase().includes(r)));
		if (!i.length) return this.list.replaceChildren(u("p", { class: "nw-h-empty" }, e("history.noClosed")));
		this.list.replaceChildren(...i.map((r) => u("div", {
			class: "nw-h-card",
			role: "listitem"
		}, u("div", { class: "nw-h-card-top" }, d(r.kind === "window" ? "window" : "globe"), u("b", {}, r.kind === "window" ? e("history.closedWindow", { n: r.tabs.length }) : r.tabs[0].title || _(r.tabs[0].url)), r.session ? u("span", { class: "nw-chip" }, d("workarea"), r.session.name) : null, u("span", { class: "nw-h-card-when" }, n.date(r.at, {
			day: "numeric",
			month: "short",
			hour: "2-digit",
			minute: "2-digit"
		}))), r.kind === "window" ? u("div", { class: "nw-h-card-tabs" }, ...r.tabs.slice(0, 6).map((e) => u("span", {
			class: "nw-h-pill",
			title: e.url
		}, d("globe"), e.title || _(e.url)))) : u("div", { class: "nw-h-card-path" }, r.tabs[0].url), u("div", { class: "nw-h-card-acts" }, u("button", {
			type: "button",
			class: "ctl-btn primary",
			onclick: () => this.#e().reopenClosed(r.id)
		}, e("history.reopen")), r.kind === "window" ? u("button", {
			type: "button",
			class: "ctl-btn",
			onclick: () => {
				let e = this.#e();
				t.takeClosed(r.id), e.openSnapshot(r).saveSessionAs();
			}
		}, d("save"), e("history.saveAsSession")) : null))));
	}
};
export { b as openHistory };
