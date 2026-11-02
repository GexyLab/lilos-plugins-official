import { createEditor } from './editor.js';
import './automata.css';

/**
 * Automata: records what the user does in lilOS as steps, and does them again. A system app
 * (it uses lilOS's automations through @lilos/system); its entry points are the exports here:
 *   default    the main window: the automations and their steps (editor.js)
 *   recorder   the recorder, above the other windows (recorder.js)
 *   run        an automation running (run.js)
 *   cli        the Terminal's `automata` command (cli.js)
 */
export default createEditor;
export { createRecorder as recorder } from './recorder.js';
export { createRun as run } from './run.js';
export { cli } from './cli.js';
