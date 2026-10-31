import * as e from "/host/sdk.js";
import { TAG_COLORS as t, Window as n, fs as r, h as i, session as a, storage as o, tags as s } from "/host/sdk.js";
import { callEntrypoint as c, installedApps as l, launch as u, openFile as d } from "/host/system.js";
// src/terminal/shell/signals.js
var f = class {
	constructor(e = 1) {
		this.levels = e;
	}
}, p = class {
	constructor(e = 1) {
		this.levels = e;
	}
}, m = class {
	constructor(e) {
		this.code = e;
	}
}, h = class {
	constructor(e) {
		this.code = e;
	}
}, g = class {
	code = 130;
}, _ = class {
	code = 141;
}, v = class extends Error {}, y = class extends Error {}, b = class extends Error {
	constructor(e, t = 1) {
		super(e), this.code = t;
	}
}, x = class {
	aborted = !1;
	#e = /* @__PURE__ */ new Set();
	abort() {
		if (!this.aborted) {
			this.aborted = !0;
			for (let e of this.#e) e();
			this.#e.clear();
		}
	}
	onAbort(e) {
		return this.aborted ? (e(), () => {}) : (this.#e.add(e), () => this.#e.delete(e));
	}
	check() {
		if (this.aborted) throw new g();
	}
};
// src/shared/i18n.js
function S(t, n) {
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
// src/terminal/i18n.js
var C = S("terminal", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"Terminal\",\"@description\":\"A bash-like shell over the files of lilOS: commands, pipes, redirections, variables, loops, functions and scripts.\",\"@entrypoints.main.params.cwd.label\":\"Folder\",\"@entrypoints.main.params.cwd.description\":\"The folder to open the terminal in\",\"ui.title\":\"Terminal\",\"ui.commandLine\":\"Command line\",\"ui.welcome\":\"lilOS Terminal · \\\"help\\\" lists the commands\",\"shell.defaultUser\":\"user\",\"shell.readonly\":\"{name}: readonly variable\",\"shell.cannotUnset\":\"{name}: cannot unset: readonly variable\",\"shell.badSubscript\":\"{index}: bad array subscript\",\"shell.unknownConstruct\":\"unknown construct: {type}\",\"shell.badRegex\":\"invalid regular expression\",\"shell.unaryExpected\":\"{op}: unary operator expected\",\"shell.integerExpected\":\"{value}: integer expression expected\",\"shell.binaryExpected\":\"{op}: binary operator expected\",\"shell.commandNotFound\":\"{name}: command not found\",\"shell.tooDeep\":\"{name}: maximum function nesting level exceeded\",\"shell.badFd\":\"{fd}: Bad file descriptor\",\"shell.fdExpected\":\"{target}: file descriptor expected\",\"shell.ambiguousRedirect\":\"{target}: ambiguous redirect\",\"shell.isAppLink\":\"{path}: is a link to an app\",\"err.noSuchFile\":\"{path}: No such file or directory\",\"err.isADirectory\":\"{path}: Is a directory\",\"err.notAFile\":\"{path}: Not a regular file\",\"err.missingParen\":\"`)' expected\",\"err.badIdentifier\":\"`{name}': not a valid identifier\",\"err.numericArgument\":\"{value}: numeric argument required\",\"err.tooManyArguments\":\"too many arguments\",\"err.notADirectory\":\"{path}: Not a directory\",\"err.notFound\":\"{name}: not found\",\"err.missingOperand\":\"missing operand\",\"err.unknownSubcommand\":\"unknown subcommand: '{sub}'\",\"parse.unexpectedEnd\":\"syntax error: unexpected end of input\",\"parse.unexpectedEndOfFile\":\"syntax error: unexpected end of file\",\"parse.nearEnd\":\"end of input\",\"parse.nearNewline\":\"`newline'\",\"parse.nearToken\":\"`{token}'\",\"parse.near\":\"syntax error near unexpected token {near}\",\"parse.nearExpected\":\"syntax error near unexpected token {near}: expected `{expected}'\",\"parse.badFunctionName\":\"invalid function name\",\"parse.parenAfterName\":\"expected `)' after the function name\",\"parse.aliasLoop\":\"aliases expanded too many times\",\"parse.missingTarget\":\"syntax error near unexpected token {near}: missing target of `{op}'\",\"parse.forBadName\":\"for: invalid variable name\",\"parse.caseNoWord\":\"case: missing word\",\"parse.condNear\":\"syntax error in conditional expression near {near}\",\"parse.condNoOperand\":\"syntax error in conditional expression: missing operand\",\"parse.condNoRegex\":\"syntax error in conditional expression: missing regular expression\",\"parse.badSubstitution\":\"bad substitution\",\"parse.badSubstitutionBrace\":\"bad substitution: missing `}'\",\"parse.backquotes\":\"syntax error in backquoted command substitution\",\"jobs.done\":\"Done\",\"jobs.interrupted\":\"Interrupt\",\"jobs.exit\":\"Exit {code}\",\"jobs.running\":\"Running\",\"help.usageLine\":\"Usage: {usage}\",\"help.usageShort\":\"usage: {usage}\",\"help.noHelp\":\"no help topics match `{name}'\",\"help.intro\":\"lilOS Terminal: a bash-like shell over the files of lilOS.\\n\\\"help command\\\" or \\\"command --help\\\" explains a command; \\\"help if\\\", \\\"help for\\\", \\\"help case\\\"… the syntax.\",\"help.syntaxList\":\"Syntax: {list}\",\"help.sh.summary\":\"Like bash.\",\"help.sh.usage\":\"sh [-c commands | script] [arguments…]\",\"help.bash.text\":\"\\\"bash script.sh a b\\\" runs the script with $1=a, $2=b; \\\"bash -c 'echo $1' name x\\\" runs the text; \\\"cat script.sh | bash\\\" reads the script from the input.\",\"help.bash.summary\":\"Runs a script or commands in a new shell.\",\"help.bash.usage\":\"bash [-c commands | script] [arguments…]\",\"help.sleep.summary\":\"Waits: 5 (seconds), 0.5, 2m, 1h.\",\"help.sleep.usage\":\"sleep duration…\",\"help.kill.summary\":\"Interrupts commands in the background.\",\"help.kill.usage\":\"kill [-signal] %job | pid…\",\"help.fg.summary\":\"Brings a command in the background to the foreground: it is waited for and Ctrl C interrupts it.\",\"help.wait.summary\":\"Waits for the commands in the background to finish (all of them, or the ones named).\",\"help.jobs.summary\":\"Lists the commands started in the background with &.\",\"help.clear.summary\":\"Clears the screen (Ctrl L too).\",\"help.help.summary\":\"Lists the commands, or explains the one named.\",\"help.help.usage\":\"help [command]\",\"help.history.summary\":\"Shows the commands given (the last n); -c clears the history.\",\"help.which.summary\":\"Tells where a command is.\",\"help.which.usage\":\"which name…\",\"help.command.summary\":\"Starts a command ignoring the functions with the same name; with -v tells what it would start.\",\"help.command.usage\":\"command [-v] name [arguments…]\",\"help.type.summary\":\"Tells what a name is: alias, keyword, function, command.\",\"help.type.usage\":\"type [-t] name…\",\"help.unalias.summary\":\"Removes aliases (all of them with -a).\",\"help.unalias.usage\":\"unalias [-a] name…\",\"help.alias.text\":\"Example: alias ll='ls -l'. Aliases work from the line after the one that defines them.\",\"help.alias.summary\":\"Defines or shows aliases (short names for commands).\",\"help.alias.usage\":\"alias [name[=value]…]\",\"help.eval.summary\":\"Runs the arguments, joined by spaces, as a command.\",\"help.eval.usage\":\"eval [arguments…]\",\"help.dot.summary\":\"Like source.\",\"help.dot.usage\":\". file [arguments…]\",\"help.source.summary\":\"Runs the commands of a file in this shell (variables, functions and aliases stay).\",\"help.source.usage\":\"source file [arguments…]\",\"help.read.text\":\"-r  backslashes stay as they are\\n-p  shows a prompt\\n-a  puts the words in an array\\n-d  reads up to this character instead of up to the newline\\n-s  does not show what is typed (for passwords)\\nStatus 1 at the end of the input.\",\"help.read.summary\":\"Reads a line and splits it into the variables named ($REPLY without names).\",\"help.read.usage\":\"read [-rs] [-p prompt] [-a array] [-d delim] [name…]\",\"help.continue.summary\":\"Goes on to the next round of the loop (or of the n-th enclosing loop).\",\"help.break.summary\":\"Exits the loop (or n loops).\",\"help.return.summary\":\"Exits the function (or the script read with source).\",\"help.return.usage\":\"return [status]\",\"help.exit.summary\":\"Closes the terminal (or exits the script) with a status.\",\"help.exit.usage\":\"exit [status]\",\"help.let.summary\":\"Computes arithmetic expressions (status 1 if the last one is 0).\",\"help.let.usage\":\"let expression…\",\"help.bracket.summary\":\"Like test, with a final \\\"]\\\".\",\"help.bracket.usage\":\"[ expression ]\",\"help.test.text\":\"Files: -e exists, -f is a file, -d is a directory, -s is not empty\\nText: -z empty, -n not empty, a = b, a != b\\nNumbers: -eq -ne -lt -le -gt -ge\\nCombined: ! not, -a and, -o or, ( … )\",\"help.test.summary\":\"Evaluates an expression: status 0 if true, 1 if false.\",\"help.test.usage\":\"test expression\",\"help.colon.summary\":\"Does nothing (status 0); the arguments are expanded anyway.\",\"help.colon.usage\":\": [arguments…]\",\"help.false.summary\":\"Does nothing, unsuccessfully (status 1).\",\"help.true.summary\":\"Does nothing, successfully (status 0).\",\"help.shift.summary\":\"Shifts the positional parameters: $2 becomes $1…\",\"help.set.text\":\"-e  exits at the first command that fails\\n-u  error when an unset variable is used\\n-x  shows the commands before running them\\n-f  no expansion of * and ?\\n-o pipefail  a pipeline fails if one of its commands fails\\n+e, +u… turn them off. Without arguments it shows every variable.\",\"help.set.summary\":\"Sets the options of the shell and the positional parameters ($1, $2…).\",\"help.set.usage\":\"set [-euxf] [-o option] [--] [arguments…]\",\"help.printenv.summary\":\"Shows the exported variables (or the value of the ones named).\",\"help.printenv.usage\":\"printenv [name…]\",\"help.env.summary\":\"Shows the exported variables, or starts a command with more variables.\",\"help.env.usage\":\"env [name=value…] [command [arguments…]]\",\"help.unset.summary\":\"Removes variables (or functions with -f).\",\"help.unset.usage\":\"unset [-fv] name…\",\"help.typeset.summary\":\"Like declare.\",\"help.typeset.usage\":\"typeset [-aprxifF] [name[=value]…]\",\"help.declare.text\":\"-a array, -x exported, -r read-only, -i integer (the value is computed), -p shows, -f shows the functions, -g global inside a function.\",\"help.declare.summary\":\"Declares variables and shows their attributes.\",\"help.declare.usage\":\"declare [-aprxifF] [name[=value]…]\",\"help.local.summary\":\"Variables visible only inside the function.\",\"help.local.usage\":\"local [-arx] name[=value]…\",\"help.readonly.summary\":\"Makes variables read-only.\",\"help.readonly.usage\":\"readonly [name[=value]…]\",\"help.export.text\":\"Without arguments it lists the exported variables. -n removes the export.\",\"help.export.summary\":\"Makes variables visible to the commands and scripts it starts.\",\"help.export.usage\":\"export [-n] [name[=value]…]\",\"help.printf.text\":\"The format is applied again while arguments are left. -v saves the result in a variable.\",\"help.printf.summary\":\"Writes the arguments according to a format (%s, %d, %5.2f, %x, %b, %q…).\",\"help.printf.usage\":\"printf [-v var] format [arguments…]\",\"help.echo.text\":\"-n  no final newline\\n-e  interprets \\\\n, \\\\t, \\\\\\\\, \\\\e… \\n-E  does not interpret them (default)\",\"help.echo.summary\":\"Writes the arguments, separated by a space.\",\"help.echo.usage\":\"echo [-neE] [text…]\",\"help.pwd.summary\":\"Shows the working directory.\",\"help.cd.text\":\"Without arguments it goes to the home ($HOME). \\\"cd -\\\" goes back to the previous directory ($OLDPWD).\",\"help.cd.summary\":\"Changes the working directory.\",\"help.cd.usage\":\"cd [dir]\",\"help.realpath.summary\":\"The full path.\",\"help.realpath.usage\":\"realpath [-m] path…\",\"help.dirname.summary\":\"The path without its last part.\",\"help.dirname.usage\":\"dirname path…\",\"help.basename.summary\":\"The last part of a path (without the suffix).\",\"help.basename.usage\":\"basename path [suffix]\",\"help.tree.summary\":\"Shows directories as a tree.\",\"help.tree.usage\":\"tree [-adf] [-L levels] [dir…]\",\"help.find.text\":\"Tests: -name pattern, -iname, -path, -type f|d|l, -empty, -size [+-]n[ckMG], -mtime [+-]days, -mmin, -newer file\\nActions: -print, -print0, -delete (to the trash), -exec command {} \\\\; or +\\nOptions: -maxdepth n, -mindepth n. Combined: ! (not), -o (or), ( … )\\nExample: find . -name \\\"*.txt\\\" -size +1k\",\"help.find.summary\":\"Searches for files and directories.\",\"help.find.usage\":\"find [path…] [expression]\",\"help.stat.text\":\"-c  format: %n name, %s size, %F type, %y modification date, %Y in seconds, %w %W creation, %i id\",\"help.stat.summary\":\"Shows the details of files and directories.\",\"help.stat.usage\":\"stat [-c format] path…\",\"help.rmdir.summary\":\"Removes empty directories (to the trash).\",\"help.rmdir.usage\":\"rmdir [-p] dir…\",\"help.rm.text\":\"-r  directories too, with their contents\\n-d  empty directories\\n-f  no error for what does not exist\\n--purge  deletes permanently, without the trash\\nWhat goes to the trash can be put back with \\\"trash restore\\\".\",\"help.rm.summary\":\"Moves files and directories to the trash (with --purge deletes them forever).\",\"help.rm.usage\":\"rm [-rfvd] [--purge] path…\",\"help.mv.text\":\"If the destination is a directory, it moves into it; otherwise it renames. An overwritten file goes to the trash.\\n-n  does not overwrite\\n-v  tells what it moves\",\"help.mv.summary\":\"Moves or renames files and directories.\",\"help.mv.usage\":\"mv [-nv] source… dest\",\"help.cp.text\":\"-r  copies directories too, with their contents\\n-n  does not overwrite existing files\\n-v  tells what it copies\",\"help.cp.summary\":\"Copies files and directories.\",\"help.cp.usage\":\"cp [-rnv] source… dest\",\"help.touch.summary\":\"Creates empty files, or updates the modification date of the ones that exist.\",\"help.mkdir.text\":\"-p  creates the intermediate directories too; no error if it already exists\",\"help.mkdir.summary\":\"Creates directories.\",\"help.mkdir.usage\":\"mkdir [-pv] dir…\",\"help.cat.text\":\"-n  numbers the lines\\n-b  numbers only the non-empty ones\\n-s  only one empty line in a row\\n-E  $ at the end of every line\",\"help.cat.summary\":\"Shows the contents of files (or of the input), one after the other.\",\"help.ls.text\":\"-l  details (type, size, date, tags)\\n-a  also the names starting with \\\".\\\"\\n-h  human-readable sizes (1.2K)\\n-t  by date, -S by size, -r reversed\\n-1  one per line\\n-d  the directory itself, not its contents\\n-R  subdirectories too\\n-F  / after directories, @ after links, * after scripts\",\"help.ls.summary\":\"Lists the contents of directories.\",\"help.ls.usage\":\"ls [-laAh1trSdRF] [path…]\",\"help.xargs.text\":\"-n N  at most N arguments at a time\\n-I {}  one command per line, with {} replaced by the line\\n-0  words separated by the null character (find -print0)\\n-d C  words separated by C\\n-t  shows the commands before starting them\\n-r  starts nothing if the input is empty\\nExample: find . -name \\\"*.tmp\\\" | xargs rm\",\"help.xargs.summary\":\"Starts a command with the words of the input as arguments.\",\"help.xargs.usage\":\"xargs [-n N] [-I {}] [-0] [-t] [command [arguments…]]\",\"help.yes.summary\":\"Repeats a line forever (y if not given): useful in a pipeline.\",\"help.yes.usage\":\"yes [text]\",\"help.seq.text\":\"-s S  separator (newline if not given)\\n-w  same width, padded with zeros\",\"help.seq.summary\":\"Writes a sequence of numbers.\",\"help.seq.usage\":\"seq [first [step]] last\",\"help.nl.summary\":\"Numbers the lines (non-empty ones, or all with -b a).\",\"help.rev.summary\":\"Writes every line reversed.\",\"help.tr.text\":\"tr a-z A-Z  to uppercase\\ntr -d '\\\\r'  removes Windows carriage returns\\ntr -s ' '  only one space in a row\\nClasses: [:upper:] [:lower:] [:digit:] [:alpha:] [:alnum:] [:space:] [:punct:]\",\"help.tr.summary\":\"Replaces or deletes characters.\",\"help.tr.usage\":\"tr [-dsc] set1 [set2]\",\"help.cut.text\":\"-f 1,3  fields 1 and 3 (separated by tab or by -d)\\n-d ,  the separator\\n-c 1-5  characters 1 to 5\\n-s  only the lines with the separator\",\"help.cut.summary\":\"Extracts columns from every line.\",\"help.cut.usage\":\"cut -f fields [-d separator] | -c characters [file…]\",\"help.tee.text\":\"-a  appends instead of overwriting\",\"help.tee.summary\":\"Copies the input both to the output and to files.\",\"help.uniq.text\":\"-c  with the number of repetitions\\n-d  only the repeated lines\\n-u  only the unique ones\\n-i  ignoring case\",\"help.uniq.summary\":\"Removes lines repeated one after the other (usually after sort).\",\"help.sort.text\":\"-r  reversed\\n-n  by number\\n-h  by human-readable size (2K, 1M)\\n-u  without duplicates\\n-f  ignoring case\\n-k N[,M]  by field N (up to M)\\n-t C  fields separated by C\\n-V  numbers inside the text (file2 before file10)\\n-o file  writes to the file\",\"help.sort.summary\":\"Sorts lines.\",\"help.sort.usage\":\"sort [-rnufhV] [-k field] [-t separator] [file…]\",\"help.grep.text\":\"-i  ignoring case\\n-v  the lines that do NOT match\\n-n  with the line number\\n-c  counts the lines\\n-l  only the names of the files\\n-r  searches in directories\\n-w  whole words, -x whole lines\\n-E  extended regular expressions (| + ? () without backslash)\\n-F  plain text, not a regular expression\\n-o  only the part that matches\\n-q  no output, only the status\\n-A N, -B N, -C N  lines of context after, before, around\\nStatus: 0 found, 1 not found, 2 error.\",\"help.grep.summary\":\"Searches for the lines that contain a pattern (regular expression).\",\"help.grep.usage\":\"grep [-ivnclrwxEFoqH] [-e pattern] pattern [file…]\",\"help.wc.text\":\"-l lines, -w words, -c bytes, -m characters, -L the longest line\",\"help.wc.summary\":\"Counts lines, words and bytes.\",\"help.tail.text\":\"-n N  the last N lines (-n +N: from line N on)\\n-c N  the last N characters\",\"help.tail.summary\":\"The last lines (10 if not given).\",\"help.tail.usage\":\"tail [-n lines] [-c bytes] [file…]\",\"help.head.text\":\"-n N  the first N lines (-n -N: all but the last N)\\n-c N  the first N characters\\n-5 is like -n 5\",\"help.head.summary\":\"The first lines (10 if not given).\",\"help.head.usage\":\"head [-n lines] [-c bytes] [file…]\",\"help.sed.text\":\"s/old/new/g  replaces (g: every time, i: ignoring case, p: prints)\\n3d, /re/d, 2,5d  deletes lines     -n …p  prints only the chosen ones\\ny/abc/xyz/  transliterates     a text, i text, c text  appends, inserts, changes\\n=  line number   q  quits   h H g G x  hold space   b t :label  jumps\\nAddresses: n, $, /re/, a,b, a,+n, ! to negate, { … } to group.\\n-n  does not print lines by itself    -E  extended regular expressions    -i  edits the files\\nExamples: sed 's/red/blue/g' notes.txt    sed -n '1,5p' file    sed -i '/^#/d' conf.txt\",\"help.sed.summary\":\"Edits text line by line (substitutions, deletions…).\",\"help.diff.text\":\"-u  unified format (with 3 lines of context; -U N for N)\\n-q  only tells whether they differ\\n-i  ignoring case\\n-w  ignoring spaces, -b ignoring how many there are\\n-B  ignoring empty lines\\n-s  tells also when they are identical\\n\\\"-\\\" is the input. Status: 0 same, 1 different, 2 error.\",\"help.diff.summary\":\"Shows the differences between two files.\",\"help.uname.summary\":\"The name of the operating system.\",\"help.hostname.summary\":\"The name of the system.\",\"help.whoami.summary\":\"The name of the user.\",\"help.date.text\":\"Format: %Y year, %m month, %d day, %H:%M:%S time, %A day of the week, %B month, %s seconds since 1970, %F = %Y-%m-%d, %T = %H:%M:%S\\n-d @1700000000, -d 2026-01-01, -d yesterday\\nExample: date +%F\",\"help.date.summary\":\"Date and time.\",\"help.date.usage\":\"date [-u] [-d date] [+format]\",\"help.apps.summary\":\"Lists the installed apps (id, name, version).\",\"help.tag.text\":\"tag                lists the tags\\ntag ls Work        the items with the tag\\ntag show file      the tags of an item\\ntag add Work f     puts the tag (creates it if missing)\\ntag rm Work f      removes it\\ntag new name color creates a tag\\ntag delete name    deletes a tag\",\"help.tag.summary\":\"The tags of lilOS: lists, assigns, removes.\",\"help.tag.usage\":\"tag [ls [tag…] | show path… | add tag path… | rm tag path… | new name [color] | delete tag…]\",\"help.trash.text\":\"trash              lists what is in the trash\\ntrash put file     moves to the trash (like rm -r)\\ntrash restore name puts back\\ntrash rm name      deletes permanently\\ntrash empty        empties the trash\",\"help.trash.summary\":\"The trash: lists, puts back, empties.\",\"help.trash.usage\":\"trash [list | put path… | restore name… | rm name… | empty]\",\"help.open.text\":\"open notes.txt   opens with the default app\\nopen .   opens the directory in the File Manager\\nopen -a editor notes.txt   with a given app\\nopen -a photo   starts an app\",\"help.open.summary\":\"Opens files and directories with their app (or with the one given).\",\"help.open.usage\":\"open [-a app] path…\",\"arith.tooDeep\":\"expression recursion level exceeded\",\"arith.syntax\":\"{expr}: syntax error in expression (error token is \\\"{token}\\\")\",\"arith.end\":\"end\",\"arith.missingBracket\":\"{expr}: missing `]'\",\"arith.operandExpected\":\"{expr}: syntax error: operand expected\",\"arith.badBase\":\"{value}: invalid arithmetic base\",\"arith.tooGreatForBase\":\"{value}: value too great for base\",\"arith.invalid\":\"invalid expression\",\"arith.divisionByZero\":\"division by 0\",\"arith.negativeExponent\":\"exponent less than 0\",\"arith.unknownOperator\":\"unknown operator {op}\",\"expand.braceTooLarge\":\"brace expansion too large\",\"expand.badSubstitution\":\"{name}: bad substitution\",\"expand.unbound\":\"{name}: unbound variable\",\"expand.cannotAssign\":\"{name}: cannot assign in this way\",\"expand.nullOrNotSet\":\"parameter null or not set\",\"expand.negativeSubstring\":\"{count}: substring expression < 0\",\"opt.invalid\":\"invalid option -- '{option}'\",\"opt.longNeedsArgument\":\"option '--{name}' requires an argument\",\"opt.needsArgument\":\"option requires an argument -- '{option}'\",\"opt.badNumber\":\"invalid number: '{value}'\",\"regex.unmatchedBracket\":\"Unmatched [ in regular expression\",\"regex.invalid\":\"invalid regular expression: {pattern}\",\"appCmd.summary\":\"A command of the {app} app.\",\"appCmd.usage\":\"{name} [arguments…]\",\"printf.badNumber\":\"{value}: invalid number\",\"test.argumentExpected\":\"argument expected\",\"test.unexpectedArgument\":\"{arg}: unexpected argument\",\"test.missingBracket\":\"missing `]'\",\"cd.oldpwdNotSet\":\"OLDPWD not set\",\"local.onlyInFunction\":\"can only be used in a function\",\"set.badOptionName\":\"{name}: invalid option name\",\"set.badOption\":\"{option}: invalid option\",\"let.noExpression\":\"expression expected\",\"return.onlyInFunction\":\"can only `return' from a function or sourced script\",\"loop.onlyInLoop\":\"only meaningful in a `for', `while', or `until' loop\",\"loop.badCount\":\"{n}: loop count out of range\",\"alias.badName\":\"`{name}': invalid alias name\",\"which.builtIn\":\"{name}: built into the Terminal\",\"wait.notAJob\":\"{spec}: not a job of this shell\",\"fg.noSuchJob\":\"{job}: no such job\",\"fg.current\":\"current\",\"kill.noSuchJob\":\"{spec}: no such job or process\",\"sleep.missing\":\"missing operand\",\"sleep.badDuration\":\"invalid time interval '{value}'\",\"source.noFile\":\"filename argument required\",\"bash.noCommand\":\"-c: option requires an argument\",\"bash.already\":\"You are already in bash: for a script type \\\"bash file.sh\\\" or \\\"source file.sh\\\".\",\"type.alias\":\"{name} is aliased to `{value}'\",\"type.keyword\":\"{name} is a shell keyword\",\"type.function\":\"{name} is a function\",\"type.builtin\":\"{name} is a shell builtin\",\"type.appCommand\":\"{name} is a command of the {app} app\",\"type.command\":\"{name} is a Terminal command\",\"type.file\":\"{name} is {path}\",\"syntax.topic.variables\":\"variables\",\"syntax.topic.redirections\":\"redirections\",\"syntax.if\":\"if commands; then commands; [elif commands; then commands;] [else commands;] fi\\nRuns the branch of the first \\\"if\\\"/\\\"elif\\\" whose commands succeed (status 0).\\n  if [ -f notes.txt ]; then echo found; else echo missing; fi\",\"syntax.for\":\"for name in words…; do commands; done\\nfor (( init; condition; step )); do commands; done\\n  for f in *.txt; do wc -l \\\"$f\\\"; done\\n  for ((i = 1; i <= 3; i++)); do echo $i; done\",\"syntax.while\":\"while commands; do commands; done   (until: as long as the commands do NOT succeed)\\n  n=0; while [ $n -lt 3 ]; do echo $n; n=$((n + 1)); done\\n  ls | while read -r name; do echo \\\"- $name\\\"; done\",\"syntax.until\":\"until commands; do commands; done: repeats as long as the commands do not succeed.\",\"syntax.case\":\"case word in pattern|pattern) commands;; … esac\\nPatterns use * ? [ ]. \\\";&\\\" goes on into the next branch, \\\";;&\\\" tries the following patterns too.\\n  case \\\"$f\\\" in *.txt) echo text;; *.png|*.jpg) echo image;; *) echo other;; esac\",\"syntax.function\":\"name() { commands; }   or   function name { commands; }\\nThe arguments are $1, $2…, $@; \\\"local\\\" creates variables of the function, \\\"return n\\\" exits.\\n  greet() { echo \\\"Hello, $1\\\"; }; greet Eugenio\",\"syntax.cond\":\"[[ expression ]]: test without word splitting or expansion of *.\\n  [[ $name == *.txt ]]      comparison with a pattern\\n  [[ $s =~ ^[0-9]+$ ]]      regular expression (groups in BASH_REMATCH)\\n  [[ -d dir && ! -e file ]] -e -f -d -s -z -n, && || ! ( )\",\"syntax.arith\":\"(( expression )): integer arithmetic; status 0 if the result is not 0.\\n  (( n++ )); (( n > 3 )) && echo big; echo $(( 2 ** 10 ))\",\"syntax.variables\":\"name=value (no spaces), $name or ${name}. Arrays: a=(x y z), ${a[0]}, ${a[@]}, ${#a[@]}.\\n${v:-default} ${v:=default} ${v:+alt} ${#v} ${v#prefix} ${v%suffix} ${v/from/to} ${v//from/to} ${v:start:length} ${v^^} ${v,,}\\nSpecial: $? status of the last command, $$ the shell, $! the last command in the background, $# $@ $* the arguments.\",\"syntax.redirections\":\"> file (overwrites), >> file (appends), < file (reads), 2> errors, 2>&1, &> file, <<EOF … EOF, <<< text, | pipe.\\n/dev/null discards everything.\",\"files.cannotAccess\":\"cannot access '{path}': No such file or directory\",\"files.cannotCreate\":\"cannot create '{path}': No such file or directory\",\"files.overwriteFolder\":\"cannot overwrite directory '{name}' with non-directory\",\"files.missingDestination\":\"missing destination file operand after '{path}'\",\"files.targetNotFolder\":\"target '{path}' is not a directory\",\"files.cannotStat\":\"cannot stat '{path}': No such file or directory\",\"files.cannotRemove\":\"cannot remove '{path}': {reason}\",\"files.quotedNoSuchFile\":\"'{path}': No such file or directory\",\"mkdir.notAFolder\":\"cannot create directory '{path}': '{name}' exists and is not a directory\",\"mkdir.exists\":\"cannot create directory '{path}': File exists\",\"mkdir.noParent\":\"cannot create directory '{path}': No such file or directory\",\"mkdir.created\":\"created directory '{path}'\",\"cp.overwriteFile\":\"cannot overwrite non-directory '{name}' with directory\",\"cp.verbose\":\"'{from}' -> '{to}'\",\"cp.omitting\":\"-r not specified; omitting directory '{path}'\",\"cp.intoItself\":\"cannot copy a directory, '{path}', into itself\",\"mv.system\":\"cannot move '{path}': it is a system folder\",\"mv.intoItself\":\"cannot move '{path}' to a subdirectory of itself\",\"mv.notEmpty\":\"cannot move '{path}' to '{name}': Directory not empty\",\"mv.verbose\":\"renamed '{from}' -> '{to}'\",\"reason.noSuchFile\":\"No such file or directory\",\"reason.isADirectory\":\"Is a directory\",\"reason.notADirectory\":\"Not a directory\",\"reason.notEmpty\":\"Directory not empty\",\"reason.system\":\"it is a system folder\",\"reason.containsSystem\":\"it contains system folders\",\"rm.home\":\"it is dangerous to operate on '{path}': it is the home\",\"rm.purged\":\"permanently deleted '{path}'\",\"rm.trashed\":\"moved to the trash '{path}'\",\"rmdir.removed\":\"removed directory '{path}'\",\"stat.folder\":\"directory\",\"stat.appLink\":\"link to the app {app}\",\"stat.file\":\"regular file\",\"stat.emptyFile\":\"regular empty file\",\"stat.type\":\"Type: {type}\",\"stat.path\":\"Path: {path}\",\"stat.items\":\"Items: {n} ({total} in all)\",\"stat.size\":\"Size: {size} bytes ({human})\",\"stat.created\":\"Created: {date}\",\"stat.modified\":\"Modified: {date}\",\"stat.tags\":\"Tags: {tags}\",\"stat.system\":\"System folder\",\"find.missingArgument\":\"missing argument to `{name}'\",\"find.badType\":\"unknown argument to -type: {type} (f, d or l)\",\"find.badSize\":\"invalid -size argument '{value}'\",\"find.badValue\":\"invalid argument '{value}' to {option}\",\"find.cannotFind\":\"cannot find '{path}'\",\"find.execEnd\":\"missing end of `-exec' (`;' or `+')\",\"find.execCommand\":\"missing command of `-exec'\",\"find.unknownPredicate\":\"unknown predicate `{name}'\",\"find.unexpected\":\"unexpected argument: '{arg}'\",\"tree.folders\":{\"one\":\"{n} directory\",\"other\":\"{n} directories\"},\"tree.files\":{\"one\":\"{n} file\",\"other\":\"{n} files\"},\"ls.date\":\"{month} {day}\",\"wc.total\":\"total\",\"grep.noPattern\":\"missing pattern\\nUsage: grep [options] pattern [file…]\",\"sort.badKey\":\"invalid key: '{key}'\",\"sort.disorder\":\"-:{n}: disorder: {line}\",\"cut.badList\":\"invalid list: '{spec}'\",\"cut.noList\":\"you must specify a list of fields (-f) or characters (-c)\",\"cut.badDelimiter\":\"the delimiter must be a single character\",\"tr.reverseRange\":\"range-endpoints of '{range}' are in reverse collating sequence order\",\"tr.missingSet2\":\"missing operand after '{set}'\",\"seq.badArgument\":\"invalid floating point argument: '{value}'\",\"seq.zeroStep\":\"invalid Zero increment value: '0'\",\"xargs.unmatchedDouble\":\"unmatched double quote\",\"xargs.unmatchedSingle\":\"unmatched single quote\",\"xargs.badCount\":\"value for -n option should be >= 1\",\"sed.at\":\"-e expression #1, char {pos}: {message}\",\"sed.unterminated\":\"unterminated `s' command\",\"sed.badAddress\":\"invalid address\",\"sed.missingAddress\":\"missing second address\",\"sed.missingCommand\":\"missing command\",\"sed.unexpectedBrace\":\"unexpected `}'\",\"sed.badDelimiter\":\"invalid delimiter for `s'\",\"sed.yLengths\":\"strings for `y' command are different lengths\",\"sed.noLabel\":\"\\\":\\\" lacks a label\",\"sed.unknownCommand\":\"unknown command: `{cmd}'\",\"sed.unmatchedBrace\":\"unmatched `{'\",\"sed.noSuchLabel\":\"can't find label for jump to `{label}'\",\"sed.noPreviousRegex\":\"no previous regular expression\",\"sed.cannotRead\":\"can't read {path}: No such file or directory\",\"sed.noScript\":\"missing script\\nUsage: sed [-n] [-E] [-i] script [file…]\",\"sed.noFiles\":\"no input files to edit with -i\",\"diff.missingOperand\":\"missing operand after '{arg}'\",\"diff.extraOperand\":\"extra operand '{arg}'\",\"diff.identical\":\"Files {a} and {b} are identical\",\"diff.differ\":\"Files {a} and {b} differ\",\"diff.tooBig\":\"the files are too different and too large to compare\",\"open.noApp\":\"app not found: '{app}' (see \\\"apps\\\")\",\"trash.notInTrash\":\"'{name}' is not in the trash\",\"trash.empty\":\"The trash is empty.\",\"trash.deletedFolder\":\"(deleted folder)\",\"trash.items\":{\"one\":\"{n} item\",\"other\":\"{n} items\"},\"trash.missingPut\":\"missing what to move to the trash\",\"trash.cannotTrash\":\"{path}: cannot be moved to the trash (system folder)\",\"trash.missingRestore\":\"missing the name of what to put back\",\"trash.restored\":\"restored to {path}\",\"trash.missingName\":\"missing name\",\"trash.purged\":{\"one\":\"permanently deleted {n} item\",\"other\":\"permanently deleted {n} items\"},\"trash.emptied\":{\"one\":\"Trash emptied ({n} item).\",\"other\":\"Trash emptied ({n} items).\"},\"trash.alreadyEmpty\":\"The trash was already empty.\",\"tag.noSuchTag\":\"no such tag: '{name}' (see \\\"tag ls\\\")\",\"tag.none\":\"No tags. Create one with \\\"tag new name\\\".\",\"tag.hidden\":\"hidden\",\"tag.noTags\":\"no tags\",\"tag.usageAddRm\":\"tag {sub} name file…\",\"tag.created\":\"created tag '{name}'\",\"tag.system\":\"{path}: system items have no tags\",\"tag.usageNew\":\"tag new name [color]\",\"tag.createdShown\":\"created tag {tag}\",\"tag.usageDelete\":\"tag delete name…\",\"date.formatC\":\"%a %b %e %H:%M:%S %Y\",\"date.formatX\":\"%m/%d/%y\",\"date.format\":\"%a %b %e %H:%M:%S %Z %Y\",\"date.invalid\":\"invalid date '{date}'\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"Terminale\",\"@description\":\"Una shell come bash sui file di lilOS: comandi, pipe, redirezioni, variabili, cicli, funzioni e script.\",\"@entrypoints.main.params.cwd.label\":\"Cartella\",\"@entrypoints.main.params.cwd.description\":\"La cartella in cui aprire il terminale\",\"ui.title\":\"Terminale\",\"ui.commandLine\":\"Riga di comando\",\"ui.welcome\":\"Terminale di lilOS · «help» elenca i comandi\",\"shell.defaultUser\":\"utente\",\"shell.readonly\":\"{name}: variabile in sola lettura\",\"shell.cannotUnset\":\"{name}: impossibile eliminare: variabile in sola lettura\",\"shell.badSubscript\":\"{index}: indice dell’array non valido\",\"shell.unknownConstruct\":\"costrutto sconosciuto: {type}\",\"shell.badRegex\":\"espressione regolare non valida\",\"shell.unaryExpected\":\"{op}: operatore unario atteso\",\"shell.integerExpected\":\"{value}: è attesa un’espressione intera\",\"shell.binaryExpected\":\"{op}: operatore binario atteso\",\"shell.commandNotFound\":\"{name}: comando non trovato\",\"shell.tooDeep\":\"{name}: troppi livelli di ricorsione\",\"shell.badFd\":\"{fd}: descrittore di file errato\",\"shell.fdExpected\":\"{target}: è richiesto un descrittore di file\",\"shell.ambiguousRedirect\":\"{target}: redirezione ambigua\",\"shell.isAppLink\":\"{path}: è un collegamento a un’app\",\"err.noSuchFile\":\"{path}: file o cartella inesistente\",\"err.isADirectory\":\"{path}: è una cartella\",\"err.notAFile\":\"{path}: non è un file\",\"err.missingParen\":\"manca «)»\",\"err.badIdentifier\":\"«{name}»: identificatore non valido\",\"err.numericArgument\":\"{value}: è richiesto un argomento numerico\",\"err.tooManyArguments\":\"troppi argomenti\",\"err.notADirectory\":\"{path}: non è una cartella\",\"err.notFound\":\"{name}: non trovato\",\"err.missingOperand\":\"manca l’operando\",\"err.unknownSubcommand\":\"sottocomando sconosciuto: «{sub}»\",\"parse.unexpectedEnd\":\"errore di sintassi: fine del testo inattesa\",\"parse.unexpectedEndOfFile\":\"errore di sintassi: fine del file inattesa\",\"parse.nearEnd\":\"fine del testo\",\"parse.nearNewline\":\"a capo\",\"parse.nearToken\":\"«{token}»\",\"parse.near\":\"errore di sintassi vicino a {near}\",\"parse.nearExpected\":\"errore di sintassi vicino a {near}: atteso «{expected}»\",\"parse.badFunctionName\":\"nome di funzione non valido\",\"parse.parenAfterName\":\"atteso «)» dopo il nome della funzione\",\"parse.aliasLoop\":\"alias espansi troppe volte\",\"parse.missingTarget\":\"errore di sintassi vicino a {near}: manca la destinazione di «{op}»\",\"parse.forBadName\":\"for: nome di variabile non valido\",\"parse.caseNoWord\":\"case: manca la parola\",\"parse.condNear\":\"errore di sintassi in [[ vicino a {near}\",\"parse.condNoOperand\":\"errore di sintassi in [[: manca un operando\",\"parse.condNoRegex\":\"errore di sintassi in [[: manca l’espressione regolare\",\"parse.badSubstitution\":\"sostituzione errata\",\"parse.badSubstitutionBrace\":\"sostituzione errata: manca «}»\",\"parse.backquotes\":\"errore di sintassi tra gli apici inversi\",\"jobs.done\":\"Fatto\",\"jobs.interrupted\":\"Interrotto\",\"jobs.exit\":\"Uscita {code}\",\"jobs.running\":\"In esecuzione\",\"help.usageLine\":\"Uso: {usage}\",\"help.usageShort\":\"uso: {usage}\",\"help.noHelp\":\"nessun aiuto per «{name}»\",\"help.intro\":\"Terminale di lilOS: una shell come bash sui file di lilOS.\\n«help comando» o «comando --help» spiega un comando; «help if», «help for», «help case»… la sintassi.\",\"help.syntaxList\":\"Sintassi: {list}\",\"help.sh.summary\":\"Come bash.\",\"help.sh.usage\":\"sh [-c comandi | script] [argomenti…]\",\"help.bash.text\":\"«bash script.sh a b» esegue lo script con $1=a, $2=b; «bash -c 'echo $1' nome x» esegue il testo; «cat script.sh | bash» legge lo script dall’input.\",\"help.bash.summary\":\"Esegue uno script o dei comandi in una nuova shell.\",\"help.bash.usage\":\"bash [-c comandi | script] [argomenti…]\",\"help.sleep.summary\":\"Aspetta: 5 (secondi), 0.5, 2m, 1h.\",\"help.sleep.usage\":\"sleep durata…\",\"help.kill.summary\":\"Interrompe dei comandi in background.\",\"help.kill.usage\":\"kill [-segnale] %job | pid…\",\"help.fg.summary\":\"Porta in primo piano un comando in background: lo si aspetta e Ctrl C lo interrompe.\",\"help.wait.summary\":\"Aspetta che finiscano i comandi in background (tutti, o quelli indicati).\",\"help.jobs.summary\":\"Elenca i comandi avviati in background con &.\",\"help.clear.summary\":\"Pulisce lo schermo (anche Ctrl L).\",\"help.help.summary\":\"Elenca i comandi, o spiega quello indicato.\",\"help.help.usage\":\"help [comando]\",\"help.history.summary\":\"Mostra i comandi dati (gli ultimi n); -c cancella la cronologia.\",\"help.which.summary\":\"Dice dove si trova un comando.\",\"help.which.usage\":\"which nome…\",\"help.command.summary\":\"Avvia un comando ignorando le funzioni con lo stesso nome; con -v dice cosa avvierebbe.\",\"help.command.usage\":\"command [-v] nome [argomenti…]\",\"help.type.summary\":\"Dice cos’è un nome: alias, parola chiave, funzione, comando.\",\"help.type.usage\":\"type [-t] nome…\",\"help.unalias.summary\":\"Elimina degli alias (tutti con -a).\",\"help.unalias.usage\":\"unalias [-a] nome…\",\"help.alias.text\":\"Esempio: alias ll='ls -l'. Gli alias valgono dalla riga successiva a quella che li definisce.\",\"help.alias.summary\":\"Definisce o mostra gli alias (nomi brevi per comandi).\",\"help.alias.usage\":\"alias [nome[=valore]…]\",\"help.eval.summary\":\"Esegue gli argomenti, uniti da spazi, come un comando.\",\"help.eval.usage\":\"eval [argomenti…]\",\"help.dot.summary\":\"Come source.\",\"help.dot.usage\":\". file [argomenti…]\",\"help.source.summary\":\"Esegue i comandi di un file in questa shell (variabili, funzioni e alias restano).\",\"help.source.usage\":\"source file [argomenti…]\",\"help.read.text\":\"-r  le barre rovesciate restano come sono\\n-p  mostra un prompt\\n-a  mette le parole in un array\\n-d  legge fino a questo carattere invece che fino all’a capo\\n-s  non mostra ciò che si scrive (per le password)\\nStato 1 alla fine dell’input.\",\"help.read.summary\":\"Legge una riga e la divide nelle variabili indicate ($REPLY senza nomi).\",\"help.read.usage\":\"read [-rs] [-p prompt] [-a array] [-d delim] [nome…]\",\"help.continue.summary\":\"Passa al giro successivo del ciclo (o dell’n-esimo ciclo esterno).\",\"help.break.summary\":\"Esce dal ciclo (o da n cicli).\",\"help.return.summary\":\"Esce dalla funzione (o dallo script letto con source).\",\"help.return.usage\":\"return [stato]\",\"help.exit.summary\":\"Chiude il terminale (o esce dallo script) con uno stato.\",\"help.exit.usage\":\"exit [stato]\",\"help.let.summary\":\"Calcola espressioni aritmetiche (stato 1 se l’ultima vale 0).\",\"help.let.usage\":\"let espressione…\",\"help.bracket.summary\":\"Come test, con una «]» finale.\",\"help.bracket.usage\":\"[ espressione ]\",\"help.test.text\":\"File: -e esiste, -f è un file, -d è una cartella, -s non è vuoto\\nTesto: -z vuoto, -n non vuoto, a = b, a != b\\nNumeri: -eq -ne -lt -le -gt -ge\\nInsieme: ! negazione, -a e, -o o, ( … )\",\"help.test.summary\":\"Valuta un’espressione: stato 0 se vera, 1 se falsa.\",\"help.test.usage\":\"test espressione\",\"help.colon.summary\":\"Non fa niente (stato 0); gli argomenti vengono comunque espansi.\",\"help.colon.usage\":\": [argomenti…]\",\"help.false.summary\":\"Non fa niente, senza successo (stato 1).\",\"help.true.summary\":\"Non fa niente, con successo (stato 0).\",\"help.shift.summary\":\"Sposta i parametri posizionali: $2 diventa $1…\",\"help.set.text\":\"-e  esce al primo comando che fallisce\\n-u  errore se si usa una variabile non impostata\\n-x  mostra i comandi prima di eseguirli\\n-f  niente espansione di * e ?\\n-o pipefail  una pipe fallisce se fallisce uno dei suoi comandi\\n+e, +u… le disattivano. Senza argomenti mostra tutte le variabili.\",\"help.set.summary\":\"Imposta le opzioni della shell e i parametri posizionali ($1, $2…).\",\"help.set.usage\":\"set [-euxf] [-o opzione] [--] [argomenti…]\",\"help.printenv.summary\":\"Mostra le variabili esportate (o il valore di quelle indicate).\",\"help.printenv.usage\":\"printenv [nome…]\",\"help.env.summary\":\"Mostra le variabili esportate, o avvia un comando con variabili in più.\",\"help.env.usage\":\"env [nome=valore…] [comando [argomenti…]]\",\"help.unset.summary\":\"Elimina variabili (o funzioni con -f).\",\"help.unset.usage\":\"unset [-fv] nome…\",\"help.typeset.summary\":\"Come declare.\",\"help.typeset.usage\":\"typeset [-aprxifF] [nome[=valore]…]\",\"help.declare.text\":\"-a array, -x esportata, -r sola lettura, -i intero (il valore si calcola), -p mostra, -f mostra le funzioni, -g globale dentro una funzione.\",\"help.declare.summary\":\"Dichiara variabili e ne mostra gli attributi.\",\"help.declare.usage\":\"declare [-aprxifF] [nome[=valore]…]\",\"help.local.summary\":\"Variabili visibili solo dentro la funzione.\",\"help.local.usage\":\"local [-arx] nome[=valore]…\",\"help.readonly.summary\":\"Rende le variabili di sola lettura.\",\"help.readonly.usage\":\"readonly [nome[=valore]…]\",\"help.export.text\":\"Senza argomenti elenca le variabili esportate. -n toglie l’esportazione.\",\"help.export.summary\":\"Rende le variabili visibili ai comandi e agli script avviati.\",\"help.export.usage\":\"export [-n] [nome[=valore]…]\",\"help.printf.text\":\"Il formato si riapplica finché restano argomenti. -v salva il risultato in una variabile.\",\"help.printf.summary\":\"Scrive gli argomenti secondo un formato (%s, %d, %5.2f, %x, %b, %q…).\",\"help.printf.usage\":\"printf [-v var] formato [argomenti…]\",\"help.echo.text\":\"-n  senza a capo finale\\n-e  interpreta \\\\n, \\\\t, \\\\\\\\, \\\\e… \\n-E  non le interpreta (predefinito)\",\"help.echo.summary\":\"Scrive gli argomenti, separati da uno spazio.\",\"help.echo.usage\":\"echo [-neE] [testo…]\",\"help.pwd.summary\":\"Mostra la cartella di lavoro.\",\"help.cd.text\":\"Senza argomenti va nella home ($HOME). «cd -» torna alla cartella precedente ($OLDPWD).\",\"help.cd.summary\":\"Cambia la cartella di lavoro.\",\"help.cd.usage\":\"cd [cartella]\",\"help.realpath.summary\":\"Il percorso completo.\",\"help.realpath.usage\":\"realpath [-m] percorso…\",\"help.dirname.summary\":\"Il percorso senza l’ultima parte.\",\"help.dirname.usage\":\"dirname percorso…\",\"help.basename.summary\":\"L’ultima parte di un percorso (senza il suffisso).\",\"help.basename.usage\":\"basename percorso [suffisso]\",\"help.tree.summary\":\"Mostra le cartelle ad albero.\",\"help.tree.usage\":\"tree [-adf] [-L livelli] [cartella…]\",\"help.find.text\":\"Test: -name modello, -iname, -path, -type f|d|l, -empty, -size [+-]n[ckMG], -mtime [+-]giorni, -mmin, -newer file\\nAzioni: -print, -print0, -delete (nel cestino), -exec comando {} \\\\; oppure +\\nOpzioni: -maxdepth n, -mindepth n. Insieme: ! (negazione), -o (o), ( … )\\nEsempio: find . -name \\\"*.txt\\\" -size +1k\",\"help.find.summary\":\"Cerca file e cartelle.\",\"help.find.usage\":\"find [percorso…] [espressione]\",\"help.stat.text\":\"-c  formato: %n nome, %s dimensione, %F tipo, %y data di modifica, %Y in secondi, %w %W creazione, %i id\",\"help.stat.summary\":\"Mostra i dettagli di file e cartelle.\",\"help.stat.usage\":\"stat [-c formato] percorso…\",\"help.rmdir.summary\":\"Rimuove cartelle vuote (nel cestino).\",\"help.rmdir.usage\":\"rmdir [-p] cartella…\",\"help.rm.text\":\"-r  anche le cartelle, con il loro contenuto\\n-d  le cartelle vuote\\n-f  nessun errore per ciò che non esiste\\n--purge  elimina definitivamente, senza cestino\\nCiò che va nel cestino si rimette a posto con «trash restore».\",\"help.rm.summary\":\"Sposta file e cartelle nel cestino (con --purge li elimina per sempre).\",\"help.rm.usage\":\"rm [-rfvd] [--purge] percorso…\",\"help.mv.text\":\"Se la destinazione è una cartella, ci sposta dentro; altrimenti rinomina. Un file sovrascritto va nel cestino.\\n-n  non sovrascrive\\n-v  dice cosa sposta\",\"help.mv.summary\":\"Sposta o rinomina file e cartelle.\",\"help.mv.usage\":\"mv [-nv] origine… destinazione\",\"help.cp.text\":\"-r  copia anche le cartelle, con il loro contenuto\\n-n  non sovrascrive i file che esistono\\n-v  dice cosa copia\",\"help.cp.summary\":\"Copia file e cartelle.\",\"help.cp.usage\":\"cp [-rnv] origine… destinazione\",\"help.touch.summary\":\"Crea dei file vuoti, o aggiorna la data di modifica di quelli che esistono.\",\"help.mkdir.text\":\"-p  crea anche le cartelle intermedie; nessun errore se esiste già\",\"help.mkdir.summary\":\"Crea delle cartelle.\",\"help.mkdir.usage\":\"mkdir [-pv] cartella…\",\"help.cat.text\":\"-n  numera le righe\\n-b  numera solo quelle non vuote\\n-s  una sola riga vuota di fila\\n-E  $ alla fine di ogni riga\",\"help.cat.summary\":\"Mostra il contenuto dei file (o dell’input), uno dopo l’altro.\",\"help.ls.text\":\"-l  dettagli (tipo, dimensione, data, tag)\\n-a  anche i nomi che iniziano con «.»\\n-h  dimensioni leggibili (1,2K)\\n-t  per data, -S per dimensione, -r al contrario\\n-1  uno per riga\\n-d  la cartella stessa, non il contenuto\\n-R  anche le sottocartelle\\n-F  / dopo le cartelle, @ dopo i collegamenti, * dopo gli script\",\"help.ls.summary\":\"Elenca il contenuto delle cartelle.\",\"help.ls.usage\":\"ls [-laAh1trSdRF] [percorso…]\",\"help.xargs.text\":\"-n N  al massimo N argomenti per volta\\n-I {}  un comando per riga, con {} sostituito dalla riga\\n-0  parole separate dal carattere nullo (find -print0)\\n-d C  parole separate da C\\n-t  mostra i comandi prima di avviarli\\n-r  non avvia niente se l’input è vuoto\\nEsempio: find . -name \\\"*.tmp\\\" | xargs rm\",\"help.xargs.summary\":\"Avvia un comando con le parole dell’input come argomenti.\",\"help.xargs.usage\":\"xargs [-n N] [-I {}] [-0] [-t] [comando [argomenti…]]\",\"help.yes.summary\":\"Ripete una riga all’infinito (y se non indicata): utile in una pipe.\",\"help.yes.usage\":\"yes [testo]\",\"help.seq.text\":\"-s S  separatore (a capo se non indicato)\\n-w  stessa larghezza, con zeri davanti\",\"help.seq.summary\":\"Scrive una sequenza di numeri.\",\"help.seq.usage\":\"seq [primo [passo]] ultimo\",\"help.nl.summary\":\"Numera le righe (non vuote, o tutte con -b a).\",\"help.rev.summary\":\"Scrive ogni riga al contrario.\",\"help.tr.text\":\"tr a-z A-Z  in maiuscolo\\ntr -d '\\\\r'  elimina i ritorni a capo di Windows\\ntr -s ' '  un solo spazio di fila\\nClassi: [:upper:] [:lower:] [:digit:] [:alpha:] [:alnum:] [:space:] [:punct:]\",\"help.tr.summary\":\"Sostituisce o elimina caratteri.\",\"help.tr.usage\":\"tr [-dsc] insieme1 [insieme2]\",\"help.cut.text\":\"-f 1,3  i campi 1 e 3 (separati da tab o da -d)\\n-d ,  il separatore\\n-c 1-5  i caratteri da 1 a 5\\n-s  solo le righe con il separatore\",\"help.cut.summary\":\"Estrae colonne da ogni riga.\",\"help.cut.usage\":\"cut -f campi [-d separatore] | -c caratteri [file…]\",\"help.tee.text\":\"-a  aggiunge in fondo invece di sovrascrivere\",\"help.tee.summary\":\"Copia l’input sia sull’output sia nei file.\",\"help.uniq.text\":\"-c  con il numero di ripetizioni\\n-d  solo le righe ripetute\\n-u  solo quelle uniche\\n-i  senza distinguere maiuscole e minuscole\",\"help.uniq.summary\":\"Toglie le righe ripetute una dopo l’altra (di solito dopo sort).\",\"help.sort.text\":\"-r  al contrario\\n-n  per numero\\n-h  per dimensione leggibile (2K, 1M)\\n-u  senza doppioni\\n-f  senza distinguere maiuscole e minuscole\\n-k N[,M]  per il campo N (fino a M)\\n-t C  campi separati da C\\n-V  numeri dentro il testo (file2 prima di file10)\\n-o file  scrive nel file\",\"help.sort.summary\":\"Ordina le righe.\",\"help.sort.usage\":\"sort [-rnufhV] [-k campo] [-t separatore] [file…]\",\"help.grep.text\":\"-i  senza distinguere maiuscole e minuscole\\n-v  le righe che NON corrispondono\\n-n  con il numero di riga\\n-c  conta le righe\\n-l  solo i nomi dei file\\n-r  cerca nelle cartelle\\n-w  parole intere, -x righe intere\\n-E  espressioni regolari estese (| + ? () senza barra)\\n-F  testo semplice, non espressione regolare\\n-o  solo la parte che corrisponde\\n-q  nessun risultato, solo lo stato\\n-A N, -B N, -C N  righe di contesto dopo, prima, intorno\\nStato: 0 trovato, 1 non trovato, 2 errore.\",\"help.grep.summary\":\"Cerca le righe che contengono un modello (espressione regolare).\",\"help.grep.usage\":\"grep [-ivnclrwxEFoqH] [-e modello] modello [file…]\",\"help.wc.text\":\"-l righe, -w parole, -c byte, -m caratteri, -L la riga più lunga\",\"help.wc.summary\":\"Conta righe, parole e byte.\",\"help.tail.text\":\"-n N  le ultime N righe (-n +N: dalla riga N in poi)\\n-c N  gli ultimi N caratteri\",\"help.tail.summary\":\"Le ultime righe (10 se non indicato).\",\"help.tail.usage\":\"tail [-n righe] [-c byte] [file…]\",\"help.head.text\":\"-n N  le prime N righe (-n -N: tutte tranne le ultime N)\\n-c N  i primi N caratteri\\n-5 è come -n 5\",\"help.head.summary\":\"Le prime righe (10 se non indicato).\",\"help.head.usage\":\"head [-n righe] [-c byte] [file…]\",\"help.sed.text\":\"s/vecchio/nuovo/g  sostituisce (g: tutte le volte, i: senza maiuscole, p: stampa)\\n3d, /re/d, 2,5d  elimina righe     -n …p  stampa solo quelle scelte\\ny/abc/xyz/  traslittera     a testo, i testo, c testo  aggiunge, inserisce, cambia\\n=  numero di riga   q  esce   h H g G x  spazio di riserva   b t :etichetta  salti\\nIndirizzi: n, $, /re/, a,b, a,+n, ! per negare, { … } per raggruppare.\\n-n  non stampa le righe da sola    -E  espressioni regolari estese    -i  modifica i file\\nEsempi: sed 's/rosso/blu/g' note.txt    sed -n '1,5p' file    sed -i '/^#/d' conf.txt\",\"help.sed.summary\":\"Modifica il testo riga per riga (sostituzioni, cancellazioni…).\",\"help.diff.text\":\"-u  formato unificato (con 3 righe di contesto; -U N per N)\\n-q  dice solo se sono diversi\\n-i  senza distinguere maiuscole e minuscole\\n-w  ignorando gli spazi, -b ignorando quanti sono\\n-B  ignorando le righe vuote\\n-s  dice anche quando sono identici\\n«-» è l’input. Stato: 0 uguali, 1 diversi, 2 errore.\",\"help.diff.summary\":\"Mostra le differenze tra due file.\",\"help.uname.summary\":\"Il nome del sistema operativo.\",\"help.hostname.summary\":\"Il nome del sistema.\",\"help.whoami.summary\":\"Il nome dell’utente.\",\"help.date.text\":\"Formato: %Y anno, %m mese, %d giorno, %H:%M:%S ora, %A giorno della settimana, %B mese, %s secondi dal 1970, %F = %Y-%m-%d, %T = %H:%M:%S\\n-d @1700000000, -d 2026-01-01, -d ieri\\nEsempio: date +%F\",\"help.date.summary\":\"Data e ora.\",\"help.date.usage\":\"date [-u] [-d data] [+formato]\",\"help.apps.summary\":\"Elenca le app installate (id, nome, versione).\",\"help.tag.text\":\"tag                elenca i tag\\ntag ls Lavoro      gli elementi con il tag\\ntag show file      i tag di un elemento\\ntag add Lavoro f   mette il tag (lo crea se non c’è)\\ntag rm Lavoro f    lo toglie\\ntag new nome blu   crea un tag\\ntag delete nome    elimina un tag\",\"help.tag.summary\":\"I tag di lilOS: elenca, assegna, toglie.\",\"help.tag.usage\":\"tag [ls [tag…] | show percorso… | add tag percorso… | rm tag percorso… | new nome [colore] | delete tag…]\",\"help.trash.text\":\"trash              elenca ciò che è nel cestino\\ntrash put file     sposta nel cestino (come rm -r)\\ntrash restore nome rimette a posto\\ntrash rm nome      elimina definitivamente\\ntrash empty        svuota il cestino\",\"help.trash.summary\":\"Il cestino: elenca, rimette a posto, svuota.\",\"help.trash.usage\":\"trash [list | put percorso… | restore nome… | rm nome… | empty]\",\"help.open.text\":\"open note.txt   apre con l’app predefinita\\nopen .   apre la cartella nel File Manager\\nopen -a editor note.txt   con un’app precisa\\nopen -a photo   avvia un’app\",\"help.open.summary\":\"Apre file e cartelle con la loro app (o con quella indicata).\",\"help.open.usage\":\"open [-a app] percorso…\",\"arith.tooDeep\":\"espressione: troppi livelli di ricorsione\",\"arith.syntax\":\"{expr}: errore di sintassi nell’espressione (simbolo errato «{token}»)\",\"arith.end\":\"fine\",\"arith.missingBracket\":\"{expr}: manca «]»\",\"arith.operandExpected\":\"{expr}: errore di sintassi nell’espressione (operando atteso)\",\"arith.badBase\":\"{value}: base non valida\",\"arith.tooGreatForBase\":\"{value}: valore troppo grande per la base\",\"arith.invalid\":\"espressione non valida\",\"arith.divisionByZero\":\"divisione per zero\",\"arith.negativeExponent\":\"esponente negativo\",\"arith.unknownOperator\":\"operatore sconosciuto {op}\",\"expand.braceTooLarge\":\"espansione delle graffe troppo grande\",\"expand.badSubstitution\":\"{name}: sostituzione errata\",\"expand.unbound\":\"{name}: variabile non impostata\",\"expand.cannotAssign\":\"{name}: impossibile assegnare in questo modo\",\"expand.nullOrNotSet\":\"parametro nullo o non impostato\",\"expand.negativeSubstring\":\"{count}: espressione di sottostringa < 0\",\"opt.invalid\":\"opzione non valida -- «{option}»\",\"opt.longNeedsArgument\":\"l’opzione «--{name}» richiede un argomento\",\"opt.needsArgument\":\"l’opzione richiede un argomento -- «{option}»\",\"opt.badNumber\":\"numero non valido: «{value}»\",\"regex.unmatchedBracket\":\"«[» senza «]» nell’espressione regolare\",\"regex.invalid\":\"espressione regolare non valida: {pattern}\",\"appCmd.summary\":\"Comando dell’app {app}.\",\"appCmd.usage\":\"{name} [argomenti…]\",\"printf.badNumber\":\"{value}: è richiesto un numero\",\"test.argumentExpected\":\"manca un argomento\",\"test.unexpectedArgument\":\"{arg}: argomento inatteso\",\"test.missingBracket\":\"manca «]»\",\"cd.oldpwdNotSet\":\"OLDPWD non impostata\",\"local.onlyInFunction\":\"si può usare solo in una funzione\",\"set.badOptionName\":\"{name}: nome di opzione non valido\",\"set.badOption\":\"{option}: opzione non valida\",\"let.noExpression\":\"manca l’espressione\",\"return.onlyInFunction\":\"si può usare solo in una funzione o in uno script letto con source\",\"loop.onlyInLoop\":\"ha senso solo in un ciclo for, while o until\",\"loop.badCount\":\"{n}: numero di cicli non valido\",\"alias.badName\":\"«{name}»: nome di alias non valido\",\"which.builtIn\":\"{name}: comando integrato nel Terminale\",\"wait.notAJob\":\"{spec}: non è un job di questa shell\",\"fg.noSuchJob\":\"{job}: job inesistente\",\"fg.current\":\"attuale\",\"kill.noSuchJob\":\"{spec}: job o processo inesistente\",\"sleep.missing\":\"manca la durata\",\"sleep.badDuration\":\"durata non valida: «{value}»\",\"source.noFile\":\"manca il nome del file\",\"bash.noCommand\":\"-c: manca il testo dei comandi\",\"bash.already\":\"Sei già in bash: per uno script scrivi «bash file.sh» o «source file.sh».\",\"type.alias\":\"{name} è un alias di «{value}»\",\"type.keyword\":\"{name} è una parola chiave della shell\",\"type.function\":\"{name} è una funzione\",\"type.builtin\":\"{name} è un comando interno della shell\",\"type.appCommand\":\"{name} è un comando dell’app {app}\",\"type.command\":\"{name} è un comando del Terminale\",\"type.file\":\"{name} è {path}\",\"syntax.topic.variables\":\"variabili\",\"syntax.topic.redirections\":\"redirezioni\",\"syntax.if\":\"if comandi; then comandi; [elif comandi; then comandi;] [else comandi;] fi\\nEsegue il ramo del primo «if»/«elif» i cui comandi riescono (stato 0).\\n  if [ -f note.txt ]; then echo c’è; else echo manca; fi\",\"syntax.for\":\"for nome in parole…; do comandi; done\\nfor (( inizio; condizione; passo )); do comandi; done\\n  for f in *.txt; do wc -l \\\"$f\\\"; done\\n  for ((i = 1; i <= 3; i++)); do echo $i; done\",\"syntax.while\":\"while comandi; do comandi; done   (until: finché i comandi NON riescono)\\n  n=0; while [ $n -lt 3 ]; do echo $n; n=$((n + 1)); done\\n  ls | while read -r nome; do echo \\\"- $nome\\\"; done\",\"syntax.until\":\"until comandi; do comandi; done: ripete finché i comandi non riescono.\",\"syntax.case\":\"case parola in modello|modello) comandi;; … esac\\nI modelli usano * ? [ ]. «;&» prosegue nel ramo dopo, «;;&» prova anche i modelli successivi.\\n  case \\\"$f\\\" in *.txt) echo testo;; *.png|*.jpg) echo immagine;; *) echo altro;; esac\",\"syntax.function\":\"nome() { comandi; }   oppure   function nome { comandi; }\\nGli argomenti sono $1, $2…, $@; «local» crea variabili della funzione, «return n» esce.\\n  saluta() { echo \\\"Ciao, $1\\\"; }; saluta Eugenio\",\"syntax.cond\":\"[[ espressione ]]: test senza divisione in parole né espansione di *.\\n  [[ $nome == *.txt ]]      confronto con un modello\\n  [[ $s =~ ^[0-9]+$ ]]      espressione regolare (gruppi in BASH_REMATCH)\\n  [[ -d dir && ! -e file ]] -e -f -d -s -z -n, && || ! ( )\",\"syntax.arith\":\"(( espressione )): aritmetica intera; stato 0 se il risultato non è 0.\\n  (( n++ )); (( n > 3 )) && echo grande; echo $(( 2 ** 10 ))\",\"syntax.variables\":\"nome=valore (senza spazi), $nome o ${nome}. Array: a=(x y z), ${a[0]}, ${a[@]}, ${#a[@]}.\\n${v:-predefinito} ${v:=predefinito} ${v:+alt} ${#v} ${v#prefisso} ${v%suffisso} ${v/da/a} ${v//da/a} ${v:inizio:lunghezza} ${v^^} ${v,,}\\nSpeciali: $? stato dell’ultimo comando, $$ la shell, $! l’ultimo comando in background, $# $@ $* gli argomenti.\",\"syntax.redirections\":\"> file (sovrascrive), >> file (aggiunge), < file (legge), 2> errori, 2>&1, &> file, <<EOF … EOF, <<< testo, | pipe.\\n/dev/null scarta tutto.\",\"files.cannotAccess\":\"impossibile accedere a «{path}»: file o cartella inesistente\",\"files.cannotCreate\":\"impossibile creare «{path}»: file o cartella inesistente\",\"files.overwriteFolder\":\"impossibile sovrascrivere la cartella «{name}» con un file\",\"files.missingDestination\":\"manca la destinazione dopo «{path}»\",\"files.targetNotFolder\":\"la destinazione «{path}» non è una cartella\",\"files.cannotStat\":\"impossibile fare stat di «{path}»: file o cartella inesistente\",\"files.cannotRemove\":\"impossibile rimuovere «{path}»: {reason}\",\"files.quotedNoSuchFile\":\"«{path}»: file o cartella inesistente\",\"mkdir.notAFolder\":\"impossibile creare la cartella «{path}»: «{name}» esiste e non è una cartella\",\"mkdir.exists\":\"impossibile creare la cartella «{path}»: il file esiste\",\"mkdir.noParent\":\"impossibile creare la cartella «{path}»: file o cartella inesistente\",\"mkdir.created\":\"creata la cartella «{path}»\",\"cp.overwriteFile\":\"impossibile sovrascrivere «{name}», che non è una cartella, con una cartella\",\"cp.verbose\":\"«{from}» -> «{to}»\",\"cp.omitting\":\"-r non specificato; si omette la cartella «{path}»\",\"cp.intoItself\":\"impossibile copiare la cartella «{path}» dentro se stessa\",\"mv.system\":\"impossibile spostare «{path}»: è una cartella di sistema\",\"mv.intoItself\":\"impossibile spostare «{path}» in una sua sottocartella\",\"mv.notEmpty\":\"impossibile spostare «{path}» su «{name}»: la cartella non è vuota\",\"mv.verbose\":\"rinominato «{from}» -> «{to}»\",\"reason.noSuchFile\":\"file o cartella inesistente\",\"reason.isADirectory\":\"è una cartella\",\"reason.notADirectory\":\"non è una cartella\",\"reason.notEmpty\":\"la cartella non è vuota\",\"reason.system\":\"è una cartella di sistema\",\"reason.containsSystem\":\"contiene cartelle di sistema\",\"rm.home\":\"è pericoloso agire su «{path}»: è la home\",\"rm.purged\":\"eliminato definitivamente «{path}»\",\"rm.trashed\":\"spostato nel cestino «{path}»\",\"rmdir.removed\":\"rimossa la cartella «{path}»\",\"stat.folder\":\"cartella\",\"stat.appLink\":\"collegamento all’app {app}\",\"stat.file\":\"file\",\"stat.emptyFile\":\"file vuoto\",\"stat.type\":\"Tipo: {type}\",\"stat.path\":\"Percorso: {path}\",\"stat.items\":\"Elementi: {n} ({total} in tutto)\",\"stat.size\":\"Dimensione: {size} byte ({human})\",\"stat.created\":\"Creato: {date}\",\"stat.modified\":\"Modificato: {date}\",\"stat.tags\":\"Tag: {tags}\",\"stat.system\":\"Cartella di sistema\",\"find.missingArgument\":\"manca l’argomento di «{name}»\",\"find.badType\":\"tipo sconosciuto per -type: «{type}» (f, d o l)\",\"find.badSize\":\"dimensione non valida: «{value}»\",\"find.badValue\":\"valore non valido per {option}: «{value}»\",\"find.cannotFind\":\"impossibile trovare «{path}»\",\"find.execEnd\":\"manca la fine di «-exec» («;» o «+»)\",\"find.execCommand\":\"manca il comando di «-exec»\",\"find.unknownPredicate\":\"predicato sconosciuto: «{name}»\",\"find.unexpected\":\"argomento inatteso: «{arg}»\",\"tree.folders\":{\"one\":\"{n} cartella\",\"other\":\"{n} cartelle\"},\"tree.files\":{\"one\":\"{n} file\",\"other\":\"{n} file\"},\"ls.date\":\"{day} {month}\",\"wc.total\":\"totale\",\"grep.noPattern\":\"manca il modello da cercare\\nUso: grep [opzioni] modello [file…]\",\"sort.badKey\":\"chiave non valida: «{key}»\",\"sort.disorder\":\"-:{n}: disordine: {line}\",\"cut.badList\":\"elenco non valido: «{spec}»\",\"cut.noList\":\"indicare un elenco di campi (-f) o di caratteri (-c)\",\"cut.badDelimiter\":\"il delimitatore deve essere un solo carattere\",\"tr.reverseRange\":\"intervallo al contrario: «{range}»\",\"tr.missingSet2\":\"manca il secondo insieme dopo «{set}»\",\"seq.badArgument\":\"argomento non valido: «{value}»\",\"seq.zeroStep\":\"il passo non può essere 0\",\"xargs.unmatchedDouble\":\"virgolette doppie non chiuse\",\"xargs.unmatchedSingle\":\"virgolette singole non chiuse\",\"xargs.badCount\":\"il numero di argomenti deve essere almeno 1\",\"sed.at\":\"-e espressione #1, carattere {pos}: {message}\",\"sed.unterminated\":\"comando «s» non terminato\",\"sed.badAddress\":\"indirizzo non valido\",\"sed.missingAddress\":\"manca il secondo indirizzo\",\"sed.missingCommand\":\"manca il comando\",\"sed.unexpectedBrace\":\"«}» inatteso\",\"sed.badDelimiter\":\"delimitatore non valido per «s»\",\"sed.yLengths\":\"le stringhe di «y» hanno lunghezze diverse\",\"sed.noLabel\":\"«:» senza etichetta\",\"sed.unknownCommand\":\"comando sconosciuto: «{cmd}»\",\"sed.unmatchedBrace\":\"manca «}»\",\"sed.noSuchLabel\":\"etichetta inesistente per un salto: «{label}»\",\"sed.noPreviousRegex\":\"nessuna espressione regolare precedente\",\"sed.cannotRead\":\"impossibile leggere {path}: file o cartella inesistente\",\"sed.noScript\":\"manca lo script\\nUso: sed [-n] [-E] [-i] script [file…]\",\"sed.noFiles\":\"nessun file da modificare con -i\",\"diff.missingOperand\":\"manca un operando dopo «{arg}»\",\"diff.extraOperand\":\"operando in più: «{arg}»\",\"diff.identical\":\"I file {a} e {b} sono identici\",\"diff.differ\":\"I file {a} e {b} sono diversi\",\"diff.tooBig\":\"i file sono troppo diversi e troppo grandi da confrontare\",\"open.noApp\":\"app non trovata: «{app}» (vedi «apps»)\",\"trash.notInTrash\":\"«{name}» non è nel cestino\",\"trash.empty\":\"Il cestino è vuoto.\",\"trash.deletedFolder\":\"(cartella eliminata)\",\"trash.items\":{\"one\":\"{n} elemento\",\"other\":\"{n} elementi\"},\"trash.missingPut\":\"manca cosa mettere nel cestino\",\"trash.cannotTrash\":\"{path}: non si può cestinare (cartella di sistema)\",\"trash.missingRestore\":\"manca il nome di ciò che va rimesso a posto\",\"trash.restored\":\"rimesso in {path}\",\"trash.missingName\":\"manca il nome\",\"trash.purged\":{\"one\":\"eliminato definitivamente {n} elemento\",\"other\":\"eliminati definitivamente {n} elementi\"},\"trash.emptied\":{\"one\":\"Cestino svuotato ({n} elemento).\",\"other\":\"Cestino svuotato ({n} elementi).\"},\"trash.alreadyEmpty\":\"Il cestino era già vuoto.\",\"tag.noSuchTag\":\"tag inesistente: «{name}» (vedi «tag ls»)\",\"tag.none\":\"Nessun tag. Creane uno con «tag new nome».\",\"tag.hidden\":\"nascosto\",\"tag.noTags\":\"nessun tag\",\"tag.usageAddRm\":\"tag {sub} nome file…\",\"tag.created\":\"creato il tag «{name}»\",\"tag.system\":\"{path}: gli elementi di sistema non hanno tag\",\"tag.usageNew\":\"tag new nome [colore]\",\"tag.createdShown\":\"creato il tag {tag}\",\"tag.usageDelete\":\"tag delete nome…\",\"date.formatC\":\"%a %e %b %Y, %H:%M:%S\",\"date.formatX\":\"%d/%m/%Y\",\"date.format\":\"%a %e %b %Y, %H:%M:%S %Z\",\"date.invalid\":\"data non valida: «{date}»\"}}")
}), { t: w } = C, ee = [
	"&>>",
	"<<<",
	"<<-",
	";;&",
	"&&",
	"||",
	";;",
	";&",
	"|&",
	"<<",
	">>",
	"<&",
	">&",
	"<>",
	">|",
	"&>",
	"|",
	"&",
	";",
	"<",
	">",
	"(",
	")"
], te = /* @__PURE__ */ new Set([
	"|",
	"&",
	";",
	"<",
	">",
	"(",
	")"
]), ne = [
	"then",
	"else",
	"elif",
	"fi",
	"do",
	"done",
	"esac",
	"}"
], re = /* @__PURE__ */ new Set([
	")",
	";;",
	";&",
	";;&"
]), ie = /* @__PURE__ */ new Set([
	"export",
	"local",
	"declare",
	"typeset",
	"readonly"
]), ae = [
	"==",
	"!=",
	"=~",
	"=",
	"<",
	">",
	"-eq",
	"-ne",
	"-lt",
	"-le",
	"-gt",
	"-ge",
	"-nt",
	"-ot",
	"-ef"
], oe = /^([A-Za-z_]\w*)(?:\[([^\]]*)\])?(\+?)=/, se = /(\d+)?(&>>|<<<|<<-|<<|>>|<&|>&|<>|>\||&>|<|>)/y, ce = 100, T = (e) => e === " " || e === "	" || e === "\r", le = (e) => e === void 0 || T(e) || e === "\n" || te.has(e), ue = (e) => T(e) || e === "\n" || te.has(e);
function de(e, { aliases: t = null } = {}) {
	return new me(e, t).program();
}
function* fe(e, { aliases: t = null } = {}) {
	yield* new me(e, t).lines();
}
function pe(e) {
	return { parts: new me(String(e), null).readParts({ stop: () => !1 }) };
}
var me = class e {
	heredocs = [];
	aliasActive = /* @__PURE__ */ new Set();
	aliasCount = 0;
	constructor(e, t) {
		this.src = String(e), this.pos = 0, this.aliases = t;
	}
	get ch() {
		return this.src[this.pos];
	}
	get eof() {
		return this.pos >= this.src.length;
	}
	starts(e) {
		return this.src.startsWith(e, this.pos);
	}
	fail(e) {
		throw this.eof ? new v(e) : new y(e);
	}
	near() {
		return this.eof ? w("parse.nearEnd") : this.ch === "\n" ? w("parse.nearNewline") : w("parse.nearToken", { token: this.peekOp() ?? this.src.slice(this.pos).match(/^\S{1,20}/)?.[0] ?? this.ch });
	}
	skipBlanks() {
		for (;;) {
			let e = this.ch;
			if (T(e)) this.pos++;
			else if (e === "\\" && this.src[this.pos + 1] === "\n") this.pos += 2;
			else if (e === "\\" && this.pos === this.src.length - 1) throw new v();
			else if (e === "#") {
				let e = this.src.indexOf("\n", this.pos);
				this.pos = e < 0 ? this.src.length : e;
			} else return;
		}
	}
	newline() {
		if (this.ch !== "\n") return !1;
		this.pos++;
		for (let e of this.heredocs.splice(0)) this.readHeredoc(e);
		return !0;
	}
	linebreak() {
		for (this.skipBlanks(); this.newline();) this.skipBlanks();
	}
	peekOp() {
		return ee.find((e) => this.starts(e)) ?? null;
	}
	atKeyword(e) {
		if (!this.starts(e)) return !1;
		let t = this.src[this.pos + e.length];
		return e === "{" || e === "!" || e === "[[" ? t === void 0 || T(t) || t === "\n" : le(t);
	}
	keyword(e) {
		this.linebreak(), this.atKeyword(e) || this.fail(w("parse.nearExpected", {
			near: this.near(),
			expected: e
		})), this.pos += e.length;
	}
	atTerminator() {
		if (this.eof) return !0;
		let e = this.peekOp();
		return e && re.has(e) ? !0 : ne.some((e) => this.atKeyword(e));
	}
	program() {
		let e = this.list();
		if (this.linebreak(), !this.eof) throw new y(w("parse.near", { near: this.near() }));
		if (this.heredocs.length) throw new v();
		return e;
	}
	*lines() {
		for (;;) {
			if (this.linebreak(), this.eof) {
				if (this.heredocs.length) throw new v();
				return;
			}
			let e = [];
			for (;;) {
				if (this.atTerminator()) throw new y(w("parse.near", { near: this.near() }));
				let t = this.pos, n = this.andOr(), r = this.src.slice(t, this.pos).trim();
				this.skipBlanks();
				let i = this.peekOp();
				if (i === "&" || i === ";") {
					if (this.pos++, e.push({
						node: n,
						async: i === "&",
						text: r
					}), this.skipBlanks(), this.eof || this.newline()) break;
				} else {
					if (e.push({
						node: n,
						async: !1,
						text: r
					}), this.eof || this.newline()) break;
					throw new y(w("parse.near", { near: this.near() }));
				}
			}
			yield {
				type: "list",
				items: e
			};
		}
	}
	list() {
		let e = [];
		for (this.linebreak(); !this.atTerminator();) {
			let t = this.pos, n = this.andOr(), r = this.src.slice(t, this.pos).trim();
			this.skipBlanks();
			let i = this.peekOp();
			if (i === "&" || i === ";") this.pos++, e.push({
				node: n,
				async: i === "&",
				text: r
			});
			else if (this.newline()) e.push({
				node: n,
				async: !1,
				text: r
			});
			else {
				if (e.push({
					node: n,
					async: !1,
					text: r
				}), this.linebreak(), !this.atTerminator()) throw new y(w("parse.near", { near: this.near() }));
				break;
			}
			this.linebreak();
		}
		return {
			type: "list",
			items: e
		};
	}
	andOr() {
		let e = this.pipeline(), t = [];
		for (;;) {
			this.skipBlanks();
			let e = this.peekOp();
			if (e !== "&&" && e !== "||") break;
			if (this.pos += 2, this.linebreak(), this.eof) throw new v();
			t.push({
				op: e,
				node: this.pipeline()
			});
		}
		return t.length ? {
			type: "andor",
			first: e,
			rest: t
		} : e;
	}
	pipeline() {
		this.skipBlanks();
		let e = !1;
		for (; this.atKeyword("!");) this.pos++, e = !e, this.skipBlanks();
		let t = [this.command()], n = [];
		for (;;) {
			this.skipBlanks();
			let e = this.peekOp();
			if (e !== "|" && e !== "|&") break;
			if (this.pos += e.length, n.push(e === "|&"), this.linebreak(), this.eof) throw new v();
			t.push(this.command());
		}
		return t.length === 1 && !e ? t[0] : {
			type: "pipeline",
			negate: e,
			cmds: t,
			both: n
		};
	}
	command() {
		if (this.skipBlanks(), this.eof) throw new v();
		let e = this.pos, t;
		if (this.starts("((") && (t = this.arithCommand())) return this.redirects(t);
		let n = this.peekOp();
		if (n === "(") {
			this.pos++;
			let e = this.list();
			return this.linebreak(), this.ch !== ")" && this.fail(w("parse.nearExpected", {
				near: this.near(),
				expected: ")"
			})), this.pos++, this.redirects({
				type: "subshell",
				body: e
			});
		}
		if (n && !n.startsWith("<") && !n.startsWith(">") && n !== "&>" && n !== "&>>") throw new y(w("parse.near", { near: w("parse.nearToken", { token: n }) }));
		if (this.atKeyword("if")) return this.redirects(this.ifClause());
		if (this.atKeyword("while")) return this.redirects(this.whileClause(!1));
		if (this.atKeyword("until")) return this.redirects(this.whileClause(!0));
		if (this.atKeyword("for")) return this.redirects(this.forClause());
		if (this.atKeyword("case")) return this.redirects(this.caseClause());
		if (this.atKeyword("{")) {
			this.pos++;
			let e = this.list();
			return this.keyword("}"), this.redirects({
				type: "group",
				body: e
			});
		}
		if (this.atKeyword("[[")) return this.redirects(this.condCommand());
		if (this.atKeyword("function")) {
			this.pos += 8, this.skipBlanks();
			let t = /[A-Za-z_][\w.:-]*/y;
			t.lastIndex = this.pos;
			let n = t.exec(this.src)?.[0];
			return n || this.fail(w("parse.badFunctionName")), this.pos += n.length, this.skipBlanks(), this.starts("(") && (this.pos++, this.skipBlanks(), this.ch !== ")" && this.fail(w("parse.parenAfterName")), this.pos++), this.funcBody(n, e);
		}
		let r = /([A-Za-z_][\w.:-]*)[ \t]*\([ \t]*\)/y;
		r.lastIndex = this.pos;
		let i = r.exec(this.src);
		if (i) return this.pos += i[0].length, this.funcBody(i[1], e);
		if (ne.some((e) => this.atKeyword(e))) throw new y(w("parse.near", { near: this.near() }));
		return this.simple();
	}
	funcBody(e, t) {
		if (this.linebreak(), this.eof) throw new v();
		return {
			type: "func",
			name: e,
			body: this.command(),
			text: this.src.slice(t, this.pos).trim()
		};
	}
	redirects(e) {
		for (e.redirs ??= [];;) if (this.skipBlanks(), !this.redirect(e.redirs)) return e;
	}
	simple() {
		let e = {
			type: "simple",
			assigns: [],
			words: [],
			redirs: []
		}, t = !1;
		for (; this.skipBlanks(), !(this.eof || this.ch === "\n");) {
			if (this.redirect(e.redirs)) continue;
			if (this.peekOp()) break;
			if (!e.words.length && this.aliases?.size && this.expandAlias()) continue;
			let n = this.pos, r = this.word();
			if (!r) break;
			let i = this.src.slice(n, this.pos), a = oe.exec(i);
			if (a && !e.words.length) e.assigns.push(this.assignment(n, a));
			else if (a && t && this.ch === "(" && i.endsWith("=")) {
				let { array: t } = this.assignment(n, a);
				e.words.push({
					parts: [{
						type: "lit",
						value: i
					}],
					declArray: {
						name: a[1],
						append: a[3] === "+",
						words: t
					}
				});
			} else a && t && (r.noSplit = !0), e.words.push(r), e.words.length === 1 && (t = r.parts.length === 1 && r.parts[0].type === "lit" && ie.has(r.parts[0].value));
		}
		if (this.aliasActive.clear(), !e.words.length && !e.assigns.length && !e.redirs.length) throw new y(w("parse.near", { near: this.near() }));
		return e;
	}
	assignment(e, t) {
		this.pos = e + t[0].length;
		let n = {
			name: t[1],
			index: t[2] ?? null,
			append: t[3] === "+",
			value: null,
			array: null
		};
		if (this.ch === "(" && n.index == null) for (this.pos++, n.array = [];;) {
			if (this.linebreak(), this.eof) throw new v();
			if (this.ch === ")") {
				this.pos++;
				break;
			}
			let e = this.word();
			if (!e) throw new y(w("parse.near", { near: this.near() }));
			n.array.push(e);
		}
		else n.value = this.word() ?? { parts: [] };
		return n;
	}
	expandAlias() {
		let e = /[^\s|&;<>()'"\\$`]+/y;
		e.lastIndex = this.pos;
		let t = e.exec(this.src)?.[0];
		if (!t || !le(this.src[this.pos + t.length])) return !1;
		let n = this.aliases.get(t);
		if (n == null || this.aliasActive.has(t)) return !1;
		if (++this.aliasCount > ce) throw new y(w("parse.aliasLoop"));
		return this.aliasActive.add(t), this.src = this.src.slice(0, this.pos) + n + this.src.slice(this.pos + t.length), !0;
	}
	redirect(e) {
		se.lastIndex = this.pos;
		let t = se.exec(this.src);
		if (!t) return !1;
		this.pos += t[0].length;
		let n = t[2], r = t[1] == null ? null : Number(t[1]);
		this.skipBlanks();
		let i = this.pos, a = this.word();
		a || this.fail(w("parse.missingTarget", {
			near: this.near(),
			op: n
		}));
		let o = {
			fd: r,
			op: n,
			target: a
		};
		if (n === "<<" || n === "<<-") {
			let e = this.src.slice(i, this.pos);
			o.heredoc = {
				delim: e.replace(/['"\\]/g, ""),
				quoted: /['"\\]/.test(e),
				strip: n === "<<-",
				body: null
			}, this.heredocs.push(o);
		}
		return e.push(o), !0;
	}
	readHeredoc(t) {
		let { delim: n, strip: r, quoted: i } = t.heredoc, a = "";
		for (;;) {
			if (this.eof) throw new v();
			let e = this.src.indexOf("\n", this.pos), t = this.src.slice(this.pos, e < 0 ? this.src.length : e);
			if (this.pos = e < 0 ? this.src.length : e + 1, r && (t = t.replace(/^\t+/, "")), t.replace(/\r$/, "") === n) break;
			a += t + "\n";
		}
		t.heredoc.body = i ? { parts: [{
			type: "sq",
			value: a
		}] } : { parts: [{
			type: "dq",
			parts: new e(a, null).readParts({ heredoc: !0 })
		}] };
	}
	ifClause() {
		this.pos += 2;
		let e = [], t = null, n = this.list();
		for (this.keyword("then"), e.push({
			cond: n,
			body: this.list()
		});;) if (this.linebreak(), this.atKeyword("elif")) this.pos += 4, n = this.list(), this.keyword("then"), e.push({
			cond: n,
			body: this.list()
		});
		else if (this.atKeyword("else")) {
			this.pos += 4, t = this.list(), this.keyword("fi");
			break;
		} else {
			this.keyword("fi");
			break;
		}
		return {
			type: "if",
			clauses: e,
			otherwise: t
		};
	}
	whileClause(e) {
		this.pos += 5;
		let t = this.list();
		this.keyword("do");
		let n = this.list();
		return this.keyword("done"), {
			type: "while",
			until: e,
			cond: t,
			body: n
		};
	}
	forClause() {
		if (this.pos += 3, this.skipBlanks(), this.starts("((")) {
			this.pos += 2;
			let [e = "", t = "", n = ""] = this.rawUntilDoubleParen().split(";");
			this.skipBlanks(), this.ch === ";" && this.pos++, this.keyword("do");
			let r = this.list();
			return this.keyword("done"), {
				type: "cfor",
				init: pe(e),
				cond: pe(t),
				step: pe(n),
				body: r
			};
		}
		let e = /[A-Za-z_]\w*/y;
		e.lastIndex = this.pos;
		let t = e.exec(this.src)?.[0];
		t && le(this.src[this.pos + t.length]) || this.fail(w("parse.forBadName")), this.pos += t.length;
		let n = null;
		if (this.linebreak(), this.atKeyword("in")) for (this.pos += 2, n = [];;) {
			if (this.skipBlanks(), this.eof) throw new v();
			if (this.ch === ";" || this.ch === "\n") break;
			let e = this.word();
			if (!e) throw new y(w("parse.near", { near: this.near() }));
			n.push(e);
		}
		this.skipBlanks(), this.ch === ";" && this.pos++, this.keyword("do");
		let r = this.list();
		return this.keyword("done"), {
			type: "for",
			name: t,
			words: n,
			body: r
		};
	}
	rawUntilDoubleParen() {
		let e = 0, t = this.pos;
		for (; !this.eof; this.pos++) {
			let n = this.ch;
			if (n === "(") e++;
			else if (n === ")") {
				if (e === 0 && this.src[this.pos + 1] === ")") {
					let e = this.src.slice(t, this.pos);
					return this.pos += 2, e;
				}
				e--;
			}
		}
		throw new v();
	}
	caseClause() {
		this.pos += 4, this.skipBlanks();
		let e = this.word();
		e || this.fail(w("parse.caseNoWord")), this.keyword("in");
		let t = [];
		for (;;) {
			if (this.linebreak(), this.eof) throw new v();
			if (this.atKeyword("esac")) {
				this.pos += 4;
				break;
			}
			this.ch === "(" && this.pos++;
			let e = [];
			for (;;) {
				this.skipBlanks();
				let t = this.word();
				if (t || this.fail(w("parse.near", { near: this.near() })), e.push(t), this.skipBlanks(), this.ch !== "|") break;
				this.pos++;
			}
			this.ch !== ")" && this.fail(w("parse.nearExpected", {
				near: this.near(),
				expected: ")"
			})), this.pos++;
			let n = this.list();
			this.skipBlanks();
			let r = this.peekOp(), i = ";;";
			r === ";;" || r === ";&" || r === ";;&" ? (this.pos += r.length, i = r) : (this.linebreak(), this.atKeyword("esac") || this.fail(w("parse.nearExpected", {
				near: this.near(),
				expected: ";;"
			}))), t.push({
				patterns: e,
				body: n,
				term: i
			});
		}
		return {
			type: "case",
			word: e,
			items: t
		};
	}
	arithCommand() {
		let e = this.pos;
		this.pos += 2;
		try {
			return {
				type: "arithcmd",
				word: pe(this.rawUntilDoubleParen())
			};
		} catch (t) {
			if (!(t instanceof v) || (this.pos = e, !this.src.includes(")", e))) throw t;
			return null;
		}
	}
	condCommand() {
		this.pos += 2;
		let e = this.condOr();
		return this.linebreak(), this.starts("]]") || this.fail(w("parse.condNear", { near: this.near() })), this.pos += 2, {
			type: "cond",
			expr: e
		};
	}
	condOr() {
		let e = this.condAnd();
		for (;;) {
			if (this.linebreak(), !this.starts("||")) return e;
			this.pos += 2, e = {
				op: "||",
				left: e,
				right: this.condAnd()
			};
		}
	}
	condAnd() {
		let e = this.condNot();
		for (;;) {
			if (this.linebreak(), !this.starts("&&")) return e;
			this.pos += 2, e = {
				op: "&&",
				left: e,
				right: this.condNot()
			};
		}
	}
	condNot() {
		return this.linebreak(), this.atKeyword("!") ? (this.pos++, {
			op: "!",
			expr: this.condNot()
		}) : this.condPrimary();
	}
	condPrimary() {
		if (this.linebreak(), this.eof) throw new v();
		if (this.ch === "(") {
			this.pos++;
			let e = this.condOr();
			return this.linebreak(), this.ch !== ")" && this.fail(w("parse.condNear", { near: this.near() })), this.pos++, e;
		}
		let e = /-[a-zA-Z](?=[ \t])/y;
		e.lastIndex = this.pos;
		let t = e.exec(this.src);
		if (t) return this.pos += 2, this.skipBlanks(), {
			op: "unary",
			flag: t[0],
			arg: this.condWord()
		};
		let n = this.condWord();
		this.skipBlanks();
		let r = ae.find((e) => this.starts(e) && (e[0] !== "-" || le(this.src[this.pos + e.length])));
		return r ? (this.pos += r.length, this.skipBlanks(), {
			op: "binary",
			bop: r,
			left: n,
			right: r === "=~" ? this.regexWord() : this.condWord()
		}) : {
			op: "word",
			word: n
		};
	}
	condWord() {
		this.starts("]]") && this.fail(w("parse.condNoOperand"));
		let e = this.word();
		return e || this.fail(w("parse.condNear", { near: this.near() })), e;
	}
	regexWord() {
		let e = 0, t = this.readParts({ stop: (t) => {
			if (t === "(") e++;
			else if (t === ")") {
				if (e === 0) return !0;
				e--;
			}
			return e === 0 && (T(t) || t === "\n" || t === ";" || t === "&");
		} });
		return t.length || this.fail(w("parse.condNoRegex")), { parts: t };
	}
	word() {
		let e = this.readParts({ stop: ue });
		return e.length ? { parts: e } : null;
	}
	readParts({ stop: e = ue, dq: t = !1, heredoc: n = !1 } = {}) {
		let r = [], i = "", a = () => {
			i && r.push({
				type: "lit",
				value: i
			}), i = "";
		}, o = !t && !n;
		for (; !this.eof;) {
			let s = this.ch;
			if (t && s === "\"" || o && e(s)) break;
			if (s === "\\") {
				let e = this.src[this.pos + 1];
				if (e === void 0) {
					if (n) {
						i += s, this.pos++;
						continue;
					}
					throw new v();
				}
				if (e === "\n") {
					this.pos += 2;
					continue;
				}
				if (!o) {
					"$`\\".includes(e) || t && e === "\"" ? (i += e, this.pos += 2) : (i += s, this.pos++);
					continue;
				}
				a(), r.push({
					type: "sq",
					value: e
				}), this.pos += 2;
			} else if (o && s === "'") {
				let e = this.src.indexOf("'", this.pos + 1);
				if (e < 0) throw new v();
				a(), r.push({
					type: "sq",
					value: this.src.slice(this.pos + 1, e)
				}), this.pos = e + 1;
			} else if (o && s === "\"") {
				a(), this.pos++;
				let e = this.readParts({ dq: !0 });
				if (this.ch !== "\"") throw new v();
				this.pos++, r.push({
					type: "dq",
					parts: e
				});
			} else if (s === "`") a(), r.push(this.backtick(t));
			else {
				if (s === "$") {
					let e = this.src[this.pos + 1];
					if (o && e === "'") {
						a(), r.push({
							type: "sq",
							value: this.ansiC()
						});
						continue;
					}
					if (o && e === "\"") {
						this.pos++;
						continue;
					}
					let t = this.dollar();
					if (t) {
						a(), r.push(t);
						continue;
					}
				}
				i += s, this.pos++;
			}
		}
		return a(), r;
	}
	dollar() {
		let e = this.src[this.pos + 1];
		if (e === "(" && this.src[this.pos + 2] === "(") {
			let e = this.pos;
			this.pos += 3;
			let t = 0, n = this.readParts({ stop: (e) => {
				if (e === "(") t++;
				else if (e === ")") {
					if (t === 0) return !0;
					t--;
				}
				return !1;
			} });
			if (this.starts("))")) return this.pos += 2, {
				type: "arith",
				word: { parts: n }
			};
			if (this.eof) throw new v();
			this.pos = e;
		}
		if (e === "(") {
			this.pos += 2;
			let e = this.list();
			if (this.linebreak(), this.eof) throw new v();
			if (this.ch !== ")") throw new y(w("parse.nearExpected", {
				near: this.near(),
				expected: ")"
			}));
			return this.pos++, {
				type: "cmdsub",
				body: e
			};
		}
		if (e === "{") return this.paramBrace();
		let t = /[A-Za-z_]\w*|[@*#?$!\-0-9]/y;
		t.lastIndex = this.pos + 1;
		let n = t.exec(this.src)?.[0];
		return n ? (this.pos += 1 + n.length, {
			type: "param",
			name: n
		}) : null;
	}
	paramBrace() {
		this.pos += 2;
		let e = {
			type: "param",
			name: ""
		};
		this.ch === "#" && this.src[this.pos + 1] !== "}" ? (e.length = !0, this.pos++) : this.ch === "!" && this.src[this.pos + 1] !== "}" && (e.indirect = !0, this.pos++);
		let t = /[A-Za-z_]\w*|[0-9]+|[@*#?$!\-]/y;
		t.lastIndex = this.pos;
		let n = t.exec(this.src)?.[0];
		if (n || this.fail(w("parse.badSubstitution")), e.name = n, this.pos += n.length, this.ch === "[") {
			let t = this.src.indexOf("]", this.pos);
			if (t < 0) throw new v();
			e.index = this.src.slice(this.pos + 1, t), this.pos = t + 1;
		}
		let r = this.ch;
		if (r === "}" || e.length) return this.ch !== "}" && this.fail(w("parse.badSubstitution")), this.pos++, e;
		if (r === ":") {
			let t = this.src[this.pos + 1];
			"-=?+".includes(t) && t ? (e.op = ":" + t, this.pos += 2, e.arg = this.braceWord("}")) : (e.op = "substr", this.pos++, e.offset = this.braceWord(":}"), this.ch === ":" && (this.pos++, e.count = this.braceWord("}")));
		} else "-=?+".includes(r) ? (e.op = r, this.pos++, e.arg = this.braceWord("}")) : r === "#" || r === "%" || r === "^" || r === "," ? (e.op = this.src[this.pos + 1] === r ? r + r : r, this.pos += e.op.length, e.arg = this.braceWord("}")) : r === "/" ? (this.pos++, e.op = "/", "/#%".includes(this.ch) && (e.op += this.ch, this.pos++), e.arg = this.braceWord("/}"), this.ch === "/" ? (this.pos++, e.replace = this.braceWord("}")) : e.replace = { parts: [] }) : this.fail(w("parse.badSubstitution"));
		return this.ch !== "}" && this.fail(w("parse.badSubstitutionBrace")), this.pos++, e;
	}
	braceWord(e) {
		let t = 0, n = this.readParts({ stop: (n) => {
			if (n === "{") t++;
			else if (n === "}" && t > 0) return t--, !1;
			return t === 0 && e.includes(n);
		} });
		if (this.eof) throw new v();
		return { parts: n };
	}
	backtick(t) {
		let n = "";
		for (this.pos++;;) {
			if (this.eof) throw new v();
			let e = this.ch;
			if (e === "`") {
				this.pos++;
				break;
			}
			if (e === "\\") {
				let e = this.src[this.pos + 1];
				if (e === "\\" || e === "`" || e === "$" || t && e === "\"") {
					n += e, this.pos += 2;
					continue;
				}
			}
			n += e, this.pos++;
		}
		try {
			return {
				type: "cmdsub",
				body: new e(n, this.aliases).program()
			};
		} catch (e) {
			throw e instanceof v ? new y(w("parse.backquotes")) : e;
		}
	}
	ansiC() {
		this.pos += 2;
		let e = "", t = {
			n: "\n",
			t: "	",
			r: "\r",
			a: "\x07",
			b: "\b",
			e: "\x1B",
			E: "\x1B",
			f: "\f",
			v: "\v",
			"\\": "\\",
			"'": "'",
			"\"": "\"",
			"?": "?"
		};
		for (;;) {
			if (this.eof) throw new v();
			let n = this.ch;
			if (n === "'") return this.pos++, e;
			if (n !== "\\") {
				e += n, this.pos++;
				continue;
			}
			let r = this.src[this.pos + 1];
			if (r === void 0) throw new v();
			if (t[r] !== void 0) {
				e += t[r], this.pos += 2;
				continue;
			}
			let i, a = this.src.slice(this.pos + 1);
			if (i = /^x([0-9a-fA-F]{1,2})/.exec(a)) e += String.fromCharCode(parseInt(i[1], 16));
			else if ((i = /^u([0-9a-fA-F]{1,4})/.exec(a)) || (i = /^U([0-9a-fA-F]{1,8})/.exec(a))) e += String.fromCodePoint(Math.min(parseInt(i[1], 16), 1114111));
			else if (i = /^([0-7]{1,3})/.exec(a)) e += String.fromCharCode(parseInt(i[1], 8));
			else {
				e += "\\" + r, this.pos += 2;
				continue;
			}
			this.pos += 1 + i[0].length;
		}
	}
}, he = /* @__PURE__ */ "**=.<<=.>>=.**.<<.>>.<=.>=.==.!=.&&.||.++.--.+=.-=.*=./=.%=.&=.^=.|=.+.-.*./.%.<.>.=.!.~.&.^.|.?.:.(.).,".split("."), ge = /* @__PURE__ */ new Set([
	"=",
	"+=",
	"-=",
	"*=",
	"/=",
	"%=",
	"<<=",
	">>=",
	"&=",
	"^=",
	"|=",
	"**="
]), _e = [
	["||"],
	["&&"],
	["|"],
	["^"],
	["&"],
	["==", "!="],
	[
		"<",
		"<=",
		">",
		">="
	],
	["<<", ">>"],
	["+", "-"],
	[
		"*",
		"/",
		"%"
	]
], E = (e) => BigInt.asIntN(64, e), ve = 32;
function D(e, t, n = 0) {
	if (n > ve) throw new b(C.t("arith.tooDeep"));
	let r = ye(String(e));
	if (!r.length) return 0n;
	let i = {
		tokens: r,
		i: 0,
		text: e
	}, a = xe(i);
	if (i.i < r.length) throw O(i);
	return ke(a, t, n);
}
var O = (e) => new b(C.t("arith.syntax", {
	expr: String(e.text).trim(),
	token: e.tokens[e.i]?.v ?? C.t("arith.end")
}));
function ye(e) {
	let t = [], n = 0;
	for (; n < e.length;) {
		let r = e[n];
		if (/\s/.test(r)) {
			n++;
			continue;
		}
		let i, a = e.slice(n);
		if (i = /^(?:0[xX][0-9a-fA-F]+|\d+#[0-9a-zA-Z@_]+|\d+)/.exec(a)) {
			t.push({
				t: "num",
				v: i[0]
			}), n += i[0].length;
			continue;
		}
		if (i = /^[A-Za-z_]\w*/.exec(a)) {
			n += i[0].length;
			let r = null;
			if (e[n] === "[") {
				let t = 0, i = n;
				for (; i < e.length; i++) if (e[i] === "[") t++;
				else if (e[i] === "]" && --t === 0) break;
				if (i >= e.length) throw new b(C.t("arith.missingBracket", { expr: e.trim() }));
				r = e.slice(n + 1, i), n = i + 1;
			}
			t.push({
				t: "var",
				v: i[0],
				index: r
			});
			continue;
		}
		let o = he.find((t) => e.startsWith(t, n));
		if (!o) throw new b(C.t("arith.syntax", {
			expr: e.trim(),
			token: r
		}));
		t.push({
			t: "op",
			v: o
		}), n += o.length;
	}
	return t;
}
var be = (e) => e.tokens[e.i], k = (e, ...t) => be(e)?.t === "op" && t.includes(be(e).v), A = (e) => e.tokens[e.i++];
function xe(e) {
	let t = j(e);
	for (; k(e, ",");) A(e), t = {
		k: "comma",
		a: t,
		b: j(e)
	};
	return t;
}
function j(e) {
	let t = e.i, n = be(e);
	return n?.t === "var" && e.tokens[e.i + 1]?.t === "op" && ge.has(e.tokens[e.i + 1].v) ? (e.i += 2, {
		k: "assign",
		name: n.v,
		index: n.index,
		op: e.tokens[t + 1].v,
		value: j(e)
	}) : Se(e);
}
function Se(e) {
	let t = Ce(e, 0);
	if (!k(e, "?")) return t;
	A(e);
	let n = j(e);
	if (!k(e, ":")) throw O(e);
	return A(e), {
		k: "ternary",
		cond: t,
		yes: n,
		no: j(e)
	};
}
function Ce(e, t) {
	if (t >= _e.length) return we(e);
	let n = Ce(e, t + 1);
	for (; k(e, ..._e[t]);) n = {
		k: "bin",
		op: A(e).v,
		a: n,
		b: Ce(e, t + 1)
	};
	return n;
}
function we(e) {
	let t = Te(e);
	return k(e, "**") ? (A(e), {
		k: "bin",
		op: "**",
		a: t,
		b: we(e)
	}) : t;
}
function Te(e) {
	if (k(e, "!", "~", "+", "-")) return {
		k: "unary",
		op: A(e).v,
		a: Te(e)
	};
	if (k(e, "++", "--")) {
		let t = A(e).v, n = A(e);
		if (n?.t !== "var") throw O(e);
		return {
			k: "pre",
			op: t,
			name: n.v,
			index: n.index
		};
	}
	return Ee(e);
}
function Ee(e) {
	let t = A(e);
	if (!t) throw new b(C.t("arith.operandExpected", { expr: String(e.text).trim() }));
	if (t.t === "num") return {
		k: "num",
		v: t.v
	};
	if (t.t === "var") return k(e, "++", "--") ? {
		k: "post",
		op: A(e).v,
		name: t.v,
		index: t.index
	} : {
		k: "var",
		name: t.v,
		index: t.index
	};
	if (t.v === "(") {
		let t = xe(e);
		if (!k(e, ")")) throw O(e);
		return A(e), t;
	}
	throw e.i--, O(e);
}
function De(e) {
	let t = String(e);
	if (/^0[xX]/.test(t)) return BigInt(t);
	let n = /^(\d+)#(.+)$/.exec(t);
	if (n) {
		let e = Number(n[1]);
		if (e < 2 || e > 64) throw new b(C.t("arith.badBase", { value: t }));
		let r = 0n;
		for (let i of n[2]) {
			let n = /\d/.test(i) ? +i : /[a-z]/.test(i) ? i.charCodeAt(0) - 87 : /[A-Z]/.test(i) ? e <= 36 ? i.charCodeAt(0) - 55 : i.charCodeAt(0) - 29 : i === "@" ? 62 : 63;
			if (n >= e) throw new b(C.t("arith.tooGreatForBase", { value: t }));
			r = r * BigInt(e) + BigInt(n);
		}
		return E(r);
	}
	if (/^0[0-7]+$/.test(t)) return E(BigInt("0o" + t.slice(1)));
	if (/^0\d+$/.test(t)) throw new b(C.t("arith.tooGreatForBase", { value: t }));
	return E(BigInt(t));
}
function Oe(e, t, n, r) {
	let i = String(e.get(t, n == null ? null : String(D(n, e, r + 1))) ?? "").trim();
	return i ? /^-?\d+$/.test(i) ? E(BigInt(i)) : D(i, e, r + 1) : 0n;
}
function ke(e, t, n) {
	let r = (e) => ke(e, t, n), i = (e) => e.index == null ? null : String(D(e.index, t, n + 1));
	switch (e.k) {
		case "num": return De(e.v);
		case "var": return Oe(t, e.name, e.index, n);
		case "comma": return r(e.a), r(e.b);
		case "ternary": return r(e.cond) === 0n ? r(e.no) : r(e.yes);
		case "unary": {
			let t = r(e.a);
			return e.op === "!" ? t === 0n ? 1n : 0n : e.op === "~" ? E(~t) : e.op === "-" ? E(-t) : t;
		}
		case "pre":
		case "post": {
			let r = i(e), a = Oe(t, e.name, r ?? null, n), o = E(e.op === "++" ? a + 1n : a - 1n);
			return t.set(e.name, r, String(o)), e.k === "pre" ? o : a;
		}
		case "assign": {
			let a = i(e), o = r(e.value);
			return e.op !== "=" && (o = Ae(e.op.slice(0, -1), Oe(t, e.name, a, n), o)), t.set(e.name, a, String(o)), o;
		}
		case "bin": return e.op === "&&" ? r(e.a) !== 0n && r(e.b) !== 0n ? 1n : 0n : e.op === "||" ? r(e.a) !== 0n || r(e.b) !== 0n ? 1n : 0n : Ae(e.op, r(e.a), r(e.b));
	}
	throw new b(C.t("arith.invalid"));
}
function Ae(e, t, n) {
	switch (e) {
		case "+": return E(t + n);
		case "-": return E(t - n);
		case "*": return E(t * n);
		case "/":
		case "%":
			if (n === 0n) throw new b(C.t("arith.divisionByZero"));
			return E(e === "/" ? t / n : t % n);
		case "**":
			if (n < 0n) throw new b(C.t("arith.negativeExponent"));
			for (var r = 1n; n > 0n; n >>= 1n, t = E(t * t)) n & 1n && (r = E(r * t));
			return r;
		case "<<": return E(t << (n & 63n));
		case ">>": return E(t >> (n & 63n));
		case "&": return E(t & n);
		case "|": return E(t | n);
		case "^": return E(t ^ n);
		case "<": return t < n ? 1n : 0n;
		case "<=": return t <= n ? 1n : 0n;
		case ">": return t > n ? 1n : 0n;
		case ">=": return t >= n ? 1n : 0n;
		case "==": return t === n ? 1n : 0n;
		case "!=": return t === n ? 0n : 1n;
	}
	throw new b(C.t("arith.unknownOperator", { op: e }));
}
// src/terminal/shell/pattern.js
var je = {
	alpha: "a-zA-Z",
	digit: "0-9",
	alnum: "a-zA-Z0-9",
	upper: "A-Z",
	lower: "a-z",
	space: "\\s",
	blank: " \\t",
	punct: "!-\\/:-@\\[-`{-~",
	xdigit: "0-9A-Fa-f",
	word: "\\w",
	cntrl: "\\x00-\\x1f\\x7f",
	print: "\\x20-\\x7e",
	graph: "\\x21-\\x7e"
}, Me = /* @__PURE__ */ new Map(), Ne = (e) => String(e).replace(/[\\*?[\]]/g, "\\$&"), Pe = (e) => e.replace(/[.*+?^${}()|[\]\\/-]/g, "\\$&");
function Fe(e) {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (n === "\\") t++;
		else if (n === "*" || n === "?") return !0;
		else if (n === "[" && Ie(e, t) > 0) return !0;
	}
	return !1;
}
function Ie(e, t) {
	let n = t + 1;
	for ((e[n] === "!" || e[n] === "^") && n++, e[n] === "]" && n++; n < e.length; n++) if (e[n] === "\\") n++;
	else if (e[n] === "[" && e[n + 1] === ":") {
		let t = e.indexOf(":]", n + 2);
		t > 0 && (n = t + 1);
	} else if (e[n] === "]") return n;
	return -1;
}
function Le(e) {
	let t = "";
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === "\\") n + 1 < e.length ? t += Pe(e[++n]) : t += "\\\\";
		else if (r === "*") t += "[\\s\\S]*";
		else if (r === "?") t += "[\\s\\S]";
		else if (r === "[" && Ie(e, n) > 0) {
			let r = Ie(e, n), i = n + 1, a = "";
			for ((e[i] === "!" || e[i] === "^") && (a += "^", i++); i < r; i++) {
				let t = e[i];
				if (t === "[" && e[i + 1] === ":") {
					let t = e.indexOf(":]", i + 2), n = e.slice(i + 2, t);
					a += je[n] ?? "", i = t + 1;
				} else t === "\\" ? a += "\\" + (e[++i] ?? "\\") : t === "-" && i > n + 1 && i < r - 1 && a && a !== "^" ? a += "-" : a += /[\]\\^-]/.test(t) ? "\\" + t : t;
			}
			t += `[${a}]`, n = r;
		} else t += Pe(r);
	}
	return t;
}
function M(e, t, { ignoreCase: n = !1 } = {}) {
	let r = (n ? "i" : "s") + e, i = Me.get(r);
	return i || (i = RegExp(`^(?:${Le(e)})$`, n ? "i" : ""), Me.size > 500 && Me.clear(), Me.set(r, i)), i.test(t);
}
var Re = (e) => String(e).replace(/\\([\s\S])/g, "$1");
// src/terminal/shell/paths.js
function N(e, t) {
	t = String(t);
	let n = r.home, i;
	if (t === "~" || t.startsWith("~/")) i = t.slice(1);
	else if (t.startsWith("/")) {
		let e = t.toLowerCase(), r = n.toLowerCase();
		i = e === r || e.startsWith(r + "/") ? t.slice(n.length) : t;
	} else i = r.ancestors(e).slice(1).map((e) => e.name).join("/") + "/" + t;
	let a = [];
	for (let e of i.split("/")) e && e !== "." && (e === ".." ? a.pop() : a.push(e));
	return a;
}
function P(e, t) {
	return t === "" ? null : r.resolve("~/" + N(e, t).join("/"));
}
function ze(e, t) {
	let n = N(e, t), i = n.pop() ?? "";
	return {
		parent: r.resolve("~/" + n.join("/")),
		name: i
	};
}
function Be(e) {
	let t = r.ancestors(e).slice(1).map((e) => e.name);
	return t.length ? "~/" + t.join("/") : "~";
}
var Ve = (e, t) => e === "" ? t : e.endsWith("/") ? e + t : `${e}/${t}`;
function He(e, t) {
	let n = t.startsWith("/"), i = t.split("/"), a = [n ? "/" : ""];
	n && i.shift();
	let o = !1;
	return i.forEach((t) => {
		if (t === "") return;
		if (!Fe(t)) {
			a = a.map((e) => Ve(e, Re(t)));
			return;
		}
		o = !0;
		let n = [];
		for (let i of a) {
			let a = P(e, i || ".");
			a?.type === "folder" && r.children(a.id).map((e) => e.name).filter((e) => (!e.startsWith(".") || t.startsWith(".") || t.startsWith("\\.")) && M(t, e)).sort(F).forEach((e) => n.push(Ve(i, e)));
		}
		a = n;
	}), o ? (t.endsWith("/") && (a = a.filter((t) => P(e, t)?.type === "folder").map((e) => e + "/")), a.filter((t) => P(e, t))) : [];
}
var F = (e, t) => e.localeCompare(t), Ue = { brk: !0 }, We = 1e5;
async function Ge(e, t) {
	let n = [];
	for (let r of t) n.push(...await Ke(e, r));
	return n;
}
async function Ke(e, t, { split: n = !t.noSplit, braces: r = n } = {}) {
	let i = r ? Qe(t.parts) : [t.parts], a = [];
	for (let t of i) {
		let r = await R(e, nt(e, t), !1), i = n ? Ze(r, Je(e)) : [Xe(r)];
		for (let t of i) {
			if (n && !e.options.noglob) {
				let n = Ye(t);
				if (Fe(n)) {
					let t = He(e.cwd, n);
					if (t.length) {
						a.push(...t);
						continue;
					}
				}
			}
			a.push(t.map((e) => e.text).join(""));
		}
	}
	return a;
}
async function I(e, t) {
	return t ? Xe(await R(e, nt(e, t.parts), !1)).map((e) => e.text).join("") : "";
}
async function L(e, t) {
	return t ? Ye(Xe(await R(e, nt(e, t.parts), !1))) : "";
}
async function qe(e, t) {
	return Xe(await R(e, t.parts, !1)).map((e) => e.quoted ? e.text.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") : e.text).join("");
}
var Je = (e) => e.getVar("IFS") ?? " 	\n", Ye = (e) => e.map((e) => e.quoted ? Ne(e.text) : e.text).join("");
function Xe(e) {
	return e.map((e) => e.brk ? {
		text: " ",
		quoted: !0
	} : e);
}
function Ze(e, t) {
	let n = [], r = [], i = !1, a = () => {
		n.push(r), r = [], i = !1;
	};
	for (let n of e) {
		if (n.brk) {
			a();
			continue;
		}
		if (n.quoted || !n.split) {
			r.push(n), i ||= n.quoted || n.text.length > 0;
			continue;
		}
		let e = "";
		for (let o of n.text) t.includes(o) ? (e &&= (r.push({
			text: e,
			quoted: !1
		}), i = !0, ""), /\s/.test(o) ? i && a() : a()) : e += o;
		e && (r.push({
			text: e,
			quoted: !1
		}), i = !0);
	}
	return i && a(), n;
}
function Qe(e) {
	if (!e.some((e) => e.type === "lit" && e.value.includes("{"))) return [e];
	let t = e.flatMap((e) => e.type === "lit" ? [...e.value].map((e) => ({ c: e })) : [{ part: e }]), n = [];
	return $e(t, n), n.map(tt);
}
function $e(e, t) {
	if (t.length > We) throw new b(w("expand.braceTooLarge"));
	for (let n = 0; n < e.length; n++) {
		if (e[n].c !== "{") continue;
		let r = 0, i = n, a = [];
		for (; i < e.length; i++) {
			let t = e[i].c;
			if (t === "{") r++;
			else if (t === "}" && --r === 0) break;
			else t === "," && r === 1 && a.push(i);
		}
		if (i >= e.length) return void t.push(e);
		let o = e.slice(0, n), s = e.slice(i + 1);
		if (a.length) {
			let r = [
				n,
				...a,
				i
			];
			for (let n = 0; n < r.length - 1; n++) $e([
				...o,
				...e.slice(r[n] + 1, r[n + 1]),
				...s
			], t);
			return;
		}
		let c = e.slice(n + 1, i), l = c.every((e) => e.c != null) ? et(c.map((e) => e.c).join("")) : null;
		if (l) {
			for (let e of l) $e([
				...o,
				...[...e].map((e) => ({ c: e })),
				...s
			], t);
			return;
		}
	}
	t.push(e);
}
function et(e) {
	let t = /^(-?\d+)\.\.(-?\d+)(?:\.\.(-?\d+))?$/.exec(e);
	if (t) {
		let [e, n] = [Number(t[1]), Number(t[2])], r = Math.abs(Number(t[3] ?? 1)) || 1, i = /^-?0\d/.test(t[1]) || /^-?0\d/.test(t[2]) ? Math.max(t[1].length, t[2].length) : 0;
		if (Math.abs(n - e) / r > We) throw new b(w("expand.braceTooLarge"));
		let a = [];
		for (let t = e; e <= n ? t <= n : t >= n; t += e <= n ? r : -r) {
			let e = String(Math.abs(t)).padStart(i - +(t < 0), "0");
			a.push(t < 0 ? "-" + e : e);
		}
		return a;
	}
	if (t = /^([a-zA-Z])\.\.([a-zA-Z])(?:\.\.(-?\d+))?$/.exec(e), t) {
		let [e, n] = [t[1].charCodeAt(0), t[2].charCodeAt(0)], r = Math.abs(Number(t[3] ?? 1)) || 1, i = [];
		for (let t = e; e <= n ? t <= n : t >= n; t += e <= n ? r : -r) i.push(String.fromCharCode(t));
		return i;
	}
	return null;
}
function tt(e) {
	let t = [];
	for (let n of e) n.part ? t.push(n.part) : t.at(-1)?.type === "lit" && t.at(-1).fresh ? t.at(-1).value += n.c : t.push({
		type: "lit",
		value: n.c,
		fresh: !0
	});
	return t;
}
function nt(e, t) {
	let n = t[0];
	if (n?.type !== "lit" || !n.value.startsWith("~")) return t;
	let i = n.value.indexOf("/"), a = i < 0 ? n.value : n.value.slice(0, i), o = i < 0 ? "" : n.value.slice(i), s = null;
	return a === "~" ? s = e.getVar("HOME") ?? r.home : a === "~+" ? s = e.getVar("PWD") : a === "~-" ? s = e.getVar("OLDPWD") : a.slice(1) === e.getVar("USER") && (s = r.home), s == null || i < 0 && t.length > 1 && t[1].type !== "lit" ? t : [
		{
			type: "sq",
			value: s
		},
		...o ? [{
			type: "lit",
			value: o
		}] : [],
		...t.slice(1)
	];
}
async function R(e, t, n) {
	let r = [];
	for (let i of t) switch (i.type) {
		case "lit":
			r.push({
				text: i.value,
				quoted: n,
				split: !1
			});
			break;
		case "sq":
			r.push({
				text: i.value,
				quoted: !0
			});
			break;
		case "dq": {
			let t = await R(e, i.parts, !0), n = i.parts.length > 0 && i.parts.every((e) => e.type === "param" && rt(e));
			!t.length && !n && r.push({
				text: "",
				quoted: !0
			}), r.push(...t);
			break;
		}
		case "cmdsub": {
			let t = (await e.substitute(i.body)).replace(/\n+$/, "");
			r.push({
				text: t,
				quoted: n,
				split: !n
			});
			break;
		}
		case "arith": {
			let t = await I(e, i.word);
			r.push({
				text: String(e.arith(t)),
				quoted: n,
				split: !n
			});
			break;
		}
		case "param": r.push(...await it(e, i, n));
	}
	return r;
}
var rt = (e) => !e.length && !e.op && (e.name === "@" || e.index === "@");
async function it(e, t, n) {
	let { values: r, multi: i, star: a } = await at(e, t);
	if (i || a) {
		if (a && n) return [{
			text: r.join((Je(e) || "")[0] ?? ""),
			quoted: !0
		}];
		let t = [];
		return r.forEach((e, r) => {
			r && t.push(Ue), t.push({
				text: e,
				quoted: n,
				split: !n
			});
		}), t;
	}
	return [{
		text: r[0] ?? "",
		quoted: n,
		split: !n
	}];
}
async function at(e, t) {
	let n = t.name, r = t.index ?? null;
	if (t.indirect && (r === "@" || r === "*")) return {
		values: e.arrayKeys(n),
		multi: r === "@",
		star: r === "*"
	};
	if (t.indirect) {
		let t = ot(e, n, r).values[0] ?? "", i = /^([A-Za-z_]\w*|[0-9]+|[@*#?$!-])(?:\[(.*)\])?$/.exec(t);
		if (!i) throw new b(w("expand.badSubstitution", { name: t }));
		[, n, r = null] = i;
	}
	let { values: i, set: a, multi: o, star: s } = ot(e, n, r);
	if (t.length) return o || s ? { values: [String(i.length)] } : { values: [String([...i[0] ?? ""].length)] };
	let c = t.op;
	if (!c) {
		if (!a && e.options.nounset && !(o || s)) throw new b(w("expand.unbound", { name: n }));
		return {
			values: i,
			multi: o,
			star: s
		};
	}
	let l = !a || i.length === 0 || i.length === 1 && i[0] === "" && !(o || s), u = c.startsWith(":") ? l : !a;
	switch (c) {
		case "-":
		case ":-": return u ? { values: [await I(e, t.arg)] } : {
			values: i,
			multi: o,
			star: s
		};
		case "=":
		case ":=":
			if (!u) return {
				values: i,
				multi: o,
				star: s
			};
			if (!/^[A-Za-z_]\w*$/.test(n)) throw new b(w("expand.cannotAssign", { name: n }));
			return e.setVar(n, await I(e, t.arg), r), { values: [e.getVar(n, r) ?? ""] };
		case "?":
		case ":?":
			if (!u) return {
				values: i,
				multi: o,
				star: s
			};
			throw new b(`${n}: ${await I(e, t.arg) || w("expand.nullOrNotSet")}`);
		case "+":
		case ":+": return u ? { values: [] } : { values: [await I(e, t.arg)] };
	}
	let d = async (e) => ({
		values: await Promise.all(i.map(e)),
		multi: o,
		star: s
	});
	switch (c) {
		case "#":
		case "##":
		case "%":
		case "%%": {
			let n = await L(e, t.arg);
			return d((e) => st(e, n, c));
		}
		case "/":
		case "//":
		case "/#":
		case "/%": {
			let n = await L(e, t.arg), r = await I(e, t.replace);
			return d((e) => ct(e, n, r, c));
		}
		case "^":
		case "^^":
		case ",":
		case ",,": {
			let n = t.arg?.parts.length ? await L(e, t.arg) : "?", r = c[0] === "^";
			return d((e) => [...e].map((e, t) => (c.length === 2 || t === 0) && M(n, e) ? r ? e.toUpperCase() : e.toLowerCase() : e).join(""));
		}
		case "substr": {
			let r = Number(e.arith(await I(e, t.offset))), a = t.count ? Number(e.arith(await I(e, t.count))) : null, c = (e) => {
				let t = r < 0 ? Math.max(0, e.length + r) : Math.min(r, e.length);
				if (a == null) return e.slice(t);
				if (a < 0) {
					if (o || s) throw new b(w("expand.negativeSubstring", { count: a }));
					return e.slice(t, Math.max(t, e.length + a));
				}
				return e.slice(t, t + a);
			};
			return o || s ? {
				values: c(n === "@" || n === "*" ? [e.getVar("0") ?? "bash", ...i] : i),
				multi: o,
				star: s
			} : { values: [c([...i[0] ?? ""]).join("")] };
		}
	}
	throw new b(w("expand.badSubstitution", { name: n }));
}
function ot(e, t, n) {
	if (t === "@" || t === "*") return {
		values: e.positional,
		set: !0,
		multi: t === "@",
		star: t === "*"
	};
	if (/^\d+$/.test(t)) {
		let n = t === "0" ? e.getVar("0") : e.positional[Number(t) - 1];
		return {
			values: n == null ? [] : [n],
			set: n != null
		};
	}
	if (t === "#") return {
		values: [String(e.positional.length)],
		set: !0
	};
	if (/^[?$!-]$/.test(t)) {
		let n = e.special(t);
		return {
			values: n == null ? [] : [n],
			set: n != null
		};
	}
	if (n === "@" || n === "*") {
		let r = e.getArray(t) ?? [];
		return {
			values: r,
			set: r.length > 0,
			multi: n === "@",
			star: n === "*"
		};
	}
	let r = e.getVar(t, n == null ? null : e.arrayIndex(n));
	return {
		values: r == null ? [] : [r],
		set: r != null
	};
}
function st(e, t, n) {
	let r = n.length === 2;
	if (n[0] === "#") {
		let n = [...Array(e.length + 1).keys()];
		r && n.reverse();
		for (let r of n) if (M(t, e.slice(0, r))) return e.slice(r);
	} else {
		let n = [...Array(e.length + 1).keys()];
		r || n.reverse();
		for (let r of n) if (M(t, e.slice(r))) return e.slice(0, r);
	}
	return e;
}
function ct(e, t, n, r) {
	if (!t) return e;
	let i = Le(t);
	if (r === "/#") return e.replace(RegExp(`^(?:${i})`), () => n);
	if (r === "/%") {
		for (let r = 0; r <= e.length; r++) if (M(t, e.slice(r))) return e.slice(0, r) + n;
		return e;
	}
	let a = new RegExp(i, r === "//" ? "g" : "");
	return e.replace(a, (e) => e === "" ? e : n);
}
// src/terminal/shell/streams.js
var lt = class {
	#e = "";
	#t = !1;
	async pull() {
		return null;
	}
	async read() {
		if (this.#e) {
			let e = this.#e;
			return this.#e = "", e;
		}
		if (this.#t) return null;
		let e = await this.pull();
		return e ?? (this.#t = !0), e;
	}
	async readAll() {
		let e = "";
		for (let t; (t = await this.read()) != null;) e += t;
		return e;
	}
	async readLine(e = "\n") {
		for (;;) {
			let t = this.#e.indexOf(e);
			if (t >= 0) {
				let n = this.#e.slice(0, t);
				return this.#e = this.#e.slice(t + e.length), n;
			}
			if (this.#t) break;
			let n = await this.pull();
			if (n == null) {
				this.#t = !0;
				break;
			}
			this.#e += n;
		}
		if (!this.#e) return null;
		let t = this.#e;
		return this.#e = "", t;
	}
	async *lines() {
		for (let e; (e = await this.readLine()) != null;) yield e;
	}
	close() {}
}, ut = class extends lt {
	#e;
	constructor(e) {
		super(), this.#e = String(e);
	}
	async pull() {
		let e = this.#e;
		return this.#e = null, e || null;
	}
}, z = class extends lt {}, B = class {
	write() {}
	async close() {}
}, dt = class extends B {}, ft = class extends B {
	text = "";
	write(e) {
		this.text += e;
	}
}, pt = class extends B {
	constructor(e) {
		super(), this.fn = e;
	}
	write(e) {
		return this.fn(String(e));
	}
}, mt = 65536;
function ht() {
	let e = [], t = 0, n = !1, r = !1, i = null, a = [], o = () => {
		i?.(), i = null;
	}, s = () => {
		let e = a;
		a = [], e.forEach((e) => e());
	};
	class c extends B {
		async write(n) {
			if (r || (n = String(n), n && (e.push(n), t += n.length, o(), t > mt && await new Promise((e) => a.push(e)), r))) throw new _();
		}
		async close() {
			n = !0, o();
		}
	}
	class l extends lt {
		async pull() {
			for (; !e.length;) {
				if (n || r) return null;
				await new Promise((e) => {
					i = e;
				});
			}
			let a = e.splice(0).join("");
			return t = 0, s(), a;
		}
		close() {
			r = !0, e.length = 0, t = 0, s();
		}
	}
	return {
		writer: new c(),
		reader: new l()
	};
}
// src/terminal/shell/Shell.js
var gt = 200, _t = 0, vt = 1e3, yt = class e {
	scopes = [/* @__PURE__ */ new Map()];
	functions = /* @__PURE__ */ new Map();
	aliases = /* @__PURE__ */ new Map();
	positional = [];
	options = {
		errexit: !1,
		nounset: !1,
		xtrace: !1,
		pipefail: !1,
		noglob: !1
	};
	status = 0;
	lastBg = null;
	condDepth = 0;
	loopDepth = 0;
	funcDepth = 0;
	exempt = !1;
	#e = r.root;
	constructor({ host: e, commands: t, parent: n = null }) {
		if (this.host = e, this.commands = t, n) return;
		this.token = new x(), this.jobs = {
			list: [],
			next: 1
		}, this.pid = vt++, this.started = Date.now();
		let i = a.user?.username || w("shell.defaultUser"), o = {
			HOME: r.home,
			USER: i,
			LOGNAME: i,
			HOSTNAME: "lilos",
			SHELL: "/bin/bash",
			TERM: "lilos",
			PATH: `${r.home}/bin`,
			PS1: "\\u@\\h:\\w\\$ ",
			PS2: "> ",
			0: "bash",
			BASH_VERSION: "5.2-lilos"
		};
		for (let [e, t] of Object.entries(o)) this.scopes[0].set(e, {
			value: t,
			exported: ![
				"PS1",
				"PS2",
				"0",
				"BASH_VERSION"
			].includes(e)
		});
		this.cwd = r.root;
	}
	get cwd() {
		return r.get(this.#e)?.type === "folder" ? this.#e : r.root;
	}
	set cwd(e) {
		let t = this.getVar("PWD");
		this.#e = e, t != null && t !== r.path(e) && this.setVar("OLDPWD", t), this.setVar("PWD", r.path(e));
	}
	resolve(e) {
		return P(this.cwd, e);
	}
	locate(e) {
		return ze(this.cwd, e);
	}
	#t(e) {
		for (let t = this.scopes.length - 1; t >= 0; t--) if (this.scopes[t].has(e)) return this.scopes[t].get(e);
		return null;
	}
	getVar(e, t = null) {
		if (e === "RANDOM") return String(Math.floor(Math.random() * 32768));
		if (e === "SECONDS") return String(Math.floor((Date.now() - this.started) / 1e3));
		let n = this.#t(e);
		if (n && n.value != null) return Array.isArray(n.value) ? n.value[t ?? 0] : t == null || t === 0 ? n.value : void 0;
	}
	getArray(e) {
		let t = this.#t(e);
		return !t || t.value == null ? null : Array.isArray(t.value) ? t.value.filter(() => !0) : [t.value];
	}
	arrayKeys(e) {
		let t = this.#t(e);
		return !t || t.value == null ? [] : Array.isArray(t.value) ? Object.keys(t.value) : ["0"];
	}
	isSet(e) {
		return this.#t(e)?.value != null;
	}
	setVar(e, t, n = null, { local: r = !1, exported: i, readonly: a } = {}) {
		let o = r ? this.scopes.at(-1).get(e) : this.#t(e);
		if (o?.readonly) throw new b(w("shell.readonly", { name: e }));
		return o || (o = {
			value: null,
			exported: !1
		}, (r ? this.scopes.at(-1) : this.scopes[0]).set(e, o)), Array.isArray(t) ? o.value = [...t] : n == null ? t !== void 0 && (Array.isArray(o.value) ? o.value[0] = t == null ? "" : String(t) : o.value = t == null ? null : String(t)) : (Array.isArray(o.value) || (o.value = o.value == null ? [] : [o.value]), o.value[n] = String(t)), i !== void 0 && (o.exported = i), a && (o.readonly = !0), o;
	}
	unsetVar(e, t = null) {
		for (let n = this.scopes.length - 1; n >= 0; n--) {
			let r = this.scopes[n].get(e);
			if (r) {
				if (r.readonly) throw new b(w("shell.cannotUnset", { name: e }));
				t != null && Array.isArray(r.value) ? delete r.value[t] : this.scopes[n].delete(e);
				return;
			}
		}
	}
	variables() {
		let e = /* @__PURE__ */ new Map();
		for (let t of this.scopes) for (let [n, r] of t) e.set(n, r);
		return [...e].filter(([, e]) => e.value != null).sort(([e], [t]) => e < t ? -1 : +(e > t));
	}
	environment() {
		return Object.fromEntries(this.variables().filter(([, e]) => e.exported).map(([e, t]) => [e, Array.isArray(t.value) ? t.value[0] ?? "" : t.value]));
	}
	special(e) {
		switch (e) {
			case "?": return String(this.status);
			case "$": return String(this.pid);
			case "!": return this.lastBg == null ? void 0 : String(this.lastBg);
			case "-": return Object.entries({
				e: "errexit",
				u: "nounset",
				x: "xtrace",
				f: "noglob"
			}).filter(([, e]) => this.options[e]).map(([e]) => e).join("");
		}
	}
	arith(e) {
		return D(e, this.#n);
	}
	#n = {
		get: (e, t) => this.getVar(e, t == null ? null : Number(t)),
		set: (e, t, n) => this.setVar(e, n, t == null ? null : Number(t))
	};
	arrayIndex(e) {
		let t = String(e).replace(/\$\{?([A-Za-z_]\w*|[0-9#?])\}?/g, (e, t) => (/^\d$/.test(t) ? this.positional[t - 1] : t === "#" ? this.positional.length : t === "?" ? this.status : this.getVar(t)) ?? ""), n = Number(this.arith(t));
		if (n < 0) throw new b(w("shell.badSubscript", { index: e }));
		return n;
	}
	subshell({ script: t = !1 } = {}) {
		let n = new e({
			host: this.host,
			commands: this.commands,
			parent: this
		});
		return t ? n.scopes = [new Map(this.variables().filter(([, e]) => e.exported).map(([e, t]) => [e, {
			...t,
			value: Array.isArray(t.value) ? [...t.value] : t.value
		}]))] : (n.scopes = this.scopes.map((e) => new Map([...e].map(([e, t]) => [e, {
			...t,
			value: Array.isArray(t.value) ? [...t.value] : t.value
		}]))), n.functions = new Map(this.functions), n.aliases = new Map(this.aliases), n.positional = [...this.positional]), n.options = { ...this.options }, n.status = this.status, n.lastBg = this.lastBg, n.token = this.token, n.jobs = this.jobs, n.pid = this.pid, n.started = this.started, n.#e = this.cwd, n.subshellLevel = (this.subshellLevel ?? 0) + 1, n;
	}
	async run(e, t = this.host) {
		return de(e, { aliases: this.aliases }), this.exec({
			type: "script",
			source: e
		}, t);
	}
	async tick() {
		this.token.check();
		let e = performance.now();
		e - _t > 12 && (_t = e, await new Promise((e) => setTimeout(e)), this.token.check());
	}
	sleep(e) {
		return new Promise((t, n) => {
			let r = this.token.onAbort(() => {
				clearTimeout(i), n(new g());
			}), i = setTimeout(() => {
				r(), t();
			}, e);
		});
	}
	async exec(e, t) {
		switch (e.type) {
			case "list": return this.execList(e, t);
			case "andor": return this.execAndOr(e, t);
			case "pipeline": return this.execPipeline(e, t);
			case "simple": return this.execSimple(e, t);
			case "script": {
				let n = this.status;
				for (let r of fe(e.source, { aliases: this.aliases })) n = await this.execList(r, t);
				return n;
			}
		}
		return this.withRedirects(e.redirs ?? [], t, (t) => this.execCompound(e, t));
	}
	async execList(e, t) {
		let n = this.status;
		for (let r of e.items) if (r.async ? (this.startJob(r, t), n = 0) : (this.exempt = !1, n = await this.exec(r.node, t)), this.status = n, n !== 0 && this.options.errexit && !this.condDepth && !this.exempt && !r.async) throw new h(n);
		return n;
	}
	async execAndOr(e, t) {
		let n = [e.first, ...e.rest.map((e) => e.node)], r = e.rest.map((e) => e.op), i = 0, a = 0;
		for (let e = 0; e < n.length; e++) {
			if (e > 0 && r[e - 1] === "&&" != (i === 0)) continue;
			let o = e === n.length - 1;
			o || this.condDepth++;
			try {
				i = await this.exec(n[e], t);
			} finally {
				o || this.condDepth--;
			}
			this.status = i, a = e;
		}
		return this.exempt = a < n.length - 1, i;
	}
	async execPipeline(e, t) {
		let n;
		e.negate && this.condDepth++;
		try {
			if (e.cmds.length === 1) n = await this.exec(e.cmds[0], t);
			else {
				let r = e.cmds.slice(1).map(() => ht()), i = e.cmds.length - 1, a = await Promise.all(e.cmds.map(async (n, a) => {
					let o = a === i ? t.stdout : r[a].writer, s = {
						stdin: a === 0 ? t.stdin : r[a - 1].reader,
						stdout: o,
						stderr: e.both[a] ? o : t.stderr
					};
					try {
						return await this.subshell().runSubshell(n, s);
					} finally {
						a < i && await r[a].writer.close(), a > 0 && r[a - 1].reader.close();
					}
				}));
				this.setVar("PIPESTATUS", a.map(String)), n = this.options.pipefail ? [...a].reverse().find((e) => e !== 0) ?? 0 : a[i];
			}
		} finally {
			e.negate && this.condDepth--;
		}
		return e.negate ? +(n === 0) : n;
	}
	async runSubshell(e, t) {
		try {
			return await this.exec(e, t);
		} catch (e) {
			if (e instanceof h) return e.code;
			if (e instanceof _) return 141;
			if (e instanceof f || e instanceof p) return 0;
			if (e instanceof m) return e.code;
			if (e instanceof b) return await t.stderr.write(`bash: ${e.message}\n`), e.code;
			throw e;
		}
	}
	async execCompound(e, t) {
		switch (e.type) {
			case "group": return this.exec(e.body, t);
			case "subshell": return this.subshell().runSubshell(e.body, t);
			case "func": return this.functions.set(e.name, e), 0;
			case "if":
				for (let { cond: n, body: r } of e.clauses) if (await this.condition(n, t) === 0) return this.exec(r, t);
				return e.otherwise ? this.exec(e.otherwise, t) : 0;
			case "while": {
				let n = 0;
				return await this.loop(async () => await this.condition(e.cond, t) === 0 !== e.until && (n = await this.exec(e.body, t), !0)), n;
			}
			case "for": {
				let n = e.words ? await Ge(this, e.words) : [...this.positional], r = 0, i = 0;
				return await this.loop(async () => i >= n.length ? !1 : (this.setVar(e.name, n[i++]), r = await this.exec(e.body, t), !0)), r;
			}
			case "cfor": {
				let n = async (e) => this.arith(await I(this, e)), r = 0;
				e.init.parts.length && await n(e.init);
				let i = !0;
				return await this.loop(async () => (!i && e.step.parts.length && await n(e.step), i = !1, e.cond.parts.length && await n(e.cond) === 0n ? !1 : (r = await this.exec(e.body, t), !0))), r;
			}
			case "case": {
				let n = await I(this, e.word), r = 0;
				for (let i = 0; i < e.items.length; i++) {
					let a = e.items[i], o = !1;
					for (let e of a.patterns) if (M(await L(this, e), n)) {
						o = !0;
						break;
					}
					if (o) {
						for (r = await this.exec(a.body, t); a.term === ";&" && i + 1 < e.items.length;) a = e.items[++i], r = await this.exec(a.body, t);
						if (a.term !== ";;&") break;
					}
				}
				return r;
			}
			case "arithcmd": return +(this.arith(await I(this, e.word)) === 0n);
			case "cond": try {
				return +!await this.cond(e.expr);
			} catch (e) {
				if (!(e instanceof b)) throw e;
				return await t.stderr.write(`bash: ${e.message}\n`), 2;
			}
		}
		throw new b(w("shell.unknownConstruct", { type: e.type }));
	}
	async condition(e, t) {
		this.condDepth++;
		try {
			return await this.exec(e, t);
		} finally {
			this.condDepth--;
		}
	}
	async loop(e) {
		this.loopDepth++;
		try {
			for (;;) {
				await this.tick();
				try {
					if (!await e()) return;
				} catch (e) {
					if (e instanceof f) {
						if (e.levels > 1) throw new f(e.levels - 1);
						return;
					}
					if (e instanceof p) {
						if (e.levels > 1) throw new p(e.levels - 1);
						continue;
					}
					throw e;
				}
			}
		} finally {
			this.loopDepth--;
		}
	}
	async cond(e) {
		switch (e.op) {
			case "!": return !await this.cond(e.expr);
			case "&&": return await this.cond(e.left) && this.cond(e.right);
			case "||": return await this.cond(e.left) || this.cond(e.right);
			case "word": return await I(this, e.word) !== "";
			case "unary": return this.unaryTest(e.flag, await I(this, e.arg));
		}
		let t = await I(this, e.left);
		switch (e.bop) {
			case "==":
			case "=": return M(await L(this, e.right), t);
			case "!=": return !M(await L(this, e.right), t);
			case "=~": {
				let n;
				try {
					n = new RegExp(await qe(this, e.right));
				} catch {
					throw new b(w("shell.badRegex"));
				}
				let r = n.exec(t);
				return this.setVar("BASH_REMATCH", r ? [...r].map((e) => e ?? "") : []), !!r;
			}
		}
		return this.binaryTest(e.bop, t, await I(this, e.right), !0);
	}
	unaryTest(e, t) {
		let n = () => t === "" ? null : this.resolve(t);
		switch (e) {
			case "-n": return t !== "";
			case "-z": return t === "";
			case "-v": return this.isSet(t.replace(/\[.*$/, ""));
			case "-o": return !!this.options[t];
			case "-e":
			case "-a": return !!n() || t === "/dev/null";
			case "-f": return n()?.type === "file";
			case "-d": return n()?.type === "folder";
			case "-s": {
				let e = n();
				return !!e && (e.type !== "file" || (e.size ?? 0) > 0);
			}
			case "-r":
			case "-w": return !!n();
			case "-x": {
				let e = n();
				return e?.type === "folder" || e?.type === "file" && /\.(sh|bash)$/i.test(e.name);
			}
			case "-L":
			case "-h": return n()?.type === "app";
			case "-t": return t === "0" || t === "1" || t === "2";
		}
		throw new b(w("shell.unaryExpected", { op: e }));
	}
	binaryTest(e, t, n) {
		let r = (e) => {
			if (!/^\s*-?\d+\s*$/.test(e)) throw new b(w("shell.integerExpected", { value: e }));
			return BigInt(e.trim());
		};
		switch (e) {
			case "=":
			case "==": return t === n;
			case "!=": return t !== n;
			case "<": return t < n;
			case ">": return t > n;
			case "-eq": return r(t) === r(n);
			case "-ne": return r(t) !== r(n);
			case "-lt": return r(t) < r(n);
			case "-le": return r(t) <= r(n);
			case "-gt": return r(t) > r(n);
			case "-ge": return r(t) >= r(n);
			case "-nt": return (this.resolve(t)?.modified ?? -Infinity) > (this.resolve(n)?.modified ?? -Infinity);
			case "-ot": return (this.resolve(t)?.modified ?? Infinity) < (this.resolve(n)?.modified ?? Infinity);
			case "-ef": {
				let e = this.resolve(t), r = this.resolve(n);
				return !!e && e.id === r?.id;
			}
		}
		throw new b(w("shell.binaryExpected", { op: e }));
	}
	async execSimple(e, t) {
		await this.tick(), this.curIo = t, this.substStatus = null;
		let n;
		try {
			n = [];
			for (let t of e.words) {
				if (!t.declArray) {
					n.push(...await Ke(this, t));
					continue;
				}
				let { name: e, append: r, words: i } = t.declArray, a = await Ge(this, i);
				(this.declArrays ??= /* @__PURE__ */ new Map()).set(e, a), n.push(`${e}${r ? "+" : ""}=(${a.join(" ")})`);
			}
		} catch (e) {
			if (!(e instanceof b)) throw e;
			return await t.stderr.write(`bash: ${e.message}\n`), 1;
		}
		if (!n.length) {
			try {
				for (let t of e.assigns) await this.assign(t);
			} catch (e) {
				if (!(e instanceof b)) throw e;
				return await t.stderr.write(`bash: ${e.message}\n`), 1;
			}
			let n = this.substStatus ?? 0;
			return e.redirs.length ? this.withRedirects(e.redirs, t, async () => n) : n;
		}
		let r = null;
		if (e.assigns.length) {
			r = /* @__PURE__ */ new Map();
			for (let t of e.assigns) r.set(t.name, {
				value: t.array ? await Ge(this, t.array) : await I(this, t.value),
				exported: !0
			});
		}
		return this.options.xtrace && await t.stderr.write(`+ ${n.map(V).join(" ")}\n`), this.withRedirects(e.redirs, t, async (e) => {
			r && this.scopes.push(r);
			try {
				return await this.invoke(n, e);
			} finally {
				r && this.scopes.splice(this.scopes.indexOf(r), 1);
			}
		});
	}
	async assign(e) {
		if (e.array) {
			let t = await Ge(this, e.array);
			this.setVar(e.name, e.append ? [...this.getArray(e.name) ?? [], ...t] : t);
			return;
		}
		let t = await I(this, e.value), n = e.index == null ? null : this.arrayIndex(e.index);
		e.append ? this.setVar(e.name, (this.getVar(e.name, n) ?? "") + t, n) : this.setVar(e.name, t, n), this.options.xtrace && await this.curIo?.stderr.write(`+ ${e.name}=${V(t)}\n`);
	}
	async invoke(e, t, { functions: n = !0 } = {}) {
		let r = e[0];
		if (r.includes("/")) return this.runScript(r, e.slice(1), t);
		if (n && this.functions.has(r)) return this.callFunction(r, e, t);
		let i = this.commands.get(r);
		if (i) return this.runCommand(i, e, t);
		for (let n of (this.getVar("PATH") ?? "").split(":").filter(Boolean)) for (let i of [r, `${r}.sh`]) if (this.resolve(`${n}/${i}`)?.type === "file") return this.runScript(`${n}/${i}`, e.slice(1), t);
		return await t.stderr.write(`bash: ${w("shell.commandNotFound", { name: r })}\n`), 127;
	}
	async runCommand(e, t, n) {
		let r = new bt(this, e, t, n);
		if (t[1] === "--help" && !e.ownHelp) return await r.out(Ct(e)), 0;
		try {
			let t = await e.run(r);
			return typeof t == "number" ? t : 0;
		} catch (e) {
			if (e instanceof _) return 141;
			let t = async (e) => {
				try {
					await r.error(e);
				} catch {}
			};
			if (e instanceof b) return await t(e.message), e.code;
			if (e instanceof f || e instanceof p || e instanceof m || e instanceof h || e instanceof g) throw e;
			return e instanceof v || e instanceof y ? (await t(e.message || w("parse.unexpectedEnd")), 2) : (await t(e?.message ?? String(e)), 1);
		}
	}
	async callFunction(e, t, n) {
		if (this.funcDepth >= gt) throw new b(w("shell.tooDeep", { name: e }));
		let r = this.functions.get(e), i = this.positional, a = /* @__PURE__ */ new Map();
		this.positional = t.slice(1), this.scopes.push(a), this.funcDepth++;
		try {
			return await this.exec(r.body, n);
		} catch (e) {
			if (e instanceof m) return e.code;
			throw e;
		} finally {
			this.funcDepth--, this.scopes.splice(this.scopes.indexOf(a), 1), this.positional = i;
		}
	}
	async readScript(e) {
		let t = this.resolve(e);
		if (!t) throw new b(w("err.noSuchFile", { path: e }), 127);
		if (t.type === "folder") throw new b(w("err.isADirectory", { path: e }), 126);
		if (t.type !== "file") throw new b(w("err.notAFile", { path: e }), 126);
		return r.read(t.id);
	}
	async runScript(e, t, n) {
		let r;
		try {
			r = await this.readScript(e);
		} catch (e) {
			if (!(e instanceof b)) throw e;
			return await n.stderr.write(`bash: ${e.message}\n`), e.code;
		}
		let i = this.subshell({ script: !0 });
		return i.positional = [...t], i.setVar("0", e), i.runSource(r, n, e);
	}
	async runSource(e, t, n) {
		try {
			de(e, { aliases: this.aliases });
		} catch (e) {
			if (!(e instanceof y || e instanceof v)) throw e;
			return await t.stderr.write(`${n}: ${e.message || w("parse.unexpectedEndOfFile")}\n`), 2;
		}
		return this.runSubshell({
			type: "script",
			source: e
		}, t);
	}
	async substitute(e) {
		let t = new ft(), n = this.curIo ?? this.host, r = await this.subshell().runSubshell(e, {
			stdin: n.stdin,
			stdout: t,
			stderr: n.stderr
		});
		return this.substStatus = r, this.status = r, t.text;
	}
	async withRedirects(e, t, n) {
		if (!e.length) return n(t);
		let r = {
			0: t.stdin,
			1: t.stdout,
			2: t.stderr
		}, i = [];
		try {
			for (let n of e) {
				let e = n.fd ?? +!n.op.startsWith("<");
				switch (n.op) {
					case "<":
					case "<>":
						r[e] = await this.openRead(await this.redirTarget(n), t);
						break;
					case ">":
					case ">|":
					case ">>": {
						let a = await this.openWrite(await this.redirTarget(n), n.op === ">>", t);
						i.push(a), r[e] = a;
						break;
					}
					case "&>":
					case "&>>": {
						let e = await this.openWrite(await this.redirTarget(n), n.op === "&>>", t);
						i.push(e), r[1] = r[2] = e;
						break;
					}
					case ">&":
					case "<&": {
						let a = await this.redirTarget(n);
						if (a === "-") r[e] = n.op === ">&" ? new dt() : new z();
						else if (/^\d+$/.test(a)) {
							if (!r[a]) throw new b(w("shell.badFd", { fd: a }));
							r[e] = r[a];
						} else if (n.op === ">&" && n.fd == null) {
							let e = await this.openWrite(a, !1, t);
							i.push(e), r[1] = r[2] = e;
						} else throw new b(w("shell.fdExpected", { target: a }));
						break;
					}
					case "<<":
					case "<<-":
						r[e] = new ut(await I(this, n.heredoc.body));
						break;
					case "<<<": r[e] = new ut(await I(this, n.target) + "\n");
				}
			}
		} catch (e) {
			if (!(e instanceof b)) throw e;
			await t.stderr.write(`bash: ${e.message}\n`);
			for (let e of i) await e.close().catch(() => {});
			return 1;
		}
		try {
			return await n({
				stdin: r[0],
				stdout: r[1],
				stderr: r[2]
			});
		} finally {
			for (let e of i) try {
				await e.close();
			} catch (e) {
				await t.stderr.write(`bash: ${e.message}\n`);
			}
		}
	}
	async redirTarget(e) {
		let t = await Ke(this, e.target);
		if (t.length !== 1) throw new b(w("shell.ambiguousRedirect", { target: await I(this, e.target) }));
		return t[0];
	}
	async openRead(e, t) {
		if (e === "/dev/null") return new z();
		if (e === "/dev/stdin") return t.stdin;
		let n = this.resolve(e);
		if (!n) throw new b(w("err.noSuchFile", { path: e }));
		if (n.type === "folder") throw new b(w("err.isADirectory", { path: e }));
		if (n.type !== "file") throw new b(w("err.notAFile", { path: e }));
		return new ut(await r.read(n.id));
	}
	async openWrite(e, t, n) {
		if (e === "/dev/null") return new dt();
		if (e === "/dev/stdout") return St(n.stdout);
		if (e === "/dev/stderr") return St(n.stderr);
		if (e === "/dev/tty") return St(this.host.stdout);
		let i = this.fileFor(e).id;
		return t || await r.write(i, ""), new xt(i, t);
	}
	fileFor(e) {
		let t = this.resolve(e);
		if (t?.type === "folder") throw new b(w("err.isADirectory", { path: e }));
		if (t?.type === "app") throw new b(w("shell.isAppLink", { path: e }));
		if (t) return t;
		let { parent: n, name: i } = this.locate(e);
		if (n?.type !== "folder" || !i) throw new b(w("err.noSuchFile", { path: e }));
		return r.create(n.id, {
			type: "file",
			name: i
		});
	}
	startJob(e, t) {
		let n = this.subshell();
		n.token = new x();
		let r = {
			id: this.jobs.next++,
			pid: vt++,
			text: e.text.replace(/&\s*$/, "").trim(),
			state: "running",
			code: null,
			token: n.token,
			notified: !1
		};
		return n.pid = r.pid, r.promise = n.runSubshell(e.node, {
			stdin: new z(),
			stdout: t.stdout,
			stderr: t.stderr
		}).then((e) => e, (e) => e instanceof g ? 130 : (t.stderr.write(`bash: ${e?.message ?? e}\n`), 1)).then((e) => (r.state = "done", r.code = e, e)), this.jobs.list.push(r), this.lastBg = r.pid, this.subshellLevel || t.stderr.write(`[${r.id}] ${r.pid}\n`), r;
	}
	findJob(e) {
		let t = this.jobs.list;
		return e == null || e === "%%" || e === "%+" || e === "%" ? t.at(-1) ?? null : e === "%-" ? t.at(-2) ?? null : /^%\d+$/.test(e) ? t.find((t) => t.id === Number(e.slice(1))) ?? null : /^\d+$/.test(e) ? t.find((t) => t.pid === Number(e)) ?? null : e.startsWith("%") ? t.find((t) => t.text.startsWith(e.slice(1))) ?? null : null;
	}
	reapJobs() {
		let e = this.jobs.list.filter((e) => e.state === "done");
		return this.jobs.list = this.jobs.list.filter((e) => e.state !== "done"), this.jobs.list.length || (this.jobs.next = 1), e.map((e) => `[${e.id}]  ${e.code === 0 ? w("jobs.done") : e.code === 130 ? w("jobs.interrupted") : w("jobs.exit", { code: e.code })}\t\t${e.text}\n`);
	}
	async waitJob(e, { forward: t = !1 } = {}) {
		let n, r = new Promise((r, i) => {
			n = this.token.onAbort(() => {
				t ? e.token.abort() : i(new g());
			});
		});
		try {
			return await Promise.race([e.promise, r]);
		} finally {
			n();
		}
	}
}, bt = class {
	constructor(e, t, n, r) {
		this.shell = e, this.cmd = t, this.name = n[0], this.argv = n, this.args = n.slice(1), this.stdin = r.stdin, this.stdout = r.stdout, this.stderr = r.stderr, this.io = r;
	}
	get cwd() {
		return this.shell.cwd;
	}
	out(e) {
		return this.stdout.write(String(e));
	}
	err(e) {
		return this.stderr.write(String(e));
	}
	error(e) {
		return this.stderr.write(`${this.name}: ${e}\n`);
	}
	tick() {
		return this.shell.tick();
	}
	resolve(e) {
		return this.shell.resolve(e);
	}
	locate(e) {
		return this.shell.locate(e);
	}
	async *inputs(e) {
		e.length || (e = ["-"]);
		for (let t of e) {
			if (t === "-") {
				yield {
					name: "-",
					text: await this.stdin.readAll()
				};
				continue;
			}
			let e = this.resolve(t);
			e ? e.type === "folder" ? (await this.error(w("err.isADirectory", { path: t })), this.failed = !0) : e.type === "file" ? (yield {
				name: t,
				node: e,
				text: await r.read(e.id)
			}, await this.tick()) : (await this.error(w("err.notAFile", { path: t })), this.failed = !0) : (await this.error(w("err.noSuchFile", { path: t })), this.failed = !0);
		}
	}
}, xt = class extends B {
	#e = "";
	constructor(e, t) {
		super(), this.id = e, this.append = t;
	}
	write(e) {
		this.#e += e;
	}
	async close() {
		if (!r.exists(this.id) || this.append && !this.#e) return;
		let e = this.append ? await r.read(this.id) : "";
		await r.write(this.id, e + this.#e);
	}
}, St = (e) => ({
	write: (t) => e.write(t),
	close: async () => {}
}), V = (e) => e === "" ? "''" : /^[\w@%+=:,./~-]+$/.test(e) ? e : `'${e.replace(/'/g, "'\\''")}'`;
function Ct(e) {
	return `${e.usage ? `${w("help.usageLine", { usage: e.usage })}\n` : ""}${e.summary ?? ""}\n${e.help ? `\n${e.help.trim()}\n` : ""}`;
}
// src/terminal/commands/options.js
function H(e, { flags: t = "", values: n = "", multi: r = "", long: i = {}, number: a = !1, stopAtArg: o = !1 } = {}) {
	let s = {}, c = [], l = e.args, u = (e, t) => {
		r.includes(e) ? (s[e] ??= []).push(t) : s[e] = t;
	}, d = (t) => new b(`${w("opt.invalid", { option: t })}${e.cmd.usage ? `\n${w("help.usageLine", { usage: e.cmd.usage })}` : ""}`, 2);
	for (let e = 0; e < l.length; e++) {
		let f = l[e];
		if (f === "--") {
			c.push(...l.slice(e + 1));
			break;
		}
		if (f.startsWith("--") && f.length > 2) {
			let [t, a] = f.slice(2).split(/=(.*)/s), o = i[t];
			if (o == null) throw d(`--${t}`);
			if (n.includes(o) || r.includes(o)) {
				let n = a ?? l[++e];
				if (n == null) throw new b(w("opt.longNeedsArgument", { name: t }), 2);
				u(o, n);
			} else s[o] = !0;
		} else if (f.startsWith("-") && f.length > 1) {
			if (a && /^-\d+$/.test(f)) {
				s.n = f.slice(1);
				continue;
			}
			for (let i = 1; i < f.length; i++) {
				let a = f[i];
				if (n.includes(a) || r.includes(a)) {
					let t = i + 1 < f.length ? f.slice(i + 1) : l[++e];
					if (t == null) throw new b(w("opt.needsArgument", { option: a }), 2);
					u(a, t);
					break;
				}
				if (!t.includes(a)) throw d(a);
				s[a] = !0;
			}
		} else {
			if (o) {
				c.push(...l.slice(e));
				break;
			}
			c.push(f);
		}
	}
	return {
		opts: s,
		args: c
	};
}
function U(e) {
	if (!/^[+-]?\d+$/.test(String(e))) throw new b(w("opt.badNumber", { value: e }), 2);
	return Number(e);
}
// src/terminal/commands/builtins.js
var wt = [
	"if",
	"then",
	"else",
	"elif",
	"fi",
	"case",
	"esac",
	"for",
	"while",
	"until",
	"do",
	"done",
	"in",
	"function",
	"{",
	"}",
	"!",
	"[[",
	"]]"
], Tt = {
	errexit: "e",
	nounset: "u",
	xtrace: "x",
	noglob: "f",
	pipefail: null
}, Et = {
	n: "\n",
	t: "	",
	r: "\r",
	a: "\x07",
	b: "\b",
	e: "\x1B",
	E: "\x1B",
	f: "\f",
	v: "\v",
	"\\": "\\"
};
function Dt(e, { printf: t = !1 } = {}) {
	let n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (i !== "\\" || r === e.length - 1) {
			n += i;
			continue;
		}
		let a = e[++r];
		if (Et[a] != null) {
			n += Et[a];
			continue;
		}
		if (a === "c") return {
			text: n,
			stop: !0
		};
		if (t && a === "\"") {
			n += "\"";
			continue;
		}
		let o, s = e.slice(r);
		(o = /^x([0-9a-fA-F]{1,2})/.exec(s)) ? (n += String.fromCharCode(parseInt(o[1], 16)), r += o[0].length - 1) : (o = /^u([0-9a-fA-F]{1,4})/.exec(s)) || (o = /^U([0-9a-fA-F]{1,8})/.exec(s)) ? (n += String.fromCodePoint(Math.min(parseInt(o[1], 16), 1114111)), r += o[0].length - 1) : (o = (t ? /^([0-7]{1,3})/ : /^0([0-7]{0,3})/).exec(s)) ? (n += String.fromCharCode(parseInt(o[1] || "0", 8)), r += o[0].length - 1) : n += "\\" + a;
	}
	return {
		text: n,
		stop: !1
	};
}
function Ot(e, t) {
	let n = "", r = 0, i = [], a = /%([-+ #0]*)(\*|\d+)?(?:\.(\*|\d*))?([diouxXfFeEgGcsbq%])/y, o = () => r < t.length ? t[r++] : void 0, s = (e) => {
		if (e == null || e === "") return 0;
		if (/^['"]./.test(e)) return e.codePointAt(1);
		let t = e.trim();
		if (/^[+-]?(0[xX][0-9a-fA-F]+|\d+)$/.test(t)) return Number(t.startsWith("-") ? -Number(t.slice(1)) : Number(t.replace(/^\+/, "")));
		if (/^[+-]?0[0-7]+$/.test(t)) return parseInt(t, 8);
		let n = Number(t);
		return Number.isFinite(n) ? n : (i.push(w("printf.badNumber", { value: e })), 0);
	};
	do {
		let t = r;
		for (let t = 0; t < e.length;) {
			let r = e[t];
			if (r === "\\") {
				let r = /^\\(x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{1,4}|[0-7]{1,3}|.)/s.exec(e.slice(t))[0], { text: a, stop: o } = Dt(r, { printf: !0 });
				if (n += a, o) return {
					text: n,
					errors: i
				};
				t += r.length;
				continue;
			}
			if (r !== "%") {
				n += r, t++;
				continue;
			}
			a.lastIndex = t;
			let c = a.exec(e);
			if (!c) {
				n += r, t++;
				continue;
			}
			t += c[0].length;
			let [, l, u, d, f] = c;
			if (f === "%") {
				n += "%";
				continue;
			}
			u === "*" && (u = String(s(o()))), d === "*" && (d = String(s(o())));
			let p = o(), m;
			switch (f) {
				case "s":
					m = p ?? "", d && (m = m.slice(0, Number(d)));
					break;
				case "b":
					m = Dt(p ?? "").text;
					break;
				case "q":
					m = V(p ?? "");
					break;
				case "c":
					m = (p ?? "")[0] ?? "";
					break;
				case "d":
				case "i":
				case "u": {
					let e = Math.trunc(s(p));
					m = String(Math.abs(e)), d && (m = m.padStart(Number(d), "0")), m = (e < 0 ? "-" : l.includes("+") ? "+" : l.includes(" ") ? " " : "") + m;
					break;
				}
				case "o":
					m = (l.includes("#") ? "0" : "") + Math.trunc(s(p)).toString(8);
					break;
				case "x":
					m = (l.includes("#") ? "0x" : "") + Math.trunc(s(p)).toString(16);
					break;
				case "X":
					m = (l.includes("#") ? "0X" : "") + Math.trunc(s(p)).toString(16).toUpperCase();
					break;
				default: {
					let e = s(p), t = d === void 0 || d === "" ? 6 : Number(d);
					m = f === "e" || f === "E" ? e.toExponential(t).replace(/e([+-])(\d)$/, "e$10$2") : f === "g" || f === "G" ? String(Number(e.toPrecision(t || 1))) : e.toFixed(t), (f === "E" || f === "G") && (m = m.toUpperCase()), e >= 0 && l.includes("+") && (m = "+" + m);
				}
			}
			let h = Number(u ?? 0);
			if (m.length < h) {
				if (l.includes("-")) m = m.padEnd(h);
				else if (l.includes("0") && /[diouxXfFeEgG]/.test(f)) {
					let e = /^[+-]/.test(m) ? m[0] : "";
					m = e + m.slice(e.length).padStart(h - e.length, "0");
				} else m = m.padStart(h);
			}
			n += m;
		}
		if (r === t) break;
	} while (r < t.length);
	return {
		text: n,
		errors: i
	};
}
function kt(e, t) {
	let n = 0, r = [
		"=",
		"==",
		"!=",
		"<",
		">",
		"-eq",
		"-ne",
		"-lt",
		"-le",
		"-gt",
		"-ge",
		"-nt",
		"-ot",
		"-ef"
	], i = /^-[a-zA-Z]$/;
	if (t.length === 1) return t[0] !== "";
	let a = () => {
		let e = o();
		for (; t[n] === "-o";) {
			n++;
			let t = o();
			e ||= t;
		}
		return e;
	}, o = () => {
		let e = s();
		for (; t[n] === "-a";) {
			n++;
			let t = s();
			e &&= t;
		}
		return e;
	}, s = () => t[n] === "!" && n + 1 < t.length ? (n++, !s()) : c(), c = () => {
		if (n >= t.length) throw new b(w("test.argumentExpected"), 2);
		if (t[n] === "(" && n + 2 < t.length) {
			n++;
			let e = a();
			if (t[n] !== ")") throw new b(w("err.missingParen"), 2);
			return n++, e;
		}
		if (n + 2 < t.length + 0 && r.includes(t[n + 1]) && n + 2 <= t.length - 1) {
			let r = e.binaryTest(t[n + 1], t[n], t[n + 2]);
			return n += 3, r;
		}
		if (i.test(t[n]) && n + 1 < t.length) {
			let r = e.unaryTest(t[n], t[n + 1]);
			return n += 2, r;
		}
		return t[n++] !== "";
	};
	if (!t.length) return !1;
	let l = a();
	if (n < t.length) throw new b(w("test.unexpectedArgument", { arg: t[n] }), 2);
	return l;
}
function At(e, t) {
	let n = (Array.isArray(t.value) ? "a" : "") + (t.exported ? "x" : "") + (t.readonly ? "r" : ""), r = Array.isArray(t.value) ? `(${Object.keys(t.value).map((e) => `[${e}]=${JSON.stringify(t.value[e])}`).join(" ")})` : JSON.stringify(t.value);
	return `declare -${n || "-"} ${e}=${r}\n`;
}
async function W(e, { local: t = !1, exported: n, readonly: r = !1, flags: i = "axrigpfFn" } = {}) {
	let a = e.shell, { opts: o, args: s } = H(e, { flags: i });
	if (o.f || o.F) {
		let t = s.length ? s : [...a.functions.keys()].sort(), n = 0;
		for (let r of t) {
			let t = a.functions.get(r);
			t ? await e.out(o.F ? `declare -f ${r}\n` : `${t.text}\n`) : n = 1;
		}
		return n;
	}
	let c = t || e.name !== "export" && e.name !== "readonly" && a.funcDepth > 0 && !o.g;
	if (!s.length || o.p) {
		let t = a.variables().filter(([t, n]) => (!s.length || s.includes(t)) && (!(o.x || e.name === "export") || n.exported) && (!(o.r || e.name === "readonly") || n.readonly) && (!o.a || Array.isArray(n.value)));
		for (let [n, r] of t) await e.out(At(n, r));
		return 0;
	}
	let l = 0;
	for (let t of s) {
		let i = /^([A-Za-z_]\w*)(?:\[([^\]]*)\])?(\+?)(?:=(.*))?$/s.exec(t);
		if (!i) {
			await e.error(w("err.badIdentifier", { name: t })), l = 1;
			continue;
		}
		let [, s, u, d, f] = i, p = o.n ? !1 : o.x || n ? !0 : void 0;
		if (f === void 0) {
			a.setVar(s, o.a && !a.isSet(s) ? [] : void 0, null, {
				local: c,
				exported: p,
				readonly: r || o.r
			});
			continue;
		}
		let m = /^\((.*)\)$/s.exec(f), h = a.declArrays?.get(s);
		if (m && (o.a || h)) {
			a.declArrays?.delete(s);
			let e = h ?? (m[1].trim() ? m[1].trim().split(/\s+/) : []);
			d && (e = [...a.getArray(s) ?? [], ...e]), a.setVar(s, e, null, {
				local: c,
				exported: p,
				readonly: r || o.r
			});
			continue;
		}
		let g = u == null ? null : a.arrayIndex(u), _ = d ? (a.getVar(s, g) ?? "") + f : f;
		a.setVar(s, o.i ? String(a.arith(_)) : _, g, {
			local: c,
			exported: p,
			readonly: r || o.r
		});
	}
	return l;
}
var jt = (e, t, n) => {
	if (t == null) return n;
	if (!/^-?\d+$/.test(t)) throw new b(w("err.numericArgument", { value: t }), 2);
	return (Number(t) % 256 + 256) % 256;
}, Mt = [
	{
		name: "cd",
		get usage() {
			return w("help.cd.usage");
		},
		get summary() {
			return w("help.cd.summary");
		},
		get help() {
			return w("help.cd.text");
		},
		async run(e) {
			let t = e.shell, { args: n } = H(e, { flags: "LPe" }), r = n[0] ?? t.getVar("HOME") ?? "~";
			if (n.length > 1) throw new b(w("err.tooManyArguments"));
			if (r === "-") {
				if (r = t.getVar("OLDPWD"), r == null) throw new b(w("cd.oldpwdNotSet"));
				await e.out(r + "\n");
			}
			let i = e.resolve(r);
			if (!i) throw new b(w("err.noSuchFile", { path: r }));
			if (i.type !== "folder") throw new b(w("err.notADirectory", { path: r }));
			t.cwd = i.id;
		}
	},
	{
		name: "pwd",
		usage: "pwd",
		get summary() {
			return w("help.pwd.summary");
		},
		async run(e) {
			await e.out(r.path(e.cwd) + "\n");
		}
	},
	{
		name: "echo",
		ownHelp: !0,
		get usage() {
			return w("help.echo.usage");
		},
		get summary() {
			return w("help.echo.summary");
		},
		get help() {
			return w("help.echo.text");
		},
		async run(e) {
			let t = e.args, n = !0, r = !1;
			for (; t.length && /^-[neE]+$/.test(t[0]);) {
				for (let e of t[0].slice(1)) e === "n" ? n = !1 : r = e === "e";
				t = t.slice(1);
			}
			let i = t.join(" ");
			if (r) {
				let e = Dt(i);
				i = e.text, e.stop && (n = !1);
			}
			await e.out(i + (n ? "\n" : ""));
		}
	},
	{
		name: "printf",
		ownHelp: !0,
		get usage() {
			return w("help.printf.usage");
		},
		get summary() {
			return w("help.printf.summary");
		},
		get help() {
			return w("help.printf.text");
		},
		async run(e) {
			let t = e.args, n = null;
			if (t[0] === "-v" && (n = t[1], t = t.slice(2)), t[0] === "--" && (t = t.slice(1)), !t.length) throw new b(w("help.usageShort", { usage: this.usage }), 2);
			let { text: r, errors: i } = Ot(t[0], t.slice(1));
			for (let t of i) await e.error(t);
			return n ? e.shell.setVar(n, r) : await e.out(r), +!!i.length;
		}
	},
	{
		name: "export",
		get usage() {
			return w("help.export.usage");
		},
		get summary() {
			return w("help.export.summary");
		},
		get help() {
			return w("help.export.text");
		},
		run: (e) => W(e, {
			exported: !0,
			flags: "npf"
		})
	},
	{
		name: "readonly",
		get usage() {
			return w("help.readonly.usage");
		},
		get summary() {
			return w("help.readonly.summary");
		},
		run: (e) => W(e, {
			readonly: !0,
			flags: "ap"
		})
	},
	{
		name: "local",
		get usage() {
			return w("help.local.usage");
		},
		get summary() {
			return w("help.local.summary");
		},
		run(e) {
			if (!e.shell.funcDepth) throw new b(w("local.onlyInFunction"));
			return W(e, {
				local: !0,
				flags: "axrin"
			});
		}
	},
	{
		name: "declare",
		get usage() {
			return w("help.declare.usage");
		},
		get summary() {
			return w("help.declare.summary");
		},
		get help() {
			return w("help.declare.text");
		},
		run: (e) => W(e)
	},
	{
		name: "typeset",
		get usage() {
			return w("help.typeset.usage");
		},
		get summary() {
			return w("help.typeset.summary");
		},
		run: (e) => W(e)
	},
	{
		name: "unset",
		get usage() {
			return w("help.unset.usage");
		},
		get summary() {
			return w("help.unset.summary");
		},
		async run(e) {
			let { opts: t, args: n } = H(e, { flags: "fv" });
			for (let r of n) {
				if (t.f) {
					e.shell.functions.delete(r);
					continue;
				}
				let n = /^([A-Za-z_]\w*)(?:\[(.*)\])?$/.exec(r);
				if (!n) throw new b(w("err.badIdentifier", { name: r }));
				n[2] == null && !t.v && !e.shell.isSet(n[1]) && e.shell.functions.has(n[1]) ? e.shell.functions.delete(n[1]) : e.shell.unsetVar(n[1], n[2] == null ? null : e.shell.arrayIndex(n[2]));
			}
		}
	},
	{
		name: "env",
		get usage() {
			return w("help.env.usage");
		},
		get summary() {
			return w("help.env.summary");
		},
		async run(e) {
			let t = [...e.args], n = /* @__PURE__ */ new Map();
			for (; t.length && /^[A-Za-z_]\w*=/.test(t[0]);) {
				let [e, r] = t.shift().split(/=(.*)/s);
				n.set(e, {
					value: r,
					exported: !0
				});
			}
			if (!t.length) {
				let t = {
					...e.shell.environment(),
					...Object.fromEntries([...n].map(([e, t]) => [e, t.value]))
				};
				for (let n of Object.keys(t).sort()) await e.out(`${n}=${t[n]}\n`);
				return 0;
			}
			e.shell.scopes.push(n);
			try {
				return await e.shell.invoke(t, e.io, { functions: !1 });
			} finally {
				e.shell.scopes.splice(e.shell.scopes.indexOf(n), 1);
			}
		}
	},
	{
		name: "printenv",
		get usage() {
			return w("help.printenv.usage");
		},
		get summary() {
			return w("help.printenv.summary");
		},
		async run(e) {
			let t = e.shell.environment();
			if (!e.args.length) {
				for (let n of Object.keys(t).sort()) await e.out(`${n}=${t[n]}\n`);
				return 0;
			}
			let n = 0;
			for (let r of e.args) r in t ? await e.out(t[r] + "\n") : n = 1;
			return n;
		}
	},
	{
		name: "set",
		ownHelp: !0,
		get usage() {
			return w("help.set.usage");
		},
		get summary() {
			return w("help.set.summary");
		},
		get help() {
			return w("help.set.text");
		},
		async run(e) {
			let t = e.shell, n = e.args;
			if (!n.length) {
				for (let [n, r] of t.variables()) await e.out(`${n}=${Array.isArray(r.value) ? `(${r.value.map(V).join(" ")})` : V(r.value)}\n`);
				return 0;
			}
			for (let r = 0; r < n.length; r++) {
				let i = n[r];
				if (i === "--") return t.positional = n.slice(r + 1), 0;
				if (/^[-+]o$/.test(i)) {
					let a = n[++r];
					if (a == null) {
						for (let [n] of Object.entries(Tt)) await e.out(`${n.padEnd(15)}${t.options[n] ? "on" : "off"}\n`);
						continue;
					}
					if (!(a in Tt)) throw new b(w("set.badOptionName", { name: a }), 2);
					t.options[a] = i[0] === "-";
				} else if (/^[-+][euxfv]+$/.test(i)) for (let e of i.slice(1)) {
					let n = Object.keys(Tt).find((t) => Tt[t] === e);
					n && (t.options[n] = i[0] === "-");
				}
				else {
					if (/^[-+]/.test(i) && i.length > 1) throw new b(w("set.badOption", { option: i }), 2);
					return t.positional = n.slice(r), 0;
				}
			}
			return 0;
		}
	},
	{
		name: "shift",
		usage: "shift [n]",
		get summary() {
			return w("help.shift.summary");
		},
		run(e) {
			let t = e.args[0] == null ? 1 : U(e.args[0]);
			return t > e.shell.positional.length ? 1 : (e.shell.positional = e.shell.positional.slice(t), 0);
		}
	},
	{
		name: "true",
		ownHelp: !0,
		usage: "true",
		get summary() {
			return w("help.true.summary");
		},
		run: () => 0
	},
	{
		name: "false",
		ownHelp: !0,
		usage: "false",
		get summary() {
			return w("help.false.summary");
		},
		run: () => 1
	},
	{
		name: ":",
		ownHelp: !0,
		get usage() {
			return w("help.colon.usage");
		},
		get summary() {
			return w("help.colon.summary");
		},
		run: () => 0
	},
	{
		name: "test",
		ownHelp: !0,
		get usage() {
			return w("help.test.usage");
		},
		get summary() {
			return w("help.test.summary");
		},
		get help() {
			return w("help.test.text");
		},
		run: (e) => +!kt(e.shell, e.args)
	},
	{
		name: "[",
		ownHelp: !0,
		get usage() {
			return w("help.bracket.usage");
		},
		get summary() {
			return w("help.bracket.summary");
		},
		run(e) {
			if (e.args.at(-1) !== "]") throw new b(w("test.missingBracket"), 2);
			return +!kt(e.shell, e.args.slice(0, -1));
		}
	},
	{
		name: "let",
		ownHelp: !0,
		get usage() {
			return w("help.let.usage");
		},
		get summary() {
			return w("help.let.summary");
		},
		run(e) {
			if (!e.args.length) throw new b(w("let.noExpression"), 2);
			let t = 0n;
			for (let n of e.args) t = e.shell.arith(n);
			return +(t === 0n);
		}
	},
	{
		name: "exit",
		get usage() {
			return w("help.exit.usage");
		},
		get summary() {
			return w("help.exit.summary");
		},
		run(e) {
			throw new h(jt(e, e.args[0], e.shell.status));
		}
	},
	{
		name: "return",
		get usage() {
			return w("help.return.usage");
		},
		get summary() {
			return w("help.return.summary");
		},
		run(e) {
			throw !e.shell.funcDepth && !e.shell.sourceDepth ? new b(w("return.onlyInFunction")) : new m(jt(e, e.args[0], e.shell.status));
		}
	},
	{
		name: "break",
		usage: "break [n]",
		get summary() {
			return w("help.break.summary");
		},
		async run(e) {
			if (!e.shell.loopDepth) return await e.error(w("loop.onlyInLoop")), 0;
			let t = e.args[0] == null ? 1 : U(e.args[0]);
			throw t < 1 ? new b(w("loop.badCount", { n: t })) : new f(Math.min(t, e.shell.loopDepth));
		}
	},
	{
		name: "continue",
		usage: "continue [n]",
		get summary() {
			return w("help.continue.summary");
		},
		async run(e) {
			if (!e.shell.loopDepth) return await e.error(w("loop.onlyInLoop")), 0;
			let t = e.args[0] == null ? 1 : U(e.args[0]);
			throw t < 1 ? new b(w("loop.badCount", { n: t })) : new p(Math.min(t, e.shell.loopDepth));
		}
	},
	{
		name: "read",
		get usage() {
			return w("help.read.usage");
		},
		get summary() {
			return w("help.read.summary");
		},
		get help() {
			return w("help.read.text");
		},
		async run(e) {
			let t = e.shell, { opts: n, args: r } = H(e, {
				flags: "rs",
				values: "pad"
			});
			n.p && await e.err(n.p);
			let i = n.d === void 0 ? "\n" : n.d[0] ?? "\0";
			e.stdin.silent = !!n.s;
			let a;
			try {
				if (a = await e.stdin.readLine(i), a != null && !n.r) for (; /(^|[^\\])(\\\\)*\\$/.test(a);) {
					let t = await e.stdin.readLine(i);
					if (a = a.slice(0, -1) + (t ?? ""), t == null) break;
				}
			} finally {
				e.stdin.silent = !1;
			}
			n.s && e.stdin === t.host.stdin && await e.err("\n");
			let o = a == null;
			a ??= "";
			let s = n.r ? a : a.replace(/\\(.)/g, "$1"), c = t.getVar("IFS") ?? " 	\n", l = [...c].filter((e) => /\s/.test(e)).join(""), u = (e) => e.replace(RegExp(`^[${G(l)}]+|[${G(l)}]+$`, "g"), ""), d = (e) => c ? u(e).split(RegExp(`[${G(l)}]*[${G(c)}][${G(l)}]*|[${G(l)}]+`)).filter((e, t, n) => e !== "" || t < n.length - 1) : [e];
			if (n.a) return t.setVar(n.a, s === "" ? [] : d(s)), +!!o;
			if (!r.length) return t.setVar("REPLY", a), o && !a ? 1 : +!!o;
			let f = c ? u(s) : s;
			return r.forEach((e, n) => {
				if (n === r.length - 1) {
					t.setVar(e, f);
					return;
				}
				let i = c ? RegExp(`^([^${G(c)}]*)(?:[${G(l)}]*[${G(c)}][${G(l)}]*|[${G(l)}]+|$)`).exec(f) : null;
				t.setVar(e, i ? i[1] : f), f = i ? f.slice(i[0].length) : "";
			}), +!!o;
		}
	},
	{
		name: "source",
		get usage() {
			return w("help.source.usage");
		},
		get summary() {
			return w("help.source.summary");
		},
		run: (e) => Nt(e)
	},
	{
		name: ".",
		get usage() {
			return w("help.dot.usage");
		},
		get summary() {
			return w("help.dot.summary");
		},
		run: (e) => Nt(e)
	},
	{
		name: "eval",
		ownHelp: !0,
		get usage() {
			return w("help.eval.usage");
		},
		get summary() {
			return w("help.eval.summary");
		},
		async run(e) {
			try {
				return await e.shell.run(e.args.join(" "), e.io);
			} catch (e) {
				throw e instanceof y || e instanceof v ? new b(e.message || w("parse.unexpectedEnd"), 2) : e;
			}
		}
	},
	{
		name: "alias",
		get usage() {
			return w("help.alias.usage");
		},
		get summary() {
			return w("help.alias.summary");
		},
		get help() {
			return w("help.alias.text");
		},
		async run(e) {
			let t = e.shell.aliases, { args: n } = H(e, { flags: "p" });
			if (!n.length) {
				for (let [n, r] of [...t].sort()) await e.out(`alias ${n}=${V(r)}\n`);
				return 0;
			}
			let r = 0;
			for (let i of n) {
				let n = i.indexOf("=");
				if (n > 0) {
					let a = i.slice(0, n);
					if (/[\s/$`=|&;<>()'"\\]/.test(a)) {
						await e.error(w("alias.badName", { name: a })), r = 1;
						continue;
					}
					t.set(a, i.slice(n + 1));
				} else t.has(i) ? await e.out(`alias ${i}=${V(t.get(i))}\n`) : (await e.error(w("err.notFound", { name: i })), r = 1);
			}
			return r;
		}
	},
	{
		name: "unalias",
		get usage() {
			return w("help.unalias.usage");
		},
		get summary() {
			return w("help.unalias.summary");
		},
		async run(e) {
			let { opts: t, args: n } = H(e, { flags: "a" });
			if (t.a) return e.shell.aliases.clear(), 0;
			let r = 0;
			for (let t of n) e.shell.aliases.delete(t) || (await e.error(w("err.notFound", { name: t })), r = 1);
			return r;
		}
	},
	{
		name: "type",
		get usage() {
			return w("help.type.usage");
		},
		get summary() {
			return w("help.type.summary");
		},
		async run(e) {
			let { opts: t, args: n } = H(e, { flags: "ta" }), r = 0;
			for (let i of n) {
				let n = Ft(e.shell, i);
				n ? t.t ? await e.out(n.kind + "\n") : await e.out(n.text + "\n") : (t.t || await e.error(w("err.notFound", { name: i })), r = 1);
			}
			return r;
		}
	},
	{
		name: "command",
		get usage() {
			return w("help.command.usage");
		},
		get summary() {
			return w("help.command.summary");
		},
		async run(e) {
			let { opts: t, args: n } = H(e, {
				flags: "vVp",
				stopAtArg: !0
			});
			if (!n.length) return 0;
			if (t.v || t.V) {
				let r = 0;
				for (let i of n) {
					let n = Ft(e.shell, i);
					n ? await e.out((t.V ? n.text : n.kind === "alias" ? `alias ${i}=${V(e.shell.aliases.get(i))}` : n.path ?? i) + "\n") : r = 1;
				}
				return r;
			}
			return e.shell.invoke(n, e.io, { functions: !1 });
		}
	},
	{
		name: "which",
		get usage() {
			return w("help.which.usage");
		},
		get summary() {
			return w("help.which.summary");
		},
		async run(e) {
			let t = 0;
			for (let n of e.args) {
				let r = Ft(e.shell, n);
				!r || r.kind === "alias" || r.kind === "keyword" || r.kind === "function" ? t = 1 : await e.out((r.path ?? w("which.builtIn", { name: n })) + "\n");
			}
			return t;
		}
	},
	{
		name: "history",
		usage: "history [-c] [n]",
		get summary() {
			return w("help.history.summary");
		},
		async run(e) {
			let { opts: t, args: n } = H(e, { flags: "c" }), r = e.shell.host.history;
			if (!r) return 0;
			if (t.c) return r.clear(), 0;
			let i = r.list(), a = n[0] == null ? i.length : U(n[0]), o = Math.max(0, i.length - a);
			for (let t = o; t < i.length; t++) await e.out(`${String(t + 1).padStart(5)}  ${i[t]}\n`);
		}
	},
	{
		name: "help",
		get usage() {
			return w("help.help.usage");
		},
		get summary() {
			return w("help.help.summary");
		},
		async run(e) {
			let t = e.shell.commands;
			if (e.args.length) {
				let n = 0;
				for (let r of e.args) {
					let i = t.get(r);
					i ? await e.out(Ct(i)) : Rt(r) ? await e.out(It[Rt(r)]().trim() + "\n") : (await e.error(w("help.noHelp", { name: r })), n = 1);
				}
				return n;
			}
			let n = [...t.values()].filter((e, t, n) => n.indexOf(e) === t && !e.hidden).sort((e, t) => e.name.localeCompare(t.name)), r = Math.max(...n.map((e) => e.name.length)) + 2;
			await e.out(`${w("help.intro")}\n\n`);
			for (let t of n) await e.out(`  ${t.name.padEnd(r)}${t.summary ?? ""}${t.app ? ` (${t.app})` : ""}\n`);
			await e.out(`\n${w("help.syntaxList", { list: Object.keys(It).map(Lt).join(", ") })}\n`);
		}
	},
	{
		name: "clear",
		usage: "clear",
		get summary() {
			return w("help.clear.summary");
		},
		async run(e) {
			e.stdout === e.shell.host.stdout ? e.shell.host.clear?.() : await e.out("\x1B[2J\x1B[H");
		}
	},
	{
		name: "jobs",
		usage: "jobs [-lp]",
		get summary() {
			return w("help.jobs.summary");
		},
		async run(e) {
			let { opts: t } = H(e, { flags: "lp" }), n = e.shell.jobs.list;
			for (let r of n) {
				let i = r === n.at(-1) ? "+" : r === n.at(-2) ? "-" : " ";
				t.p ? await e.out(`${r.pid}\n`) : await e.out(`[${r.id}]${i} ${t.l ? `${r.pid} ` : ""}${r.state === "done" ? r.code === 0 ? w("jobs.done") : w("jobs.exit", { code: r.code }) : w("jobs.running")}\t\t${r.text}\n`);
			}
		}
	},
	{
		name: "wait",
		usage: "wait [%job | pid…]",
		get summary() {
			return w("help.wait.summary");
		},
		async run(e) {
			let t = e.shell;
			if (!e.args.length) {
				let e = 0;
				for (let n of [...t.jobs.list]) e = await t.waitJob(n);
				return e;
			}
			let n = 0;
			for (let r of e.args) {
				let i = t.findJob(r);
				i ? n = await t.waitJob(i) : (await e.error(w("wait.notAJob", { spec: r })), n = 127);
			}
			return n;
		}
	},
	{
		name: "fg",
		usage: "fg [%job]",
		get summary() {
			return w("help.fg.summary");
		},
		async run(e) {
			let t = e.shell, n = t.findJob(e.args[0]);
			if (!n) throw new b(w("fg.noSuchJob", { job: e.args[0] ?? w("fg.current") }));
			await e.out(n.text + "\n");
			let r = await t.waitJob(n, { forward: !0 });
			return t.jobs.list = t.jobs.list.filter((e) => e !== n), r;
		}
	},
	{
		name: "kill",
		get usage() {
			return w("help.kill.usage");
		},
		get summary() {
			return w("help.kill.summary");
		},
		async run(e) {
			let t = e.args;
			if (t[0] === "-l") return await e.out("HUP INT QUIT KILL TERM\n"), 0;
			if (t[0] === "-s" || t[0] === "-n" ? t = t.slice(2) : /^-\w+$/.test(t[0] ?? "") && (t = t.slice(1)), !t.length) throw new b(w("help.usageShort", { usage: this.usage }), 2);
			let n = 0;
			for (let r of t) {
				let t = e.shell.findJob(r);
				t ? t.token.abort() : (await e.error(w("kill.noSuchJob", { spec: r })), n = 1);
			}
			return n;
		}
	},
	{
		name: "sleep",
		get usage() {
			return w("help.sleep.usage");
		},
		get summary() {
			return w("help.sleep.summary");
		},
		async run(e) {
			if (!e.args.length) throw new b(w("sleep.missing"), 2);
			let t = 0;
			for (let n of e.args) {
				let e = /^(\d+(?:\.\d*)?|\.\d+)([smhd]?)$/.exec(n);
				if (!e) throw new b(w("sleep.badDuration", { value: n }), 2);
				t += Number(e[1]) * {
					"": 1,
					s: 1,
					m: 60,
					h: 3600,
					d: 86400
				}[e[2]] * 1e3;
			}
			await e.shell.sleep(t);
		}
	},
	{
		name: "bash",
		get usage() {
			return w("help.bash.usage");
		},
		get summary() {
			return w("help.bash.summary");
		},
		get help() {
			return w("help.bash.text");
		},
		run: (e) => Pt(e)
	},
	{
		name: "sh",
		get usage() {
			return w("help.sh.usage");
		},
		get summary() {
			return w("help.sh.summary");
		},
		run: (e) => Pt(e)
	}
];
async function Nt(e) {
	let t = e.shell, [n, ...r] = e.args;
	if (!n) throw new b(w("source.noFile"), 2);
	let i = n;
	if (!n.includes("/") && !e.resolve(n)) {
		let r = (t.getVar("PATH") ?? "").split(":").find((t) => t && e.resolve(`${t}/${n}`)?.type === "file");
		r && (i = `${r}/${n}`);
	}
	let a = await t.readScript(i);
	try {
		de(a, { aliases: t.aliases });
	} catch (e) {
		throw e instanceof y || e instanceof v ? new b(`${n}: ${e.message || w("parse.unexpectedEndOfFile")}`, 2) : e;
	}
	let o = t.positional;
	r.length && (t.positional = r), t.sourceDepth = (t.sourceDepth ?? 0) + 1;
	try {
		return await t.exec({
			type: "script",
			source: a
		}, e.io);
	} catch (e) {
		if (e instanceof m) return e.code;
		throw e;
	} finally {
		t.sourceDepth--, r.length && (t.positional = o);
	}
}
async function Pt(e) {
	let t = e.shell, n = [...e.args], r = {
		e: !1,
		x: !1,
		u: !1
	}, i = null;
	for (; n.length && /^-[cexu]+$/.test(n[0]);) for (let e of n.shift().slice(1)) e === "c" ? i = n.shift() : r[e] = !0;
	if (i == null && n[0] === "-c") throw new b(w("bash.noCommand"), 2);
	let a = t.subshell({ script: !0 });
	if (Object.assign(a.options, {
		errexit: r.e,
		xtrace: r.x,
		nounset: r.u
	}), i != null) return a.setVar("0", n[0] ?? "bash"), a.positional = n.slice(1), a.runSource(i, e.io, "bash");
	if (n.length) {
		a.setVar("0", n[0]), a.positional = n.slice(1);
		let r;
		try {
			r = await t.readScript(n[0]);
		} catch (e) {
			throw e instanceof b ? new b(e.message, e.code) : e;
		}
		return a.runSource(r, e.io, n[0]);
	}
	return e.stdin === t.host.stdin ? (await e.err(`${w("bash.already")}\n`), 0) : a.runSource(await e.stdin.readAll(), e.io, "bash");
}
function Ft(e, t) {
	if (e.aliases.has(t)) return {
		kind: "alias",
		text: w("type.alias", {
			name: t,
			value: e.aliases.get(t)
		})
	};
	if (wt.includes(t)) return {
		kind: "keyword",
		text: w("type.keyword", { name: t })
	};
	if (e.functions.has(t)) return {
		kind: "function",
		text: `${w("type.function", { name: t })}\n${e.functions.get(t).text}`
	};
	let n = e.commands.get(t);
	if (n?.builtin) return {
		kind: "builtin",
		text: w("type.builtin", { name: t })
	};
	if (n?.app) return {
		kind: "file",
		text: w("type.appCommand", {
			name: t,
			app: n.app
		})
	};
	if (n) return {
		kind: "file",
		text: w("type.command", { name: t })
	};
	for (let n of (e.getVar("PATH") ?? "").split(":").filter(Boolean)) for (let i of [t, `${t}.sh`]) {
		let a = e.resolve(`${n}/${i}`);
		if (a?.type === "file") return {
			kind: "file",
			text: w("type.file", {
				name: t,
				path: r.path(a.id)
			}),
			path: r.path(a.id)
		};
	}
	return t.includes("/") && e.resolve(t)?.type === "file" ? {
		kind: "file",
		text: w("type.file", {
			name: t,
			path: t
		}),
		path: t
	} : null;
}
var G = (e) => e.replace(/[\]\\^-]/g, "\\$&"), It = {
	if: () => w("syntax.if"),
	for: () => w("syntax.for"),
	while: () => w("syntax.while"),
	until: () => w("syntax.until"),
	case: () => w("syntax.case"),
	function: () => w("syntax.function"),
	"[[": () => w("syntax.cond"),
	"((": () => w("syntax.arith"),
	variables: () => w("syntax.variables"),
	redirections: () => w("syntax.redirections")
}, Lt = (e) => ({
	variables: w("syntax.topic.variables"),
	redirections: w("syntax.topic.redirections")
})[e] ?? e, Rt = (e) => Object.keys(It).find((t) => t === e || Lt(t) === e), K = {
	reset: "\x1B[0m",
	folder: "\x1B[1;34m",
	app: "\x1B[36m",
	script: "\x1B[32m",
	dim: "\x1B[2m"
}, zt = (e) => e.type === "file" && /\.(sh|bash)$/i.test(e.name), Bt = (e) => w("files.cannotAccess", { path: e }), q = (e) => e.stdout === e.shell.host.stdout;
function Vt(e) {
	if (e < 1024) return String(e);
	let t = [
		"K",
		"M",
		"G",
		"T"
	], n = e, r = -1;
	do
		n /= 1024, r++;
	while (n >= 1024 && r < t.length - 1);
	return (n < 10 ? C.number(Number(n.toFixed(1)), { minimumFractionDigits: 1 }) : String(Math.round(n))) + t[r];
}
function Ht(e) {
	let t = new Date(e), n = /* @__PURE__ */ new Date(), r = w("ls.date", {
		day: String(t.getDate()).padStart(2),
		month: C.date(t, { month: "short" })
	});
	return Math.abs(n - t) < 15552e6 ? `${r} ${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}` : `${r}  ${t.getFullYear()}`;
}
var Ut = (e) => e.type === "file" ? e.size ?? 0 : e.type === "folder" ? r.children(e.id).length : 0;
function J(e, t, n = t.name, r = !1) {
	let i = r ? t.type === "folder" ? "/" : t.type === "app" ? "@" : zt(t) ? "*" : "" : "";
	if (!q(e)) return n + i;
	let a = t.type === "folder" ? K.folder : t.type === "app" ? K.app : zt(t) ? K.script : "";
	return a ? `${a}${n}${K.reset}${i}` : n + i;
}
function Wt(e, t) {
	if (!e.length) return "";
	let n = (e) => e.plain.length;
	for (let r = Math.min(e.length, Math.max(1, Math.floor(t / 3))); r >= 1; r--) {
		let i = Math.ceil(e.length / r), a = [];
		for (let t = 0; t < r; t++) a.push(Math.max(0, ...e.slice(t * i, (t + 1) * i).map(n)));
		if (a.reduce((e, t) => e + t, 0) + 2 * (r - 1) > t && r > 1) continue;
		let o = "";
		for (let t = 0; t < i; t++) {
			let s = "";
			for (let o = 0; o < r; o++) {
				let c = e[o * i + t];
				if (!c) continue;
				let l = o === r - 1 || !e[(o + 1) * i + t];
				s += c.text + (l ? "" : " ".repeat(a[o] - n(c) + 2));
			}
			o += s + "\n";
		}
		return o;
	}
	return e.map((e) => e.text).join("\n") + "\n";
}
function Gt(e, t) {
	let n = [...e].sort((e, n) => (t.t ? n.modified - e.modified : t.S ? Ut(n) - Ut(e) : 0) || F(e.name, n.name));
	return t.r ? n.reverse() : n;
}
async function Kt(e, t, n) {
	if (!t.length) return;
	if (!n.l) {
		if (n[1] || !q(e)) for (let { node: r, name: i } of t) await e.out(J(e, r, i, n.F) + "\n");
		else {
			let r = t.map(({ node: t, name: r }) => ({
				text: J(e, t, r, n.F),
				plain: r + (n.F && (t.type !== "file" || zt(t)) ? " " : "")
			}));
			await e.out(Wt(r, e.shell.host.columns?.() ?? 80));
		}
		return;
	}
	let i = t.map(({ node: t, name: i }) => {
		let a = t.type === "folder" ? "d" : t.type === "app" ? "l" : "-", o = t.type === "file" ? n.h ? Vt(t.size ?? 0) : String(t.size ?? 0) : t.type === "folder" ? String(r.children(t.id).length) : "-", c = (t.tags ?? []).map((e) => s.get(e)?.name).filter(Boolean), l = J(e, t, i, n.F);
		return t.type === "app" && (l += ` -> app:${t.app}`), c.length && (l += (q(e) ? K.dim : "") + " " + c.map((e) => "#" + e).join(" ") + (q(e) ? K.reset : "")), {
			type: a,
			size: o,
			date: Ht(t.modified ?? t.created ?? 0),
			shown: l
		};
	}), a = Math.max(...i.map((e) => e.size.length));
	for (let t of i) await e.out(`${t.type}  ${t.size.padStart(a)}  ${t.date}  ${t.shown}\n`);
}
var qt = (e, t) => r.children(e).filter((e) => t.a || t.A || !e.name.startsWith("."));
async function Jt(e) {
	let { opts: t, args: n } = H(e, {
		flags: "laA1htrSdRF",
		long: {
			all: "a",
			"almost-all": "A",
			"human-readable": "h",
			reverse: "r",
			recursive: "R",
			directory: "d",
			classify: "F"
		}
	}), i = n.length ? n : ["."], a = 0, o = [], s = [];
	for (let n of i) {
		let r = e.resolve(n);
		r ? r.type === "folder" && !t.d ? s.push({
			node: r,
			name: n
		}) : o.push({
			node: r,
			name: n
		}) : (await e.error(Bt(n)), a = 2);
	}
	await Kt(e, Gt(o.map((e) => ({
		...e.node,
		shownName: e.name
	})), t).map((e) => ({
		node: e,
		name: e.shownName
	})), t);
	let c = i.length > 1 || t.R, l = !o.length, u = async (n, i) => {
		await e.tick(), c && await e.out(`${l ? "" : "\n"}${i}:\n`), l = !1;
		let a = Gt(qt(n.id, t), t), o = a.map((e) => ({
			node: e,
			name: e.name
		}));
		if (t.a && o.unshift({
			node: n,
			name: "."
		}, ...n.id === r.root ? [] : [{
			node: r.get(n.parent),
			name: ".."
		}]), await Kt(e, o, t), t.R) for (let e of a.filter((e) => e.type === "folder")) await u(e, `${i.replace(/\/$/, "")}/${e.name}`);
	};
	for (let { node: e, name: t } of s) await u(e, t);
	return a;
}
async function Yt(e) {
	let { opts: t, args: n } = H(e, {
		flags: "nbsEA",
		long: {
			number: "n",
			"number-nonblank": "b",
			"squeeze-blank": "s",
			"show-ends": "E"
		}
	}), r = 0;
	for await (let { text: i } of e.inputs(n)) {
		if (!t.n && !t.b && !t.s && !t.E) {
			await e.out(i);
			continue;
		}
		let n = i.split("\n"), a = i.endsWith("\n");
		a && n.pop();
		let o = "", s = !1;
		for (let e of n) {
			if (t.s && e === "" && s) continue;
			s = e === "";
			let n = t.b ? e !== "" : t.n;
			o += (n ? `${String(++r).padStart(6)}\t` : "") + e + (t.E ? "$" : "") + "\n";
		}
		!a && o.endsWith("\n") && (o = o.slice(0, -1)), await e.out(o);
	}
	return +!!e.failed;
}
function Xt(e, t) {
	let n = r.get(r.root);
	for (let i of N(e.cwd, t)) {
		let e = r.children(n.id).find((e) => e.name.toLowerCase() === i.toLowerCase()) ?? r.resolve(`${r.path(n.id)}/${i}`);
		if (e && e.type !== "folder") throw new b(w("mkdir.notAFolder", {
			path: t,
			name: i
		}));
		n = e ?? r.create(n.id, {
			type: "folder",
			name: i
		});
	}
	return n;
}
async function Zt(e) {
	let { opts: t, args: n } = H(e, {
		flags: "pv",
		long: {
			parents: "p",
			verbose: "v"
		}
	});
	if (!n.length) throw new b(w("err.missingOperand"), 2);
	let i = 0;
	for (let a of n) try {
		let n = e.resolve(a);
		if (n) {
			if (t.p && n.type === "folder") continue;
			throw new b(w("mkdir.exists", { path: a }));
		}
		if (t.p) Xt(e, a);
		else {
			let { parent: t, name: n } = e.locate(a);
			if (t?.type !== "folder" || !n) throw new b(w("mkdir.noParent", { path: a }));
			r.create(t.id, {
				type: "folder",
				name: n
			});
		}
		t.v && await e.out(`${w("mkdir.created", { path: a })}\n`);
	} catch (t) {
		await e.error(t.message), i = 1;
	}
	return i;
}
async function Qt(e) {
	let { opts: t, args: n } = H(e, {
		flags: "cam",
		long: { "no-create": "c" }
	});
	if (!n.length) throw new b(w("err.missingOperand"), 2);
	let i = 0;
	for (let a of n) {
		let n = e.resolve(a);
		if (n) {
			n.type === "file" && await (r.copyContent ? r.copyContent(n.id, n.id) : r.write(n.id, await r.readBlob(n.id)));
			continue;
		}
		if (t.c) continue;
		let { parent: o, name: s } = e.locate(a);
		o?.type !== "folder" || !s ? (await e.error(w("files.cannotCreate", { path: a })), i = 1) : r.create(o.id, {
			type: "file",
			name: s
		});
	}
	return i;
}
async function $t(e, t, n, i, a) {
	await e.tick();
	let o = r.children(n).find((e) => e.name.toLowerCase() === i.toLowerCase());
	if (t.type === "folder") {
		let s = o;
		if (s && s.type !== "folder") throw new b(w("cp.overwriteFile", { name: i }));
		s ??= r.create(n, {
			type: "folder",
			name: i,
			color: t.color
		});
		for (let n of r.children(t.id)) await $t(e, n, s.id, n.name, a);
		return;
	}
	if (o) {
		if (a.n) return;
		if (o.type === "folder") throw new b(w("files.overwriteFolder", { name: i }));
		if (o.type === "file" && t.type === "file") {
			await (r.copyContent ? r.copyContent(t.id, o.id) : r.write(o.id, await r.readBlob(t.id))), a.v && await e.out(`${w("cp.verbose", {
				from: r.path(t.id),
				to: r.path(o.id)
			})}\n`);
			return;
		}
		r.trash([o.id]);
	}
	if (t.type === "file" && r.copy) {
		let o = await r.copy(t.id, n, { name: i });
		a.v && await e.out(`${w("cp.verbose", {
			from: r.path(t.id),
			to: r.path(o.id)
		})}
`);
		return;
	}
	let s = r.create(n, {
		type: t.type,
		name: i,
		app: t.app
	});
	t.type === "file" && await r.write(s.id, await r.readBlob(t.id)), a.v && await e.out(`${w("cp.verbose", {
		from: r.path(t.id),
		to: r.path(s.id)
	})}\n`);
}
function en(e, t) {
	if (t.length < 2) throw new b(t.length ? w("files.missingDestination", { path: t[0] }) : w("err.missingOperand"), 2);
	let n = t.at(-1), i = t.slice(0, -1), a = e.resolve(n);
	if (i.length > 1 && a?.type !== "folder") throw new b(w("files.targetNotFolder", { path: n }));
	return {
		sources: i,
		target: (t) => {
			if (a?.type === "folder" && a.id !== t.id) return {
				parent: a,
				name: t.name
			};
			if (a) return {
				parent: r.get(a.parent),
				name: a.id === t.id ? N(e.cwd, n).at(-1) : a.name,
				existing: a
			};
			let { parent: i, name: o } = e.locate(n);
			if (i?.type !== "folder" || !o) throw new b(w("files.cannotCreate", { path: n }));
			return {
				parent: i,
				name: o
			};
		}
	};
}
async function tn(e) {
	let { opts: t, args: n } = H(e, {
		flags: "rRanvfp",
		long: {
			recursive: "r",
			"no-clobber": "n",
			verbose: "v",
			force: "f",
			archive: "a"
		}
	}), { sources: i, target: a } = en(e, n), o = 0;
	for (let n of i) try {
		let i = e.resolve(n);
		if (!i) throw new b(w("files.cannotStat", { path: n }));
		if (i.type === "folder" && !(t.r || t.R || t.a)) throw new b(w("cp.omitting", { path: n }));
		let { parent: o, name: s } = a(i);
		if (i.type === "folder" && r.isInside(o.id, i.id)) throw new b(w("cp.intoItself", { path: n }));
		await $t(e, i, o.id, s, t);
	} catch (t) {
		if (!(t instanceof b) && !(t instanceof Error)) throw t;
		await e.error(t.message), o = 1;
	}
	return o;
}
async function nn(e) {
	let { opts: t, args: n } = H(e, {
		flags: "nvfi",
		long: {
			"no-clobber": "n",
			verbose: "v",
			force: "f"
		}
	}), { sources: i, target: a } = en(e, n), o = 0;
	for (let n of i) try {
		let i = e.resolve(n);
		if (!i) throw new b(w("files.cannotStat", { path: n }));
		if (i.system) throw new b(w("mv.system", { path: n }));
		let { parent: o, name: s } = a(i);
		if (i.type === "folder" && r.isInside(o.id, i.id)) throw new b(w("mv.intoItself", { path: n }));
		let c = r.children(o.id).find((e) => e.id !== i.id && e.name.toLowerCase() === s.toLowerCase());
		if (c) {
			if (t.n) continue;
			if (c.type === "folder" && i.type !== "folder") throw new b(w("files.overwriteFolder", { name: s }));
			if (c.type === "folder" && r.children(c.id).length) throw new b(w("mv.notEmpty", {
				path: n,
				name: s
			}));
			r.trash([c.id]);
		}
		i.parent !== o.id && r.move(i.id, o.id), r.get(i.id).name !== s && r.rename(i.id, s), t.v && await e.out(`${w("mv.verbose", {
			from: n,
			to: r.path(i.id)
		})}\n`);
	} catch (t) {
		await e.error(t.message), o = 1;
	}
	return o;
}
async function rn(e) {
	let { opts: t, args: n } = H(e, {
		flags: "rRfvdi",
		long: {
			recursive: "r",
			force: "f",
			verbose: "v",
			dir: "d",
			purge: "P"
		}
	});
	if (!n.length && !t.f) throw new b(w("err.missingOperand"), 2);
	let i = 0;
	for (let a of n) {
		let n = e.resolve(a);
		if (!n) t.f || (await e.error(w("files.cannotRemove", {
			path: a,
			reason: w("reason.noSuchFile")
		})), i = 1);
		else try {
			if (n.id === r.root) throw new b(w("rm.home", { path: a }));
			if (n.type === "folder" && !(t.r || t.R)) {
				if (!t.d) throw new b(w("files.cannotRemove", {
					path: a,
					reason: w("reason.isADirectory")
				}));
				if (r.children(n.id).length) throw new b(w("files.cannotRemove", {
					path: a,
					reason: w("reason.notEmpty")
				}));
			}
			if (n.system) throw new b(w("files.cannotRemove", {
				path: a,
				reason: w("reason.system")
			}));
			if (t.P) r.remove(n.id);
			else if (!r.trash([n.id]).length) throw new b(w("files.cannotRemove", {
				path: a,
				reason: w("reason.containsSystem")
			}));
			t.v && await e.out(`${t.P ? w("rm.purged", { path: a }) : w("rm.trashed", { path: a })}\n`);
		} catch (t) {
			await e.error(t.message), i = 1;
		}
	}
	return i;
}
async function an(e) {
	let { opts: t, args: n } = H(e, {
		flags: "pv",
		long: {
			parents: "p",
			verbose: "v"
		}
	});
	if (!n.length) throw new b(w("err.missingOperand"), 2);
	let i = 0;
	for (let a of n) {
		let n = t.p ? N(e.cwd, a).map((e, t, n) => "~/" + n.slice(0, n.length - t).join("/")) : [a];
		for (let a of n) {
			let n = e.resolve(a), o = async (t) => {
				await e.error(w("files.cannotRemove", {
					path: a,
					reason: t
				})), i = 1;
			};
			if (!n) {
				await o(w("reason.noSuchFile"));
				break;
			}
			if (n.type !== "folder") {
				await o(w("reason.notADirectory"));
				break;
			}
			if (r.children(n.id).length) {
				await o(w("reason.notEmpty"));
				break;
			}
			if (n.system || n.id === r.root) {
				await o(w("reason.system"));
				break;
			}
			r.trash([n.id]), t.v && await e.out(`${w("rmdir.removed", { path: a })}\n`);
		}
	}
	return i;
}
var on = (e) => C.date(e, {
	dateStyle: "medium",
	timeStyle: "medium"
}), sn = (e) => e.type === "folder" ? w("stat.folder") : e.type === "app" ? w("stat.appLink", { app: e.app }) : e.size ? w("stat.file") : w("stat.emptyFile");
async function cn(e) {
	let { opts: t, args: n } = H(e, {
		values: "c",
		long: { format: "c" }
	});
	if (!n.length) throw new b(w("err.missingOperand"), 2);
	let i = 0;
	for (let a of n) {
		let n = e.resolve(a);
		if (!n) {
			await e.error(Bt(a)), i = 1;
			continue;
		}
		if (t.c != null) {
			let r = {
				n: a,
				N: `'${a}'`,
				s: String(n.size ?? 0),
				F: sn(n),
				Y: String(Math.floor(n.modified / 1e3)),
				y: new Date(n.modified).toISOString(),
				W: String(Math.floor(n.created / 1e3)),
				w: new Date(n.created).toISOString(),
				i: n.id,
				"%": "%"
			};
			await e.out(t.c.replace(/%(.)/g, (e, t) => r[t] ?? e) + "\n");
			continue;
		}
		let o = (n.tags ?? []).map((e) => s.get(e)?.name).filter(Boolean);
		await e.out([
			`  File: ${a}`,
			`  ${w("stat.type", { type: sn(n) })}`,
			`  ${w("stat.path", { path: r.path(n.id) })}`,
			n.type === "folder" ? `  ${w("stat.items", {
				n: r.children(n.id).length,
				total: r.count(n.id)
			})}` : n.type === "file" ? `  ${w("stat.size", {
				size: n.size ?? 0,
				human: Vt(n.size ?? 0)
			})}` : null,
			`  ${w("stat.created", { date: on(n.created) })}`,
			`  ${w("stat.modified", { date: on(n.modified) })}`,
			o.length ? `  ${w("stat.tags", { tags: o.join(", ") })}` : null,
			n.system ? `  ${w("stat.system")}` : null,
			`  Id: ${n.id}`
		].filter(Boolean).join("\n") + "\n");
	}
	return i;
}
function ln(e, t) {
	let n = 0, i = {
		maxdepth: Infinity,
		mindepth: 0
	}, a = [], o = () => {
		let e = s();
		for (; t[n] === "-o" || t[n] === "-or";) {
			n++;
			let t = s(), r = e;
			e = (e) => r(e) || t(e);
		}
		return e;
	}, s = () => {
		let e = c();
		for (;;) {
			if (t[n] === "-a" || t[n] === "-and") n++;
			else if (n >= t.length || t[n] === "-o" || t[n] === "-or" || t[n] === ")") return e;
			let r = c(), i = e;
			e = (e) => i(e) && r(e);
		}
	}, c = () => {
		if (t[n] === "!" || t[n] === "-not") {
			n++;
			let e = c();
			return (t) => !e(t);
		}
		return u();
	}, l = (e) => {
		if (n >= t.length) throw new b(w("find.missingArgument", { name: e }));
		return t[n++];
	}, u = () => {
		let s = t[n++];
		switch (s) {
			case "(": {
				let e = o();
				if (t[n++] !== ")") throw new b(w("err.missingParen"));
				return e;
			}
			case "-name": {
				let e = l(s);
				return (t) => M(e, t.node.name);
			}
			case "-iname": {
				let e = l(s);
				return (t) => M(e, t.node.name, { ignoreCase: !0 });
			}
			case "-path":
			case "-wholename": {
				let e = l(s);
				return (t) => M(e, t.path);
			}
			case "-ipath": {
				let e = l(s);
				return (t) => M(e, t.path, { ignoreCase: !0 });
			}
			case "-type": {
				let e = l(s), t = {
					f: "file",
					d: "folder",
					l: "app"
				}[e];
				if (!t) throw new b(w("find.badType", { type: e }));
				return (e) => e.node.type === t;
			}
			case "-empty": return (e) => e.node.type === "folder" ? !r.children(e.node.id).length : e.node.type === "file" && !e.node.size;
			case "-size": {
				let e = l(s), t = /^([+-]?)(\d+)([ckMG]?)$/.exec(e);
				if (!t) throw new b(w("find.badSize", { value: e }));
				let n = {
					c: 1,
					k: 1024,
					M: 1024 ** 2,
					G: 1024 ** 3,
					"": 512
				}[t[3]], r = Number(t[2]);
				return (e) => {
					if (e.node.type !== "file") return !1;
					let i = Math.ceil((e.node.size ?? 0) / n);
					return t[1] === "+" ? i > r : t[1] === "-" ? i < r : i === r;
				};
			}
			case "-mtime":
			case "-mmin": {
				let e = l(s), t = /^([+-]?)(\d+)$/.exec(e);
				if (!t) throw new b(w("find.badValue", {
					option: s,
					value: e
				}));
				let n = s === "-mtime" ? 864e5 : 6e4;
				return (e) => {
					let r = Math.floor((Date.now() - e.node.modified) / n);
					return t[1] === "+" ? r > +t[2] : t[1] === "-" ? r < +t[2] : r === +t[2];
				};
			}
			case "-newer": {
				let r = e.resolve(l(s));
				if (!r) throw new b(w("find.cannotFind", { path: t[n - 1] }));
				return (e) => e.node.modified > r.modified;
			}
			case "-maxdepth": return i.maxdepth = U(l(s)), () => !0;
			case "-mindepth": return i.mindepth = U(l(s)), () => !0;
			case "-true": return () => !0;
			case "-false": return () => !1;
			case "-print": return i.printed = !0, (e) => (e.out.push(e.path), !0);
			case "-print0": return i.printed = !0, (e) => (e.out.push(e.path + "\0"), !0);
			case "-delete": return i.printed = !0, (e) => (e.deletes.push(e.node.id), !0);
			case "-exec":
			case "-ok": {
				let e = [];
				for (; n < t.length && t[n] !== ";" && t[n] !== "+";) e.push(t[n++]);
				let r = t[n] === "+";
				if (n >= t.length) throw new b(w("find.execEnd"));
				if (n++, !e.length) throw new b(w("find.execCommand"));
				i.printed = !0;
				let o = {
					cmd: e,
					plus: r,
					batch: []
				};
				return a.push(o), (t) => r ? (o.batch.push(t.path), !0) : (t.runs.push(e.map((e) => e.replaceAll("{}", t.path))), !0);
			}
		}
		throw new b(w("find.unknownPredicate", { name: s }));
	}, d = t.length ? o() : () => !0;
	if (n < t.length) throw new b(w("find.unexpected", { arg: t[n] }));
	return {
		expr: d,
		global: i,
		execs: a
	};
}
async function un(e) {
	let t = e.args, n = 0;
	for (; n < t.length && !/^[-(!]/.test(t[n]);) n++;
	let i = n ? t.slice(0, n) : ["."], { expr: a, global: o, execs: s } = ln(e, t.slice(n)), c = 0, l = [], u = async (t) => {
		let n = await e.shell.invoke(t, e.io);
		return n !== 0 && (c = 1), n === 0;
	};
	for (let t of i) {
		let n = e.resolve(t);
		if (!n) {
			await e.error(w("files.quotedNoSuchFile", { path: t })), c = 1;
			continue;
		}
		let i = async (t, n, s) => {
			if (await e.tick(), s >= o.mindepth) {
				let r = {
					node: t,
					path: n,
					out: [],
					deletes: l,
					runs: []
				};
				a(r) && !o.printed && r.out.push(n);
				for (let t of r.out) await e.out(t.endsWith("\0") ? t : t + "\n");
				for (let e of r.runs) await u(e);
			}
			if (t.type === "folder" && s < o.maxdepth) for (let e of [...r.children(t.id)].sort((e, t) => F(e.name, t.name))) await i(e, n.endsWith("/") ? n + e.name : `${n}/${e.name}`, s + 1);
		};
		await i(n, t, 0);
	}
	for (let e of s.filter((e) => e.plus && e.batch.length)) {
		let t = e.cmd.indexOf("{}");
		await u(t < 0 ? [...e.cmd, ...e.batch] : [
			...e.cmd.slice(0, t),
			...e.batch,
			...e.cmd.slice(t + 1)
		]);
	}
	return l.length && r.trash([...l].reverse().filter((e) => r.exists(e))), c;
}
async function dn(e) {
	let { opts: t, args: n } = H(e, {
		flags: "adf",
		values: "L"
	}), r = t.L == null ? Infinity : U(t.L), i = 0, a = 0, o = 0;
	for (let s of n.length ? n : ["."]) {
		let n = e.resolve(s);
		if (!n) {
			await e.error(w("files.quotedNoSuchFile", { path: s })), o = 1;
			continue;
		}
		await e.out(J(e, n, s) + "\n");
		let c = async (n, o, s) => {
			if (s > r) return;
			let l = Gt(qt(n.id, t).filter((e) => !t.d || e.type === "folder"), {});
			for (let n = 0; n < l.length; n++) {
				await e.tick();
				let r = l[n], u = n === l.length - 1, d = t.f ? `${o.replace(/[│├└─ ]/g, "")}${r.name}` : r.name;
				await e.out(`${o}${u ? "└── " : "├── "}${J(e, r, d)}${r.type === "app" ? ` -> app:${r.app}` : ""}\n`), r.type === "folder" ? (i++, await c(r, o + (u ? "    " : "│   "), s + 1)) : a++;
			}
		};
		await c(n, "", 1);
	}
	return await e.out(`\n${w("tree.folders", { n: i })}${t.d ? "" : `, ${w("tree.files", { n: a })}`}\n`), o;
}
async function fn(e) {
	let { opts: t, args: n } = H(e, {
		flags: "az",
		values: "s",
		long: {
			multiple: "a",
			suffix: "s"
		}
	});
	if (!n.length) throw new b(w("err.missingOperand"), 2);
	let r = t.a || t.s != null ? n : [n[0]], i = t.s ?? (t.a ? null : n[1]);
	for (let n of r) {
		let r = n.replace(/\/+$/, "").split("/").pop() || (n.startsWith("/") ? "/" : "");
		i && r.endsWith(i) && r !== i && (r = r.slice(0, -i.length)), await e.out(r + (t.z ? "\0" : "\n"));
	}
}
async function pn(e) {
	if (!e.args.length) throw new b(w("err.missingOperand"), 2);
	for (let t of e.args) {
		let n = t.replace(/\/+$/, ""), r = n.lastIndexOf("/");
		await e.out((r < 0 ? "." : r === 0 ? "/" : n.slice(0, r).replace(/\/+$/, "") || "/") + "\n");
	}
}
async function mn(e) {
	let { opts: t, args: n } = H(e, { flags: "emq" }), i = 0;
	for (let a of n.length ? n : ["."]) {
		let n = e.resolve(a);
		n ? await e.out(r.path(n.id) + "\n") : t.m ? await e.out([r.home, ...N(e.cwd, a)].join("/") + "\n") : (t.q || await e.error(w("err.noSuchFile", { path: a })), i = 1);
	}
	return i;
}
var hn = [
	{
		name: "ls",
		get usage() {
			return w("help.ls.usage");
		},
		get summary() {
			return w("help.ls.summary");
		},
		run: Jt,
		get help() {
			return w("help.ls.text");
		}
	},
	{
		name: "cat",
		usage: "cat [-nbsE] [file…]",
		get summary() {
			return w("help.cat.summary");
		},
		run: Yt,
		get help() {
			return w("help.cat.text");
		}
	},
	{
		name: "mkdir",
		get usage() {
			return w("help.mkdir.usage");
		},
		get summary() {
			return w("help.mkdir.summary");
		},
		run: Zt,
		get help() {
			return w("help.mkdir.text");
		}
	},
	{
		name: "touch",
		usage: "touch [-c] file…",
		get summary() {
			return w("help.touch.summary");
		},
		run: Qt
	},
	{
		name: "cp",
		get usage() {
			return w("help.cp.usage");
		},
		get summary() {
			return w("help.cp.summary");
		},
		run: tn,
		get help() {
			return w("help.cp.text");
		}
	},
	{
		name: "mv",
		get usage() {
			return w("help.mv.usage");
		},
		get summary() {
			return w("help.mv.summary");
		},
		run: nn,
		get help() {
			return w("help.mv.text");
		}
	},
	{
		name: "rm",
		get usage() {
			return w("help.rm.usage");
		},
		get summary() {
			return w("help.rm.summary");
		},
		run: rn,
		get help() {
			return w("help.rm.text");
		}
	},
	{
		name: "rmdir",
		get usage() {
			return w("help.rmdir.usage");
		},
		get summary() {
			return w("help.rmdir.summary");
		},
		run: an
	},
	{
		name: "stat",
		get usage() {
			return w("help.stat.usage");
		},
		get summary() {
			return w("help.stat.summary");
		},
		run: cn,
		get help() {
			return w("help.stat.text");
		}
	},
	{
		name: "find",
		get usage() {
			return w("help.find.usage");
		},
		get summary() {
			return w("help.find.summary");
		},
		run: un,
		get help() {
			return w("help.find.text");
		}
	},
	{
		name: "tree",
		get usage() {
			return w("help.tree.usage");
		},
		get summary() {
			return w("help.tree.summary");
		},
		run: dn
	},
	{
		name: "basename",
		get usage() {
			return w("help.basename.usage");
		},
		get summary() {
			return w("help.basename.summary");
		},
		run: fn
	},
	{
		name: "dirname",
		get usage() {
			return w("help.dirname.usage");
		},
		get summary() {
			return w("help.dirname.summary");
		},
		run: pn
	},
	{
		name: "realpath",
		get usage() {
			return w("help.realpath.usage");
		},
		get summary() {
			return w("help.realpath.summary");
		},
		run: mn
	}
], gn = {
	alpha: "a-zA-Z",
	digit: "0-9",
	alnum: "a-zA-Z0-9",
	upper: "A-Z",
	lower: "a-z",
	space: "\\s",
	blank: " \\t",
	punct: "!-\\/:-@\\[-`{-~",
	xdigit: "0-9A-Fa-f",
	word: "\\w",
	cntrl: "\\x00-\\x1f\\x7f",
	print: "\\x20-\\x7e",
	graph: "\\x21-\\x7e"
}, _n = /* @__PURE__ */ new Set([
	"(",
	")",
	"{",
	"}",
	"|",
	"+",
	"?"
]);
function vn(e, t) {
	let n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (i === "[") {
			let t = r + 1, i = "[";
			for (e[t] === "^" && (i += "^", t++), e[t] === "]" && (i += "\\]", t++); t < e.length && e[t] !== "]"; t++) {
				if (e[t] === "[" && e[t + 1] === ":") {
					let n = e.indexOf(":]", t + 2);
					if (n > 0) {
						i += gn[e.slice(t + 2, n)] ?? "", t = n + 1;
						continue;
					}
				}
				i += e[t] === "\\" ? "\\\\" : e[t] === "[" ? "\\[" : e[t];
			}
			if (t >= e.length) throw new b(w("regex.unmatchedBracket"), 2);
			n += i + "]", r = t;
		} else if (i === "\\" && r + 1 < e.length) {
			let i = e[++r];
			i === "<" || i === ">" ? n += "\\b" : !t && _n.has(i) ? n += i : n += "\\" + i;
		} else !t && _n.has(i) ? n += "\\" + i : i === "*" && (r === 0 || !t && e.slice(0, r).endsWith("\\(")) ? n += "\\*" : n += i;
	}
	return n;
}
function Y(e, { extended: t = !1, fixed: n = !1, ignoreCase: r = !1, word: i = !1, line: a = !1, global: o = !1 } = {}) {
	let s = n ? e.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") : vn(e, t);
	i && (s = `(?<![\\w])(?:${s})(?![\\w])`), a && (s = `^(?:${s})$`);
	try {
		return new RegExp(s, (r ? "i" : "") + (o ? "g" : "") + "u");
	} catch {
		try {
			return new RegExp(s, (r ? "i" : "") + (o ? "g" : ""));
		} catch {
			throw new b(w("regex.invalid", { pattern: e }), 2);
		}
	}
}
// src/terminal/commands/text.js
var yn = (e) => e.stdout === e.shell.host.stdout, bn = (e) => new TextEncoder().encode(e).length;
function X(e) {
	let t = e.split("\n"), n = e.endsWith("\n");
	return (n || e === "") && t.pop(), {
		lines: t,
		ended: n
	};
}
async function xn(e) {
	let { opts: t, args: n } = H(e, {
		flags: "qv",
		values: "nc",
		long: {
			lines: "n",
			bytes: "c",
			quiet: "q"
		},
		number: !0
	}), r = t.n == null ? 10 : U(t.n), i = n.length ? n : ["-"], a = !0;
	for (let n of i) if (i.length > 1 && !t.q && await e.out(`${a ? "" : "\n"}==> ${n === "-" ? "standard input" : n} <==\n`), a = !1, n === "-" && t.c == null && r >= 0) {
		let t = 0;
		for (; t < r;) {
			let n = await e.stdin.readLine();
			if (n == null) break;
			await e.out(n + "\n"), t++;
		}
		e.stdin.close();
	} else for await (let { text: i } of e.inputs([n])) {
		if (t.c != null) {
			let n = U(t.c);
			await e.out(n >= 0 ? i.slice(0, n) : i.slice(0, Math.max(0, i.length + n)));
			continue;
		}
		let { lines: n, ended: a } = X(i), o = r >= 0 ? n.slice(0, r) : n.slice(0, Math.max(0, n.length + r)), s = o.map((e) => e + "\n").join("");
		await e.out(!a && o.length && o.length === n.length ? s.slice(0, -1) : s);
	}
	return +!!e.failed;
}
async function Sn(e) {
	let { opts: t, args: n } = H(e, {
		flags: "qvf",
		values: "nc",
		long: {
			lines: "n",
			bytes: "c",
			quiet: "q"
		},
		number: !0
	}), r = n.length ? n : ["-"], i = !0;
	for await (let { name: n, text: a } of e.inputs(r)) {
		if (r.length > 1 && !t.q && await e.out(`${i ? "" : "\n"}==> ${n === "-" ? "standard input" : n} <==\n`), i = !1, t.c != null) {
			let n = String(t.c), r = U(n.replace(/^[+-]/, ""));
			await e.out(n.startsWith("+") ? a.slice(Math.max(0, r - 1)) : a.slice(Math.max(0, a.length - r)));
			continue;
		}
		let o = String(t.n ?? "10"), { lines: s, ended: c } = X(a), l = U(o.replace(/^[+-]/, "")), u = o.startsWith("+") ? s.slice(Math.max(0, l - 1)) : l === 0 ? [] : s.slice(-l), d = u.map((e) => e + "\n").join("");
		await e.out(!c && u.length ? d.slice(0, -1) : d);
	}
	return +!!e.failed;
}
async function Cn(e) {
	let { opts: t, args: n } = H(e, {
		flags: "lwcmL",
		long: {
			lines: "l",
			words: "w",
			bytes: "c",
			chars: "m"
		}
	}), r = t.l || t.w || t.c || t.m || t.L ? t : {
		l: !0,
		w: !0,
		c: !0
	}, i = [];
	for await (let { name: t, text: r } of e.inputs(n)) i.push({
		name: t === "-" && !n.length ? "" : t,
		l: (r.match(/\n/g) ?? []).length,
		w: (r.match(/\S+/g) ?? []).length,
		c: bn(r),
		m: [...r].length,
		L: Math.max(0, ...r.split("\n").map((e) => e.length))
	});
	i.length > 1 && i.push({
		name: w("wc.total"),
		...Object.fromEntries([
			"l",
			"w",
			"c",
			"m"
		].map((e) => [e, i.reduce((t, n) => t + n[e], 0)])),
		L: Math.max(...i.map((e) => e.L))
	});
	let a = [
		"l",
		"w",
		"m",
		"c",
		"L"
	].filter((e) => r[e]), o = a.length === 1 && i.length === 1 ? 0 : Math.max(...i.flatMap((e) => a.map((t) => String(e[t]).length)));
	for (let t of i) await e.out(a.map((e) => String(t[e]).padStart(o)).join(" ") + (t.name ? ` ${t.name}` : "") + "\n");
	return +!!e.failed;
}
async function wn(e) {
	let { opts: t, args: n } = H(e, {
		flags: "ivnclLrRwxEFoqsHhGPz",
		values: "mABC",
		multi: "ef",
		long: {
			"ignore-case": "i",
			"invert-match": "v",
			"line-number": "n",
			count: "c",
			"files-with-matches": "l",
			"files-without-match": "L",
			recursive: "r",
			"word-regexp": "w",
			"line-regexp": "x",
			"extended-regexp": "E",
			"fixed-strings": "F",
			"only-matching": "o",
			quiet: "q",
			silent: "q",
			"no-messages": "s",
			"with-filename": "H",
			"no-filename": "h",
			regexp: "e",
			file: "f",
			"max-count": "m",
			"after-context": "A",
			"before-context": "B",
			context: "C",
			color: "K",
			colour: "K"
		}
	}), i = [...n], a = t.e ?? [];
	for (let n of t.f ?? []) {
		let t = e.resolve(n);
		if (t?.type !== "file") throw new b(w("err.noSuchFile", { path: n }), 2);
		a.push(...(await r.read(t.id)).split("\n").filter(Boolean));
	}
	if (!a.length) {
		if (!i.length) throw new b(w("grep.noPattern"), 2);
		a = [i.shift()];
	}
	let o = {
		extended: t.E || t.P,
		fixed: t.F,
		ignoreCase: t.i,
		word: t.w,
		line: t.x
	}, s = a.map((e) => Y(e, o)), c = a.map((e) => Y(e, {
		...o,
		global: !0
	})), l = yn(e), u = t.r || t.R, d = [], f = (e, t) => {
		if (e.type === "file") d.push(t);
		else if (e.type === "folder") for (let n of [...r.children(e.id)].sort((e, t) => F(e.name, t.name))) f(n, t.endsWith("/") ? t + n.name : `${t}/${n.name}`);
	};
	if (u) for (let n of i.length ? i : ["."]) {
		let r = e.resolve(n);
		r ? f(r, n) : (t.s || await e.error(w("err.noSuchFile", { path: n })), e.failed = !0);
	}
	else d.push(...i);
	let p = t.H || (d.length > 1 || u) && !t.h, m = U(t.A ?? t.C ?? 0), h = U(t.B ?? t.C ?? 0), g = t.m == null ? Infinity : U(t.m), _ = !1, v = (e) => l ? `\x1b[1;31m${e}\x1b[0m` : e, y = (e, n, r) => (p ? l ? `\x1b[35m${e}\x1b[0m${r}` : e + r : "") + (t.n ? l ? `\x1b[32m${n}\x1b[0m${r}` : n + r : ""), x = async (n, r) => {
		let { lines: i } = X(r), a = 0, o = -1, u = 0;
		for (let r = 0; r < i.length && a < g; r++) {
			r % 2e3 == 0 && await e.tick();
			let d = i[r];
			if (s.some((e) => e.test(d)) === !!t.v) u > 0 && !t.c && !t.l && !t.L && !t.q && (await e.out(y(n, r + 1, "-") + d + "\n"), o = r, u--);
			else {
				if (a++, _ = !0, t.q) return a;
				if (!(t.c || t.l || t.L)) {
					(h || m) && o >= 0 && r - h > o + 1 && await e.out(l ? "\x1B[36m--\x1B[0m\n" : "--\n");
					for (let t = Math.max(o + 1, r - h); t < r; t++) await e.out(y(n, t + 1, "-") + i[t] + "\n");
					if (t.o && !t.v) for (let t of c) for (let i of d.matchAll(t)) i[0] && await e.out(y(n, r + 1, ":") + v(i[0]) + "\n");
					else {
						let i = d;
						if (l && !t.v) for (let e of c) i = i.replace(e, (e) => e && v(e));
						await e.out(y(n, r + 1, ":") + i + "\n");
					}
					o = r, u = m;
				}
			}
		}
		return a;
	}, S = d.length ? d : ["-"];
	for (let n of S) {
		let i, a = n === "-" ? "(standard input)" : n;
		if (n === "-") i = await e.stdin.readAll();
		else {
			let a = e.resolve(n);
			if (!a) {
				t.s || await e.error(w("err.noSuchFile", { path: n })), e.failed = !0;
				continue;
			}
			if (a.type === "folder") {
				t.s || await e.error(w("err.isADirectory", { path: n }));
				continue;
			}
			if (a.type !== "file") continue;
			i = await r.read(a.id);
		}
		let o = await x(a, i);
		if (t.q && _) return 0;
		t.c && await e.out((p ? `${a}:` : "") + o + "\n"), t.l && o && await e.out(a + "\n"), t.L && !o && await e.out(a + "\n");
	}
	return e.failed && !t.q ? 2 : +!_;
}
function Tn(e, t, n) {
	if (!t) return e;
	let r = n == null ? e.trim().split(/\s+/) : e.split(n), i = t.end ?? r.length;
	return r.slice(t.start - 1, i).join(n ?? " ");
}
var En = {
	K: 1e3,
	M: 1e6,
	G: 1e9,
	T: 0xe8d4a51000,
	k: 1e3
}, Dn = (e) => {
	let t = /^\s*([+-]?\d*[.,]?\d+)/.exec(e);
	return t ? Number(t[1].replace(",", ".")) : 0;
};
async function On(e) {
	let { opts: t, args: n } = H(e, {
		flags: "rnufhbVsc",
		values: "kto",
		long: {
			reverse: "r",
			"numeric-sort": "n",
			unique: "u",
			"ignore-case": "f",
			"human-numeric-sort": "h",
			key: "k",
			"field-separator": "t",
			output: "o"
		}
	}), i = [];
	for await (let { text: t } of e.inputs(n)) i.push(...X(t).lines);
	let a = null;
	if (t.k) {
		let e = /^(\d+)(?:\.\d+)?[a-zA-Z]*(?:,(\d+)(?:\.\d+)?[a-zA-Z]*)?$/.exec(t.k);
		if (!e) throw new b(w("sort.badKey", { key: t.k }), 2);
		a = {
			start: Number(e[1]),
			end: e[2] ? Number(e[2]) : null
		}, /n/.test(t.k) && (t.n = !0), /r/.test(t.k) && (t.r = !0);
	}
	let o = (e) => {
		let n = Tn(e, a, t.t);
		return t.b && (n = n.trim()), t.f && (n = n.toLowerCase()), n;
	}, s = (e, n) => {
		let r = o(e), i = o(n);
		if (t.n) return Dn(r) - Dn(i) || F(e, n);
		if (t.h) {
			let t = (e) => {
				let t = /^\s*([+-]?\d*\.?\d+)([KMGTk]?)/.exec(e);
				return t ? Number(t[1]) * (En[t[2]] ?? 1) : 0;
			};
			return t(r) - t(i) || F(e, n);
		}
		return t.V ? r.localeCompare(i, void 0, { numeric: !0 }) : F(r, i) || (r < i ? -1 : +(r > i));
	};
	if (t.c) {
		for (let t = 1; t < i.length; t++) if (s(i[t - 1], i[t]) > 0) return await e.error(w("sort.disorder", {
			n: t + 1,
			line: i[t]
		})), 1;
		return 0;
	}
	i.sort(t.r ? (e, t) => s(t, e) : s), t.u && (i = i.filter((e, t) => t === 0 || s(i[t - 1], e) !== 0));
	let c = i.map((e) => e + "\n").join("");
	if (t.o) {
		let n = e.shell.fileFor(t.o).id;
		await r.write(n, c);
	} else await e.out(c);
	return e.failed ? 2 : 0;
}
async function kn(e) {
	let { opts: t, args: n } = H(e, {
		flags: "cdui",
		values: "fs",
		long: {
			count: "c",
			repeated: "d",
			unique: "u",
			"ignore-case": "i",
			"skip-fields": "f",
			"skip-chars": "s"
		}
	}), [i, a] = n, o = [];
	for await (let { text: t } of e.inputs(i ? [i] : [])) o = X(t).lines;
	let s = (e) => {
		let n = e;
		return t.f && (n = n.replace(RegExp(`^(\\s*\\S+){${U(t.f)}}`), "")), t.s && (n = n.slice(U(t.s))), t.i ? n.toLowerCase() : n;
	}, c = "";
	for (let e = 0; e < o.length;) {
		let n = e + 1;
		for (; n < o.length && s(o[n]) === s(o[e]);) n++;
		let r = n - e;
		(!t.d || r > 1) && (!t.u || r === 1) && (c += (t.c ? `${String(r).padStart(7)} ` : "") + o[e] + "\n"), e = n;
	}
	return a ? await r.write(e.shell.fileFor(a).id, c) : await e.out(c), +!!e.failed;
}
async function An(e) {
	let { opts: t, args: n } = H(e, {
		flags: "ai",
		long: { append: "a" }
	}), i = n.map((t) => ({
		path: t,
		id: e.shell.fileFor(t).id
	})), a = "";
	for (let t; (t = await e.stdin.read()) != null;) a += t, await e.out(t);
	for (let e of i) {
		let n = t.a ? await r.read(e.id) : "";
		await r.write(e.id, n + a);
	}
}
function jn(e) {
	let t = String(e).split(",").map((t) => {
		let n = /^(\d*)(-?)(\d*)$/.exec(t);
		if (!n || !n[1] && !n[3]) throw new b(w("cut.badList", { spec: e }), 2);
		let r = n[1] ? Number(n[1]) : 1;
		return [r, n[2] ? n[3] ? Number(n[3]) : Infinity : r];
	});
	return (e) => t.some(([t, n]) => e >= t && e <= n);
}
async function Mn(e) {
	let { opts: t, args: n } = H(e, {
		flags: "s",
		values: "dfcb",
		long: {
			delimiter: "d",
			fields: "f",
			characters: "c",
			bytes: "b",
			"only-delimited": "s",
			"output-delimiter": "O"
		}
	});
	if (!t.f && !t.c && !t.b) throw new b(w("cut.noList"), 2);
	let r = t.d ?? "	";
	if (r.length !== 1) throw new b(w("cut.badDelimiter"), 2);
	let i = t.O ?? r, a = "";
	for await (let { text: o } of e.inputs(n)) for (let e of X(o).lines) if (t.f) {
		if (!e.includes(r)) {
			t.s || (a += e + "\n");
			continue;
		}
		let n = jn(t.f);
		a += e.split(r).filter((e, t) => n(t + 1)).join(i) + "\n";
	} else {
		let n = jn(t.c ?? t.b);
		a += [...e].filter((e, t) => n(t + 1)).join("") + "\n";
	}
	return await e.out(a), +!!e.failed;
}
var Z = {
	upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	lower: "abcdefghijklmnopqrstuvwxyz",
	digit: "0123456789",
	space: " 	\n\r\f\v",
	blank: " 	",
	punct: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
};
Z.alpha = Z.upper + Z.lower, Z.alnum = Z.alpha + Z.digit, Z.xdigit = "0123456789ABCDEFabcdef";
function Nn(e) {
	let t = [], n = [];
	for (let t = 0; t < e.length; t++) {
		if (e[t] === "[" && e[t + 1] === ":") {
			let r = e.indexOf(":]", t + 2), i = Z[e.slice(t + 2, r)];
			if (r > 0 && i) {
				n.push(...[...i].map((e) => ({
					c: e,
					cls: !0
				}))), t = r + 1;
				continue;
			}
		}
		if (e[t] === "\\" && t + 1 < e.length) {
			let r = e[++t], i = {
				n: "\n",
				t: "	",
				r: "\r",
				"\\": "\\",
				a: "\x07",
				b: "\b",
				f: "\f",
				v: "\v"
			}[r];
			if (i) {
				n.push({ c: i });
				continue;
			}
			let a = /^[0-7]{1,3}/.exec(e.slice(t));
			if (a) {
				n.push({ c: String.fromCharCode(parseInt(a[0], 8)) }), t += a[0].length - 1;
				continue;
			}
			n.push({ c: r });
		} else n.push({ c: e[t] });
	}
	for (let e = 0; e < n.length; e++) if (n[e + 1]?.c === "-" && n[e + 2] && !n[e].cls && !n[e + 1].cls) {
		let r = n[e].c.codePointAt(0), i = n[e + 2].c.codePointAt(0);
		if (r > i) throw new b(w("tr.reverseRange", { range: `${n[e].c}-${n[e + 2].c}` }));
		for (let e = r; e <= i; e++) t.push(String.fromCodePoint(e));
		e += 2;
	} else t.push(n[e].c);
	return t;
}
async function Pn(e) {
	let { opts: t, args: n } = H(e, {
		flags: "dscC",
		long: {
			delete: "d",
			"squeeze-repeats": "s",
			complement: "c"
		}
	});
	if (!n.length) throw new b(w("err.missingOperand"), 2);
	let r = Nn(n[0]), i = n[1] == null ? null : Nn(n[1]);
	if (!t.d && !t.s && !i) throw new b(w("tr.missingSet2", { set: n[0] }), 2);
	let a = t.c || t.C, o = a ? (e) => !r.includes(e) : (e) => r.includes(e), s = await e.stdin.readAll(), c = "", l = /* @__PURE__ */ new Map();
	i && !t.d && !a && r.forEach((e, t) => l.set(e, i[Math.min(t, i.length - 1)]));
	let u = t.s ? new Set(i && !t.d ? i : i ?? r) : null, d = null;
	for (let e of s) {
		if (t.d && o(e)) continue;
		let n = e;
		!t.d && i && (n = a ? o(e) ? i.at(-1) : e : l.get(e) ?? e), u && n === d && (t.d || i ? u.has(n) : o(n)) || (c += n, d = n);
	}
	await e.out(c);
}
async function Fn(e) {
	let t = "";
	for await (let { text: n } of e.inputs(e.args)) {
		let { lines: e } = X(n);
		t += e.map((e) => [...e].reverse().join("") + "\n").join("");
	}
	return await e.out(t), +!!e.failed;
}
async function In(e) {
	let { opts: t, args: n } = H(e, { values: "bwsv" }), r = t.b === "a", i = t.w == null ? 6 : U(t.w), a = t.s ?? "	", o = t.v == null ? 1 : U(t.v), s = "";
	for await (let { text: t } of e.inputs(n)) for (let e of X(t).lines) s += r || e.trim() ? `${String(o++).padStart(i)}${a}${e}\n` : `${" ".repeat(i)}${a}${e}\n`.replace(/^\s+\t\n$/, "\n");
	await e.out(s);
}
async function Ln(e) {
	let { opts: t, args: n } = H(e, {
		flags: "w",
		values: "sf",
		long: {
			separator: "s",
			"equal-width": "w",
			format: "f"
		}
	}), r = n.map((e) => {
		if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(e)) throw new b(w("seq.badArgument", { value: e }), 2);
		return Number(e);
	});
	if (!r.length || r.length > 3) throw new b(w("help.usageShort", { usage: w("help.seq.usage") }), 2);
	let [i, a, o] = r.length === 1 ? [
		1,
		1,
		r[0]
	] : r.length === 2 ? [
		r[0],
		1,
		r[1]
	] : r;
	if (a === 0) throw new b(w("seq.zeroStep"), 2);
	let s = Math.max(...n.map((e) => (e.split(".")[1] ?? "").length)), c = t.s ?? "\n", l = (e) => {
		let n = e.toFixed(s);
		if (t.w) {
			let e = Math.max(i.toFixed(s).length, o.toFixed(s).length), t = n.startsWith("-");
			n = (t ? "-" : "") + n.replace("-", "").padStart(e - +!!t, "0");
		}
		return n;
	}, u = "", d = 0;
	for (let t = 0;; t++) {
		let n = i + t * a;
		if (a > 0 ? n > o + 1e-9 : n < o - 1e-9) break;
		u += (d++ ? c : "") + l(n), u.length > 65536 && (await e.out(u), u = "", await e.tick());
	}
	await e.out(u + (d ? "\n" : ""));
}
async function Rn(e) {
	let t = (e.args.length ? e.args.join(" ") : "y") + "\n", n = t.repeat(Math.max(1, Math.floor(4096 / t.length)));
	for (;;) await e.out(n), await e.tick();
}
function zn(e) {
	let t = [], n = "", r = !1, i = null;
	for (let a = 0; a < e.length; a++) {
		let o = e[a];
		i ? o === i ? i = null : n += o : o === "\"" || o === "'" ? (i = o, r = !0) : o === "\\" && a + 1 < e.length ? (n += e[++a], r = !0) : /\s/.test(o) ? (r && t.push(n), n = "", r = !1) : (n += o, r = !0);
	}
	if (i) throw new b(w(i === "\"" ? "xargs.unmatchedDouble" : "xargs.unmatchedSingle"));
	return r && t.push(n), t;
}
async function Bn(e) {
	let { opts: t, args: n } = H(e, {
		flags: "0rtpx",
		values: "nIdLP",
		long: {
			null: "0",
			"no-run-if-empty": "r",
			verbose: "t",
			"max-args": "n",
			replace: "I",
			delimiter: "d",
			"max-lines": "L"
		},
		stopAtArg: !0
	}), r = n.length ? n : ["echo"], i = await e.stdin.readAll(), a;
	a = t[0] ? i.split("\0").filter((e, t, n) => e !== "" || t < n.length - 1) : t.d == null ? t.I != null || t.L != null ? i.split("\n").map((e) => e.trim()).filter(Boolean) : zn(i) : i.split(t.d.replace(/\\n/, "\n").replace(/\\t/, "	")).filter((e, t, n) => e !== "" || t < n.length - 1), t.d != null && a.at(-1)?.endsWith("\n") && (a[a.length - 1] = a.at(-1).slice(0, -1));
	let o = [];
	if (t.I != null) for (let e of a) o.push(r.map((n) => n.replaceAll(t.I, e)));
	else {
		let e = t.n == null ? t.L == null ? Infinity : U(t.L) : U(t.n);
		if (e < 1) throw new b(w("xargs.badCount"), 2);
		for (let n = 0; n < a.length; n += e === Infinity ? a.length : e) {
			let i = t.L == null ? a.slice(n, n + (e === Infinity ? a.length : e)) : a.slice(n, n + e).flatMap(zn);
			o.push([...r, ...i]);
		}
		!a.length && !t.r && o.push([...r]);
	}
	let s = 0;
	for (let n of o) {
		(t.t || t.p) && await e.err(n.join(" ") + "\n");
		let r = await e.shell.invoke(n, {
			stdin: new z(),
			stdout: e.stdout,
			stderr: e.stderr
		});
		if (r === 127) return 127;
		r !== 0 && (s = 123);
	}
	return s;
}
var Vn = [
	{
		name: "head",
		get usage() {
			return w("help.head.usage");
		},
		get summary() {
			return w("help.head.summary");
		},
		run: xn,
		get help() {
			return w("help.head.text");
		}
	},
	{
		name: "tail",
		get usage() {
			return w("help.tail.usage");
		},
		get summary() {
			return w("help.tail.summary");
		},
		run: Sn,
		get help() {
			return w("help.tail.text");
		}
	},
	{
		name: "wc",
		usage: "wc [-lwcmL] [file…]",
		get summary() {
			return w("help.wc.summary");
		},
		run: Cn,
		get help() {
			return w("help.wc.text");
		}
	},
	{
		name: "grep",
		get usage() {
			return w("help.grep.usage");
		},
		get summary() {
			return w("help.grep.summary");
		},
		run: wn,
		get help() {
			return w("help.grep.text");
		}
	},
	{
		name: "sort",
		get usage() {
			return w("help.sort.usage");
		},
		get summary() {
			return w("help.sort.summary");
		},
		run: On,
		get help() {
			return w("help.sort.text");
		}
	},
	{
		name: "uniq",
		usage: "uniq [-cdui] [input [output]]",
		get summary() {
			return w("help.uniq.summary");
		},
		run: kn,
		get help() {
			return w("help.uniq.text");
		}
	},
	{
		name: "tee",
		usage: "tee [-a] [file…]",
		get summary() {
			return w("help.tee.summary");
		},
		run: An,
		get help() {
			return w("help.tee.text");
		}
	},
	{
		name: "cut",
		get usage() {
			return w("help.cut.usage");
		},
		get summary() {
			return w("help.cut.summary");
		},
		run: Mn,
		get help() {
			return w("help.cut.text");
		}
	},
	{
		name: "tr",
		get usage() {
			return w("help.tr.usage");
		},
		get summary() {
			return w("help.tr.summary");
		},
		run: Pn,
		get help() {
			return w("help.tr.text");
		}
	},
	{
		name: "rev",
		usage: "rev [file…]",
		get summary() {
			return w("help.rev.summary");
		},
		run: Fn
	},
	{
		name: "nl",
		usage: "nl [-b a] [file…]",
		get summary() {
			return w("help.nl.summary");
		},
		run: In
	},
	{
		name: "seq",
		get usage() {
			return w("help.seq.usage");
		},
		get summary() {
			return w("help.seq.summary");
		},
		run: Ln,
		get help() {
			return w("help.seq.text");
		}
	},
	{
		name: "yes",
		get usage() {
			return w("help.yes.usage");
		},
		get summary() {
			return w("help.yes.summary");
		},
		run: Rn
	},
	{
		name: "xargs",
		get usage() {
			return w("help.xargs.usage");
		},
		get summary() {
			return w("help.xargs.summary");
		},
		run: Bn,
		get help() {
			return w("help.xargs.text");
		}
	}
];
// src/terminal/commands/sed.js
function Hn(e, t) {
	let n = [], r = [], i = 0, a = () => e[i], o = () => {
		for (; i < e.length && /[ \t]/.test(e[i]);) i++;
	}, s = (e) => {
		throw new b(w("sed.at", {
			pos: i,
			message: e
		}));
	}, c = (t, n) => {
		let r = "";
		for (;;) {
			i >= e.length && s(w("sed.unterminated"));
			let a = e[i++];
			if (a === t) return r;
			if (a === "\\") {
				let a = e[i++];
				r += a === t ? t === "&" && !n ? "\\&" : t : a === "n" && !n ? "\n" : "\\" + (a ?? "");
			} else r += a === "\n" && !n ? "\n" : a;
		}
	}, l = (t) => {
		let n = c(t, !0), r = "";
		for (; e[i] === "I" || e[i] === "M";) r += e[i++];
		return {
			re: n,
			ignoreCase: r.includes("I")
		};
	}, u = () => {
		o();
		let t = a();
		if (/\d/.test(t ?? "")) {
			let t = /^\d+/.exec(e.slice(i));
			if (i += t[0].length, e[i] === "~") {
				i++;
				let n = /^\d+/.exec(e.slice(i))?.[0] ?? "0";
				return i += n.length, { step: [Number(t[0]), Number(n)] };
			}
			return { line: Number(t[0]) };
		}
		if (t === "$") return i++, { last: !0 };
		if (t === "/") return i++, l("/");
		if (t === "\\") {
			i++;
			let t = e[i++];
			return l(t);
		}
		return null;
	}, d = () => {
		o();
		let t = /^[^;\n}]*/.exec(e.slice(i));
		return i += t[0].length, t[0].trim();
	}, f = () => {
		o(), a() === "\\" && (i++, a() === "\n" && i++);
		let t = "";
		for (; i < e.length && e[i] !== "\n";) e[i] === "\\" && i + 1 < e.length ? (t += e[i + 1] === "n" ? "\n" : e[i + 1], i += 2) : t += e[i++];
		return t;
	};
	for (; i < e.length;) {
		for (; i < e.length && /[\s;]/.test(e[i]);) i++;
		if (i >= e.length) break;
		if (a() === "#") {
			for (; i < e.length && e[i] !== "\n";) i++;
			continue;
		}
		let t = {
			a1: u(),
			a2: null,
			neg: !1,
			active: !1
		};
		if (t.a1 && (o(), a() === ",")) {
			if (i++, o(), a() === "+") {
				i++;
				let n = /^\d+/.exec(e.slice(i));
				n || s(w("sed.badAddress")), i += n[0].length, t.a2 = { plus: Number(n[0]) };
			} else t.a2 = u(), t.a2 || s(w("sed.missingAddress"));
		}
		for (o(); a() === "!";) t.neg = !t.neg, i++, o();
		let l = e[i++];
		switch (l ?? s(w("sed.missingCommand")), t.type = l, l) {
			case "{":
				r.push(n.length);
				break;
			case "}":
				r.length || s(w("sed.unexpectedBrace")), n[r.pop()].end = n.length;
				break;
			case "s": {
				let n = e[i++];
				n && n !== "\n" && n !== "\\" || s(w("sed.badDelimiter")), t.re = c(n, !0), t.rep = c(n, !1);
				let r = /^[gGiIpPe0-9mM]*/.exec(e.slice(i));
				i += r[0].length, t.global = /g/i.test(r[0]), t.print = /p/i.test(r[0]), t.ignoreCase = /i/i.test(r[0]), t.nth = Number(/\d+/.exec(r[0])?.[0] ?? 1);
				break;
			}
			case "y": {
				let n = e[i++], r = [...c(n, !1)], a = [...c(n, !1)];
				r.length !== a.length && s(w("sed.yLengths")), t.map = new Map(r.map((e, t) => [e, a[t]]));
				break;
			}
			case "a":
			case "i":
			case "c":
				t.text = f();
				break;
			case ":":
				t.label = d(), t.label || s(w("sed.noLabel"));
				break;
			case "b":
			case "t":
			case "T":
				t.label = d();
				break;
			case "q":
			case "Q": {
				o();
				let n = /^\d+/.exec(e.slice(i));
				t.code = n ? Number(n[0]) : 0, n && (i += n[0].length);
				break;
			}
			case "r":
			case "w":
				t.file = f();
				break;
			case "d":
			case "D":
			case "p":
			case "P":
			case "=":
			case "n":
			case "N":
			case "h":
			case "H":
			case "g":
			case "G":
			case "x":
			case "l":
			case "z": break;
			default: s(w("sed.unknownCommand", { cmd: l }));
		}
		n.push(t);
	}
	r.length && s(w("sed.unmatchedBrace"));
	let p = new Map(n.map((e, t) => [e, t]).filter(([e]) => e.type === ":").map(([e, t]) => [e.label, t]));
	for (let e of n) {
		if ((e.type === "b" || e.type === "t" || e.type === "T") && e.label && !p.has(e.label)) throw new b(w("sed.noSuchLabel", { label: e.label }));
		for (let n of [e.a1, e.a2]) n?.re != null && (n.compiled = n.re === "" ? null : Y(n.re, {
			extended: t,
			ignoreCase: n.ignoreCase
		}));
		e.type === "s" && (e.compiled = e.re === "" ? null : Y(e.re, {
			extended: t,
			ignoreCase: e.ignoreCase,
			global: !0
		}));
	}
	return {
		cmds: n,
		labels: p
	};
}
function Un(e, t) {
	let n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (i === "&") n += t[0];
		else if (i === "\\" && r + 1 < e.length) {
			let i = e[++r];
			/\d/.test(i) ? n += t[Number(i)] ?? "" : n += i === "n" ? "\n" : i === "t" ? "	" : i;
		} else n += i;
	}
	return n;
}
async function Wn(e, t, n, { quiet: i, write: a }) {
	let { cmds: o, labels: s } = t, c = "", l = null, u = 0, d = 0, f = !1;
	for (let e of o) e.active = !1;
	let p = () => u >= n.length, m = (e, t, n) => {
		if (e.line != null) return n === e.line;
		if (e.last) return p();
		if (e.step) return e.step[1] > 0 ? n >= e.step[0] && (n - e.step[0]) % e.step[1] === 0 : n === e.step[0];
		let r = e.compiled ?? l;
		if (!r) throw new b(w("sed.noPreviousRegex"));
		return l = r, r.test(t);
	}, h = (e, t, n) => {
		let r;
		return e.a1 ? e.a2 ? e.active ? (r = !0, (e.a2.line == null ? e.a2.plus == null ? m(e.a2, t, n) : n >= e.end2 : n >= e.a2.line) && (e.active = !1)) : m(e.a1, t, n) ? (r = !0, e.active = !0, e.a2.line != null && e.a2.line <= n && (e.active = !1), e.a2.plus != null && (e.end2 = n + e.a2.plus, e.a2.plus === 0 && (e.active = !1))) : r = !1 : r = m(e.a1, t, n) : r = !0, e.neg ? !r : r;
	}, g = 0;
	for (; !f && u < n.length;) {
		let t = n[u++];
		g++;
		let m = "", _ = !1, v = !i, y = !1;
		await e.tick();
		cycle: for (;;) {
			for (let x = 0; x < o.length; x++) {
				let S = o[x];
				if (S.type !== "}" && S.type !== ":") {
					if (!h(S, t, g)) S.type === "{" && (x = S.end);
					else switch (S.type) {
						case "{": break;
						case "s": {
							let n = S.compiled ?? l;
							if (!n) throw new b(w("sed.noPreviousRegex"));
							l = n;
							let r = 0, i = !1, a = t.replace(new RegExp(n.source, n.flags.includes("g") ? n.flags : n.flags + "g"), (...e) => {
								let t = typeof e.at(-1) == "object" && e.at(-1) !== null, n = e.slice(0, t ? -3 : -2);
								return r++, r < S.nth || i && !S.global ? n[0] : (i = !0, Un(S.rep, n));
							});
							i && (t = a, _ = !0, S.print && await e.out(t + "\n"));
							break;
						}
						case "y":
							t = [...t].map((e) => S.map.get(e) ?? e).join("");
							break;
						case "d":
							v = !1;
							break cycle;
						case "D":
							if (!t.includes("\n")) {
								v = !1;
								break cycle;
							}
							t = t.slice(t.indexOf("\n") + 1), y = !0, v = !1;
							break cycle;
						case "p":
							await e.out(t + "\n");
							break;
						case "P":
							await e.out(t.split("\n")[0] + "\n");
							break;
						case "=":
							await e.out(g + "\n");
							break;
						case "l":
							await e.out(JSON.stringify(t).slice(1, -1) + "$\n");
							break;
						case "z":
							t = "";
							break;
						case "a":
							m += S.text + "\n";
							break;
						case "i":
							await e.out(S.text + "\n");
							break;
						case "c":
							S.a2 && S.active || await e.out(S.text + "\n"), v = !1;
							break cycle;
						case "q":
							f = !0, d = S.code;
							break cycle;
						case "Q":
							f = !0, d = S.code, v = !1;
							break cycle;
						case "n":
							if (i || await e.out(t + "\n"), m &&= (await e.out(m), ""), p()) {
								v = !1, f = !0;
								break cycle;
							}
							t = n[u++], g++;
							break;
						case "N":
							if (p()) {
								f = !0;
								break cycle;
							}
							t += "\n" + n[u++], g++;
							break;
						case "h":
							c = t;
							break;
						case "H":
							c += "\n" + t;
							break;
						case "g":
							t = c;
							break;
						case "G":
							t += "\n" + c;
							break;
						case "x":
							[t, c] = [c, t];
							break;
						case "b":
							if (!S.label) break cycle;
							x = s.get(S.label);
							break;
						case "t":
						case "T":
							if (_ === (S.type === "t")) {
								if (_ = !1, !S.label) break cycle;
								x = s.get(S.label);
							}
							break;
						case "r": {
							let t = e.resolve(S.file);
							t?.type === "file" && (m += await r.read(t.id));
							break;
						}
						case "w": a(S.file, t + "\n");
					}
				}
			}
			break;
		}
		v && await e.out(t + "\n"), m && await e.out(m), y && !f && (n.splice(u, 0, t), g--);
	}
	return d;
}
async function Gn(e) {
	let { opts: t, args: n } = H(e, {
		flags: "nEris",
		values: "I",
		multi: "ef",
		long: {
			quiet: "n",
			silent: "n",
			expression: "e",
			file: "f",
			"in-place": "i",
			"regexp-extended": "E",
			separate: "s"
		}
	}), i = [...n], a = [...t.e ?? []];
	for (let n of t.f ?? []) {
		let t = e.resolve(n);
		if (t?.type !== "file") throw new b(w("sed.cannotRead", { path: n }));
		a.push(await r.read(t.id));
	}
	if (!a.length) {
		if (!i.length) throw new b(w("sed.noScript"), 1);
		a.push(i.shift());
	}
	let o = Hn(a.join("\n"), t.E || t.r), s = /* @__PURE__ */ new Map(), c = (e, t) => s.set(e, (s.get(e) ?? "") + t), l = 0;
	if (t.i || t.I != null) {
		if (!i.length) throw new b(w("sed.noFiles"));
		for (let n of i) {
			let i = e.resolve(n);
			if (i?.type !== "file") {
				await e.error(w("sed.cannotRead", { path: n })), l = 2;
				continue;
			}
			let { lines: a, ended: s } = Kn(await r.read(i.id)), u = "";
			l = await Wn({
				...e,
				out: (e) => {
					u += e;
				},
				tick: () => e.tick(),
				resolve: (t) => e.resolve(t)
			}, o, a, {
				quiet: t.n,
				write: c
			}) || l, await r.write(i.id, s || !u.endsWith("\n") ? u : u.slice(0, -1));
		}
	} else {
		let n = i.length ? i : ["-"], r = [], a = !0;
		for await (let { text: t } of e.inputs(n)) {
			let e = Kn(t);
			r.push(...e.lines), a = e.ended;
		}
		let s = "";
		l = await Wn({
			...e,
			out: (e) => {
				s += e;
			},
			tick: () => e.tick(),
			resolve: (t) => e.resolve(t)
		}, o, r, {
			quiet: t.n,
			write: c
		}), await e.out(a || !s.endsWith("\n") ? s : s.slice(0, -1)), e.failed && (l = 2);
	}
	for (let [t, n] of s) await r.write(e.shell.fileFor(t).id, n);
	return l;
}
function Kn(e) {
	let t = e.split("\n"), n = e.endsWith("\n") || e === "";
	return n && t.pop(), {
		lines: t,
		ended: n
	};
}
var qn = [{
	name: "sed",
	usage: "sed [-nEi] [-e script] [script] [file…]",
	get summary() {
		return w("help.sed.summary");
	},
	run: Gn,
	get help() {
		return w("help.sed.text");
	}
}];
// src/terminal/commands/diff.js
function Jn(e, t, n = (e, t) => e === t) {
	let r = 0, i = 0;
	for (; r < e.length && r < t.length && n(e[r], t[r]);) r++;
	for (; i < e.length - r && i < t.length - r && n(e[e.length - 1 - i], t[t.length - 1 - i]);) i++;
	let a = Xn(e.slice(r, e.length - i), t.slice(r, t.length - i), n);
	for (let e of a) e.a += r, e.b += r;
	return a;
}
var Yn = 4e7;
function Xn(e, t, n) {
	let r = e.length, i = t.length, a = r + i, o = new Int32Array(2 * a + 2), s = [], c = !1;
	for (let l = 0; l <= a && !c; l++) {
		if ((l + 1) * o.length > Yn) throw new b(w("diff.tooBig"), 2);
		s.push(o.slice());
		for (let s = -l; s <= l; s += 2) {
			let u = s === -l || s !== l && o[a + s - 1] < o[a + s + 1] ? o[a + s + 1] : o[a + s - 1] + 1, d = u - s;
			for (; u < r && d < i && n(e[u], t[d]);) u++, d++;
			if (o[a + s] = u, u >= r && d >= i) {
				c = !0;
				break;
			}
		}
	}
	let l = [], u = r, d = i;
	for (let e = s.length - 1; e > 0; e--) {
		let t = s[e], n = u - d, r = n === -e || n !== e && t[a + n - 1] < t[a + n + 1] ? n + 1 : n - 1, i = t[a + r], o = i - r;
		for (; u > i && d > o;) u--, d--;
		l.push(u === i ? {
			op: "ins",
			a: u,
			b: o
		} : {
			op: "del",
			a: i,
			b: d
		}), u = i, d = o;
	}
	l.reverse();
	let f = [];
	for (let e of l) {
		let t = f.at(-1);
		e.op === "del" ? t && t.a + t.del === e.a && t.b + t.ins === e.b ? t.del++ : f.push({
			a: e.a,
			b: e.b,
			del: 1,
			ins: 0
		}) : t && t.a + t.del === e.a && t.b + t.ins === e.b ? t.ins++ : f.push({
			a: e.a,
			b: e.b,
			del: 0,
			ins: 1
		});
	}
	return f;
}
var Zn = (e, t) => t <= 1 ? String(e + +!!t) : `${e + 1},${e + t}`, Qn = (e, t) => t === 1 ? String(e + 1) : `${t ? e + 1 : e},${t}`;
function $n(e, t, n) {
	let r = "";
	for (let i of n) {
		let n = i.del && i.ins ? "c" : i.del ? "d" : "a";
		r += `${n === "a" ? String(i.a) : Zn(i.a, i.del)}${n}${n === "d" ? String(i.b) : Zn(i.b, i.ins)}\n`;
		for (let t = 0; t < i.del; t++) r += `< ${e[i.a + t]}\n`;
		n === "c" && (r += "---\n");
		for (let e = 0; e < i.ins; e++) r += `> ${t[i.b + e]}\n`;
	}
	return r;
}
function er(e, t, n, r) {
	let i = "", a = [];
	for (let e of n) {
		let t = a.at(-1);
		t && e.a - (t.at(-1).a + t.at(-1).del) <= 2 * r ? t.push(e) : a.push([e]);
	}
	for (let n of a) {
		let a = n[0], o = n.at(-1), s = Math.max(0, a.a - r), c = Math.max(0, a.b - r), l = Math.min(e.length, o.a + o.del + r), u = Math.min(t.length, o.b + o.ins + r);
		i += `@@ -${Qn(s, l - s)} +${Qn(c, u - c)} @@\n`;
		let d = s;
		for (let r of n) {
			for (; d < r.a; d++) i += ` ${e[d]}\n`;
			for (let t = 0; t < r.del; t++) i += `-${e[r.a + t]}\n`;
			for (let e = 0; e < r.ins; e++) i += `+${t[r.b + e]}\n`;
			d = r.a + r.del;
		}
		for (; d < l; d++) i += ` ${e[d]}\n`;
	}
	return i;
}
var tr = (e) => {
	let t = new Date(e), n = (e) => String(e).padStart(2, "0");
	return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}:${n(t.getSeconds())}`;
};
async function nr(e) {
	let { opts: t, args: n } = H(e, {
		flags: "uqiwbBsN",
		values: "U",
		long: {
			unified: "u",
			brief: "q",
			"ignore-case": "i",
			"ignore-all-space": "w",
			"ignore-space-change": "b",
			"ignore-blank-lines": "B",
			"report-identical-files": "s"
		}
	});
	if (n.length !== 2) throw new b(n.length < 2 ? w("diff.missingOperand", { arg: n[0] ?? "diff" }) : w("diff.extraOperand", { arg: n[2] }), 2);
	let i = async (t) => {
		if (t === "-") return {
			text: await e.stdin.readAll(),
			time: Date.now()
		};
		let n = e.resolve(t);
		if (!n) throw new b(w("err.noSuchFile", { path: t }), 2);
		if (n.type !== "file") throw new b(n.type === "folder" ? w("err.isADirectory", { path: t }) : w("err.notAFile", { path: t }), 2);
		return {
			text: await r.read(n.id),
			time: n.modified
		};
	}, [a, o] = [await i(n[0]), await i(n[1])], s = (e) => {
		let t = e.split("\n");
		return (e.endsWith("\n") || e === "") && t.pop(), t;
	}, c = s(a.text), l = s(o.text), u = (e) => (t.i && (e = e.toLowerCase()), t.w ? e = e.replace(/\s+/g, "") : t.b && (e = e.replace(/\s+/g, " ").trimEnd()), e), d = Jn(c, l, (e, t) => u(e) === u(t));
	if (t.B && (d = d.filter((e) => !(c.slice(e.a, e.a + e.del).every((e) => !e.trim()) && l.slice(e.b, e.b + e.ins).every((e) => !e.trim())))), !d.length) return t.s && await e.out(`${w("diff.identical", {
		a: n[0],
		b: n[1]
	})}\n`), 0;
	if (t.q) return await e.out(`${w("diff.differ", {
		a: n[0],
		b: n[1]
	})}\n`), 1;
	if (t.u || t.U != null) {
		let r = t.U == null ? 3 : U(t.U);
		await e.out(`--- ${n[0]}\t${tr(a.time)}\n+++ ${n[1]}\t${tr(o.time)}\n` + er(c, l, d, r));
	} else await e.out($n(c, l, d));
	return 1;
}
var rr = [{
	name: "diff",
	usage: "diff [-uqiwB] file1 file2",
	get summary() {
		return w("help.diff.summary");
	},
	run: nr,
	get help() {
		return w("help.diff.text");
	}
}], ir = (e) => e.stdout === e.shell.host.stdout, ar = (e) => {
	let t = String(e).toLowerCase();
	return l().find((e) => e.id.toLowerCase() === t) ?? l().find((e) => e.name.toLowerCase() === t) ?? null;
};
async function or(e) {
	let { opts: t, args: n } = H(e, {
		values: "a",
		long: { app: "a" }
	});
	if (t.a != null) {
		let r = ar(t.a);
		if (!r) throw new b(w("open.noApp", { app: t.a }));
		if (!n.length) return u(r.id), 0;
		for (let t of n) {
			let n = e.resolve(t);
			if (!n) throw new b(w("err.noSuchFile", { path: t }));
			u(r.id, n.type === "folder" ? { folder: n.id } : { file: n.id });
		}
		return 0;
	}
	if (!n.length) throw new b(w("help.usageShort", { usage: e.cmd.usage }), 2);
	let r = 0;
	for (let t of n) {
		let n = e.resolve(t);
		n ? n.type === "folder" ? u("files", { folder: n.id }) : n.type === "app" ? u(n.app) : d(n) : (await e.error(w("err.noSuchFile", { path: t })), r = 1);
	}
	return r;
}
var sr = (e) => C.date(e, {
	day: "2-digit",
	month: "short",
	hour: "2-digit",
	minute: "2-digit"
});
function cr(e, t) {
	let n = r.trashed();
	return t.map((e) => {
		let t = n.find((t) => t.id === e) ?? n.find((t) => t.name === e) ?? n.find((t) => t.name.toLowerCase() === e.toLowerCase());
		if (!t) throw new b(w("trash.notInTrash", { name: e }));
		return t;
	});
}
async function lr(e) {
	let [t = "list", ...n] = e.args;
	switch (t) {
		case "list":
		case "ls": {
			let t = r.trashed();
			if (!t.length) return await e.out(`${w("trash.empty")}\n`), 0;
			for (let n of t) {
				let t = r.exists(n.trashed.from) ? r.path(n.trashed.from) : w("trash.deletedFolder"), i = n.type === "folder" ? w("trash.items", { n: n.inside }) : Vt(n.bytes);
				await e.out(`${sr(n.trashed.at)}  ${i.padStart(10)}  ${n.name}${n.type === "folder" ? "/" : ""}  ← ${t}\n`);
			}
			return 0;
		}
		case "put": {
			if (!n.length) throw new b(w("trash.missingPut"), 2);
			let t = 0;
			for (let i of n) {
				let n = e.resolve(i);
				n ? r.trash([n.id]).length || (await e.error(w("trash.cannotTrash", { path: i })), t = 1) : (await e.error(w("err.noSuchFile", { path: i })), t = 1);
			}
			return t;
		}
		case "restore":
			if (!n.length) throw new b(w("trash.missingRestore"), 2);
			for (let { id: t, parent: i } of r.untrash(cr(e, n).map((e) => e.id))) await e.out(`${w("trash.restored", { path: r.path(t) })}${r.root, ""}\n`);
			return 0;
		case "rm": {
			if (!n.length) throw new b(w("trash.missingName"), 2);
			let t = r.purge(cr(e, n).map((e) => e.id));
			return await e.out(`${w("trash.purged", { n: t })}\n`), 0;
		}
		case "empty": {
			let t = r.purgeTrash();
			return await e.out(`${t ? w("trash.emptied", { n: t }) : w("trash.alreadyEmpty")}\n`), 0;
		}
	}
	throw new b(`${w("err.unknownSubcommand", { sub: t })}\n${w("help.usageLine", { usage: e.cmd.usage })}`, 2);
}
function ur(e, t = !1) {
	let n = s.byName(e) ?? s.get(e);
	if (n) return n;
	if (t) return s.create({ name: e });
	throw new b(w("tag.noSuchTag", { name: e }));
}
async function dr(e) {
	let [n = "ls", ...i] = e.args, a = (t) => ir(e) ? `\x1b[38;2;${parseInt(t.slice(1, 3), 16)};${parseInt(t.slice(3, 5), 16)};${parseInt(t.slice(5, 7), 16)}m●\x1b[0m ` : "";
	switch (n) {
		case "ls":
		case "list": {
			if (i.length) {
				for (let t of i) {
					let n = ur(t);
					for (let t of r.tagged(n.id).sort((e, t) => F(r.path(e.id), r.path(t.id)))) await e.out(r.path(t.id) + (t.type === "folder" ? "/" : "") + "\n");
				}
				return 0;
			}
			let t = s.list();
			if (!t.length) return await e.out(`${w("tag.none")}\n`), 0;
			for (let n of t) await e.out(`${a(n.color)}${n.name}  (${r.tagged(n.id).length})${n.visible ? "" : `  ${w("tag.hidden")}`}\n`);
			return 0;
		}
		case "show": {
			let t = 0;
			for (let n of i.length ? i : ["."]) {
				let r = e.resolve(n);
				if (!r) {
					await e.error(w("err.noSuchFile", { path: n })), t = 1;
					continue;
				}
				let i = (r.tags ?? []).map((e) => s.get(e)).filter(Boolean).map((e) => a(e.color) + e.name);
				await e.out(`${n}: ${i.length ? i.join(", ") : w("tag.noTags")}\n`);
			}
			return t;
		}
		case "add":
		case "rm": {
			let [t, ...a] = i;
			if (!t || !a.length) throw new b(w("help.usageShort", { usage: w("tag.usageAddRm", { sub: n }) }), 2);
			let o = n === "add" && !s.byName(t), c = ur(t, n === "add");
			o && await e.out(`${w("tag.created", { name: c.name })}\n`);
			let l = 0;
			for (let t of a) {
				let i = e.resolve(t);
				if (!i) {
					await e.error(w("err.noSuchFile", { path: t })), l = 1;
					continue;
				}
				if (i.system) {
					await e.error(w("tag.system", { path: t })), l = 1;
					continue;
				}
				let a = i.tags ?? [];
				r.setTags(i.id, n === "add" ? [...a, c.id] : a.filter((e) => e !== c.id));
			}
			return l;
		}
		case "new": {
			let [n, r] = i;
			if (!n) throw new b(w("help.usageShort", { usage: w("tag.usageNew") }), 2);
			let o = r ? t.find((e) => e.label.toLowerCase() === r.toLowerCase())?.value ?? r : void 0, c = s.create({
				name: n,
				color: o
			});
			return await e.out(`${w("tag.createdShown", { tag: a(c.color) + c.name })}\n`), 0;
		}
		case "delete":
			if (!i.length) throw new b(w("help.usageShort", { usage: w("tag.usageDelete") }), 2);
			for (let e of i) s.remove(ur(e).id);
			return 0;
	}
	throw new b(`${w("err.unknownSubcommand", { sub: n })}\n${w("help.usageLine", { usage: e.cmd.usage })}`, 2);
}
async function fr(e) {
	let t = [...l()].sort((e, t) => F(e.name, t.name)), n = Math.max(...t.map((e) => e.id.length));
	for (let r of t) {
		let t = r.package?.manifest?.version ?? "";
		await e.out(`${r.id.padEnd(n)}  ${r.name}${t ? `  ${t}` : ""}\n`);
	}
}
var pr = (e, t) => C.date(new Date(2024, 0, 7 + e, 12), { weekday: t }), mr = (e, t) => C.date(new Date(2024, e, 15, 12), { month: t });
function Q(e, t, n = !1) {
	let r = (e) => n ? t[`getUTC${e}`]() : t[`get${e}`](), i = (e, t = 2) => String(e).padStart(t, "0"), a = n ? Date.UTC(r("FullYear"), 0, 1) : new Date(r("FullYear"), 0, 1).getTime(), o = n ? 0 : -t.getTimezoneOffset(), s = {
		Y: () => r("FullYear"),
		y: () => i(r("FullYear") % 100),
		m: () => i(r("Month") + 1),
		d: () => i(r("Date")),
		e: () => String(r("Date")).padStart(2),
		H: () => i(r("Hours")),
		I: () => i((r("Hours") + 11) % 12 + 1),
		M: () => i(r("Minutes")),
		S: () => i(r("Seconds")),
		N: () => i(r("Milliseconds"), 3) + "000000",
		p: () => r("Hours") < 12 ? "AM" : "PM",
		A: () => pr(r("Day"), "long"),
		a: () => pr(r("Day"), "short"),
		B: () => mr(r("Month"), "long"),
		b: () => mr(r("Month"), "short"),
		h: () => mr(r("Month"), "short"),
		j: () => i(Math.floor((t - a) / 864e5) + 1, 3),
		u: () => r("Day") || 7,
		w: () => r("Day"),
		s: () => Math.floor(t / 1e3),
		z: () => (o >= 0 ? "+" : "-") + i(Math.floor(Math.abs(o) / 60)) + i(Math.abs(o) % 60),
		Z: () => n ? "UTC" : Intl.DateTimeFormat().resolvedOptions().timeZone,
		F: () => `${s.Y()}-${s.m()}-${s.d()}`,
		T: () => `${s.H()}:${s.M()}:${s.S()}`,
		D: () => `${s.m()}/${s.d()}/${s.y()}`,
		R: () => `${s.H()}:${s.M()}`,
		c: () => Q(w("date.formatC"), t, n),
		x: () => Q(w("date.formatX"), t, n),
		X: () => s.T(),
		n: () => "\n",
		t: () => "	",
		"%": () => "%"
	};
	return e.replace(/%([a-zA-Z%])/g, (e, t) => s[t] ? String(s[t]()) : e);
}
async function hr(e) {
	let { opts: t, args: n } = H(e, {
		flags: "uR",
		values: "dI",
		long: {
			utc: "u",
			date: "d",
			"iso-8601": "I",
			rfc: "R"
		}
	}), r = /* @__PURE__ */ new Date();
	if (t.d != null) {
		let e = t.d.trim();
		if (r = /^@\d+$/.test(e) ? /* @__PURE__ */ new Date(Number(e.slice(1)) * 1e3) : e === "now" ? /* @__PURE__ */ new Date() : e === "yesterday" || e === "ieri" ? /* @__PURE__ */ new Date(Date.now() - 864e5) : e === "tomorrow" || e === "domani" ? new Date(Date.now() + 864e5) : new Date(e), Number.isNaN(r.getTime())) throw new b(w("date.invalid", { date: t.d }));
	}
	let i = n.find((e) => e.startsWith("+"));
	if (i) return e.out(Q(i.slice(1), r, t.u) + "\n");
	if (t.I != null) return e.out(Q(t.I === "seconds" ? "%Y-%m-%dT%H:%M:%S%z" : "%F", r, t.u) + "\n");
	if (t.R) return e.out(r.toUTCString() + "\n");
	await e.out(Q(w("date.format"), r, t.u) + "\n");
}
var gr = [
	{
		name: "open",
		get usage() {
			return w("help.open.usage");
		},
		get summary() {
			return w("help.open.summary");
		},
		run: or,
		get help() {
			return w("help.open.text");
		}
	},
	{
		name: "trash",
		get usage() {
			return w("help.trash.usage");
		},
		get summary() {
			return w("help.trash.summary");
		},
		run: lr,
		get help() {
			return w("help.trash.text");
		}
	},
	{
		name: "tag",
		get usage() {
			return w("help.tag.usage");
		},
		get summary() {
			return w("help.tag.summary");
		},
		run: dr,
		get help() {
			return w("help.tag.text");
		}
	},
	{
		name: "apps",
		usage: "apps",
		get summary() {
			return w("help.apps.summary");
		},
		run: fr
	},
	{
		name: "date",
		get usage() {
			return w("help.date.usage");
		},
		get summary() {
			return w("help.date.summary");
		},
		run: hr,
		get help() {
			return w("help.date.text");
		}
	},
	{
		name: "whoami",
		usage: "whoami",
		get summary() {
			return w("help.whoami.summary");
		},
		run: (e) => e.out((a.user?.username || e.shell.getVar("USER") || w("shell.defaultUser")) + "\n")
	},
	{
		name: "hostname",
		usage: "hostname",
		get summary() {
			return w("help.hostname.summary");
		},
		run: (e) => e.out((e.shell.getVar("HOSTNAME") ?? "lilos") + "\n")
	},
	{
		name: "uname",
		usage: "uname [-a]",
		get summary() {
			return w("help.uname.summary");
		},
		run: (e) => e.out(e.args.includes("-a") ? `lilOS lilos ${e.shell.getVar("BASH_VERSION")} ${navigator.platform || ""}\n`.replace(/ \n$/, "\n") : "lilOS\n")
	}
], _r = /^[a-z][\w.-]{0,39}$/, $ = /* @__PURE__ */ new Map();
for (let e of Mt) $.set(e.name, Object.assign(e, { builtin: !0 }));
for (let e of [
	...hn,
	...Vn,
	...qn,
	...rr,
	...gr
]) $.set(e.name, e);
function vr() {
	let e = /* @__PURE__ */ new Map();
	for (let t of l()) {
		let n = t.package?.manifest?.contributes?.shell;
		if (Array.isArray(n)) for (let r of n.slice(0, 50)) r && _r.test(r.name ?? "") && typeof r.entry == "string" && !$.has(r.name) && !e.has(r.name) && e.set(r.name, {
			name: r.name,
			app: t.name,
			summary: typeof r.summary == "string" ? r.summary.slice(0, 120) : w("appCmd.summary", { app: t.name }),
			usage: typeof r.usage == "string" ? r.usage.slice(0, 200) : w("appCmd.usage", { name: r.name }),
			ownHelp: r.help === !0,
			run: (e) => yr(e, t.id, r.entry)
		});
	}
	return e;
}
async function yr(e, t, n) {
	let i = e.shell, a = e.stdin === i.host.stdin ? null : await e.stdin.readAll(), o;
	try {
		o = await c(t, n, {
			command: e.name,
			args: e.args,
			stdin: a,
			cwd: r.path(e.cwd),
			env: i.environment()
		}, { from: "terminal" });
	} catch (e) {
		throw new b(e?.message ?? String(e));
	}
	return o == null ? 0 : typeof o == "string" ? (await e.out(o), 0) : (typeof o.stdout == "string" && await e.out(o.stdout), typeof o.stderr == "string" && await e.err(o.stderr), Number.isInteger(o.code) ? (o.code % 256 + 256) % 256 : 0);
}
var br = {
	get: (e) => $.get(e) ?? vr().get(e) ?? null,
	has: (e) => $.has(e) || vr().has(e),
	names: () => [...$.keys(), ...vr().keys()],
	values: () => [...$.values(), ...vr().values()]
}, xr = /\x1b\[([0-9;?]*)([A-Za-z])|\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)|\x1b[()][0-9A-Za-z]|\x1b./g, Sr = [
	0,
	95,
	135,
	175,
	215,
	255
];
function Cr(e) {
	if (e < 16) return { cls: e };
	if (e >= 232) {
		let t = 8 + (e - 232) * 10;
		return { css: `rgb(${t},${t},${t})` };
	}
	let t = e - 16;
	return { css: `rgb(${Sr[Math.floor(t / 36)]},${Sr[Math.floor(t / 6) % 6]},${Sr[t % 6]})` };
}
var wr = class {
	style = {};
	write(e, t, n = null, r = () => {}) {
		let i = 0;
		xr.lastIndex = 0;
		for (let a; a = xr.exec(e);) this.#e(e.slice(i, a.index), t, n), i = xr.lastIndex, a[2] === "m" ? this.#t(a[1]) : a[2] === "J" && (a[1] === "2" || a[1] === "3") && r();
		this.#e(e.slice(i), t, n);
	}
	#e(e, t, n) {
		if (e = e.replace(/\r\n/g, "\n").replace(/[\x00-\x08\x0b-\x1f\x7f]/g, ""), !e) return;
		let r = JSON.stringify(this.style), i = n ? n.previousSibling : t.lastChild;
		if (i?.nodeType === 1 && i.dataset.style === r) {
			i.textContent += e;
			return;
		}
		let a = this.style, o;
		if (r === "{}") o = document.createElement("span");
		else {
			o = document.createElement("span");
			let e = a.inverse ? a.bg ?? { cls: "bg" } : a.fg, t = a.inverse ? a.fg ?? { cls: "fg" } : a.bg;
			e?.cls == null ? e?.css && (o.style.color = e.css) : o.classList.add(`tm-c${e.cls}`), t?.cls == null ? t?.css && (o.style.backgroundColor = t.css) : o.classList.add(`tm-b${t.cls}`), a.bold && o.classList.add("tm-bold"), a.dim && o.classList.add("tm-dim"), a.italic && o.classList.add("tm-italic"), a.underline && o.classList.add("tm-underline"), a.strike && o.classList.add("tm-strike");
		}
		o.dataset.style = r, o.textContent = e, t.insertBefore(o, n);
	}
	#t(e) {
		let t = e === "" ? [0] : e.split(";").map(Number), n = { ...this.style };
		for (let e = 0; e < t.length; e++) {
			let r = t[e];
			if (r === 0) for (let e of Object.keys(n)) delete n[e];
			else if (r === 1) n.bold = !0;
			else if (r === 2) n.dim = !0;
			else if (r === 3) n.italic = !0;
			else if (r === 4) n.underline = !0;
			else if (r === 7) n.inverse = !0;
			else if (r === 9) n.strike = !0;
			else if (r === 22) delete n.bold, delete n.dim;
			else if (r === 23) delete n.italic;
			else if (r === 24) delete n.underline;
			else if (r === 27) delete n.inverse;
			else if (r === 29) delete n.strike;
			else if (r >= 30 && r <= 37) n.fg = { cls: r - 30 };
			else if (r >= 90 && r <= 97) n.fg = { cls: r - 90 + 8 };
			else if (r >= 40 && r <= 47) n.bg = { cls: r - 40 };
			else if (r >= 100 && r <= 107) n.bg = { cls: r - 100 + 8 };
			else if (r === 39) delete n.fg;
			else if (r === 49) delete n.bg;
			else if (r === 38 || r === 48) {
				let i = r === 38 ? "fg" : "bg";
				if (t[e + 1] === 5) n[i] = Cr(t[e + 2] ?? 0), e += 2;
				else if (t[e + 1] === 2) {
					let [r, a, o] = t.slice(e + 2, e + 5).map((e) => Math.max(0, Math.min(255, e || 0)));
					n[i] = { css: `rgb(${r},${a},${o})` }, e += 4;
				}
			}
		}
		this.style = n;
	}
	reset() {
		this.style = {};
	}
}, Tr = /[\s'"\\$`|&;<>()*?[\]{}!#]/g, Er = (e) => e.replace(Tr, "\\$&");
function Dr(e, t, n) {
	let i = t.slice(0, n), a = n;
	for (; a > 0 && !(/[\s|&;<>()]/.test(i[a - 1]) && i[a - 2] !== "\\");) a--;
	let o = i.slice(a).replace(/\\(.)/g, "$1").replace(/^['"]/, ""), s = i.slice(0, a).trimEnd(), c = !s || /(^|[|&;(]|\$\(|\b(then|do|else|elif|if|while|until|sudo|xargs|time|command|which|type|help))$/.test(s), l = /\$\{?([A-Za-z_]\w*)?$/.exec(o);
	if (l) {
		let t = l[1] ?? "", r = o.slice(0, o.length - t.length), i = e.variables().map(([e]) => e).filter((e) => e.startsWith(t)).map((e) => ({
			value: r + e + (r.endsWith("{") ? "}" : ""),
			label: e
		}));
		return {
			start: a,
			end: n,
			items: i
		};
	}
	if (c && !o.includes("/")) {
		let t = [.../* @__PURE__ */ new Set([
			...e.commands.names(),
			...e.functions.keys(),
			...e.aliases.keys()
		])].filter((e) => e.startsWith(o)).sort(F).map((e) => ({
			value: Er(e),
			label: e
		}));
		if (t.length || !o) return {
			start: a,
			end: n,
			items: t
		};
	}
	let u = o.lastIndexOf("/"), d = u >= 0 ? o.slice(0, u + 1) : "", f = u >= 0 ? o.slice(u + 1) : o, p = d || ".";
	(p === "~/" || p.startsWith("~/")) && (p = (e.getVar("HOME") ?? r.home) + p.slice(1));
	let m = P(e.cwd, p);
	if (m?.type !== "folder") return {
		start: a,
		end: n,
		items: []
	};
	let h = f.toLowerCase(), g = r.children(m.id).filter((e) => e.name.toLowerCase().startsWith(h) && (f.startsWith(".") || !e.name.startsWith("."))).sort((e, t) => F(e.name, t.name)).map((e) => ({
		value: Er(d) + Er(e.name) + (e.type === "folder" ? "/" : ""),
		label: e.name + (e.type === "folder" ? "/" : ""),
		folder: e.type === "folder"
	}));
	return {
		start: a,
		end: n,
		items: g
	};
}
function Or(e) {
	if (!e.length) return "";
	let t = e[0];
	for (let n of e.slice(1)) {
		let e = 0;
		for (; e < t.length && e < n.length && t[e].toLowerCase() === n[e].toLowerCase();) e++;
		t = t.slice(0, e);
	}
	return t;
}
// src/terminal/TerminalApp.js
var kr = "terminal.history", Ar = 4e5, jr = ".bashrc";
function Mr({ args: e } = {}) {
	let t = new n({
		title: w("ui.title"),
		icon: "terminal",
		width: 760,
		height: 460,
		minWidth: 360,
		minHeight: 200
	}), i = new Pr(t, e);
	return t.getState = () => ({ cwd: i.shell.cwd }), t.on("launch", (e) => {
		e?.cwd && r.get(e.cwd)?.type === "folder" && i.changeDir(e.cwd);
	}), t;
}
var Nr = class extends lt {
	silent = !1;
	constructor(e) {
		super(), this.term = e;
	}
	pull() {
		return this.term.readInput(this);
	}
}, Pr = class {
	text = "";
	cursor = 0;
	pending = "";
	running = !1;
	queue = [];
	reader = null;
	#e = "";
	#t = 0;
	#n = -1;
	#r = "";
	#i = 0;
	#a = 0;
	#o = null;
	constructor(e, t) {
		this.win = e, this.ansi = new wr();
		let { signal: n } = e;
		this.edit = i("span", { class: "tm-edit" }), this.output = i("div", {
			class: "tm-out",
			role: "log",
			"aria-live": "polite"
		}, this.edit), this.input = i("textarea", {
			class: "tm-input",
			spellcheck: "false",
			autocapitalize: "off",
			autocomplete: "off",
			autocorrect: "off",
			rows: "1",
			"aria-label": w("ui.commandLine")
		}), this.screen = i("div", { class: "tm-screen" }, this.output, this.input), e.body.classList.add("tm"), e.body.append(this.screen), this.input.addEventListener("keydown", (e) => this.#g(e), { signal: n }), this.input.addEventListener("input", (e) => this.#d(e), { signal: n }), this.input.addEventListener("paste", (e) => this.#f(e), { signal: n }), this.input.addEventListener("focus", () => this.screen.classList.add("focused"), { signal: n }), this.input.addEventListener("blur", () => this.screen.classList.remove("focused"), { signal: n }), this.screen.addEventListener("mouseup", () => {
			String(getSelection()).length || this.focus();
		}, { signal: n });
		let a = new ResizeObserver(() => {
			this.#a = 0;
		});
		a.observe(this.screen), this.history = Fr();
		let o = new pt((e) => this.write(e));
		this.host = {
			stdin: new Nr(this),
			stdout: o,
			stderr: o,
			clear: () => this.clear(),
			columns: () => this.columns(),
			history: {
				list: () => [...this.history],
				clear: () => {
					this.history = [], Ir([]);
				}
			}
		}, this.shell = new yt({
			host: this.host,
			commands: br
		}), t?.cwd && r.get(t.cwd)?.type === "folder" && (this.shell.cwd = t.cwd), this.shell.setVar("PS1", "\\[\\e[1;32m\\]\\u@\\h\\[\\e[0m\\]:\\[\\e[1;34m\\]\\w\\[\\e[0m\\]\\$ "), e.on("destroy", () => {
			a.disconnect(), cancelAnimationFrame(this.#t), this.#o?.abort();
			for (let e of this.shell.jobs.list) e.token.abort();
			this.reader?.reject(new g());
		}), this.#E(), this.#s();
	}
	async #s() {
		this.write(`\x1b[2m${w("ui.welcome")}\x1b[0m\n`), this.shell.resolve(`~/${jr}`)?.type === "file" ? await this.#C(`source ~/${jr}`, { record: !1 }) : this.prompt(), requestAnimationFrame(() => this.focus());
	}
	focus() {
		this.input.focus({ preventScroll: !0 });
	}
	write(e) {
		this.#e += e, this.#e.length > 1 << 18 ? this.flush() : this.#t ||= requestAnimationFrame(() => this.flush());
	}
	flush() {
		if (cancelAnimationFrame(this.#t), this.#t = 0, !this.#e) return;
		let e = this.#e;
		this.#e = "";
		let t = this.#l();
		this.ansi.write(e, this.output, this.edit, () => this.clear()), this.#c(), t && this.scrollToEnd();
	}
	#c() {
		let e = this.output.textContent.length;
		for (; e > Ar && this.output.firstChild !== this.edit;) e -= this.output.firstChild.textContent.length, this.output.firstChild.remove();
	}
	#l() {
		return this.screen.scrollHeight - this.screen.scrollTop - this.screen.clientHeight < 40;
	}
	scrollToEnd() {
		this.screen.scrollTop = this.screen.scrollHeight;
	}
	clear() {
		for (this.#e = ""; this.output.firstChild !== this.edit;) this.output.firstChild.remove();
		this.screen.scrollTop = 0;
	}
	columns() {
		if (!this.#a) {
			let e = i("span", { class: "tm-probe" }, "MMMMMMMMMM");
			this.screen.append(e), this.#a = e.getBoundingClientRect().width / 10 || 8, e.remove();
		}
		return Math.max(20, Math.floor((this.screen.clientWidth - 24) / this.#a));
	}
	promptText(e = "PS1") {
		let t = this.shell.getVar(e) ?? "$ ", n = a.user?.username || this.shell.getVar("USER") || w("shell.defaultUser"), i = /* @__PURE__ */ new Date(), o = (e) => String(e).padStart(2, "0");
		return t.replace(/\\([uhHwW$nte\\[\]dA@])/g, (e, t) => ({
			u: n,
			h: this.shell.getVar("HOSTNAME") ?? "lilos",
			H: this.shell.getVar("HOSTNAME") ?? "lilos",
			w: Be(this.shell.cwd),
			W: this.shell.cwd === r.root ? "~" : r.get(this.shell.cwd)?.name ?? "~",
			$: "$",
			n: "\n",
			e: "\x1B",
			"\\": "\\",
			"[": "",
			"]": "",
			t: `${o(i.getHours())}:${o(i.getMinutes())}:${o(i.getSeconds())}`,
			A: `${o(i.getHours())}:${o(i.getMinutes())}`,
			d: C.date(i, {
				weekday: "short",
				day: "numeric",
				month: "short"
			}),
			"@": C.date(i, { timeStyle: "medium" })
		})[t]);
	}
	prompt() {
		for (let e of this.shell.reapJobs()) this.write(e);
		this.flush(), this.ansi.reset(), this.write(this.promptText(this.pending ? "PS2" : "PS1")), this.flush(), this.renderLine(), this.scrollToEnd();
	}
	renderLine() {
		let e = this.reader?.reader.silent, t = e ? "" : this.text, n = e ? 0 : this.cursor, r = i("span", { class: "tm-cursor" }, t[n] ?? " ");
		this.edit.replaceChildren(t.slice(0, n), r, t.slice(n + 1)), this.edit.hidden = this.running && !this.reader && !this.text;
	}
	setLine(e, t = e.length) {
		this.text = e, this.cursor = Math.max(0, Math.min(t, e.length)), this.#i = 0, this.renderLine();
	}
	#u(e) {
		this.write((this.reader?.reader.silent ? "" : e) + "\n"), this.setLine(""), this.flush();
	}
	#d(e) {
		if (e.isComposing) return;
		let t = this.input.value;
		if (this.input.value = "", !t) return;
		let n = t.replace(/\r\n?/g, "\n").split("\n");
		this.#p(n[0]), n.length > 1 && this.#m(n.slice(1));
	}
	#f(e) {
		let t = e.clipboardData?.getData("text/plain");
		if (t == null) return;
		e.preventDefault();
		let n = t.replace(/\r\n?/g, "\n").split("\n");
		this.#p(n[0]), n.length > 1 && this.#m(n.slice(1));
	}
	#p(e) {
		e && (this.setLine(this.text.slice(0, this.cursor) + e + this.text.slice(this.cursor), this.cursor + e.length), this.scrollToEnd());
	}
	#m(e) {
		let t = e.pop();
		this.#b();
		for (let t of e) this.queue.push(t);
		t && (this.running || this.queue.length ? this.#h = t : this.#p(t)), this.#x();
	}
	#h = "";
	#g(e) {
		let t = e.ctrlKey && !e.altKey && !e.metaKey, n = e.ctrlKey && e.key.length === 1 ? e.key.toLowerCase() : e.key, r = () => {
			e.preventDefault(), e.stopPropagation();
		};
		if (n !== "Tab" && (this.#i = 0), !e.isComposing) {
			if (n === "Enter") r(), this.#b();
			else if (n === "Tab") r(), this.#v();
			else if (t && n === "c") {
				if (String(getSelection()).length) return;
				r(), this.#y();
			} else if (t && n === "d") r(), this.reader ? (this.#u(this.text), this.#T(null)) : !this.running && !this.text && !this.pending ? this.#D() : this.text && this.setLine(this.text.slice(0, this.cursor) + this.text.slice(this.cursor + 1), this.cursor);
			else if (t && n === "l") r(), this.clear(), this.running || this.prompt();
			else if (t && n === "a") r(), this.setLine(this.text, 0);
			else if (t && n === "e") r(), this.setLine(this.text, this.text.length);
			else if (t && n === "u") r(), this.setLine(this.text.slice(this.cursor), 0);
			else if (t && n === "k") r(), this.setLine(this.text.slice(0, this.cursor));
			else if (t && (n === "w" || n === "Backspace")) {
				r();
				let e = this.text.slice(0, this.cursor).replace(/\S+\s*$/, "");
				this.setLine(e + this.text.slice(this.cursor), e.length);
			} else switch (n) {
				case "Backspace":
					r(), this.cursor > 0 && this.setLine(this.text.slice(0, this.cursor - 1) + this.text.slice(this.cursor), this.cursor - 1);
					return;
				case "Delete":
					r(), this.setLine(this.text.slice(0, this.cursor) + this.text.slice(this.cursor + 1), this.cursor);
					return;
				case "ArrowLeft":
					r(), t ? this.setLine(this.text, this.text.slice(0, this.cursor).replace(/\S+\s*$/, "").length) : this.setLine(this.text, this.cursor - 1);
					return;
				case "ArrowRight":
					if (r(), t) {
						let e = /^\s*\S+/.exec(this.text.slice(this.cursor));
						this.setLine(this.text, this.cursor + (e ? e[0].length : this.text.length));
					} else this.setLine(this.text, this.cursor + 1);
					return;
				case "Home":
					r(), this.setLine(this.text, 0);
					return;
				case "End":
					r(), this.setLine(this.text, this.text.length);
					return;
				case "ArrowUp":
					r(), this.#_(-1);
					return;
				case "ArrowDown":
					r(), this.#_(1);
					return;
				case "PageUp":
					r(), this.screen.scrollTop -= this.screen.clientHeight * .9;
					return;
				case "PageDown":
					r(), this.screen.scrollTop += this.screen.clientHeight * .9;
					return;
				case "Escape":
					r();
					return;
			}
		}
	}
	#_(e) {
		if (this.reader) return;
		this.#n < 0 && (this.#r = this.text, this.#n = this.history.length);
		let t = this.#n + e;
		t < 0 || t > this.history.length || (this.#n = t, this.setLine(t === this.history.length ? this.#r : this.history[t]));
	}
	#v() {
		if (this.reader) return;
		let { start: e, end: t, items: n } = Dr(this.shell, this.text, this.cursor);
		if (this.#i++, !n.length) return;
		let r = (n) => this.setLine(this.text.slice(0, e) + n + this.text.slice(t), e + n.length);
		if (n.length === 1) {
			let e = n[0];
			r(e.value + (e.folder || /[}/]$/.test(e.value) ? "" : " "));
			return;
		}
		let i = Or(n.map((e) => e.value)), a = this.text.slice(e, t);
		if (i.length > a.length) {
			r(i), this.#i = 1;
			return;
		}
		if (this.#i < 2) return;
		let o = this.text, s = this.cursor;
		this.#u(o), this.write(Wt(n.map((e) => ({
			text: e.label,
			plain: e.label
		})), this.columns())), this.prompt(), this.setLine(o, s), this.#i = 0;
	}
	#y() {
		this.running ? (this.write("^C"), this.reader ? this.#u("") : this.write("\n"), this.queue = [], this.#h = "", this.#o?.abort()) : (this.write(this.text + "^C\n"), this.pending = "", this.queue = [], this.setLine(""), this.shell.status = 130, this.prompt());
	}
	#b() {
		let e = this.text;
		this.#n = -1, this.reader ? (this.#u(e), this.#T(e + "\n")) : this.running ? (this.queue.push(e), this.setLine("")) : (this.#u(e), this.#S(e));
	}
	#x() {
		for (; !this.running && this.queue.length;) {
			let e = this.queue.shift();
			this.write(e + "\n"), this.#S(e);
		}
		!this.running && !this.queue.length && this.#h && (this.#p(this.#h), this.#h = "");
	}
	#S(e) {
		let t = this.pending ? `${this.pending}\n${e}` : e;
		this.#C(t, { record: !0 });
	}
	async #C(e, { record: t }) {
		if (!e.trim()) {
			this.pending = "", this.prompt();
			return;
		}
		this.running = !0, this.renderLine(), this.#o = new x(), this.shell.token = this.#o, this.host.stdin = new Nr(this);
		let n = !1;
		try {
			await this.shell.run(e, this.host);
		} catch (e) {
			if (e instanceof v) n = !0;
			else if (e instanceof y) this.write(`bash: ${e.message}\n`), this.shell.status = 2;
			else if (e instanceof h) {
				this.flush(), this.#D();
				return;
			} else e instanceof g ? this.shell.status = 130 : (this.write(`bash: ${e?.message ?? e}\n`), this.shell.status = 1);
		}
		this.pending = n ? e : "", t && !n && this.#w(e), this.running = !1, this.reader = null, this.#E(), this.flush(), /\n$/.test(this.edit.previousSibling?.textContent ?? "\n") || this.write("\n"), this.prompt(), this.#x();
	}
	#w(e) {
		let t = e.trim();
		t && !e.startsWith(" ") && this.history.at(-1) !== t && (this.history = [...Fr().filter((e) => e !== t), t].slice(-1e3), Ir(this.history));
	}
	readInput(e) {
		if (this.queue.length) {
			let t = this.queue.shift();
			return this.write((e.silent ? "" : t) + "\n"), Promise.resolve(t + "\n");
		}
		return this.flush(), new Promise((t, n) => {
			let r = this.#o?.onAbort(() => {
				this.reader = null, n(new g());
			});
			this.reader = {
				reader: e,
				resolve: (e) => {
					r?.(), t(e);
				},
				reject: (e) => {
					r?.(), n(e);
				}
			}, this.renderLine(), this.scrollToEnd();
		});
	}
	#T(e) {
		let t = this.reader;
		this.reader = null, this.renderLine(), t?.resolve(e);
	}
	changeDir(e) {
		this.shell.cwd = e, this.#E(), this.running || (this.write(`\ncd ${Be(e)}\n`), this.prompt());
	}
	#E() {
		this.win.setTitle(w("ui.title"), Be(this.shell.cwd));
	}
	#D() {
		this.running = !0, this.renderLine(), this.win.emit("close");
	}
};
function Fr() {
	let e = o.get(kr, []);
	return Array.isArray(e) ? e.filter((e) => typeof e == "string").slice(-1e3) : [];
}
var Ir = (e) => o.set(kr, e);
export { Mr as default };
