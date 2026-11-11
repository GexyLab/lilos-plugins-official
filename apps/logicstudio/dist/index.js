import * as e from "/host/sdk.js";
import { Emitter as t, LOGIC_EXTENSIONS as n, LOGIC_FORMATS as r, LogicCanvas as i, LogicConsoleView as a, LogicConsoles as o, LogicProject as s, LogicSchema as c, LogicUI as l, LogicWindow as u, Window as d, actionButton as f, appIcon as p, checkbox as m, fs as h, h as g, icon as _, kernel as ee, linkKey as te, logic as v, markdown as ne, messageBox as y, openMenu as b, portsOf as x, radios as re, resizeHandle as ie, selectField as S, storage as C, textField as w, typesMatch as ae } from "/host/sdk.js";
import * as T from "/host/system.js";
import { launch as oe, openFile as se, pickFile as E } from "/host/system.js";
// src/shared/TabBar.js
var ce = class extends t {
	#e;
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = [];
	#i = null;
	#a = null;
	#o;
	#s;
	constructor({ t: e, signal: t, label: n = "", newLabel: r = null, newButton: i = !0, reorder: a = !0, dragStart: o = null, className: s = "" } = {}) {
		super(), this.#e = e, this.#o = a, this.#s = o, this.list = g("div", {
			class: "sh-tabs",
			role: "tablist",
			"aria-label": n || null
		}), this.start = g("div", { class: "sh-tabbar-slot" }), this.end = g("div", { class: "sh-tabbar-slot end" });
		let c = r ?? e("shared.tabs.new");
		this.newButton = i ? g("button", {
			class: "sh-tabbar-btn sh-tab-new",
			type: "button",
			title: c,
			"aria-label": c,
			onclick: () => this.emit("new")
		}, _("plus")) : null, this.el = g("div", { class: ["sh-tabbar", s].filter(Boolean).join(" ") }, this.start, this.list, this.newButton, this.end), this.start.hidden = this.end.hidden = !0, this.list.addEventListener("pointerdown", (e) => this.#f(e), { signal: t }), this.list.addEventListener("auxclick", (e) => {
			let t = e.target.closest(".sh-tab");
			e.button === 1 && t && (e.preventDefault(), this.emit("close", t.dataset.key));
		}, { signal: t }), this.list.addEventListener("mousedown", (e) => {
			e.button === 1 && e.preventDefault();
		}, { signal: t }), this.el.addEventListener("dblclick", (e) => {
			(e.target === this.list || e.target === this.el) && this.emit("new");
		}, { signal: t }), this.list.addEventListener("contextmenu", (e) => {
			let t = e.target.closest(".sh-tab");
			t && (e.preventDefault(), this.emit("menu", {
				key: t.dataset.key,
				x: e.clientX,
				y: e.clientY
			}));
		}, { signal: t }), this.list.addEventListener("wheel", (e) => {
			!e.deltaY || Math.abs(e.deltaX) > Math.abs(e.deltaY) || (e.preventDefault(), this.list.scrollLeft += e.deltaY);
		}, {
			signal: t,
			passive: !1
		}), this.list.addEventListener("keydown", (e) => this.#d(e), { signal: t });
		let l = new ResizeObserver(() => this.#c());
		l.observe(this.list), t?.addEventListener("abort", () => l.disconnect());
	}
	render(e, t) {
		let n = e.map((e) => e.key);
		for (let [e, t] of this.#t) n.includes(e) || (t.remove(), this.#t.delete(e), this.#n.delete(e));
		for (let n of e) {
			let e = this.#t.get(n.key);
			e || (e = this.#l(n.key), this.#t.set(n.key, e)), this.#u(e, n, this.#n.get(n.key), n.key === t), this.#n.set(n.key, n);
		}
		n.join("\n") !== this.#r.join("\n") && (this.list.append(...n.map((e) => this.#t.get(e))), this.#r = n), t !== this.#i && (this.#i = t, this.#c());
	}
	setSlots({ start: e, end: t } = {}) {
		e !== void 0 && (this.start.replaceChildren(...[e ?? []].flat().filter(Boolean)), this.start.hidden = !this.start.childElementCount), t !== void 0 && (this.end.replaceChildren(...[t ?? []].flat().filter(Boolean)), this.end.hidden = !this.end.childElementCount);
	}
	focus() {
		this.#t.get(this.#i)?.focus({ preventScroll: !0 });
	}
	tabElement(e) {
		return this.#t.get(e) ?? null;
	}
	#c() {
		let e = this.#t.get(this.#i);
		if (!e) return;
		let { offsetLeft: t, offsetWidth: n } = e;
		t < this.list.scrollLeft ? this.list.scrollLeft = t : t + n > this.list.scrollLeft + this.list.clientWidth && (this.list.scrollLeft = t + n - this.list.clientWidth);
	}
	#l(e) {
		let t = g("button", {
			class: "sh-tab-close",
			type: "button",
			tabindex: "-1"
		}, _("x"));
		return t.addEventListener("click", (t) => {
			t.stopPropagation(), this.emit("close", e);
		}), t.addEventListener("pointerdown", (e) => e.stopPropagation()), g("div", {
			class: "sh-tab",
			role: "tab",
			dataset: { key: e }
		}, g("span", {
			class: "sh-tab-icon",
			hidden: !0
		}), g("span", { class: "sh-tab-name" }), g("span", {
			class: "sh-tab-detail",
			hidden: !0
		}), g("span", {
			class: "sh-tab-act",
			hidden: !0
		}), t);
	}
	#u(e, t, n, r) {
		e.className = [
			"sh-tab",
			r && "on",
			t.dirty && "dirty",
			t.class,
			e.classList.contains("dragging") && "dragging"
		].filter(Boolean).join(" "), e.setAttribute("aria-selected", String(r)), e.tabIndex = r ? 0 : -1, e.title = t.title ?? t.label;
		let [i, a, o, s, c] = e.children;
		t.icon !== n?.icon && (i.replaceChildren(...t.icon == null ? [] : [typeof t.icon == "string" ? _(t.icon) : t.icon]), i.hidden = t.icon == null), a.textContent !== t.label && (a.textContent = t.label), o.textContent = t.detail ?? "", o.hidden = !t.detail, s.hidden = !t.activity, s.title = typeof t.activity == "string" ? t.activity : "";
		let l = t.closeLabel ?? this.#e("shared.tabs.close", { name: t.label }), u = t.closeTitle ?? l;
		c.getAttribute("aria-label") !== l && c.setAttribute("aria-label", l), c.title !== u && (c.title = u);
	}
	#d(e) {
		let t = e.target.closest?.(".sh-tab");
		if (!t) return;
		let n = this.#r.indexOf(t.dataset.key), r = {
			ArrowLeft: n - 1,
			ArrowRight: n + 1,
			Home: 0,
			End: this.#r.length - 1
		}[e.key];
		if (r !== void 0) {
			e.preventDefault();
			let t = this.#r[Math.max(0, Math.min(this.#r.length - 1, r))];
			this.emit("select", t), this.#t.get(t)?.focus({ preventScroll: !0 });
		} else if (e.key === "Delete") e.preventDefault(), this.emit("close", t.dataset.key);
		else if (e.key === "ContextMenu" || e.key === "F10" && e.shiftKey) {
			e.preventDefault();
			let n = t.getBoundingClientRect();
			this.emit("menu", {
				key: t.dataset.key,
				x: n.left,
				y: n.bottom + 2
			});
		} else (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.emit("select", t.dataset.key));
	}
	#f(e) {
		let t = e.target.closest(".sh-tab");
		if (!t || e.button !== 0) return;
		let n = t.dataset.key;
		if (this.emit("select", n), this.#s) return this.#s(e, n);
		if (!this.#o) return;
		this.#a = {
			key: n,
			el: t,
			startX: e.clientX,
			moved: !1,
			index: this.#r.indexOf(n)
		};
		let r = (t) => {
			t.pointerId === e.pointerId && this.#p(t);
		}, i = (t) => {
			t.pointerId === e.pointerId && (removeEventListener("pointermove", r), removeEventListener("pointerup", i), removeEventListener("pointercancel", i), this.#m());
		};
		addEventListener("pointermove", r), addEventListener("pointerup", i), addEventListener("pointercancel", i);
	}
	#p(e) {
		let t = this.#a;
		if (!t || !t.moved && Math.abs(e.clientX - t.startX) < 5) return;
		t.moved = !0, t.el.classList.add("dragging");
		let n = this.#r.filter((e) => e !== t.key).map((e) => this.#t.get(e)), r = n.findIndex((t) => {
			let n = t.getBoundingClientRect();
			return e.clientX < n.left + n.width / 2;
		});
		r === -1 && (r = n.length), r !== t.index && (t.index = r, this.list.insertBefore(t.el, n[r] ?? null));
		let i = this.list.getBoundingClientRect();
		e.clientX < i.left + 16 ? this.list.scrollLeft -= 8 : e.clientX > i.right - 16 && (this.list.scrollLeft += 8);
	}
	#m() {
		let e = this.#a;
		this.#a = null, e?.moved && (e.el.classList.remove("dragging"), this.list.append(...this.#r.map((e) => this.#t.get(e))), e.index !== this.#r.indexOf(e.key) && this.emit("move", {
			key: e.key,
			index: e.index
		}));
	}
};
// src/shared/i18n.js
function le(t, n) {
	if (e.locale) return e.locale.forApp(t).i18n;
	let r = {
		...n.en.strings,
		...n.it?.strings
	}, i = (e, t) => !!e && Object.hasOwn(e, t), a = (e, t) => e.replace(/\{(\w+)\}/g, (e, n) => i(t, n) ? String(t[n]) : e), o = new Intl.PluralRules("it");
	return {
		t: (e, t) => {
			let n = i(r, e) ? r[e] : void 0;
			if (n === void 0) return String(e);
			if (typeof n == "string") return a(n, t);
			let s = Number(i(t, "n") ? t.n : 0);
			return a(s === 0 && n.zero ? n.zero : n[o.select(s)] ?? n.other, t);
		},
		lang: "it",
		date: (e, t) => new Intl.DateTimeFormat("it-IT", t).format(e instanceof Date ? e : new Date(e)),
		number: (e, t) => new Intl.NumberFormat("it-IT", t).format(e)
	};
}
// src/logicstudio/i18n.js
var D = le("logicstudio", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"Logic Studio IDE\",\"@description\":\"Logic blocks linked together, as in OpenBack: schemas, projects with windows made of UI components, consoles. The engine runs them in lilOS, also with lilOS closed.\",\"app.name\":\"Logic Studio IDE\",\"tabs.label\":\"Open editors\",\"tabs.home\":\"Home\",\"tabs.map\":\"{name} · Map\",\"left.project\":\"Project\",\"left.blocks\":\"Blocks\",\"left.components\":\"Components\",\"left.resize\":\"Resize the panel\",\"side.collapse\":\"Hide the panel\",\"side.expand\":\"Show the panel\",\"block.obsolete\":\"Obsolete block: it still works, but it is no longer in the list of blocks.\",\"common.save\":\"Save\",\"common.create\":\"Create\",\"common.ok\":\"OK\",\"tb.save\":\"Save\",\"tb.undo\":\"Undo (Ctrl+Z)\",\"tb.redo\":\"Redo (Ctrl+Y)\",\"tb.test\":\"Test\",\"tb.stop\":\"Stop\",\"tb.activate\":\"Activate\",\"tb.activateHint\":\"Run the saved project as an active program: it goes on with lilOS closed\",\"tb.map\":\"Map\",\"tb.home\":\"Home\",\"empty.text\":\"No open tabs.\",\"tb.options\":\"Project options\",\"tb.fit\":\"Fit\",\"tb.zoomIn\":\"Zoom in\",\"tb.zoomOut\":\"Zoom out\",\"tb.zoomReset\":\"Actual size\",\"tb.align\":\"Align\",\"tb.alignHint\":\"Line up the selected blocks, horizontally or vertically (select at least 2)\",\"align.left\":\"Left edges\",\"align.center\":\"Centres (horizontally)\",\"align.right\":\"Right edges\",\"align.spreadX\":\"Spread horizontally\",\"align.top\":\"Top edges\",\"align.middle\":\"Middles (vertically)\",\"align.bottom\":\"Bottom edges\",\"align.spreadY\":\"Spread vertically\",\"status.engine\":\"Logic Studio Engine · {n} packages\",\"status.noEngine\":\"The engine does not answer\",\"status.project\":\"Project {name}\",\"status.single\":\"A schema alone\",\"status.schema\":\"Blocks {blocks} / {maxBlocks} · links {links} / {maxLinks} · {zoom}%\",\"status.map\":\"{schemas} schemas · {windows} windows · {links} links between schemas\",\"open.uiAlone\":\"This window is not in a project\",\"open.uiAloneText\":\"A window (.lsui) opens with its project: no .lsproj was found in its folder or above.\",\"open.failed\":\"It could not be opened\",\"open.pick\":\"Open a project or a schema\",\"new.title\":\"New project\",\"new.text\":\"The project is a folder in «{folder}», with the folders schemi, ui and risorse.\",\"new.folder\":\"Logic Studio\",\"new.name\":\"Name\",\"new.default\":\"My project\",\"new.create\":\"Create\",\"close.unsaved\":\"«{name}» has changes not saved\",\"close.unsavedText\":\"If you do not save them, they are lost.\",\"close.discard\":\"Do not save\",\"close.project\":\"The project «{name}» has changes not saved\",\"close.saveAll\":\"Save all\",\"save.failed\":\"Saving failed\",\"ws.gone\":\"The file is not there any more\",\"ws.notLogic\":\"It is not a project (.lsproj) or a schema (.lsch) of Logic Studio\",\"ws.noName\":\"The project needs a name\",\"ws.missingFile\":\"The file {path} is missing\",\"ws.nameTaken\":\"The project already has an element called «{name}»\",\"ws.newFolder\":\"New folder\",\"explorer.none\":\"Open or create a project from Home.\",\"group.schemas\":\"Schemas\",\"group.windows\":\"Windows\",\"group.resources\":\"Resources\",\"explorer.new.schemas\":\"New schema\",\"explorer.new.windows\":\"New window\",\"explorer.new.resources\":\"Add a resource\",\"explorer.newFolder\":\"New folder\",\"explorer.open\":\"Open\",\"explorer.rename\":\"Rename\",\"explorer.remove\":\"Remove\",\"explorer.makeMain\":\"Make it the main window\",\"explorer.main\":\"Main window: opens from the apps menu\",\"explorer.unsaved\":\"Not saved\",\"explorer.name\":\"Name\",\"explorer.badName\":\"A name without / \\\\ : * ? \\\" < > |\",\"explorer.failed\":\"It could not be done\",\"explorer.removeItem\":\"Remove «{name}»?\",\"explorer.removeItemText\":\"It goes to the trash. Its links in the project are removed.\",\"explorer.removeFolder\":\"Remove the folder «{name}»?\",\"explorer.removeFolderText\":\"It goes to the trash with everything inside.\",\"entry.none\":\"Opens only from other windows of the app\",\"entry.file\":\"Opens a type of file\",\"entry.action\":\"Item in the menu of files\",\"entry.call\":\"Called by other apps\",\"entry.login\":\"When the user signs in\",\"entry.main\":\"Apps menu (main window)\",\"entry.extPlaceholder\":\"Extensions: csv, txt\",\"entry.label\":\"Label\",\"cat.blocks.value\":\"Values\",\"cat.blocks.constMath\":\"Math constants\",\"cat.blocks.constPhysics\":\"Physical constants\",\"cat.blocks.constAstro\":\"Astronomical constants\",\"cat.blocks.logic\":\"Logic\",\"cat.blocks.math\":\"Math\",\"cat.blocks.text\":\"Text\",\"cat.blocks.object\":\"Objects\",\"cat.blocks.list\":\"Lists\",\"cat.blocks.matrix\":\"Matrices\",\"cat.blocks.units\":\"Unit conversions\",\"cat.blocks.signal\":\"Signals\",\"cat.blocks.geometry\":\"Geometry\",\"cat.blocks.trig\":\"Trigonometry\",\"cat.blocks.functions\":\"Functions\",\"cat.blocks.integrals\":\"Integrals\",\"cat.blocks.analysis\":\"Numerical analysis\",\"cat.blocks.hardware\":\"Hardware\",\"cat.blocks.time\":\"Time\",\"cat.blocks.console\":\"Console\",\"cat.blocks.schema\":\"Schema ports\",\"cat.blocks.ui\":\"UI components\",\"cat.blocks.lilos\":\"lilOS\",\"cat.blocks.net\":\"Network\",\"cat.blocks.db\":\"Databases\",\"cat.blocks.exception\":\"Exceptions\",\"cat.blocks.other\":\"Other\",\"cat.components.text\":\"Text\",\"cat.components.values\":\"Text and values\",\"cat.components.commands\":\"Commands\",\"cat.components.containers\":\"Containers\",\"cat.components.charts\":\"Charts\",\"cat.components.other\":\"Other\",\"cat.blocks.draw\":\"Drawing\",\"cat.components.draw\":\"Drawing\",\"menu.editText\":\"Write the text\",\"inspector.drawingHint\":\"A drawing on the schema: it has no ports and the program does not run it. Drag its corner to resize it; double click on it to write its text.\",\"field.themeColor\":\"theme colour\",\"field.pickColor\":\"Choose a colour\",\"palette.search\":\"Search…\",\"palette.empty\":\"No package installed\",\"palette.noMatch\":\"Nothing found\",\"palette.noEngine\":\"The engine of Logic Studio does not answer\",\"palette.collapse\":\"Collapse\",\"palette.expand\":\"Expand\",\"palette.collapseAll\":\"Collapse all\",\"palette.expandAll\":\"Expand all\",\"palette.collapseSubs\":\"Collapse the groups of this category\",\"palette.expandSubs\":\"Expand the groups of this category\",\"palette.otherSub\":\"Others\",\"port.error\":\"Exception\",\"block.missing\":\"The package is missing\",\"block.missingText\":\"This block ({type}) comes from a package that is not installed. Install it from the AppStore, or remove the block.\",\"limit.blocks\":\"At most {n} blocks per schema\",\"menu.duplicate\":\"Duplicate\",\"menu.label\":\"Label…\",\"menu.labelText\":\"A name for this block, shown on it instead of its kind.\",\"menu.openWindow\":\"Open its window\",\"menu.removeBlock\":\"Remove the block\",\"menu.removeBlocks\":{\"one\":\"Remove the block\",\"other\":\"Remove {n} blocks\"},\"menu.removeLink\":\"Remove the link\",\"menu.addHere\":\"Add a block here\",\"menu.selectAll\":\"Select all\",\"inspector.title\":\"Properties\",\"inspector.nothing\":\"Nothing selected\",\"inspector.many\":{\"one\":\"1 block selected\",\"other\":\"{n} blocks selected\"},\"inspector.links\":{\"one\":\"1 link selected\",\"other\":\"{n} links selected\"},\"inspector.schema\":\"Schema\",\"inspector.name\":\"Name\",\"inspector.blocks\":\"Blocks\",\"inspector.schemaPorts\":\"Schema ports\",\"inspector.noSchemaPorts\":\"No ports: add a Parameter (schema input) or Return (schema output) block to link this schema to the others of the project.\",\"inspector.schemaHint\":\"Schemas of a project are linked only through their schema ports, in the map.\",\"inspector.label\":\"Label\",\"inspector.settings\":\"Settings\",\"inspector.ports\":\"Ports\",\"inspector.block\":\"Block\",\"inspector.inputs\":\"Inputs\",\"inspector.outputs\":\"Outputs\",\"inspector.addInput\":\"Add input\",\"inspector.addOutput\":\"Add output\",\"inspector.addedCount\":\"Added: {n} of {max}\",\"inspector.basePort\":\"Base port: it cannot be removed\",\"inspector.ofComponent\":\"of the component\",\"inspector.up\":\"Move up\",\"inspector.down\":\"Move down\",\"inspector.removePort\":\"Remove\",\"inspector.hidePort\":\"Hide on the drawing\",\"inspector.showPort\":\"Show on the drawing\",\"inspector.linkedPort\":\"Linked: it cannot be hidden\",\"inspector.starts\":\"starts it\",\"inspector.startValue\":\"at start\",\"inspector.removeQ\":\"Remove the port «{name}»?\",\"inspector.removeLinks\":{\"one\":\"It has 1 link, which is removed too. Ctrl+Z puts them back.\",\"other\":\"It has {n} links, which are removed too. Ctrl+Z puts them back.\"},\"inspector.aloneHint\":\"In a project, this port can be linked to other schemas in the map.\",\"inspector.projectLinks\":\"Links in the project\",\"inspector.noProjectLinks\":\"Not linked yet: link it in the map.\",\"inspector.unlink\":\"Unlink\",\"inspector.secretSaved\":\"Saved, encrypted: type to change it\",\"inspector.secretEmpty\":\"Not set\",\"inspector.secretClear\":\"Clear\",\"inspector.secretFailed\":\"The password was not saved: {message}\",\"inspector.inMap\":\"In the map\",\"inspector.component\":\"UI component\",\"inspector.componentAlone\":\"A schema alone has no windows.\",\"inspector.window\":\"Window\",\"inspector.componentName\":\"Component\",\"type.number\":\"number\",\"opt.type.number\":\"number\",\"type.bool\":\"yes/no\",\"opt.type.bool\":\"yes/no\",\"type.text\":\"text\",\"opt.type.text\":\"text\",\"type.object\":\"object\",\"opt.type.object\":\"object\",\"type.list\":\"list\",\"opt.type.list\":\"list\",\"type.matrix\":\"matrix\",\"opt.type.matrix\":\"matrix\",\"type.any\":\"any\",\"opt.type.any\":\"any\",\"type.pulse\":\"pulse\",\"opt.type.pulse\":\"pulse\",\"opt.op.eq\":\"a = b\",\"opt.op.ne\":\"a ≠ b\",\"opt.op.gt\":\"a > b\",\"opt.op.ge\":\"a ≥ b\",\"opt.op.lt\":\"a < b\",\"opt.op.le\":\"a ≤ b\",\"opt.op.min\":\"minimum\",\"opt.op.max\":\"maximum\",\"opt.op.avg\":\"average\",\"opt.op.abs\":\"absolute value\",\"opt.op.round\":\"round\",\"opt.op.floor\":\"round down\",\"opt.op.ceil\":\"round up\",\"opt.op.sqrt\":\"square root\",\"opt.op.neg\":\"change sign\",\"opt.op.sin\":\"sine\",\"opt.op.cos\":\"cosine\",\"opt.op.log\":\"natural log\",\"opt.op.exp\":\"exponential\",\"opt.op.upper\":\"UPPER CASE\",\"opt.op.lower\":\"lower case\",\"opt.op.trim\":\"trim spaces\",\"opt.op.length\":\"length\",\"opt.op.contains\":\"contains\",\"opt.op.replace\":\"replace\",\"opt.op.sum\":\"sum\",\"opt.level.normal\":\"normal\",\"opt.level.info\":\"information\",\"opt.level.warning\":\"warning\",\"opt.level.error\":\"error\",\"opt.format.text\":\"text\",\"opt.format.json\":\"readable JSON\",\"opt.kind.number\":\"number\",\"opt.kind.text\":\"text\",\"opt.kind.bool\":\"yes/no\",\"opt.kind.json\":\"JSON\",\"opt.kind.key\":\"a key\",\"opt.to.number\":\"number\",\"opt.to.text\":\"text\",\"opt.to.bool\":\"yes/no\",\"opt.to.json\":\"JSON text\",\"opt.to.parse\":\"from JSON text\",\"opt.order.asc\":\"ascending\",\"opt.order.desc\":\"descending\",\"opt.where.append\":\"at the end\",\"opt.where.prepend\":\"at the start\",\"kind.text\":\"text\",\"kind.number\":\"number\",\"kind.bool\":\"yes/no\",\"kind.key\":\"a key\",\"kind.test\":\"Test\",\"kind.active\":\"Active\",\"state.starting\":\"Starting\",\"state.running\":\"Running\",\"state.stopped\":\"Stopped\",\"state.failed\":\"Stopped by an error\",\"state.waiting\":\"Waiting for a package\",\"console.main\":\"Main\",\"console.mainHint\":\"The main console: it is always there and gets the exceptions no block handles\",\"console.asking\":\"Waiting for an answer\",\"console.detach\":\"Detach\",\"console.expand\":\"Show the panel\",\"console.collapse\":\"Hide the panel\",\"console.add\":\"New console\",\"console.idle\":\"Test the project to see its consoles here.\",\"console.hint\":\"Enter sends · Esc cancels\",\"console.windowTitle\":\"Console {name}\",\"problems.title\":\"Problems\",\"problems.none\":\"No problems\",\"problems.missingBlock\":\"The block {block} ({type}) comes from a package that is not installed\",\"problems.noWindow\":\"The block {block} stands for a component of the window «{window}», which is not there\",\"problems.noComponent\":\"The block {block} stands for the component «{component}», which is not there\",\"problems.noPortName\":\"A schema port has no name\",\"problems.noMain\":\"The project has windows but no main window\",\"run.testing\":\"Testing {time}\",\"run.saveFirst\":\"Save before activating?\",\"run.saveFirstText\":\"An active program runs the saved project.\",\"run.alreadyActive\":\"«{name}» is already active\",\"run.alreadyActiveText\":\"The active program stops and starts again with the project as it is now.\",\"run.replace\":\"Replace\",\"run.activated\":\"«{name}» is active\",\"run.activatedText\":\"It runs in lilOS also with this window and lilOS closed, until you stop it from Home.\",\"cat.blocks.program\":\"Program\",\"tb.args\":\"Arguments\",\"tb.argsSet\":\"Arguments ●\",\"tb.argsHint\":\"The command line of the tests (read by the blocks Arguments and Option)\",\"args.title\":\"Arguments of the tests\",\"args.text\":\"As if the program were run with lilos logic run FILE followed by these. Spaces separate them; put one with spaces between quotes.\",\"args.label\":\"Arguments\",\"args.placeholder\":\"e.g. report.csv --verbose --port=8080 -o \\\"My file.txt\\\"\",\"args.save\":\"Keep\",\"run.closed\":\"Closed by the program with the value {value}\",\"home.intro\":\"Logic blocks linked together: data go along the links and each block does something with them. A project groups schemas and windows; the engine runs it in lilOS.\",\"home.new\":\"New project\",\"home.open\":\"Open…\",\"home.recent\":\"Recent\",\"home.noRecent\":\"No project opened yet\",\"home.programs\":\"My programs\",\"home.noPrograms\":\"Nothing running: test a project, or activate it\",\"home.noEngine\":\"The engine of Logic Studio (module logicstudio-engine) is not installed or does not answer.\",\"home.appstore\":\"Open the AppStore\",\"home.colName\":\"Program\",\"home.colKind\":\"Kind\",\"home.colState\":\"State\",\"home.colSince\":\"Since\",\"home.openProject\":\"Open the project\",\"home.stop\":\"Stop\",\"home.forget\":\"Remove\",\"home.stopQ\":\"Stop «{name}»?\",\"home.stopText\":\"It does not start again with lilOS until you activate it again.\",\"home.usage\":\"What I use\",\"usage.active\":\"Active programs\",\"usage.tests\":\"Tests\",\"usage.net\":\"Network requests this minute\",\"usage.log\":\"Log\",\"usage.cpuMem\":\"At most {cpu}% of the CPU and {mem} MB of memory for all my programs.\",\"map.objectsIn\":\"{n} components · objects in {list}\",\"map.noObjects\":\"{n} components · no object in the schemas\",\"map.project\":\"Project\",\"map.main\":\"Main window\",\"map.links\":\"Links between schemas\",\"map.noLinks\":\"No links yet\",\"map.hint\":\"Drag from an output of a schema to an input of another to link them. Windows are reached through the objects of their components in the schemas.\",\"options.title\":\"Project options\",\"options.general\":\"General\",\"options.windows\":\"Windows\",\"options.consoles\":\"Consoles\",\"options.app\":\"The app and its windows\",\"options.name\":\"Name\",\"options.version\":\"Version\",\"options.versionHint\":\"Three numbers: 1.0.0\",\"options.description\":\"Description\",\"options.windowsHint\":\"lilOS opens the windows of the project. The main window is required: it opens from the apps menu.\",\"options.noWindows\":\"The project has no windows yet.\",\"options.main\":\"Main window\",\"options.mainHint\":\"It can be changed, never removed.\",\"options.window\":\"Window\",\"options.opensFrom\":\"Opens from\",\"options.unlinkedHint\":\"A window with no entry point opens only from another window of the app (a button with «Open a window»).\",\"options.consoleList\":\"Consoles of the project\",\"options.consoleName\":\"Name\",\"options.color\":\"Color\",\"options.keep\":\"Lines kept\",\"options.mainConsole\":\"fixed: renamed, never removed\",\"options.remove\":\"Remove\",\"options.removeHint\":\"Removing a console, its blocks write to the main one.\",\"options.newConsole\":\"Console {n}\",\"options.removeConsoleQ\":\"Remove the console «{name}»?\",\"options.outside\":\"Outside the IDE\",\"outside.all\":\"Show them all\",\"outside.all.hint\":\"each console opens in a window when the project starts\",\"outside.onInput\":\"Only when they ask for something\",\"outside.onInput.hint\":\"a console opens when an Input (readline) block waits\",\"outside.hidden\":\"Do not show them\",\"outside.hidden.hint\":\"nothing on screen: lines go to the log as «Copy to the log» says, questions get their default value\",\"outside.main\":\"All in the main console\",\"outside.main.hint\":\"one window, each line with the name of its console\",\"options.details\":\"Details\",\"options.closeAfter\":\"Close the console after the answer\",\"options.notify\":\"A notification when a console asks for something and the project has no windows open\",\"options.copyToLog\":\"Copy to the log of the project\",\"log.none\":\"nothing\",\"log.warnings\":\"warnings and errors\",\"log.all\":\"every line\",\"options.mainOpens\":\"With «All in the main console», the main one opens\",\"mainOpens.start\":\"when the project starts\",\"mainOpens.onInput\":\"when it asks for something\",\"options.consoleQuota\":\"Lines kept in memory count in your memory quota; lines copied to the log count in your log quota.\",\"options.appHint\":\"What the windows of the project share while it runs: also in the app made from it.\",\"options.keepValues\":\"A window opened again shows the last values at once\",\"options.keepValuesHint\":\"The engine keeps the last value sent to each component.\",\"options.syncCopies\":\"Copies of the same window stay in step\",\"options.syncCopiesHint\":\"The same window open on two devices shows the same values; a change on one shows on the other.\",\"options.commandsHint\":\"Buttons, switches and sliders send something only when someone uses them in an open window: nothing is pressed again when a window opens.\",\"status.window\":\"{n} components / {max} · {w} × {h}\",\"window.design\":\"Design\",\"window.preview\":\"Preview\",\"window.previewOf\":\"Preview\",\"window.window\":\"Window\",\"window.title\":\"Title\",\"window.width\":\"Width (px)\",\"window.height\":\"Height (px)\",\"window.resizable\":\"The user can resize it\",\"window.resize\":\"Drag to resize the window\",\"window.resizeHint\":\"Or drag the right edge, the bottom edge or the corner of the window. The size is that of its content, without the title bar.\",\"window.opening\":\"When it opens\",\"window.state\":\"State\",\"window.state.normal\":\"Normal\",\"window.state.maximized\":\"Maximized\",\"window.modal\":\"Dialog\",\"window.modalHint\":\"While it is open, the other windows of the app opened before it cannot be used: a click on them brings this one forward.\",\"window.onTop\":\"Always on top\",\"window.flag.modal\":\"Dialog\",\"window.flag.onTop\":\"On top\",\"window.opens\":\"Opens from\",\"window.hint\":\"Add components from the palette on the left: a click puts it into the container selected, dragging puts it where the blue line shows.\",\"window.missing\":\"This component ({type}) comes from a package that is not installed.\",\"window.portsHint\":\"← what a schema sets, → what the user does. The schemas reach the component through its object.\",\"window.object\":\"Object in a schema\",\"window.openObject\":\"Open it in the schema\",\"window.noObject\":\"No schema has its object yet: without it the component shows and does nothing.\",\"window.inSchema\":\"In the schema\",\"window.makeObject\":\"Make its object\",\"window.askTitle\":\"Where does the logic block of «{name}» go?\",\"window.askText\":\"Every UI component has its object in a schema: the other blocks of that schema link to it. You can also make it later in Properties.\",\"window.newSchema\":\"New schema…\",\"window.later\":\"Later\",\"window.remove\":\"Remove the component\",\"window.removeQ\":\"Remove the component?\",\"window.removeObject\":\"Its object in the schema «{schema}» stays there and shows an error until you remove it too.\",\"limit.components\":\"At most {n} components per window\",\"action.none\":\"Nothing\",\"action.open\":\"Open a window\",\"action.close\":\"Close this window\",\"action.hint\":\"It also sends «pressed» to its object in the schema.\",\"opt.size.small\":\"small\",\"opt.size.normal\":\"normal\",\"opt.size.title\":\"title\",\"opt.align.start\":\"start\",\"opt.align.center\":\"center\",\"opt.align.end\":\"end\",\"opt.align.stretch\":\"stretch\",\"opt.variant.primary\":\"primary\",\"opt.variant.normal\":\"normal\",\"opt.variant.danger\":\"danger\",\"opt.color.green\":\"green\",\"opt.color.red\":\"red\",\"opt.color.yellow\":\"yellow\",\"opt.color.blue\":\"blue\",\"opt.fit.contain\":\"whole image\",\"opt.fit.cover\":\"fill the space\",\"opt.kind.date\":\"date\",\"opt.kind.time\":\"time\",\"opt.kind.datetime-local\":\"date and time\",\"opt.kind.file\":\"a file\",\"opt.kind.folder\":\"a folder\",\"opt.kind.line\":\"line\",\"opt.kind.space\":\"space\",\"home.openWindow\":\"Open its window\",\"tb.createApp\":\"Make app…\",\"tb.createAppHint\":\"Make a lilOS app from the project, and run it\",\"app.title\":\"Make an app from «{name}»\",\"app.text\":\"The app has the windows of the project and uses the engine of this lilOS. For now it is not installed: it runs from its folder, only for you, while its windows are open.\",\"app.where\":\"The package goes into {folder}<id>: open its .lsapp file to run it again.\",\"app.folder\":\"Apps made\",\"app.id\":\"Id\",\"app.badId\":\"Lower-case letters, digits and -, starting with a letter\",\"app.version\":\"Version\",\"app.description\":\"Description\",\"app.icon\":\"Icon\",\"app.color\":\"Color\",\"app.color.green\":\"green\",\"app.color.blue\":\"blue\",\"app.color.violet\":\"violet\",\"app.color.teal\":\"teal\",\"app.color.orange\":\"orange\",\"app.color.red\":\"red\",\"app.create\":\"Make\",\"app.createRun\":\"Make and run\",\"app.needsLilos\":\"Running apps made from projects needs lilOS 1.37.0 or later\",\"app.done\":\"«{name}» is ready\",\"app.doneText\":\"The package is in {path}. Open its .lsapp file to run it.\",\"app.failed\":\"The app could not be made\",\"app.appName\":\"Name of the app\",\"kind.app\":\"App (not installed)\",\"kind.cli\":\"Command line\",\"tb.docs\":\"Documentation\",\"menu.docs\":\"Documentation\",\"menu.docsSchema\":\"Documentation of the schema editor\",\"menu.docsWindow\":\"Documentation of the window editor\",\"menu.openObject\":\"Show its object in the schema\",\"palette.add\":\"Add\",\"docs.title\":\"Logic Studio documentation\",\"docs.back\":\"Back (Alt+←)\",\"docs.forward\":\"Forward (Alt+→)\",\"docs.home\":\"Start page\",\"docs.search\":\"Search the documentation\",\"docs.contents\":\"Contents\",\"docs.loading\":\"Loading…\",\"docs.failed\":\"The page could not be read: {error}\",\"docs.missingTitle\":\"Page not found\",\"docs.missingType\":\"«{name}» ({type}) has no documentation page yet.\",\"docs.missing\":\"There is no page at «{address}».\",\"docs.packIndex\":\"Go to the package's page\",\"docs.ide\":\"Guide to the IDE\",\"docs.overview\":\"Overview\",\"docs.noResults\":\"Nothing found.\",\"group.run\":\"Run\",\"group.name\":\"Group\",\"group.blocks\":\"{n} blocks\",\"group.thread\":\"Thread\",\"group.collapse\":\"Collapse\",\"group.expand\":\"Expand\",\"group.runOff\":\"Nothing is linked to Run: the blocks of the group do not start\",\"group.runOn\":\"Run is linked ({n}): at every pulse the group starts again, from its blocks that go by themselves (such as Value)\",\"group.runInside\":\"Inside the group, Run sends its pulse to {n} ports\",\"group.make\":\"Group\",\"group.addTo\":\"Add to group\",\"group.takeOut\":\"Take out of the group\",\"group.rename\":\"Rename group\",\"group.threadToggle\":\"Run in a thread of its own\",\"group.ungroup\":\"Ungroup\",\"group.remove\":\"Remove the group and its blocks\",\"group.manySel\":\"{blocks} blocks and {groups} groups selected\",\"group.collapsedField\":\"Collapsed into one block\",\"group.threadField\":\"Run in a thread of its own\",\"group.threadHint\":\"The blocks of the group run apart from the rest of the program: a slow block does not slow down the others. Each thread has half of your memory quota.\",\"group.threadNo\":\"Schema inputs and outputs and UI objects cannot be in a group with a thread of its own: the engine refuses the schema.\",\"group.exposed\":\"Exposed ports\",\"group.noExposed\":\"No port exposed: nothing outside the group reaches its blocks.\",\"group.exposeHint\":\"To expose a port, link it from outside the group, or use the button beside its eye in the properties of the block.\",\"group.expose\":\"Expose outside the group\",\"group.unexpose\":\"Do not expose\",\"group.unexposeQ\":\"Stop exposing «{name}»?\",\"group.inGroup\":\"In the group «{name}»\",\"group.show\":\"Show the group\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"Logic Studio IDE\",\"@description\":\"Blocchi logici collegati tra loro, come in OpenBack: schemi, progetti con finestre fatte di componenti UI, console. Il motore li fa girare in lilOS, anche a lilOS chiuso.\",\"app.name\":\"Logic Studio IDE\",\"tabs.label\":\"Editor aperti\",\"tabs.home\":\"Home\",\"tabs.map\":\"{name} · Mappa\",\"left.project\":\"Progetto\",\"left.blocks\":\"Blocchi\",\"left.components\":\"Componenti\",\"left.resize\":\"Ridimensiona il pannello\",\"side.collapse\":\"Nascondi il pannello\",\"side.expand\":\"Mostra il pannello\",\"block.obsolete\":\"Blocco obsoleto: funziona ancora, ma non è più nell'elenco dei blocchi.\",\"common.save\":\"Salva\",\"common.create\":\"Crea\",\"common.ok\":\"OK\",\"tb.save\":\"Salva\",\"tb.undo\":\"Annulla (Ctrl+Z)\",\"tb.redo\":\"Ripeti (Ctrl+Y)\",\"tb.test\":\"Prova\",\"tb.stop\":\"Ferma\",\"tb.activate\":\"Attiva\",\"tb.activateHint\":\"Fa girare il progetto salvato come programma attivo: va avanti anche a lilOS chiuso\",\"tb.map\":\"Mappa\",\"tb.home\":\"Home\",\"empty.text\":\"Nessuna scheda aperta.\",\"tb.options\":\"Opzioni del progetto\",\"tb.fit\":\"Adatta\",\"tb.zoomIn\":\"Ingrandisci\",\"tb.zoomOut\":\"Rimpicciolisci\",\"tb.zoomReset\":\"Dimensione reale\",\"tb.align\":\"Allinea\",\"tb.alignHint\":\"Mette in fila i blocchi selezionati, in orizzontale o in verticale (selezionane almeno 2)\",\"align.left\":\"Bordi a sinistra\",\"align.center\":\"Centri (in orizzontale)\",\"align.right\":\"Bordi a destra\",\"align.spreadX\":\"Distribuisci in orizzontale\",\"align.top\":\"Bordi in alto\",\"align.middle\":\"Centri (in verticale)\",\"align.bottom\":\"Bordi in basso\",\"align.spreadY\":\"Distribuisci in verticale\",\"status.engine\":\"Logic Studio Engine · {n} pacchetti\",\"status.noEngine\":\"Il motore non risponde\",\"status.project\":\"Progetto {name}\",\"status.single\":\"Uno schema da solo\",\"status.schema\":\"Blocchi {blocks} / {maxBlocks} · collegamenti {links} / {maxLinks} · {zoom}%\",\"status.map\":\"{schemas} schemi · {windows} finestre · {links} collegamenti tra schemi\",\"open.uiAlone\":\"Questa finestra non è in un progetto\",\"open.uiAloneText\":\"Una finestra (.lsui) si apre con il suo progetto: nella sua cartella e in quelle sopra non c'è un .lsproj.\",\"open.failed\":\"Non si è potuto aprire\",\"open.pick\":\"Apri un progetto o uno schema\",\"new.title\":\"Nuovo progetto\",\"new.text\":\"Il progetto è una cartella in «{folder}», con le cartelle schemi, ui e risorse.\",\"new.folder\":\"Logic Studio\",\"new.name\":\"Nome\",\"new.default\":\"Il mio progetto\",\"new.create\":\"Crea\",\"close.unsaved\":\"«{name}» ha modifiche non salvate\",\"close.unsavedText\":\"Se non le salvi, si perdono.\",\"close.discard\":\"Non salvare\",\"close.project\":\"Il progetto «{name}» ha modifiche non salvate\",\"close.saveAll\":\"Salva tutto\",\"save.failed\":\"Salvataggio non riuscito\",\"ws.gone\":\"Il file non c'è più\",\"ws.notLogic\":\"Non è un progetto (.lsproj) o uno schema (.lsch) di Logic Studio\",\"ws.noName\":\"Il progetto ha bisogno di un nome\",\"ws.missingFile\":\"Manca il file {path}\",\"ws.nameTaken\":\"Il progetto ha già un elemento che si chiama «{name}»\",\"ws.newFolder\":\"Nuova cartella\",\"explorer.none\":\"Apri o crea un progetto dalla Home.\",\"group.schemas\":\"Schemi\",\"group.windows\":\"Finestre\",\"group.resources\":\"Risorse\",\"explorer.new.schemas\":\"Nuovo schema\",\"explorer.new.windows\":\"Nuova finestra\",\"explorer.new.resources\":\"Aggiungi una risorsa\",\"explorer.newFolder\":\"Nuova cartella\",\"explorer.open\":\"Apri\",\"explorer.rename\":\"Rinomina\",\"explorer.remove\":\"Elimina\",\"explorer.makeMain\":\"Rendila la finestra main\",\"explorer.main\":\"Finestra main: si apre dal menu applicazioni\",\"explorer.unsaved\":\"Non salvato\",\"explorer.name\":\"Nome\",\"explorer.badName\":\"Un nome senza / \\\\ : * ? \\\" < > |\",\"explorer.failed\":\"Non si è potuto fare\",\"explorer.removeItem\":\"Eliminare «{name}»?\",\"explorer.removeItemText\":\"Va nel cestino. I suoi collegamenti nel progetto vengono tolti.\",\"explorer.removeFolder\":\"Eliminare la cartella «{name}»?\",\"explorer.removeFolderText\":\"Va nel cestino con tutto quello che contiene.\",\"entry.none\":\"Si apre solo da altre finestre dell'app\",\"entry.file\":\"Apre un tipo di file\",\"entry.action\":\"Voce nel menu dei file\",\"entry.call\":\"Chiamata da altre app\",\"entry.login\":\"All'ingresso dell'utente\",\"entry.main\":\"Menu applicazioni (finestra main)\",\"entry.extPlaceholder\":\"Estensioni: csv, txt\",\"entry.label\":\"Etichetta\",\"cat.blocks.value\":\"Valori\",\"cat.blocks.constMath\":\"Costanti matematiche\",\"cat.blocks.constPhysics\":\"Costanti fisiche\",\"cat.blocks.constAstro\":\"Costanti astronomiche\",\"cat.blocks.logic\":\"Logica\",\"cat.blocks.math\":\"Matematica\",\"cat.blocks.text\":\"Testo\",\"cat.blocks.object\":\"Oggetti\",\"cat.blocks.list\":\"Liste\",\"cat.blocks.matrix\":\"Matrici\",\"cat.blocks.units\":\"Conversioni unità di misura\",\"cat.blocks.signal\":\"Segnali\",\"cat.blocks.geometry\":\"Geometria\",\"cat.blocks.trig\":\"Trigonometria\",\"cat.blocks.functions\":\"Funzioni\",\"cat.blocks.integrals\":\"Integrali\",\"cat.blocks.analysis\":\"Analisi numerica\",\"cat.blocks.hardware\":\"Hardware\",\"cat.blocks.time\":\"Tempo\",\"cat.blocks.console\":\"Console\",\"cat.blocks.schema\":\"Porte di schema\",\"cat.blocks.ui\":\"Componenti UI\",\"cat.blocks.lilos\":\"lilOS\",\"cat.blocks.net\":\"Rete\",\"cat.blocks.db\":\"Database\",\"cat.blocks.exception\":\"Eccezioni\",\"cat.blocks.other\":\"Altro\",\"cat.components.text\":\"Testo\",\"cat.components.values\":\"Testo e valori\",\"cat.components.commands\":\"Comandi\",\"cat.components.containers\":\"Contenitori\",\"cat.components.charts\":\"Grafici\",\"cat.components.other\":\"Altro\",\"cat.blocks.draw\":\"Disegno\",\"cat.components.draw\":\"Disegno\",\"menu.editText\":\"Scrivi il testo\",\"inspector.drawingHint\":\"Un disegno sullo schema: non ha porte e il programma non lo esegue. Trascina il suo angolo per ridimensionarlo; doppio clic per scriverne il testo.\",\"field.themeColor\":\"colore del tema\",\"field.pickColor\":\"Scegli un colore\",\"palette.search\":\"Cerca…\",\"palette.empty\":\"Nessun pacchetto installato\",\"palette.noMatch\":\"Non c'è niente\",\"palette.noEngine\":\"Il motore di Logic Studio non risponde\",\"palette.collapse\":\"Comprimi\",\"palette.expand\":\"Espandi\",\"palette.collapseAll\":\"Comprimi tutte\",\"palette.expandAll\":\"Espandi tutte\",\"palette.collapseSubs\":\"Comprimi i gruppi di questa categoria\",\"palette.expandSubs\":\"Espandi i gruppi di questa categoria\",\"palette.otherSub\":\"Altri\",\"port.error\":\"Exception\",\"block.missing\":\"Manca il pacchetto\",\"block.missingText\":\"Questo blocco ({type}) viene da un pacchetto che non è installato. Installalo dall'AppStore, o togli il blocco.\",\"limit.blocks\":\"Al massimo {n} blocchi per schema\",\"menu.duplicate\":\"Duplica\",\"menu.label\":\"Etichetta…\",\"menu.labelText\":\"Un nome per questo blocco, che si vede al posto del suo tipo.\",\"menu.openWindow\":\"Apri la sua finestra\",\"menu.removeBlock\":\"Elimina il blocco\",\"menu.removeBlocks\":{\"one\":\"Elimina il blocco\",\"other\":\"Elimina {n} blocchi\"},\"menu.removeLink\":\"Elimina il collegamento\",\"menu.addHere\":\"Aggiungi un blocco qui\",\"menu.selectAll\":\"Seleziona tutto\",\"inspector.title\":\"Proprietà\",\"inspector.nothing\":\"Niente di selezionato\",\"inspector.many\":{\"one\":\"1 blocco selezionato\",\"other\":\"{n} blocchi selezionati\"},\"inspector.links\":{\"one\":\"1 collegamento selezionato\",\"other\":\"{n} collegamenti selezionati\"},\"inspector.schema\":\"Schema\",\"inspector.name\":\"Nome\",\"inspector.blocks\":\"Blocchi\",\"inspector.schemaPorts\":\"Porte di schema\",\"inspector.noSchemaPorts\":\"Nessuna porta: aggiungi un blocco Parametro (ingresso di schema) o Return (uscita di schema) per collegare questo schema agli altri del progetto.\",\"inspector.schemaHint\":\"Gli schemi di un progetto si collegano solo con le loro porte di schema, nella mappa.\",\"inspector.label\":\"Etichetta\",\"inspector.settings\":\"Impostazioni\",\"inspector.ports\":\"Porte\",\"inspector.block\":\"Blocco\",\"inspector.inputs\":\"Ingressi\",\"inspector.outputs\":\"Uscite\",\"inspector.addInput\":\"Aggiungi ingresso\",\"inspector.addOutput\":\"Aggiungi uscita\",\"inspector.addedCount\":\"Aggiunte: {n} di {max}\",\"inspector.basePort\":\"Porta di base: non si toglie\",\"inspector.ofComponent\":\"della componente\",\"inspector.up\":\"Sposta su\",\"inspector.down\":\"Sposta giù\",\"inspector.removePort\":\"Togli\",\"inspector.hidePort\":\"Nascondi nel disegno\",\"inspector.showPort\":\"Mostra nel disegno\",\"inspector.linkedPort\":\"Collegata: non si può nascondere\",\"inspector.starts\":\"lo avvia\",\"inspector.startValue\":\"iniziale\",\"inspector.removeQ\":\"Togliere la porta «{name}»?\",\"inspector.removeLinks\":{\"one\":\"Ha 1 collegamento, che viene tolto. Ctrl+Z li rimette.\",\"other\":\"Ha {n} collegamenti, che vengono tolti. Ctrl+Z li rimette.\"},\"inspector.aloneHint\":\"In un progetto, questa porta si collega agli altri schemi nella mappa.\",\"inspector.projectLinks\":\"Collegamenti nel progetto\",\"inspector.noProjectLinks\":\"Non ancora collegata: collegala nella mappa.\",\"inspector.unlink\":\"Scollega\",\"inspector.secretSaved\":\"Salvata, cifrata: scrivi per cambiarla\",\"inspector.secretEmpty\":\"Non impostata\",\"inspector.secretClear\":\"Cancella\",\"inspector.secretFailed\":\"La password non è stata salvata: {message}\",\"inspector.inMap\":\"Nella mappa\",\"inspector.component\":\"Componente UI\",\"inspector.componentAlone\":\"Uno schema da solo non ha finestre.\",\"inspector.window\":\"Finestra\",\"inspector.componentName\":\"Componente\",\"type.number\":\"numero\",\"opt.type.number\":\"numero\",\"type.bool\":\"sì/no\",\"opt.type.bool\":\"sì/no\",\"type.text\":\"testo\",\"opt.type.text\":\"testo\",\"type.object\":\"oggetto\",\"opt.type.object\":\"oggetto\",\"type.list\":\"lista\",\"opt.type.list\":\"lista\",\"type.matrix\":\"matrice\",\"opt.type.matrix\":\"matrice\",\"type.any\":\"qualsiasi\",\"opt.type.any\":\"qualsiasi\",\"type.pulse\":\"impulso\",\"opt.type.pulse\":\"impulso\",\"opt.op.eq\":\"a = b\",\"opt.op.ne\":\"a ≠ b\",\"opt.op.gt\":\"a > b\",\"opt.op.ge\":\"a ≥ b\",\"opt.op.lt\":\"a < b\",\"opt.op.le\":\"a ≤ b\",\"opt.op.min\":\"minimo\",\"opt.op.max\":\"massimo\",\"opt.op.avg\":\"media\",\"opt.op.abs\":\"valore assoluto\",\"opt.op.round\":\"arrotonda\",\"opt.op.floor\":\"arrotonda per difetto\",\"opt.op.ceil\":\"arrotonda per eccesso\",\"opt.op.sqrt\":\"radice quadrata\",\"opt.op.neg\":\"cambia segno\",\"opt.op.sin\":\"seno\",\"opt.op.cos\":\"coseno\",\"opt.op.log\":\"logaritmo naturale\",\"opt.op.exp\":\"esponenziale\",\"opt.op.upper\":\"MAIUSCOLO\",\"opt.op.lower\":\"minuscolo\",\"opt.op.trim\":\"togli gli spazi ai lati\",\"opt.op.length\":\"lunghezza\",\"opt.op.contains\":\"contiene\",\"opt.op.replace\":\"sostituisci\",\"opt.op.sum\":\"somma\",\"opt.level.normal\":\"normale\",\"opt.level.info\":\"informazione\",\"opt.level.warning\":\"avviso\",\"opt.level.error\":\"errore\",\"opt.format.text\":\"testo\",\"opt.format.json\":\"JSON leggibile\",\"opt.kind.number\":\"numero\",\"opt.kind.text\":\"testo\",\"opt.kind.bool\":\"sì/no\",\"opt.kind.json\":\"JSON\",\"opt.kind.key\":\"un tasto\",\"opt.to.number\":\"numero\",\"opt.to.text\":\"testo\",\"opt.to.bool\":\"sì/no\",\"opt.to.json\":\"testo JSON\",\"opt.to.parse\":\"da testo JSON\",\"opt.order.asc\":\"crescente\",\"opt.order.desc\":\"decrescente\",\"opt.where.append\":\"in fondo\",\"opt.where.prepend\":\"all'inizio\",\"kind.text\":\"testo\",\"kind.number\":\"numero\",\"kind.bool\":\"sì/no\",\"kind.key\":\"un tasto\",\"kind.test\":\"Prova\",\"kind.active\":\"Attivo\",\"state.starting\":\"Si avvia\",\"state.running\":\"In esecuzione\",\"state.stopped\":\"Fermo\",\"state.failed\":\"Fermo per un errore\",\"state.waiting\":\"Aspetta un pacchetto\",\"console.main\":\"Principale\",\"console.mainHint\":\"La console principale: c'è sempre e riceve le eccezioni che nessun blocco gestisce\",\"console.asking\":\"Aspetta una risposta\",\"console.detach\":\"Stacca\",\"console.expand\":\"Mostra il pannello\",\"console.collapse\":\"Nascondi il pannello\",\"console.add\":\"Nuova console\",\"console.idle\":\"Prova il progetto per vedere qui le sue console.\",\"console.hint\":\"Invio manda · Esc annulla\",\"console.windowTitle\":\"Console {name}\",\"problems.title\":\"Problemi\",\"problems.none\":\"Nessun problema\",\"problems.missingBlock\":\"Il blocco {block} ({type}) viene da un pacchetto che non è installato\",\"problems.noWindow\":\"Il blocco {block} rappresenta una componente della finestra «{window}», che non c'è\",\"problems.noComponent\":\"Il blocco {block} rappresenta la componente «{component}», che non c'è\",\"problems.noPortName\":\"Una porta di schema non ha nome\",\"problems.noMain\":\"Il progetto ha finestre ma nessuna finestra main\",\"run.testing\":\"Prova in corso {time}\",\"run.saveFirst\":\"Salvare prima di attivare?\",\"run.saveFirstText\":\"Un programma attivo fa girare il progetto salvato.\",\"run.alreadyActive\":\"«{name}» è già attivo\",\"run.alreadyActiveText\":\"Il programma attivo si ferma e riparte con il progetto com'è adesso.\",\"run.replace\":\"Sostituisci\",\"run.activated\":\"«{name}» è attivo\",\"run.activatedText\":\"Gira in lilOS anche con questa finestra e lilOS chiusi, finché non lo fermi dalla Home.\",\"cat.blocks.program\":\"Programma\",\"tb.args\":\"Argomenti\",\"tb.argsSet\":\"Argomenti ●\",\"tb.argsHint\":\"La riga di comando delle prove (la leggono i blocchi Argomenti e Opzione)\",\"args.title\":\"Argomenti delle prove\",\"args.text\":\"Come se il programma partisse con lilos logic run FILE seguito da questi. Gli spazi li separano; uno con degli spazi va tra virgolette.\",\"args.label\":\"Argomenti\",\"args.placeholder\":\"per esempio report.csv --verbose --port=8080 -o \\\"Il mio file.txt\\\"\",\"args.save\":\"Tieni\",\"run.closed\":\"Chiuso dal programma con il valore {value}\",\"home.intro\":\"Blocchi logici collegati tra loro: i dati passano sui collegamenti e ogni blocco ci fa qualcosa. Un progetto riunisce schemi e finestre; il motore lo fa girare in lilOS.\",\"home.new\":\"Nuovo progetto\",\"home.open\":\"Apri…\",\"home.recent\":\"Recenti\",\"home.noRecent\":\"Nessun progetto aperto finora\",\"home.programs\":\"I miei programmi\",\"home.noPrograms\":\"Niente in esecuzione: prova un progetto, o attivalo\",\"home.noEngine\":\"Il motore di Logic Studio (modulo logicstudio-engine) non è installato o non risponde.\",\"home.appstore\":\"Apri l'AppStore\",\"home.colName\":\"Programma\",\"home.colKind\":\"Tipo\",\"home.colState\":\"Stato\",\"home.colSince\":\"Da\",\"home.openProject\":\"Apri il progetto\",\"home.stop\":\"Ferma\",\"home.forget\":\"Togli\",\"home.stopQ\":\"Fermare «{name}»?\",\"home.stopText\":\"Non riparte con lilOS finché non lo attivi di nuovo.\",\"home.usage\":\"Quello che uso\",\"usage.active\":\"Programmi attivi\",\"usage.tests\":\"Prove\",\"usage.net\":\"Richieste di rete in questo minuto\",\"usage.log\":\"Registro\",\"usage.cpuMem\":\"Al massimo il {cpu}% della CPU e {mem} MB di memoria per tutti i miei programmi.\",\"map.objectsIn\":\"{n} componenti · oggetti in {list}\",\"map.noObjects\":\"{n} componenti · nessun oggetto negli schemi\",\"map.project\":\"Progetto\",\"map.main\":\"Finestra main\",\"map.links\":\"Collegamenti tra schemi\",\"map.noLinks\":\"Nessun collegamento\",\"map.hint\":\"Trascina da un'uscita di uno schema a un ingresso di un altro per collegarli. Le finestre si raggiungono con gli oggetti delle loro componenti negli schemi.\",\"options.title\":\"Opzioni del progetto\",\"options.general\":\"Generale\",\"options.windows\":\"Finestre\",\"options.consoles\":\"Console\",\"options.app\":\"L'app e le sue finestre\",\"options.name\":\"Nome\",\"options.version\":\"Versione\",\"options.versionHint\":\"Tre numeri: 1.0.0\",\"options.description\":\"Descrizione\",\"options.windowsHint\":\"Le finestre del progetto le apre lilOS. La finestra main è obbligatoria: si apre dal menu applicazioni.\",\"options.noWindows\":\"Il progetto non ha ancora finestre.\",\"options.main\":\"Finestra main\",\"options.mainHint\":\"Si cambia, non si toglie.\",\"options.window\":\"Finestra\",\"options.opensFrom\":\"Si apre da\",\"options.unlinkedHint\":\"Una finestra senza punto d'ingresso si apre solo da un'altra finestra dell'app (un pulsante con «Apri una finestra»).\",\"options.consoleList\":\"Console del progetto\",\"options.consoleName\":\"Nome\",\"options.color\":\"Colore\",\"options.keep\":\"Righe tenute\",\"options.mainConsole\":\"fissa: si rinomina, non si toglie\",\"options.remove\":\"Togli\",\"options.removeHint\":\"Togliendo una console, i suoi blocchi passano alla principale.\",\"options.newConsole\":\"Console {n}\",\"options.removeConsoleQ\":\"Togliere la console «{name}»?\",\"options.outside\":\"Fuori dall'IDE\",\"outside.all\":\"Mostrale tutte\",\"outside.all.hint\":\"ogni console si apre in una finestra quando parte il progetto\",\"outside.onInput\":\"Solo quando chiedono un dato\",\"outside.onInput.hint\":\"una console si apre quando un blocco Input (readline) aspetta\",\"outside.hidden\":\"Non mostrarle\",\"outside.hidden.hint\":\"niente sullo schermo: le righe vanno nel registro come dice «Copia nel registro», le domande prendono il valore predefinito\",\"outside.main\":\"Tutte nella console principale\",\"outside.main.hint\":\"una finestra, ogni riga con il nome della sua console\",\"options.details\":\"Dettagli\",\"options.closeAfter\":\"Chiudi la console dopo la risposta\",\"options.notify\":\"Una notifica quando una console chiede un dato e il progetto non ha finestre aperte\",\"options.copyToLog\":\"Copia nel registro del progetto\",\"log.none\":\"niente\",\"log.warnings\":\"avvisi ed errori\",\"log.all\":\"tutte le righe\",\"options.mainOpens\":\"Con «Tutte nella principale», la principale si apre\",\"mainOpens.start\":\"all'avvio\",\"mainOpens.onInput\":\"quando chiede un dato\",\"options.consoleQuota\":\"Le righe tenute in memoria contano nella tua quota di memoria; quelle copiate nel registro nella quota del registro.\",\"options.appHint\":\"Cosa condividono le finestre del progetto mentre gira: anche nell'app fatta da questo progetto.\",\"options.keepValues\":\"Una finestra riaperta mostra subito gli ultimi valori\",\"options.keepValuesHint\":\"Il motore tiene l'ultimo valore mandato a ogni componente.\",\"options.syncCopies\":\"Le copie della stessa finestra restano allineate\",\"options.syncCopiesHint\":\"La stessa finestra aperta su due dispositivi mostra gli stessi valori; un cambiamento su una si vede sull'altra.\",\"options.commandsHint\":\"Pulsanti, interruttori e cursori mandano qualcosa solo quando qualcuno li usa in una finestra aperta: quando una finestra si apre non viene «ripremuto» niente.\",\"status.window\":\"{n} componenti / {max} · {w} × {h}\",\"window.design\":\"Progetta\",\"window.preview\":\"Anteprima\",\"window.previewOf\":\"Anteprima\",\"window.window\":\"Finestra\",\"window.title\":\"Titolo\",\"window.width\":\"Larghezza (px)\",\"window.height\":\"Altezza (px)\",\"window.resizable\":\"L'utente può ridimensionarla\",\"window.resize\":\"Trascina per ridimensionare la finestra\",\"window.resizeHint\":\"Oppure trascina il bordo destro, il bordo in basso o l'angolo della finestra. La dimensione è quella del contenuto, senza la barra del titolo.\",\"window.opening\":\"All'apertura\",\"window.state\":\"Stato\",\"window.state.normal\":\"Normale\",\"window.state.maximized\":\"Estesa\",\"window.modal\":\"Finestra di dialogo\",\"window.modalHint\":\"Finché è aperta, le altre finestre dell'app aperte prima non si possono usare: un clic su di loro porta avanti questa.\",\"window.onTop\":\"Sempre in primo piano\",\"window.flag.modal\":\"Dialogo\",\"window.flag.onTop\":\"In primo piano\",\"window.opens\":\"Si apre da\",\"window.hint\":\"Aggiungi le componenti dalla tavolozza a sinistra: un clic la mette nel contenitore selezionato, trascinandola va dove mostra la linea blu.\",\"window.missing\":\"Questa componente ({type}) viene da un pacchetto che non è installato.\",\"window.portsHint\":\"← quello che imposta uno schema, → quello che fa l'utente. Gli schemi raggiungono la componente con il suo oggetto.\",\"window.object\":\"Oggetto nello schema\",\"window.openObject\":\"Aprilo nello schema\",\"window.noObject\":\"Nessuno schema ha ancora il suo oggetto: senza, la componente si vede ma non fa niente.\",\"window.inSchema\":\"Nello schema\",\"window.makeObject\":\"Crea il suo oggetto\",\"window.askTitle\":\"In quale schema va il blocco logico di «{name}»?\",\"window.askText\":\"Ogni componente UI ha il suo oggetto in uno schema: gli altri blocchi di quello schema si collegano a lui. Puoi crearlo anche dopo, in Proprietà.\",\"window.newSchema\":\"Nuovo schema…\",\"window.later\":\"Dopo\",\"window.remove\":\"Elimina la componente\",\"window.removeQ\":\"Eliminare la componente?\",\"window.removeObject\":\"Il suo oggetto nello schema «{schema}» resta lì e segna un errore finché non togli anche quello.\",\"limit.components\":\"Al massimo {n} componenti per finestra\",\"action.none\":\"Niente\",\"action.open\":\"Apri una finestra\",\"action.close\":\"Chiudi questa finestra\",\"action.hint\":\"Manda anche «premuto» al suo oggetto nello schema.\",\"opt.size.small\":\"piccolo\",\"opt.size.normal\":\"normale\",\"opt.size.title\":\"titolo\",\"opt.align.start\":\"inizio\",\"opt.align.center\":\"centro\",\"opt.align.end\":\"fine\",\"opt.align.stretch\":\"tutta la larghezza\",\"opt.variant.primary\":\"principale\",\"opt.variant.normal\":\"normale\",\"opt.variant.danger\":\"pericolo\",\"opt.color.green\":\"verde\",\"opt.color.red\":\"rosso\",\"opt.color.yellow\":\"giallo\",\"opt.color.blue\":\"blu\",\"opt.fit.contain\":\"tutta l'immagine\",\"opt.fit.cover\":\"riempi lo spazio\",\"opt.kind.date\":\"data\",\"opt.kind.time\":\"ora\",\"opt.kind.datetime-local\":\"data e ora\",\"opt.kind.file\":\"un file\",\"opt.kind.folder\":\"una cartella\",\"opt.kind.line\":\"linea\",\"opt.kind.space\":\"spazio\",\"home.openWindow\":\"Apri la finestra\",\"tb.createApp\":\"Crea app…\",\"tb.createAppHint\":\"Fa un'app di lilOS dal progetto, e la esegue\",\"app.title\":\"Crea un'app da «{name}»\",\"app.text\":\"L'app ha le finestre del progetto e usa il motore di questo lilOS. Per ora non si installa: gira dalla sua cartella, solo per te, mentre le sue finestre sono aperte.\",\"app.where\":\"Il pacchetto va in {folder}<id>: apri il suo file .lsapp per eseguirla di nuovo.\",\"app.folder\":\"App create\",\"app.id\":\"Id\",\"app.badId\":\"Lettere minuscole, cifre e -, iniziando con una lettera\",\"app.version\":\"Versione\",\"app.description\":\"Descrizione\",\"app.icon\":\"Icona\",\"app.color\":\"Colore\",\"app.color.green\":\"verde\",\"app.color.blue\":\"blu\",\"app.color.violet\":\"viola\",\"app.color.teal\":\"verde acqua\",\"app.color.orange\":\"arancione\",\"app.color.red\":\"rosso\",\"app.create\":\"Crea\",\"app.createRun\":\"Crea ed esegui\",\"app.needsLilos\":\"Eseguire le app fatte dai progetti richiede lilOS 1.37.0 o successivo\",\"app.done\":\"«{name}» è pronta\",\"app.doneText\":\"Il pacchetto è in {path}. Apri il suo file .lsapp per eseguirla.\",\"app.failed\":\"Non si è potuta creare l'app\",\"app.appName\":\"Nome dell'app\",\"kind.app\":\"App (non installata)\",\"kind.cli\":\"Riga di comando\",\"tb.docs\":\"Documentazione\",\"menu.docs\":\"Documentazione\",\"menu.docsSchema\":\"Documentazione dell'editor degli schemi\",\"menu.docsWindow\":\"Documentazione dell'editor delle finestre\",\"menu.openObject\":\"Mostra il suo oggetto nello schema\",\"palette.add\":\"Aggiungi\",\"docs.title\":\"Documentazione di Logic Studio\",\"docs.back\":\"Indietro (Alt+←)\",\"docs.forward\":\"Avanti (Alt+→)\",\"docs.home\":\"Pagina iniziale\",\"docs.search\":\"Cerca nella documentazione\",\"docs.contents\":\"Indice\",\"docs.loading\":\"Caricamento…\",\"docs.failed\":\"Non è stato possibile leggere la pagina: {error}\",\"docs.missingTitle\":\"Pagina non trovata\",\"docs.missingType\":\"«{name}» ({type}) non ha ancora una pagina di documentazione.\",\"docs.missing\":\"Non c'è nessuna pagina all'indirizzo «{address}».\",\"docs.packIndex\":\"Vai alla pagina del pacchetto\",\"docs.ide\":\"Guida dell'IDE\",\"docs.overview\":\"Panoramica\",\"docs.noResults\":\"Nessun risultato.\",\"group.run\":\"Run\",\"group.name\":\"Gruppo\",\"group.blocks\":\"{n} blocchi\",\"group.thread\":\"Thread\",\"group.collapse\":\"Comprimi\",\"group.expand\":\"Espandi\",\"group.runOff\":\"Run non è collegata: i blocchi del gruppo non partono\",\"group.runOn\":\"Run è collegata ({n}): a ogni impulso il gruppo riparte, dai blocchi che partono da soli (come Valore)\",\"group.runInside\":\"Dentro il gruppo, Run manda il suo impulso a {n} porte\",\"group.make\":\"Raggruppa\",\"group.addTo\":\"Aggiungi al gruppo\",\"group.takeOut\":\"Togli dal gruppo\",\"group.rename\":\"Rinomina il gruppo\",\"group.threadToggle\":\"Esegui in un thread a parte\",\"group.ungroup\":\"Sciogli il gruppo\",\"group.remove\":\"Elimina il gruppo e i suoi blocchi\",\"group.manySel\":\"{blocks} blocchi e {groups} gruppi selezionati\",\"group.collapsedField\":\"Compresso in un blocco\",\"group.threadField\":\"Esegui in un thread a parte\",\"group.threadHint\":\"I blocchi del gruppo girano a parte dal resto del programma: un blocco lento non rallenta gli altri. Ogni thread ha metà della tua quota di memoria.\",\"group.threadNo\":\"Ingressi e Uscite di schema e oggetti della UI non possono stare in un gruppo con un thread a parte: il motore rifiuta lo schema.\",\"group.exposed\":\"Porte esposte\",\"group.noExposed\":\"Nessuna porta esposta: niente fuori dal gruppo raggiunge i suoi blocchi.\",\"group.exposeHint\":\"Per esporre una porta collegala da fuori del gruppo, oppure usa il pulsante accanto al suo occhio nelle proprietà del blocco.\",\"group.expose\":\"Esponi fuori dal gruppo\",\"group.unexpose\":\"Non esporre\",\"group.unexposeQ\":\"Non esporre più «{name}»?\",\"group.inGroup\":\"Nel gruppo «{name}»\",\"group.show\":\"Mostra il gruppo\"}}")
}), { t: O } = D, k = Object.freeze([
	{
		key: "schemas",
		folder: "schemi",
		ext: n.schema
	},
	{
		key: "windows",
		folder: "ui",
		ext: n.window
	},
	{
		key: "resources",
		folder: "risorse",
		ext: null
	}
]), A = (e) => e.includes(".") ? e.slice(e.lastIndexOf(".") + 1).toLowerCase() : "", j = (e) => e.includes(".") ? e.slice(0, e.lastIndexOf(".")) : e, ue = class e extends t {
	project = null;
	projectFile = null;
	folder = null;
	single = null;
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new Map();
	static async open(t) {
		let r = h.get(t);
		if (!r) throw Error(O("ws.gone"));
		let i = new e(), a = A(r.name);
		if (a === n.project) i.project = s.parse(await h.read(t)), i.projectFile = t, i.folder = r.parent, i.#n(i.project, t), await i.#r();
		else if (a === n.schema) {
			i.single = t, i.folder = r.parent;
			let e = c.parse(await h.read(t));
			i.#e.set(r.name, e), i.#n(e, t);
		} else throw Error(O("ws.notLogic"));
		return i;
	}
	static async create(e, t) {
		let n = h.cleanName(String(t ?? ""));
		if (!n) throw Error(O("ws.noName"));
		let r = h.uniqueName(e, n), i = h.create(e, {
			type: "folder",
			name: r
		});
		for (let e of k) h.create(i.id, {
			type: "folder",
			name: e.folder
		});
		let a = s.create(r), o = c.create("main"), l = u.create(r), d = h.create(M(i.id, "schemi").id, {
			type: "file",
			name: "main.lsch"
		}), f = h.create(M(i.id, "ui").id, {
			type: "file",
			name: "Principale.lsui"
		});
		await h.write(d.id, o.toText()), await h.write(f.id, l.toText()), a.edit("init", (e) => {
			e.schemas = { main: "schemi/main.lsch" }, e.windows = { Principale: "ui/Principale.lsui" }, e.main = "Principale";
		}, { record: !1 });
		let p = h.create(i.id, {
			type: "file",
			name: `${r}.lsproj`
		});
		return await h.write(p.id, a.toText()), p.id;
	}
	get name() {
		return this.project?.data.name ?? j(h.get(this.single)?.name ?? "");
	}
	get groups() {
		return k.map((e) => ({
			...e,
			folder: this.project ? M(this.folder, e.folder)?.id ?? null : null
		}));
	}
	get dirty() {
		return !!this.project?.dirty || [...this.#e.values()].some((e) => e.dirty);
	}
	relative(e) {
		let t = h.ancestors(e), n = t.findIndex((e) => e.id === this.folder);
		return n < 0 ? null : t.slice(n + 1).map((e) => e.name).join("/");
	}
	nodeAt(e) {
		let t = this.folder;
		for (let n of String(e).split("/").filter(Boolean)) if (t = M(t, n)?.id, !t) return null;
		return h.get(t);
	}
	kindOf(e) {
		let t = A(e);
		return t === n.schema ? "schemas" : t === n.window ? "windows" : null;
	}
	nameOf(e, t) {
		return Object.entries(this.project?.data[e] ?? {}).find(([, e]) => e === t)?.[0] ?? null;
	}
	async doc(e) {
		if (this.#e.has(e)) return this.#e.get(e);
		let t = this.single ? h.get(this.single) : this.nodeAt(e);
		if (!t) throw Error(O("ws.missingFile", { path: e }));
		let n = await h.read(t.id), r = this.kindOf(t.name) === "windows" ? u.parse(n) : c.parse(n);
		return this.#e.set(e, r), this.#n(r, t.id), r;
	}
	loaded(e) {
		return this.#e.get(e) ?? null;
	}
	fileOf(e) {
		return this.#t.get(e) ?? null;
	}
	#n(e, t) {
		this.#t.set(e, t), e.on("change", () => this.emit("dirty", { doc: e })), e.on("saved", () => this.emit("dirty", { doc: e }));
	}
	async save(e) {
		let t = this.#t.get(e);
		if (!t || !h.exists(t)) throw Error(O("ws.gone"));
		await h.write(t, e.toText()), e.markSaved();
	}
	async saveAll() {
		for (let e of this.#e.values()) e.dirty && await this.save(e);
		this.project?.dirty && await this.save(this.project);
	}
	async documents() {
		if (this.single) {
			let e = this.#e.values().next().value;
			return {
				project: null,
				schemas: { [e.data.name || "schema"]: e.toJSON() },
				windows: {}
			};
		}
		let e = {}, t = {};
		for (let [t, n] of Object.entries(this.project.data.schemas)) e[t] = (await this.doc(n)).toJSON();
		for (let [e, n] of Object.entries(this.project.data.windows)) t[e] = (await this.doc(n)).toJSON();
		return {
			project: this.project.toJSON(),
			schemas: e,
			windows: t
		};
	}
	async #r() {
		if (!this.project) return;
		let e = {
			schemas: /* @__PURE__ */ new Map(),
			windows: /* @__PURE__ */ new Map()
		}, t = (n) => {
			for (let r of h.children(n)) if (r.type === "folder") t(r.id);
			else {
				let t = this.kindOf(r.name);
				t && e[t].set(this.relative(r.id), r);
			}
		};
		for (let e of this.groups) e.folder && t(e.folder);
		this.project.edit("sync", (t) => {
			for (let n of ["schemas", "windows"]) {
				let r = new Set(e[n].keys());
				for (let [e, i] of Object.entries(t[n])) r.has(i) || delete t[n][e];
				let i = new Set(Object.values(t[n]));
				for (let [r, a] of e[n]) {
					if (i.has(r)) continue;
					let e = j(a.name);
					for (let r = 2; e in t[n]; r++) e = `${j(a.name)} ${r}`;
					t[n][e] = r;
				}
			}
			t.main && !(t.main in t.windows) && (t.main = Object.keys(t.windows)[0] ?? null), t.main ||= Object.keys(t.windows)[0] ?? null;
		}, { record: !1 });
	}
	async createElement(e, t, n) {
		let r = k.find((t) => t.key === e), i = String(n).trim() || (e === "schemas" ? "schema" : "finestra");
		if (i in this.project.data[e]) throw Error(O("ws.nameTaken", { name: i }));
		let a = h.uniqueName(t, `${i}.${r.ext}`), o = h.create(t, {
			type: "file",
			name: a
		}), s = e === "schemas" ? c.create(i) : u.create(i);
		await h.write(o.id, s.toText());
		let l = this.relative(o.id);
		return this.project.setElement(e, i, l), await this.save(this.project), this.emit("change"), l;
	}
	createFolder(e, t) {
		let n = h.create(e, {
			type: "folder",
			name: h.uniqueName(e, String(t).trim() || O("ws.newFolder"))
		});
		return this.emit("change"), n.id;
	}
	async rename(e, t) {
		let n = h.get(e);
		if (n) {
			if (n.type === "folder") {
				let n = this.relative(e);
				h.rename(e, String(t).trim()), await this.#i(n, this.relative(e));
			} else {
				let r = this.kindOf(n.name), i = this.relative(e), a = String(t).trim();
				if (r) {
					let t = this.nameOf(r, i);
					if (a !== t && a in this.project.data[r]) throw Error(O("ws.nameTaken", { name: a }));
					h.rename(e, `${a}.${A(n.name)}`);
					let o = this.#e.get(i);
					o && (this.#e.delete(i), this.#e.set(this.relative(e), o)), this.project.renameElement(r, t, a, this.relative(e)), await this.save(this.project);
				} else h.rename(e, a);
			}
			this.emit("change");
		}
	}
	async move(e, t) {
		let n = this.relative(e);
		h.move(e, t), await this.#i(n, this.relative(e)), this.emit("change");
	}
	async #i(e, t) {
		if (!this.project || e === t) return;
		let n = (n) => n === e ? t : n.startsWith(`${e}/`) ? `${t}${n.slice(e.length)}` : n;
		for (let [e, t] of [...this.#e]) {
			let r = n(e);
			r !== e && (this.#e.delete(e), this.#e.set(r, t));
		}
		this.project.edit("move", (e) => {
			for (let t of ["schemas", "windows"]) for (let r of Object.keys(e[t])) e[t][r] = n(e[t][r]);
		}), await this.save(this.project);
	}
	async remove(e) {
		if (!h.get(e)) return;
		let t = this.relative(e);
		h.trash([e]);
		for (let e of [...this.#e.keys()]) (e === t || e.startsWith(`${t}/`)) && this.#e.delete(e);
		await this.#r(), await this.save(this.project), this.emit("change");
	}
};
function M(e, t) {
	return h.children(e).find((e) => e.name.toLowerCase() === String(t).toLowerCase()) ?? null;
}
// src/logicstudio/explorer.js
var de = class {
	el;
	#e;
	#t = /* @__PURE__ */ new Set();
	#n = null;
	constructor(e) {
		this.#e = e, this.el = g("div", {
			class: "ls-tree",
			role: "tree",
			"aria-label": O("left.project")
		}), this.el.addEventListener("contextmenu", (e) => e.preventDefault());
	}
	render() {
		let e = this.#e.ws;
		if (!e) {
			this.el.replaceChildren(g("p", { class: "ls-empty" }, O("explorer.none")));
			return;
		}
		let t = g("div", { class: "ls-tree-h" }, g("span", { class: "ls-fico" }, _("blocks")), g("b", {}, e.name), e.project ? g("button", {
			type: "button",
			class: "ls-icon-btn",
			title: O("tb.map"),
			onclick: () => this.#e.openMap()
		}, _("grid")) : null);
		if (!e.project) {
			let n = h.get(e.single);
			this.el.replaceChildren(t, this.#o(n, "schemas", 0));
			return;
		}
		let n = [t];
		for (let t of e.groups) {
			if (!t.folder) continue;
			let e = this.#r(t.folder, t.key);
			n.push(g("div", {
				class: "ls-grp",
				role: "treeitem",
				tabIndex: 0,
				dataset: {
					id: t.folder,
					group: t.key
				},
				oncontextmenu: (e) => this.#l(e, {
					group: t.key,
					folder: t.folder,
					top: !0
				}),
				onkeydown: (e) => {
					if (e.key === "ContextMenu" || e.shiftKey && e.key === "F10") {
						let n = e.target.getBoundingClientRect();
						this.#l({
							clientX: n.left + 20,
							clientY: n.bottom,
							preventDefault() {}
						}, {
							group: t.key,
							folder: t.folder,
							top: !0
						});
					}
				}
			}, g("span", {}, O(`group.${t.key}`)), g("span", { class: "n" }, String(e)), g("button", {
				type: "button",
				class: "ls-icon-btn",
				title: O(`explorer.new.${t.key}`),
				onclick: () => this.#u(t.key, t.folder)
			}, _("plus")))), this.#h(n.at(-1), t.folder, t.key), n.push(...this.#a(t.folder, t.key, 1));
		}
		this.el.replaceChildren(...n);
	}
	#r(e, t) {
		let n = 0;
		for (let r of h.children(e)) n += r.type === "folder" ? this.#r(r.id, t) : +!!this.#i(r, t);
		return n;
	}
	#i(e, t) {
		let n = this.#e.ws.kindOf(e.name);
		return t === "resources" ? !n : n === t;
	}
	#a(e, t, n) {
		let r = [], i = h.children(e).sort((e, t) => e.type === t.type ? e.name.localeCompare(t.name) : e.type === "folder" ? -1 : 1);
		for (let e of i) if (e.type === "folder") {
			let i = this.#t.has(e.id), a = g("div", {
				class: `ls-ti folder${this.#n === e.id ? " on" : ""}`,
				role: "treeitem",
				"aria-expanded": String(i),
				tabIndex: 0,
				draggable: !0,
				style: `padding-left:${8 + n * 14}px`,
				dataset: { id: e.id },
				onclick: () => {
					i ? this.#t.delete(e.id) : this.#t.add(e.id), this.#n = e.id, this.render();
				},
				oncontextmenu: (n) => this.#l(n, {
					group: t,
					folder: e.id,
					node: e
				}),
				onkeydown: (n) => this.#c(n, {
					group: t,
					folder: e.id,
					node: e
				})
			}, g("span", { class: "chev" }, i ? "▾" : "▸"), _(i ? "folderOpen" : "folder"), g("span", { class: "nm" }, e.name));
			this.#m(a, e), this.#h(a, e.id, t), r.push(a), i && r.push(...this.#a(e.id, t, n + 1));
		} else this.#i(e, t) && r.push(this.#o(e, t, n));
		return r;
	}
	#o(e, t, n) {
		let r = this.#e.ws, i = r.single ? e.name : r.relative(e.id), a = r.project && t !== "resources" ? r.nameOf(t, i) ?? e.name : e.name, o = t === "windows" && r.project?.data.main === a, s = t === "windows" && r.project?.data.entrypoints?.[a], c = r.loaded(i), l = t === "schemas" ? "blocks" : t === "windows" ? "window" : "file", u = g("div", {
			class: `ls-ti${this.#n === e.id ? " on" : ""}`,
			role: "treeitem",
			tabIndex: 0,
			draggable: !r.single,
			style: `padding-left:${8 + n * 14 + 12}px`,
			dataset: { id: e.id },
			title: i,
			onclick: () => {
				this.#n = e.id, this.#s(t, i, e), this.render();
			},
			oncontextmenu: (n) => this.#l(n, {
				group: t,
				node: e,
				path: i,
				name: a
			}),
			onkeydown: (n) => this.#c(n, {
				group: t,
				node: e,
				path: i,
				name: a
			})
		}, _(l), g("span", { class: "nm" }, a), c?.dirty ? g("span", {
			class: "dot",
			title: O("explorer.unsaved")
		}) : null, o ? g("span", {
			class: "star",
			title: O("explorer.main")
		}, "★") : null, s ? g("span", {
			class: "ep",
			title: O(`entry.${s.kind}`)
		}, _("link")) : null);
		return r.single || this.#m(u, e), u;
	}
	#s(e, t, n) {
		e === "resources" ? se(n) : this.#e.openElement(e, t);
	}
	#c(e, t) {
		if (e.key === "Enter") e.preventDefault(), t.node.type === "folder" ? e.target.click() : this.#s(t.group, t.path, t.node);
		else if (e.key === "F2") e.preventDefault(), this.#f(t.node, t.name);
		else if (e.key === "Delete") e.preventDefault(), this.#p(t.node, t.name);
		else if (e.key === "ContextMenu" || e.shiftKey && e.key === "F10") {
			e.preventDefault();
			let n = e.target.getBoundingClientRect();
			this.#l({
				clientX: n.left + 24,
				clientY: n.bottom,
				preventDefault() {}
			}, t);
		} else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
			e.preventDefault();
			let t = [...this.el.querySelectorAll("[role=treeitem]")];
			t[t.indexOf(e.target) + (e.key === "ArrowDown" ? 1 : -1)]?.focus();
		}
	}
	#l(e, { group: t, folder: n = null, node: r = null, path: i = null, name: a = null, top: o = !1 }) {
		e.preventDefault();
		let s = this.#e.ws;
		if (!s?.project) return;
		let c = [], l = n ?? (r ? r.parent : null);
		(n || o) && (t !== "resources" && c.push({
			label: O(`explorer.new.${t}`),
			icon: t === "schemas" ? "blocks" : "window",
			action: () => this.#u(t, l)
		}), c.push({
			label: O("explorer.newFolder"),
			icon: "folderPlus",
			action: () => this.#d(l)
		})), r?.type === "file" && (c.push({
			label: O("explorer.open"),
			icon: "open",
			action: () => this.#s(t, i, r)
		}), t === "windows" && s.project.data.main !== a && c.push({
			label: O("explorer.makeMain"),
			icon: "star",
			action: () => {
				s.project.setMain(a), s.save(s.project), this.render();
			}
		})), r && !o && (c.length && c.push("-"), c.push({
			label: O("explorer.rename"),
			icon: "pencil",
			shortcut: "F2",
			action: () => this.#f(r, a)
		}), c.push({
			label: O("explorer.remove"),
			icon: "trash",
			danger: !0,
			shortcut: "Canc",
			action: () => this.#p(r, a)
		})), c.length && c.push("-"), c.push({
			label: O("menu.docs"),
			icon: "help",
			action: () => this.#e.showDoc({
				schemas: "ide/schemas",
				windows: "ide/windows"
			}[t] ?? "ide/projects")
		}), b(e.clientX, e.clientY, c);
	}
	async #u(e, t) {
		let n = this.#e.ws, r = await y(this.#e.win, {
			icon: e === "schemas" ? "blocks" : "window",
			title: O(`explorer.new.${e}`),
			fields: [{
				name: "name",
				label: O("explorer.name"),
				value: "",
				required: !0,
				maxLength: 60,
				pattern: /^[^/\\:*?"<>|]+$/,
				invalid: O("explorer.badName")
			}],
			buttons: ["cancel", {
				value: "ok",
				label: O("common.create"),
				primary: !0
			}],
			validate: (t) => String(t.name).trim() in n.project.data[e] ? O("ws.nameTaken", { name: String(t.name).trim() }) : !0
		});
		if (r?.button === "ok") try {
			let i = await n.createElement(e, t, r.values.name);
			this.#t.add(t), this.render(), this.#e.openElement(e, i);
		} catch (e) {
			y(this.#e.win, {
				icon: "error",
				title: O("explorer.failed"),
				text: e.message
			});
		}
	}
	async #d(e) {
		let t = await y(this.#e.win, {
			icon: "folderPlus",
			title: O("explorer.newFolder"),
			fields: [{
				name: "name",
				label: O("explorer.name"),
				value: O("ws.newFolder"),
				required: !0,
				maxLength: 60,
				pattern: /^[^/\\:*?"<>|]+$/,
				invalid: O("explorer.badName")
			}],
			buttons: ["cancel", {
				value: "ok",
				label: O("common.create"),
				primary: !0
			}]
		});
		if (t?.button !== "ok") return;
		let n = this.#e.ws.createFolder(e, t.values.name);
		this.#t.add(e), this.#n = n, this.render();
	}
	async #f(e, t) {
		let n = await y(this.#e.win, {
			icon: "pencil",
			title: O("explorer.rename"),
			fields: [{
				name: "name",
				label: O("explorer.name"),
				value: t ?? e.name,
				required: !0,
				maxLength: 60,
				pattern: /^[^/\\:*?"<>|]+$/,
				invalid: O("explorer.badName")
			}],
			buttons: ["cancel", {
				value: "ok",
				label: O("explorer.rename"),
				primary: !0
			}]
		});
		if (n?.button === "ok") try {
			await this.#e.ws.rename(e.id, n.values.name);
			for (let e of this.#e.tabs) e.doc && (e.path = this.#e.ws.relative(this.#e.ws.fileOf(e.doc)) ?? e.path);
			this.#e.renderTabs();
		} catch (e) {
			y(this.#e.win, {
				icon: "error",
				title: O("explorer.failed"),
				text: e.message
			});
		}
	}
	async #p(e, t) {
		if (await y(this.#e.win, {
			icon: "warning",
			title: O(e.type === "folder" ? "explorer.removeFolder" : "explorer.removeItem", { name: t ?? e.name }),
			text: O(e.type === "folder" ? "explorer.removeFolderText" : "explorer.removeItemText"),
			buttons: ["cancel", {
				value: "ok",
				label: O("explorer.remove"),
				danger: !0
			}]
		}) !== "ok") return;
		let n = this.#e.ws.relative(e.id);
		for (let e of [...this.#e.tabs]) e.path && (e.path === n || e.path.startsWith(`${n}/`)) && (e.view.destroy?.(), this.#e.tabs.splice(this.#e.tabs.indexOf(e), 1));
		await this.#e.ws.remove(e.id), this.#e.tabs.some((e) => e.key === this.#e.active) || this.#e.show("home"), this.#e.renderTabs();
	}
	#m(e, t) {
		e.addEventListener("dragstart", (e) => {
			e.dataTransfer.setData("application/x-logicstudio-node", t.id), e.dataTransfer.effectAllowed = "move";
		});
	}
	#h(e, t, n) {
		e.addEventListener("dragover", (t) => {
			t.dataTransfer.types.includes("application/x-logicstudio-node") && (t.preventDefault(), e.classList.add("drop"));
		}), e.addEventListener("dragleave", () => e.classList.remove("drop")), e.addEventListener("drop", async (r) => {
			e.classList.remove("drop");
			let i = r.dataTransfer.getData("application/x-logicstudio-node");
			if (!i || i === t) return;
			r.preventDefault();
			let a = h.get(i), o = this.#e.ws;
			if (!a || a.type === "file" && !this.#i(a, n) || h.isInside(t, i)) return;
			let s = o.groups.find((e) => e.key === n)?.folder;
			if (h.isInside(i, s)) try {
				await o.move(i, t), this.#t.add(t);
				for (let e of this.#e.tabs) e.doc && (e.path = o.relative(o.fileOf(e.doc)) ?? e.path);
				this.render();
			} catch (e) {
				y(this.#e.win, {
					icon: "error",
					title: O("explorer.failed"),
					text: e.message
				});
			}
		});
	}
}, fe = /* @__PURE__ */ "value.constMath.constPhysics.constAstro.logic.math.text.object.list.matrix.units.signal.geometry.trig.functions.integrals.analysis.time.console.schema.ui.lilos.net.hardware.db.exception.program.draw.other".split("."), pe = [
	"text",
	"values",
	"commands",
	"containers",
	"charts",
	"draw",
	"other"
], N = "application/x-logicstudio-item", P = "logicstudio.palette", me = "~other", he = class {
	el;
	#e;
	#t;
	#n;
	#r = "";
	#i = {
		blocks: /* @__PURE__ */ new Set(),
		components: /* @__PURE__ */ new Set()
	};
	#a = /* @__PURE__ */ new Set();
	constructor(e) {
		this.#n = e, this.#t = g("input", {
			type: "search",
			class: "ls-search",
			placeholder: O("palette.search"),
			"aria-label": O("palette.search")
		}), this.#t.addEventListener("input", () => {
			this.#r = this.#t.value.trim().toLowerCase(), this.#a.clear(), this.render();
		});
		let t = C.get(P, {}) ?? {};
		for (let e of ["blocks", "components"]) Array.isArray(t[e]) && t[e].filter((e) => typeof e == "string").forEach((t) => this.#i[e].add(t));
		this.#e = g("div", { class: "ls-pal-list" }), this.el = g("div", { class: "ls-pal" }, this.#t, this.#e);
	}
	get kind() {
		return this.#n.current?.kind === "window" ? "components" : "blocks";
	}
	#o() {
		return this.#r ? this.#a : this.#i[this.kind];
	}
	#s(e, t) {
		let n = this.#o();
		for (let r of e) t ? n.add(r) : n.delete(r);
		if (!this.#r) try {
			C.set(P, {
				blocks: [...this.#i.blocks],
				components: [...this.#i.components]
			});
		} catch {}
		this.render();
	}
	#c(e) {
		if (!e.some((e) => e.def.subcategory)) return null;
		let t = /* @__PURE__ */ new Map();
		return e.forEach((e, n) => {
			let r = e.def.subcategory, i = r?.id ?? me;
			t.has(i) || t.set(i, {
				id: i,
				label: r ? this.#n.label(r) : O("palette.otherSub"),
				order: r ? r.order ?? Infinity : Infinity,
				first: r ? n : Infinity,
				items: []
			}), t.get(i).items.push(e);
		}), [...t.values()].sort((e, t) => e.order - t.order || e.first - t.first);
	}
	#l(e, t, n) {
		let r = this.#n, i = r.current?.view, a = g("button", {
			type: "button",
			class: `ls-pal-it cat-${e.category}${n ? " nested" : ""}`,
			draggable: !0,
			title: `${e.type} · ${t.name} ${t.version}`,
			disabled: !i?.place,
			onclick: () => i?.place?.(e)
		}, _(e.icon ?? "blocks"), g("span", {}, r.label(e)));
		return a.addEventListener("dragstart", (t) => {
			t.dataTransfer.setData(N, e.type), t.dataTransfer.effectAllowed = "copy";
		}), a.addEventListener("contextmenu", (t) => {
			t.preventDefault();
			let n = a.getBoundingClientRect(), o = t.clientX || n.left + 24, s = t.clientY || n.bottom;
			b(o, s, [{
				label: O("palette.add"),
				icon: "plus",
				disabled: !i?.place,
				action: () => i?.place?.(e)
			}, {
				label: O("menu.docs"),
				icon: "help",
				shortcut: "F1",
				action: () => r.showDoc(e.type)
			}]);
		}), a.addEventListener("keydown", (t) => {
			t.key === "F1" && (t.preventDefault(), t.stopPropagation(), r.showDoc(e.type));
		}), a;
	}
	render() {
		let e = this.#n, t = this.kind, n = [];
		for (let r of e.catalog?.packages ?? []) for (let e of t === "blocks" ? r.blocks : r.components) e.role !== "component" && (e.obsolete || n.push({
			def: e,
			pack: r
		}));
		let r = this.#r, i = n.filter(({ def: t }) => !r || e.label(t).toLowerCase().includes(r) || t.type.toLowerCase().includes(r)), a = t === "blocks" ? fe : pe, o = /* @__PURE__ */ new Map();
		for (let e of i) {
			let t = a.includes(e.def.category) ? e.def.category : "other";
			(o.get(t) ?? o.set(t, []).get(t)).push(e);
		}
		let s = [], c = this.#o(), l = a.filter((e) => o.has(e)), u = (t, n) => e.label(t.def).localeCompare(e.label(n.def));
		for (let e of l) {
			let n = o.get(e), r = c.has(e), i = g("button", {
				type: "button",
				class: `ls-pal-cat cat-${e}${r ? " folded" : ""}`,
				"aria-expanded": String(!r),
				title: O(r ? "palette.expand" : "palette.collapse"),
				onclick: () => this.#s([e], !r)
			}, g("span", {
				class: "tw",
				"aria-hidden": "true"
			}, r ? "▸" : "▾"), g("i", { class: "sw" }), g("span", { class: "nm" }, O(`cat.${t}.${e}`)), g("span", { class: "n" }, String(n.length)));
			if (i.addEventListener("contextmenu", (t) => {
				t.preventDefault();
				let n = i.getBoundingClientRect();
				b(t.clientX || n.left + 24, t.clientY || n.bottom, [
					{
						label: O(r ? "palette.expand" : "palette.collapse"),
						icon: r ? "plus" : "minus",
						action: () => this.#s([e], !r)
					},
					{
						label: O("palette.collapseAll"),
						disabled: l.every((e) => c.has(e)),
						action: () => this.#s(l, !0)
					},
					{
						label: O("palette.expandAll"),
						disabled: !l.some((e) => c.has(e)),
						action: () => this.#s(l, !1)
					}
				]);
			}), s.push(i), r) continue;
			let a = this.#c(n);
			if (!a) {
				for (let { def: e, pack: t } of n.sort(u)) s.push(this.#l(e, t, !1));
				continue;
			}
			let d = a.map((t) => `${e}/${t.id}`);
			for (let t of a) {
				let n = `${e}/${t.id}`, r = c.has(n), i = g("button", {
					type: "button",
					class: `ls-pal-sub cat-${e}${r ? " folded" : ""}`,
					"aria-expanded": String(!r),
					title: O(r ? "palette.expand" : "palette.collapse"),
					onclick: () => this.#s([n], !r)
				}, g("span", {
					class: "tw",
					"aria-hidden": "true"
				}, r ? "▸" : "▾"), g("span", { class: "nm" }, t.label), g("span", { class: "n" }, String(t.items.length)));
				if (i.addEventListener("contextmenu", (e) => {
					e.preventDefault();
					let t = i.getBoundingClientRect();
					b(e.clientX || t.left + 24, e.clientY || t.bottom, [
						{
							label: O(r ? "palette.expand" : "palette.collapse"),
							icon: r ? "plus" : "minus",
							action: () => this.#s([n], !r)
						},
						{
							label: O("palette.collapseSubs"),
							disabled: d.every((e) => c.has(e)),
							action: () => this.#s(d, !0)
						},
						{
							label: O("palette.expandSubs"),
							disabled: !d.some((e) => c.has(e)),
							action: () => this.#s(d, !1)
						}
					]);
				}), s.push(i), !r) for (let { def: e, pack: n } of t.items.sort(u)) s.push(this.#l(e, n, !0));
			}
		}
		s.length || s.push(g("p", { class: "ls-empty" }, e.engineError ? O("palette.noEngine") : O(r ? "palette.noMatch" : "palette.empty"))), this.#e.replaceChildren(...s);
	}
}, F = [
	"index",
	"projects",
	"schemas",
	"blocks",
	"links",
	"groups",
	"windows",
	"components",
	"consoles",
	"run",
	"create-app",
	"formats",
	"shortcuts",
	"docs"
], I = [
	"logicstudio-core",
	"logicstudio-collections",
	"logicstudio-constants",
	"logicstudio-units",
	"logicstudio-signals",
	"logicstudio-solid",
	"logicstudio-plane",
	"logicstudio-trig",
	"logicstudio-functions",
	"logicstudio-integrals",
	"logicstudio-numeric",
	"logicstudio-lilos",
	"logicstudio-net",
	"logicstudio-hardware",
	"logicstudio-db",
	"logicstudio-mongodb",
	"logicstudio-redis",
	"logicstudio-influxdb",
	"logicstudio-elasticsearch",
	"logicstudio-ui",
	"logicstudio-charts",
	"logicstudio-engine"
], L = /^[a-z][a-z0-9]*\.[a-zA-Z][a-zA-Z0-9]{0,40}$/, R = /^[a-z][a-z0-9-]{0,40}$/, ge = /^[a-z][a-z0-9-]{0,40}$/, _e = /* #__PURE__ */ Object.assign({
	"./docs/en/blocks.md": () => import("./blocks-CqGegEm1.js").then((e) => e.default),
	"./docs/en/components.md": () => import("./components-D0ttlK1L.js").then((e) => e.default),
	"./docs/en/consoles.md": () => import("./consoles-B4tKL3Wx.js").then((e) => e.default),
	"./docs/en/create-app.md": () => import("./create-app-D249mcH_.js").then((e) => e.default),
	"./docs/en/docs.md": () => import("./docs-S1JFSeo6.js").then((e) => e.default),
	"./docs/en/formats.md": () => import("./formats-C2-AaNF_.js").then((e) => e.default),
	"./docs/en/groups.md": () => import("./groups-qARP1JOM.js").then((e) => e.default),
	"./docs/en/index.md": () => import("./en-DLZSXitZ.js").then((e) => e.default),
	"./docs/en/links.md": () => import("./links-lrnOV6Uq.js").then((e) => e.default),
	"./docs/en/projects.md": () => import("./projects-BkhagYO2.js").then((e) => e.default),
	"./docs/en/run.md": () => import("./run-CoyHFGh3.js").then((e) => e.default),
	"./docs/en/schemas.md": () => import("./schemas-BMpy0Fz1.js").then((e) => e.default),
	"./docs/en/shortcuts.md": () => import("./shortcuts-BkGl08IM.js").then((e) => e.default),
	"./docs/en/windows.md": () => import("./windows-Dh1vbWYk.js").then((e) => e.default),
	"./docs/it/blocks.md": () => import("./blocks-DRsABwYX.js").then((e) => e.default),
	"./docs/it/components.md": () => import("./components-r4Q-FBV7.js").then((e) => e.default),
	"./docs/it/consoles.md": () => import("./consoles-D9kB6SVP.js").then((e) => e.default),
	"./docs/it/create-app.md": () => import("./create-app-DL92JJ6E.js").then((e) => e.default),
	"./docs/it/docs.md": () => import("./docs-CrLtc1zy.js").then((e) => e.default),
	"./docs/it/formats.md": () => import("./formats-BlfnZKhS.js").then((e) => e.default),
	"./docs/it/groups.md": () => import("./groups-D_wgFO8J.js").then((e) => e.default),
	"./docs/it/index.md": () => import("./it-D3EMtOnX.js").then((e) => e.default),
	"./docs/it/links.md": () => import("./links-A9uq82P4.js").then((e) => e.default),
	"./docs/it/projects.md": () => import("./projects-Cjcy3JIm.js").then((e) => e.default),
	"./docs/it/run.md": () => import("./run-CsAT_HkH.js").then((e) => e.default),
	"./docs/it/schemas.md": () => import("./schemas-BIINHj2l.js").then((e) => e.default),
	"./docs/it/shortcuts.md": () => import("./shortcuts-CjEQDbNC.js").then((e) => e.default),
	"./docs/it/windows.md": () => import("./windows-CWQZ-K-K.js").then((e) => e.default)
}), z = /* @__PURE__ */ new Map(), B = null;
function V() {
	return B ??= Promise.all(F.map(async (e) => {
		for (let t of [
			D.lang,
			"en",
			"it"
		]) {
			let n = _e[`./docs/${t}/${e}.md`];
			if (n) try {
				z.set(e, await n());
				return;
			} catch {}
		}
	})).catch(() => {
		B = null;
	}), B;
}
var H = (e) => z.get(e) ?? null, ve = (e) => /^#\s+(.+)$/m.exec(e ?? "")?.[1]?.trim() ?? null, ye = class {
	win;
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o = null;
	#s = [];
	#c = -1;
	#l = "";
	#u = null;
	constructor(e) {
		this.#e = e, this.win = new d({
			title: O("docs.title"),
			icon: "help",
			width: 980,
			height: 680,
			minWidth: 560,
			minHeight: 360
		}), this.#i = g("button", {
			type: "button",
			class: "ls-doc-nav",
			title: O("docs.back"),
			"aria-label": O("docs.back"),
			onclick: () => this.#g(-1)
		}, _("arrowLeft")), this.#a = g("button", {
			type: "button",
			class: "ls-doc-nav",
			title: O("docs.forward"),
			"aria-label": O("docs.forward"),
			onclick: () => this.#g(1)
		}, _("arrowRight"));
		let t = g("button", {
			type: "button",
			class: "ls-doc-nav",
			title: O("docs.home"),
			"aria-label": O("docs.home"),
			onclick: () => this.go("ide/index")
		}, _("home"));
		this.#r = g("input", {
			type: "search",
			class: "ls-search",
			placeholder: O("docs.search"),
			"aria-label": O("docs.search")
		}), this.#r.addEventListener("input", () => {
			this.#l = this.#r.value.trim().toLowerCase(), this.#_();
		}), this.#r.addEventListener("keydown", (e) => {
			e.key === "Enter" && this.#t.querySelector("button.ls-doc-it")?.click();
		}), this.#t = g("nav", {
			class: "ls-doc-tree",
			"aria-label": O("docs.contents")
		}), this.#n = g("article", {
			class: "ls-doc-page lilos-md",
			tabIndex: 0
		}), this.win.body.append(g("div", { class: "ls ls-doc" }, g("div", { class: "ls-doc-side" }, g("div", { class: "ls-doc-bar" }, this.#i, this.#a, t), this.#r, this.#t), g("div", { class: "ls-doc-main" }, this.#n))), this.win.el.addEventListener("keydown", (e) => {
			e.altKey && e.key === "ArrowLeft" ? (e.preventDefault(), this.#g(-1)) : e.altKey && e.key === "ArrowRight" ? (e.preventDefault(), this.#g(1)) : (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "f" && (e.preventDefault(), this.#r.focus(), this.#r.select());
		}), this.#d();
	}
	get closed() {
		return !this.win.el.isConnected;
	}
	go(e, { push: t = !0 } = {}) {
		let n = this.#f(e);
		t && (this.#s.splice(this.#c + 1), this.#s.push(e), this.#c = this.#s.length - 1), this.#m(n, e);
	}
	async #d() {
		await V();
		try {
			this.#o = await v.docIndex(D.lang);
		} catch {
			this.#o = [];
		}
		this.#_();
	}
	#f(e) {
		let t = String(e ?? "").trim();
		if (t.startsWith("ide/")) return R.test(t.slice(4)) ? {
			pack: "ide",
			page: t.slice(4)
		} : null;
		if (L.test(t)) {
			let e = (this.#e.catalog?.packages ?? []).find((e) => e.blocks.some((e) => e.type === t) || e.components.some((e) => e.type === t));
			return e ? {
				pack: e.name,
				page: t
			} : {
				pack: null,
				page: t
			};
		}
		let [n, r = "index", i] = t.split("/");
		return i !== void 0 || !ge.test(n) || !(r === "index" || R.test(r) || L.test(r)) ? null : {
			pack: n,
			page: r
		};
	}
	#p = (e) => this.#f(e) ? () => this.go(e) : null;
	async #m(e, t) {
		this.#u = e, this.#i.disabled = this.#c <= 0, this.#a.disabled = this.#c >= this.#s.length - 1, this.#_();
		let n = null;
		if (e?.pack === "ide") {
			if (await V(), this.#u !== e) return;
			n = H(e.page);
		} else if (e?.pack) {
			this.#n.replaceChildren(g("p", { class: "ls-hint" }, O("docs.loading")));
			try {
				n = (await v.doc(e.pack, e.page, D.lang))?.markdown ?? null;
			} catch (t) {
				if (this.#u !== e) return;
				this.#n.replaceChildren(g("h1", {}, O("docs.title")), g("p", {}, O("docs.failed", { error: t.message })));
				return;
			}
		}
		this.#u === e && (n ? this.#n.replaceChildren(...ne(n, { link: this.#p })) : this.#n.replaceChildren(...this.#h(e, t)), this.#n.parentElement.scrollTop = 0, this.win.setTitle(O("docs.title"), ve(n) ?? t), this.#t.querySelector(".on")?.scrollIntoView?.({ block: "nearest" }));
	}
	#h(e, t) {
		let n = [g("h1", {}, O("docs.missingTitle"))], r = e?.page && (this.#e.blockDef(e.page) ?? this.#e.componentDef(e.page));
		return r ? (n.push(g("p", {}, O("docs.missingType", {
			name: this.#e.label(r),
			type: r.type
		}))), r.description && n.push(g("p", {}, this.#e.label({ label: r.description })))) : n.push(g("p", {}, O("docs.missing", { address: t }))), e?.pack && e.pack !== "ide" && e.page !== "index" && n.push(g("p", {}, g("a", {
			href: "#",
			onclick: (t) => {
				t.preventDefault(), this.go(e.pack);
			}
		}, O("docs.packIndex")))), n;
	}
	#g(e) {
		let t = this.#c + e;
		t < 0 || t >= this.#s.length || (this.#c = t, this.go(this.#s[t], { push: !1 }));
	}
	#_() {
		let e = this.#l, t = (...t) => !e || t.some((t) => String(t ?? "").toLowerCase().includes(e)), n = [], r = F.filter((e) => H(e)).map((e) => ({
			address: `ide/${e}`,
			title: ve(H(e)) ?? e,
			pack: "ide",
			page: e
		}));
		n.push({
			label: O("docs.ide"),
			items: r.filter((e) => t(e.title, e.page))
		});
		let i = [...this.#o ?? []].sort((e, t) => U(e.pack) - U(t.pack) || e.pack.localeCompare(t.pack));
		for (let e of i) {
			let r = [];
			e.pages.find((e) => e.page === "index") && r.push({
				address: e.pack,
				title: O("docs.overview"),
				pack: e.pack,
				page: "index",
				strong: !0
			});
			let i = e.pages.filter((e) => e.page !== "index" && !L.test(e.page)).sort((e, t) => e.title.localeCompare(t.title));
			for (let t of i) r.push({
				address: `${e.pack}/${t.page}`,
				title: t.title,
				pack: e.pack,
				page: t.page
			});
			let a = e.pages.filter((e) => L.test(e.page)).map((e) => ({
				...e,
				def: this.#e.blockDef(e.page) ?? this.#e.componentDef(e.page)
			})), o = /* @__PURE__ */ new Map();
			for (let e of a) {
				let t = e.def?.category ?? "other";
				(o.get(t) ?? o.set(t, []).get(t)).push(e);
			}
			let s = (e, t) => e.title.localeCompare(t.title), c = (t) => ({
				address: t.page,
				title: t.title,
				pack: e.pack,
				page: t.page,
				type: t.page
			});
			for (let [e, t] of o) {
				let n = t[0].def && this.#e.componentDef(t[0].page) ? "components" : "blocks";
				if (r.push({
					heading: O(`cat.${n}.${e}`) ?? e,
					level: 1
				}), !t.some((e) => e.def?.subcategory)) {
					for (let e of t.sort(s)) r.push(c(e));
					continue;
				}
				let i = /* @__PURE__ */ new Map();
				t.forEach((e, t) => {
					let n = e.def?.subcategory, r = n?.id ?? "~other";
					i.has(r) || i.set(r, {
						label: n ? this.#e.label(n) : O("palette.otherSub"),
						order: n?.order ?? Infinity,
						first: n ? t : Infinity,
						list: []
					}), i.get(r).list.push(e);
				});
				for (let e of [...i.values()].sort((e, t) => e.order - t.order || e.first - t.first)) {
					r.push({
						heading: e.label,
						level: 2
					});
					for (let t of e.list.sort(s)) r.push(c(t));
				}
			}
			let l = [], u = [];
			for (let n of r) n.heading ? u = [...u.filter((e) => e.level < n.level), n] : t(n.title, n.type, e.pack) && (l.push(...u), u = [], l.push(n));
			n.push({
				label: this.#e.label(e) || e.pack,
				items: l
			});
		}
		let a = this.#u, o = [];
		for (let e of n) if (e.items.some((e) => !e.heading)) {
			o.push(g("div", { class: "ls-doc-group" }, e.label));
			for (let t of e.items) {
				if (t.heading) {
					o.push(g("div", { class: t.level === 2 ? "ls-doc-cat sub" : "ls-doc-cat" }, t.heading));
					continue;
				}
				let e = a && a.pack === t.pack && a.page === t.page;
				o.push(g("button", {
					type: "button",
					class: `ls-doc-it${e ? " on" : ""}${t.strong ? " strong" : ""}`,
					title: t.type ?? "",
					"aria-current": e ? "page" : null,
					onclick: () => this.go(t.address)
				}, t.title));
			}
		}
		this.#o === null ? o.push(g("p", { class: "ls-hint" }, O("docs.loading"))) : o.length || o.push(g("p", { class: "ls-hint" }, O("docs.noResults"))), this.#t.replaceChildren(...o);
	}
}, U = (e) => {
	let t = I.indexOf(e);
	return t < 0 ? I.length : t;
};
function be(e, t = "ide/index") {
	let n = e.docsViewer;
	return (!n || n.closed) && (n = e.docsViewer = new ye(e), n.win.on("destroy", () => {
		e.docsViewer === n && (e.docsViewer = null);
	})), n.go(t), e.openWindow(n.win, "docs"), n;
}
function W(e, t, n) {
	return e.blockDef(t?.type)?.role === "component" ? (n?.(t))?.def?.type ?? t.type : t?.type ?? "ide/blocks";
}
function G(e, t) {
	return g("button", {
		type: "button",
		class: "ls-doc-q",
		title: `${O("menu.docs")} (F1)`,
		"aria-label": O("menu.docs"),
		onclick: () => e.showDoc(t)
	}, _("help"));
}
// src/logicstudio/schemaEditor.js
var xe = class {
	el;
	canvas;
	doc;
	name;
	#e;
	#t = {
		maxBlocks: 200,
		maxLinks: 600
	};
	constructor(e, t, n) {
		this.#e = e, this.doc = t, this.name = n, this.canvas = new i({
			schema: t,
			catalog: e.catalog,
			lang: D.lang,
			componentOf: (e) => this.componentOf(e),
			labels: {
				error: O("port.error"),
				missing: O("block.missing"),
				run: O("group.run"),
				group: O("group.name"),
				blocks: O("group.blocks"),
				thread: O("group.thread"),
				collapse: O("group.collapse"),
				runOff: O("group.runOff")
			}
		}), this.el = g("div", { class: "ls-editor ls-schema" }, this.canvas.el), this.canvas.on("select", () => {
			e.inspector.render(), e.renderToolbar();
		}), this.canvas.on("open", ({ id: e }) => this.#i(e)), this.canvas.on("contextmenu", (e) => this.#a(e)), this.canvas.on("linkDrop", (e) => this.#l(e)), this.canvas.on("view", () => e.renderStatus()), t.on("change", () => {
			e.inspector.render(), e.renderStatus();
		}), this.el.addEventListener("dragover", (e) => {
			e.dataTransfer.types.includes("application/x-logicstudio-item") && (e.preventDefault(), e.dataTransfer.dropEffect = "copy");
		}), this.el.addEventListener("drop", (t) => {
			let n = t.dataTransfer.getData(N), r = n && e.blockDef(n);
			r && (t.preventDefault(), this.place(r, this.canvas.toWorld(t.clientX, t.clientY)));
		}), this.#n(), requestAnimationFrame(() => {
			t.data.blocks.length && t.data.view?.zoom || this.canvas.fit();
		});
	}
	get selection() {
		return this.canvas.selection;
	}
	async #n() {
		let e = this.#e.ws;
		if (e?.project) {
			for (let t of Object.values(e.project.data.windows)) await e.doc(t).catch(() => null);
			this.canvas.refresh(!0);
		}
	}
	componentOf(e) {
		let t = this.#e.ws, n = t?.project?.data.windows[e.config.window], r = (n ? t.loaded(n) : null)?.find(e.config.component)?.node;
		return r ? {
			def: this.#e.componentDef(r.type),
			added: r.added ?? {
				inputs: [],
				outputs: []
			}
		} : null;
	}
	setCatalog(e) {
		this.canvas.setCatalog(e);
	}
	show() {
		this.canvas.el.focus({ preventScroll: !0 });
	}
	destroy() {
		this.canvas.destroy();
	}
	place(e, t = null) {
		return this.doc.data.blocks.length >= this.#t.maxBlocks ? (y(this.#e.win, {
			icon: "warning",
			title: O("limit.blocks", { n: this.#t.maxBlocks })
		}), null) : this.canvas.place(e, t);
	}
	setLimits(e) {
		this.#t = {
			...this.#t,
			...e
		};
	}
	statusText() {
		return O("status.schema", {
			blocks: this.doc.data.blocks.length,
			maxBlocks: this.#t.maxBlocks,
			links: this.doc.data.links.length,
			maxLinks: this.#t.maxLinks,
			zoom: Math.round(this.canvas.view.zoom * 100)
		});
	}
	toolbar(e) {
		return [
			e("minus", null, () => this.canvas.zoomAt(1 / 1.2), { title: O("tb.zoomOut") }),
			e(null, `${Math.round(this.canvas.view.zoom * 100)}%`, () => this.canvas.setView({
				...this.canvas.view,
				zoom: 1
			}), {
				cls: "pct",
				title: O("tb.zoomReset")
			}),
			e("plus", null, () => this.canvas.zoomAt(1.2), { title: O("tb.zoomIn") }),
			e("fit", O("tb.fit"), () => this.canvas.fit()),
			e("cols", O("tb.align"), (e) => {
				let t = e.currentTarget.getBoundingClientRect();
				b(t.left, t.bottom + 2, this.#r());
			}, {
				disabled: this.canvas.readOnly || this.canvas.selection.blocks.length < 2,
				title: O("tb.alignHint")
			})
		];
	}
	#r() {
		let e = this.canvas.selection.blocks.length, t = (e, t = !1) => ({
			label: O(`align.${e}`),
			disabled: t,
			action: () => this.align(e)
		});
		return [
			t("left"),
			t("center"),
			t("right"),
			t("spreadX", e < 3),
			"-",
			t("top"),
			t("middle"),
			t("bottom"),
			t("spreadY", e < 3)
		];
	}
	align(e) {
		let t = this.canvas.selection.blocks.map((e) => {
			let t = this.doc.block(e), n = this.canvas.el.querySelector(`.lgc-block[data-id="${CSS.escape(e)}"]`);
			return t && {
				id: e,
				x: t.x,
				y: t.y,
				w: n?.offsetWidth ?? 160,
				h: n?.offsetHeight ?? 80
			};
		}).filter(Boolean);
		if (t.length < 2 || this.canvas.readOnly) return;
		let n = Math.min(...t.map((e) => e.x)), r = Math.max(...t.map((e) => e.x + e.w)), i = Math.min(...t.map((e) => e.y)), a = Math.max(...t.map((e) => e.y + e.h)), o = Object.fromEntries(t.map((e) => [e.id, [e.x, e.y]])), s = (e, n, r, i) => {
			if (t.length < 3) return;
			let a = [...t].sort((t, n) => t[e] - n[e]), s = (i - r - a.reduce((e, t) => e + t[n], 0)) / (a.length - 1), c = r;
			for (let t of a) o[t.id][e === "x" ? 0 : 1] = c, c += t[n] + s;
		};
		for (let s of t) {
			let t = o[s.id];
			e === "left" ? t[0] = n : e === "center" ? t[0] = (n + r - s.w) / 2 : e === "right" ? t[0] = r - s.w : e === "top" ? t[1] = i : e === "middle" ? t[1] = (i + a - s.h) / 2 : e === "bottom" && (t[1] = a - s.h);
		}
		e === "spreadX" && s("x", "w", n, r), e === "spreadY" && s("y", "h", i, a);
		let c = t.filter((e) => Math.round(o[e.id][0]) !== e.x || Math.round(o[e.id][1]) !== e.y);
		c.length && this.doc.place(Object.fromEntries(c.map((e) => [e.id, o[e.id]])));
	}
	#i(e) {
		let t = this.doc.block(e);
		if ((t && this.#e.blockDef(t.type))?.role === "component") {
			let e = this.#e.ws?.project?.data.windows[t.config.window];
			e && this.#e.openElement("windows", e);
		}
	}
	#a(e) {
		let t = [], n = this.canvas.selection;
		if (e.kind === "block") {
			let r = this.doc.block(e.id), i = this.#e.blockDef(r?.type);
			t.push({
				label: O("menu.duplicate"),
				icon: "copy",
				shortcut: "Ctrl+D",
				action: () => this.canvas.duplicateSelection()
			}), i?.role === "drawing" ? t.push({
				label: O("menu.editText"),
				icon: "pencil",
				disabled: this.canvas.readOnly,
				action: () => this.canvas.editText(e.id)
			}) : t.push({
				label: O("menu.label"),
				icon: "pencil",
				action: () => this.#c(e.id)
			}), t.push(...this.#o(n.blocks)), n.blocks.length > 1 && !this.canvas.readOnly && t.push({
				label: O("tb.align"),
				icon: "cols",
				items: this.#r()
			}), i?.role === "component" && t.push({
				label: O("menu.openWindow"),
				icon: "window",
				action: () => this.#i(e.id)
			}), t.push({
				label: O("menu.docs"),
				icon: "help",
				shortcut: "F1",
				action: () => this.#e.showDoc(W(this.#e, r, (e) => this.componentOf(e)))
			}), t.push("-"), t.push({
				label: O(n.blocks.length > 1 ? "menu.removeBlocks" : "menu.removeBlock", { n: n.blocks.length }),
				icon: "trash",
				danger: !0,
				shortcut: "Canc",
				action: () => this.canvas.removeSelection()
			});
		} else e.kind === "group" ? t.push(...this.#s(e.id)) : e.kind === "link" ? (t.push({
			label: O("menu.docs"),
			icon: "help",
			action: () => this.#e.showDoc("ide/links")
		}), t.push("-"), t.push({
			label: O("menu.removeLink"),
			icon: "trash",
			danger: !0,
			shortcut: "Canc",
			action: () => this.canvas.removeSelection()
		})) : (t.push({
			label: O("menu.addHere"),
			icon: "plus",
			action: () => this.#l({
				world: e.world,
				clientX: e.clientX,
				clientY: e.clientY
			})
		}), t.push({
			label: O("menu.selectAll"),
			shortcut: "Ctrl+A",
			action: () => this.canvas.selectAll()
		}), t.push({
			label: O("tb.fit"),
			icon: "fit",
			action: () => this.canvas.fit()
		}), t.push("-"), t.push({
			label: O("menu.docsSchema"),
			icon: "help",
			shortcut: "F1",
			action: () => this.#e.showDoc("ide/schemas")
		}));
		b(e.clientX, e.clientY, t);
	}
	#o(e) {
		if (this.canvas.readOnly) return [];
		let t = e.filter((e) => !this.doc.groupOf(e)), n = [];
		if (t.length) {
			n.push({
				label: O("group.make"),
				icon: "group",
				shortcut: "Ctrl+G",
				action: () => this.canvas.groupSelection()
			});
			let e = this.doc.groups;
			e.length && n.push({
				label: O("group.addTo"),
				icon: "group",
				items: e.map((e) => ({
					label: e.name,
					action: () => this.doc.addToGroup(e.id, t)
				}))
			});
		}
		return t.length < e.length && n.push({
			label: O("group.takeOut"),
			icon: "arrowLeft",
			action: () => this.doc.removeFromGroup(e)
		}), n;
	}
	#s(e) {
		let t = this.doc.group(e);
		if (!t) return [];
		let n = this.canvas.readOnly;
		return [
			{
				label: O(t.collapsed ? "group.expand" : "group.collapse"),
				icon: t.collapsed ? "plus" : "minus",
				disabled: n,
				action: () => this.doc.setGroup(e, { collapsed: !t.collapsed })
			},
			{
				label: O("group.rename"),
				icon: "pencil",
				disabled: n,
				action: () => this.renameGroup(e)
			},
			{
				label: O("group.threadToggle"),
				icon: t.thread ? "check" : "chip",
				disabled: n,
				action: () => this.doc.setGroup(e, { thread: !t.thread })
			},
			{
				label: O("menu.duplicate"),
				icon: "copy",
				shortcut: "Ctrl+D",
				disabled: n,
				action: () => this.canvas.duplicateSelection()
			},
			{
				label: O("group.ungroup"),
				icon: "group",
				shortcut: "Ctrl+Shift+G",
				disabled: n,
				action: () => this.canvas.ungroupSelection()
			},
			{
				label: O("menu.docs"),
				icon: "help",
				shortcut: "F1",
				action: () => this.#e.showDoc("ide/groups")
			},
			"-",
			{
				label: O("group.remove"),
				icon: "trash",
				danger: !0,
				shortcut: "Canc",
				disabled: n,
				action: () => this.canvas.removeSelection()
			}
		];
	}
	async renameGroup(e) {
		let t = this.doc.group(e), n = await y(this.#e.win, {
			icon: "pencil",
			title: O("group.rename"),
			fields: [{
				name: "name",
				label: O("inspector.name"),
				value: t?.name ?? "",
				maxLength: 80
			}],
			buttons: ["cancel", {
				value: "ok",
				label: O("common.ok"),
				primary: !0
			}]
		});
		n?.button === "ok" && String(n.values.name ?? "").trim() && this.doc.setGroup(e, { name: String(n.values.name) });
	}
	async #c(e) {
		let t = this.doc.block(e), n = await y(this.#e.win, {
			icon: "pencil",
			title: O("menu.label"),
			text: O("menu.labelText"),
			fields: [{
				name: "label",
				label: O("inspector.label"),
				value: t?.label ?? "",
				maxLength: 80
			}],
			buttons: ["cancel", {
				value: "ok",
				label: O("common.ok"),
				primary: !0
			}]
		});
		n?.button === "ok" && this.doc.setLabel(e, String(n.values.label ?? "").trim());
	}
	#l({ from: e = null, world: t, clientX: n, clientY: r }) {
		let i = this.#e, a = null;
		if (e) {
			let t = this.doc.block(e[0]), n = i.blockDef(t?.type);
			a = n ? x(t, n).outputs.find((t) => t.name === e[1])?.type ?? "any" : "any";
		}
		let o = (i.catalog?.packages ?? []).flatMap((e) => e.blocks).filter((e) => !e.role || e.role === "schemaOut").filter((t) => !e || t.inputs.some((e) => ae(a, e.type ?? "any"))), s = /* @__PURE__ */ new Map();
		for (let e of o) (s.get(e.category) ?? s.set(e.category, []).get(e.category)).push(e);
		let c = [...s].map(([n, r]) => ({
			label: O(`cat.blocks.${n}`) ?? n,
			items: r.sort((e, t) => i.label(e).localeCompare(i.label(t))).map((n) => ({
				label: i.label(n),
				icon: n.icon,
				action: () => {
					let r = this.place(n, t);
					if (!r || !e) return;
					let i = n.inputs.find((e) => ae(a, e.type ?? "any"));
					i && this.doc.connect(e, [r, i.name]);
				}
			}))
		}));
		c.length && b(n, r, c);
	}
	linksOf(e) {
		let t = new Set(e);
		return this.doc.data.links.filter((e) => t.has(e.from[0]) || t.has(e.to[0])).map(te);
	}
};
// src/logicstudio/fields.js
function K({ value: e = "", onChange: t, rows: n = 3, maxLength: r = 2e3, mono: i = !1, className: a = "", label: o } = {}) {
	let s = g("textarea", {
		class: [
			"ctl-text",
			i && "mono",
			a
		].filter(Boolean).join(" "),
		rows: n,
		spellcheck: "false",
		maxlength: r,
		"aria-label": o
	});
	return s.value = String(e ?? ""), s.addEventListener("change", () => t?.(s.value)), s;
}
function Se({ value: e = "", onChange: t } = {}) {
	let n = String(e ?? ""), r = /^#[0-9a-f]{6}$/i.test(n) ? n : /^#[0-9a-f]{3}$/i.test(n) ? `#${[...n.slice(1)].map((e) => e + e).join("")}` : "#808080", i = g("input", {
		type: "color",
		class: "ls-color-pick",
		title: O("field.pickColor"),
		"aria-label": O("field.pickColor")
	});
	i.value = r;
	let a = w({
		value: n,
		placeholder: O("field.themeColor"),
		maxLength: 60,
		onChange: (e) => t?.(e.trim())
	});
	return i.addEventListener("change", () => {
		a.value = i.value, t?.(i.value);
	}), g("div", { class: "ls-color" }, i, a);
}
// src/logicstudio/windowEditor.js
var q = 30, J = {
	w: 160,
	h: 120
}, Y = 4e3, Ce = [
	"e",
	"s",
	"se"
], we = [
	"",
	"drop",
	"play",
	"stop",
	"power",
	"gear",
	"bell",
	"check",
	"x",
	"plus",
	"minus",
	"refresh",
	"save",
	"trash",
	"warning",
	"info",
	"home",
	"window",
	"link"
], Te = class {
	el;
	doc;
	name;
	#e;
	#t;
	#n;
	#r = null;
	#i = "design";
	#a = null;
	#o = null;
	#s = null;
	#c = [];
	#l = null;
	constructor(e, t, n) {
		this.#e = e, this.doc = t, this.name = n, this.#n = g("div", { class: "ls-wframe" }), this.#t = g("div", {
			class: "ls-wsurface",
			tabIndex: 0
		}, this.#n), this.el = g("div", { class: "ls-editor ls-window" }, this.#t), t.on("change", () => {
			this.render(), e.inspector.render(), e.renderStatus();
		}), this.#m(), this.render();
	}
	get selected() {
		return this.#a;
	}
	setCatalog() {
		this.render();
	}
	destroy() {
		this.#r?.destroy();
	}
	show() {
		this.#t.focus({ preventScroll: !0 });
	}
	statusText() {
		let e = this.doc.components((e) => this.#e.componentDef(e)).length;
		return O("status.window", {
			n: e,
			max: this.#e.limits?.maxComponents ?? 200,
			w: this.doc.data.size.w,
			h: this.doc.data.size.h
		});
	}
	toolbar(e) {
		return [e("pencil", O("window.design"), () => this.setMode("design"), { cls: this.#i === "design" ? "on" : "" }), e("eye", O("window.preview"), () => this.setMode("preview"), { cls: this.#i === "design" ? "" : "on" })];
	}
	setMode(e) {
		this.#i = e, this.render(), this.#e.renderToolbar();
	}
	attach(e) {
		this.#o = e, this.#i !== "design" && this.render();
	}
	detach() {
		this.#o = null, this.#i !== "design" && this.render();
	}
	#u() {
		return (this.#e.ws?.project?.data.texts ?? {})[D.lang] ?? {};
	}
	render() {
		let e = this.#e, t = this.doc.data, n = this.#i === "design" ? "design" : this.#o ? "live" : "preview";
		this.#r?.destroy(), this.#c.splice(0).forEach((e) => URL.revokeObjectURL(e)), this.#r = new l({
			window: t,
			components: e.components ?? /* @__PURE__ */ new Map(),
			lang: D.lang,
			texts: this.#u(),
			host: this.#d(),
			mode: n
		}), n === "live" && this.#r.attach(this.#o, this.name), this.#r.on("action", ({ action: e }) => this.#f(e)), this.#n.style.width = `${t.size.w}px`, this.#n.style.height = `${t.size.h + q}px`;
		let r = [
			t.state === "maximized" && g("span", {
				class: "ls-wflag",
				title: O("window.state")
			}, _("max"), O("window.state.maximized")),
			t.modal && g("span", {
				class: "ls-wflag",
				title: O("window.modalHint")
			}, _("lock"), O("window.flag.modal")),
			t.onTop && g("span", {
				class: "ls-wflag",
				title: O("window.onTop")
			}, _("star"), O("window.flag.onTop"))
		].filter(Boolean);
		this.#n.replaceChildren(g("div", { class: "ls-wtitle" }, _("window"), g("span", {}, t.title || this.name), ...r, g("span", { class: "sp" }), g("i"), g("i"), g("i")), g("div", { class: "ls-wbody" }, this.#r.el), ...Ce.map((e) => g("div", {
			class: `ls-wresize ${e}`,
			dataset: { edge: e },
			title: O("window.resize")
		}))), this.#a && this.#r.elementOf(this.#a)?.classList.add("lui-sel");
	}
	#d() {
		let e = this.#e;
		return {
			chartPoints: e.limits?.chartPoints,
			consoleView: (t) => e.runner.consoles ? new a(e.runner.consoles, { console: t }).el : null,
			resourceUrl: async (t) => {
				let n = e.ws?.nodeAt?.(String(t).replace(/^\/+/, ""));
				if (!n || n.type !== "file") return null;
				let r = URL.createObjectURL(await h.readBlob(n.id));
				return this.#c.push(r), r;
			},
			pickFile: async ({ kind: t, exts: n }) => {
				let r = await E(e.openWindow, {
					kind: t,
					exts: n
				});
				return r ? h.path(r.id ?? r) : null;
			},
			openWindow: (e) => this.#f({
				kind: "open",
				window: e
			})
		};
	}
	async #f(e) {
		let t = this.#e;
		if (e.kind !== "open" || !e.window) return;
		let n = t.ws?.project?.data.windows[e.window];
		if (!n) return;
		let r = await t.ws.doc(n), i = r.data, a = new d({
			title: i.title || e.window,
			subtitle: O("window.previewOf"),
			icon: "window",
			width: i.size.w,
			height: i.size.h + q,
			minWidth: Math.min(320, i.size.w),
			minHeight: Math.min(200, i.size.h + q),
			resizable: i.size.resizable !== !1,
			modal: i.modal === !0,
			onTop: i.onTop === !0
		}), o = new l({
			window: r.data,
			components: t.components,
			lang: D.lang,
			texts: this.#u(),
			host: this.#d(),
			mode: this.#o ? "live" : "preview"
		});
		this.#o && o.attach(this.#o, e.window), a.body.append(g("div", { class: "ls-wbody" }, o.el)), a.on("destroy", () => o.destroy()), t.openWindow(a, `preview-${e.window}`), i.state === "maximized" && !a.el.classList.contains("max") && a.emit("maximize");
	}
	select(e) {
		this.#a = e;
		for (let e of this.#n.querySelectorAll(".lui-sel")) e.classList.remove("lui-sel");
		e && this.#r?.elementOf(e)?.classList.add("lui-sel"), this.#e.inspector.render();
	}
	#p(e) {
		return !!this.#e.componentDef(e)?.container;
	}
	place(e, t = null) {
		this.#i !== "design" && this.setMode("design");
		let n = this.#e.limits?.maxComponents ?? 200;
		if (this.doc.nodes().length > n) return y(this.#e.win, {
			icon: "warning",
			title: O("limit.components", { n })
		}), null;
		let r = "root", i = Infinity;
		if (t) ({parent: r, index: i} = t);
		else if (this.#a) {
			let e = this.doc.find(this.#a);
			e && this.#p(e.node.type) && e.node.children ? r = e.node.id : e?.parent && (r = e.parent.id, i = e.index + 1);
		}
		let a = (e.type, {});
		try {
			let n = this.doc.add(e, r, i, a);
			return t?.layout && this.doc.setLayout(n, t.layout), this.select(n), e.container || this.#S(n, e), n;
		} catch (e) {
			return y(this.#e.win, {
				icon: "warning",
				title: e.message
			}), null;
		}
	}
	#m() {
		let e = this.#t;
		e.addEventListener("pointerdown", (e) => {
			let t = e.button === 0 && e.target.closest?.(".ls-wresize")?.dataset.edge;
			t && this.#h(e, t);
		}, !0), e.addEventListener("click", (e) => {
			if (this.#i !== "design" || e.target.closest(".ls-wresize")) return;
			let t = e.target.closest(".lui-c");
			this.select(t && t.dataset.id !== "root" ? t.dataset.id : null);
		}), e.addEventListener("dblclick", (e) => {
			let t = e.target.closest(".lui-c");
			t && this.#i === "design" && this.#b(t.dataset.id);
		}), e.addEventListener("contextmenu", (t) => {
			if (this.#i !== "design") return;
			t.preventDefault();
			let n = t.target.closest(".lui-c"), r = n && n.dataset.id !== "root" ? n.dataset.id : null;
			this.select(r);
			let i = r ? this.doc.find(r)?.node : null, a = [];
			i ? (this.#y(r) && a.push({
				label: O("menu.openObject"),
				icon: "blocks",
				action: () => this.#b(r)
			}), a.push({
				label: O("menu.docs"),
				icon: "help",
				shortcut: "F1",
				action: () => this.#e.showDoc(i.type)
			}), a.push("-"), a.push({
				label: O("window.remove"),
				icon: "trash",
				danger: !0,
				shortcut: "Canc",
				action: () => this.#v(r)
			})) : a.push({
				label: O("menu.docsWindow"),
				icon: "help",
				shortcut: "F1",
				action: () => this.#e.showDoc("ide/windows")
			});
			let o = (n ?? e).getBoundingClientRect();
			b(t.clientX || o.left + 20, t.clientY || o.top + 20, a);
		}), e.addEventListener("keydown", (e) => {
			this.#i === "design" && this.#a && !/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) && ((e.key === "Delete" || e.key === "Backspace") && (e.preventDefault(), this.#v(this.#a)), e.key === "Escape" && this.select(null));
		}), e.addEventListener("dragover", (e) => {
			e.dataTransfer.types.includes("application/x-logicstudio-item") && this.#i === "design" && (e.preventDefault(), e.dataTransfer.dropEffect = "copy", this.#g(e.clientX, e.clientY, null));
		}), e.addEventListener("dragleave", (t) => {
			e.contains(t.relatedTarget) || this.#_();
		}), e.addEventListener("drop", (e) => {
			let t = e.dataTransfer.getData(N), n = t && this.#e.componentDef(t), r = this.#s;
			this.#_(), n && r && (e.preventDefault(), this.place(n, r));
		}), e.addEventListener("pointerdown", (e) => {
			if (this.#i !== "design" || e.button !== 0) return;
			let t = e.target.closest(".lui-c");
			if (!t || t.dataset.id === "root") return;
			let n = t.dataset.id, r = e.clientX, i = e.clientY, a = !1, o = (e) => {
				!a && Math.hypot(e.clientX - r, e.clientY - i) < 5 || (a = !0, t.classList.add("lui-moving"), this.#g(e.clientX, e.clientY, n));
			}, s = () => {
				removeEventListener("pointermove", o), removeEventListener("pointerup", s), t.classList.remove("lui-moving");
				let e = this.#s;
				this.#_(), a && e && (e.layout ? (e.parent === this.doc.find(n)?.parent?.id || this.doc.move(n, e.parent, e.index), this.doc.setLayout(n, e.layout)) : this.doc.move(n, e.parent, e.index), this.select(n));
			};
			addEventListener("pointermove", o), addEventListener("pointerup", s);
		});
	}
	#h(e, t) {
		e.preventDefault(), e.stopPropagation();
		let n = this.#n, r = n.getBoundingClientRect().width / n.offsetWidth || 1, { w: i, h: a } = this.doc.data.size, o = e.clientX, s = e.clientY, c = i, l = a, u = e.target.closest(".ls-wresize"), d = g("div", { class: "ls-wsize" }, `${i} × ${a}`);
		n.append(d), n.classList.add("resizing"), u.classList.add("on");
		let f = (e, t) => Math.max(t, Math.min(Y, Math.round(e))), p = (e) => {
			t.includes("e") && (c = f(i + (e.clientX - o) / r, J.w)), t.includes("s") && (l = f(a + (e.clientY - s) / r, J.h)), n.style.width = `${c}px`, n.style.height = `${l + q}px`, d.textContent = `${c} × ${l}`;
		}, m = () => {
			removeEventListener("pointermove", p), removeEventListener("pointerup", m), removeEventListener("pointercancel", m), d.remove(), n.classList.remove("resizing"), u.classList.remove("on"), (c !== i || l !== a) && this.doc.setSize({
				w: c,
				h: l
			});
		};
		addEventListener("pointermove", p), addEventListener("pointerup", m), addEventListener("pointercancel", m);
	}
	#g(e, t, n) {
		this.#_(!1);
		let r = document.elementFromPoint(e, t)?.closest(".lui-c");
		for (; r && n && (r.dataset.id === n || r.closest(`[data-id="${n}"]`));) r = r.parentElement?.closest(".lui-c");
		let i = r;
		for (; i && !this.#p(i.dataset.type);) i = i.parentElement?.closest(".lui-c");
		if (!i) return;
		let a = i.dataset.id, o = this.doc.find(a)?.node;
		if (!o) return;
		if (o.type === "ui.free") {
			let n = i.getBoundingClientRect();
			this.#s = {
				parent: a,
				index: Infinity,
				layout: {
					x: Math.round(Math.max(0, e - n.left - 10)),
					y: Math.round(Math.max(0, t - n.top - 10))
				}
			}, i.classList.add("lui-drop-in");
			return;
		}
		let s = (o.children ?? []).map((e) => this.#r.elementOf(e.id)).filter(Boolean), c = o.type === "ui.row", l = s.length;
		for (let [n, r] of s.entries()) {
			let i = r.getBoundingClientRect();
			if (c ? e < i.left + i.width / 2 : t < i.top + i.height / 2) {
				l = n;
				break;
			}
		}
		this.#s = {
			parent: a,
			index: l
		};
		let u = this.#n.getBoundingClientRect(), d = s[l] ?? s[l - 1], f = i.getBoundingClientRect(), p;
		if (!d) p = {
			left: f.left + 6,
			top: f.top + 6,
			width: f.width - 12,
			height: 3
		};
		else {
			let e = d.getBoundingClientRect(), t = !s[l];
			p = c ? {
				left: (t ? e.right : e.left) - 2,
				top: e.top,
				width: 3,
				height: e.height
			} : {
				left: e.left,
				top: (t ? e.bottom : e.top) - 2,
				width: e.width,
				height: 3
			};
		}
		let m = g("div", {
			class: "lui-drop-line",
			style: `left:${p.left - u.left}px;top:${p.top - u.top}px;width:${p.width}px;height:${p.height}px`
		});
		this.#n.append(m), i.classList.add("lui-drop-in");
	}
	#_(e = !0) {
		for (let e of this.#n.querySelectorAll(".lui-drop-line")) e.remove();
		for (let e of this.#n.querySelectorAll(".lui-drop-in")) e.classList.remove("lui-drop-in");
		e && (this.#s = null);
	}
	async #v(e) {
		let t = this.#y(e);
		t && await y(this.#e.win, {
			icon: "warning",
			title: O("window.removeQ"),
			text: O("window.removeObject", { schema: t.schema }),
			buttons: ["cancel", {
				value: "ok",
				label: O("explorer.remove"),
				danger: !0
			}]
		}) !== "ok" || (this.doc.remove([e]), this.select(null));
	}
	#y(e) {
		let t = this.#e.ws;
		if (!t?.project) return null;
		for (let [n, r] of Object.entries(t.project.data.schemas)) {
			let i = t.loaded(r)?.data.blocks.find((t) => this.#e.blockDef(t.type)?.role === "component" && t.config.window === this.name && t.config.component === e);
			if (i) return {
				schema: n,
				path: r,
				block: i.id
			};
		}
		return null;
	}
	async #b(e) {
		let t = this.#y(e);
		if (!t) return;
		await this.#e.openElement("schemas", t.path);
		let n = this.#e.current?.view;
		n?.canvas.select([t.block]), n?.canvas.fit([t.block]);
	}
	async #x(e, t, { show: n = !0 } = {}) {
		let r = this.#e.ws, i = r.project.data.schemas[t], a = (this.#e.catalog?.packages ?? []).flatMap((e) => e.blocks).find((e) => e.role === "component");
		if (!i || !a) return;
		let o = await r.doc(i), s = this.doc.find(e)?.node, c = o.data.view ?? {
			x: 0,
			y: 0,
			zoom: 1
		}, l = o.data.blocks.filter((e) => this.#e.blockDef(e.type)?.role === "component").length % 8 * 24, u = o.addBlock(a, {
			x: Math.round((-c.x + 300) / (c.zoom || 1)) + l,
			y: Math.round((-c.y + 160) / (c.zoom || 1)) + l,
			config: {
				window: this.name,
				component: e
			}
		});
		(s?.props?.label || s?.props?.text) && o.setLabel(u, String(s.props.label || s.props.text).slice(0, 80)), n ? await this.#b(e) : (this.#e.inspector.render(), this.#e.renderToolbar());
	}
	async #S(e, t) {
		let n = this.#e, r = n.ws, i = (n.catalog?.packages ?? []).some((e) => e.blocks.some((e) => e.role === "component"));
		if (!r?.project || !i) return;
		let a = Object.keys(r.project.data.schemas), o = "/new", s = await y(n.win, {
			icon: "blocks",
			title: O("window.askTitle", { name: n.label(t) }),
			text: O("window.askText"),
			fields: [{
				name: "schema",
				type: "select",
				label: O("window.inSchema"),
				value: a.includes(this.#l) ? this.#l : a[0] ?? o,
				options: [...a, {
					value: o,
					label: O("window.newSchema")
				}]
			}],
			buttons: [{
				value: "cancel",
				label: O("window.later")
			}, {
				value: "ok",
				label: O("window.makeObject"),
				primary: !0
			}]
		});
		if (s?.button !== "ok" || !this.doc.find(e)) return;
		let c = s.values.schema;
		if (!(c === o && (c = await this.#C(), !c))) {
			this.#l = c;
			try {
				await this.#x(e, c, { show: !1 });
			} catch (e) {
				y(n.win, {
					icon: "error",
					title: O("explorer.failed"),
					text: e.message
				});
			}
		}
	}
	async #C() {
		let e = this.#e, t = e.ws, n = t.groups.find((e) => e.key === "schemas")?.folder, r = await y(e.win, {
			icon: "blocks",
			title: O("explorer.new.schemas"),
			fields: [{
				name: "name",
				label: O("explorer.name"),
				value: this.name,
				required: !0,
				maxLength: 60,
				pattern: /^[^/\\:*?"<>|]+$/,
				invalid: O("explorer.badName")
			}],
			buttons: ["cancel", {
				value: "ok",
				label: O("common.create"),
				primary: !0
			}],
			validate: (e) => String(e.name).trim() in t.project.data.schemas ? O("ws.nameTaken", { name: String(e.name).trim() }) : !0
		});
		if (r?.button !== "ok" || !n) return null;
		try {
			let e = await t.createElement("schemas", n, r.values.name);
			return t.nameOf("schemas", e);
		} catch (t) {
			return y(e.win, {
				icon: "error",
				title: O("explorer.failed"),
				text: t.message
			}), null;
		}
	}
	inspector() {
		let e = this.#e, t = (e) => g("h5", { class: "ls-sec" }, e), n = (e, t) => g("label", { class: "ls-field" }, g("span", {}, e), t);
		if (!this.#a) {
			let e = this.doc.data;
			return [
				t(O("window.window")),
				n(O("window.title"), w({
					value: e.title,
					maxLength: 120,
					onChange: (e) => this.doc.setTitle(e)
				})),
				n(O("window.width"), w({
					type: "number",
					value: e.size.w,
					min: J.w,
					max: Y,
					onChange: (e) => this.doc.setSize({ w: Math.min(Y, Math.max(J.w, Number(e) || 480)) })
				})),
				n(O("window.height"), w({
					type: "number",
					value: e.size.h,
					min: J.h,
					max: Y,
					onChange: (e) => this.doc.setSize({ h: Math.min(Y, Math.max(J.h, Number(e) || 360)) })
				})),
				g("p", { class: "ls-hint" }, O("window.resizeHint")),
				g("div", { class: "ls-field" }, m({
					value: e.size.resizable !== !1,
					label: O("window.resizable"),
					onChange: (e) => this.doc.setSize({ resizable: e })
				})),
				t(O("window.opening")),
				n(O("window.state"), S({
					value: e.state ?? "normal",
					options: ["normal", "maximized"].map((e) => ({
						value: e,
						label: O(`window.state.${e}`)
					})),
					onChange: (e) => this.doc.setOptions({ state: e })
				})),
				g("div", { class: "ls-field" }, m({
					value: e.modal === !0,
					label: O("window.modal"),
					onChange: (e) => this.doc.setOptions({ modal: e })
				})),
				g("p", { class: "ls-hint" }, O("window.modalHint")),
				g("div", { class: "ls-field" }, m({
					value: e.onTop === !0,
					label: O("window.onTop"),
					onChange: (e) => this.doc.setOptions({ onTop: e })
				})),
				t(O("window.opens")),
				g("p", { class: "ls-hint" }, this.#w()),
				g("p", { class: "ls-hint" }, O("window.hint"))
			];
		}
		let r = this.doc.find(this.#a);
		if (!r) return [];
		let i = r.node, a = e.componentDef(i.type);
		if (!a) return [g("p", { class: "ls-insp-note warn" }, O("window.missing", { type: i.type }))];
		let o = [g("div", { class: "ls-insp-h cat-ui" }, _(a.icon ?? "window"), g("b", {}, e.label(a)), g("span", {
			class: "ls-hint mono",
			style: "margin-left:auto"
		}, i.id), G(e, a.type))];
		(a.props ?? []).length && o.push(t(O("inspector.settings")));
		for (let e of a.props ?? []) o.push(this.#T(i, e));
		if (!a.container) {
			let r = x(i, a, {
				lang: D.lang,
				component: {
					def: a,
					added: i.added ?? {
						inputs: [],
						outputs: []
					}
				}
			});
			o.push(t(O("inspector.ports"))), o.push(g("table", { class: "ls-ports" }, ...r.inputs.map((e) => g("tr", {}, g("td", { class: "nm" }, g("i", { class: `ls-dotc t-${e.type}` }), e.label), g("td", { class: "ty" }, `← ${O(`type.${e.type}`)}`))), ...r.outputs.filter((e) => !e.error).map((e) => g("tr", {}, g("td", { class: "nm" }, g("i", { class: `ls-dotc t-${e.type}` }), e.label), g("td", { class: "ty" }, `→ ${O(`type.${e.type}`)}`))))), o.push(g("p", { class: "ls-hint" }, O("window.portsHint"))), o.push(t(O("window.object")));
			let s = this.#y(i.id), c = e.ws;
			if (s) o.push(g("div", { class: "ls-port-line" }, _("blocks"), g("span", {}, `${s.schema} › ${s.block}`))), o.push(g("div", { class: "ls-insp-acts" }, f({
				label: O("window.openObject"),
				icon: _("open"),
				onClick: () => this.#b(i.id)
			})));
			else if (c?.project) {
				let e = Object.keys(c.project.data.schemas);
				o.push(g("p", { class: "ls-hint" }, O("window.noObject")));
				let t = e.includes(this.#l) ? this.#l : e[0];
				o.push(n(O("window.inSchema"), S({
					value: t,
					options: e,
					onChange: (e) => {
						t = e;
					}
				}))), o.push(g("div", { class: "ls-insp-acts" }, f({
					label: O("window.makeObject"),
					icon: _("plus"),
					primary: !0,
					onClick: () => this.#x(i.id, t)
				})));
			}
		}
		return o.push(g("div", { class: "ls-insp-acts" }, f({
			label: O("window.remove"),
			icon: _("trash"),
			danger: !0,
			onClick: () => this.#v(i.id)
		}))), o;
	}
	#w() {
		let e = this.#e.ws?.project?.data;
		if (!e) return "";
		if (e.main === this.name) return O("entry.main");
		let t = e.entrypoints?.[this.name];
		return O(t ? `entry.${t.kind}` : "entry.none");
	}
	#T(e, t) {
		let n = this.#e, r = e.props?.[t.key] ?? t.default, i = (n) => this.doc.setProp(e.id, t.key, n), a = n.label(t), o = (e) => g("label", { class: "ls-field" }, g("span", {}, a), e);
		switch (t.type) {
			case "checkbox": return g("div", { class: "ls-field" }, m({
				value: !!r,
				label: a,
				onChange: i
			}));
			case "number": return o(w({
				type: "number",
				value: r ?? "",
				min: t.min,
				max: t.max,
				step: t.step ?? "any",
				onChange: (e) => i(e === "" ? void 0 : Number(e))
			}));
			case "select": return o(S({
				value: r,
				options: (t.options ?? []).map((e) => e && typeof e == "object" ? {
					value: e.value,
					label: n.label(e)
				} : {
					value: e,
					label: Ee(t.key, e)
				}),
				onChange: i
			}));
			case "textarea": return o(K({
				value: r ?? "",
				onChange: i
			}));
			case "color": return o(Se({
				value: r ?? "",
				onChange: i
			}));
			case "icon": return o(S({
				value: r ?? "",
				options: we.map((e) => ({
					value: e,
					label: e || "—"
				})),
				onChange: i
			}));
			case "console": {
				let e = n.ws?.project?.data.consoles.list ?? [{
					id: "main",
					name: O("console.main")
				}];
				return o(S({
					value: r ?? "main",
					options: e.map((e) => ({
						value: e.id,
						label: e.name
					})),
					onChange: i
				}));
			}
			case "resource": {
				let e = this.#E();
				return o(S({
					value: r ?? "",
					options: [{
						value: "",
						label: "—"
					}, ...e.map((e) => ({
						value: e,
						label: e
					}))],
					onChange: i
				}));
			}
			case "action": {
				let e = r && typeof r == "object" ? r : { kind: "none" }, t = Object.keys(n.ws?.project?.data.windows ?? {}).filter((e) => e !== this.name);
				return g("div", { class: "ls-field" }, g("span", {}, a), S({
					value: e.kind,
					options: [
						"none",
						"open",
						"close"
					].map((e) => ({
						value: e,
						label: O(`action.${e}`)
					})),
					onChange: (e) => i(e === "open" ? {
						kind: e,
						window: t[0] ?? ""
					} : { kind: e })
				}), e.kind === "open" ? S({
					value: e.window,
					options: t,
					onChange: (t) => i({
						...e,
						window: t
					})
				}) : null, g("small", { class: "ls-hint" }, O("action.hint")));
			}
			default: return o(w({
				value: r ?? "",
				maxLength: 2e3,
				onChange: i
			}));
		}
	}
	#E() {
		let e = this.#e.ws, t = e?.groups.find((e) => e.key === "resources")?.folder, n = [], r = (t) => {
			for (let i of h.children(t)) i.type === "folder" ? r(i.id) : n.push(e.relative(i.id));
		};
		return t && r(t), n;
	}
};
function Ee(e, t) {
	let n = `opt.${e}.${t}`, r = O(n);
	return r === n ? String(t) : r;
}
// src/logicstudio/projectMap.js
var De = class extends c {
	constructor(e) {
		super({
			format: r.schema,
			name: "map",
			blocks: [],
			links: [],
			notes: [],
			view: {
				x: 0,
				y: 0,
				zoom: 1
			}
		}), this.map = e;
	}
	connect(e, t) {
		let n = this.map.portOf(e), r = this.map.portOf(t);
		return !n || !r || n.schema === r.schema ? !1 : this.map.project.link(`${n.schema}:${n.port}`, `${r.schema}:${r.port}`);
	}
	disconnect(e) {
		for (let t of e) {
			let e = this.map.portOf(t.from), n = this.map.portOf(t.to);
			e && n && this.map.project.unlink(`${e.schema}:${e.port}`, `${n.schema}:${n.port}`);
		}
	}
	place(e) {
		this.map.project.edit("mapMove", (t) => {
			t.map ??= {};
			for (let [n, [r, i]] of Object.entries(e)) t.map[this.map.keyOf(n)] = [Math.round(r), Math.round(i)];
		});
	}
	removeBlocks() {}
	duplicate() {
		return [];
	}
	setView(e) {
		this.map.view = e;
	}
	addBlock() {
		return null;
	}
}, Oe = class {
	el;
	canvas;
	view = null;
	#e;
	#t;
	#n = [];
	#r = /* @__PURE__ */ new Map();
	constructor(e) {
		this.#e = e, this.#t = new De(this), this.canvas = new i({
			schema: this.#t,
			catalog: { packages: [] },
			lang: D.lang,
			labels: { error: O("port.error") }
		}), this.el = g("div", { class: "ls-editor ls-map" }, this.canvas.el), this.canvas.on("select", () => e.inspector.render()), this.canvas.on("open", ({ id: t }) => {
			let [n, ...r] = t.split("__"), i = this.#i(t), a = e.ws.project.data[n === "s" ? "schemas" : "windows"][i];
			a && r && e.openElement(n === "s" ? "schemas" : "windows", a);
		}), this.project.on("change", () => this.rebuild()), e.ws.on("change", () => this.rebuild()), this.rebuild().then(() => requestAnimationFrame(() => this.canvas.fit()));
	}
	get project() {
		return this.#e.ws.project;
	}
	portOf([e, t]) {
		return this.#r.get(`${e}.${t}`) ?? null;
	}
	keyOf(e) {
		return `${e.startsWith("s__") ? "schema" : "window"}:${this.#a.get(e)}`;
	}
	#i(e) {
		return this.#a.get(e);
	}
	#a = /* @__PURE__ */ new Map();
	async rebuild() {
		let e = this.#e.ws, t = this.project.data, n = [], r = [], i = [];
		this.#r.clear(), this.#a.clear();
		let a = t.map ?? {}, o = 0, s = {};
		for (let [r, c] of Object.entries(t.schemas)) {
			let t = await e.doc(c).catch(() => null), l = t ? t.schemaPorts((e) => this.#e.blockDef(e)) : {
				inputs: [],
				outputs: []
			};
			s[r] = l;
			let u = `s__${o++}`;
			this.#a.set(u, r);
			let d = `map.s${o}`;
			i.push({
				type: d,
				version: 1,
				category: "schema",
				icon: "blocks",
				label: { en: r },
				inputs: l.inputs.map((e, t) => ({
					name: `i${t}`,
					label: e.name,
					type: e.type
				})),
				outputs: l.outputs.map((e, t) => ({
					name: `o${t}`,
					label: e.name,
					type: e.type
				}))
			}), l.inputs.forEach((e, t) => this.#r.set(`${u}.i${t}`, {
				schema: r,
				port: e.name
			})), l.outputs.forEach((e, t) => this.#r.set(`${u}.o${t}`, {
				schema: r,
				port: e.name
			}));
			let [f, p] = a[`schema:${r}`] ?? [40 + (o - 1) % 3 * 280, 40 + Math.floor((o - 1) / 3) * 220];
			n.push({
				id: u,
				type: d,
				v: 1,
				x: f,
				y: p,
				config: {},
				ports: {}
			});
		}
		for (let [r, s] of Object.entries(t.windows)) {
			let c = await e.doc(s).catch(() => null), l = `w__${o++}`;
			this.#a.set(l, r);
			let u = /* @__PURE__ */ new Set();
			for (let [n, i] of Object.entries(t.schemas)) e.loaded(i)?.componentObjects((e) => this.#e.blockDef(e)).some((e) => e.window === r) && u.add(n);
			let d = `map.w${o}`;
			i.push({
				type: d,
				version: 1,
				category: "ui",
				icon: "window",
				label: { en: `${r}${t.main === r ? " ★" : ""}` },
				inputs: [],
				outputs: [],
				config: [{
					key: "info",
					type: "text"
				}]
			});
			let [f, p] = a[`window:${r}`] ?? [40 + (o - 1) % 3 * 280, 300 + Math.floor((o - 1) / 3) * 160], m = c ? c.components((e) => this.#e.componentDef(e)).length : 0;
			n.push({
				id: l,
				type: d,
				v: 1,
				x: f,
				y: p,
				config: { info: u.size ? O("map.objectsIn", {
					list: [...u].join(", "),
					n: m
				}) : O("map.noObjects", { n: m }) },
				ports: {}
			});
		}
		let c = (e, t, n) => {
			for (let [r, i] of this.#r) if (i.schema === e && i.port === t && r.split(".")[1][0] === n) return r.split(".");
			return null;
		};
		for (let e of t.links) {
			let [t, n] = e.from.split(/:(.*)/s), [i, a] = e.to.split(/:(.*)/s), o = c(t, n, "o"), s = c(i, a, "i");
			o && s && r.push({
				from: o,
				to: s
			});
		}
		this.#n = i, this.canvas.setCatalog({ packages: [{
			name: "map",
			blocks: i
		}] }), this.#t.data = {
			...this.#t.data,
			blocks: n,
			links: r
		}, this.canvas.refresh(!0), this.#e.inspector.render();
	}
	setCatalog() {
		this.rebuild();
	}
	destroy() {
		this.canvas.destroy();
	}
	statusText() {
		return O("status.map", {
			schemas: Object.keys(this.project.data.schemas).length,
			windows: Object.keys(this.project.data.windows).length,
			links: this.project.data.links.length
		});
	}
	toolbar(e) {
		return [e("fit", O("tb.fit"), () => this.canvas.fit())];
	}
	inspector() {
		let e = this.project.data, t = this.canvas.selection.blocks, n = [];
		if (t.length === 1) {
			let r = this.#i(t[0]), i = t[0].startsWith("s__") ? "schemas" : "windows";
			return n.push(g("div", { class: "ls-insp-h" }, _(i === "schemas" ? "blocks" : "window"), g("b", {}, r))), n.push(g("p", { class: "ls-hint" }, e[i][r])), n.push(g("div", { class: "ls-insp-acts" }, f({
				label: O("explorer.open"),
				icon: _("open"),
				onClick: () => this.#e.openElement(i, e[i][r])
			}))), n;
		}
		n.push(g("h5", { class: "ls-sec" }, O("map.project"))), n.push(g("div", { class: "ls-field ro" }, g("span", {}, O("inspector.name")), g("b", {}, e.name))), n.push(g("div", { class: "ls-field ro" }, g("span", {}, O("map.main")), g("b", {}, e.main ?? "—"))), n.push(g("h5", { class: "ls-sec" }, O("map.links"))), e.links.length || n.push(g("p", { class: "ls-hint" }, O("map.noLinks")));
		for (let t of e.links) n.push(g("div", { class: "ls-port-line" }, g("span", {}, `${t.from.replace(":", " › ")}  →  ${t.to.replace(":", " › ")}`), g("button", {
			type: "button",
			class: "ls-link-btn danger",
			onclick: () => this.project.unlink(t.from, t.to)
		}, O("inspector.unlink"))));
		return n.push(g("p", { class: "ls-hint" }, O("map.hint"))), n;
	}
}, ke = class {
	el;
	#e;
	constructor(e) {
		this.#e = e, this.el = g("div", { class: "ls-insp" });
	}
	render() {
		let e = this.#e, t = e.current;
		if (e.collapsed?.right) {
			let t = () => e.setCollapsed("right", !1);
			this.el.replaceChildren(g("div", { class: "ls-insp-tabs" }, g("button", {
				type: "button",
				class: "ls-fold",
				title: O("side.expand"),
				"aria-expanded": "false",
				onclick: t
			}, _("arrowLeft"))), g("div", { class: "ls-vtabs" }, g("button", {
				type: "button",
				class: "ls-vtab on",
				title: O("inspector.title"),
				onclick: t
			}, g("span", {}, O("inspector.title")))));
			return;
		}
		let n = g("div", { class: "ls-insp-tabs" }, g("span", { class: "on" }, O("inspector.title")), g("i", { class: "sp" }), g("button", {
			type: "button",
			class: "ls-fold",
			title: O("side.collapse"),
			"aria-expanded": "true",
			onclick: () => e.setCollapsed("right", !0)
		}, _("arrowRight"))), r;
		r = t?.kind === "schema" ? this.#t(t.view) : t?.kind === "window" || t?.kind === "map" ? t.view.inspector?.() ?? [] : [g("p", { class: "ls-empty" }, O("inspector.nothing"))], this.el.replaceChildren(n, g("div", { class: "ls-insp-body" }, ...[r].flat()));
	}
	#t(e) {
		let { blocks: t, links: n, groups: r = [] } = e.selection, i = e.doc;
		if (r.length === 1 && !t.length) return this.#n(e, i.group(r[0]));
		if (t.length === 1 && !r.length) return this.#a(e, i.block(t[0]));
		if (t.length || r.length) {
			let n = t.filter((e) => !i.groupOf(e)).length;
			return [g("p", { class: "ls-insp-note" }, r.length ? O("group.manySel", {
				blocks: t.length,
				groups: r.length
			}) : O("inspector.many", { n: t.length })), g("div", { class: "ls-insp-acts col" }, n && !e.canvas.readOnly ? f({
				label: O("group.make"),
				icon: _("group"),
				primary: !0,
				onClick: () => e.canvas.groupSelection()
			}) : null, f({
				label: O("menu.removeBlocks", { n: t.length + r.length }),
				danger: !0,
				icon: "trash",
				onClick: () => e.canvas.removeSelection()
			}))];
		}
		if (n.length) return [g("p", { class: "ls-insp-note" }, O("inspector.links", { n: n.length })), g("div", { class: "ls-insp-acts" }, f({
			label: O("menu.removeLink"),
			danger: !0,
			icon: _("trash"),
			onClick: () => e.canvas.removeSelection()
		}))];
		let a = i.schemaPorts((e) => this.#e.blockDef(e)), o = [this.#_(O("inspector.schema"))];
		o.push(this.#v(O("inspector.name"), g("span", { class: "ls-ro" }, e.name))), o.push(this.#v(O("inspector.blocks"), g("span", { class: "ls-ro" }, String(i.data.blocks.length)))), o.push(this.#_(O("inspector.schemaPorts"))), !a.inputs.length && !a.outputs.length && o.push(g("p", { class: "ls-hint" }, O("inspector.noSchemaPorts")));
		for (let e of a.inputs) o.push(g("div", { class: "ls-port-line" }, _("portIn"), g("span", {}, e.name), g("em", {}, O(`type.${e.type}`))));
		for (let e of a.outputs) o.push(g("div", { class: "ls-port-line" }, _("portOut"), g("span", {}, e.name), g("em", {}, O(`type.${e.type}`))));
		return o.push(g("p", { class: "ls-hint" }, O("inspector.schemaHint"))), o;
	}
	#n(e, t) {
		if (!t) return [];
		let n = this.#e, r = e.doc, i = e.canvas.readOnly, a = [];
		a.push(g("div", { class: "ls-insp-h cat-group" }, _("group"), g("b", {}, t.name), G(n, "ide/groups"))), a.push(this.#v(O("inspector.name"), w({
			value: t.name,
			maxLength: 80,
			disabled: i,
			onChange: (e) => r.setGroup(t.id, { name: e })
		}))), a.push(g("div", { class: "ls-field" }, m({
			value: t.collapsed,
			label: O("group.collapsedField"),
			disabled: i,
			onChange: (e) => r.setGroup(t.id, { collapsed: e })
		}))), a.push(g("div", { class: "ls-field" }, m({
			value: t.thread,
			label: O("group.threadField"),
			disabled: i,
			onChange: (e) => r.setGroup(t.id, { thread: e })
		}))), a.push(g("p", { class: "ls-hint" }, O("group.threadHint"))), t.thread && t.blocks.some((e) => [
			"schemaIn",
			"schemaOut",
			"component"
		].includes(n.blockDef(r.block(e)?.type)?.role)) && a.push(g("p", { class: "ls-insp-note warn" }, O("group.threadNo"))), a.push(this.#_(O("group.run")));
		let o = r.data.links.filter((e) => e.to[0] === t.id), s = r.data.links.filter((e) => e.from[0] === t.id);
		if (a.push(g("p", { class: `ls-insp-note${o.length ? "" : " warn"}` }, o.length ? O("group.runOn", { n: o.length }) : O("group.runOff"))), a.push(g("p", { class: "ls-hint" }, O("group.runInside", { n: s.length }))), a.push(this.#_(O("group.exposed"))), !t.expose.length) a.push(g("p", { class: "ls-hint" }, O("group.noExposed")));
		else {
			let o = [];
			t.expose.forEach((a, s) => {
				let c = r.block(a.block), l = c && n.blockDef(c.type), u = l?.role === "component" ? e.componentOf(c) : null, d = l && x(c, l, {
					lang: D.lang,
					component: u,
					errorLabel: O("port.error")
				})[a.side === "in" ? "inputs" : "outputs"].find((e) => e.name === a.port);
				if (!d) return;
				let f = `${c.label || n.label(l)} › ${d.label}`;
				o.push(g("tr", {}, g("td", { class: "vis" }, g("span", { title: O(a.side === "in" ? "inspector.inputs" : "inspector.outputs") }, _(a.side === "in" ? "portIn" : "portOut"))), g("td", { class: "nm" }, g("i", { class: `ls-dotc t-${d.type}` }), w({
					value: a.name ?? "",
					placeholder: d.label,
					maxLength: 60,
					className: "ls-port-name",
					disabled: i,
					onChange: (e) => r.renameExposed(t.id, a.block, a.side, a.port, e)
				})), g("td", { class: "acts" }, g("span", { class: "ls-port-acts" }, g("button", {
					type: "button",
					class: "ls-icon-btn",
					title: O("inspector.up"),
					disabled: i || s === 0,
					onclick: () => r.moveExposed(t.id, s, s - 1)
				}, _("arrowUp")), g("button", {
					type: "button",
					class: "ls-icon-btn",
					title: O("inspector.down"),
					disabled: i || s === t.expose.length - 1,
					onclick: () => r.moveExposed(t.id, s, s + 1)
				}, _("arrowDown")), g("button", {
					type: "button",
					class: "ls-link-btn danger",
					disabled: i,
					onclick: () => this.#r(e, t, a, d.label)
				}, O("inspector.removePort")))))), o.push(g("tr", { class: "opts" }, g("td", { colspan: 3 }, g("span", { class: "ls-hint" }, f))));
			}), a.push(g("table", { class: "ls-ports" }, ...o));
		}
		return a.push(g("p", { class: "ls-hint" }, O("group.exposeHint"))), a.push(this.#_(O("inspector.blocks"))), a.push(g("p", { class: "ls-hint" }, O("group.blocks", { n: t.blocks.length }))), a.push(g("div", { class: "ls-insp-acts col" }, f({
			label: O("group.ungroup"),
			icon: _("group"),
			disabled: i,
			onClick: () => e.canvas.ungroupSelection()
		}), f({
			label: O("group.remove"),
			icon: _("trash"),
			danger: !0,
			disabled: i,
			onClick: () => e.canvas.removeSelection()
		}))), a;
	}
	async #r(e, t, n, r) {
		let i = e.doc, a = (e) => t.blocks.includes(e) || e === t.id, o = i.data.links.filter((e) => n.side === "out" ? e.from[0] === n.block && e.from[1] === n.port && !a(e.to[0]) : e.to[0] === n.block && e.to[1] === n.port && !a(e.from[0]));
		o.length && await y(this.#e.win, {
			icon: "warning",
			title: O("group.unexposeQ", { name: r }),
			text: O("inspector.removeLinks", { n: o.length }),
			buttons: ["cancel", {
				value: "ok",
				label: O("group.unexpose"),
				danger: !0
			}]
		}) !== "ok" || i.setExposed(t.id, n.block, n.side, n.port, !1);
	}
	#i(e, t, n, r) {
		let i = e.doc.groupOf(t.id);
		if (!i) return null;
		let a = n === "inputs" ? "in" : "out", o = i.expose.some((e) => e.block === t.id && e.side === a && e.port === r.name), s = O(o ? "group.unexpose" : "group.expose");
		return g("button", {
			type: "button",
			class: `ls-icon-btn ls-expose${o ? " on" : ""}`,
			title: s,
			"aria-label": `${s}: ${r.label}`,
			"aria-pressed": o ? "true" : "false",
			disabled: e.canvas?.readOnly,
			onclick: () => o ? this.#r(e, i, {
				block: t.id,
				side: a,
				port: r.name
			}, r.label) : e.doc.setExposed(i.id, t.id, a, r.name, !0)
		}, _(n === "inputs" ? "portIn" : "portOut"));
	}
	#a(e, t) {
		if (!t) return [];
		let n = this.#e, r = e.doc, i = n.blockDef(t.type), a = [];
		if (!i) return [g("p", { class: "ls-insp-note warn" }, O("block.missingText", { type: t.type })), g("div", { class: "ls-insp-acts" }, f({
			label: O("menu.removeBlock"),
			danger: !0,
			icon: _("trash"),
			onClick: () => e.canvas.removeSelection()
		}))];
		a.push(g("div", { class: `ls-insp-h cat-${i.category}` }, _(i.icon ?? "blocks"), g("b", {}, n.label(i)), G(n, W(n, t, (t) => e.componentOf(t))))), i.description && a.push(g("p", { class: "ls-hint" }, n.label({ label: i.description }))), i.obsolete && a.push(g("p", { class: "ls-insp-note warn" }, [O("block.obsolete"), n.label({ label: i.obsolete })].filter(Boolean).join(" "))), i.role || a.push(this.#v(O("inspector.label"), w({
			value: t.label ?? "",
			placeholder: n.label(i),
			maxLength: 80,
			onChange: (e) => r.setLabel(t.id, e.trim())
		})));
		let o = r.groupOf(t.id);
		o && a.push(g("div", { class: "ls-port-line" }, _("group"), g("span", {}, O("group.inGroup", { name: o.name })), g("button", {
			type: "button",
			class: "ls-link-btn",
			onclick: () => e.canvas.select([], [], { groups: [o.id] })
		}, O("group.show")))), i.role === "component" && a.push(...this.#h(e, t));
		let s = (i.config ?? []).filter((e) => i.role !== "component");
		if (s.length) {
			a.push(this.#_(O("inspector.settings")));
			for (let r of s) (!r.when || Object.entries(r.when).every(([e, n]) => Array.isArray(n) ? n.includes(t.config[e]) : t.config[e] === n)) && (r.type === "checkbox" ? a.push(g("div", { class: "ls-field" }, m({
				value: !!t.config[r.key],
				label: n.label(r),
				onChange: (n) => e.doc.setConfig(t.id, r.key, n)
			}))) : a.push(this.#v(n.label(r), this.#d(e, t, i, r))));
			(i.role === "schemaIn" || i.role === "schemaOut") && a.push(...this.#m(e, t, i));
		}
		if (i.role === "drawing") return a.push(g("p", { class: "ls-hint" }, O("inspector.drawingHint"))), a.push(this.#_(O("inspector.block"))), a.push(g("p", { class: "ls-hint mono" }, `${i.type} v${i.version}`)), a;
		let c = i.role === "component" ? e.canvas && this.#g(e, t) : null, l = x(t, i, {
			lang: D.lang,
			component: c,
			errorLabel: O("port.error")
		});
		if (a.push(this.#_(O("inspector.ports"))), a.push(this.#o(e, t, i, l, c)), i.grow && !c) {
			let e = [];
			for (let a of ["inputs", "outputs"]) {
				let o = i.grow[a];
				if (!o) continue;
				let s = t.added?.[a]?.length ?? 0, c = Math.min(o.max, n.limits?.maxAddedPorts ?? 32);
				e.push(f({
					label: O(a === "inputs" ? "inspector.addInput" : "inspector.addOutput"),
					icon: _("plus"),
					primary: !0,
					onClick: () => {
						try {
							r.addPort(t.id, i, a, {
								limit: c,
								lang: D.lang
							});
						} catch (e) {
							y(n.win, {
								icon: "warning",
								title: e.message
							});
						}
					}
				})), s >= c && (e.at(-1).disabled = !0), e.push(g("span", { class: "ls-hint" }, O("inspector.addedCount", {
					n: s,
					max: c
				})));
			}
			a.push(g("div", { class: "ls-insp-acts col" }, ...e));
		}
		a.push(this.#_(O("inspector.block")));
		let u = (n.catalog?.packages ?? []).find((e) => e.blocks.some((e) => e.type === i.type));
		return a.push(g("p", { class: "ls-hint mono" }, `${i.type} v${i.version}${u ? ` · ${u.name} ${u.version}` : ""}`)), a;
	}
	#o(e, t, n, r, i) {
		let a = e.doc, o = [];
		for (let s of ["inputs", "outputs"]) {
			let c = r[s];
			if (!c.length) continue;
			o.push(g("tr", { class: "side" }, g("th", { colspan: 4 }, O(s === "inputs" ? "inspector.inputs" : "inspector.outputs"))));
			let l = c.filter((e) => e.added);
			for (let r of c) {
				let c = r.added && n.grow?.[s]?.name === "user" && !i ? w({
					value: r.label,
					maxLength: 60,
					className: "ls-port-name",
					onChange: (e) => a.renamePort(t.id, s, r.name, e)
				}) : g("span", { class: r.added ? "added" : "" }, r.label), u;
				if (!r.added) u = g("span", {
					class: "ls-lock",
					title: O("inspector.basePort")
				}, _("lock"));
				else if (i) u = g("span", { class: "ls-hint" }, O("inspector.ofComponent"));
				else {
					let n = l.indexOf(r);
					u = g("span", { class: "ls-port-acts" }, g("button", {
						type: "button",
						class: "ls-icon-btn",
						title: O("inspector.up"),
						disabled: n === 0,
						onclick: () => a.movePort(t.id, s, n, n - 1)
					}, _("arrowUp")), g("button", {
						type: "button",
						class: "ls-icon-btn",
						title: O("inspector.down"),
						disabled: n === l.length - 1,
						onclick: () => a.movePort(t.id, s, n, n + 1)
					}, _("arrowDown")), g("button", {
						type: "button",
						class: "ls-link-btn danger",
						onclick: () => this.#u(e, t, s, r)
					}, O("inspector.removePort")));
				}
				o.push(g("tr", { class: `${r.error ? "err" : ""}${r.hidden && !this.#s(a, t, s, r) ? " hid" : ""}` }, g("td", { class: `vis${a.groupOf(t.id) ? " two" : ""}` }, this.#c(e, t, s, r), this.#i(e, t, s, r)), g("td", { class: "nm" }, g("i", { class: `ls-dotc t-${r.type}` }), c), g("td", { class: "ty" }, O(`type.${r.type}`)), g("td", { class: "acts" }, u))), s === "inputs" && !r.error && !i && o.push(g("tr", { class: "opts" }, g("td", { colspan: 4 }, this.#l(a, t, r))));
			}
		}
		return g("table", { class: "ls-ports" }, ...o);
	}
	#s(e, t, n, r) {
		return e.linksOf(t.id, r.name, n).length > 0;
	}
	#c(e, t, n, r) {
		let i = this.#s(e.doc, t, n, r), a = r.hidden && !i, o = `${n}:${r.name}`;
		return g("button", {
			type: "button",
			class: `ls-icon-btn ls-eye${a ? " off" : ""}`,
			title: O(i ? "inspector.linkedPort" : a ? "inspector.showPort" : "inspector.hidePort"),
			"aria-label": `${O(i ? "inspector.linkedPort" : a ? "inspector.showPort" : "inspector.hidePort")}: ${r.label}`,
			"aria-disabled": i ? "true" : null,
			disabled: e.canvas?.readOnly,
			dataset: { eye: o },
			onclick: () => {
				i || (e.doc.setPortHidden(t.id, n, r.name, !a, r.hiddenByDefault), [...this.el.querySelectorAll("[data-eye]")].find((e) => e.dataset.eye === o)?.focus());
			}
		}, _(a ? "eyeOff" : "eye"));
	}
	#l(e, t, n) {
		let r = t.ports?.[n.name] ?? {};
		return g("span", { class: "ls-in-opts" }, m({
			value: r.trigger !== !1,
			label: O("inspector.starts"),
			onChange: (r) => e.setPort(t.id, n.name, { trigger: r })
		}), n.type === "pulse" ? null : w({
			value: r.start === void 0 ? "" : JSON.stringify(r.start),
			placeholder: O("inspector.startValue"),
			className: "ls-start",
			mono: !0,
			onChange: (r) => {
				let i = r.trim();
				if (i === "") i = null;
				else try {
					i = JSON.parse(i);
				} catch {}
				e.setPort(t.id, n.name, { start: i });
			}
		}));
	}
	async #u(e, t, n, r) {
		let i = e.doc, a = i.linksOf(t.id, r.name, n);
		a.length && await y(this.#e.win, {
			icon: "warning",
			title: O("inspector.removeQ", { name: r.label }),
			text: O("inspector.removeLinks", { n: a.length }),
			buttons: ["cancel", {
				value: "ok",
				label: O("inspector.removePort"),
				danger: !0
			}]
		}) !== "ok" || i.removePort(t.id, n, r.name);
	}
	#d(e, t, n, r) {
		let i = e.doc, a = this.#e, o = t.config[r.key], s = (s) => {
			(n.role === "schemaIn" || n.role === "schemaOut") && r.key === "port" && a.ws?.project && a.ws.project.renamePortRef(e.name, String(o ?? ""), String(s)), i.setConfig(t.id, r.key, s);
		};
		switch (r.type) {
			case "checkbox": return m({
				value: !!o,
				onChange: s
			});
			case "select": return S({
				value: o,
				options: (r.options ?? []).map((e) => typeof e == "object" ? {
					value: e.value,
					label: a.label(e)
				} : {
					value: e,
					label: Ae(r.key, e)
				}),
				onChange: s
			});
			case "number": return w({
				type: "number",
				value: o ?? "",
				min: r.min,
				max: r.max,
				step: r.step ?? "any",
				onChange: (e) => s(e === "" ? null : Number(e))
			});
			case "console": return S({
				value: o ?? "main",
				options: this.#p().map((e) => ({
					value: e.id,
					label: e.name
				})),
				onChange: s
			});
			case "secret": return this.#f(o, s);
			case "code": return K({
				value: o ?? "",
				onChange: s,
				rows: 6,
				maxLength: r.maxLength ?? 2e4,
				mono: !0,
				className: "ls-code",
				label: a.label(r)
			});
			case "json": return w({
				value: o === void 0 ? "" : JSON.stringify(o),
				mono: !0,
				onChange: (e) => {
					try {
						s(JSON.parse(e));
					} catch {
						s(e);
					}
				}
			});
			case "textarea": return K({
				value: o ?? "",
				onChange: s
			});
			case "color": return Se({
				value: o ?? "",
				onChange: s
			});
			default: return w({
				value: o ?? "",
				maxLength: 2e3,
				onChange: s
			});
		}
	}
	#f(e, t) {
		let n = typeof e == "string" && e !== "", r = g("div", { class: "ls-secret-status" }, O(n ? "inspector.secretSaved" : "inspector.secretEmpty")), i = w({
			type: "password",
			value: "",
			placeholder: n ? "••••••••" : "",
			onChange: async (e) => {
				if (e !== "") try {
					t(await v.seal(e));
				} catch (e) {
					r.textContent = O("inspector.secretFailed", { message: e?.message ?? String(e) });
				}
			}
		}), a = n ? f({
			label: O("inspector.secretClear"),
			onClick: () => t("")
		}) : null;
		return g("div", { class: "ls-secret" }, i, r, a);
	}
	#p() {
		return (this.#e.ws?.project?.data.consoles.list ?? this.#e.current?.doc?.data.consoles?.list ?? [{
			id: "main",
			name: O("console.main")
		}]).map((e) => ({
			id: e.id,
			name: e.id === "main" ? `${e.name || O("console.main")} ★` : e.name
		}));
	}
	#m(e, t, n) {
		let r = this.#e.ws?.project;
		if (!r) return [g("p", { class: "ls-hint" }, O("inspector.aloneHint"))];
		let i = `${e.name}:${t.config.port}`, a = r.data.links.filter((e) => n.role === "schemaOut" ? e.from === i : e.to === i), o = [this.#_(O("inspector.projectLinks"))];
		a.length || o.push(g("p", { class: "ls-hint" }, O("inspector.noProjectLinks")));
		for (let e of a) {
			let t = n.role === "schemaOut" ? e.to : e.from;
			o.push(g("div", { class: "ls-port-line" }, _(n.role === "schemaOut" ? "arrowRight" : "arrowLeft"), g("span", {}, t.replace(":", " › ")), g("button", {
				type: "button",
				class: "ls-link-btn danger",
				onclick: () => r.unlink(e.from, e.to)
			}, O("inspector.unlink"))));
		}
		return o.push(g("div", { class: "ls-insp-acts" }, f({
			label: O("inspector.inMap"),
			icon: _("grid"),
			onClick: () => this.#e.openMap()
		}))), o;
	}
	#h(e, t) {
		let n = this.#e.ws, r = [this.#_(O("inspector.component"))];
		if (!n?.project) return [...r, g("p", { class: "ls-hint" }, O("inspector.componentAlone"))];
		let i = Object.keys(n.project.data.windows);
		r.push(this.#v(O("inspector.window"), S({
			value: t.config.window,
			options: i,
			onChange: (n) => {
				e.doc.setConfig(t.id, "window", n), e.doc.setConfig(t.id, "component", "");
			}
		})));
		let a = n.loaded(n.project.data.windows[t.config.window] ?? ""), o = a ? a.components((e) => this.#e.componentDef(e)).map((e) => ({
			value: e.id,
			label: `${e.props?.label || e.props?.text || e.id} · ${this.#e.label(this.#e.componentDef(e.type)) || e.type}`
		})) : [];
		return r.push(this.#v(O("inspector.componentName"), S({
			value: t.config.component,
			options: [{
				value: "",
				label: "—"
			}, ...o],
			onChange: (n) => e.doc.setConfig(t.id, "component", n)
		}))), r;
	}
	#g(e, t) {
		let n = this.#e.ws, r = n?.project?.data.windows[t.config.window], i = r ? n.loaded(r)?.find(t.config.component)?.node : null;
		return i ? {
			def: this.#e.componentDef(i.type),
			added: i.added ?? {
				inputs: [],
				outputs: []
			}
		} : null;
	}
	#_(e) {
		return g("h5", { class: "ls-sec" }, e);
	}
	#v(e, t) {
		return g("label", { class: "ls-field" }, g("span", {}, e), t);
	}
};
function Ae(e, t) {
	let n = `opt.${e}.${t}`, r = O(n);
	return r === n ? String(t) : r;
}
// src/logicstudio/bottom.js
var je = class {
	el;
	#e;
	#t;
	#n;
	#r = "main";
	#i = /* @__PURE__ */ new Map();
	#a = [];
	#o = !1;
	constructor(e) {
		this.#n = e, this.#e = g("div", {
			class: "ls-btabs",
			role: "tablist"
		}), this.#t = g("div", { class: "ls-bbody" }), this.el = g("div", { class: "ls-bottom" }, this.#e, this.#t);
	}
	#s() {
		let e = this.#n.runner.consoles;
		return e ? e.list().map((e) => ({
			id: e.id,
			name: e.name,
			color: e.color,
			main: e.main,
			ask: !!e.ask
		})) : (this.#n.ws?.project?.data.consoles.list ?? [{
			id: "main",
			name: O("console.main")
		}]).map((e) => ({
			id: e.id,
			name: e.id === "main" ? e.name || O("console.main") : e.name,
			color: e.color ?? null,
			main: e.id === "main",
			ask: !1
		}));
	}
	attach(e) {
		for (let e of this.#i.values()) e.destroy();
		this.#i.clear(), e && (e.on("change", () => this.render()), e.on("ask", ({ console: e }) => {
			this.#r = e, this.#o = !1, this.render(), this.#i.get(e)?.focus();
		}), e.on("done", () => this.render())), this.render();
	}
	setProblems(e) {
		this.#a = e, e.length && (this.#r = "problems", this.#o = !1), this.render();
	}
	render() {
		let e = this.#s();
		this.#r !== "problems" && !e.some((e) => e.id === this.#r) && (this.#r = "main");
		let t = (e, t, n = []) => g("button", {
			type: "button",
			role: "tab",
			class: this.#r === e ? "on" : "",
			"aria-selected": String(this.#r === e),
			onclick: () => {
				this.#r = e, this.#o = !1, this.render();
			}
		}, ...n, t), n = e.map((e) => t(e.id, e.name, [g("i", {
			class: "cdot",
			style: `background:${e.color || "#6b7280"}`
		}), ...e.main ? [g("b", {
			class: "star",
			title: O("console.mainHint")
		}, "★")] : []]));
		for (let [t, r] of e.entries()) r.ask && n[t].append(g("b", {
			class: "kb",
			title: O("console.asking")
		}, "⌨"));
		let r = this.#n.ws, i = [g("span", { class: "sp" })];
		if (this.#r !== "problems" && this.#n.runner.consoles && i.push(g("button", {
			type: "button",
			class: "act",
			onclick: () => this.#d(this.#r)
		}, O("console.detach"))), i.push(g("button", {
			type: "button",
			class: "act",
			title: O(this.#o ? "console.expand" : "console.collapse"),
			onclick: () => {
				this.#o = !this.#o, this.render();
			}
		}, _(this.#o ? "arrowUp" : "arrowDown"))), this.#e.replaceChildren(...n, r?.project ? g("button", {
			type: "button",
			class: "add",
			title: O("console.add"),
			onclick: () => this.#u()
		}, "+") : null, g("span", { class: "bsep" }), t("problems", O("problems.title"), this.#a.length ? [g("span", { class: "n" }, String(this.#a.length))] : []), ...i), this.el.classList.toggle("collapsed", this.#o), this.#o) {
			this.#t.replaceChildren();
			return;
		}
		if (this.#r === "problems") {
			this.#t.replaceChildren(this.#c());
			return;
		}
		let o = this.#n.runner.consoles;
		if (!o) {
			this.#t.replaceChildren(g("p", { class: "ls-empty" }, O("console.idle")));
			return;
		}
		let s = this.#i.get(this.#r);
		s || (s = new a(o, {
			console: this.#r,
			labels: {
				hint: O("console.hint"),
				kinds: {
					text: O("kind.text"),
					number: O("kind.number"),
					bool: O("kind.bool"),
					key: O("kind.key")
				}
			}
		}), this.#i.set(this.#r, s)), this.#t.replaceChildren(s.el);
	}
	#c() {
		return this.#a.length ? g("ul", { class: "ls-problems" }, ...this.#a.map((e) => g("li", {
			class: e.level ?? "error",
			tabIndex: 0,
			onclick: () => this.#l(e.where),
			onkeydown: (t) => {
				t.key === "Enter" && this.#l(e.where);
			}
		}, _(e.level === "warning" ? "warning" : "error"), g("span", {}, e.message), e.where?.schema ? g("em", {}, e.where.schema) : e.where?.window ? g("em", {}, e.where.window) : null))) : g("p", { class: "ls-empty" }, O("problems.none"));
	}
	async #l(e) {
		let t = this.#n;
		if (e && t.ws) {
			if (e.schema) {
				let n = t.ws.project?.data.schemas[e.schema] ?? (t.ws.single ? [...t.tabs].find((e) => e.kind === "schema")?.path : null);
				if (!n) return;
				await t.openElement("schemas", n), e.block && (t.current?.view.canvas.select([e.block]), t.current?.view.canvas.fit([e.block]));
			} else if (e.window) {
				let n = t.ws.project?.data.windows[e.window];
				n && t.openElement("windows", n);
			}
		}
	}
	async #u() {
		let e = this.#n.ws?.project;
		if (!e) return;
		let t = await y(this.#n.win, {
			icon: "terminal",
			title: O("console.add"),
			fields: [{
				name: "name",
				label: O("explorer.name"),
				value: "",
				required: !0,
				maxLength: 60
			}],
			buttons: ["cancel", {
				value: "ok",
				label: O("common.create"),
				primary: !0
			}]
		});
		t?.button === "ok" && (this.#r = e.addConsole(t.values.name.trim()), this.render());
	}
	#d(e) {
		let t = this.#n.runner.consoles, n = t?.get(e);
		if (!n) return;
		let r = new d({
			title: O("console.windowTitle", { name: n.name }),
			subtitle: this.#n.ws?.name ?? "",
			icon: "terminal",
			width: 560,
			height: 340
		}), i = new a(t, {
			console: e,
			labels: { hint: O("console.hint") }
		});
		r.body.append(i.el), r.on("destroy", () => i.destroy()), this.#n.openWindow(r, `console-${e}`);
	}
}, X = "logicstudio.args";
function Me(e) {
	let t = [], n = "", r = !1, i = null, a = String(e ?? "");
	for (let e = 0; e < a.length; e++) {
		let o = a[e];
		i === "'" ? o === "'" ? i = null : n += o : o === "\\" && e + 1 < a.length && (i !== "\"" || "\"\\$`".includes(a[e + 1])) ? (n += a[++e], r = !0) : i === "\"" ? o === "\"" ? i = null : n += o : o === "'" || o === "\"" ? (i = o, r = !0) : /\s/.test(o) ? r &&= (t.push(n), n = "", !1) : (n += o, r = !0);
	}
	return r && t.push(n), t;
}
var Ne = class {
	program = null;
	live = null;
	result = "";
	consoles = null;
	#e;
	#t = null;
	#n = 5;
	constructor(e) {
		this.#e = e;
	}
	statusText() {
		if (!this.program) return "";
		let e = Math.floor((Date.now() - (this.program.started ?? Date.now())) / 1e3);
		return O("run.testing", { time: `${String(Math.floor(e / 60)).padStart(2, "0")}:${String(e % 60).padStart(2, "0")}` });
	}
	async test() {
		let e = this.#e;
		if (!e.ws || this.program) return;
		e.bottom.setProblems([]);
		let t;
		try {
			t = await e.ws.documents();
		} catch (t) {
			e.bottom.setProblems([{ message: t.message }]);
			return;
		}
		let n = this.#a(t);
		if (n.some((e) => e.level !== "warning")) e.bottom.setProblems(n);
		else {
			this.result = "";
			try {
				let n = await v.status().catch(() => null);
				this.#n = n?.limits?.testMinutes ?? 5;
				let r = Me(this.argsText());
				this.program = await v.start({
					kind: "test",
					name: e.ws.name,
					documents: t,
					lang: D.lang,
					watch: !0,
					...r.length && { args: r }
				});
			} catch (t) {
				e.bottom.setProblems([...n, {
					message: t.message,
					where: t.details?.where ?? null
				}]);
				return;
			}
			n.length && e.bottom.setProblems(n), this.live = v.live(this.program.id), this.consoles = new o(this.live), this.live.on("status", ({ status: t, error: n }) => {
				t !== "running" && (t === "failed" && n && e.bottom.setProblems([{ message: n }]), this.#i());
			}), this.live.on("finished", ({ value: e }) => {
				let t = JSON.stringify(e) ?? "null";
				this.result = O("run.closed", { value: t.length > 60 ? `${t.slice(0, 59)}…` : t });
			}), this.live.on("gone", () => this.#i()), this.live.on("error", ({ message: t }) => e.bottom.setProblems([{ message: t }])), e.bottom.attach(this.consoles), this.attachAll(), this.#t = setInterval(() => {
				e.renderToolbar(), e.renderStatus();
			}, 1e3), e.renderToolbar();
		}
	}
	argsText() {
		let e = this.#r(), t = C.get(X, {}) ?? {};
		return e && typeof t[e] == "string" ? t[e] : "";
	}
	#r() {
		let e = this.#e.ws, t = e?.projectFile ?? e?.single;
		try {
			return t ? h.path(t) : null;
		} catch {
			return null;
		}
	}
	async editArgs() {
		let e = this.#e, t = this.#r();
		if (!t) return;
		let n = await y(e.win, {
			icon: "info",
			title: O("args.title"),
			text: O("args.text"),
			fields: [{
				name: "args",
				label: O("args.label"),
				value: this.argsText(),
				placeholder: O("args.placeholder"),
				maxLength: 4e3
			}],
			buttons: ["cancel", {
				value: "ok",
				label: O("args.save"),
				primary: !0
			}],
			width: 520
		});
		if (n?.button !== "ok") return;
		let r = { ...C.get(X, {}) ?? {} }, i = String(n.values.args ?? "").trim();
		i ? r[t] = i : delete r[t];
		let a = Object.keys(r);
		for (let e of a.slice(0, Math.max(0, a.length - 50))) delete r[e];
		try {
			C.set(X, r);
		} catch {}
		e.renderToolbar();
	}
	attachAll() {
		for (let e of this.#e.tabs) this.attachTab(e);
	}
	attachTab(e) {
		this.live && (e.kind === "schema" && e.view.canvas.attach(this.live, e.label), e.kind === "window" && e.view.attach?.(this.live, e.label));
	}
	async stop() {
		if (!this.program) return;
		let e = this.program.id;
		this.#i(), await v.stop(e).catch(() => {});
	}
	#i() {
		if (this.program) {
			clearInterval(this.#t);
			for (let e of this.#e.tabs) e.kind === "schema" && e.view.canvas.detach(), e.kind === "window" && e.view.detach?.();
			this.live?.close(), this.program = null, this.live = null, this.#e.renderToolbar(), this.#e.renderStatus();
		}
	}
	async activate() {
		let e = this.#e, t = e.ws;
		if (!t) return;
		if (t.dirty) {
			if (await y(e.win, {
				icon: "warning",
				title: O("run.saveFirst"),
				text: O("run.saveFirstText"),
				buttons: ["cancel", {
					value: "save",
					label: O("close.saveAll"),
					primary: !0
				}]
			}) !== "save") return;
			await e.saveAll();
		}
		let n = t.projectFile ?? t.single, r = h.path(n);
		try {
			let n = (await v.programs()).filter((e) => e.kind === "active" && e.source?.path === r);
			if (n.length) {
				if (await y(e.win, {
					icon: "power",
					title: O("run.alreadyActive", { name: t.name }),
					text: O("run.alreadyActiveText"),
					buttons: ["cancel", {
						value: "replace",
						label: O("run.replace"),
						primary: !0
					}]
				}) !== "replace") return;
				for (let e of n) await v.forget(e.id);
			}
			let i = await t.documents(), a = await v.start({
				kind: "active",
				name: t.name,
				documents: i,
				source: { path: r },
				lang: D.lang
			});
			await y(e.win, {
				icon: "power",
				title: O("run.activated", { name: a.name }),
				text: O("run.activatedText")
			}), e.home.refresh();
		} catch (t) {
			e.bottom.setProblems([{
				message: t.message,
				where: t.details?.where ?? null
			}]);
		}
	}
	#a(e) {
		let t = this.#e, n = [];
		for (let [r, i] of Object.entries(e.schemas)) for (let a of i.blocks ?? []) {
			let i = t.blockDef(a.type);
			if (!i) n.push({
				message: O("problems.missingBlock", {
					block: a.label ?? a.id,
					type: a.type
				}),
				where: {
					schema: r,
					block: a.id
				}
			});
			else {
				if (i.role === "component") {
					let t = e.windows[a.config?.window];
					t ? JSON.stringify(t.root).includes(`"id":"${a.config.component}"`) || n.push({
						message: O("problems.noComponent", {
							block: a.id,
							component: a.config?.component ?? ""
						}),
						where: {
							schema: r,
							block: a.id
						}
					}) : n.push({
						message: O("problems.noWindow", {
							block: a.id,
							window: a.config?.window ?? ""
						}),
						where: {
							schema: r,
							block: a.id
						}
					});
				}
				i.role !== "schemaIn" && i.role !== "schemaOut" || String(a.config?.port ?? "").trim() || n.push({
					message: O("problems.noPortName"),
					where: {
						schema: r,
						block: a.id
					}
				});
			}
		}
		return e.project && Object.keys(e.windows).length && !e.project.main && n.push({
			level: "warning",
			message: O("problems.noMain")
		}), n;
	}
}, Pe = class {
	el;
	#e;
	#t = g("div", { class: "ls-home-progs" });
	#n = g("div", { class: "ls-usage" });
	constructor(e) {
		this.#e = e, this.el = g("div", { class: "ls-editor ls-home" }), this.render();
	}
	show() {
		this.render(), this.refresh();
	}
	render() {
		let e = this.#e, t = $.list().map((e) => h.get(e)).filter(Boolean);
		this.el.replaceChildren(g("div", { class: "ls-home-main" }, g("h2", {}, _("blocks"), O("app.name")), g("p", { class: "ls-hint" }, O("home.intro")), g("div", { class: "ls-home-acts" }, f({
			label: O("home.new"),
			icon: _("plus"),
			primary: !0,
			onClick: () => e.newProject()
		}), f({
			label: O("home.open"),
			icon: _("open"),
			onClick: () => e.openProjectPicker()
		})), g("h3", {}, O("home.recent")), t.length ? g("ul", { class: "ls-recent" }, ...t.map((t) => g("li", {}, g("button", {
			type: "button",
			onclick: () => e.open(t.id)
		}, _(t.name.endsWith(".lsch") ? "blocks" : "grid"), g("b", {}, t.name.replace(/\.(lsproj|lsch)$/i, "")), g("small", {}, h.path(t.parent)))))) : g("p", { class: "ls-empty" }, O("home.noRecent")), g("h3", {}, O("home.programs")), this.#t), g("div", { class: "ls-home-side" }, g("h3", {}, O("home.usage")), this.#n));
	}
	async refresh() {
		let e = [], t = null;
		try {
			[e, t] = await Promise.all([v.programs(), v.status()]);
		} catch {
			this.#t.replaceChildren(g("div", { class: "ls-notice" }, _("warning"), g("span", {}, O("home.noEngine")), f({
				label: O("home.appstore"),
				onClick: () => oe("appstore")
			}))), this.#n.replaceChildren();
			return;
		}
		e.length ? this.#t.replaceChildren(g("table", { class: "ls-progs" }, g("tr", {}, g("th", {}, O("home.colName")), g("th", {}, O("home.colKind")), g("th", {}, O("home.colState")), g("th", {}, O("home.colSince")), g("th", {})), ...e.map((e) => g("tr", {}, g("td", {}, g("b", {}, e.name), e.source?.path ? g("small", {}, e.source.path) : null, e.error ? g("small", { class: "err" }, e.error) : null), g("td", {}, O(`kind.${e.kind}`)), g("td", {}, g("span", { class: `ls-st ${e.status}` }, O(`state.${e.status}`))), g("td", {}, e.started ? D.date(e.started, {
			dateStyle: "short",
			timeStyle: "short"
		}) : "—"), g("td", { class: "acts" }, e.status === "running" && e.windows?.length && T.logicHost ? g("button", {
			type: "button",
			class: "ls-link-btn",
			onclick: () => T.logicHost.openMain(e.id)
		}, O("home.openWindow")) : null, e.source?.path && h.resolve(e.source.path) ? g("button", {
			type: "button",
			class: "ls-link-btn",
			onclick: () => this.#e.open(h.resolve(e.source.path).id)
		}, O("home.openProject")) : null, e.status === "running" || e.status === "starting" ? g("button", {
			type: "button",
			class: "ls-link-btn",
			onclick: () => this.#r(e)
		}, O("home.stop")) : g("button", {
			type: "button",
			class: "ls-link-btn danger",
			onclick: () => v.forget(e.id).then(() => this.refresh())
		}, O("home.forget"))))))) : this.#t.replaceChildren(g("p", { class: "ls-empty" }, O("home.noPrograms")));
		let n = t.quota, r = (e, t, n, r = `${t} / ${n}`) => g("div", { class: "ls-u" }, g("span", {}, e), g("b", {}, r), g("i", { class: "bar" }, g("i", { style: `width:${n ? Math.min(100, t / n * 100) : 0}%` })));
		this.#n.replaceChildren(r(O("usage.active"), t.active, n.maxActive), r(O("usage.tests"), t.tests, n.maxTests), r(O("usage.net"), t.net, n.netPerMinute), r(O("usage.log"), t.log, n.logMb * 1024 * 1024, `${Math.round(t.log / 1024)} KB / ${n.logMb} MB`), g("p", { class: "ls-hint" }, O("usage.cpuMem", {
			cpu: n.cpuPercent,
			mem: n.memoryMb
		})));
	}
	async #r(e) {
		(e.kind !== "active" || await y(this.#e.win, {
			icon: "power",
			title: O("home.stopQ", { name: e.name }),
			text: O("home.stopText"),
			buttons: ["cancel", {
				value: "ok",
				label: O("home.stop"),
				danger: !0
			}]
		}) === "ok") && (await v.stop(e.id).catch(() => {}), this.refresh());
	}
}, Fe = [
	"none",
	"file",
	"action",
	"call",
	"login"
], Ie = [
	"#6b7280",
	"#0f9d9a",
	"#d9822b",
	"#2f81f7",
	"#8b5cf6",
	"#e5534b",
	"#2da44e",
	"#d9a514"
];
function Le(e, t = "general") {
	let n = e.ws?.project;
	if (!n) return;
	let r = e.optionsWindow;
	if (r && !r.closed) {
		r.show?.(t);
		return;
	}
	let i = new d({
		title: O("options.title"),
		subtitle: n.data.name,
		icon: "gear",
		width: 820,
		height: 560,
		minWidth: 560,
		minHeight: 380
	}), a = g("div", {
		class: "ls-opt-side",
		role: "tablist"
	}), o = g("div", { class: "ls-opt-main" });
	i.body.append(g("div", { class: "ls-opt" }, a, o));
	let s = t, c = () => {
		a.replaceChildren(...[
			"general",
			"windows",
			"consoles",
			"app"
		].map((e) => g("button", {
			type: "button",
			role: "tab",
			class: s === e ? "on" : "",
			"aria-selected": String(s === e),
			onclick: () => {
				s = e, c();
			}
		}, O(`options.${e}`)))), o.replaceChildren(...{
			general: Re,
			windows: ze,
			consoles: Be,
			app: He
		}[s](e, n, c));
	}, l = () => c();
	return n.on("change", l), i.on("destroy", () => {
		n.off("change", l), e.optionsWindow = null;
	}), i.show = (e) => {
		s = e, c();
	}, e.optionsWindow = i, c(), e.openWindow(i, "options"), i;
}
var Z = (e, t, n = null) => g("label", { class: "ls-field" }, g("span", {}, e), t, n ? g("small", { class: "ls-hint" }, n) : null), Q = (e) => g("h4", { class: "ls-opt-h" }, e);
function Re(e, t) {
	let n = t.data;
	return [
		Q(O("options.general")),
		Z(O("options.name"), w({
			value: n.name,
			maxLength: 80,
			onChange: (e) => e.trim() && t.setInfo({ name: e.trim() })
		})),
		Z(O("options.version"), w({
			value: n.version,
			maxLength: 20,
			onChange: (e) => /^\d+\.\d+\.\d+$/.test(e.trim()) && t.setInfo({ version: e.trim() })
		}), O("options.versionHint")),
		Z(O("options.description"), w({
			value: n.description ?? "",
			maxLength: 300,
			onChange: (e) => t.setInfo({ description: e })
		}))
	];
}
function ze(e, t) {
	let n = t.data, r = Object.keys(n.windows), i = [Q(O("options.windows")), g("p", { class: "ls-hint" }, O("options.windowsHint"))];
	if (!r.length) return [...i, g("p", { class: "ls-empty" }, O("options.noWindows"))];
	i.push(Z(O("options.main"), S({
		value: n.main,
		options: r,
		onChange: (e) => t.setMain(e)
	}), O("options.mainHint")));
	let a = r.map((e) => {
		let r = n.entrypoints[e] ?? null, i = e === n.main ? "main" : r?.kind ?? "none", a = e === n.main ? g("span", { class: "ls-hint" }, O("entry.main")) : g("span", { class: "ls-entry" }, S({
			value: i,
			options: Fe.map((e) => ({
				value: e,
				label: O(`entry.${e}`)
			})),
			onChange: (n) => t.setEntrypoint(e, n === "none" ? null : {
				kind: n,
				...n === "file" && { ext: [] },
				label: r?.label ?? e
			})
		}), i === "file" ? w({
			value: (r.ext ?? []).join(", "),
			placeholder: O("entry.extPlaceholder"),
			onChange: (n) => t.setEntrypoint(e, {
				...r,
				ext: n.split(/[\s,;]+/).map((e) => e.replace(/^\./, "").toLowerCase()).filter((e) => /^[a-z0-9]{1,16}$/.test(e)).slice(0, 12)
			})
		}) : null, i === "none" ? null : w({
			value: r?.label ?? "",
			placeholder: O("entry.label"),
			maxLength: 60,
			onChange: (n) => t.setEntrypoint(e, {
				...r,
				label: n.trim() || e
			})
		}));
		return g("tr", {}, g("td", {}, _("window"), g("b", {}, e), e === n.main ? g("span", { class: "pill" }, "main") : null), g("td", {}, a));
	});
	return i.push(g("table", { class: "ls-opt-table" }, g("tr", {}, g("th", {}, O("options.window")), g("th", {}, O("options.opensFrom"))), ...a)), i.push(g("p", { class: "ls-hint" }, O("options.unlinkedHint"))), i;
}
function Be(e, t) {
	let n = t.data.consoles, r = [Q(O("options.consoleList"))], i = n.list.map((n) => g("tr", {}, g("td", {}, n.id === "main" ? g("b", {}, n.name || O("console.main"), " ★") : w({
		value: n.name,
		maxLength: 60,
		onChange: (e) => e.trim() && t.updateConsole(n.id, { name: e.trim() })
	})), g("td", {}, g("span", { class: "ls-swatches" }, ...Ie.map((e) => g("button", {
		type: "button",
		class: `sw${(n.color ?? "#6b7280") === e ? " on" : ""}`,
		style: `background:${e}`,
		title: e,
		"aria-label": e,
		onclick: () => t.updateConsole(n.id, { color: e })
	})))), g("td", {}, w({
		type: "number",
		value: n.keep ?? 1e3,
		min: 100,
		max: 2e3,
		step: 100,
		onChange: (e) => t.updateConsole(n.id, { keep: Math.max(100, Math.min(2e3, Number(e) || 1e3)) })
	})), g("td", {}, n.id === "main" ? g("span", { class: "ls-hint" }, O("options.mainConsole")) : g("button", {
		type: "button",
		class: "ls-link-btn danger",
		onclick: () => Ve(e, t, n)
	}, O("options.remove")))));
	r.push(g("table", { class: "ls-opt-table" }, g("tr", {}, g("th", {}, O("options.consoleName")), g("th", {}, O("options.color")), g("th", {}, O("options.keep")), g("th", {})), ...i));
	let a = f({
		label: O("console.add"),
		icon: _("plus"),
		onClick: () => t.addConsole(O("options.newConsole", { n: n.list.length }))
	});
	return a.disabled = n.list.length >= (e.limits?.maxConsoles ?? 10), r.push(g("div", { class: "ls-insp-acts" }, a, g("span", { class: "ls-hint" }, O("options.removeHint")))), r.push(Q(O("options.outside"))), r.push(re({
		value: n.outside,
		onChange: (e) => t.setConsoles({ outside: e }),
		options: [
			"all",
			"onInput",
			"hidden",
			"main"
		].map((e) => ({
			value: e,
			label: `${O(`outside.${e}`)} — ${O(`outside.${e}.hint`)}`
		}))
	})), r.push(Q(O("options.details"))), r.push(m({
		value: n.closeAfterAnswer !== !1,
		label: O("options.closeAfter"),
		disabled: n.outside !== "onInput",
		onChange: (e) => t.setConsoles({ closeAfterAnswer: e })
	})), r.push(m({
		value: n.notify !== !1,
		label: O("options.notify"),
		disabled: n.outside === "hidden",
		onChange: (e) => t.setConsoles({ notify: e })
	})), r.push(Z(O("options.copyToLog"), S({
		value: n.copyToLog ?? "warnings",
		options: [
			"none",
			"warnings",
			"all"
		].map((e) => ({
			value: e,
			label: O(`log.${e}`)
		})),
		onChange: (e) => t.setConsoles({ copyToLog: e })
	}))), r.push(Z(O("options.mainOpens"), S({
		value: n.mainOpens ?? "start",
		disabled: n.outside !== "main",
		options: ["start", "onInput"].map((e) => ({
			value: e,
			label: O(`mainOpens.${e}`)
		})),
		onChange: (e) => t.setConsoles({ mainOpens: e })
	}))), r.push(g("p", { class: "ls-hint" }, O("options.consoleQuota"))), r;
}
async function Ve(e, t, n) {
	await y(e.win, {
		icon: "warning",
		title: O("options.removeConsoleQ", { name: n.name }),
		text: O("options.removeHint"),
		buttons: ["cancel", {
			value: "ok",
			label: O("options.remove"),
			danger: !0
		}]
	}) === "ok" && t.removeConsole(n.id);
}
function He(e, t) {
	let n = t.data.options;
	return [
		Q(O("options.app")),
		g("p", { class: "ls-hint" }, O("options.appHint")),
		m({
			value: n.keepValues !== !1,
			label: O("options.keepValues"),
			onChange: (e) => t.setOptions({ keepValues: e })
		}),
		g("p", { class: "ls-hint ind" }, O("options.keepValuesHint")),
		m({
			value: n.syncCopies !== !1,
			label: O("options.syncCopies"),
			onChange: (e) => t.setOptions({ syncCopies: e })
		}),
		g("p", { class: "ls-hint ind" }, O("options.syncCopiesHint")),
		g("p", { class: "ls-hint" }, O("options.commandsHint"))
	];
}
// src/logicstudio/createApp.js
var Ue = [
	"blocks",
	"window",
	"chart",
	"bolt",
	"bell",
	"calculator",
	"clock",
	"gauge",
	"lamp",
	"home",
	"globe",
	"terminal"
], We = [
	["#2da44e", "green"],
	["#3b6ef5", "blue"],
	["#6e56cf", "violet"],
	["#0f7d74", "teal"],
	["#d9822b", "orange"],
	["#e5484d", "red"]
], Ge = /^[a-z][a-z0-9-]{1,40}$/;
async function Ke(e) {
	let t = e.ws;
	if (!t?.project) return;
	t.dirty && await e.saveAll();
	let n = t.project.data, r = {
		id: n.app?.id || qe(n.name),
		glyph: n.app?.glyph || "blocks",
		color: n.app?.color || "#2da44e"
	}, i = g("span", { class: "ls-app-preview" });
	((e, t) => i.replaceChildren(p({
		glyph: e,
		color: t
	})))(r.glyph, r.color);
	let a = await y(e.win, {
		icon: "blocks",
		title: O("app.title", { name: n.name }),
		text: O("app.text"),
		width: 520,
		content: g("div", { class: "ls-app-head" }, i, g("small", { class: "ls-hint" }, O("app.where", { folder: `~/${O("app.folder")}/` }))),
		fields: [
			{
				name: "name",
				label: O("app.appName"),
				value: n.name,
				required: !0,
				maxLength: 60
			},
			{
				name: "id",
				label: O("app.id"),
				value: r.id,
				required: !0,
				pattern: Ge,
				invalid: O("app.badId")
			},
			{
				name: "version",
				label: O("app.version"),
				value: n.version || "1.0.0",
				required: !0,
				pattern: /^\d+\.\d+\.\d+$/,
				invalid: O("options.versionHint")
			},
			{
				name: "description",
				label: O("app.description"),
				value: n.description ?? "",
				maxLength: 200
			},
			{
				name: "glyph",
				type: "select",
				label: O("app.icon"),
				value: r.glyph,
				options: Ue
			},
			{
				name: "color",
				type: "select",
				label: O("app.color"),
				value: r.color,
				options: We.map(([e, t]) => ({
					value: e,
					label: O(`app.color.${t}`)
				}))
			}
		],
		buttons: [
			"cancel",
			{
				value: "create",
				label: O("app.create")
			},
			{
				value: "run",
				label: O("app.createRun"),
				primary: !0
			}
		]
	});
	if (!a || a.button === "cancel") return;
	let o = a.values;
	t.project.setApp({
		id: o.id,
		glyph: o.glyph,
		color: o.color
	}), t.project.setInfo({
		version: o.version,
		description: o.description
	}), await t.save(t.project);
	try {
		let t = await Ze(e, o);
		if (a.button === "run") {
			if (!T.logicHost?.runApp) throw Error(O("app.needsLilos"));
			await T.logicHost.runApp(t);
		} else await y(e.win, {
			icon: "blocks",
			title: O("app.done", { name: o.name }),
			text: O("app.doneText", { path: h.path(h.get(t).parent) })
		});
	} catch (t) {
		await y(e.win, {
			icon: "error",
			title: O("app.failed"),
			text: t.message
		});
	}
}
var qe = (e) => String(e).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").replace(/^(\d)/, "app-$1").slice(0, 40) || "app";
function Je(e, t) {
	return h.children(e).find((e) => e.type === "folder" && e.name === t)?.id ?? h.create(e, {
		type: "folder",
		name: t
	}).id;
}
async function Ye(e, t, n) {
	let r = h.create(t, {
		type: "folder",
		name: n
	});
	for (let t of h.children(e)) t.type === "folder" ? await Ye(t.id, r.id, t.name) : t.type === "file" && await h.copy(t.id, r.id);
	return r.id;
}
async function Xe(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let e of Object.values(t.schemas)) for (let t of e.blocks ?? []) n.add(t.type);
	let r = (e) => {
		e?.type && n.add(e.type), (e?.children ?? []).forEach(r);
	};
	for (let e of Object.values(t.windows)) r(e.root);
	let i = [{
		module: "logicstudio-engine",
		reason: "Runs the project of the app"
	}];
	for (let t of e.catalog?.packages ?? []) (t.blocks.some((e) => n.has(e.type)) || t.components.some((e) => n.has(e.type))) && i.push({
		module: t.name,
		version: `>=${t.version}`,
		reason: "Blocks or components of the project"
	});
	return i;
}
async function Ze(e, t) {
	let n = e.ws, r = await n.documents(), i = n.project.data, a = Je(h.root, O("app.folder")), o = h.children(a).find((e) => e.type === "folder" && e.name === t.id);
	o && h.trash([o.id]);
	let s = h.create(a, {
		type: "folder",
		name: t.id
	}).id, c = h.create(s, {
		type: "folder",
		name: "project"
	}).id, l = h.get(n.projectFile).name;
	for (let e of n.groups) e.folder && await Ye(e.folder, c, h.get(e.folder).name);
	await h.copy(n.projectFile, c, { name: l });
	let u = { main: { kind: "window" } }, d = [];
	for (let [e, t] of Object.entries(i.entrypoints ?? {})) e !== i.main && t?.kind && t.kind !== "none" && (u[`w${Object.keys(u).length}`] = {
		kind: "window",
		label: t.label || e,
		logicWindow: e,
		logicKind: t.kind
	}, t.kind === "file" && d.push(...t.ext ?? []));
	let f = {
		id: t.id,
		version: t.version,
		kind: "local",
		name: t.name,
		description: t.description || t.name,
		category: "other",
		icon: {
			glyph: t.glyph,
			color: t.color
		},
		publisher: {
			id: "local",
			name: ee.user?.name ?? "lilOS"
		},
		sdk: "2",
		lilos: ">=1.37.0",
		entrypoints: u,
		dependencies: await Xe(e, r),
		permissions: [],
		...d.length && { contributes: { fileTypes: [...new Set(d)] } },
		logicstudio: {
			project: `project/${l}`,
			runs: "open"
		}
	}, p = async (e, t) => {
		let n = h.create(s, {
			type: "file",
			name: e
		});
		return await h.write(n.id, t), n.id;
	};
	return await p("lilos.json", `${JSON.stringify(f, null, 2)}\n`), await p("index.js", $e), await p("locales.json", `${JSON.stringify(Qe(i, t), null, 2)}\n`), p(`${t.id}.lsapp`, `${JSON.stringify({
		format: "lilos-lsapp/1",
		manifest: "lilos.json",
		project: `project/${l}`
	}, null, 2)}\n`);
}
function Qe(e, t) {
	let n = { en: { strings: {
		"@name": t.name,
		"@description": t.description || t.name
	} } };
	for (let [t, r] of Object.entries(e.texts ?? {})) n[t] ??= { strings: {} }, Object.assign(n[t].strings, r);
	return n;
}
var $e = "/**\n * An app made with Logic Studio IDE from a project (folder project/). lilOS runs its project in\n * the Logic Studio engine and opens its windows: each entry point is one of its windows.\n * Made by «Crea app»: change the project in Logic Studio and make the app again.\n */\nexport default function main({ lilos, entry = 'main', args } = {}) {\n  return lilos?.logic?.runApp?.({ entry, args });\n}\n";
// src/logicstudio/LogicStudioApp.js
function et({ args: e, openWindow: t } = {}) {
	if (e?.file && tt(e.file)) {
		T.logicHost?.runApp(e.file);
		let t = new d({
			title: O("app.name"),
			icon: "blocks",
			width: 280,
			height: 120
		});
		return setTimeout(() => t.emit("close"), 0), t;
	}
	let n = new nt(t);
	return e?.file && h.exists(e.file) && n.open(e.file), n.win.on("launch", (e) => {
		e?.file && tt(e.file) ? T.logicHost?.runApp(e.file) : e?.file && h.exists(e.file) && n.open(e.file);
	}), n.win;
}
var tt = (e) => h.get(e)?.name.toLowerCase().endsWith(".lsapp"), nt = class {
	win;
	openWindow;
	ws = null;
	catalog = null;
	tabs = [];
	active = null;
	#e = new AbortController();
	constructor(e) {
		this.openWindow = e, this.win = new d({
			title: O("app.name"),
			icon: "blocks",
			width: 1240,
			height: 760,
			minWidth: 760,
			minHeight: 480
		}), this.win.el.dataset.pan = "native", this.win.getState = () => ({ file: this.ws ? this.ws.projectFile ?? this.ws.single : null }), this.win.canClose = () => this.canClose(), this.win.on("destroy", () => {
			this.#e.abort(), this.runner?.stop();
		}), this.tabBar = new ce({
			t: O,
			signal: this.#e.signal,
			label: O("tabs.label"),
			newButton: !1,
			reorder: !0
		}), this.tabBar.on("select", (e) => this.show(e)), this.tabBar.on("close", (e) => this.closeTab(e)), this.tabBar.on("move", ({ key: e, index: t }) => {
			let n = this.tabs.findIndex((t) => t.key === e), [r] = this.tabs.splice(n, 1);
			this.tabs.splice(t, 0, r), this.renderTabs();
		}), this.toolbar = g("div", { class: "ls-tbar" }), this.center = g("div", { class: "ls-center" }), this.explorer = new de(this), this.palette = new he(this), this.inspector = new ke(this), this.bottom = new je(this), this.runner = new Ne(this), this.status = g("div", { class: "ls-sbar" }), this.leftTabs = g("div", {
			class: "ls-ltabs",
			role: "tablist"
		}), this.leftBody = g("div", { class: "ls-lbody" }), this.left = g("div", { class: "ls-left" }, this.leftTabs, this.leftBody), this.right = g("div", { class: "ls-right" }, this.inspector.el);
		let t = C.get("logicstudio.panels", {
			left: 220,
			right: 280
		});
		this.left.style.width = `${t.left}px`, this.right.style.width = `${t.right}px`;
		let n = (e, t, n) => ie({
			get: () => e.offsetWidth,
			min: 170,
			max: 480,
			reset: t === "left" ? 220 : 280,
			invert: n,
			host: e,
			label: O("left.resize"),
			set: (n, r) => {
				e.style.width = `${n}px`, r && C.set("logicstudio.panels", {
					...C.get("logicstudio.panels", {}),
					[t]: n
				});
			}
		}), r = n(this.left, "left", !1), i = n(this.right, "right", !0);
		this.grips = {
			left: r,
			right: i
		}, this.collapsed = {
			left: t.leftCollapsed === !0,
			right: t.rightCollapsed === !0
		}, this.#n(), this.main = g("div", { class: "ls-main" }, this.center, this.bottom.el), this.win.body.append(g("div", { class: "ls lgc-scope" }, this.tabBar.el, this.toolbar, g("div", { class: "ls-work" }, this.left, r, this.main, i, this.right), this.status)), this.leftTab = "project", this.home = new Pe(this), this.explorer.render(), this.bottom.render(), this.tabs.push({
			key: "home",
			kind: "home",
			label: O("tabs.home"),
			view: this.home
		}), this.show("home"), this.#r(), this.loadCatalog();
	}
	async loadCatalog() {
		try {
			this.catalog = await v.catalog({ fresh: !0 }), this.limits = (await v.status()).limits, this.components = await v.allComponents(), this.engineError = null;
		} catch (e) {
			this.catalog = { packages: [] }, this.components = /* @__PURE__ */ new Map(), this.engineError = e.message;
		}
		for (let e of this.tabs) e.view?.setCatalog?.(this.catalog);
		this.palette.render(), this.renderStatus();
	}
	blockDef(e) {
		for (let t of this.catalog?.packages ?? []) {
			let n = t.blocks.find((t) => t.type === e);
			if (n) return n;
		}
		return null;
	}
	componentDef(e) {
		for (let t of this.catalog?.packages ?? []) {
			let n = t.components.find((t) => t.type === e);
			if (n) return n;
		}
		return null;
	}
	label(e) {
		return e?.label?.[D.lang] ?? e?.label?.en ?? e?.type ?? "";
	}
	showDoc(e) {
		return be(this, e);
	}
	docOfSelection() {
		let e = this.current;
		if (e?.kind === "schema") {
			let t = e.view.selection;
			return t.blocks.length === 1 ? W(this, e.view.doc.block(t.blocks[0]), (t) => e.view.componentOf(t)) : t.groups?.length ? "ide/groups" : t.links.length ? "ide/links" : "ide/schemas";
		}
		return e?.kind === "window" ? (e.view.selected && e.view.doc.find(e.view.selected)?.node)?.type ?? "ide/windows" : e?.kind === "map" ? "ide/projects" : "ide/index";
	}
	renderStatus() {
		let e = this.current, t = [];
		this.engineError ? t.push(g("span", { class: "ls-eng off" }, O("status.noEngine"))) : t.push(g("span", { class: "ls-eng" }, O("status.engine", { n: (this.catalog?.packages ?? []).length }))), e?.view?.statusText && t.push(g("span", {}, e.view.statusText())), this.runner.program ? t.push(g("span", { class: "ls-run-st" }, this.runner.statusText())) : this.runner.result && t.push(g("span", { class: "ls-run-st" }, this.runner.result)), t.push(g("span", { class: "sp" })), this.ws && t.push(g("span", {}, this.ws.project ? O("status.project", { name: this.ws.name }) : O("status.single"))), this.status.replaceChildren(...t);
	}
	async open(e) {
		if (!await this.canClose()) return;
		let t = e, n = h.get(e);
		if (n?.name.toLowerCase().endsWith(".lsui")) {
			let e = rt(n.parent);
			if (!e) {
				await y(this.win, {
					icon: "warning",
					title: O("open.uiAlone"),
					text: O("open.uiAloneText")
				});
				return;
			}
			t = e;
		}
		try {
			let r = await ue.open(t);
			this.setWorkspace(r), n?.name.toLowerCase().endsWith(".lsui") ? this.openElement("windows", r.relative(e)) : r.single ? this.openElement("schemas", h.get(r.single).name) : this.openMap(), $.add(t);
		} catch (e) {
			await y(this.win, {
				icon: "error",
				title: O("open.failed"),
				text: e.message
			});
		}
	}
	setWorkspace(e) {
		this.runner.stop();
		for (let e of this.tabs.filter((e) => e.kind !== "home")) e.view?.destroy?.();
		this.tabs = this.tabs.filter((e) => e.kind === "home"), this.ws = e, e.on("dirty", () => {
			this.renderTabs(), this.renderToolbar();
		}), e.on("change", () => {
			this.explorer.render(), this.inspector.render();
		}), e.project?.on("change", () => this.bottom.render()), this.win.setTitle(O("app.name"), e.name), this.explorer.render(), this.bottom.render(), this.renderTabs();
	}
	async newProject() {
		let e = await y(this.win, {
			icon: "blocks",
			title: O("new.title"),
			text: O("new.text", { folder: O("new.folder") }),
			fields: [{
				name: "name",
				label: O("new.name"),
				value: O("new.default"),
				required: !0,
				maxLength: 80
			}],
			buttons: ["cancel", {
				value: "ok",
				label: O("new.create"),
				primary: !0
			}]
		});
		if (e?.button !== "ok") return;
		let t = it(h.root, O("new.folder")), n = await ue.create(t, e.values.name);
		await this.open(n);
	}
	async openProjectPicker() {
		let e = await E(this.openWindow, {
			title: O("open.pick"),
			exts: ["lsproj", "lsch"]
		});
		e && await this.open(e.id ?? e);
	}
	async openElement(e, t) {
		let n = `${e}:${t}`;
		if (this.tabs.some((e) => e.key === n)) this.show(n);
		else try {
			let r = await this.ws.doc(t), i = this.ws.single ? r.data.name : this.ws.nameOf(e, t) ?? t, a = e === "schemas" ? new xe(this, r, i) : new Te(this, r, i);
			this.tabs.push({
				key: n,
				kind: e === "schemas" ? "schema" : "window",
				label: i,
				path: t,
				view: a,
				doc: r
			}), r.on("change", () => this.renderTabs()), this.runner.attachTab(this.tabs.at(-1)), this.show(n);
		} catch (e) {
			await y(this.win, {
				icon: "error",
				title: O("open.failed"),
				text: e.message
			});
		}
	}
	openMap() {
		this.ws?.project && (this.tabs.some((e) => e.key === "map") || this.tabs.splice(+(this.tabs[0]?.kind === "home"), 0, {
			key: "map",
			kind: "map",
			label: O("tabs.map", { name: this.ws.name }),
			view: new Oe(this)
		}), this.show("map"));
	}
	openHome() {
		this.tabs.some((e) => e.kind === "home") || this.tabs.unshift({
			key: "home",
			kind: "home",
			label: O("tabs.home"),
			view: this.home
		}), this.show("home");
	}
	get current() {
		return this.tabs.find((e) => e.key === this.active) ?? null;
	}
	show(e) {
		let t = this.tabs.find((t) => t.key === e);
		t && (this.current?.view?.hide?.(), this.active = e, this.center.replaceChildren(t.view.el), t.view.show?.(), this.renderTabs(), this.renderToolbar(), this.renderLeft(), this.inspector.render(), this.renderStatus());
	}
	async closeTab(e) {
		let t = this.tabs.find((t) => t.key === e);
		if (!t) return;
		if (t.doc?.dirty) {
			let e = await y(this.win, {
				icon: "warning",
				title: O("close.unsaved", { name: t.label }),
				text: O("close.unsavedText"),
				buttons: [
					"cancel",
					{
						value: "discard",
						label: O("close.discard"),
						danger: !0
					},
					{
						value: "save",
						label: O("common.save"),
						primary: !0
					}
				]
			});
			if (!e || e === "cancel") return;
			e === "save" && await this.ws.save(t.doc);
		}
		t.kind !== "home" && t.view.destroy?.();
		let n = this.tabs.indexOf(t);
		this.tabs.splice(n, 1), this.active === e ? this.tabs.length ? this.show(this.tabs[Math.max(0, n - 1)].key) : this.#t() : this.renderTabs();
	}
	#t() {
		this.current?.view?.hide?.(), this.active = null, this.center.replaceChildren(g("div", { class: "ls-notabs" }, g("p", {}, O("empty.text")), f({
			label: O("tb.home"),
			icon: _("home"),
			onClick: () => this.openHome()
		}))), this.renderTabs(), this.renderToolbar(), this.renderLeft(), this.inspector.render(), this.renderStatus();
	}
	renderTabs() {
		this.tabBar.render(this.tabs.map((e) => ({
			key: e.key,
			label: e.label,
			icon: {
				home: "home",
				map: "grid",
				schema: "blocks",
				window: "window"
			}[e.kind],
			dirty: e.kind === "map" ? !!this.ws?.project?.dirty : !!e.doc?.dirty
		})), this.active);
	}
	renderToolbar() {
		let e = this.current, t = e?.doc ?? (e?.kind === "map" ? this.ws?.project : null), n = (e, t, n, { disabled: r = !1, cls: i = "", title: a = null } = {}) => g("button", {
			class: `ls-tb ${i}`,
			type: "button",
			disabled: r,
			title: a ?? t,
			onclick: n
		}, e ? _(e) : null, t ? g("span", {}, t) : null), r = [];
		if (this.ws) {
			r.push(n("save", O("tb.save"), () => this.saveAll(), {
				disabled: !this.ws.dirty,
				title: `${O("tb.save")} (Ctrl+S)`
			})), r.push(g("span", { class: "sep" })), r.push(n("undo", null, () => t?.history.undo(), {
				disabled: !t?.history.canUndo,
				title: O("tb.undo")
			})), r.push(n("redo", null, () => t?.history.redo(), {
				disabled: !t?.history.canRedo,
				title: O("tb.redo")
			})), r.push(g("span", { class: "sep" })), this.runner.program ? (r.push(n("play", this.runner.statusText(), null, {
				cls: "run",
				disabled: !0
			})), r.push(n("stop", O("tb.stop"), () => this.runner.stop(), { cls: "stop" }))) : r.push(n("play", O("tb.test"), () => this.runner.test(), {
				cls: "test",
				title: `${O("tb.test")} (F5)`
			}));
			{
				let e = this.runner.argsText();
				r.push(n("terminal", O(e ? "tb.argsSet" : "tb.args"), () => this.runner.editArgs(), {
					cls: e ? "on" : "",
					title: e ? `${O("tb.argsHint")}: ${e}` : O("tb.argsHint"),
					disabled: !!this.runner.program
				}));
			}
			r.push(n("power", O("tb.activate"), () => this.runner.activate(), { title: O("tb.activateHint") })), r.push(g("span", { class: "sep" })), e?.view?.toolbar && r.push(...e.view.toolbar(n)), this.current?.view?.setLimits?.(this.limits ?? {}), r.push(g("span", { class: "sp" })), this.ws.project && (r.push(n("grid", O("tb.map"), () => this.openMap())), r.push(n("archive", O("tb.createApp"), () => Ke(this), { title: O("tb.createAppHint") })), r.push(n("gear", O("tb.options"), () => Le(this))));
		} else r.push(n("plus", O("home.new"), () => this.newProject())), r.push(n("open", O("home.open"), () => this.openProjectPicker())), r.push(g("span", { class: "sp" }));
		this.tabs.some((e) => e.kind === "home") || r.push(n("home", O("tb.home"), () => this.openHome())), r.push(n("help", null, () => this.showDoc(this.docOfSelection()), { title: `${O("tb.docs")} (F1)` })), this.toolbar.replaceChildren(...r), t?.history && !t._lsHistory && (t._lsHistory = !0, t.history.on("change", () => this.renderToolbar()));
	}
	renderLeft() {
		let e = this.current?.kind === "window" ? "components" : "blocks";
		this.leftTab !== "project" && (this.leftTab = e);
		let t = O(e === "components" ? "left.components" : "left.blocks");
		if (this.collapsed.left) {
			let n = (e) => () => {
				this.leftTab = e, this.setCollapsed("left", !1);
			}, r = (e, t) => g("button", {
				type: "button",
				class: `ls-vtab${this.leftTab === e ? " on" : ""}`,
				title: t,
				onclick: n(e)
			}, g("span", {}, t));
			this.leftTabs.replaceChildren(g("button", {
				type: "button",
				class: "ls-fold",
				title: O("side.expand"),
				"aria-expanded": "false",
				onclick: n(this.leftTab)
			}, _("arrowRight"))), this.leftBody.replaceChildren(g("div", { class: "ls-vtabs" }, r("project", O("left.project")), r(e, t)));
			return;
		}
		let n = (e, t) => g("button", {
			type: "button",
			role: "tab",
			class: this.leftTab === e ? "on" : "",
			"aria-selected": String(this.leftTab === e),
			onclick: () => {
				this.leftTab = e, this.renderLeft();
			}
		}, t);
		this.leftTabs.replaceChildren(n("project", O("left.project")), n(e, t), g("button", {
			type: "button",
			class: "ls-fold",
			title: O("side.collapse"),
			"aria-expanded": "true",
			onclick: () => this.setCollapsed("left", !0)
		}, _("arrowLeft"))), this.leftBody.replaceChildren(this.leftTab === "project" ? this.explorer.el : this.palette.el), this.leftTab !== "project" && this.palette.render();
	}
	setCollapsed(e, t) {
		this.collapsed[e] = t, this.#n();
		try {
			C.set("logicstudio.panels", {
				...C.get("logicstudio.panels", {}),
				[`${e}Collapsed`]: t
			});
		} catch {}
		e === "left" ? this.renderLeft() : this.inspector.render();
	}
	#n() {
		for (let e of ["left", "right"]) this[e].classList.toggle("collapsed", this.collapsed[e]), this.grips[e].hidden = this.collapsed[e];
	}
	async saveAll() {
		if (this.ws) {
			try {
				await this.ws.saveAll();
			} catch (e) {
				await y(this.win, {
					icon: "error",
					title: O("save.failed"),
					text: e.message
				});
			}
			this.renderTabs(), this.renderToolbar();
		}
	}
	async canClose() {
		if (!this.ws?.dirty) return !0;
		let e = await y(this.win, {
			icon: "warning",
			title: O("close.project", { name: this.ws.name }),
			text: O("close.unsavedText"),
			buttons: [
				"cancel",
				{
					value: "discard",
					label: O("close.discard"),
					danger: !0
				},
				{
					value: "save",
					label: O("close.saveAll"),
					primary: !0
				}
			]
		});
		return !e || e === "cancel" ? !1 : (e === "save" && await this.saveAll(), !0);
	}
	#r() {
		this.win.el.addEventListener("keydown", (e) => {
			let t = e.ctrlKey || e.metaKey, n = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName ?? "");
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), this.saveAll();
				return;
			}
			if (e.key === "F5") {
				e.preventDefault(), this.runner.program ? this.runner.stop() : this.runner.test();
				return;
			}
			if (e.key === "F1") {
				e.preventDefault(), this.showDoc(this.docOfSelection());
				return;
			}
			if (n) return;
			let r = this.current?.doc ?? (this.current?.kind === "map" ? this.ws?.project : null);
			t && !e.shiftKey && e.key.toLowerCase() === "z" ? (e.preventDefault(), r?.history.undo()) : t && (e.key.toLowerCase() === "y" || e.shiftKey && e.key.toLowerCase() === "z") && (e.preventDefault(), r?.history.redo());
		}, { signal: this.#e.signal });
	}
};
function rt(e) {
	for (let t = e; t; t = h.get(t)?.parent) {
		let e = h.children(t).find((e) => e.type === "file" && e.name.toLowerCase().endsWith(".lsproj"));
		if (e) return e.id;
		if (t === h.root) break;
	}
	return null;
}
function it(e, t) {
	return h.children(e).find((e) => e.type === "folder" && e.name.toLowerCase() === t.toLowerCase())?.id ?? h.create(e, {
		type: "folder",
		name: t
	}).id;
}
var $ = {
	list: () => (C.get("logicstudio.recent", []) ?? []).filter((e) => typeof e == "string" && h.exists(e)),
	add(e) {
		C.set("logicstudio.recent", [e, ...this.list().filter((t) => t !== e)].slice(0, 10));
	}
};
export { et as default, $ as recent };
