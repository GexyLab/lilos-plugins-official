import { a as e, c as t, n, o as r, r as i, s as a } from "./i18n-BNs41huj.js";
import { SettingsWindow as o, h as s, icon as c, messageBox as l, selectField as u, textField as d, toggle as f } from "/host/sdk.js";
// src/netwave/optionsWindow.js
var p = "netwave-options", m = null;
function h(i) {
	if (m?.el.isConnected) return i(m, p);
	let l = new o({
		title: n("options.title"),
		icon: "globe",
		width: 700,
		height: 480,
		search: !1,
		tabs: [
			{
				id: "general",
				label: n("options.general"),
				icon: "gear",
				description: n("options.generalText"),
				sections: () => [{ rows: [{
					label: n("options.home"),
					description: n("options.homeText"),
					control: d({
						value: t.get("home"),
						placeholder: n("options.homeEmpty"),
						type: "url",
						onChange: (e) => t.set("home", e.trim() ? a(e) ?? "" : "")
					})
				}, {
					label: n("options.search"),
					description: n("options.searchText"),
					control: u({
						value: t.get("search"),
						label: n("options.search"),
						options: r.map((e) => ({
							value: e.id,
							label: e.label
						})),
						onChange: (e) => t.set("search", e)
					})
				}] }]
			},
			{
				id: "history",
				label: n("options.history"),
				icon: "clock",
				description: n("options.historyText"),
				sections: () => [{ rows: [{
					label: n("options.keep"),
					control: u({
						value: t.get("keepDays"),
						label: n("options.keep"),
						options: e.map((e) => ({
							value: e,
							label: e ? n("options.days", { n: e }) : n("options.forever")
						})),
						onChange: (e) => t.set("keepDays", Number(e))
					})
				}, {
					label: n("history.clear"),
					description: n("options.clearText"),
					control: () => s("button", {
						type: "button",
						class: "ctl-btn",
						onclick: () => g(l)
					}, c("trash"), n("history.clear"))
				}] }]
			},
			{
				id: "sites",
				label: n("options.sites"),
				icon: "shield",
				description: n("options.sitesText"),
				sections: () => {
					let e = t.grants();
					return [{ rows: [{
						label: n("options.askTabs"),
						description: n("options.askTabsText"),
						control: f({
							value: t.get("askTabs"),
							label: n("options.askTabs"),
							onChange: (e) => t.set("askTabs", !!e)
						})
					}] }, { content: () => e.length ? s("div", { class: "nw-grants" }, ...e.map((e) => s("div", { class: "nw-grant" }, c(e.allow ? "check" : "x"), s("span", { class: "nw-grant-site" }, e.origin), s("span", { class: "nw-grant-what" }, n(e.allow ? "site.allowed" : "site.blocked", { what: n(`perm.${e.permission}`) })), s("button", {
						type: "button",
						class: "ctl-btn",
						onclick: () => {
							t.setGrant(e.origin, e.permission, null), l.view?.render?.();
						}
					}, n("site.forget"))))) : s("p", { class: "nw-grants-empty" }, n("options.noSites")) }];
				}
			}
		]
	});
	m = l;
	let h = t.on("grants", () => l.view?.render?.());
	return l.on("destroy", () => {
		h(), m === l && (m = null);
	}), i(l, p);
}
async function g(e) {
	let t = await l(e, {
		icon: "warning",
		title: n("history.clear"),
		fields: [
			{
				name: "range",
				type: "select",
				label: n("clear.range"),
				value: "hour",
				options: [
					{
						value: "hour",
						label: n("clear.hour")
					},
					{
						value: "today",
						label: n("clear.today")
					},
					{
						value: "all",
						label: n("clear.all")
					}
				]
			},
			{
				name: "pages",
				type: "checkbox",
				label: n("clear.pages"),
				value: !0
			},
			{
				name: "sessions",
				type: "checkbox",
				label: n("clear.sessions"),
				value: !0
			}
		],
		buttons: ["cancel", {
			value: "clear",
			label: n("clear.do"),
			danger: !0
		}]
	});
	if (t?.button !== "clear") return;
	let r = /* @__PURE__ */ new Date();
	r.setHours(0, 0, 0, 0);
	let a = {
		hour: Date.now() - 36e5,
		today: r.getTime(),
		all: 0
	}[t.values.range] ?? 0;
	i.clear({
		since: a,
		pages: !!t.values.pages,
		sessions: !!t.values.sessions
	});
}
export { g as clearHistory, h as openOptions };
