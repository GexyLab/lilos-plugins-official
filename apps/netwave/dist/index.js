import { r as e } from "./browser-DmwxbmZ7.js";
var t = 2048, n = 1024, r = (e, r = n) => Number.isFinite(e) ? Math.min(t, Math.max(16, Math.round(e))) : r;
function i(e, t, { size: i = n } = {}) {
	e.handle(async (e) => typeof e?.file == "string" ? t(e.file, r(e.size, i)) : null);
}
async function a(e, t = .85) {
	let n = e;
	typeof n?.toBlob != "function" && (n = document.createElement("canvas"), n.width = Math.max(1, e.width), n.height = Math.max(1, e.height), n.getContext("2d").drawImage(e, 0, 0));
	let r = (e) => new Promise((r) => n.toBlob(r, e, t)), i = await r("image/webp");
	return i?.type === "image/webp" ? i : r("image/png");
}
// src/netwave/preview.js
var o = "#1f8fbf";
function s(e) {
	let t = JSON.parse(String(e).slice(0, 2 << 20));
	if (t?.format !== "netwave-session" || !Array.isArray(t.tabs)) throw Error("not a session");
	return t;
}
var c = (e) => {
	try {
		return new URL(e).host.replace(/^www\./, "");
	} catch {
		return "";
	}
};
function l({ lilos: e }) {
	i(e, async (t, n) => {
		let r;
		try {
			r = s(await e.files.read(t));
		} catch {
			return null;
		}
		let i = [...new Set(r.tabs.map((e) => c(e?.url)).filter(Boolean))], o = i.slice(0, 4).join(" · ") + (i.length > 4 ? " …" : "");
		return {
			image: await a(u(r.tabs.length, n), .9),
			note: [typeof r.name == "string" ? r.name.slice(0, 120) : "", o].filter(Boolean).join(" — ")
		};
	}, { size: 512 });
}
function u(e, t) {
	let n = document.createElement("canvas");
	n.width = n.height = t;
	let r = n.getContext("2d"), i = t / 100;
	r.fillStyle = o, r.fillRect(14 * i, 10 * i, 72 * i, 72 * i), r.fillStyle = "#ffffff", r.globalAlpha = .55, r.fillRect(24 * i, 24 * i, 14 * i, 7 * i), r.fillRect(40 * i, 24 * i, 14 * i, 7 * i), r.globalAlpha = 1, r.fillRect(56 * i, 24 * i, 20 * i, 7 * i), r.fillRect(24 * i, 31 * i, 52 * i, 36 * i), r.strokeStyle = o, r.lineWidth = 3 * i, r.lineCap = "round", r.beginPath(), r.moveTo(30 * i, 52 * i), r.bezierCurveTo(38 * i, 40 * i, 44 * i, 64 * i, 50 * i, 52 * i), r.bezierCurveTo(56 * i, 40 * i, 62 * i, 64 * i, 70 * i, 52 * i), r.stroke();
	let a = String(e);
	r.font = `700 ${13 * i}px system-ui, "Segoe UI", sans-serif`;
	let s = r.measureText(a).width + 10 * i, c = 86 * i - s / 2, l = 74 * i, u = 19 * i;
	return r.fillStyle = "#ffffff", r.fillRect(c - 1.5 * i, l - 1.5 * i, s + 3 * i, u + 3 * i), r.fillStyle = "#d6eef8", r.fillRect(c, l, s, u), r.fillStyle = "#0f5f80", r.textBaseline = "middle", r.fillText(a, c + 5 * i, l + u / 2 + .5 * i), n;
}
// src/netwave/NetWaveApp.js
function d({ args: t, openWindow: n } = {}) {
	return e(t ?? {}, n);
}
export { d as default, l as filePreview };
