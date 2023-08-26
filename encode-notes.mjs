import { readFileSync, writeFileSync, statSync, readdirSync } from "fs";
import { Buffer } from "buffer";
import path from 'path';
import * as crypto from 'crypto';


function readFilesSync(dir) {
  const files = [];

  readdirSync(dir).forEach(filename => {
    const name = path.parse(filename).name;
    const ext = path.parse(filename).ext;
    const filepath = path.resolve(dir, filename);
    const stat = statSync(filepath);
    const isFile = stat.isFile();

    if (isFile) files.push({ filepath, name, ext, stat });
  });

  files.sort((a, b) => {
    // natural sort alphanumeric strings
    // https://stackoverflow.com/a/38641281
    return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
  });

  return files;
}

function lengthInUtf8Bytes(str) {
  // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
  let m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}

function encodeAdamantineJSON() {
	const notes_dir = "src";
	const notes_ext = ".md";
	const json_filename = "adamantine-diagram-notes.json";
	let notes = [ ];
	const note_files = readFilesSync(notes_dir);
	const manifest_path = "manifest.json";
	const adamantine_manifest = JSON.parse(readFileSync(manifest_path));
	
	let total_notes = 0;
	note_files.forEach((note_file) => {
		if (note_file.ext === notes_ext) {
			let data = readFileSync(notes_dir + "/" + note_file.name + notes_ext, 'utf-8', function(err) {
					if (err) {
						console.log("Read note error readFileSync()");
						return;
					}
				});
			let base64content = Buffer.from(data, 'utf-8').toString('base64');
			let bytes_size = lengthInUtf8Bytes(data);
			let sha256_digest = crypto.createHash('sha256').update(data).digest('hex');
			let encoding_event = new Date();
			let timestamp = encoding_event.toJSON();
			let encoder = adamantine_manifest.name;
			let version = adamantine_manifest.version;
			notes.push(
			{
			"filename": note_file.name,
			"base64content": base64content,
			"bytessize": bytes_size,
			"sha256digest": sha256_digest,
			"timestamp": timestamp,
			"encoder": encoder,
			"encoderversion": version
			}) 	
			total_notes++;
		}
	});
	console.log("Total notes encoded: ", total_notes);
	writeFileSync(json_filename, JSON.stringify(notes, null, "\t"));
}

encodeAdamantineJSON();

