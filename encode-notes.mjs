import { readFileSync, writeFileSync, statSync, readdirSync } from "fs";
import { Buffer } from "buffer";
import path from 'path';

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


function encodeAdamantineJSON() {
	const notes_dir = "src";
	const notes_ext = ".md";
	const json_filename = "adamantine-diagram-notes.json";
	var notes = [ ];
	
	const note_files = readFilesSync(notes_dir);
	
	let total_notes = 0;
	note_files.forEach((note_file) => {
		if (note_file.ext === notes_ext) {
			let data = readFileSync(notes_dir + "/" + note_file.name + notes_ext, 'utf-8', function(err) {
					if (err) {
						onError(err);
						return;
					}
				});
			let base64content = Buffer.from(data, 'utf-8').toString('base64');
			notes.push(
			{
			"filename": note_file.name,
			"base64content": base64content
			}) 	
			total_notes++;
		}
	});
	console.log("Total notes encoded: ", total_notes);
	writeFileSync(json_filename, JSON.stringify(notes, null, "\t"));
}

encodeAdamantineJSON();

