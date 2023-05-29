import { readFileSync, writeFileSync, readdir } from "fs";
import { Buffer } from "buffer";
const notes_dir = "src";
const notes_ext = "md";

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
	  if (filename.split('.').pop() === notes_ext) {
		  fs.readFile(dirname + filename, 'utf-8', function(err, content) {
			if (err) {
			  onError(err);
			  return;
			}
			onFileContent(filename, content);
		  });
	  }
	  
    });
  });
}

var notes = [ ];
readFiles(notes_dir, function(filename, content) {
  base64content = Buffer.from(content, 'utf-8').toString('base64');
  notes.push(
  {
	"filename": filename
	"notebase64" : base64content
  })
  
}, function(err) {
  throw err;
});

writeFileSync("adamantine-diagram-notes.json", JSON.stringify(notes, null, "\t"));