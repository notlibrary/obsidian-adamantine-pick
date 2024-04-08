/*
	Adamantine Pick wrapper. Used to pass pointer from javascript to
	C manually to get in SVG width and height and avoid C++ node.js NAPI on client entirely   
		
	Now from main.ts you can do:
	const factory = require("./pick.js");
	factory().then((instance) => {
		let pikchr = instance.cwrap('pick', 'string', ['string','string','number']);
		let pick_width = instance.cwrap('pick_width', 'number', ['number']);
		let pick_height = instance.cwrap('pick_height', 'number', ['number']);
	}
	
	Or for standalone WASM build using ESbuild binary loader
	import { default as wasmbin } from './pick.wasm';
	WebAssembly.instantiate(wasmbin, import_env).then( async (factory) => {
		const pikchr = factory.instance.exports.pick;
		const get_height = factory.instance.exports.pick_height;
		const get_width = factory.instance.exports.pick_width;
	}
	However it requires additional glue to pass null terminated strings
	
	Because passing pointers from js to C is complicated 
	it passes pointer to inner static variable to pikchr
	and cwrap method to get/set it from javascript/typescript
	[typescript/javascript method] <- [pick] -> [pointer pikchr]
*/
#ifdef __cplusplus
extern "C" {
#endif
#define NDEBUG 1
#include "pikchr.c"
#define SOURCE_ARTIFACT_SHA3_HEX "9aac00a46506e993db45b740f7a7957f8f381b37001e196199dfc25642c44f06"
#define PICK_NAME "Adamantine Pick"
#define PICK_CALL
#define PICK_MAGIC_DIMENSION 128
#define PICK_TRANSLATION_UNIT_ID "pick.js"
#define PICK_STANDALONE_WASM_ID "pick.wasm"

PICK_CALL char* pick(const char *zText, const char *zClass, unsigned int mFlags);
PICK_CALL int pick_height(int** pick_height);
PICK_CALL int pick_width(int** pick_width);
PICK_CALL const char* pick_version();

PICK_CALL int 
pick_height(int** pick_height)
{
	static int height = PICK_MAGIC_DIMENSION;
	static int* height_p = &height;
	
	if ((pick_height !=NULL) || (pick_height !=0)) {
		height_p=&height;
		*pick_height = height_p; 
	}
		
	return height;
	
}

PICK_CALL int 
pick_width(int** pick_width)
{
	static int width = PICK_MAGIC_DIMENSION;
	static int* width_p = &width;
	
	
	if ((pick_width !=NULL) || (pick_width !=0)) {
		width_p = &width;
		*pick_width = width_p; 
	}
		
	return width;
	
}

PICK_CALL char* 
pick(const char *zText, const char *zClass, unsigned int mFlags)
{
	int* pickHeight = NULL;
	int* pickWidth = NULL;
	static unsigned int counter = 0;
	
	pick_height(&pickHeight);
	pick_width(&pickWidth);
	
	
	if ( zText != NULL ) { 
		counter++;
		return pikchr(zText, zClass, mFlags, pickWidth, pickHeight );
	}
	
	return NULL;
}

PICK_CALL const char*
pick_version()
{
	const char* artifact_sha3_hex = SOURCE_ARTIFACT_SHA3_HEX;
	unsigned int V = 0x0D0C0B0A;
	char is_wrong_endian =  ( *(char*)(&V) == 0x0A ) ? 1 : 0;
	return artifact_sha3_hex;
}

#undef PICK_CALL
#undef PICK_MAGIC_DIMENSION
#undef PICK_TRANSLATION_UNIT_ID
#undef PICK_STANDALONE_WASM_ID
#undef SOURCE_ARTIFACT_SHA3_HEX
#undef PICK_NAME
#ifdef __cplusplus
}
#endif /* __cplusplus */

/* 
	WTF? emcc imports this symbol in the standalone .wasm making it 
	WASI type module impossible to instantiate in working thread so stub it
	I don't need exit(0) native call in note-taking plugin --no-entry or int main(){while(1);}
	fails to do it
	
	Normally it exits to garbage collector when code block is over or when user close 
	app or turn off the plugin 
	
	Plugin architecture has nothing to do with native processes 
	
	It enters(if pushed to code block processors stack with registerMarkdownCodeBlockProcessor() beforehand)
	when next valid code block pushed double LIFO(processors,blocks) 2 stacks there
	code blocks stack pushed when user opens next file (pre)view mode changed or focus leaves code mirror editor buffer
	
	This registerMarkdownCodeBlockProcessor() API call has ~3 million cumulative installs maybe more
	prooflink: https://github.com/obsidianmd/obsidian-releases/blob/master/community-plugin-stats.json
*/
_Noreturn void  
__wasi_proc_exit(__wasi_exitcode_t rval) 
{
    __builtin_trap();
}
